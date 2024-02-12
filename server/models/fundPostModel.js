const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const UserModel = require('./userModel');

const FundPostSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:'FundModel'
    },
    title:{
        type:String,
        trim:true,
        required:[true,"Title required"]
    },
    description:{
        type:String,
        trim:true,
        required:[true,"Description required"]
    },
    cause:{
        type:String,
        trim:true,
        required:[true,"Cause required"]
    },
    orgName:{
        type:String,
        trim:true,
        required:[true,"Organisation name required"]
    },
    amount:{
        type:Number,
        required:[true,"Amount required"]
    },
    deadline:{
        type:Date,
        required:[true,"Deadline required"]
    },
    imageURL:{
        type:String,
        trim:true,
        required:[true,"ImageURL required"]
    },
    amountRaised:{
        type:Number
    },
    donors:[
        {
            userId:{type:ObjectId,ref:"FundModel"},
            donationAmount:{type:Number}
        }
    ]
},
{timestamps:true}
);

// MIDDLEWARES
// handle document update of associated user
FundPostSchema.post('save', async function(doc){
    try {
        const savedUser = await UserModel.findById(doc.userId);
        if(!savedUser) throw new Error("User not found");
        savedUser.totalFundPostCount += 1; 
        savedUser.createdFundPosts.push(doc._id);
        await savedUser.save();
    } catch (error) {
        console.log(error);
        console.log("Error while creating fundraise post");
    }
});

module.exports = mongoose.model('FundModel', FundPostSchema);