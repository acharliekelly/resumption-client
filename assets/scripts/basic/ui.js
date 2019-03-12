'use strict'

// basic/ui.js

const utils = require('../utils')

// Handlebars
const resumeListTmpl = require('../templates/resume-list.handlebars')
const resumeViewTmpl = require('../templates/resume-view.handlebars')

const gotResumes = (responseData) => {
  refreshResumeList(responseData)
}

// refreshes list view - run after delete
const refreshResumeList = (responseData) => {
  const resumeList = responseData.resumes.filter(utils.currentUserFilter)
  let resumeHtml = ''
  if (resumeList.length > 0) {
    resumeHtml = resumeListTmpl({ resumes: resumeList })
  } else {
    resumeHtml = '<div style="text-align:center">You have no resumes yet.</div>'
  }
  $('#displayPanel').html(resumeHtml)
}

const gotOneResume = (responseData) => {
  refreshResumeView(responseData)
}

// refreshes single resume vew - run after any update
const refreshResumeView = (responseData) => {
  utils.storeCurrentResume(responseData.resume)
  const resumeHtml = resumeViewTmpl({ resume: responseData.resume })
  $('#displayPanel').html(resumeHtml)
}

const updateSuccess = (responseData) => {
  console.log(responseData)
  utils.successMessage('Update Successful')
  refreshResumeView(responseData)
}

const updateFailure = (responseData) => {
  console.log(responseData)
  utils.errorMessage('Update failed')
}

const creationSuccess = (responseData) => {
  console.log(responseData)
  utils.successMessage('Resume created')
  refreshResumeView(responseData)
}

const creationFailure = (responseData) => {
  console.log(responseData)
  utils.errorMessage('Unable to create object')
}

const deletionSuccess = (responseData) => {
  console.log(responseData)

  utils.successMessage('Resume Deleted!')
  // go back to list view
  $('#btnMyResumes').trigger('click')
}

const deletionFailure = (responseData) => {
  console.log(responseData)
  utils.errorMessage('Deletion failed')
}

const retrievalFailure = (responseData) => {
  console.log(responseData)
  utils.errorMessage('Unable to retrieve item')
}

module.exports = {
  gotResumes,
  gotOneResume,
  refreshResumeView,
  retrievalFailure,
  updateSuccess,
  updateFailure,
  creationSuccess,
  creationFailure,
  deletionSuccess,
  deletionFailure
}
