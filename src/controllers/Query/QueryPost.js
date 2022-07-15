let QueryPost = {}
const {Post} = require("../../../models/")

QueryPost.posts  = async (parent,args,{ db },info) => {
    try {
        let where = {}
        let order = []
        let finalQuery = {}

        console.log(info)

        if (args.query) {
            where.title = args.query
        }
        

        if(args.Sort == true) {
            const orderTitle = ['title']
            order.push(...orderTitle)
        }

        // console.log("WHYY")

        finalQuery.where = where
        finalQuery.order = order
        // console.log(finalQuery)

        const result = await Post.findAll(finalQuery)
        // console.log(result)

        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = QueryPost