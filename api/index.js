const { API_DEADLINE, API_HOST, API_PORT, API_PROTOCOL, API_TIMEOUT, } = require('./config')
const { SERVER_PROTOCOL, SERVER_HOST } = require('./config')
const { fetchFromRedis, insertIntoRedis, } = require('./middle/redisHandler')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const superagent = require('superagent')

const apiHost = API_PROTOCOL + '://' + API_HOST + ':' + API_PORT

const fetchStaticJson = (req, res, next, jsonFileName) => {
  const url = `${SERVER_PROTOCOL}://${SERVER_HOST}/json/${jsonFileName}.json`
  superagent
  .get(url)
  .end((err, response) => {
    if (!err && response) {
      res.json(JSON.parse(response.text))
    } else {
      res.send('{\'error\':' + err + '}')
      console.error(`error during fetch data from ${jsonFileName} : ${url}`)
      console.error(err)
    }
  })
}

router.all('/', function(req, res, next) {
  next()
})

router.use('/grouped', function(req, res, next) {
  console.log('got req')
  fetchStaticJson(req, res, next, 'grouped')
})

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false, }))
// parse application/json
router.use(bodyParser.json())

router.use('/googlesheet', require('./middle/googlesheet'))
router.use('/googledrive', require('./middle/googledrive'))

router.get('/reports', fetchFromRedis, (req, res, next) => {
  req.url = req.url.replace('/reports', '/report/list')
  if (res.redis) {
    console.error('fetch data from Redis.', req.url)
    const resData = JSON.parse(res.redis)
    res.json(resData)
  } else {
    superagent
    .get(`${apiHost}${req.url}`)
    .timeout(
      {
        response: API_TIMEOUT, // Wait 5 seconds for the server to start sending,
        deadline: API_DEADLINE || 60000 // but allow 1 minute for the file to finish loading.
      }
    )
    .end((err, response) => {
      if (!err && response) {
        const dt = JSON.parse(response.text)
        if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
          res.dataString = response.text
        }
        res.json(dt)
        next()
      } else {
        res.send('{\'error\':' + err + '}')
        console.error(err)
      }
    })
  }
}, insertIntoRedis)

router.get('/report/count', fetchFromRedis, (req, res, next) => {
  const url = `/report/count`
  if (res.redis) {
    console.error('fetch data from Redis.', url)
    const resData = JSON.parse(res.redis)
    res.json(resData)
  } else {
    superagent
    .get(`${apiHost}${url}`)
    .timeout(
      {
        response: API_TIMEOUT, // Wait 5 seconds for the server to start sending,
        deadline: API_DEADLINE || 60000 // but allow 1 minute for the file to finish loading.
      }
    )
    .end((err, response) => {
      if (!err && response) {
        const dt = JSON.parse(response.text)
        if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
          res.dataString = response.text
        }
        res.json(dt)
        next()
      } else {
        res.send('{\'error\':' + err + '}')
        console.error(err)
      }
    })
  }
}, insertIntoRedis)

module.exports = router
