const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    sessionId:{
        type: String,
        required:true,
        trim:true,
    },
    fundraiseName:{
        type: String,
        required:true,
        trim:true,
    },
    amount_total:{
        type: Number,
        required:true,
    },
    amount_subtotal:{
        type: Number,
    },
    currency:{
        type: String,
        enum:['inr','usd','yen','eur','aud'],
        default:'inr'
    },
    customerDetails:{
        country:{
            type: String,
            trim:true,
        },
        email:{
            type: String,
            trim:true
        },
        name:{
            type: String,
            trim:true
        },
        phone:{
            type: Number,
        }
    },
    fundraiseId:{
        type: mongoose.SchemaTypes.ObjectId,
        required:true,
    },
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('DonationModel',DonationSchema);