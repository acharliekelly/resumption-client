'use strict'

// resum/api.js
//
// TODO: add auth headers to every method

// const store = require('../store')
const config = require('../config')

// Layouts
const getMyLayouts = () => {
  return $.ajax(config.apiUrl + '/layouts')
}

const getLayout = (layoutId) => {
  return $.ajax({
    url: config.apiUrl + '/layouts/' + layoutId
  })
}

const createLayout = (data) => {
  return $.ajax({
    url: config.apiUrl + '/layouts/' + data.id,
    method: 'POST',
    data
  })
}

const updateLayout = (data) => {
  return $.ajax({
    url: config.apiUrl + '/layouts/' + data.id,
    method: 'PATCH',
    data
  })
}

const addSectionToLayout = (data) => {
  return $.ajax({
    url: config.apiUrl + '/section_layouts',
    method: 'POST',
    data
  })
}

const deleteLayout = (data) => {
  return $.ajax({
    url: config.apiUrl + '/layouts/' + data.id,
    method: 'DELETE'
  })
}

// Sections
const getMySections = () => {
  return $.ajax({
    url: config.apiUrl + '/sections'
  })
}

const getSection = (sectionId) => {
  return $.ajax({
    url: config.apiUrl + '/sections/' + sectionId
  })
}

const createSection = (data) => {
  return $.ajax({
    url: config.apiUrl + '/sections',
    method: 'POST',
    data
  })
}

const updateSection = (data) => {
  return $.ajax({
    url: config.apiUrl + '/sections/' + data.id,
    method: 'PATCH',
    data
  })
}

const deleteSection = (data) => {
  return $.ajax({
    url: config.apiUrl + '/sections/' + data.id,
    method: 'DELETE'
  })
}

const removeSectionFromLayout = (data) => {
  return $.ajax({
    url: config.apiUrl + '/section_layouts/' + data.id,
    method: 'DELETE'
  })
}

// Templates
const getTemplates = () => {
  return $.ajax({
    url: config.apiUrl + '/templates'
  })
}

const getTemplate = (templateId) => {
  return $.ajax({
    url: config.apiUrl + '/templates/' + templateId
  })
}

const publishResume = (layoutId) => {
  return $.ajax({
    url: config.apiUrl + '/layouts/' + layoutId,
    method: 'PATCH',
    data: {
      'is_public': true
    }
  })
}

module.exports = {
  getMyLayouts,
  getLayout,
  createLayout,
  updateLayout,
  deleteLayout,
  getMySections,
  getSection,
  createSection,
  updateSection,
  addSectionToLayout,
  deleteSection,
  removeSectionFromLayout,
  getTemplates,
  getTemplate,
  publishResume
}
