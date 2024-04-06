const { default: mongoose } = require('mongoose');
const EventModel = require('../models/eventModel');

//  @GET All events
const getEvents = async (req, res) => {
    try {
        // let filters = {};
        // if (req.query.orgName) {
        //     filters.organisation = req.query.orgName;
        // }
        // if (req.query.date) {
        //     filters.date = { $gte: new Date(req.query.date) }; // on or after date
        // }
        // if (req.query.place) {
        //     filters.place = req.query.place;
        // }
        // if (req.query.city) {
        //     filters.city = req.query.city;
        // }
        // const events = await EventModel.find(filters);
        const query = await req.query;
        if(query.userId){
            const {userId} = query;
            if(mongoose.Types.ObjectId.isValid(userId)){
                const events = await EventModel.find({userId}); // return userId events
                if (!events) {
                    throw Error("Events not found!");
                }
                return res.status(200).json({message:"Fetched user's events",result:events});
            }else{
                throw new Error("Invalid ObjectId");
            }
        }
        if(!query.userId){
            const events = await EventModel.find({});  // return all events 
            if (!events) {
                throw Error("Events not found!");
            }
            return res.status(200).json(events);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// @GET Event by Id
const getEventById = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw Error("Invalid object id");
        }
        const event = await EventModel.findById(_id).populate('attendees',['_id','name','profileImage']); // send event along with populated list of attendees
        if(!event)return res.status(404).json({message:"Event not found"});
        res.status(200).json({message:"Fetched event",result:event});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}


//  @POST New event
const addEvent = async (req, res) => {
    try {
        const { name, organisation, description, place, city, time, date, imageURL } = await req.body;
        if (!name || !organisation || !description || !place || !city || !time || !date || !imageURL) {
            throw Error("Fill up the all the required details!");
        }
        if (await EventModel.findOne({ name })) {
            throw Error("Event with that name already exists! ");
        }
        const event = await EventModel.create(req.body);
        if (!event) {
            throw Error("Could not create event");
        }
        res.status(200).json({ message: "Event created successfully!" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// @PUT Edit event
const editEvent = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(422).json({ message: "ObjectId is invalid" });
        }
        if (!EventModel.findOne({ _id })) {
            throw Error("Event with id doesn't exist!");
        }
        const result = await EventModel.findByIdAndUpdate(_id, req.body, { new: true });
        if (!result) {
            throw Error("Could not update event");
        }
        res.status(200).json({ message: "Event updated successfully!" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// @DELETE Delete event
const deleteEvent = async (req, res) => {
    try {
        const { id: _id } = await req.params;
        if (!mongoose.Types.ObjectId.isValid(_id) || !_id) {
            return res.status(401).json({ message: "ObjectId is invalid" });
        }
        if (!EventModel.findOne({ _id })) {
            throw error("Event with id doesn't exist!");
        }
        await EventModel.findByIdAndRemove({ _id });
        res.status(200).json({ message: "Event deleted successfully!" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}


// @POST Attend event
const attendEvent = async (req, res) => {
    try {
        const { id: eventId } = req.params;
        const { userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        // doesnt exist
        const eventExist = await EventModel.exists({ _id: eventId }).select('userId');
        if (!eventExist) return res.status(404).json({ message: "Event not found" });
        // cant attend events created by themself
        if (eventExist.userId.toString() === userId) {
            throw new Error("Cannot attend events created by yourself");
        }
        // already attending
        const isAttending = await EventModel.findOne({ _id: eventId, attendees: { $in: [userId] } }).countDocuments();
        if (isAttending) {
            throw new Error("You are already attending");
        }
        // attend event
        const event = await EventModel.findByIdAndUpdate(eventId, {
            $push: { attendees: userId }
        }, { new: true });
        if (!event) throw new Error("Could not attend event");
        res.status(200).json({ message: "Attending event" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}

// @POST Leave event
const leaveEvent = async (req, res) => {
    try {
        const { id: eventId } = req.params;
        const { userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(422).json({ message: "Id not valid" });
        }
        // doesnt exist
        const eventExist = await EventModel.exists({ _id: eventId }).select('userId');
        if (!eventExist) return res.status(404).json({ message: "Event not found" });
        // cant leave events created by themself
        if (eventExist.userId.toString() === userId) {
            throw new Error("Cannot leave events created by yourself");
        }
        // not attending
        const isAttending = await EventModel.findOne({ _id: eventId, attendees: { $in: [userId] } }).countDocuments();
        if (!isAttending) {
            throw new Error("You are not attending this event");
        }
        // leave event
        const event = await EventModel.findByIdAndUpdate(eventId, {
            $pull: { attendees: userId }
        }, { new: true });
        if (!event) throw new Error("Could not leave event");
        res.status(200).json({ message: "Left event" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error?.message });
    }
}



module.exports = { getEvents, getEventById, addEvent, editEvent, deleteEvent, attendEvent, leaveEvent };