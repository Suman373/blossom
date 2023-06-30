const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    organisation:{
        orgName:{type:String,trim:true},
        orgType:{type:String,trim:true}
    },
    location:{
        type:String,
        trim:true,
    },
    date:{
        type:Date,
    },
    time:{
        type:String,
        trim:true,
    },
    image:{
        fileUrl:{type:String,trim:true}
    }
},{timestamps:true});

module.exports = new mongoose.model("EventModel", EventSchema);