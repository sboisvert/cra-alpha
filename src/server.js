const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const { renderPage, _renderDocument } = require('./pages/_document.js')

let locale = 'en'

const app = express()
app
  // set locale using express middleware
  .use(function(req, res, next) {
    locale = ['en', 'fr'].includes(req.query.locale) ? req.query.locale : locale
    next()
  })
  // serve anything in the 'public' directory as a static file
  .use(express.static('public'))
  // set security-minded response headers: https://helmetjs.github.io/
  .use(helmet())
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(logger('dev'))

app.get('/user', (req, res) => {
  const data = {
    name: 'Matthew Morris',
    address: '380 Lewis St\nOttawa\nOntario\nK2P 2P6',
    sin: '123-456-789',
    dobDay: '28',
    dobMonth: '02',
    dobYear: '1992',
  }

  res.send(
    renderPage({
      locale,
      pageComponent: 'Dashboard',
      props: { data },
    }),
  )
})

/* TODO: delete this by Monday, April 15th */
app.get('/alpha', (req, res) => {
  const content =
    '<h1>Alpha</h1> \
    <p>This site will be changing often as we learn from folks like you.</p> \
    <p>[Full name]</p>'

  res.send(_renderDocument({ title: 'Alpha', locale, content }))
})

module.exports = app
