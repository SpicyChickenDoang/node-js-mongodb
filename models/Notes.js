const mongoose = require('mongoose');

// MongoDB Schema
const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

// this line is necessary
// everytime we wanna use it we call 'Notes'
module.exports = mongoose.model('Notes', noteSchema);
