const { default: mongoose } = require('mongoose');
const EventModel = require('../models/eventModel');

//  @GET All events
const getEvents = async(req,res)=>{
    try{
        const events = await EventModel.find({}); 
        if(!events){
            res.status(404).json({message:"Events not found!"});
            return;
        }
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

// @GET Event by Id
const getEventById = async(req,res)=>{
    try {
        const {id:_id} = await req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            throw Error("Invalid object id");
        }
        const event = await EventModel.findOne({_id});
        if(event){
            return res.status(200).json({message:"Event found!",result:event});
        }else{
            throw Error("Event with id doesn't exist!");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}


//  @POST New event
const addEvent = async(req,res)=>{
    try{
       const {eventName} = await req.body;
       if(await EventModel.findOne({eventName})){
            throw Error("Event with that name already exists! ");
       }
       const event = await EventModel.create(req.body);
       if(!event){
            throw Error("Something went wrong");
       }
       res.status(200).json({message:"Event created successfully!"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

// @PUT Edit event
const editEvent = async(req,res)=>{
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(401).json({ message: "ObjectId is invalid" });
        }
        if(!EventModel.findOne({_id})){
            throw Error("Event with id doesn't exist!");
        }
        await EventModel.findByIdAndUpdate(_id,req.body,{new:true});
        res.status(200).json({message:"Event updated successfully!"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

// @DELETE Delete event
const deleteEvent = async(req,res)=>{
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(401).json({ message: "ObjectId is invalid" });
        }
        if(!EventModel.findOne({_id})){
            throw error("Event with id doesn't exist!");
        }
        await EventModel.findByIdAndRemove({_id});
        res.status(200).json({message:"Event deleted successfully!"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

module.exports = {getEvents,getEventById, addEvent,editEvent, deleteEvent};