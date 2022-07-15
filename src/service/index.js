const {User,Comment,Post} = require("../../models")
const service = {}
const {Op} = require('sequelize')

service.updatedRowUser = async(id,data,result) => {
    result.isExist = await User.update({...data},{
        where:{
            id
        }
    })

    result.data = await User.findOne({
        where:{
            id
        },
        raw:true,
        nest:true
    })

    return result
}

service.updatedRowPost = async(id,data,result) => {

    let newValue

    // console.log(data,">>>DATA")

    result.prevValue = await Post.findOne({
        where:{
            id
        }
    }).then(ress => {
        // console.log(ress.dataValues,"WOW")
        return ress.dataValues
    })

    if(result.prevValue.authorId != data.authorId){
        throw new Error("Only Author Can Update This Post!")
    }


    result.isExist = await Post.update({...data},{
        where:{
            id
        },
        returning:true
    }).then(ress => {
        // console.log(ress)
        newValue = ress[1][0].dataValues
        // console.log(newValue,"nice")
        return ress[0]
    })

    result.newValue = newValue

    // console.log(result)

    return result.Post
}

service.updatedRowComment = async(id,data,result) => {

    result.data = await Comment.findOne({
        where:{
            id
        }
    }).then(ress => {
        return ress.dataValues
    })

    if(result.data.userId != data.userId){
        throw new Error("Only User Who Comment Can Update This Comment!")
    }

    result.isExist = await Comment.update({...data},{
        where:{
            [Op.and]:[
                {id:id},
                {userId:data.userId}
            ]
        }
    })

    return result
}

service.deleteRowUser = async(id,result) => {
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

service.deleteRowPost = async(id,result) => {
    result.data = await Post.findOne({
        where:{
            id
        },
        raw:true,
        nest:true
    })

    result.isExist = await Post.destroy({
        where:{
            id
        }
    })

    return result
}

service.deleteRowComment = async(id,result) => {
    result.data = await Comment.findOne({
        where:{
            id
        },
        raw:true,
        nest:true
    })

    result.isExist = await Comment.destroy({
        where:{
            id
        },
        returning:true
    })

    return result
}

module.exports = service