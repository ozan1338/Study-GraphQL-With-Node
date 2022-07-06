module.exports = {
    author(parent, args, { db }, info) {
        //console.log("???", db.dummyDataUsers)
        //console.log(">>>", parent.author)
        //console.log("HHHH", args)
        const result =  db.dummyDataUsers.find(item => item.id == parent.author)
        //console.log(result)
        

        return result
    },
    comments(parent, args, { db }, info) {
        return db.dummyDataComments.filter(item => item.post == parent.id)
    }
}
