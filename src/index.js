//import { GraphQLServer } from "graphql-yoga";
const {GraphQLServer} = require("graphql-yoga")
//Dummy Data
let db = require('./dummyData')
//Mutation
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const User = require("./resolvers/User")
const Post = require("./resolvers/Post")
const Comment = require("./resolvers/Comment")

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: {
        db
    }
})

server.start(() => {
    console.log('The server is up!')
})