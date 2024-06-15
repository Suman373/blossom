const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const FundPostModel = require('../models/fundPost.model');


//  @GET all users
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, { _id: 1, name: 1, email: 1, profileImage: 1, createdAt: 1, amountDonated: 1 });
        if (!users) {
            return res.status(404).json({ message: "Users not found!" });
        }
        res.status(200).json({ message: "Users found", result: users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// @GET one user
const getOneUser = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(401).json({ message: "ObjectId is invalid" });
        }
        const user = await UserModel.findById(_id, { password: 0, googleId: 0 });
        if (!user) {
            return res.status(404).json({ message: "User with id not found!" });
        }
        res.status(200).json({ message: "User found", result: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}


// @PUT update user
const updateUser = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(401).json({ message: "ObjectId is invalid" });
        }
        const user = await UserModel.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User with id not found!" });
        }
        const updated = await UserModel.findByIdAndUpdate(_id, req.body, { new: true })
        if (updated) {
            return res.status(200).json({ message: "User details updated succesfully!", result: updated });
        } else {
            throw Error("Something went wrong");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// @PUT follow user (could have used Promise.all([followingArrPromise,followerArrPromise]))
const followUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { userId } = await req.params;
        const { followId } = await req.body; // followId is the id of the person to be followed by our user
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(followId)
            || !userId || !followId) {
            return res.status(422).json({ message: "Invalid id" });
        }

        const alreadyFollowing = await UserModel.findOne({ _id: userId, following: { $in: [followId] } }).countDocuments();
        if (alreadyFollowing) {
            throw new Error("You are already following this person");
        }
        await UserModel.findByIdAndUpdate(userId,{$push:{following:followId}},{session});
        await UserModel.findByIdAndUpdate(followId,{$push:{followers:userId}},{session});
        // commit transaction
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({message:"Followed succesfully"});
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// @PUT unfollow user
const unfollowUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { userId } = await req.params;
        const { unfollowId } = await req.body; // unfollowId is the id of the person to be unfollowed by our user
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(unfollowId)
            || !userId || !unfollowId) {
            return res.status(422).json({ message: "Invalid Id" });
        }
        const alreadyFollowing = await UserModel.findOne({_id:unfollowId,followers:{$in:[userId]}}).countDocuments();
        if(!alreadyFollowing){
            throw new Error("You are not following this person");
        }
        await UserModel.findByIdAndUpdate(userId,{$pull:{following:unfollowId}},{session});
        await UserModel.findByIdAndUpdate(unfollowId,{$pull:{followers:userId}},{session});
        // commit transaction
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({message:"Unfollowed successfully"});
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// @DELETE delete user
const deleteUser = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(401).json({ message: "ObjectId is invalid" });
        }
        const user = await UserModel.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await FundPostModel.deleteMany({userId:_id}); // delete fundposts created by user
        await UserModel.updateMany({following:_id},{$pull:{following:_id}}); // remove deleted user's ref from other's following arr
        await UserModel.findByIdAndRemove({ _id });
        res.status(200).json({message:"User deleted succesfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}


// @POST Complete user details form
const completeDetails = async(req,res)=>{
    try {
        const {id:_id} = await req.params;
        const {bio,dob,profileImage,phoneNumber,profession} = await req.body;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(422).json({ message: "Id is invalid" });
        }
        const user = await UserModel.findById(_id);
        if(!user) return res.status(404).json({message:"User not found"});
        if(!bio || !dob || !profileImage || !phoneNumber || !profession) return res.status(422).json({message:"Fill the details correctly"});
        await UserModel.findByIdAndUpdate(_id,req.body,{new:true});
        user.completedDetails = true;
        await user.save();
        res.status(200).json({message:"Details updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// @GET  followers
const getFollowers = async(req,res)=>{
    try {
        const {id:_id} = await req.params;
        if(!mongoose.Types.ObjectId.isValid(_id) || !_id){
            return res.status(422).json({message:"Invalid ObjectId"});
        }
        const followers = await UserModel.findById(_id).populate('followers',['_id','name','profileImage']).select('followers').exec();
        if(!followers) throw new Error("Failed to get followers");
        res.status(200).json({message:"Fetched followers",result:followers?.followers});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error?.message});
    }
}

// @GET following
const getFollowing = async(req,res)=>{
    try {
        const {id:_id} = await req.params;
        if(!mongoose.Types.ObjectId.isValid(_id) || !_id){
            return res.status(422).json({message:"Invalid ObjectId"});
        }
        const following = await UserModel.findById(_id).populate('following',['_id','name','profileImage']).select('following').exec();
        if(!following) throw new Error("Failed to get following");
        res.status(200).json({message:"Fetched following",result:following?.following});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error?.message});
    }
}

module.exports = { getUsers, getOneUser, 
    updateUser, followUser, unfollowUser,
    deleteUser, completeDetails, getFollowers, getFollowing };