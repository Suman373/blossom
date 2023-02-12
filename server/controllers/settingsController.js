const UserModel = require('../models/userModel');

const updateSettings = async(req,res)=>{
    try {
        res.status(200).json({message:"Updated successfully!"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

module.exports = {updateSettings};