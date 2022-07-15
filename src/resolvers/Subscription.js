const {User,Comment,Post} = require("../../models/")
const {Op} = require('sequelize')


module.exports = {
    comment: {
        async subscribe(parent, args, { db, pubsub }, info) {
            const {postId} = args

            // const post = db.dummyDataPosts.find(item => item.id == postId && item.published)
            const post = await Post.count({
                where:{
                    [Op.and]:[
                        {},
                        {id:postId},
                        {published:{
                            [Op.ne]:false
                        }}
                    ]
                }
            })

            if(!post) {
                throw new Error("Post Not Found")
            }
            // console.log(postId)
            return pubsub.asyncIterator(`comment ${postId}`) // comment 1 or 2 etc
        }
    },
    post: {
        subscribe(parent, args, {db,pubsub}, info) {
            return pubsub.asyncIterator('post')
        }
    }
}