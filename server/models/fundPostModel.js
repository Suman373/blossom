const mongoose = require('mongoose');
const FundPostSchema = new mongoose.Schema({
    title:{
        type:String
    },
    about:{
        type:String
    },
    orgName:{
        type:String
    },
    amount:{
        type:String
    },
    deadline:{
        type:Date,
    }
},
{timestamps:true}
);

module.exports = mongoose.model('FundModel', FundPostSchema);