const express = require('express');
const passport = require('passport');
const clientURL = process.env.CLIENT_REDIRECT_URL;
const router = express.Router();
const controllers = require('../controllers/authController');

// ------ AUTH ROUTES -------

// OAUTH2.0
// profile and email access
router.get('/google',passport.authenticate("google",["profile","email"]));
// passport authenticate -> auth screen
router.get('/google/callback',
    passport.authenticate("google",{
    successRedirect:`${clientURL}/home`,
    failureRedirect:"/login/failed"
})
);
// login success
router.get('/login/success',(req,res)=>{
    if(req.user){
        const {name,email,profileImage,_id} = req.user;
        return res.status(200).json({message:"Logged in successfully!",user:{name,email,profileImage,_id}});
    }else{
        return res.status(403).json({message:"User not authorized"});
    }
});
// failed login
router.get('/login/failed',(req,res)=>{
    res.status(401).json({error:true,message:"Login failed"});
    res.redirect(clientURL);
});
// logout
router.get('/logout',(req,res)=>{
    // session logout for a user
    req.logout({},(err)=>{
        console.log("Error",err);
    });
    res.redirect(clientURL);
});


// JWT AUTHENTICATION
// user registration with creds
router.post('/registration',controllers.registerUser);

// user login with creds
router.post('/login', controllers.loginUser);

// logout 
router.post('/signout',controllers.logoutUser);

module.exports = router;