import {
  getSheet,
  appendSheet,
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
}
