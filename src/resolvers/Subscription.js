module.exports = {
    comment: {
        subscribe(parent, args, { db, pubsub }, info) {
            const {postId} = args

            const post = db.dummyDataPosts.find(item => item.id == postId && item.published)

            if(!post) {
                throw new Error("Post Not Found")
            }
            console.log(postId)
            return pubsub.asyncIterator(`comment ${postId}`) // comment 1 or 2 etc
        }
    },
    post: {
        subscribe(parent, args, {db,pubsub}, info) {
            return pubsub.asyncIterator('post')
        }
    }
}