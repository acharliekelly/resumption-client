'use strict'

const resEvents = require('./resum/events')
const authEvents = require('./auth/events')

$(() => {
  authEvents.initHandlers()
  resEvents.initHandlers()
})
