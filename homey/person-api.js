const express = require('express');
const app = express();
const router = express.Router();

const Person = require('../models/Person');
app.use(express.json())

// get all Notes
router.get('/find', async (req, res) =>{

    try {
        const findNotes = await Notes.find();
        res.send(findNotes);
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/post' , async (req, res)=>{

    const postPerson = new Person({
        name: req.body.name,
        age: req.body.age,
        job: req.body.job
    });

    console.log(Person.job);

    console.log(postPerson);
    res.send(postPerson);

    // try {
    //     const savedPerson = await postPerson.save();
    //     res.send(savedPerson);
    // } catch (error) {
    //     res.send(error.message)
    // }

})

module.exports = router;