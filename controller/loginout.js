const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.login = (async (req, res) => {
    //compare email and password

    const userEmail = req.body.email
    let found = ''
    const password = req.body.password

    if (!req.body.email || !req.body.password) return res.json('Email/Password Required')

    try {
        found = await User.findOne({ email: userEmail })
        if (!await bcrypt.compare(password, found.password)) {
            return res.status(401).send('Wrong Password')
        }
    } catch (error) {
        //res.json(error.message)
        return res.status(404).json('User Not Found')
    }

    found = {
        email: found.email,
        password: found.password,
    }

    const userToken = jwt.sign(found, process.env.ACCESS_TOKEN_KEY, {expiresIn: '24h'})
    // const userToken = jwt.sign(found, process.env.ACCESS_TOKEN_KEY, {expiresIn: '5s'})
    res.json({accessToken: userToken})
})

exports.logout = (req, res) => {
    // basically what we want is to disable userToken
}