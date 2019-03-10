'use strict'
// Common utility functions

// const store = require('./store')

// returns boolean value for whether token exists
const isAuthenticated = () => {
  // return (store.user && store.user.token)
  // change once authentication is running
  return true
}

const userMessage = function (message, alertClass = 'info') {
  alertMessage(message, alertClass)
}

const warningMessage = function (message) {
  alertMessage(message, 'warning')
}

const successMessage = function (message) {
  alertMessage(message, 'success')
}

const failure = function () {
  errorMessage('Something went wrong, please try again.')
}

const errorMessage = function (message) {
  alertMessage(message, 'danger')
}

const alertMessage = function (message, cls = 'info', timeout = 5000) {
  const html = `<div class="alert alert-${cls} fade show" role="alert" height="80%">${message}</div>`
  $('#userMessage').html(html).alert()
  setTimeout(() => {
    $('#userMessage')
      .alert('close')
      .html('')
  }, timeout)
}

module.exports = {
  isAuthenticated,
  userMessage,
  warningMessage,
  successMessage,
  failure,
  errorMessage,
  alertMessage
}
