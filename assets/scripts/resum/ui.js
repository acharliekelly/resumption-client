'use strict'

// resum/ui.js

const utils = require('../utils')
const layoutsTemplate = require('../templates/layouts.handlebars')

const gotLayouts = (responseData) => {
  console.log(responseData)

  const layoutsHtml = layoutsTemplate({ layouts: responseData.layouts })
  $('#queryResults').append(layoutsHtml)
}

const gotLayout = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
}

const gotSections = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
}

const gotSection = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
}

const gotTemplates = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
}

const gotTemplate = (responseData) => {
  console.log(responseData)
  utils.successMessage('Success!')
}

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
