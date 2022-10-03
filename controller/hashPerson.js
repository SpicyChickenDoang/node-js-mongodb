const bcrypt = require('bcrypt')

async function hashPersonPassword(req, res, next){
      const salt = await bcrypt.genSalt()
      const password = req.body.password
      const hashedPassword = await bcrypt.hash(password, salt)
      req.body.password = hashedPassword
      next()   
}

module.exports = {hashPersonPassword}