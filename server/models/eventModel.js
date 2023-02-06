const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        trim:true,
    },
    orgName:{
        type:String,
        trim:true,
    },
    location:{
        type:String,
        trim:true,
    },
    eventDate:{
        type:Date,
    },
    eventTime:{
        type:String,
        trim:true,
    }
},{timestamps:true});

module.exports = new mongoose.model("EventModel", EventSchema);