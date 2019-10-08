const express = require('express')
const router = express.Router()
const axios = require('axios')
const { API_PROTOCOL, API_TIMEOUT, ELECTION_BOARD_HOST, ELECTION_BOARD_PORT, } = require('../../config')
const { fetchFromRedis, insertIntoRedis, redisWriting, } = require('../ioredisHandler')
const { mapKeys, snakeCase, } = require('lodash')
const { verifyToken } = require('../../service/jwt')

const apiHost = API_PROTOCOL + '://' + ELECTION_BOARD_HOST + ':' + ELECTION_BOARD_PORT

const handleError = (err, res) => {
  if (err.response) {
    res.status(err.response.status).json({ error: err.response.data })
  } else if (err.request) {
    res.status(500).json({ error: err.request })
  } else {
    res.status(500).json({ error: err.message })
  }
}

router.get('/boards', fetchFromRedis, (req, res, next) => {
  const url = `${apiHost}/api${req.url}`
  if (res.redis) {
    console.error('fetch data from Redis.', url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  axios.get(url, { timeout: API_TIMEOUT })
    .then(response => {
      const dt = response.data
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
      }
      res.json(dt)
      next()
    })
    .catch(err => {
      handleError(err, res)
    })
}, insertIntoRedis)

router.get('/candidates_terms', fetchFromRedis, (req, res, next) => {
  const url = `${apiHost}/api${req.url}`
  if (res.redis) {
    console.error('fetch data from Redis.', url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  axios.get(url, { timeout: API_TIMEOUT })
    .then(response => {
      const dt = response.data
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
      }
      res.json(dt)
      next()
    })
    .catch(err => {
      handleError(err, res)
    })
}, insertIntoRedis)

router.get('/elections/:year', (req, res, next) => {
  const url = `${apiHost}/api${req.url}`
  if (res.redis) {
    console.error('fetch data from Redis.', url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  axios.get(url, { timeout: API_TIMEOUT })
    .then(response => {
      const dt = response.data
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
      }
      res.json(dt)
      next()
    })
    .catch(err => {
      handleError(err, res)
    })
}, insertIntoRedis)

router.get('/verify/board', (req, res) => {
  const url = `${apiHost}/api${req.url}`
  axios.get(url, { timeout: API_TIMEOUT })
    .then(response => {
      res.json(response.data)
    })
    .catch(err => {
      handleError(err, res)
    })
})

router.get('/verify/board/:id', (req, res) => {
  const url = `${apiHost}/api${req.url}`
  axios.get(url, { timeout: API_TIMEOUT })
    .then(response => {
      res.json(response.data)
    })
    .catch(err => {
      handleError(err, res)
    })
})

router.post('/boards', verifyToken, (req, res) => {
  const token = req.headers.authorization
  const body = mapKeys(req.body, (value, key) => snakeCase(key))
  const url = `${apiHost}/api${req.url}/`
  redisWriting(token, 'used', null, 48 * 60 * 60 * 1000)
  axios.post(url, body, { timeout: API_TIMEOUT })
  .then(response => {
    res.json(response.data)
  })
  .catch(err => {
    handleError(err, res)
  })
})

router.post('/verify/board', verifyToken, (req, res) => {
  const token = req.headers.authorization
  const body = mapKeys(req.body, (value, key) => snakeCase(key))
  const url = `${apiHost}/api${req.url}`
  redisWriting(token, 'used', null, 48 * 60 * 60 * 1000)
  axios.post(url, body, { timeout: API_TIMEOUT })
  .then(response => {
    res.json(response.data)
  })
  .catch(err => {
    handleError(err, res)
  })
})

router.post('/verify/boards', verifyToken, (req, res) => {
  const token = req.headers.authorization
  const body = mapKeys(req.body, (value, key) => snakeCase(key))
  const url = `${apiHost}/api${req.url}`
  redisWriting(token, 'used', null, 48 * 60 * 60 * 1000)
  axios.post(url, body, { timeout: API_TIMEOUT })
  .then(response => {
    res.json(response.data)
  })
  .catch(err => {
    handleError(err, res)
  })
})

module.exports = router
