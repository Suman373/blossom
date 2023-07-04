const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
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

module.exports = mongoose.model('FundModel', FundPostSchema);