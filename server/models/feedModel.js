const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const feedSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        required:true,
        ref:'FeedModel'
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    profileImage:{
        type:String,
        trim:true
    },
    caption:{
        type:String,
        trim:true,
        required:true
    },
    feedImg:{
        type:String,
        trim:true,
    },
    likes:[
        {
            type:ObjectId,
            ref:'UserModel'
        }
    ],
    likeCount:{
        type:Number,
        default:0
    }
},{timestamps:true});

module.exports = mongoose.model('FeedModel',feedSchema);