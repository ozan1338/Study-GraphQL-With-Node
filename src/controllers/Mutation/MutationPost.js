const {User,Comment,Post} = require("../../../models")
const helpers = require('../../helper/index')
let MutationPost = {}

MutationPost.createPost = async(parent, args, { db, pubsub }, info) => {
    // const UserIdExist = db.dummyDataUsers.some(item => item.id == args.data.author)

    const UserIdExist = await User.findOne({
        where:{
            id:args.data.author
        }
    })

    if(!UserIdExist) {
        throw new Error('User Not Exist')
    }

    const post = {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        authorId: args.data.author
    }

    const result = await Post.create({...post,raw:true,nest:true})

    // db.dummyDataPosts.push(post)

    if(args.data.published == true) pubsub.publish('post', 
    {
        post:{
            mutation: "CREATED",
            data:post
        }
    })

    return result.dataValues
}

MutationPost.deletePost = async (parent, args, { db,pubsub }, info) => {
    // const postIndex = db.dummyDataPosts.findIndex(item => item.id == args.postId)

    const result = await helpers.deleteRow(args.postId,'Post')

    // console.log(result)

    if(result.isExist == 0) {
        throw new Error("Post Not Found")
    }

    // const deletedPost = db.dummyDataPosts.splice(postIndex, 1)

    // db.dummyDataComments = db.dummyDataComments.filter(item => item.post != args.postId)

    // console.log(deletedPost[0])

    if(result.data.published == true) {
        //console.log("deletedPost",deletedPost[0])
        pubsub.publish('post', 
        {
            post:{
                mutation: "DELETED",
                data:deletedPost[0]
            }
        })
    }

    return result.data
}

MutationPost.updatePost = async(parent, args, { db,pubsub }, info) => {
    const {postId,data} = args

    // const post = db.dummyDataPosts.find(item => item.id == postId)
    // const originalPost = {...post}

    const result = await helpers.updatedRow(postId,data,'Post')
    // console.log(result)

    if(result.isExist == 0) {
        throw new Error("Post Not Found")
    }

    // if(result.data.post.publish == 'boolean') {
    //     console.log("HAI")
    // }

    if(!result.newValue.published && result.prevValue.published) {
        console.log('deleted')
                pubsub.publish('post', {
                    post: {
                        mutation:'DELETED',
                        data: result.prevValue
                    }
                })
    } else if(result.newValue.published && !result.prevValue.published){
        console.log('created')
                pubsub.publish('post', {
                    post: {
                        mutation: "CREATED",
                        data:result.newValue
                    }
                })
    } else {
        console.log('updated')
            pubsub.publish('post',{
                post: {
                    mutation:"UPDATED",
                    data: result.newValue
                }
            })
    }

    return result.newValue
}

module.exports = MutationPost