const express = require('express');
const router = express.Router();
const controllers = require('../controllers/event.controller');

// get all events
router.get('/',controllers.getEvents);
// get event by id
router.get('/:id',controllers.getEventById);
// add new event
router.post('/',controllers.addEvent);
// edit event 
router.put('/:id',controllers.editEvent);
// delete event
router.delete('/:id',controllers.deleteEvent);
// attend event
router.post('/:id/attend',controllers.attendEvent);
// leave event
router.post('/:id/leave',controllers.leaveEvent);

module.exports = router;