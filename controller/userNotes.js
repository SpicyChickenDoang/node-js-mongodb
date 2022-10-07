const express = require('express');
const app = express();
// const router = express.Router();

const Notes = require('../models/Notes');
const User = require('../models/User');

app.use(express.json())

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
            title: resultNotes[i].title,
            desc: resultNotes[i].description
        })

    }

    const userNotes = {
        userName: resultUser.name,
        userEmail: findEmail,
        notes: fullNotes
    }

    res.status(200).json(userNotes)

}

exports.viewAllNotes = async (req, res) => {

    let allNotes = []
    let allUser = []
    let obj = []

    try {
        allUser = await User.find()
        allNotes = await Notes.find()
    } catch (error) {
        res.json(error.message)
    } finally {
        console.log('inside finally');
    }

    // await User.find().then(res => allUser = res)
    // await Notes.find().then(res => allNotes = res)

    // allUser = await User.find()
    // allNotes = await Notes.find()
    // Promise.allSettled([allNotes, allUser]).then(([res,res2]) =>{
    //     console.log(allUser);
    //     console.log(allNotes);
    // })

    for (let i = 0; i < allUser.length; i++) {
        for (let j = 0; j < allNotes.length; j++) {
            if (allUser[i].email == allNotes[j].userEmail) {
                obj.push({
                    name: allUser[i].name,
                    // email: allUser[i].email,
                    title: allNotes[j].title,
                    desc: allNotes[j].description
                })
            }
        }
    }

    res.json(obj)
    
}