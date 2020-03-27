const express = require('express')

const router = express.Router()
const cors = require('cors')

const config = require('../config')

const { google, } = require('googleapis')
const { authGoogleAPI, } = require('../service/google/auth')
const { fetchFromRedis, insertIntoRedis, } = require('./ioredisHandler')

router.use(cors({
  origin: /(localhost|mirrormedia)/,
  methods: 'GET,HEAD,PATCH,POST'
}))

router.use((req, res, next) => {
  if (!req.query.spreadsheet_id || !req.query.range) {
    return res.status(404).send('404 Not Found')
  }

  if (!config[`GOOGLE_SHEET_ALLOW_${req.method}`].IDS.includes(req.query.spreadsheet_id)) {
    console.warn(`[GOOGLE_SHEET] try to ${req.method} id: ${req.query.spreadsheet_id}`)
    return res.status(403).send('403 Forbidden')
  }

  if (!config[`GOOGLE_SHEET_ALLOW_${req.method}`][req.query.spreadsheet_id].includes(req.query.range)) {
    console.warn(`[GOOGLE_SHEET] try to ${req.method} id: ${req.query.spreadsheet_id} range: ${req.query.range}`)
    return res.status(403).send('403 Forbidden')
  }
  return next()
})

router.get('/', authGoogleAPI, fetchFromRedis, async (req, res, next) => {
  if (res.redis) {
    console.log('fetch data from Redis.', req.url)
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
      res.dataString = JSON.stringify(data)
      next()
    } else {
      res.status(200).send('No data found in Google Sheet.')
    }

  } catch (error) {
    res.status(500).send(`The Google Sheet API returned an error while get.`, error)
    console.error(`Fetch data from Google Sheet. url: ${req.url}`, error)
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
    console.error(`Fetch data from Google Sheet. url: ${req.url}`, error)
  }
  
})

module.exports = router