const express = require('express');
const app = express();
// const router = express.Router();

const Notes = require('../models/Notes');

app.use(express.json())

// get all Notes
exports.getAllNotes = (async (req, res, next) => {

    try {
        const result = await Notes.find()
        res.send(result)
    } catch (error) {
        console.log(error.message);
    }
});
const userId1 = 'this is the user id'
//post
exports.postNotes = (async (req, res) => {

    const postNotes = new Notes({
        userId: userId1,
        title: req.body.title,
        description: req.body.description
    })


    try {
        const savedNotes = await postNotes.save();
        res.send(savedNotes);
        console.log(savedNotes);
    } catch (error) {
        res.send(error.message)
    }

})

// patch
exports.editNotes = (async (req, res) => {
    const editNote = ({
        title: req.body.title,
        description: req.body.description,
    })

    const notes_id = req.params.id

    try {
        const updatedNotes = await Notes.findByIdAndUpdate(notes_id, editNote, { new: true })
        res.send(updatedNotes)
        console.log(updatedNotes);
    } catch (error) {
        console.log(error.message);
    }

})

exports.getByIdNotes = (async (req, res) => {
    const notes_id = req.params.id

    try {
        const found = await Notes.findById(notes_id)
        if (!found) return res.send('Notes is not found')
        res.send(found)
    } catch (error) {
        res.send(error.message)
    }
})

exports.findByIdAndDelete = (async (req, res) => {
    const notes_id = req.params.id

    try {
        const deleted = await Notes.findByIdAndDelete(notes_id)
        res.send(`This note is deleted "${deleted.title}"`)
    } catch (error) {

    }

})

exports.deleteAll = (async (req, res) => {
    
    try {
        const deleted = await Notes.deleteMany()
        res.send(deleted)
    } catch (error) {
        console.log(error.message);
    }
})

