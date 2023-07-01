const mongoose = require('mongoose');
const UserModel = require('../models/userModel');
const passport = require('passport');


// @GET authenticate with passport 
const passportAuth = (req,res)=>{
    // handle google auth login w passport js
    passport.authenticate("google",{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:"/login/failed"
    })
}
//  @GET login user w comparing cookie sessions
const loginUser = async(req,res)=>{
    try {
        if(req.user){
            return res.status(200).json({message:"Logged in successfully!",user:req.user})
        }else{
            return res.status(403).json({message:"User not authorized"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}


//  @GET all users
const getUsers = async(req,res)=>{

}

// @GET one user
const getOneUser = async(req,res)=>{

}


// @PUT update user
const updateUser = async(req,res)=>{

}
// @PUT follow user
const followUser = async(req,res)=>{
    try {
        const {userId, followId} = await req.body; // followId is the id of the person to be followed by our user
        if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(followId)){
            return res.status(422).json({message:"Invalid ObjectId"});
        }
        
        UserModel.findByIdAndUpdate(followId,{
            $push:{followers:userId}
        },{new:true},
        (err,result)=>{
            if(err) return res.status(422).json({message:err.message});
            UserModel.findByIdAndUpdate(userId,{
                $push:{following:followId}
            },{new:true})
            .then((res)=>{return res.status(200).json({message:"Followed User"})})
            .catch((err)=>{return res.status(422).json({message:err.message})});
         }
        )
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}
// @PUT unfollow user
const unfollowUser = async(req,res)=>{
    try {
        const {userId, unfollowId} = await req.body; // followId is the id of the person to be followed by our user
        if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(unfollowId)){
            return res.status(422).json({message:"Invalid ObjectId"});
        }
        
        UserModel.findByIdAndUpdate(unfollowId,{
            $pull:{followers:userId}
        },{new:true},
        (err,result)=>{
            if(err) return res.status(422).json({message:err.message});
            UserModel.findByIdAndUpdate(userId,{
                $pull:{following:unfollowId}
            },{new:true})
            .then((res)=>{return res.status(200).json({message:"Unfollowed User"})})
            .catch((err)=>{return res.status(422).json({message:err.message})});
         }
        )  
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}
// @DELETE delete user
const deleteUser = async(req,res)=>{

}

module.exports = {getUsers,getOneUser,passportAuth,loginUser,updateUser,followUser,unfollowUser,deleteUser};