const mongoose = require('mongoose');
const FeedModel = require('../models/feedModel');
const UserModel = require('../models/userModel');

// @GET all feeds
const getAllFeeds = async(req,res)=>{
    try {
        const data = await FeedModel.find({});
        if(!data){
            return res.status(404).json({message:"Not found"});
        }
        res.status(200).json({message:"Fetched all feeds",result:data});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

// @GET specific feeds by user
const getUserFeeds = async(req,res)=>{
    try {
        const {id:_id} = await req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(422).json({message:"Invalid ObjectId"});
        }
        // get all docs having userId of _id
        const data = await FeedModel.find({userId:_id});
        if(!data){
            return res.status(404).json({message:"Not found"});
        }
        res.status(200).json({message:"Fetched feeds",result:data});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}


// @POST new feed
const addNewFeed = async(req,res)=>{
    try {
        const {name,userId:_id} = await req.body;
        // validate if user exists
        if(!await UserModel.findOne({name})){
            return res.status(404).json({message:"User not found"});
        }
        // validate mongoose id
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(422).json({message:"ObjectId is invalid"});
        }
        const newFeed = await FeedModel.create(req.body);
        if(!newFeed){
            throw Error("Could not add feed");
        }
        res.status(201).json({message:"Feed created successfully",result:newFeed});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

// @PUT update feed of user with id
const updateUserFeed = async(req,res)=>{
    try {
        const {id:_id} = await req.params;
        const {name,userId} = await req.body;
        // validate if user exists
        if(!await UserModel.findOne({name})){
            return res.status(404).json({message:"User not found"});
        }
        // validate mongoose id
        if(!mongoose.Types.ObjectId.isValid(_id) || 
        !mongoose.Types.ObjectId.isValid(userId)){
            return res.status(422).json({message:"ObjectId is invalid"});
        }
        const updatedFeed = await FeedModel.findByIdAndUpdate(_id,req.body,{new:true});
        if(!updatedFeed){
            throw Error("Could not update feed");
        }
        res.status(200).json({message:"Feed updated successfully",result:updatedFeed});

    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

// @PUT like/unlike feed 
const likeFeed = async(req,res)=>{
    try {
        const {id:_id} = await req.params; // feed id
        const {likeId} = await req.body; // userid (liker)
        if(!mongoose.Types.ObjectId(_id) || !mongoose.Types.ObjectId(likeId)){
            return res.status(422).json({message:"ObjectId is invalid"});
        }
        // update likes arr and likeCount
        // already like count 
        const userAlreadyLiked = await FeedModel.exists({_id,likes:{ $in: [likeId] }});
        if(userAlreadyLiked){
            // unlike
            const feed = await FeedModel.findByIdAndUpdate(_id, { $pull:{likes:likeId},$inc:{likeCount: -1} },{new:true});
            return res.status(200).json({message:"Unliked successfully",feed});
        }
        // like
        const feed = await FeedModel.findByIdAndUpdate(_id,{ $push:{likes:likeId}, $inc: { likeCount: 1 } },{new:true});
        res.status(200).json({message:"Liked successfully", feed});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}


module.exports = {getAllFeeds, getUserFeeds, addNewFeed, updateUserFeed, likeFeed};