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
  const resumeList = responseData.resumes
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
  utils.successMessage('Update Successful')
  refreshResumeView(responseData)
}

const updateFailure = (responseData) => {
  utils.errorMessage('Update failed')
}

const creationSuccess = (responseData) => {
  utils.successMessage('Resume created')
  refreshResumeView(responseData)
}

const creationFailure = (responseData) => {
  utils.errorMessage('Unable to create object')
}

const deletionSuccess = (responseData) => {
  utils.successMessage('Resume Deleted!')
  // go back to list view
  $('#btnMyResumes').trigger('click')
}

const deletionFailure = (responseData) => {
  utils.errorMessage('Deletion failed')
}

const retrievalFailure = (responseData) => {
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
