const express = require('express');
const app = express();
const router = express.Router();

const Notes = require('../models/Notes');
app.use(express.json())

// get all Notes
router.get('/find', async (req, res) => {

    try {
        const findNotes = await Notes.find();
        res.send(findNotes);
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/post', async (req, res) => {

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

// router.put();

// router.get();

// router.delete();

module.exports = router;