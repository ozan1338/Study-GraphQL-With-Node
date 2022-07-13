let QueryComment = {}
const {Comment} = require("../../../../models")

QueryComment.comments = async (parent,args,{ db },info) => {
    try {
        let comment = await Comment.findAll()
        return comment
    } catch (error) {
        console.log(error)
    }
}

module.exports = QueryComment