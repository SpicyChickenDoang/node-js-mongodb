const mongoose = require('mongoose');

// MongoDB Schema
const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,

    }
}, {timestamps: true});

// this line is necessary
// everytime we wanna use it we call 'Person'
module.exports = mongoose.model('Person', personSchema);
