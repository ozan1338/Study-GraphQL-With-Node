let QueryComment = require('../controllers/Query/QueryComment')
let QueryUser = require('../controllers/Query/QueryUser')
let QueryPost = require('../controllers/Query/QueryPost')

module.exports = {
    ...QueryComment,
    ...QueryPost,
    ...QueryUser
}