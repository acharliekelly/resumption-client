'use strict'

// resum/ui.js

const utils = require('../utils')

// Handlebars
const layoutListTmpl = require('../templates/layout-list.handlebars')
const layoutViewTmpl = require('../templates/layout-view.handlebars')
const sectionListTmpl = require('../templates/section-list.handlebars')
// const sectionEditTmpl = require('../templates/section-edit.handlebars')
const templateListTmpl = require('../templates/template-list.handlebars')

const gotLayouts = (responseData) => {
  console.log(responseData)

  const layoutsHtml = layoutListTmpl({ layouts: responseData.layouts })
  $('#queryResults').html(layoutsHtml)
}

const gotLayout = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
  const layoutHtml = layoutViewTmpl({ layout: responseData.layout })
  $('#queryResults').html(layoutHtml)
}

const gotSections = (responseData) => {
  // TODO: differentiate between sections in layout and all sections.
  // Within layout, Remove button should remove from layout.
  // Outside layout, button should delete section
  // - can only delete unassigned sections
  console.log(responseData)
  utils.successMessage('Success!')
  const sectionsHtml = sectionListTmpl({ sections: responseData.sections })
  $('#queryResults').html(sectionsHtml)
}

const gotSection = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
  utils.todoOutput('put Edit Section form here')
  // const sectionHtml = sectionEditTmpl({ section: responseData.section })
  // $('#queryResults').html(sectionHtml)
}

const gotTemplates = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
  const templateHtml = templateListTmpl({ templates: responseData.templates })
  $('#queryResults').html(templateHtml)
}

// Do we really need this? When is it going to be called?
// Instead, just provide template details within Layout view
const gotTemplate = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
}

// Could probably move all these to Utils
const updateSuccess = (responseData) => {
  console.log(responseData)
  utils.successMessage('Update Successful')
}

const updateFailure = (responseData) => {
  console.log(responseData)
  utils.errorMessage('Update failed')
}

const creationSuccess = (responseData) => {
  console.log(responseData)
  utils.successMessage('Object created')
}

const creationFailure = (responseData) => {
  console.log(responseData)
  utils.errorMessage('Unable to create object')
}

const deletionSuccess = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
}

const deletionFailure = (responseData) => {
  console.log(responseData)
  utils.errorMessage('Deletion failed')
}

const publishResumeSuccess = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
}

const retrievalFailure = (responseData) => {
  console.log(responseData)
  utils.errorMessage('Unable to retrieve item')
}

module.exports = {
  gotLayouts,
  gotLayout,
  gotSections,
  gotSection,
  gotTemplates,
  gotTemplate,
  retrievalFailure,
  updateSuccess,
  updateFailure,
  creationSuccess,
  creationFailure,
  deletionSuccess,
  deletionFailure,
  publishResumeSuccess
}
