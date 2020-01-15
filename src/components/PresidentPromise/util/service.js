import axios from 'axios'
import { isIP, } from 'validator' // check for mobile when developing

const url = 'https://www.mirrormedia.mg/gorest/poll_get'
const urlM = 'https://m.mirrormedia.mg/gorest/poll_get'

const increaseUrl = 'https://www.mirrormedia.mg/gorest/poll_increase'
const increaseUrlM = 'https://m.mirrormedia.mg/gorest/poll_increase'

function getUrl (isMobile = false) {
  return isMobile ? urlM : url
}

function getIncreaseUrl (isMobile = false) {
  return isMobile ? increaseUrlM : increaseUrl
}

function getENV () {
  return location.hostname === 'localhost' || isIP(location.hostname) ? 'test2' : (location.hostname.includes('dev') ? 'dev': 'prod')
}

export function sendPromiseInterestRequest (promise, interest, isMobile) {
  const ENV = getENV()
  axios
  .get(getIncreaseUrl(isMobile), { params: { qid: `${promise.pid}-${ENV}`, field: interest  } })
  .catch(err => {
    if (err) console.error(err)
  })
}

export function sendCategoryInterestRequest (promise, isMobile) {
  const ENV = getENV()
  promise.category.forEach(category => {    
    axios
    .get(getIncreaseUrl(isMobile), { params: { qid: `${category}-${ENV}`, field: promise.pid } })
    .catch(err => {
      if (err) console.error(err)
    })
  })
}

export function sendCategoryAllRequest (promise, isMobile) {
  const ENV = getENV()
  axios
  .get(getIncreaseUrl(isMobile), { params: { qid: `president-promise-${ENV}`, field: promise.pid } })
  .catch(err => {
    if (err) console.error(err)
  })
}

export function getCategoryInterestRequest (category, isMobile) {
  const ENV = getENV()
  return axios
  .get(getUrl(isMobile), { params: { qid: `${category}-${ENV}` } })
  .then(res => {
    return res
  })
  .catch(err => {
    console.error(err)
  })
}

export function getCategoryAllRequest (isMobile) {
  const ENV = getENV()
  return axios
  .get(getUrl(isMobile), { params: { qid: `president-promise-${ENV}` } })
  .then(res => {
    return res
  })
  .catch(err => {
    console.error(err)
  })
}
