const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const loadIndexHandler = require('./routes/index')
const loadUploadHandler = require('./routes/upload')
const loadAnalyzeHandler = require('./routes/analyze')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Load route handler, we can improve it with dynamic import
loadIndexHandler(app)
loadUploadHandler(app)
loadAnalyzeHandler(app)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
