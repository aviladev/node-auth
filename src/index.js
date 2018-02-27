const express = require('express')
const http = require('http')
const morgan = require('morgan')
const mongoose = require('mongoose')

const router = require('./router')

mongoose
  .connect('mongodb://localhost:27017/auth')
  .catch((e) => {
    console.error('Could not connect to database')
    console.error(e)
    console.error('Exiting process')
    process.exit(1)
  })

const PORT = process.env.PORT || 8080

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(morgan('combined'))
app.use(express.json())

app.use('/', router)

const server = http.createServer(app)

server.listen(PORT, () =>
  console.log('Listening on:', PORT)
)
