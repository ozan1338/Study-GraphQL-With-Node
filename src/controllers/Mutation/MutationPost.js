const {User,Comment,Post} = require("../../../models")
let MutationPost = {}

MutationPost.createPost = (parent, args, { db, pubsub }, info) => {
    const UserIdExist = db.dummyDataUsers.some(item => item.id == args.data.author)

    if(!UserIdExist) {
        throw new Error('User Not Exist')
    }

    const post = {
        id: uuidv4.v4(),
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: args.data.author
    }

    db.dummyDataPosts.push(post)

    if(args.data.published == true) pubsub.publish('post', 
    {
        post:{
            mutation: "CREATED",
            data:post
        }
    })

    return post
}

MutationPost.deletePost = (parent, args, { db,pubsub }, info) => {
    const postIndex = db.dummyDataPosts.findIndex(item => item.id == args.postId)

    if(postIndex == -1) {
        throw new Error("Post Not Found")
    }

    const deletedPost = db.dummyDataPosts.splice(postIndex, 1)

    db.dummyDataComments = db.dummyDataComments.filter(item => item.post != args.postId)

    // console.log(deletedPost[0])

    if(deletedPost[0].published == true) {
        //console.log("deletedPost",deletedPost[0])
        pubsub.publish('post', 
        {
            post:{
                mutation: "DELETED",
                data:deletedPost[0]
            }
        })
    }

    return deletedPost[0]
}

MutationPost.updatePost = (parent, args, { db,pubsub }, info) => {
    const {postId,data} = args

    const post = db.dummyDataPosts.find(item => item.id == postId)
    const originalPost = {...post}

    if(!post) throw new Error("Post not found")

    if(post.author != data.author) throw new Error("Only Author Can Update this Post!")

    if (data.title) post.title = data.title

    if (data.body) post.body = data.body

    if (typeof data.published == 'boolean') {
        post.published = data.published

        if(originalPost.published && !post.published) {
            //deleted

            pubsub.publish('post', {
                post: {
                    mutation:'DELETED',
                    data: originalPost
                }
            })

        }else if (!originalPost.published && post.published) {
            //created

            pubsub.publish('post', {
                post: {
                    mutation: "CREATED",
                    data:post
                }
            })
        }

    }else {
        //data updated
        pubsub.publish('post',{
            post: {
                mutation:"UPDATED",
                data: post
            }
        })
    }

    return post
},

module.exports = MutationPost