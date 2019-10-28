const express = require('express')
const router = express.Router()
const axios = require('axios')
const {
  API_PROTOCOL,
  API_TIMEOUT,
  ELECTION_BOARD_HOST,
  ELECTION_BOARD_PORT,
  GOOGLE_API_KEY_ELECTION_BOARD
} = require('../../config')
const { fetchFromRedis, insertIntoRedis, redisWriting, } = require('../ioredisHandler')
const { mapKeys, snakeCase, } = require('lodash')
const { verifyToken } = require('../../service/jwt')

const apiHost = `${API_PROTOCOL}://${ELECTION_BOARD_HOST}:${ELECTION_BOARD_PORT}`

// const apiHost = API_PROTOCOL + '://' + ELECTION_BOARD_HOST

const handleError = (err, res) => {
  if (err.response) {
    res.status(err.response.status).json({ error: err.response.data })
  } else if (err.request) {
    res.status(500).json({ error: err.request })
  } else {
    res.status(500).json({ error: err.message })
  }
}

router.get('/google_map', fetchFromRedis, (req, res, next) => {
  const param = req.url.split('/google_map?')[1]
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${param}&key=${GOOGLE_API_KEY_ELECTION_BOARD}&language=zh-TW`

  if (res.redis) {
    console.error('fetch data from Redis.', url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  axios.get(url, { timeout: API_TIMEOUT })
    .then((response) => {
      const dt = response.data
      res.json(dt)
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
        next()
      }
    })
    .catch((err) => {
      handleError(err, res)
    })
}, insertIntoRedis)

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
      res.json(dt)
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
        next()
      }
    })
    .catch(err => {
      handleError(err, res)
    })
}, insertIntoRedis)

router.get('/candidates_terms', fetchFromRedis, (req, res, next) => {
  const url = `${apiHost}/api${req.url}`
  console.log('------ ', url)
  if (res.redis) {
<<<<<<< HEAD
    console.log('============')
=======
    console.error('fetch data from Redis.', url)
>>>>>>> modify google map api get method
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  axios.get(url, { timeout: API_TIMEOUT })
<<<<<<< HEAD
    .then(response => {
      console.log('--==--', response)
=======
    .then((response) => {
>>>>>>> modify google map api get method
      const dt = response.data
      res.json(dt)
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
        next()
      }
    })
<<<<<<< HEAD
    .catch(err => {
      console.log('xxxxx', err)
=======
    .catch((err) => {
>>>>>>> modify google map api get method
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
    .then((response) => {
      const dt = response.data
      res.json(dt)
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
        next()
      }
    })
    .catch((err) => {
      handleError(err, res)
    })
}, insertIntoRedis)

router.get('/verify/board', (req, res) => {
  const url = `${apiHost}/api${req.url}`
  axios.get(url, { timeout: API_TIMEOUT })
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      handleError(err, res)
    })
})

router.get('/verify/board/:id', (req, res) => {
  const url = `${apiHost}/api${req.url}`
  axios.get(url, { timeout: API_TIMEOUT })
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      handleError(err, res)
    })
})

router.post('/boards', verifyToken, (req, res) => {
  const token = req.headers.authorization
  const body = mapKeys(req.body, (value, key) => snakeCase(key))
  const url = `${apiHost}/api${req.url}/`
  redisWriting(token, 'used', null, 48 * 60 * 60 * 1000)
  axios.post(url, body, { timeout: API_TIMEOUT })
  .then((response) => {
    res.json(response.data)
  })
  .catch((err) => {
    handleError(err, res)
  })
})

router.get('/boards/gongdebook', fetchFromRedis, (req, res, next) => {
  if (res.redis) {
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  const url = `${apiHost}/api${req.url}`
  axios.get(url, { timeout: API_TIMEOUT })
    .then((result) => {
      const dt = result.data
      res.json(dt)
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(dt)
        next()
      }
    })
    .catch((err) => {
      handleError(err, res)
    })
}, insertIntoRedis)

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
  .then((response) => {
    res.json(response.data)
  })
  .catch((err) => {
    handleError(err, res)
  })
})

module.exports = router
