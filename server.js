import express from 'express'
import cors from 'cors'
import logger from 'express-bunyan-logger'
import compression from 'compression'

// import error from './error'
import api from './api'
import responseTime from './middleware/response-time'

let app = express()

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

app.use('/', api)

// app.use(logger.errorLogger())
// app.use(error)

let server = app.listen(8000, () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`app running at http://${host}:${port}`)
})
