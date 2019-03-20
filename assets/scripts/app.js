'use strict'

const events = require('./basic/events')
const auth = require('./auth/events')
// const utils = require('./utils')

$(() => {
  auth.initHandlers()
  events.initHandlers()

  // $('#titlePanel img').on('dblclick', utils.testAlert)
})
