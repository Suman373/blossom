const express = require('express');
const router = express.Router();
const passport = require("passport");

const {getUsers,getOneUser,passportAuth,
      loginUser,updateUser,followUser,unfollowUser,
      deleteUser} = require('../controllers/userController');

// ------ AUTH ROUTES -------
// passport authenticate
router.get('/google/callback',passportAuth);
// login success
router.get('/login/success',loginUser);
// failed login
router.get('/login/failed',(req,res)=>{
    res.status(401).json({error:true,message:"Login failed"})
});
// profile and email 
router.get('/google',passport.authenticate("google",["profile","email"]));
// logout
router.get('/logout',(req,res)=>{
    res.logout();
    res.redirect(process.env.URL);
});

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