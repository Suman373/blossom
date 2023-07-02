const express = require('express');
const router = express.Router();
const passport = require("passport");

const {getUsers,getOneUser,updateUser,followUser,unfollowUser,
      deleteUser} = require('../controllers/userController');

// ------- USER ROUTES -------
// get all users
router.get('/',getUsers);
// get unique user
router.get('/:id',getOneUser);
// update user details
router.put('/:id',updateUser);
// follow user
router.put('/follow',followUser);
// unfollow user
router.put('/unfollow',unfollowUser);
// delete user
router.delete('/:id',deleteUser);

module.exports = router;