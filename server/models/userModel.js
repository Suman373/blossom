const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    googleId:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    profileImage:{
        type:String,
        required:true,
    },
    profession:{
        type:String,
        trim:true,
    },
    phoneNumber:{
        type:Number,
        maxLength:12
    },
    age:{
        type:String,
        trim:true
    },
    amountDonated:{
        type:Number
    },
    eventsHeld:[
        {
            name:{type:String},
        }
    ],
    eventsAttended:[
        {
            name:{type:String},
        }
    ],
    followers:[
        {
            type:ObjectId,
            ref:"UserModel"
        }],
    following:[
        {
            type:ObjectId,
            ref:"UserModel"
        }],

},{timestamps:true}
);

module.exports = mongoose.model('UserModel', UserSchema);