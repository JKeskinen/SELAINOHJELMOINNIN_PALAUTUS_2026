const express = require('express')
const morgan = require('morgan')
const cors = require('cors')



morgan.token('body', req => 
  JSON.stringify(req.body))

const app = express()

app.use(cors())
app.use(express.json())

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: '3',
    name: 'Dan Ibrow',
    number: '354-44-5346212'
  },
  {
    id: '4',
    name: 'Mary Poppendick',
    number: '46246324562'
  },
  {
    id: '5',
    name: 'Kari Martti',
    number: '24562462462'
  }
]

const generateId = () => {
  return String(Math.floor(Math.random() * 1000000))
}

app.get('/', (req, res) => {
  res.send(`
    <p>Projektin juuri</p>
    <p>${new Date()}</p>
  `)
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  const person = persons.find(
    person => person.id === id
  )

  if (!person) {
    return res.status(404).json({
      error: 'person not found'
    })
  }

  res.json(person)
})


app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  persons = persons.map(p => p.id === id ? { ...p, number: body.number } : p)
  res.json(body)

  if (updatedPerson){
    res.json(updatedPerson)
  }else{
    res.status(404).end()
  }
})





app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  persons = persons.filter(
    person => person.id !== id
  )

  res.status(204).end()
})



app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }




  const existingPerson = persons.find(
    person => person.name === body.name
  )

  if (existingPerson) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  res.json(person)
})





const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}




app.use(unknownEndpoint)


const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})