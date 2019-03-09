'use strict'
// auth/ui.js

const store = require('../store')
const utils = require('../utils')

// Public: check for token, update all elements
const refreshAuthElements = () => {
  const token = utils.isAuthenticated()
  if (token) {
    // logged in
    $('.auth-token').show()
    $('.no-token').hide()
    $('.auth-enable').prop('disabled', false)
  } else {
    // not logged in
    $('.auth-token').hide()
    $('.no-token').show()
    $('.auth-enable').prop('disabled', true)
  }
}

// Public
const authFail = () => {
  utils.errorMessage('Unable to log in')
  $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
  refreshAuthElements()
}

// Public
const loginSuccess = (responseData) => {
  // const email = responseData.user.email
  // const name = email[0].toUpperCase() + email.substring(1, email.indexOf('@'))
  // const msg = `Welcome back, ${name}!`
  store.user = responseData.user
  // utils.successMessage(msg)
  refreshAuthElements()
  hideModal()
}

const hideModal = () => {
  $('#modalFormDialog').modal('hide')
}

// Public
const authenticationError = () => {
  utils.errorMessage('Unable to authenticate')
  hideModal()
}

// Public
const changePasswordSuccess = () => {
  utils.userMessage('Password changed.')
  hideModal()
}

// Public
const signUpSuccess = (responseData) => {
  utils.userMessage(`Account created for "${responseData.user.email}".`)
  hideModal()
}

// Public
const signOutSuccess = () => {
  store.user = null
  utils.userMessage('You are signed out')
  hideModal()
  refreshAuthElements()
}

// Public
const signOutFail = () => {
  store.user = null
  utils.userMessage('OK, technically the sign-out failed, but the effect is the same.', 'warning')
  hideModal()
  refreshAuthElements()
}

module.exports = {
  refreshAuthElements,
  authFail,
  authenticationError,
  loginSuccess,
  changePasswordSuccess,
  signUpSuccess,
  signOutSuccess,
  signOutFail
}
