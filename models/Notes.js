const mongoose = require('mongoose');

// MongoDB Schema
const noteSchema = mongoose.Schema({
    userId: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps: true});

// this line is necessary
// everytime we wanna use it we call 'Notes'
module.exports = mongoose.model('Notes', noteSchema);
