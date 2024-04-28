const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FundModel = require("../models/fundPostModel");
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const uuid = require('uuid').v4;
const DonationModel = require('../models/donationModel');
const UserModel = require('../models/userModel');

// checkout session for the donation 
router.post('/checkout-session/:id', async (req, res) => {
    try {
        const { product } = req.body;
        const { id: fundraiseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(fundraiseId) || !fundraiseId) {
            return res.status(422).json({ message: "Invalid ObjectId" });
        }

        // validate fundraiseId 
        const fundraiseExist = await FundModel.exists({ _id: fundraiseId }).select('_id');
        if (!fundraiseExist) return res.status(404).json({ message: "Fundraise not found" });

        // stripe checkout session with product details and other imp attr
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product?.name,
                        // metadata of product
                        metadata:{
                            fundraiseId: `${fundraiseId}`,
                            userId: `${product?.userId}`
                        },
                    },
                    unit_amount: product?.amount * 100
                },
                quantity: 1
            }],
            payment_method_types: ["card"],
            consent_collection: {
                terms_of_service: 'required',
            },
            custom_text: {
                terms_of_service_acceptance: {
                    message: 'I agree to the [Terms of Service](https://blossom-web-v1.vercel.app/terms-conditions)',
                },
            },
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000'
        });
        res.status(200).json({ sessionId: session.id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error?.message });
    }

});

// payment verification with session details
router.get('/payment-verification/:sessionId', async (req, res) => {
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();
    try {
        // save donor in the fundraise post array
        const {sessionId} = req.params;
        // sessionId exists or not
        const sidExist = await DonationModel.exists({sessionId:sessionId},{session: mongoSession}).exec();
        if(sidExist) throw new Error("Duplicate session id");
        // retrieve saved session 
        const savedSession = await stripe.checkout.sessions.retrieve(sessionId);
        // console.log(savedSession);
        // single item of line items
        const itemResult = await stripe.checkout.sessions.listLineItems(sessionId); 
        // product obj from stripe
        const product = await stripe.products.retrieve(itemResult?.data[0]?.price?.product);
        // create doc in donation collection, allow multiple payments from unique customer
        const docObj = {
            sessionId,
            fundraiseName:itemResult.data[0].description,
            amount_total: savedSession.amount_total/100,
            amount_subtotal: savedSession.amount_subtotal/100,
            currency: savedSession.currency,
            customerDetails:{
                country: savedSession.customer_details.address.country,
                email: savedSession.customer_details.email,
                name: savedSession.customer_details.name,
                phone: savedSession.customer_details.phone
            },
            fundraiseId: product.metadata.fundraiseId,
            userId: product.metadata.userId
        };
        // /*
        const donation = await DonationModel.create([docObj],{session:mongoSession});
        if(!donation){
            throw new Error("Donation document create failed");
        }

        // update amountDonated for customer's profile 
        const customerPromise = await UserModel.findByIdAndUpdate(product.metadata.userId, {$inc:{amountDonated: savedSession.amount_total/100}}, 
        {new:true, session: mongoSession});
        if(!customerPromise) throw new Error("Customer donation update failed");

        // update amountRaised for the fundraise
        const fundAmtPromise = await FundModel.findByIdAndUpdate(product.metadata.fundraiseId, {$inc:{amountRaised: savedSession.amount_total/100}},
        {new:true, session: mongoSession});
        if(!fundAmtPromise) throw new Error("Fundraise amount update failed");
        
        // insert donor in arr
        const donorArrPromise = await FundModel.findByIdAndUpdate(product.metadata.fundraiseId, {$addToSet:{donors: product.metadata.userId}},
        {new:true, session: mongoSession});
        if(!donorArrPromise) throw new Error("Donor array update failed");

        // successful op
        await mongoSession.commitTransaction();
        res.status(200).json({message:"Verification successful", result:donation[0]});
        // */
    } catch (error) {
        console.log(error);
        await mongoSession.abortTransaction();
        mongoSession.endSession();
        res.status(400).json({ message: error?.message });
    }
});

// get all donations
router.get('/',async(req,res)=>{
    try {
        const donations = await DonationModel.find({});
        if(!donations) throw new Error("Failed to fetch donations");
        res.status(200).json({message:"Fetched donations successfully",result:donations});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error?.message});
    }
});


module.exports = router;