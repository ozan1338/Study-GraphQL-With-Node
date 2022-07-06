module.exports = {
    posts(parent, args, { db }, info) {
        //console.log("????", parent.id)
        return db.dummyDataPosts.filter(item => item.author == parent.id)
    },
    comments(parent, args, { db }, info) {
        return db.dummyDataComments.filter(item => item.author == parent.id)
    }
}
