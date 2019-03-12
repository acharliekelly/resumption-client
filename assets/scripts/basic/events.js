'use strict'

// basic/events.js
// Controller for app requests

const utils = require('../utils')
const api = require('./api')
const ui = require('./ui')
const resumeForm = require('../templates/resume-form.handlebars')
const getFormFields = require('../../../lib/get-form-fields')

const onGetResumes = () => {
  // get resume list
  api.getMyResumes()
    .then(ui.gotResumes)
    .catch(ui.retrievalFailure)
}

const onOpenResume = (event) => {
  // show one resume
  const resumeId = getTargetId(event)
  api.getResume(resumeId)
    .then(ui.gotOneResume)
    .catch(ui.retrievalFailure)
}

const onClickCreate = () => {
  console.log('Create Resume button clicked!')
  // show Create form
  const formHtml = resumeForm()
  $('#displayPanel').html(formHtml)
  $('#resumeUser').val(1)
  $('#resumeId').val('')
  $('#resumeForm').on('submit', onCreateSubmit)
}

const onCreateSubmit = (event) => {
  event.preventDefault()
  const formData = getFormData(event)
  api.createResume(formData)
    .then(ui.gotOneResume)
    .catch(ui.creationFailure)
}

const onClickEdit = () => {
  console.log('Edit Resume Content button clicked!')
  // show form
  const resume = utils.getCurrentResume()
  const formHtml = resumeForm(resume)
  $('#displayPanel').html(formHtml)
  $('#resumeForm #resumeId').val(resume.id)
  $('#resumeForm #resumeUser').val(resume.user.id)
  $('#resumeForm #resumeName').val(resume.name)
  $('#resumeForm #resumeFormat').val(resume.format)
  $('#resumeForm textarea').val(resume.content)
  $('#resumeForm').on('submit', onUpdateSubmit)
}

const onUpdateSubmit = (event) => {
  const formData = getFormData(event)
  console.log('Update Form:', formData)
  api.updateResume(formData.resume)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onClickDelete = (event) => {
  const resumeId = getTargetId(event)
  // confirm, then delete
  let confirm = true
  console.log('Delete button clicked')
  confirm = false

  // TODO: Are you sure?
  utils.userMessage('Delete is not allowed right now')

  if (confirm) {
    api.deleteResume(resumeId)
      .then(ui.deletionSuccess)
      .catch(ui.deletionFailure)
  }
}

const getTargetId = (event) => {
  return $(event.target).data('id')
}

const getFormData = (event) => {
  event.preventDefault()
  return getFormFields(event.target)
}

const initHandlers = () => {
  $('#btnMyResumes').on('click', onGetResumes)
  $('#btnCreateResume').on('click', onClickCreate)

  // delegate
  $('#displayPanel').on('click', '.resume button.open-resume', onOpenResume)
  $('#displayPanel').on('click', '.resume-view button.edit-resume', onClickEdit)
  $('#displayPanel').on('click', '.resume-view button.delete-resume', onClickDelete)
}

module.exports = {
  initHandlers
}
