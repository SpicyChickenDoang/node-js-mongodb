const bcrypt = require('bcrypt')
const Person = require('../models/Person')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.login = (async (req, res) => {
    //compare email and password

    const personEmail = req.body.email
    let found = ''
    const password = req.body.password

    if (!req.body.email || !req.body.password) return res.json('Email/Password Required')

    try {
        found = await Person.findOne({ email: personEmail })
        if (!(await bcrypt.compare(password, found.password))) {
            res.status(401).send('Wrong Password')
        } else {
            res.json('logged in well done')
            //jwt signing

        }
    } catch (error) {
        //res.json(error.message)
        res.status(404).json('User Not Found')
    }


    

})