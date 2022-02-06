const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const morganFormat = (tokens, req, res) =>{
    morgan.token('resObj', function (req) { return JSON.stringify(req.body) })
    const format = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ]
    if(tokens.method(req,res) === 'POST'){return format.concat(tokens.resObj(req,res)).join(' ')}
    return format.join(' ')
}

const apiRouter = require('./api/routes')
const routes = require('./routes')

// %%% MIDLEWARE %%%
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(morganFormat))
app.use(cors())
// %%% ROUTES %%%
app.use('/', routes)
app.use('/api', apiRouter)
// %%% ERROR HANDLING MIDLEWARE %%%
const unknownEndpoint = (request, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
  }
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)