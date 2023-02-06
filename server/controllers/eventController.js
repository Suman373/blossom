const EventModel = require('../models/eventModel');

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

const addEvent = async(req,res)=>{
    try{
       const {eventName} = await req.body;
       if(await EventModel.findOne({eventName})){
            throw Error("Event with that name already exists! ");
       }
       const event = await EventModel.create(req.body);
       if(!event){
            throw Error("There was a problem while creating event!");
       }
       res.status(200).json({message:"Event created successfully!"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

module.exports = {getEvents, addEvent};