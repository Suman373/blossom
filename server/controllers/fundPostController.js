const mongoose = require('mongoose');
const FundModel = require('../models/fundPostModel');
const UserModel = require('../models/userModel');
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const uuid = require('uuid').v4;

// get fundraise posts created by user or everyone
const getFundPosts = async (req, res) => {
    try {
        let filter = {};
        const query = await req.query;
        if (query.userId) {
            const { userId } = query;
            if (mongoose.Types.ObjectId.isValid(userId)) {
                const fundPosts = await FundModel.find({ userId }); // return userId posts
                if (!fundPosts) {
                    throw Error("Fundraise posts not found!");
                }
                return res.status(200).json({ message: "Fetched user's fundraise posts", result: fundPosts });
            } else {
                throw new Error("Invalid ObjectId");
            }
        }
        if (!query.userId) {
            const fundPosts = await FundModel.find({});  // return all posts 
            if (!fundPosts) {
                throw Error("Fundraise posts not found!");
            }
            return res.status(200).json(fundPosts);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// get one fund post
const getOneFundPost = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(401).json({ message: "ObjectId is invalid" });
        }
        const fundraisePost = await FundModel.findById(_id);
        if (fundraisePost) {
            return res.status(200).json({ message: "Fundraise post found", result: fundraisePost });
        } else {
            throw Error("Something went wrong");
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// add a new fund post
const addFundPost = async (req, res) => {
    try {
        const newFundraise = await FundModel.create(req.body);
        if (!newFundraise) {
            throw Error("Something went wrong");
        }
        res.status(201).json({ message: "Fundraise post created sucessfully", newFundraise });

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}

// update fundraise post
const updateFundPost = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(401).json({ message: "ObjectId is invalid" });
        }
        if (await FundModel.findByIdAndUpdate(_id, req.body, { new: true })) {
            return res.status(200).json({ message: 'Fundraise post updated successfully' });
        } else {
            throw Error("Something went wrong")
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}


// donation to the fundraise
const donateFund = async (req, res) => {
    try {
        const { fundraise, customer } = await req.body;
        const { id: fundraiseId } = await req.params;
        const idempotencyKey = uuid();

        if(!mongoose.Types.ObjectId.isValid(fundraiseId) || !fundraiseId){
            return res.status(422).json({message:"Invalid ObjectId"});
        }

        const fundraiseExist = await FundModel.exists({_id:fundraiseId}).select('_id');
        if(!fundraiseExist) return res.status(404).json({message:"Fundraise not found"});

        const newCustomer = await stripe.customers.create({
            name: customer?.name,
            email: customer?.email,
        });

        console.log(newCustomer);

        // collection of payment from customer 
        const paymentIntent = await stripe.paymentIntents.create({
            amount: fundraise?.amount * 1000, // takes in lowest currency rate i.e., paisa/cents etc
            currency: 'inr',
            customer:customer?._id,
            description: `Donation for ${fundraise?.name}`,
            automatic_payment_methods: {
                enabled: true,
            },
            receipt_email:customer?.email,
        });
        
        return res.status(200).json({message:'Payment successful',result:paymentIntent});


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}



// delete a fund post
const deleteFundPost = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        const { userId } = await req.body;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(401).json({ message: "Invalid id" });
        }
        const fundPost = await FundModel.findById(_id);
        const user = await UserModel.findById(userId);
        if (!fundPost) return res.status(404).json({ message: "Fundraise post not found" });
        if (!user) return res.status(404).json({ message: "User not found" });
        await FundModel.findByIdAndDelete({ _id });
        user.totalFundPostCount -= 1;
        await user.save();
        res.status(200).json({ message: "Fundraise post deleted successfully!" });

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}


module.exports = { getFundPosts, getOneFundPost, addFundPost, updateFundPost, donateFund, deleteFundPost };