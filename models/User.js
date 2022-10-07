const mongoose = require('mongoose');

// MongoDB Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: [true, "email is already taken"],
        unique: [true, 'email exist'],
        lowercase: true,
        validate: {
            validator: function(v){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not an email'
        }
    },
    password: {
        type: String,
        required: true,

    }
}, {timestamps: true});

// this line is necessary
// everytime we wanna use it we call 'Person'
module.exports = mongoose.model('User', userSchema);
