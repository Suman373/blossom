const mongoose = require('mongoose');
const UserModel = require('../models/userModel');
const passport = require('passport');
const { events } = require('../models/fundPostModel');


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

// @PUT follow user
const followUser = async (req, res) => {
    try {
        const { userId } = await req.params;
        const { followId } = await req.body; // followId is the id of the person to be followed by our user
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(followId)
            || !userId || !followId) {
            console.log('userId', userId);
            return res.status(422).json({ message: "Invalid id" });
        }

        const alreadyFollowing = await UserModel.findOne({ _id: userId, following: { $in: [followId] } }).countDocuments();
        if (alreadyFollowing) {
            throw new Error("You are already following this person");
        }
        // transaction


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// @PUT unfollow user
const unfollowUser = async (req, res) => {
    try {
        const { userId } = await req.params;
        const { unfollowId } = await req.body; // followId is the id of the person to be followed by our user
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(unfollowId)
            || !userId || !unfollowId) {
            return res.status(422).json({ message: "Invalid Id" });
        }
        // transaction


    } catch (error) {
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
            return res.status(404).json({ message: "User with id not found!" });
        }
        if (await UserModel.findByIdAndRemove({ _id })) {
            return res.status(200).json({ message: "User details deleted succesfully!" });
        } else {
            throw Error("Something went wrong");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getUsers, getOneUser, updateUser, followUser, unfollowUser, deleteUser };