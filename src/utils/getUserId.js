let jwt = require("jsonwebtoken")

const getUserId = (req, requireAuth=true, subscription = false) => {
    console.log(subscription)
    const header  =subscription ? req.context.Authorization : req.headers.authorization
    // console.log(header)
    if(header) {
        const token = header.split(' ')
        // console.log(">>>",token)
        const decoded = jwt.verify(token[1],process.env.SECRET)
        // console.log(decoded)
        return decoded.userId
    }
    
    // console.log(header)
    if(requireAuth) {
        // throw new Error()
        throw new Error('Authentication required')
    }
    
    return null
}

module.exports = {
    getUserId
}