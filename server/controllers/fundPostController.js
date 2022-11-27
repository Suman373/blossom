const mongoose = require('mongoose');
const FundPost = require('../models/fundPostModel');

// getting all fund posts made
const getFundPosts = async(req,res)=>{
    try {
        const fundPosts = await FundPost.find({}); // return all posts
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
        const fundPost = await FundPost.create(req.body);
        if(!fundPost){
            throw Error("Error found!");
        }
        res.status(200).json({message:"Success", data:fundPost});
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
            throw Error("Wrong id");
        }
        
        if(await FundPost.findByIdAndRemove({_id})){
            res.status(200).json({message: "Deleted successfully"});
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
}


module.exports = {getFundPosts, addFundPost, deleteFundPost};