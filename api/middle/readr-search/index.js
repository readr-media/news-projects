const express = require('express')
const router = express.Router()
const axios = require('axios')
const bodyParser = require('body-parser')

const { READR_SEARCH_HOST, READR_SEARCH_PORT } = require('../../config')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false, }))
// parse application/json
router.use(bodyParser.json())

router.post('/', async (req, res) => {
  const payload = req.body
  const result = await axios.post(
    `http://${READR_SEARCH_HOST}:${READR_SEARCH_PORT}/readr.posts/_doc/_search`,
    payload
  )
  res.send(result.data)
})

module.exports = router