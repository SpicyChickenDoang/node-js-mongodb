const bcrypt = require('bcrypt')

function hashPerson(req, res, next){
      const password = req.body.password
      const hashedPassword = bcrypt.hashSync(password, 64)
      console.log(hashedPassword);
      next()
    
}

module.exports = {hashPerson}