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
        const data = await FeedModel.findById({userId:_id}).exec();
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
        if(!await UserModel.find({name:name}).exec()){
            return res.status(404).json({message:"User not found"});
        }
        // validate mongoose id
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(422).json({message:"ObjectId is invalid"});
        }
        const newFeed = await UserModel.create(req.body);
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
        if(!await UserModel.find({name:name}).exec()){
            return res.status(404).json({message:"User not found"});
        }
        // validate mongoose id
        if(!mongoose.Types.ObjectId.isValid(_id) || 
        !mongoose.Types.ObjectId.isValid(userId)){
            return res.status(422).json({message:"ObjectId is invalid"});
        }
        const updatedFeed = await UserModel.findByIdAndUpdate(_id,req.body,{new:true});
        if(!updatedFeed){
            throw Error("Could not update feed");
        }
        res.status(200).json({message:"Feed updated successfully",result:updatedFeed});

    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

// @PUT like feed
const likeFeed = async(req,res)=>{
    try {
        const {id:_id} = await req.params; // this is the feed id
        const {likeId} = await req.body; // likeId is _id of the user who is liking
        // validate mongoose object id
        if(!mongoose.Types.ObjectId(_id) || !mongoose.Types.ObjectId(likeId)){
            return res.status(422).json({message:"ObjectId is invalid"});
        }
        // check if user has already liked the post or not
        const userAlreadyLiked = await FeedModel.findById()
        // update likes arr and likeCount
        await FeedModel.findByIdAndUpdate(_id,
            {
                $push:{likes:likeId}
            },{new:true},
            (err,result)=>{
                if(err) return res.status(422).json({message:err.message});
                console.log(result);
                UserModel.findByIdAndUpdate(_id,
                    {
                        $inc:{likeCount: 1}
                    },{new:true}
                )
                .then((res)=> res.status(200).json({message:"Feed liked successfully"}))
                .catch((err)=> res.status(400).json({message:err.message}));
            }  
        )
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

// @PUT unlike a feed

module.exports = {getAllFeeds, getUserFeeds, addNewFeed, updateUserFeed, likeFeed};