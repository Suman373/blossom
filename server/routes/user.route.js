const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user.controller');

// ------- USER ROUTES -------
// get all users
router.get('/',controllers.getUsers);
// get unique user
router.get('/:id', controllers.getOneUser);
// completedDetails
router.post('/details/:id',controllers.completeDetails);
// update user details
router.put('/:id', controllers.updateUser);
// follow user
router.post('/:userId/follow', controllers.followUser);
// unfollow user
router.post('/:userId/unfollow', controllers.unfollowUser);
// delete user
router.delete('/delete/:id', controllers.deleteUser);
// get followers
router.get('/followers/:id', controllers.getFollowers);
// get following 
router.get('/following/:id', controllers.getFollowing);

module.exports = router;