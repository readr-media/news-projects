import { camelizeKeys, } from 'humps'
import { getHost, getProtocol } from '../util/comm'
import _ from 'lodash'
import axios from 'axios'
import qs from 'qs'

const host = getHost()
const protocol = getProtocol()

function _buildQuery (params = {}) {
  let query = {}
  const whitelist = [
    'spreadsheet_id',
    'range',
    'value_input_option',
    'file_id',
    'fields',
    'max_result',
    'where',
    'page',
    'sort',
  ]
  const snakeCaseParams = _.mapKeys(params, (value, key) => _.snakeCase(key))
  whitelist.forEach((ele) => {
    if (ele === 'where') {
      const where = _.mapValues(snakeCaseParams[ele], (value) => {
        value = Array.isArray(value) ? value : [ value, ]
        return { '$in': value, }
      })
      Object.keys(where).forEach((key) => {
        query[_.snakeCase(key)] = JSON.stringify(where[key])
      })
    } else if (snakeCaseParams.hasOwnProperty(ele)) {
      query[ele] = snakeCaseParams[ele]
    }
  })
  query = qs.stringify(query)
  return query
}

function _doFetch (url) {
  return axios.get(url)
    .then(res => Promise.resolve({ status: res.status, body: camelizeKeys(res.data)}))
    .catch(err => Promise.reject(err))
}

function _doPost (url, params) {
  return axios.post(url, params, { headers: { 'Content-Type': 'application/json' }})
    .then(res => Promise.resolve({ status: res.status, body: camelizeKeys(res.data)}))
    .catch(err => Promise.reject(err))
}

export function getReports ({ params = {}} = {}) {
  let url = `${host}/project-api/reports`
  const query = _buildQuery(params)
  if (query && (query.length > 0)) {
    url = url + `?${query}`
  }
  return _doFetch(url)
}

export function getReportsCount ({ params = {}} = {}) {
  const url = `${host}/project-api/report/count`
  return _doFetch(url)
}

export function getSheet ({ params = {} } = {}) {
  let url = `/project-api/googlesheet`
  const query = _buildQuery(params)
  if (query && (query.length > 0)) {
    url = url + `?${query}`
  }
  return _doFetch(url)
}

export function getSheetWithoutRedis ({ params = {} } = {}) {
  let url = `${protocol}//${host}/project-api/googlesheet/nonredis`
  const query = _buildQuery(params)
  if (query && (query.length > 0)) {
    url = url + `?${query}`
  }
  return _doFetch(url)
}

export function appendSheet ({ params = {} } = {}) {
  let url = `/project-api/googlesheet`
  const query = _buildQuery(params)
  if (query && (query.length > 0)) {
    url = url + `?${query}`
  }
  return _doPost(url, params.resource)
}

export function getDriveFile ({ params = {} } = {}) {
  let url = `/project-api/googledrive`
  const query = _buildQuery(params)
  if (query && (query.length > 0)) {
    url = url + `?${query}`
  }
  return _doFetch(url)
}

export function uploadImage({ file, folderName, }) {
  const url = `/project-api/upload/image`
  return axios.post(url, file, {
    headers: {
      'content-type': 'multipart/form-data',
      'folder-name': folderName
    },
  })
}
