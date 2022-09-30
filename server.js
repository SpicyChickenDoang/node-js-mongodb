const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');


// the middleware below is used mostly for POST/PUT so that it
// will parse/change incoming req.body to the needed json format
// alternatively we can use 'npm install body-parser' and then import them
app.use(express.json());

//MIDDLEWARE
// app.use('/', ()=>{
//     // this app.use will execute when app.post is called
//     // basically saying, when app.post is called, do this first/do this in the middle of the process
//     console.log('this is the middleware');
// });

const routes = require('./routes/routes');
app.use('/', routes, (req, res, next) => {
    console.log(res.result);
    return 0;
})




// connect to MongoDB
var start = new Date().getTime();
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to MongoDB!!');
    var stop = new Date().getTime();

    console.log('Time to connect: ', (stop - start) / 1000);
});


app.listen(8080, () => {
    console.log('Server is running in port 8080');
});