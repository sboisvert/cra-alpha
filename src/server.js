const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const { validationResult, checkSchema } = require('express-validator/check')
const {
  cookieSessionConfig,
  dashboardSchema,
  errorArray2ErrorObject,
} = require('./utils.js')
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
  .use(cookieSession(cookieSessionConfig))

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(logger('dev'))

const getSessionData = (session = {}, enforceExists = false) => {
  const { sin, dobDay, dobMonth, dobYear } = session

  if (enforceExists && (!sin || !dobDay || !dobMonth || !dobYear)) {
    return false
  }

  return { sin, dobDay, dobMonth, dobYear }
}

app.get('/consent', (req, res) => {
  const content =
    '<h1>Consent</h1> \
    <p>Permission for something to happen or agreement to do something.</p>'

  res.send(_renderDocument({ title: '[WIP] Consent', locale, content }))
})

app.get('/confirmation', (req, res) => {
  const data = getSessionData(req.session, true)

  if (!data) {
    return res.redirect(302, '/login')
  }

  res.send(
    renderPage({
      locale,
      pageComponent: 'Confirmation',
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

/* TODO: delete this by Wednesday, April 17th */
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
      props: { data, userInfo: true },
    }),
  )
})

/* TODO: delete this by Wednesday, April 17th */
app.post('/user', checkSchema(dashboardSchema), (req, res) => {
  const data = {
    name: 'Matthew Morris',
    address: '380 Lewis St\nOttawa\nOntario\nK2P 2P6',
    sin: '123-456-789',
    dobDay: '28',
    dobMonth: '02',
    dobYear: '1992',
  }

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).send(
      renderPage({
        locale,
        pageComponent: 'Dashboard',
        title: 'Error: Dashboard',
        props: {
          data,
          userInfo: true,
          errors: errorArray2ErrorObject(errors),
        },
      }),
    )
  }

  req.session = getSessionData(data)

  return res.redirect(302, '/confirmation')
})

module.exports = app
