const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const UserModel = require('./userModel');
const fundPostEventEmitter = require('../events/fundpostEventEmitter');

const FundPostSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:'FundModel',
        required:[true,"UserId is required"]
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
        type:Number,
        default:0
    },
    donors:[
        {
          type:ObjectId,
          ref:'UserModel'
        }
    ],
    status:{
        type:String,
        enum:["Open","Closed","Hold"],
        default:"Open"
    }
},
{timestamps:true}
);

// MIDDLEWARES
FundPostSchema.post('save', async function(doc){
    try {
        const savedUser = await UserModel.findById(doc.userId);
        if(!savedUser) throw new Error("User not found");
        savedUser.totalFundPostCount += 1; 
        await savedUser.save();
        // emit fundpost creation
        // fundPostEventEmitter.emit('fundPostCreated',{user:savedUser,fundPost:doc});
    } catch (error) {
        console.log("Error while creating fundraise post",error);
    }
});

module.exports = mongoose.model('FundModel', FundPostSchema);