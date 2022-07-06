module.exports = {
    author(parent, args, { db }, info) {
        return db.dummyDataUsers.find(item => item.id == parent.author)
    },
    post(parent, args, { db }, info) {
        return db.dummyDataPosts.find(item => item.id == parent.post) 
    }
}