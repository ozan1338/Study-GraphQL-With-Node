const jwt = require('jsonwebtoken')

const generatedToken = (id) => {
    // console.log(id)
    return jwt.sign({userId: id}, process.env.SECRET, {expiresIn: '7 days'})
}

module.exports = {generatedToken}