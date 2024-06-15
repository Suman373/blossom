const {CronJob} = require('cron');
const FundModel = require('../models/fundPost.model');

const job = new CronJob('0 0 0 * * *', async function(){
    try {
        const currDate = new Date();
        const expiredFundRaises = await FundModel.find({ deadline:{ $lte:currDate }, status:"Open"});
        for(const fundraise of expiredFundRaises){
            fundraise.status = "Closed";
            await fundraise.save();
            console.log(`Status of fundraise post named ${fundraise?.title} was changed to closed`);
        }   
    } catch (error) {
        console.log(error);
    }
});

job.start();