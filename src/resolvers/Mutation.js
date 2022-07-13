const uuidv4 = require('uuid')
let MutationUser = require('../controllers/Mutation/MutationUser')

module.exports = {
    ...MutationUser,
    createPost(parent, args, { db, pubsub }, info) {
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
    },
    createComment(parent, args, { db,pubsub }, info) {
        const UserExist = db.dummyDataUsers.some(item => item.id == args.data.author)

        if(!UserExist){
            throw new Error("User Not Exist")
        }

        let PostIsExist = false

        for(let item of db.dummyDataPosts){
            if(item.id == args.data.post){
                if(item.published != true){
                    throw new Error("Post Has Not Been Published")
                }else {
                    PostIsExist = true
                }
            }
        }

        if(!PostIsExist) {
            throw new Error("Post Is Not Exist")
        }
        // console.log(args)

        const Comment = {
            id:uuidv4.v4(),
            comment: args.data.comment,
            author: args.data.author,
            post: args.data.post
        }

        db.dummyDataComments.push(Comment)
        console.log(args.data.post)
        pubsub.publish(`comment ${args.data.post}`, {
            comment: {
                mutation:"CREATED",
                data:Comment
            }
        })

        return Comment
    },
    deletePost(parent, args, { db,pubsub }, info){
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
    },
    deleteComment(parent,args,{ db,pubsub },info) {
        const commentIndex = db.dummyDataComments.findIndex(item => item.id == args.commentId)

        if(commentIndex == -1) {
            throw new Error("Comment not found")
        }

        const deletedComment = db.dummyDataComments.splice(commentIndex, 1)

        pubsub.publish(`comment ${deletedComment[0].post}`,{
            comment: {
                mutation: "DELETED",
                data:deletedComment[0]
            }
        })

        return deletedComment[0]
    },
    updatePost(parent, args, { db,pubsub }, info) {
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
    updateComment(parent, args, { db, pubsub }, info) {
        const {commentId,data} = args

        const comment = db.dummyDataComments.find(item => item.id == commentId)

        if(!comment) throw new Error("Comment not found")

        if(comment.author != data.author) throw new Error("Only Author Can Update this Comment!")

        if(data.comment) comment.comment = data.comment

        console.log("updated comment",comment.post)

        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: "UPDATED",
                data:data
            } 
        })

        return comment
    }
}