// const express = require('express');
// const app = express();
const bcrypt = require('bcrypt');

const User = require('../models/User');

//app.use(express.json())

// get all User
exports.getAllUser = (async (req, res) => {

    try {
        const result = await User.find()
        res.result = result
        res.json(result)

    } catch (error) {
        res.send(error.message)
    }
});

exports.getAllUserAuth = (async (req, res) => {
    console.log(req.user);

    try {
        const result = await User.find()
        res.result = result
        res.json(result)

    } catch (error) {
        res.send(error.message)
    }
});

//get by id
exports.getByIdUser = (async (req, res) => {
    const user_id = req.params.id

    try {
        const found = await User.findById(user_id)
        if (!found) return res.send('No user found')
        res.send(found)
    } catch (error) {
        res.send(error.message)
    }
})

//post
exports.postUser = (async (req, res) => {

    let savedUser
    const postUser = new User({
        name: req.body.name,
        email: req.body.email,
        //password: hashedPassword
        password: req.body.password
    })

    try {
        savedUser = await postUser.save();
    } catch (error) {
        return res.json(`${error.keyValue.email} already exist`)
    }

    const userObject = {
        name: savedUser.name,
        email: savedUser.email
    }

    res.json(userObject)

})

// patch
exports.editUser = (async (req, res) => {

    let hashedPassword;
    if (!req.body.password) {
        hashedPassword = req.body.password
    } else {
        const salt = await bcrypt.genSalt()
        const password = req.body.password
        hashedPassword = await bcrypt.hash(password, salt)
    }

    const user_id = req.params.id
    const editUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }

    try {
        const editedResult = await User.findByIdAndUpdate(user_id, editUser, { new: true })
        res.send(editedResult)

    } catch (error) {
        res.send(error.message)
    }

})

exports.findByIdAndDelete = (async (req, res) => {
    const user_id = req.params.id

    try {
        const deleted = await User.findByIdAndDelete(user_id)
        res.send(`This user is deleted "${deleted.name}"`)
    } catch (error) {
        res.send(error.message)
    }

})

exports.deleteAll = (async (req, res) => {
    try {
        const deleted = await User.deleteMany()
        res.send(deleted)
    } catch (error) {
        res.send(error.message)
    }
})


