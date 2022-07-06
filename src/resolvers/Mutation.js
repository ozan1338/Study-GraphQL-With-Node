const uuidv4 = require('uuid')

module.exports = {
    createUser(parent, args, { db }, info) {
        // console.log(args)
        const emailExist = db.dummyDataUsers.some(item => item.email == args.data.email)

        if(emailExist) {
            throw new Error('Email Exist')
        }

        const user = {
            id: uuidv4.v4(),
            name: args.data.name,
            email: args.data.email,
            age: args.data.age
        }

        db.dummyDataUsers.push(user)
        
        return user
    },
    createPost(parent, args, { db }, info) {
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

        return post
    },
    createComment(parent, args, { db }, info) {
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

        return Comment
    },
    deleteUser(parent, args, { db }, info){
        const userIndex = db.dummyDataUsers.findIndex(item => item.id == args.userId)

        if(userIndex == -1) {
            throw new Error("User not found")
        }

        const deletedUser = db.dummyDataUsers.splice(userIndex, 1)

        db.dummyDataPosts = db.dummyDataPosts.filter(item => {
            const match = item.author == args.userId

            if(match) {
                db.dummyDataComments = db.dummyDataComments.filter(element => {
                    return element.post != item.id
                })
            }

            return !match
        })

        db.dummyDataComments = db.dummyDataComments.filter(item => item.author != args.userId)

        return deletedUser[0]
    },
    deletePost(parent, args, { db }, info){
        const postIndex = db.dummyDataPosts.findIndex(item => item.id == args.postId)

        if(postIndex == -1) {
            throw new Error("Post Not Found")
        }

        const deletedPost = db.dummyDataPosts.splice(postIndex, 1)

        db.dummyDataComments = db.dummyDataComments.filter(item => item.post != args.postId)

        return deletedPost[0]
    },
    deleteComment(parent,args,{ db },info) {
        const commentIndex = db.dummyDataComments.findIndex(item => item.id == args.commentId)

        if(commentIndex == -1) {
            throw new Error("Comment not found")
        }

        const deletedComment = db.dummyDataComments.splice(commentIndex, 1)

        return deletedComment[0]
    },
    updateUser(parent, args, { db }, info) {
        const {userId,data} = args
        // console.log(data.name)
        const user = db.dummyDataUsers.find(item => item.id == args.userId)

        if (!user) {
            throw new Error("User not found")
        }

        if (typeof data.email == 'string') {
            const emailToken = db.dummyDataUsers.some(item => item.email == data.email)

            if(emailToken) {
                throw new Error('Email taken')
            }

            user.email = data.email
        }

        if (typeof data.name == 'string') {
            user.name = data.name
        }

        if(typeof data.age != 'undefined') {
            user.age = data.age
        }

        // console.log(user)

        return user
    }
}