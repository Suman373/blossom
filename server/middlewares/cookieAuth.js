const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const mongoose = require('mongoose');

const cookieAuth = async (req, res, next) => {
    try {
        const { token } = await req.cookies;
        if (!token) {
            return res.status(403).json({ message: "You are forbidden" });
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({message:"You are unauthorized. Invalid token"});
            }
            // payload has _id
            if (!mongoose.Types.ObjectId.isValid(decoded?.payload)) {
                return res.status(401).json({message:"You are unauthorized. Invalid token"});
            }
            const userId = await UserModel.findOne({ _id: decoded.payload }).select('_id');
            if (!userId) {
                return res.status(404).json({ message: "Token invalid. User doesn't exist" });
            }
            req.user = userId;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"You are unauthorized. Invalid token"});
    }
}

module.exports = cookieAuth;