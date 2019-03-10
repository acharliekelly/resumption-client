'use strict'

// resum/events.js
// Controller for app requests

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onGetResumes = () => {

}

const onCreateResumeClick = () => {
  // show form
}

const onGetSections = () => {

}

const onCreateSectionClick = () => {
  // show form
}

const onCreateResumeSubmit = (event) => {
  const formData = getFormData(event)
}

const onCreateSectionSubmit = (event) => {
  const formData = getFormData(event)

}


const getFormData = (event) => {
  event.preventDefault()
  return getFormFields(event.target)
}

const initHandlers = () => {
  $('#btnMyResumes').on('click', onGetResumes)
  $('#btnCreateResume').on('click', onCreateResumeClick)
  $('#btnSections').on('click', onGetSections)
  $('#btnNewSection').on('click', onCreateSectionClick)
}

module.events = {
  initHandlers
}
