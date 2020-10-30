const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))

morgan.token('content', (req, res) => {
  const body = req.body
  return JSON.stringify({
    name: body.name,
    number: body.number
  })
})

  // create morgan "middleware"
app.use(morgan((tokens, req, res) => (
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.content(req, res)
  ].join(' ')
)))

  // App information screen
app.get('/info', (request, response, next) => {
  console.log('welcome to info')
  Person.find({}).then(persons => {
    response.send(`
    <h1>Welcome to the Phonebook</h1>
    <p>The phonebook currently has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
  })
  .catch(err => next(err))
})

app.get('/api/persons', (request, response, next) => {
	Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(err => next(err))
})


app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        console.log('From MongoDB Array: ', person)
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
  .catch(err => next(err))
})

  // Post from front end to MongoDB
app.post('/api/persons', (request, response) => {

  const body = request.body

    // Name and Number must be defined
  if (!body.name || !body.number) {
    console.log(`name: '${body.name}' number: '${body.number}'  defined?`)
    return response.status(400).json({
      error: `'name' and 'number' are required properties, they must be defined values.`
    })
  }
    // Make the person
  const person = new Person({
    name: body.name,
    number: body.number
  })
    // Now save that person to DB
  person.save().then(result => {
    console.log(`Added ${result.name} (num: ${result.number}) to the Phonebook 🎉`) // Yay
    response.json(person)
  })
})

  // Delete them all!
app.delete('/api/persons/:id', (body, response, next) => {

  Person.findByIdAndRemove(body.params.id)
    .then(result => {
      console.log('Person has been deleted 🍩')
      response.status(204).end()
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log( `Server running on port ${PORT}` )
})
