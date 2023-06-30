const express = require('express');
const router = express.Router();
const {getEvents,getEventById, addEvent, editEvent, deleteEvent} = require('../controllers/eventController');

// get all events
router.get('/',getEvents);
// get event by id
router.get('/:id',getEventById);
// add new event
router.post('/',addEvent);
// edit event 
router.put('/:id',editEvent);
// delete event
router.delete('/:id',deleteEvent);

module.exports = router;