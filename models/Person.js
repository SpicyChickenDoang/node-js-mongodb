const mongoose = require('mongoose');

// MongoDB Schema
const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    age: {
        type: Number,
        required: true
    },

    job: ['teacher', 'banker', 'mechanic']
});

// this line is necessary
// everytime we wanna use it we call 'Posts'
module.exports = mongoose.model('Person', personSchema);
