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
  openResume(resumeId)
}

const onClickResume = (event) => {
  const tag = $(event.target).prop('tagName')
  let id
  switch (tag) {
    case 'BUTTON':
    case 'SECTION':
      id = getTargetId(event)
      break
    case 'DIV':
      id = $(event.target).parent().data('id')
      break
    default:
      // do nothing
      return
  }
  openResume(id)
}

const openResume = (resumeId) => {
  api.getResume(resumeId)
    .then(ui.gotOneResume)
    .catch(ui.retrievalFailure)
}

// New Resume button clicked -
// display form, define submit fn
const onClickCreate = () => {
  // show Create form
  const formHtml = resumeForm()
  $('#displayPanel').html(formHtml)
  $('.resume-form header').text('Create New Resume')
  $('#resumeUser').val(utils.getCurrentUserId())
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

// Edit Resume button clicked -
//
const onClickEdit = () => {
  // show form
  const currentResume = utils.getCurrentResume()
  const formHtml = resumeForm({ resume: currentResume })
  $('#displayPanel').html(formHtml)
  $('.resume-form header').text('Edit Resume ' + currentResume.id)
  $('#resumeForm select').val(currentResume.format)
  // $('#resumeForm #resumeId').val(currentResume.id)
  // $('#resumeForm #resumeUser').val(currentResume.user.id)
  $('#resumeForm').on('submit', onUpdateSubmit)
}

const onUpdateSubmit = (event) => {
  const formData = getFormData(event)
  api.updateResume(formData)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onClickDelete = (event) => {
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

const initHandlers = () => {
  // menu buttons
  $('#btnMyResumes').on('click', onGetResumes)
  $('#btnCreateResume').on('click', onClickCreate)

  // delegate buttons - will be created by handlebars
  $('#displayPanel').on('click', '.resume button.open-resume', onOpenResume)
  $('#displayPanel').on('click', '.resume-list section.resume', onClickResume)
  $('#displayPanel').on('click', '.resume-view button.edit-resume', onClickEdit)
  $('#displayPanel').on('click', '.resume-view button.delete-resume', onClickDelete)
  // delete confirmed
  $('#modalConfirmDeleteButton').on('click', onDeleteConfirm)
}

module.exports = {
  initHandlers
}
