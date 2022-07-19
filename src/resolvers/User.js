let {Post,Comment,User} = require("../../models/")
const { getUserId } = require("../utils/getUserId")

module.exports = {
    async posts(parent, args, { db }, info) {
        //console.log("????", parent.id)
        // return db.dummyDataPosts.filter(item => item.author == parent.id)
        try {
            let post = await Post.findAll({
                where: {
                    authorId:parent.id,
                    published:true
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
    email:{
        fragment: 'fragment userId on User { id }',
        async resolve(parent,args,ctx,info){
            // console.log(parent)
            // console.log(this.fragment)
            const userId = getUserId(ctx.req,false)
            // console.log(userId2)
    
            if(parent.dataValues.id == userId) {
                // console.log(parent.dataValues)
                return parent.email
            }
    
            return null
        }

    }
}
