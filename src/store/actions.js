import {
  getSheet,
  appendSheet,
  getDriveFile,
} from '../api'

export default {
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
    })
  },
}
