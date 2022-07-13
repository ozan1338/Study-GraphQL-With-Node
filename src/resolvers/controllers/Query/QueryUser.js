let QueryUSer = {}
const {User} = require("../../../../models")

QueryUSer.users = async (parent,args,{ db },info) => {
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
}

module.exports = QueryUSer