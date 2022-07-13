const {User,Post,Comment} = require("../../models/")
module.exports = {
    async users(parent,args,{ db },info) {
        try {
            let where = {}
            let order = []
            let finalQuery = {}
            if (args.query) {
                where.name = args.query
            }

            if(args.Sort == true) {
                const sortAsc = ['name']
                order.push(...sortAsc)
            }

            // return result

            let result = []
            finalQuery.where = where
            finalQuery.order = order

            // console.log(finalQuery)

            result = await User.findAll(finalQuery)

            return result
        } catch (error) {
            console.log(error)
        }
        
    },
    async posts(parent,args,{ db },info) {
        try {
            let where = {}
            let order = []
            let finalQuery = {}


            if (args.query) {
                where.title = args.query
            }
            
    
            if(args.Sort == true) {
                const orderTitle = ['title']
                order.push(...orderTitle)
            }
    
            console.log("WHYY")

            finalQuery.where = where
            finalQuery.order = order
            // console.log(finalQuery)

            const result = await Post.findAll(finalQuery)
            // console.log(result)
    
            return result
        } catch (error) {
            console.log(error)
        }
    },
    async comments(parent,args,{ db },info) {
        try {
            let comment = await Comment.findAll()
        return comment
        } catch (error) {
            console.log(error)
        }
    }
}