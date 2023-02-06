const express = require('express');
const router = express.Router();
const {getEvents, addEvent} = require('../controllers/eventController');

// get all events
router.get('/',getEvents);
// add new event
router.post('/',addEvent);
// edit event 
// router.patch('/:id');
// delete
// router.delete('/:id');

module.exports = router;