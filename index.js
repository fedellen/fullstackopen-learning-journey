const express = require('express')
const app = express()
const PORT = 3001
const morgan = require('morgan')

app.use(express.json())


morgan.token('content', (req, res) => {
  const body = req.body
  return JSON.stringify({
    name: body.name,
    number: body.number
  })
})

  // create "middleware"
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

let persons = [
  {
    id:     1,
    name:   "Arto Hellas",
    number: "040-123456",
  },
  {
    id:     2,
    name:   "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id:     3,
    name:   "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id:     4,
    name:   "Mary Poppendick",
    number: "39-23-6423122",
  },
]

app.get('/info', (request, response) => {
  console.log('welcome to info')
  response.send(`
    <h1>Welcome to the Phonebook</h1>
    <p>The phonebook currently has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  console.log(persons)
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

const createID = () => {
  return Math.floor(Math.random() * Math.floor(25555555))
}

app.post('/api/persons', (request, response) => {

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: `'name' and 'number' are required properties.`
    })
  }

  if (persons.find(p => body.name === p.name)) {
    return response.status(400).json({
      error: `'name' must be a unique value.`
    })
  }

  const person = {
    id      : createID(),
    name    : body.name,
    number  : body.number
  }

  persons = persons.concat(person)
  console.log(persons)
  response.json(person)
})

app.delete('/api/persons/:id', (body, response) => {
  const id = Number(body.params.id)
  persons = persons.filter(person => person.id !== id)
  console.log('Person deleted.')
	response.status(204).end()
})

app.listen(PORT, () => {
	console.log( `Server running on port ${PORT}` )
})