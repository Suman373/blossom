const mongoose = require('mongoose');
const FundPostSchema = new mongoose.Schema({
    title:{
        type:String
    },
    goal:{
        type:String
    },
    orgName:{
        type:String
    },
    amount:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},
{timestamps:true}
);

const FundPost = mongoose.model('FundPost', FundPostSchema);
module.exports = FundPost;