'use strict'

// basic/api.js
//

const store = require('../store')
const config = require('../config')

const getMyResumes = () => {
  return $.ajax({
    url: config.apiUrl + '/resumes',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getResume = (resumeId) => {
  return $.ajax({
    url: config.apiUrl + '/resumes/' + resumeId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createResume = (data) => {
  console.log('Create Resume: ', data)
  return $.ajax({
    url: config.apiUrl + '/resumes',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updateResume = (data) => {
  console.log('Update: ', data)
  return $.ajax({
    url: config.apiUrl + '/resumes/' + data.resume.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteResume = (resumeId) => {
  return $.ajax({
    url: config.apiUrl + '/resumes/' + resumeId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getMyResumes,
  getResume,
  updateResume,
  createResume,
  deleteResume
}
