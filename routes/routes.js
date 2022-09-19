const express = require('express');
const router = express.Router();

const notesController = require('../homey/notes-api.js');
const personController = require('../homey/person-api.js');

router.get('/notes', notesController.getAllNotes);
router.post('/notes/post', notesController.postNotes);
router.get('/notes/:id', notesController.getByIdNotes)
router.patch('/notes/edit/:id', notesController.editNotes)
router.put('/notes/edit/:id', notesController.editNotesPuts)
router.delete('/notes/delete/:id', notesController.deleteById)

module.exports = router;