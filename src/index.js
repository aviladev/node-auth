const express = require('express')
const http = require('http')
const morgan = require('morgan')
const mongoose = require('mongoose')

const router = require('./router')

mongoose.connect('mongodb://localhost:27017/auth')

const PORT = process.env.PORT || 8080

const app = express()

app.use(morgan('combined'))
app.use(express.json())

app.use('/', router)

const server = http.createServer(app)

server.listen(PORT, () =>
  console.log('Listening on:', PORT)
)
