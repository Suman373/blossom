const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    googleId:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
    },
    profileImage:[
        {
            fileUrl:String
        }],
    followers:[
        {
            type:ObjectId,
            ref:"UserModel"
        }],
    following:[
        {
            type:ObjectId,ref:"UserModel"
        }],

},{timestamps:true}
);

module.exports = mongoose.model('UserModel', UserSchema);