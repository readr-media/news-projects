import _ from 'lodash'
import {
  getReports,
  getReportsCount,
  getSheet,
  appendSheet,
  getDriveFile,
  uploadImage,
} from '../api'

export default {
  ADD_SUBSCRIPTION: ({}, { email, datetime, slug, url }) => {
    return appendSheet({
      params: {
        spreadsheetId: '1-7YTT5Y-VINVAYy8Aem0kGnerQfTEoBASQxI_J1YR8c',
        range: 'Email',
        valueInputOption: 'RAW',
        resource: {
          majorDimension: 'ROWS',
          values: [
            [ email, datetime, slug, url ]
          ]
        }
      }
    })
  },
  FETCH_REPORTS: ({ state, commit }, { params }) => {
    return getReports({ params })
    .then(({ status, body }) => {
      let orig
      if (params.page > 1) {
        orig = _.values(_.get(state, 'reports', []))
        body.items = _.concat(orig, body.items)
      }
      commit('SET_REPORTS', { reports: body.items })
    })
    .catch(err => console.error('Error while fetching reports', err))
  },
  FETCH_REPORTS_COUNT: ({ state, commit }) => {
    return getReportsCount()
      .then(({ status, body }) => commit('SET_REPORTS_COUNT', { count: body.meta.total }))
      .catch(err => console.error('Error while fetching reports count', err))
  },
  FETCH_SHEET: ({ state }, { params }) => {
    return getSheet({ params })
    .then(({ status, body }) => {
      return { status, body }
    })
    .catch(err => {
      console.error('Error while fetching sheet', err)
    })
  },
  APPEND_SHEET: ({ state }, { params }) => {
    return appendSheet({ params })
    .then(({ status, body }) => {
      return { status, body }
    })
    .catch(err => {
      console.error('Error while appending sheet', err)
    })
  },
  FETCH_DRIVE_FILE: ({ state }, { params }) => {
    return getDriveFile({ params })
    .then(({ status, body }) => {
      return { status, body }
    })
    .catch(err => {
      console.error('Error while fetching sheet', err)
      throw err
    })
  },
  UPDATE_VIEWPORT: ({ state, commit }, viewport) => {
    commit('SET_VIEWPORT', viewport)
  },
  UPLOAD_IMAGE_TO_GCS: ({}, { file, folderName }) => {
    return uploadImage({ file, folderName, })
  }
}
