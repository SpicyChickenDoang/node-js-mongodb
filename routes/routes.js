const express = require('express');
const router = express.Router();

const {hashUserPassword, authToken} = require('../controller/hashUser')

const loginoutController = require('../controller/loginout.js')
const notesController = require('../controller/notes-api.js');
const userController = require('../controller/user-api.js');
const userNoteController = require('../controller/userNotes.js');


router.post('/login', loginoutController.login)
router.post('/logout', loginoutController.logout)

/* similiar to that of a home page of twitter
where we can see everyones thoughts
*/
router.get('/home', userNoteController.viewAllNotes)
// create a user
router.post('/signup', hashUserPassword, userController.postUser)

// anything with auth jwt/basically we need to login first
router.get('/userAuth', authToken, userController.getAllUserAuth)
router.post('/postNotesById', authToken, userNoteController.postNotesByUserId)
router.get('/viewNotesByUserId', authToken, userNoteController.viewNotesByUserId)


// router.deleteById() delete individual notes
// router.editById() edit individual notes


// router.get('/notes', notesController.getAllNotes)
router.post('/notes/post', notesController.postNotes)
router.get('/notes/:id', notesController.getByIdNotes)
router.patch('/notes/edit/:id', notesController.editNotes)
router.delete('/notes/delete/:id', notesController.findByIdAndDelete)
router.delete('/notes/deleteAll', notesController.deleteAll)


router.get('/user', userController.getAllUser)
router.get('/user/:id', userController.getByIdUser)
router.patch('/user/edit/:id', userController.editUser)
router.delete('/user/delete/:id', userController.findByIdAndDelete)
router.delete('/user/deleteAll', userController.deleteAll)






module.exports = router;