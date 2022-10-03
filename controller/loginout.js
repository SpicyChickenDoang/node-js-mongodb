const bcrypt = require('bcrypt')
const Person = require('../models/Person')

exports.login = (async (req, res) => {
    //compare email and password

    const email = req.body.email
    let found = ''
    const password = req.body.password

    if (!req.body.email || !req.body.password) return res.send('Email/Password Required')
    

    try {
        found = await Person.findOne({ email: email })
        if (email == found.email && bcrypt.compareSync(password, found.password)) {
            res.send('logged in')
        }
    } catch (error) {
        res.send('Wrong Email/Password')
    }



})