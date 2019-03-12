'use strict'

// auth/events.js
// Controller for Authentication requests
const utils = require('../utils')
const authApi = require('./api')
const authUi = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onLoginSubmit = (event) => {
  const formData = getFormData(event)
  authApi.signIn(formData)
    .then(authUi.loginSuccess)
    .catch(authUi.authFail)
  // $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
}

const onSignupSubmit = (event) => {
  const formData = getFormData(event)
  utils.storeCredentials(formData)
  authApi.signUp(formData)
    .then(authUi.signUpSuccess)
    .catch(authUi.authFail)
  // $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
}

const onChangePasswordSubmit = (event) => {
  const formData = getFormData(event)
  authApi.changePassword(formData)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.authenticationError)
  // $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
}

const onSignoutConfirm = (event) => {
  event.preventDefault()
  authApi.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.authenticationError)
}

const getFormData = (event) => {
  event.preventDefault()
  return getFormFields(event.target)
}

const initHandlers = () => {
  // $('.modal:has(form)').on('show.bs.modal', function () {
  //   $(this).find('input').val('')
  // })

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

  $('#signoutBtn').on('click', onSignoutConfirm)

  authUi.refreshAuthElements()
}

module.exports = {
  onSignupSubmit,
  onLoginSubmit,
  onChangePasswordSubmit,
  onSignoutConfirm,
  initHandlers
}
