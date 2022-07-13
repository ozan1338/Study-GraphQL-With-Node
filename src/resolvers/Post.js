const {Comment,User} = require('../../models/')
module.exports = {
    async author(parent, args, { db }, info) {
        //console.log("???", db.dummyDataUsers)
        //console.log(">>>", parent.author)
        //console.log("HHHH", args)
        // const result =  db.dummyDataUsers.find(item => item.id == parent.author)
        //console.log(result)
        

        // return result
        try {
            console.log(parent)
            let author = await User.findOne({
                where: {
                    id: parent.authorId
                },
                nest:true,
                raw:true
            })
            console.log(">>>>><<<",parent.authorId)
            console.log("HAHAHAHAHA", author)
            return author
        } catch (error) {
            // console.log(error)
            
        }
    },
    async comments(parent, args, { db }, info) {
        // return db.dummyDataComments.filter(item => item.post == parent.id)

        try {
            let comment = await Comment.findAll({
                where:{
                    postId:parent.id
                }
            })

            return comment
        } catch (error) {
            console.log(error)
        }
    }
}
