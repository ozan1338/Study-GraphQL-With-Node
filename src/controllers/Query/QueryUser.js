let QueryUSer = {}
const {User} = require("../../../models")
const { getUserId } = require("../../utils/getUserId")

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

QueryUSer.me = async(parent,args,{ req,db },info) => {
    const userId = getUserId(req)

    const user = await User.findOne({
        where:{
            id:userId
        }
    })

    return user
}

module.exports = QueryUSer