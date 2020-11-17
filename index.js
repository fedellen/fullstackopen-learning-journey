const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')

// models
const Author = require('./models/Author')
const Book = require('./models/Book')

// secret codes (MONGODB_URI)
require('dotenv').config()

console.log(`Connecting to ${process.env.MONGODB_URI}...`)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connection to mongoDB: ', err.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    bookCount: Int
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    setBirthYear(name: String!, born: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      let theBooks = await Book.find({})
      // Sort by Author Arg
      if (args.author) {
        const author = await Author.findOne({ name: { $in: args.author } })
        theBooks = theBooks.filter(
          (b) => b.author.toString() === author._id.toString()
        )
      }
      // Sort by Genre Arg
      if (args.genre) {
        theBooks = theBooks.filter((b) => b.genres.includes(args.genre))
      }

      return theBooks
    },

    allAuthors: () => Author.find({})
  },

  Author: {
    bookCount: async (root) => {
      const count = await Book.find({
        author: { $in: root.id }
      })
      return count.length
    }
  },

  Book: {
    author: (root) => {
      return Author.findById(root.author)
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (err) {
          throw new UserInputError(err.message)
        }
      }

      const book = new Book({ ...args, author: author._id })

      try {
        await book.save()
      } catch (err) {
        throw new UserInputError(err.message)
      }

      return book
    },

    setBirthYear: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        throw new UserInputError('Author was not found...', {
          invalidArgs: args.name
        })
      }
      // set that born
      author.born = args.born

      try {
        await author.save()
      } catch (err) {
        throw new UserInputError(
          `Birth year failed to save... args: ${err.message}`
        )
      }

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
