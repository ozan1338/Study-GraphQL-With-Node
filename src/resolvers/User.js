let {Post,Comment} = require("../../models/")

module.exports = {
    async posts(parent, args, { db }, info) {
        //console.log("????", parent.id)
        // return db.dummyDataPosts.filter(item => item.author == parent.id)
        try {
            let post = await Post.findAll({
                where: {
                    authorId:parent.id
                }
            })

            return post
        } catch (error) {
            console.log(error)
        }
    },
    async comments(parent, args, { db }, info) {
        // return db.dummyDataComments.filter(item => item.author == parent.id)
        try {
            let comment = await Comment.findAll({
                where:{
                    userId:parent.id
                }
            })

            return comment
        } catch (error) {
            console.log(error)
        }
    }
}
