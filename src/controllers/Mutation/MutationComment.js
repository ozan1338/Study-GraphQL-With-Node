let MutationComment = {}

MutationComment.createComment = (parent, args, { db,pubsub }, info) => {
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
}

MutationComment.deleteComment = (parent,args,{ db,pubsub },info) => {
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
}

MutationComment.updateComment = (parent, args, { db, pubsub }, info) => {
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

module.exports = MutationComment