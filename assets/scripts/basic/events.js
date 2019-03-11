'use strict'

// resum/events.js
// Controller for app requests

const api = require('./api')
const ui = require('./ui')
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
}

const onCreateSubmit = (event) => {
  const formData = getFormData(event)
  api.createResume(formData)
    .then(ui.gotOneResume)
    .catch(ui.creationFailure)
}

const onClickEditName = () => {
  console.log('Edit Resume Name button clicked!')
  // show Edit Name input
}

const onEditNameSubmit = (event) => {
  const formData = getFormData(event)
  api.updateResumeName(formData)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onClickEditContent = () => {
  console.log('Edit Resume Content button clicked!')
  // show form
}

const onEditContentSubmit = (event) => {
  const formData = getFormData(event)
  api.updateResumeContent(formData)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)

}

const onClickDelete = (event) => {
  const resumeId = getTargetId(event)
  // confirm, then delete
  let confirm = false
  console.log('Delete button clicked')
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
  $('#btnCreateResume').on('click', onClickCreateResume)

  // delegate
  $('#displayPanel').on('click', '.resume button.open-resume', onOpenResume)
  $('#displayPanel').on('click', '.resume-view button.edit-resume-name', onClickEditResumeName)
  $('#displayPanel').on('click', '.resume-view button.edit-resume-content', onClickEditResumeContent)
  $('#displayPanel').on('click', '.resume-view button.delete-resume', onClickDeleteResume)
}

module.exports = {
  initHandlers
}
