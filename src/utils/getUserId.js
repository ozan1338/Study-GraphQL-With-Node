let jwt = require("jsonwebtoken")

const getUserId = (req) => {
    const header  =req.headers.authorization

    if(!header) {
        throw new Error('Authentication required')
    }

    // console.log(header)

    const token = header.split(' ')
    // console.log(">>>",token)
    const decoded = jwt.verify(token[1],process.env.SECRET)

    // console.log(decoded)

    return decoded.userId
}

module.exports = {
    getUserId
}