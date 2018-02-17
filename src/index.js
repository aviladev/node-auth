const express = require('express')
const http = require('http')
const morgan = require('morgan')

const PORT = process.env.PORT || 8080

const app = express()

app.use(morgan('combined'))
app.use(express.json())

const server = http.createServer(app)

server.listen(PORT, () =>
  console.log('Listening on:', PORT)
)
