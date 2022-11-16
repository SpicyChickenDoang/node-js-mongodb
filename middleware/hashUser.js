const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function hashUserPassword(req, res, next) {

      if (!req.body.password || req.body.password.includes(" "))
            return res.json('Require Password/Password contains spaces')

      const salt = await bcrypt.genSalt()
      const password = req.body.password
      const hashedPassword = await bcrypt.hash(password, salt)
      req.body.password = hashedPassword
      next()
}

let invalidToken = []

async function authToken(req, res, next) {
      // BEARER Token
      const authHeader = req.headers['authorization']
      /*
      the code below means if authHeader is true, then set the value 
      to authHeader.split(' ')[1]
      IF authHeader is false, set to undefined
      */
      // const token = authHeader && authHeader.split(' ')[1]
      // if(token == null) return res.send('no good token')

      if (!authHeader) return res.json('no good token')
      const token = authHeader.split(' ')[1]

      const findInvalidToken = invalidToken.find(el => el == token)
      if(token === findInvalidToken) return res.json('no good token')

      // jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, user) => {
      //       if (error) {
      //             console.log(error.message);
      //             return res.status(403).send('No Access')
      //       }

      //       req.user = user
      //       next()
      // })

      try {
            const userProfile = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            req.user = userProfile
      } catch (error) {
            return res.json('error no good token')
      }

      next()

}

function logoutToken(req, res, next) {

      // simple logout function without redis
      let token = req.headers['authorization']
      token = token.split(' ')[1]
      invalidToken.push(token)
      next()
}

module.exports = { hashUserPassword, authToken, logoutToken }