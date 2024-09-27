import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// types
import { typeDefs } from './schema';

// server setup
const server = new ApolloServer({
    // typeDefs - definition of types of data (schema)
    typeDefs
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log("Server ready at port: 4000")