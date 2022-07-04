//import { GraphQLServer } from "graphql-yoga";
const {GraphQLServer} = require("graphql-yoga")
const user = require("./dummyData")
const uuidv4 = require('uuid')

//Scalar type String, Boolean, Int, Float, ID,


//Dummy Data
const {dummyDataUsers,dummyDataPosts,dummyDataComments} = require('./dummyData')

//Type Definition (Schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
        users(query: String,Sort: Boolean): [User!]!
        posts(query: String,Sort: Boolean): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
        createPost(data: CreatePostInput): Post!
        createComment(data: CreateCommentInput): Comment!
    }

    input CreateUserInput {
        name:String!,
        email:String!,
        age:Int
    }

    input CreatePostInput {
        title:String!,
        body:String!,
        published:Boolean!,
        author:ID!
    }

    input CreateCommentInput {
        comment:String!,
        author:ID!,
        post:ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        comment: String!
        author: User!
        post: Post!
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
            //console.log(dummyDataPosts)
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
        comments(parent,args,context,info) {
            return dummyDataComments
        }
    },
    Mutation: {
        createUser(parent, args, context, info) {
            // console.log(args)
            const emailExist = dummyDataUsers.some(item => item.email == args.data.email)

            if(emailExist) {
                throw new Error('Email Exist')
            }

            const user = {
                id: uuidv4.v4(),
                name: args.data.name,
                email: args.data.email,
                age: args.data.age
            }

            dummyDataUsers.push(user)
            
            return user
        },
        createPost(parent, args, context, info) {
            const UserIdExist = dummyDataUsers.some(item => item.id == args.data.author)

            if(!UserIdExist) {
                throw new Error('User Not Exist')
            }

            const post = {
                id: uuidv4.v4(),
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: args.data.author
            }

            dummyDataPosts.push(post)

            return post
        },
        createComment(parent, args, context, info) {
            const UserExist = dummyDataUsers.some(item => item.id == args.data.author)

            if(!UserExist){
                throw new Error("User Not Exist")
            }

            let PostIsExist = false

            for(let item of dummyDataPosts){
                if(item.id == args.data.post){
                    if(item.published != true){
                        throw new Error("Post Has Not Been Published")
                    }else {
                        PostIsExist = true
                    }
                }
            }

            if(!PostIsExist) {
                throw new Error("Post Is Not Exist")
            }
            // console.log(args)

            const Comment = {
                id:uuidv4.v4(),
                comment: args.data.comment,
                author: args.data.author,
                post: args.data.post
            }

            dummyDataComments.push(Comment)

            return Comment
        }
    },
    Post: {
        author(parent, args, context, info) {
            //console.log("???", dummyDataUsers)
            //console.log(">>>", parent.author)
            //console.log("HHHH", args)
            const result =  dummyDataUsers.find(item => item.id == parent.author)
            //console.log(result)
            

            return result
        },
        comments(parent, args, contet, info) {
            return dummyDataComments.filter(item => item.post == parent.id)
        }
    },
    User: {
        posts(parent, args, context, info) {
            //console.log("????", parent.id)
            return dummyDataPosts.filter(item => item.author == parent.id)
        },
        comments(parent, args, context, info) {
            return dummyDataComments.filter(item => item.author == parent.id)
        }
    },
    Comment: {
        author(parent, args, context, info) {
            return dummyDataUsers.find(item => item.id == parent.author)
        },
        post(parent, args, context, info) {
            return dummyDataPosts.find(item => item.id == parent.post)
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})