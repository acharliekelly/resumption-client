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
    .catch(authUi.authFail)
}

const onPassthroughSubmit = (event) => {
  const formData = getFormData(event)
  console.log('Sign up form:', formData)
  authApi.signUp(formData).then(() => {
    console.log('Successful signup!')
    console.log('Email: ' + formData.credentials.email)
    console.log('Password: ' + formData.credentials.password)
    authApi.logIn(formData.credentials.email, formData.credentials.password)
      .then(authUi.loginSuccess)
      .catch(authUi.authFail)
  }).catch(authUi.authFail)
}

const onChangePasswordSubmit = (event) => {
  const formData = getFormData(event)
  authApi.changePassword(formData)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.authenticationError)
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
  onPassthroughSubmit,
  onSignupSubmit,
  onLoginSubmit,
  onChangePasswordSubmit,
  onSignoutConfirm,
  initHandlers
}
