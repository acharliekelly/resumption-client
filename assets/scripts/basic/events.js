'use strict'

// basic/events.js
// Controller for app requests

const utils = require('../utils')
const api = require('./api')
const ui = require('./ui')
const resumeForm = require('../templates/resume-form.handlebars')
const getFormFields = require('../../../lib/get-form-fields')

const onGetResumes = () => {
  hideChildButtons()
  // get resume list
  api.getMyResumes()
    .then(ui.gotResumes)
    .catch(ui.retrievalFailure)
}

const onOpenResume = (event) => {
  hideChildButtons()
  // show one resume
  const resumeId = getTargetId(event)
  api.getResume(resumeId)
    .then(ui.gotOneResume)
    .catch(ui.retrievalFailure)
}

// New Resume button clicked -
// display form, define submit fn
const onClickCreate = () => {
  console.log('Create Resume button clicked!')
  // show Create form
  const formHtml = resumeForm()
  $('#displayPanel').html(formHtml)
  $('.resume-form header').text('Create New Resume')
  $('#resumeUser').val(utils.getCurrentUserId())
  $('#resumeId').val('')
  $('#resumeForm').on('submit', onCreateSubmit)
  initEditor()
}

const onCreateSubmit = (event) => {
  hideChildButtons()
  event.preventDefault()
  const formData = getFormData(event)
  api.createResume(formData)
    .then(ui.gotOneResume)
    .catch(ui.creationFailure)
}

// Edit Resume button clicked -
//
const onClickEdit = () => {
  hideChildButtons()
  // show form
  const currentResume = utils.getCurrentResume()
  const formHtml = resumeForm({ resume: currentResume })
  $('#displayPanel').html(formHtml)
  $('.resume-form header').text('Edit Resume ' + currentResume.id)
  $('#resumeForm select').val(currentResume.format)
  $('#resumeForm').on('submit', onUpdateSubmit)
  initEditor()
}

const onUpdateSubmit = (event) => {
  hideChildButtons()
  const formData = getFormData(event)
  api.updateResume(formData)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onClickDelete = (event) => {
  hideChildButtons()
  const resumeId = getTargetId(event)
  $('#modalConfirmDeleteButton').data('id', resumeId)
  $('#modalConfirmDeleteDialog').modal('show')
}

const onDeleteConfirm = (event) => {
  const resumeId = getTargetId(event)
  $('#modalConfirmDeleteDialog').modal('hide')
  api.deleteResume(resumeId)
    .then(ui.deletionSuccess)
    .catch(ui.deletionFailure)
}

const getTargetId = (event) => {
  return $(event.target).data('id')
}

const getFormData = (event) => {
  event.preventDefault()
  return getFormFields(event.target)
}

const hideChildButtons = () => {
  $('#menuPanel .button-group .button-group').hide()
}

const initEditor = () => {
  const simpleMde = new SimpleMDE({
    toolbar: ['bold', 'italic', 'heading', '|', 'quote'],
    element: $('#resumeContent')[0]
  })
}

const initHandlers = () => {
  // menu buttons
  $('#btnMyResumes').on('click', onGetResumes)
  $('#btnCreateResume').on('click', () => {
    $('#newResumeOptions').show()
  })
  $('#btnNewResumeBlank').on('click', onClickCreate)
  $('#btnNewResumeTemplate').on('click', onClickCreate)

  // delegate buttons - will be created by handlebars
  $('#displayPanel').on('click', '.resume button.open-resume', onOpenResume)
  $('#displayPanel').on('click', '.resume-view button.edit-resume', onClickEdit)
  $('#displayPanel').on('click', '.resume-view button.delete-resume', onClickDelete)
  // delete confirmed
  $('#modalConfirmDeleteButton').on('click', onDeleteConfirm)

  $('#newResumeOptions').hide()
}

module.exports = {
  initHandlers,
  initEditor
}
