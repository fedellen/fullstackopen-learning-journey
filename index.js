const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')

// import { books, authors } from './data.js'

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
  }
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution']
  }
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
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
    bookCount: () => books.length,
    authorCount: () => authors.length,

    allBooks: (root, args) => {
      let theBooks = books
      if (args.author) {
        const byAuthor = (book) =>
          args.author.toLowerCase() === book.author.toLowerCase()
            ? book.author
            : !book.author
        theBooks = theBooks.filter(byAuthor)
      }
      if (args.genre) {
        const byGenre = (book) =>
          book.genres.includes(args.genre.toLowerCase())
            ? book.genre
            : !book.genre
        theBooks = theBooks.filter(byGenre)
      }

      return theBooks
    },

    allAuthors: () => authors
  },

  Author: {
    bookCount: (root) => {
      return books.filter((b) => b.author === root.name).length
    }
  },

  Mutation: {
    addBook: (root, args) => {
      if (books.find((p) => p.title === args.title)) {
        throw new UserInputError('title must be unique', {
          invalidArgs: args.title
        })
      }

      const book = { ...args, id: uuid() }
      const hasAuthor = books.find((b) => b.author === book.author)

      books = books.concat(book)

      if (!hasAuthor) {
        const author = { name: book.author, id: uuid() }
        authors = authors.concat(author)
      }

      return book
    },

    setBirthYear: (root, args) => {
      const author = authors.find(
        (a) => a.name.toLowerCase() === args.name.toLowerCase()
      )
      if (!author) {
        throw new UserInputError('Author not found', {
          invalidArgs: args.name
        })
      }
      const updatedAuthor = { ...author, born: args.born }
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))
      return updatedAuthor
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
