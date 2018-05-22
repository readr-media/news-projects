const express = require('express')
const router = express.Router()
const { google, } = require('googleapis')
const { authGoogleAPI, } = require('../service/google/auth')

router.get('/', authGoogleAPI, (req, res) => {
  const auth = req.auth
  const sheets = google.sheets({version: 'v4', auth})
  sheets.spreadsheets.values.get({
    spreadsheetId: req.query.spreadsheet_id,
    range: req.query.range,
  }, (err, {data}) => {
    if (err) res.status(500).send(`The Google Sheet API returned an error while get: ${err}`)
    const rows = data.values
    if (rows.length) {
      res.status(200).json(rows)
    } else {
      res.status(200).send('No data found in Google Sheet.')
    }
  })
})

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

module.exports = router