const mongoose = require('mongoose');
const FundModel = require('../models/fundPostModel');

// getting all fund posts made
const getFundPosts = async(req,res)=>{
    try {
        const fundPosts = await FundModel.find({}); // return all posts
        if(!fundPosts){
            throw Error("Fund Post is not found!");
        }
        res.status(200).json(fundPosts);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

// add a new fund post
const addFundPost = async(req,res)=>{
    try {
        // check and validate the payload
        if(await FundModel.create(req.body)){
            res.status(201).json({message:"Fund created successfully"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
}

// delete a fund post
const deleteFundPost = async(req,res)=>{
    try {
        const {id: _id} = await req.params;

        if(!mongoose.Types.ObjectId.isValid(_id)){
            throw Error("Not correct object id !");
        }
        if(await FundModel.findByIdAndRemove({_id})){
            res.status(200).json({message: "Deleted successfully"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
}


module.exports = {getFundPosts, addFundPost, deleteFundPost};