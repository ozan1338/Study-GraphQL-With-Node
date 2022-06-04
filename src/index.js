//import { GraphQLServer } from "graphql-yoga";
const {GraphQLServer} = require("graphql-yoga")
const user = require("./dummyData")

//Scalar type String, Boolean, Int, Float, ID,


//Dummy Data
const {dummyDataUsers,dummyDataPosts} = require('./dummyData')

//Type Definition (Schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
        users(query: String,Sort: Boolean): [User!]!
        posts(query: String,Sort: Boolean): [Post!]!
    }


    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

//Resolvers
const resolvers = {
    Query: {
        users(parent,args,context,info) {
            if (!args.query) {
                if(args.Sort == true) {
                return dummyDataUsers.sort((a,b) => {
                        let nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase()
                        //console.log(nameA)
                        if(nameA < nameB) {
                            return -1;
                        }
                        if(nameA > nameB) {
                            return 1;
                        }
                        return 0
                    })
                }

                return dummyDataUsers
            }
            
            let result = []

            result = dummyDataUsers.filter(item => {
                return item.name.toLowerCase().includes(args.query.toLowerCase())
            })

            if(args.Sort == true) {
                return result.sort((a,b) => {
                    let nameA = a.name.toLowerCase(),
                        nameB = b.name.toLowerCase()
                    //console.log(nameA)
                    if(nameA < nameB) {
                        return -1;
                    }
                    if(nameA > nameB) {
                        return 1;
                    }
                    return 0
                })
            }

            return result
        },
        posts(parent,args,context,info) {
            if (!args.query) {
                if(args.Sort == true) {
                    return dummyDataPosts.sort((a,b) => {
                        let titleA = a.title.toLowerCase(),
                            titleB = b.title.toLowerCase()

                            if(titleA < titleB) {
                                return -1
                            }
                            if(titleB > titleB) {
                                return 1
                            }
                            return 0
                    })
                }

                return dummyDataPosts
            }
            
            let result = []

            result = dummyDataPosts.filter(item => {
                return item.title.toLowerCase().includes(args.query.toLowerCase())
            })

            if(args.Sort == true) {
                return result.sort((a,b) => {
                    let titleA = a.title.toLowerCase(),
                        titleB = b.title.toLowerCase()

                        if(titleA < titleB) {
                            return -1
                        }
                        if(titleB > titleB) {
                            return 1
                        }
                        return 0
                })
            }

            console.log("WHYY")

            return result
        },
        me() {
            user = {
                id: 'abc123',
                name: 'Ozan',
                email: 'ozan@mail.com',
                age: 17
            }
            return user
        },
        post() {
            post = {
                id: '1122',
                title: 'Study',
                body: 'This is Body',
                published: true
            }
            return post
        },
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})