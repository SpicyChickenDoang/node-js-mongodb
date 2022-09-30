const express = require('express');
const router = express.Router();

//const hashPerson = require('../hashPerson')

const loginoutController = require('../controller/loginout.js')
const notesController = require('../controller/notes-api.js');
const personController = require('../controller/person-api.js');


router.post('/login', loginoutController.login)

router.get('/notes', notesController.getAllNotes)
router.post('/notes/post', notesController.postNotes)
router.get('/notes/:id', notesController.getByIdNotes)
router.patch('/notes/edit/:id', notesController.editNotes)
router.delete('/notes/delete/:id', notesController.findByIdAndDelete)
router.delete('/notes/deleteAll', notesController.deleteAll)


router.get('/person', personController.getAllPerson)
router.post('/person/post', personController.postPerson)
router.get('/person/:id', personController.getByIdPerson)
router.patch('/person/edit/:id', personController.editPerson)
router.delete('/person/delete/:id', personController.findByIdAndDelete)
router.delete('/person/deleteAll', personController.deleteAll)



module.exports = router;