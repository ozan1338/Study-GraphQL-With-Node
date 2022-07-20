const uuidv4 = require('uuid')
const {User,Comment,Post} = require("../../../models")
let MutationUser = {}
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const { getUserId } = require('../../utils/getUserId')
const { generatedToken } = require('../../utils/generatedToken')
const { hashPassword } = require('../../utils/hashPassword')

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

MutationUser.login = async(parent, args, context, info) => {
    const {email, password} = args.data

    // console.log(email)

    const user = await User.findOne({
        where:{
            email
        }
    })

    if(!user) {
        throw new Error("User Not Found")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error("Password not match")
    }

    // const token = jwt.sign({userId: user.dataValues.id}, process.env.SECRET)
    const token = generatedToken(user.dataValues.id)

    return {
        user,
        token
    }
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

    let password = await hashPassword(args.data.password)

    const user = {
        name: args.data.name,
        email: args.data.email,
        age: args.data.age,
        password
    }

    // db.dummyDataUsers.push(user)
    const result = await User.create({...user,raw:true,nest:true})

    // console.log(result.dataValues)

    // const token = jwt.sign({userId: result.dataValues.id}, process.env.SECRET)
    // console.log(result)
    const token = generatedToken(result.dataValues.id)
    
    return {
        user: result.dataValues,
        token
    }
}

MutationUser.deleteUser = async(parent, args, { req,db }, info) => {
    // const userIndex = db.dummyDataUsers.findIndex(item => item.id == args.userId)
    const userId = getUserId(req)
    const result = await deleteRow(userId)

    // console.log(result)

    if(result.isExist == 0) {
        throw new Error("User not found")
    }

    return result.data
}

MutationUser.updateUser = async(parent, args, { req,db }, info) => {
    const {data} = args
    const userId = getUserId(req)

    if(typeof args.data.password == 'string') {
        args.data.password = await hashPassword(args.data.password)
    }
    // console.log(data.name)
    // const user = db.dummyDataUsers.find(item => item.id == args.userId)
    const user = await updatedRow(userId,data)

    // console.log(user)

    if (user.isExist == 0) {
        throw new Error("User not found")
    }

    return user.result
}

module.exports = MutationUser