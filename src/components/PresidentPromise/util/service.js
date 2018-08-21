import axios from 'axios'
import { isIP, } from 'validator' // check for mobile when developing

const getUrl = 'https://www.mirrormedia.mg/gorest/poll_get'
const increaseUrl = 'https://www.mirrormedia.mg/gorest/poll_increase'

function getENV () {
  return location.hostname === 'localhost' || isIP(location.hostname) ? 'test2' : (location.hostname.includes('dev') ? 'dev': 'prod')
}

export function sendPromiseInterestRequest (promise, interest) {
  const ENV = getENV()
  axios
  .get(increaseUrl, { params: { qid: `${promise.pid}-${ENV}`, field: interest  } })
  .catch(err => {
    if (err) console.error(err)
  })
}

export function sendCategoryInterestRequest (promise) {
  const ENV = getENV()
  promise.category.forEach(category => {    
    axios
    .get(increaseUrl, { params: { qid: `${category}-${ENV}`, field: promise.pid } })
    .catch(err => {
      if (err) console.error(err)
    })
  })
}

export function sendCategoryAllRequest (promise) {
  const ENV = getENV()
  axios
  .get(increaseUrl, { params: { qid: `president-promise-${ENV}`, field: promise.pid } })
  .catch(err => {
    if (err) console.error(err)
  })
}

export function getCategoryInterestRequest (category) {
  const ENV = getENV()
  return axios
  .get(getUrl, { params: { qid: `${category}-${ENV}` } })
  .then(res => {
    return res
  })
  .catch(err => {
    console.error(err)
  })
}

export function getCategoryAllRequest (promise) {
  const ENV = getENV()
  return axios
  .get(getUrl, { params: { qid: `president-promise-${ENV}` } })
  .then(res => {
    return res
  })
  .catch(err => {
    console.error(err)
  })
}
