const express = require('express');
const app = express();
// const router = express.Router();

const Notes = require('../models/Notes');
const Person = require('../models/Person');

app.use(express.json())

exports.postNotesByPersonId = async (req, res) => {

    const postNotes = new Notes({
        userEmail: req.person.email,
        title: req.body.title,
        description: req.body.description
    })

    try {
        const savedNotes = await postNotes.save();
        res.status(201).json(savedNotes);
    } catch (error) {
        res.send(error.message)
    }
}

exports.viewNotesByPersonId = async (req, res) => {
    const findEmail = req.person.email
    let resultNotes
    let resultPerson
    let fullNotes = []

    try {
        resultNotes = await Notes.find({ userEmail: findEmail })
        resultPerson = await Person.findOne({ email: findEmail })
        // resultPerson = await Person.find({ email: findEmail })
        console.log(resultPerson);
    } catch (error) {
        res.send(error.message)
    }

    for (let i = 0; i < resultNotes.length; i++) {

        fullNotes.push({
            title: resultNotes[i].title,
            desc: resultNotes[i].description
        })

    }

    const obj = {
        userName: resultPerson.name,
        userEmail: findEmail,
        notes: fullNotes
    }

    console.table(obj)
    res.status(200).json(obj)

}