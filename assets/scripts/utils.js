'use strict'
// Common utility functions

const store = require('./store')
const config = require('./config')

// returns boolean value for whether token exists
const isAuthenticated = () => {
  return (store.user && store.user.token)
}

const getCurrentUserId = () => {
  return store.user.id
}

const currentUserFilter = (item) => {
  return item.user.id === store.user.id
}

const storeCredentials = (formData) => {
  const credentials = formData.credentials
  store.tempCredentials = credentials
}

const retrieveCredentials = () => {
  return store.tempCredentials
}

const dropCredentials = () => {
  if (store.tempCredentials) {
    store.tempCredentials = null
  }
}

const freeLogin = () => {
  if (store.tempCredentials) {
    return $.ajax({
      url: config.apiUrl + '/sign-in',
      method: 'POST',

      data: {
        email: store.tempCredentials.email,
        password: store.tempCredentials.password
      }
    })
  } else {
    return false
  }
}

const storeCurrentResume = (resumeData) => {
  store.currentResume = resumeData
}

const dropCurrentResume = () => {
  store.currentResume = null
}

const getCurrentResume = () => {
  return store.currentResume
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

const todoOutput = (message, elementId) => {
  const html = `<div class="todo">${message}</div>`
  $(`#${elementId}`).html(html)
}

module.exports = {
  isAuthenticated,
  getCurrentUserId,
  currentUserFilter,
  storeCredentials,
  retrieveCredentials,
  dropCredentials,
  freeLogin,
  storeCurrentResume,
  dropCurrentResume,
  getCurrentResume,
  userMessage,
  warningMessage,
  successMessage,
  failure,
  errorMessage,
  alertMessage,
  todoOutput
}
