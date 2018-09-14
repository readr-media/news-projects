import axios from 'axios'
import qs from 'qs'
import { mapKeys, snakeCase, } from 'lodash'

const county = {
  '台北': '臺北',
  '台中': '臺中',
  '台南': '臺南',
}

function buildURL (url, params) {
  params.county = params.county.replace(/台北|台中|台南/gi, (matched) => county[matched])
  const snakeCaseParams = mapKeys(params, (value, key) => snakeCase(key))
  return `${url}?${qs.stringify(snakeCaseParams)}`
}

export function fetchCandidates (params) {
  const url = buildURL('/project-api/election-board/candidates_terms', params)
  return axios.get(url)
}

export function fetchElections (year = 2018) {
  return axios.get(`/project-api/election-board/elections/${year}`)
}
