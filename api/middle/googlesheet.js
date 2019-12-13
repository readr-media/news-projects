const express = require('express')
const router = express.Router()
const { google, } = require('googleapis')
const { authGoogleAPI, } = require('../service/google/auth')
const { fetchFromRedis, insertIntoRedis, } = require('./ioredisHandler')

router.get('/', authGoogleAPI, fetchFromRedis, async (req, res, next) => {
  console.log('---------- req.query', req.query)
  if (res.redis) {
    console.error('fetch data from Redis.', req.url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  try {
    const auth = req.auth
    const sheets = google.sheets({version: 'v4', auth})

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: req.query.spreadsheet_id,
      range: req.query.range,
      majorDimension: req.query.majorDimension || 'ROWS'
    })
    const data = response.data.values
    if (data) {
      res.status(200).json(data)
      res.redisTimeout = req.query.redisTimeout || 7200
      console.log('------ redisTimeout', res.redisTimeout)
      res.dataString = JSON.stringify(data)
      next()
    } else {
      res.status(200).send('No data found in Google Sheet.')
    }

  } catch (error) {
    res.status(500).send(`The Google Sheet API returned an error while get.`, error)
    console.log(error)
  }
}, insertIntoRedis)

router.post('/', authGoogleAPI, (req, res) => {
  const auth = req.auth
  const sheets = google.sheets({version: 'v4', auth})
  sheets.spreadsheets.values.append({
    spreadsheetId: req.query.spreadsheet_id,
    range: req.query.range,
    valueInputOption: req.query.value_input_option,
    resource: req.body
  }, (err, {data}) => {
    if (err) res.status(500).send(`The Google Sheet API returned an error while append: ${err}`)
    const updates = data.updates
    if (updates) {
      res.status(200).send(updates)
    } else {
      res.status(200).send('No updates found in Google Sheet.')
    }
  })
})

router.get('/nonredis', authGoogleAPI, async (req, res) => {
  try {
    const auth = req.auth
    const sheets = google.sheets({version: 'v4', auth})
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: req.query.spreadsheet_id,
      range: req.query.range,
      majorDimension: req.query.majorDimension || 'ROWS'
    })
    if (response.data.values) {
      res.status(200).json(response.data.values)
    } else {
      res.status(200).send('No data found in Google Sheet.')
    }
  } catch (error) {
    res.status(500).send(`The Google Sheet API returned an error while get.`, error)
    console.log(error)
  }
  
})

module.exports = router