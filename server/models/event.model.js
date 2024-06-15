const mongoose = require('mongoose');
const UserModel = require('./user.model');
const {ObjectId} = mongoose.Schema.Types;

const EventSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
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
    },
    description:{
        type: String,
        trim: true,
        required: [true, "Description is required"]
    },
    city: {
        type: String,
        trim: true,
        required: [true, "City required"]
    },
    place:{
        type:String,
        trim:true,
        required:[true, "Place is required"],
    },
    date: {
        type: Date,
        required: [true, "Date required"]
    },
    time: {
        type: String,
        required: [true, "Time required"]
    },
    status:{
        type:String,
        trim:true,
        enum:["Open","Closed"],
        default:"Open"
    },
    imageURL: {
        type: String,
        trim: true,
        required: [true, "Image required"],
        validate:{
            validator:function(val){
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(val);
            },
            message: props=> `${props.value} is not valid URL`
        }
    },
    attendees:[
        {
            type:ObjectId,
            ref:'UserModel'
        }
    ]
}, { timestamps: true });

// MIDDLEWARES
EventSchema.post('save',async function(doc){
    try {
        const savedUser = await UserModel.findById(doc.userId);
        if(!savedUser) throw new Error("User not found");
        savedUser.totalEventsHeld +=1;
        await savedUser.save();
    } catch (error) {
        console.log(error);
        console.log("Error while creating event");
    }
});

module.exports = new mongoose.model("EventModel", EventSchema);