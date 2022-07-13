const uuidv4 = require('uuid')
const {User,Comment,Post} = require("../../../models")
let MutationUser = {}

const deleteRow = async(id) => {

    const result = {}

    result.data = await User.findOne({
        where:{
            id
        },
        raw:true,
        nest:true
    })

    result.isExist = await User.destroy({
        where:{
            id
        }
    })

    return result
}

const updatedRow = async(id,data) => {
    

    let isExist = await User.update({...data},{
        where:{
            id
        }
    })

    let result = await User.findOne({
        where:{
            id
        },
        raw:true,
        nest:true
    })

    return {result,isExist:isExist[0]}
}

MutationUser.createUser = async (parent, args, { db }, info) => {
    // console.log(args)
    // const emailExist = db.dummyDataUsers.some(item => item.email == args.data.email)
    const emailExist = await User.findOne({
        where:{
            email:args.data.email
        }
    })

    if(emailExist) {
        throw new Error('Email Exist')
    }

    const user = {
        name: args.data.name,
        email: args.data.email,
        age: args.data.age
    }

    // db.dummyDataUsers.push(user)
    const result = await User.create({...user,raw:true,nest:true})

    // console.log(result.dataValues)
    
    return result.dataValues
}

MutationUser.deleteUser = async(parent, args, { db }, info) => {
    // const userIndex = db.dummyDataUsers.findIndex(item => item.id == args.userId)
    const result = await deleteRow(args.userId)

    // console.log(result)

    if(result.isExist == 0) {
        throw new Error("User not found")
    }

    return result.data
}

MutationUser.updateUser = async(parent, args, { db }, info) => {
    const {userId,data} = args
    // console.log(data.name)
    // const user = db.dummyDataUsers.find(item => item.id == args.userId)
    const user = await updatedRow(userId,data)

    console.log(user)

    if (user.isExist == 0) {
        throw new Error("User not found")
    }

    return user.result
}

module.exports = MutationUser