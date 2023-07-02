const express = require('express');
const passport = require('passport');
const clientURL = "http://localhost:3000";
const router = express.Router();

// ------ AUTH ROUTES -------

// passport authenticate -> auth screen
router.get('/google/callback',
    passport.authenticate("google",{
    successRedirect:clientURL,
    failureRedirect:"/login/failed"
})
);
// login success
router.get('/login/success',(req,res)=>{
    if(req.user){
        return res.status(200).json({message:"Logged in successfully!",user:req.user})
    }else{
        return res.status(403).json({message:"User not authorized"});
    }
});
// failed login
router.get('/login/failed',(req,res)=>{
    res.status(401).json({error:true,message:"Login failed"});
    res.redirect(clientURL);
});
// profile and email access
router.get('/google',passport.authenticate("google",["profile","email"]));
// logout
router.get('/logout',(req,res)=>{
    // session logout for a user
    req.logout({},(err)=>{
        console.log("Error",err);
    });
    res.redirect(clientURL);
});

module.exports = router;