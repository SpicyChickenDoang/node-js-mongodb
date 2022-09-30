// const express = require('express');
// const app = express();
const bcrypt = require('bcrypt')

const Person = require('../models/Person');

//app.use(express.json())

// get all Person
exports.getAllPerson = (async (req, res) => {

    try {
        const result = await Person.find()
        res.result = result
        res.send(result)

    } catch (error) {
        res.send(error.message)
    }
});

//get by id
exports.getByIdPerson = (async (req, res) => {
    const person_id = req.params.id

    try {
        const found = await Person.findById(person_id)
        if (!found) return res.send('No person found')
        console.log(found.password);
        res.send(found)
    } catch (error) {
        res.send(error.message)
    }
})

//post
exports.postPerson = (async (req, res) => {

    //const salt = await bcrypt.genSalt()
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password, 5)

    const postPerson = new Person({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedPerson = await postPerson.save();
        res.send(savedPerson);
        console.log(savedPerson);
    } catch (error) {
        res.send(error.message)
    }

})

// patch
exports.editPerson = (async (req, res) => {

    let hashedPassword;
    if (!req.body.password) {
        hashedPassword = req.body.password
    } else {
        const salt = await bcrypt.genSalt()
        const password = req.body.password
        hashedPassword = await bcrypt.hash(password, salt)
    }

    const person_id = req.params.id
    const editPerson = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }

    try {
        const editedResult = await Person.findByIdAndUpdate(person_id, editPerson, { new: true })
        console.log(editedResult);
        res.send(editedResult)

    } catch (error) {
        res.send(error.message)
    }

})

exports.findByIdAndDelete = (async (req, res) => {
    const person_id = req.params.id

    try {
        const deleted = await Person.findByIdAndDelete(person_id)
        res.send(`This person is deleted "${deleted.name}"`)
    } catch (error) {
        res.send(error.message)
    }

})

exports.deleteAll = (async (req, res) => {
    try {
        const deleted = await Person.deleteMany()
        res.send(deleted)
    } catch (error) {
        res.send(error.message)
    }
})


