
// int, float, string, boolean, ID
export const typeDefs = `#graphql

type Game{
    id: ID!,
    title: String!,
    platform: [String!]!
}

type Review{
    id: ID!,
    rating: Int!,
    content: String!
}

type Author{
    id: ID!,
    name: String!,
    verified: Boolean!
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

`