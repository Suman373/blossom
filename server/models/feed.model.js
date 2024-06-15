const mongoose = require('mongoose');
const UserModel = require('./user.model');
const {ObjectId} = mongoose.Schema.Types;

const FeedSchema = new mongoose.Schema({
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

// MIDDLEWARES
FeedSchema.post('save',async function(doc){
    try {
        const savedUser = await UserModel.findById(doc.userId);
        if(!savedUser) throw new Error("User not found");
        savedUser.totalFeedCount += 1;
        await savedUser.save();
    } catch (error) {
        console.log(error);
        console.log("Error while creating feed");
    }
});

module.exports = mongoose.model('FeedModel',FeedSchema);