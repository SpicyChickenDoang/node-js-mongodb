const bcrypt = require('bcrypt')
const Person = require('../models/Person')

exports.login = (async (req, res) => {
    //compare email and password
    const email = req.body.email
    let found = ''
    const password = req.body.password

    if(!req.body.email){
        return res.send('email req')
    }

    try {
        found = await Person.findOne({ email: email })
    } catch (error) {
        console.log(error.message);
    }

    if (email == found.email && await bcrypt.compare(password, found.password)) {
        res.send('logged in')
    } else {
        res.send('Wrong email/password')
    }

})