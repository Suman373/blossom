const { CronJob } = require('cron');
const EventModel = require('../models/eventModel');

/*field          allowed values
-----          --------------
second         0-59
minute         0-59
hour           0-23
day of month   1-31
month          1-12 (or names, see below)
day of week    0-7 (0 or 7 is Sunday, or use names)
*/

const job = new CronJob('0 0 0 * * *', async function checkDate() {
    try {
        const currDate = new Date();
        // find all events which has expired
        const expiredEvents = await EventModel.find({date:{ $lte: currDate }, status: "Open"});
        for(const event of expiredEvents){
            event.status = 'Closed';
            await event.save();
            console.log(`Event status updated for event ${event.name}`);
        }
        // console.log("Checked expired event every day");
    } catch (error) {
        console.log(error);
    }
});

job.start();