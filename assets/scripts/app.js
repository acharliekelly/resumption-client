'use strict'

const events = require('./basic/events')
const auth = require('./auth/events')

$(() => {
  $('body').css('background-color', '#fff')
  auth.initHandlers()
  events.initHandlers()
})
