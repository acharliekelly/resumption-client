'use strict'

// resum/events.js
// Controller for app requests

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

// Layouts
const onGetLayouts = () => {
  api.getMyLayouts()
    .then(ui.gotLayouts)
    .catch(ui.retrievalFailure)
}

const onGetLayout = (event) => {
  const targetId = getTargetId(event)
  api.getLayout(targetId).then(ui.gotLayout).catch(ui.retrievalFailure)
}

const onCreateLayoutClick = () => {
  console.log('Create Layout button clicked')
  // show form
}

const onCreateLayoutSubmit = (event) => {
  const formData = getFormData(event)
  api.createLayout(formData)
    .then(ui.gotLayout)
    .catch(ui.creationFailure)
}

const onUpdateLayoutSubmit = (event) => {
  const formData = getFormData(event)
  api.updateLayout(formData)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onDeleteLayoutSubmit = (event) => {
  const formData = getFormData(event)
  api.deleteLayout(formData)
    .then(ui.deletionSuccess)
    .catch(ui.deletionFailure)
}

const onAddSectionToLayout = (event) => {
  const formData = getFormData(event)
  api.addSectionToLayout(formData)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onRemoveSectionFromLayout = (event) => {
  const formData = getFormData(event)
  api.removeSectionFromLayout(formData)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

// Sections
const onGetSections = () => {
  api.getMySections().then(ui.gotSections).catch(ui.retrievalFailure)
}

const onGetSection = (event) => {
  const targetId = getTargetId(event)
  api.getSection(targetId).then(ui.gotSection).catch(ui.retrievalFailure)
}

const onCreateSectionClick = () => {
  console.log('Create Section button clicked')
  // show form
}

const onCreateSectionSubmit = (event) => {
  const formData = getFormData(event)
  api.createSection(formData)
    .then(ui.gotSection)
    .catch(ui.retrievalFailure)
}

const onUpdateSectionSubmit = (event) => {
  const formData = getFormData(event)
  api.updateSection(formData)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onDeleteSectionSubmit = (event) => {
  const formData = getFormData(event)
  api.deleteSection(formData)
    .then(ui.deletionSuccess)
    .catch(ui.deletionFailure)
}

// Templates
const onGetTemplates = () => {
  api.getTemplates().then(ui.gotTemplates).catch(ui.retrievalFailure)
}

const onGetTemplate = (event) => {
  const targetId = getTargetId(event)
  api.getTemplate(targetId).then(ui.gotTemplate).catch(ui.retrievalFailure)
}

const getTargetId = (event) => {
  return $(event.target).data('id')
}

const getFormData = (event) => {
  event.preventDefault()
  return getFormFields(event.target)
}

const initHandlers = () => {
  $('#btnMyResumes').on('click', onGetLayouts)
  $('#btnCreateResume').on('click', onCreateLayoutClick)
  $('#btnSections').on('click', onGetSections)
  $('#btnNewSection').on('click', onCreateSectionClick)
  $('#btnTemplates').on('click', onGetTemplates)

  // delegate

  $('#queryResults').on('click', '.layout button.open-layout', onGetLayout)
  $('#queryResults').on('click', '.layout-edit button.add-section', onGetSections)
  // $('#queryResults').on('click', '.layout-edit button.delete-layout', onDeleteLayoutSubmit)
  $('#queryResults').on('click', '.section button.update-section', onGetSection)
  $('#queryResults').on('click', '.section button.remove-section', onRemoveSectionFromLayout)
}

module.exports = {
  initHandlers
}
