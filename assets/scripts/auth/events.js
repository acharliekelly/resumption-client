'use strict'

// auth/events.js
// Controller for Authentication requests
const authApi = require('./api')
const authUi = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onLoginSubmit = (event) => {
  const formData = getFormData(event)
  authApi.signIn(formData)
    .then(authUi.loginSuccess)
    .catch(authUi.authFail)
}

const onSignupSubmit = (event) => {
  const formData = getFormData(event)
  authApi.signUp(formData)
    .then(authUi.signUpSuccess)
    .catch(authUi.signupFail)
}

const onChangePasswordSubmit = (event) => {
  const formData = getFormData(event)
  authApi.changePassword(formData)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.authenticationError)
}

const onSignoutClick = (event) => {
  event.preventDefault()
  authApi.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutSuccess) // failed signout has same effect as successful signout
}

const getFormData = (event) => {
  event.preventDefault()
  return getFormFields(event.target)
}

const initHandlers = () => {
  $('#modalLoginForm').on('submit', onLoginSubmit)
  $('#modalSignupForm').on('submit', onSignupSubmit)
  $('#modalChangePasswordForm').on('submit', onChangePasswordSubmit)

  $('#modalLoginSubmitBtn').on('click', () => {
    $('#modalLoginForm').trigger('submit')
    $('#modalLoginFormDialog').modal('hide')
  })

  $('#modalSignupSubmitBtn').on('click', () => {
    $('#modalSignupForm').trigger('submit')
    $('#modalSignupFormDialog').modal('hide')
  })

  $('#modalChangePasswordSubmitBtn').on('click', () => {
    $('#modalChangePasswordForm').trigger('submit')
    $('#modalChangePasswordFormDialog').modal('hide')
  })

  $('#signoutBtn').on('click', onSignoutClick)

  $('.modal form').on('keydown', (event) => {
    if (event.keyCode === 13) { // enter
      const btn = $(event.target).closest('form').data('submit')
      $(btn).trigger('click')
    } else if (event.keyCode === 27) { // esc
      $(this).modal('destroy')
    }
  })

  authUi.refreshAuthElements()
}

module.exports = {
  initHandlers
}
