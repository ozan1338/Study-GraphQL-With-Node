//import { GraphQLServer } from "graphql-yoga";
const {GraphQLServer} = require("graphql-yoga")

//Scalar type String, Boolean, Int, Float, ID,

//Type Definition (Schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
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