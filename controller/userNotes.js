const express = require('express');
const { findByIdAndUpdate } = require('../models/Notes');
const app = express();
// const router = express.Router();

const Notes = require('../models/Notes');
const User = require('../models/User');

app.use(express.json())

exports.viewAllNotes = async (req, res) => {

    let allNotes = []
    let allUser = []
    let fullResult = []

    try {
        allUser = await User.find()//.sort({'date': -1}).limit(10)
        allNotes = await Notes.find()//.sort({'date': -1}).limit(100)
    } catch (error) {
        res.json(error.message)
    } finally {
        console.log('finally will always run');
    }

    // await User.find().then(res => allUser = res).catch(err) => res.json(err.message)
    // await Notes.find().then(res => allNotes = res).catch(err) => res.json(err.message)

    // allUser = await User.find()
    // allNotes = await Notes.find()
    // Promise.allSettled([allNotes, allUser]).then(([res,res2]) =>{
    //     console.log(allUser);
    //     console.log(allNotes);
    // })

    for (let i = 0; i < allUser.length; i++) {
        for (let j = 0; j < allNotes.length; j++) {
            if (allUser[i].email == allNotes[j].userEmail) {
                fullResult.push({
                    name: allUser[i].name,
                    // email: allUser[i].email,
                    title: allNotes[j].title,
                    desc: allNotes[j].description
                })
            }
        }
    }

    res.json(fullResult)

}

exports.postNotesByUserId = async (req, res) => {

    const postNotes = new Notes({
        userEmail: req.user.email,
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

exports.viewNotesByUserId = async (req, res) => {
    const findEmail = req.user.email
    let resultNotes
    let resultUser
    let fullNotes = []

    try {
        resultNotes = await Notes.find({ userEmail: findEmail })
        resultUser = await User.findOne({ email: findEmail })
        // resultUser = await User.find({ email: findEmail })
        console.log(resultUser);
    } catch (error) {
        res.send(error.message)
    }

    for (let i = 0; i < resultNotes.length; i++) {
        fullNotes.push({
            id: resultNotes[i].id,
            title: resultNotes[i].title,
            desc: resultNotes[i].description
        })
    }

    const userNotes = {
        userName: resultUser.name,
        userEmail: findEmail,
        notes: fullNotes
    }

    res.status(200).json({
        status: 201,
        message: 'OK',
        data: userNotes
    })

}

exports.editByNotesId = async (req, res) => {
    const notes_id = req.params.notesId
    const userEmail = req.user.email
    let result = 0

    const obj = {
        title: req.body.title,
        description: req.body.description
    }

    try {
        result = await Notes.findById(notes_id)
        if(userEmail != result.userEmail) return res.json('Not your Notes')
        result = await Notes.findByIdAndUpdate(notes_id, obj, { new: true })
    } catch (error) {
        return res.json('Update Failed, Try Again')
    }

    res.json(result)
}

exports.deleteByNotesId = async (req, res) => {
    const notes_id = req.params.notesId
    const userEmail = req.user.email
    let result = 0

    try {
        result = await Notes.findById(notes_id)
        if(userEmail != result.userEmail) return res.json('Not your Notes')
        result = await Notes.findByIdAndDelete(notes_id)
    } catch (error) {
        return res.json('Deletion Failed, Try Again')
    }

    res.json(`${result.title} is deleted`)
}