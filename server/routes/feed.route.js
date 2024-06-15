const express = require('express');
const router = express.Router();
const {getAllFeeds,getUserFeeds,addNewFeed, updateUserFeed, likeFeed} = require('../controllers/feed.controller');

// get all public feeds
router.get('/', getAllFeeds);
// get specific user feeds 
router.get('/:id', getUserFeeds);
// add new feed
router.post('/', addNewFeed);
// update a feed
router.put('/:id', updateUserFeed);
// like a feed or unlike
router.put('/like/:id', likeFeed);

module.exports = router;