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

      if (!authHeader) return res.send('no good token')
      const token = authHeader.split(' ')[1]

      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, user) => {
            if (error) {
                  console.log(error.message);
                  return res.status(403).send('No Access')
            }
            
            req.user = user
            next()
      })

}

async function refreshToken(req, res, next) {
      //do wee need a refresh token?
}

module.exports = { hashUserPassword, authToken, refreshToken }