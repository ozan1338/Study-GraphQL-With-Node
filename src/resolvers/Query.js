let QueryComment = require('./controllers/QueryComment')
let QueryUser = require('./controllers/QueryUser')
let QueryPost = require('./controllers/QueryPost')

module.exports = {
    ...QueryComment,
    ...QueryPost,
    ...QueryUser
}