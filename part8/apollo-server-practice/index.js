const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub
} = require('apollo-server')
const mongoose = require('mongoose')
const Person = require('./models/Person')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const JWT_SECRET = 'These pants are 🔥'

const MONGODB_URI =
  'mongodb+srv://fullstack:halfstack@cluster0-ostce.mongodb.net/graphql?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
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
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Subscription {
    personAdded: Person!
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(name: String!, phone: String!): Person

    createUser(username: String!): User

    login(username: String!, password: String!): Token

    addAsFriend(name: String!): User
  }
`

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (root, args) => {
      if (!args.phone) {
        return Person.find({}).populate('friendOf')
      }

      return Person.find({ phone: { $exists: args.phone === 'YES' } }).populate(
        'friendOf'
      )
    },
    findPerson: (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    },
    friendOf: async (root) => {
      // return list of users
      const friends = await User.find({
        friends: {
          $in: [root._id]
        }
      })
      return friends
    }
  },

  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
      pubsub.publish('PERSON_ADDED', { personAdded: person })
      return person
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone

      try {
        await person.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
      return person
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((err) => {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) =>
        !currentUser.friends.map((f) => f._id).includes(person._id)

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const person = await Person.findOne({ name: args.name })
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    }
  },

  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      )

      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server is ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
