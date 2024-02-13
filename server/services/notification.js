const sendNotification = async (type, payload) => {
    try {
        switch (type) {
            case 'fundPostCreated':
                // new fundraise post from person
                console.log(`New fundraise post from`, payload);
                break;
            case 'eventCreated':
                // new event from person
                console.log(`New event from`, payload);
                break;
            case 'feedCreated':
                // new feed from person
                console.log(`New feed from `, payload);
                break;
            case 'newFollower':
                // new person started following you
                console.log(`Person started following you`);
                break;
            case 'donationReceived':
                // new person donated to your fundraise post
                console.log(`Person donated to your fundraise`);
                break;
            case 'newJoinee':
                // new person joined your event
                console.log(`Person joined your event`);
                break;
            default:
                console.log(`Invalid notification type ${type}`);
                throw new Error("Invalid notification type");
                break;
        }
    } catch (error) {
        console.log(`Error while sending notification. Type ${type}`, error);
    }
}

module.exports = sendNotification;