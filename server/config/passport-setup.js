const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/callback',
        clientID:keys.google.clientID,
        clientSecret:keys.google.secretID,
        scope:["profile","email"]

},(accessToken, refreshToken, profile, callback)=>{ // cb for passport 
    console.log("Authenticate");
    console.log(profile);
  })
);

passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
})