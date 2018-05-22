const express = require('express')
const router = express.Router()
const { google, } = require('googleapis')
const { authGoogleAPI, } = require('../service/google/auth')
const { isEmpty } = require('lodash')

router.get('/', authGoogleAPI, (req, res) => {
  const auth = req.auth
  const drive = google.drive({version: 'v3', auth})
  drive.files.get({
    fileId: req.query.file_id,
    fields: req.query.fields
  }, (err, {data}) => {
    if (err) res.status(500).send(`The Google Drive API returned an error while get: ${err}`)
    if (!isEmpty(data)) {
      res.status(200).json(data)
    } else {
      res.status(200).send('No properties found in Google Drive\'s get request.')
    }
  })
})

module.exports = router