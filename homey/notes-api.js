// const express = require('express');
// const app = express();
// const router = express.Router();

const Notes = require('../models/Notes');
// app.use(express.json())

// get all Notes
exports.getAllNotes = (async (req, res) => {

    try {
        const findNotes = await Notes.find();
        res.send(findNotes);
    } catch (error) {
        res.send(error.message);
    }

});

exports.postNotes = (async (req, res) => {

    const postNotes = new Notes({
        // title: 'title',
        // description: 'description'
        title: req.body.title,
        description: req.body.description
    })


    try {
        const savedNotes = await postNotes.save();
        res.send(savedNotes);
    } catch (error) {
        res.send(error.message)
    }

})

//patch
exports.editNotes = (async (req, res) => {
    const editNote = ({
        title: req.body.title,
        description: req.body.description,
    })

    console.log(req.params.id);
    console.log(editNote);
    // Notes.findByIdAndUpdate()

    // try {
    //     const updateNotes = await editNote.findByIdAndUpdate(req.params.id, editNote);
    //     res.send(updateNotes)
    // } catch (error) {
    //     console.log(error.message);
    // }
})

// put
exports.editNotesPuts = (async (req, res) => {
    const editNote = new Notes({
        title: req.body.title,
        description: req.body.description,
    })

    console.log(req.params.id);
    console.log(editNote);
    
})

exports.getByIdNotes = (async (req, res) => {
    console.log('get by id notes');
})

exports.deleteById = (async (req, res) => {
    console.log('delete by id');
})

