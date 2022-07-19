let {Post,Comment,User} = require("../../models/")
const { getUserId } = require("../utils/getUserId")

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
    },
    async email(parent,args,ctx,info){
        // console.log(parent.dataValues)
        const userId = getUserId(ctx.req,false)
        // console.log(userId)

        if(parent.dataValues.id == userId) {
            // console.log(parent.dataValues)
            return parent.email
        }

        return null
    }
}
