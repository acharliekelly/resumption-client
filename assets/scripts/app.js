'use strict'

const events = require('./basic/events')
const auth = require('./auth/events')

$(() => {
  auth.initHandlers()
  events.initHandlers()
})
