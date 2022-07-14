const {User,Comment,Post} = require("../../models")

module.exports = {
    async author(parent, args, { db }, info) {
        const user = await User.findOne({
            where:{
                id:parent.userId
            }
        })
        // return db.dummyDataUsers.find(item => item.id == parent.author)
        return user
    },
    async post(parent, args, { db }, info) {
        // return db.dummyDataPosts.find(item => item.id == parent.post) 
        const post = await Post.findOne({
            where:{
                id:parent.postId
            }
        })

        return post
    }
}