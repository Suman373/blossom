const EventEmitter = require('events');
const fundPostEventEmitter = new EventEmitter();
const UserModel = require('../models/user.model');

// on creation
fundPostEventEmitter.on('fundPostCreated',async({user,fundPost})=>{
    try {
        console.log(`New fundraise from ${user?.name}`);
        const followers = user.followers; // get followers arr
        if(followers.length < 1) throw new Error("No followers");
        // notify followers
        for(const followerId of followers){
            const follower = await UserModel.findById(followerId);
            if(follower){
                // handle notification
                console.log(follower,`New fundraise post from ${user?.name}: ${fundPost?.title}`);
            }
        }
    } catch (error) {
        console.log("Error while handling fundpost creation event",error);
    }
});

module.exports = fundPostEventEmitter;