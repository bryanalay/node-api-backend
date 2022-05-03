require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const logger = require('./loggerMiddleWare')
const cors = require('cors')
const Note = require('./models/Note')
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleError')

app.use(express.json())

app.use(cors())
app.use(logger)

const agenda = [
  {
    id: 1,
    name: 'jose',
    date: '2019-05-30T17:30:31.098Z',
    number: '1(91)457-50-40'
  },
  {
    id: 2,
    name: 'paco',
    date: '2019-05-30T17:30:31.098Z',
    number: '83(0790)011-22-39'
  },
  {
    id: 3,
    name: 'ded',
    date: '2019-05-30T17:30:31.098Z',
    number: '81(006)521-03-61'
  },
  {
    id: 4,
    name: 'juan',
    date: '2019-05-30T17:30:31.098Z',
    number: '545(156)579-80-28'
  },
  {
    id: 5,
    name: 'pedro',
    date: '2019-05-30T17:30:31.098Z',
    number: '19(2055)876-13-79'
  },
  {
    id: 6,
    name: 'samanta',
    date: '2019-05-30T17:30:31.098Z',
    number: '253(001)705-83-42'
  },
  {
    id: 7,
    name: 'marcelo',
    date: '2019-05-30T17:30:31.098Z',
    number: '31(3639)056-33-51'
  },
  {
    id: 8,
    name: 'maria',
    date: '2019-05-30T17:30:31.098Z',
    number: '05(1517)231-67-41'
  },
  {
    id: 9,
    name: 'josefina',
    date: '2019-05-30T17:30:31.098Z',
    number: '5(5114)192-52-77'
  },
  {
    id: 10,
    name: 'carlos',
    date: '2019-05-30T17:30:31.098Z',
    number: '728(8962)048-78-09'
  }
]

const login = [
  {
    username: 'midudev',
    password: 'lamidupassword'
  }
]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// all get queries
app.get('/api/login', (request, response) => {
  response.send(login)
})

app.get('/', (request, response) => {
  response.send('<h1>hello world</h1>')
})

app.get('/api/agends', (req, res) => {
  res.send(agenda)
})

app.get('/api/agends/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log({ id })
  const agend = agenda.find(agend => agend.id === id)
  if (agend) {
    res.json(agend)
  } else {
    res.status(404).end()
  }
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})

// all delete queries
app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})

// all post queries
app.post('/api/notes/', (request, response) => {
  const note = request.body

  // const ids = notes.map(note => note.id)
  // const maxId = Math.max(...ids)

  if (!note.content) {
    return response.status(400).json({
      error: 'required "content " field is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })

  newNote.save().then(savedNote => {
    response.json(savedNote)
  })
})

// all put queries
app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    })
})

// middlewares
app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
