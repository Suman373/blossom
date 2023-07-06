const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const EventSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'EventModel',
        required: [true, "Id required"]
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Name required"]
    },
    organisation: {
        type: String,
        trim: true,
        required: [true, "Organisation name required"]
    },
    location: {
        type: String,
        trim: true,
        required: [true, "Location required"]
    },
    date: {
        type: Date,
        required: [true, "Date required"]
    },
    time: {
        type: String,
        required: [true, "Time required"]
    },
    imageURL: {
        type: String,
        trim: true,
        required: [true, "Image required"]
    },
    // totalLikes:{
    //     type:Number
    // },
    // likedBy:[
    //     {
    //         type:ObjectId,
    //         ref:"UserModel"
    //     }
    // ],
    // totalComments:{
    //     type:Number
    // },
    // comments:[
    //     {
    //         userId:{type:ObjectId},
    //         text:{type:String},
    //         createdAt:Date.now(),
    //     }
    // ],
    attendees:[
        {
            type:ObjectId
        }

    ]
}, { timestamps: true });

module.exports = new mongoose.model("EventModel", EventSchema);