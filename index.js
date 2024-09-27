import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// db
import db from './_db.js';

// types
import { typeDefs } from './schema.js';

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find(gm => gm.id === args.id)
        },

        reviews() {
            return db.reviews
        },
        // for single review, function takes (1: parent- parent resolver in a resolver chain, 2: args- arguments: here we can access
        // any query variable since with the query, 3: contextObject- resolvers like authentication information etc.)
        review(_, args) {
            return db.reviews.find(rvw => rvw.id === args.id)
        },

        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find(athr => athr.id === args.id)
        }
    },

    // for nested queries
    //parent- value returned by previous parent resolver
    Game: {
        reviews(parent) {
            return db.reviews.filter(r => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(r => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find(a => a.id === parent.author_id)
        },

        game(parent) {
            return db.games.find(g => g.id === parent.game_id)
        }
    }
}

// server setup
const server = new ApolloServer({
    // typeDefs - definition of types of data (schema)
    // resolvers - to handle queries
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log("Server is running at port: 4000")