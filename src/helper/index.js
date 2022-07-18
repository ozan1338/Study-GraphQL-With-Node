const {User,Comment,Post} = require("../../models")
const helpers = {}
const service = require('../service/index')

helpers.deleteRow = async(id,model,userId) => {
    const result = {}

    switch(model){
        case 'User': await service.deleteRowUser(id,result)
            break;
        case 'Post': await service.deleteRowPost(id,result,userId)
            break;
        case 'Comment': await service.deleteRowComment(id,result,userId)
            break;
        default: throw new Error("model not found")
    }
    
    return result
}

helpers.updatedRow = async(id,data,model,userId) => {
    let result = {}

    switch(model){
        case 'User': await service.updatedRowUser(id,data,result)
            break;
        case 'Post': await service.updatedRowPost(id,data,result,userId)
            break;
        case 'Comment': await service.updatedRowComment(id,data,result,userId)
            break;
        default: throw new Error("model not found")
    }

    return result
}

module.exports = helpers