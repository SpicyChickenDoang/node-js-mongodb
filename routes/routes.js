const express = require('express');
const router = express.Router();

const {hashPersonPassword, authToken} = require('../controller/hashPerson')

const loginoutController = require('../controller/loginout.js')
const notesController = require('../controller/notes-api.js');
const personController = require('../controller/person-api.js');


router.post('/login', loginoutController.login)
router.post('/logout', loginoutController.logout)

router.get('/notes', notesController.getAllNotes)
router.post('/notes/post', notesController.postNotes)
router.get('/notes/:id', notesController.getByIdNotes)
router.patch('/notes/edit/:id', notesController.editNotes)
router.delete('/notes/delete/:id', notesController.findByIdAndDelete)
router.delete('/notes/deleteAll', notesController.deleteAll)


router.get('/person', personController.getAllPerson)
router.post('/person/post', hashPersonPassword, personController.postPerson)
router.get('/person/:id', personController.getByIdPerson)
router.patch('/person/edit/:id', personController.editPerson)
router.delete('/person/delete/:id', personController.findByIdAndDelete)
router.delete('/person/deleteAll', personController.deleteAll)

// anything with auth jwt
router.get('/personAuth', authToken, personController.getAllPersonAuth)



module.exports = router;