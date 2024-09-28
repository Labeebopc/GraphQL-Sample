
// int, float, string, boolean, ID
export const typeDefs = `#graphql

type Game{
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
}

type Review{
    id: ID!
    rating: Int!
    content: String!
    # for related data
    game: Game!
    author: Author!
}

type Author{
    id: ID!,
    name: String!,
    verified: Boolean!
    reviews: [Review!]
}

# to specify entry point and return some types of those entry points
type Query{
    reviews:[Review],
    # for single review
    review(id:ID!):Review,

    games: [Game],
    game(id:ID!):Game,

    authors: [Author]
    author(id:ID!):Author,
}

# for mutating data
type Mutation{
    deleteGame(id: ID!):[Game]
    addGame(game: AddGameInput!): Game
    updateGame(id: ID!, edits:EditGameInput!): Game
}

#for making mutation in single argument
input AddGameInput{
    title: String!,
    platform: [String!]!
}
input EditGameInput{
    title: String,
    platform: [String!]
}

`