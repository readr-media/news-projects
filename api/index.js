const { API_HOST, API_PORT, API_PROTOCOL, API_TIMEOUT, } = require('./config')
const { fetchFromRedis, insertIntoRedis, } = require('./middle/redisHandler')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')

const apiHost = API_PROTOCOL + '://' + API_HOST + ':' + API_PORT

const handleError = (err, res) => {
  if (err.response) {
    res.status(err.response.status).json({ error: err.response.data })
  } else if (err.request) {
    res.status(500).json({ error: err.request })
  } else {
    res.status(500).json({ error: err.message })
  }
}

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false, }))
// parse application/json
router.use(bodyParser.json())

router.use('/googlesheet', require('./middle/googlesheet'))
router.use('/googledrive', require('./middle/googledrive'))

router.get('/reports', (req, res, next) => {
  req.url = req.url.replace('/reports', '/report/list')
  next()
}, fetchFromRedis, (req, res, next) => {
  if (res.redis) {
    console.error('fetch data from Redis.', req.url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  axios.get(`${apiHost}${req.url}`, { timeout: API_TIMEOUT })
    .then((response) => {
      const dt = response.data
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
      }
      res.json(dt)
      next()
    })
    .catch((err) => {
      handleError(err, res)
    })
}, insertIntoRedis)

router.get('/report/count', fetchFromRedis, (req, res, next) => {
  const url = `/report/count`
  if (res.redis) {
    console.error('fetch data from Redis.', url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  axios.get(`${apiHost}${url}`, { timeout: API_TIMEOUT })
    .then((response) => {
      const dt = response.data
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
      }
      res.json(dt)
      next()
    })
    .catch((err) => {
      handleError(err, res)
    })
}, insertIntoRedis)

module.exports = router
