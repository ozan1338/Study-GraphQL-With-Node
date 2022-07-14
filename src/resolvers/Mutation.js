const uuidv4 = require('uuid')
let MutationUser = require('../controllers/Mutation/MutationUser')
let MutationPost = require('../controllers/Mutation/MutationPost')
let MutationComment = require('../controllers/Mutation/MutationComment')

module.exports = {
    ...MutationUser,
    ...MutationPost,
    ...MutationComment
}