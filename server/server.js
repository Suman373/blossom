const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser');
const fundPost = require('./routes/fundPostRoute');
const event = require('./routes/eventRoute');
require('dotenv').config();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,'/public')));

app.use('/api/funds', fundPost);
app.use('/api/events', event);

app.get('/', (req,res)=>  {
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'view','welcome.html'));
    }
} )
// app.get('/',(req,res)=> res.send("Welcome"))


const connectTODB = async()=>{
    try {
        const con = await mongoose.connect(
            process.env.MONGO_DB_URI,{
                useUnifiedTopology:true,
                useNewUrlParser:true
            }
        )
        console.log(`Mongo db is connected @ ${con.connection.host}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
connectTODB();

app.listen(PORT, 
    console.log(`Server is running on ${PORT}`));