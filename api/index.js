const { ApolloServer, gql } = require('apollo-server-micro')
import { getMovies, getMovie, getSuggestions } from '../db';

const typeDefs = gql`
    type Movie {
        id: Int!
        title_long: String!
        rating: Float
        description_intro: String
        language: String
        medium_cover_image: String
        genres: [String]
    }

    type Query {
        movies(genre: String, limit: Int, rating: Float): [Movie]!
        movie(id: Int!): Movie
        suggestions(id: Int!): [Movie]!
    }
`

const resolvers = {
    Query: {
        movies: (_, { genre, limit, rating }) => getMovies(genre, limit, rating),
        movie: (_, { id }) => getMovie(id),
        suggestions: (_, { id }) => getSuggestions(id)
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

module.exports = server.createHandler({ path: '/api/' })