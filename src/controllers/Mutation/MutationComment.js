let MutationComment = {}
const {User,Comment,Post} = require("../../../models")
const {Op} = require('sequelize')
const helper = require("../../helper/index")
const { getUserId } = require("../../utils/getUserId")

MutationComment.createComment = async(parent, args, { req,db,pubsub }, info) => {
    // const UserExist = db.dummyDataUsers.some(item => item.id == args.data.author)

    const userId = getUserId(req)

    const UserExist = await User.count({
        where:{
            id:userId
        }
    })

    // console.log(UserAndPostExist)

    if(UserExist == 0){
        throw new Error("User Not Exist")
    }

    // let PostIsExist = false

    const PostIsExist = await Post.count({
        where:{
            [Op.and]:[
                {},
                {id:args.data.postId},
                {published:{
                    [Op.ne]:false
                }}
            ]
        }
    })

    // console.log(PostIsExist)

    if(PostIsExist == 0) {
        throw new Error("Post Is Not Exist")
    }
    // console.log(args)

    const data = {
        comment: args.data.comment,
        userId: userId,
        postId: args.data.postId
    }

    const comment = await Comment.create({...data,raw:true,nest:true})

    // db.dummyDataComments.push(Comment)
    console.log(args.data.postId)
    pubsub.publish(`comment ${args.data.postId}`, {
        comment: {
            mutation:"CREATED",
            data:comment
        }
    })

    // console.log(comment.dataValues,"come")

    return comment.dataValues
}

MutationComment.deleteComment = async (parent,args,{ req,db,pubsub },info) => {
    // const commentIndex = db.dummyDataComments.findIndex(item => item.id == args.commentId)
    const userId = getUserId(req)
    const deletedComment = await helper.deleteRow(args.commentId,"Comment",userId)
    // console.log(deletedComment)

    if(deletedComment.isExist == 0) {
        throw new Error("Comment not found")
    }

    // const deletedComment = db.dummyDataComments.splice(commentIndex, 1)

    pubsub.publish(`comment ${deletedComment.postId}`,{
        comment: {
            mutation: "DELETED",
            data:deletedComment.data
        }
    })

    return deletedComment.data
}

MutationComment.updateComment = async(parent, args, { req, db, pubsub }, info) => {
    const {commentId,data} = args
    const userId = getUserId(req)
    // console.log(userId)

    const updatedComment = await helper.updatedRow(commentId,data,"Comment",userId)
    // console.log(updatedComment)

    // const comment = db.dummyDataComments.find(item => item.id == commentId)
    // const comment = await Comment.findOne({
    //     where:{
    //         id:commentId
    //     }
    // })

    // if(!comment) throw new Error("Comment not found")

    // if(comment.authorId != data.author) throw new Error("Only Author Can Update this Comment!")

    // if(data.comment) comment.comment = data.comment

    // console.log("updated comment",comment.post)

    pubsub.publish(`comment ${updatedComment.postId}`, {
        comment: {
            mutation: "UPDATED",
            data:updatedComment.data
        } 
    })

    return updatedComment.data
}

module.exports = MutationComment