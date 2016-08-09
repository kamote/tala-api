import express from 'express'
import cors from 'cors'
import logger from 'express-bunyan-logger'
import compression from 'compression'

// import error from './error'
import api from './api'
import responseTime from './middleware/response-time'

const app = express()

app.use(logger({
  name: 'request',
  streams: [{
    level: 'debug',
    stream: process.stdout,
  }],
  format: ':remote-address :incoming :method :url :status-code - :user-agent[family] :user-agent[major].:user-agent[minor] :user-agent[os] - :response-time ms',
  excludes: ['*'],
}))
app.use(cors())
app.use(responseTime)
app.use(compression())

const oneHour = 60 * 60

app.get((req, res, next) => {
  res.setHeader('Cache-Control', `public, max-age=${oneHour}`)
  next()
})

app.use('/', api)

// app.use(logger.errorLogger())
// app.use(error)

const server = app.listen(8000, () => {
  const port = server.address().port

  console.log(`tala api running on port ${port}`) // eslint-disable-line no-console
})
