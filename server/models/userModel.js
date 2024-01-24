const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    completedDetails:{
        type:Boolean,
        default:false,
    },
    googleId:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    profileImage:{
        type:String,
    },
    profession:{
        type:String,
        trim:true,
    },
    bio:{
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
    dob:{
        type:Date,
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

// user registration 
UserSchema.statics.register = async function({name,email,password}){
    // exists
    const emailExists = await this.findOne({email});
    if(emailExists){
        throw new Error("Email already exists");
    }
    // validation 
    if(!validator.isEmail(email)){throw new Error("Email not valid");}
    if(!validator.isStrongPassword(password)){throw new Error("Password not strong enough");}
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({name,email,password:hash});
    if(!user){
        throw new Error("User registration failed");
    }
    return user;
}

// user login
UserSchema.statics.login = async function(email,password){
       // not exists
       const savedUser = await this.findOne({email});
       if(!savedUser){
           throw new Error("Email is not registered");
       }
       console.log(email,password);
       console.log(savedUser);
       // verify
       const match = await bcrypt.compare(password,savedUser.password);
       if(!match){
         throw new Error("Password is incorrect");
       }
       return savedUser;
}

module.exports = mongoose.model('UserModel', UserSchema);