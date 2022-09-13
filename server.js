const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
require('./models/Notes');

// the middleware below is used mostly for POST/PUT so that it
// will parse/change incoming req.body to the needed json format
// alternatively we can use 'npm install body-parser' and then import them
app.use(express.json());

const notes = require('./homey/notes-api.js');
const person = require('./homey/person-api.js');
//MIDDLEWARE
// app.use('/', ()=>{
//     // this app.use will execute when app.post is called
//     // basically saying, when app.post is called, do this first/do this in the middle of the process
//     console.log('this is the middleware');
// });

app.use('/notes', notes);
app.use('/person', person);


// connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to MongoDB!');
});


app.listen(8000, () => {
    console.log('Server is running in port 8000');
});