const { SERVER_PROTOCOL, SERVER_HOST } = require('./config')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const superagent = require('superagent')

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

module.exports = router