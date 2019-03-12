'use strict'

// basic/api.js
//
// TODO: add auth headers to every method

// const store = require('../store')
const config = require('../config')

const getMyResumes = () => {
  return $.ajax({
    url: config.apiUrl + '/resumes'
  })
}

const getResume = (resumeId) => {
  return $.ajax({
    url: config.apiUrl + '/resumes/' + resumeId,
    method: 'GET'
  })
}

const createResume = (data) => {
  return $.ajax({
    url: config.apiUrl + '/resumes',
    method: 'POST',
    data
  })
}

const updateResume = (data) => {
  console.log('Update: ', data)
  return $.ajax({
    url: config.apiUrl + '/resumes/' + data.resume.id,
    method: 'PATCH',
    data
  })
}

const deleteResume = (resumeId) => {
  return $.ajax({
    url: config.apiUrl + '/resumes/' + resumeId,
    method: 'DELETE'
  })
}

module.exports = {
  getMyResumes,
  getResume,
  updateResume,
  createResume,
  deleteResume
}
