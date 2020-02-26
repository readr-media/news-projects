const express = require('express')
const router = express.Router()
const axios = require('axios')
const bodyParser = require('body-parser')
const _ = require('lodash')

const { READR_SEARCH_HOST, READR_SEARCH_PORT } = require('../../config')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false, }))
// parse application/json
router.use(bodyParser.json())

router.get('/', async (req, res) => {
  const from = _.get(req.query, 'from', 0)
  const size = _.get(req.query, 'size', 10)
  const query = _.get(req.query, 'query', '')

  console.log(`[readr-search] from: ${from}, size: ${size}, query: ${query}`)

  const payload = {
    'from': from,
    'size': size,
    'query': {
      'bool': {
        'must': [
          {
            'multi_match': {
              'query': query,
              // 'type': 'phrase',
              'fields': [
                'title^2',
                'content',
                'tags.text^2'
              ]
            }
          },
          {
            'match': {
              'type': 8 // post type
            }
          }
        ]
      }
    },
    'sort': [
      '_score',
      {
        'updated_at': {
          'order': 'desc'
        }
      }
    ]
  }

  console.log(`[readr-search] READR_SEARCH_HOST: ${READR_SEARCH_HOST}`)
  console.log(`[readr-search] READR_SEARCH_PORT: ${READR_SEARCH_PORT}`)
  const result = await axios.post(
    `http://${READR_SEARCH_HOST}:${READR_SEARCH_PORT}/readr.posts/_doc/_search`,
    payload
  )
  res.send(result.data)
})

module.exports = router