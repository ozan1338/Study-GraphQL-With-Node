let dummyData = {}

dummyData.dummyDataUsers = [
    {
        id: 1,
        name: "akhmad",
        email: "ozan@mail.com",
        age: 17
    },
    {
        id:2,
        name: "fadhil",
        email: "fadhil@mail.com",
        age: null
    },
    {
        id:3,
        name: "alfi",
        email: "alfi@mail.com",
        age: 18
    }
]

dummyData.dummyDataPosts = [
    {
        id: 1,
        title: "A Try One",
        body: "Test 1",
        published: true,
        author: 1
    },
    {
        id: 2,
        title: "C Try Two K",
        body: "Test 2",
        published: false,
        author:3
    },
    {
        id: 3,
        title: "B Try Three K",
        body: "Test 3",
        published: false,
        author: 1
    }
]

dummyData.dummyDataComments = [
    {
        id:1,
        comment: "Test1",
        author: 1,
        post: 1
    },
    {
        id:2,
        comment:"Test2",
        author: 1,
        post: 1
    },
    {
        id:3,
        comment:"Test3",
        author: 2,
        post: 2
    },
    {
        id:4,
        comment:"Test4",
        author: 3,
        post: 3
    }
]

module.exports = dummyData