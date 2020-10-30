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

app.get('/info', (request, response) => {
  console.log('welcome to info')
  Person.find({}).then(persons => {
    response.send(`
    <h1>Welcome to the Phonebook</h1>
    <p>The phonebook currently has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
	})
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
    response.json(persons)
	})
})


app.get('/api/persons/:id', (request, response) => {

    // Use array position values
  const id = Number(request.params.id)
  
  Person.find({}).then(arr => {
    const person = arr[id]
    if (person) {
      console.log('From MongoDB Array: ', person)
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
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
app.delete('/api/persons/:id', (body, response) => {
 
  const id = body.params.id

    // find by ID, a cool Mongoose function (:
  Person.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err)
      response.status(400).json({
        error: 'An error has occured...'
      })
    } else {
      console.log('Person has been deleted 🍩')
      response.status(204).end()
    }  
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log( `Server running on port ${PORT}` )
})
