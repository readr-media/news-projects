import { camelizeKeys, } from 'humps'
import { getHost } from '../util/comm'
import _ from 'lodash'
import qs from 'qs'
import superagent from 'superagent'

const host = getHost()

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
        query[key] = JSON.stringify(where[key])
      })
    } else if (snakeCaseParams.hasOwnProperty(ele)) {
      query[ele] = snakeCaseParams[ele]
    }
  })
  query = qs.stringify(query)
  return query
}

function _doFetch (url) {
  return new Promise((resolve, reject) => {
    superagent
    .get(url)
    .end(function (err, res) {
      if (err) {
        reject(err)
      } else {
        // resolve(camelizeKeys(res.body))
        if (res.text === 'not found' || res.status !== 200) {
          reject(res.text)
        } else {
          resolve({ status: res.status, body: camelizeKeys(res.body), })
        }
      }
    })
  })
}

function _doPost (url, params) {
  return new Promise((resolve, reject) => {
    superagent
      .post(url)
      .set('Content-Type', 'application/json')
      .send(params)
      .end(function (err, res) {
        if (err) {
          reject(err)
        } else {
          resolve({ status: res.status, body: camelizeKeys(res.body), })
        }
      })
  })
}

export function getReports ({ params = {}} = {}) {
  let url = `${host}/project-api/reports`
  const query = _buildQuery(params)
  if (query && (query.length > 0)) {
    url = url + `?${query}`
  }
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