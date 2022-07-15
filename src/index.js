//import { GraphQLServer } from "graphql-yoga";
const {GraphQLServer,PubSub} = require("graphql-yoga")
//Dummy Data
let db = require('./dummyData')
//Mutation
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const User = require("./resolvers/User")
const Post = require("./resolvers/Post")
const Comment = require("./resolvers/Comment")
const Subscription = require("./resolvers/Subscription")

const pubsub = new PubSub()

//Query = seperti get dalam rest Api
//Mutation = seperti post,delete,dan patch dalam rest Api
//Subsciption = seperti websocket dalam rest Api

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: ({ request, response, ...rest }) => {
        return { 
            req: request, 
            res: response, 
            userId: request.headers.userid,
            db
        };
    }
})

server.start(() => {
    console.log('The server is up!')
})