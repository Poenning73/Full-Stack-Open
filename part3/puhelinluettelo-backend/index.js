const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
morgan.token('post-content', (req, res) => JSON.stringify(req.body) )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-content'))
app.use(cors())

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "123"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-532523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  response.json(persons.find(person => person.id === id))
})

app.delete('/api/persons/:number', (request, response) => {
  const number = request.params.number
  persons = persons.filter(person => person.number !== number)
  response.status(204).end()
  console.log(persons)
})

const generateId = () => {
  return (Math.random()*1000000000).toFixed(0)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  
  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  
  persons = persons.concat(newPerson)

  response.json(newPerson)
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date(Date.now()).toString()}</p>
  `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`)
})