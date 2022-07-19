let QueryPost = {}
const {Post} = require("../../../models/")
const { getUserId } = require("../../utils/getUserId")
const {Op} = require('sequelize')

QueryPost.posts  = async (parent,args,{ db,req },info) => {
    try {
        let where = {}
        let order = []
        let finalQuery = {}

        // console.log(req.headers)
        // console.log(db)

        if (args.query) {
            where.title = {
                [Op.like]: `%${args.query}%`
            }
        }
        

        if(args.Sort == true) {
            const orderTitle = ['title']
            order.push(...orderTitle)
        }

        // console.log("WHYY")
        where.published = true
        finalQuery.where = where
        finalQuery.order = order
        console.log(finalQuery)

        const result = await Post.findAll(finalQuery)
        // console.log(result)

        return result
    } catch (error) {
        console.log(error)
    }
}

QueryPost.myPost = async(parent,args,{ db,req },info) => {
    const userId = getUserId(req)

    let where = {}
    let finalQuery = {}

    if(args.query) {
        where.title = {
            [Op.like]: `%${args.query}%`
        }
    }

    where.authorId = userId

    finalQuery.where = where

    console.log(finalQuery)

    const result = await Post.findAll(finalQuery)

    return result
}

QueryPost.post = async(parent,args,{ db,req },info) => {
    const userId = getUserId(req,false)
    // console.log(userId)

    const post = await Post.findOne({
        where:{
            id:args.postId,
            [Op.or]:[
                {published:true},
                {authorId:userId}
            ]
        }
    })

    if(!post) {
        throw new Error("Post not found")
    }

    return post
}

module.exports = QueryPost