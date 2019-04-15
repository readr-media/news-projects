const express = require('express')
const router = express.Router()

const axios = require('axios')
const { MAILCHIMP_API_KEY, } = require('../../config')
const { fetchFromRedis, redisWriting, } = require('../redisHandler')

const handleError = (err, res) => {
  if (err.response) {
    res.status(err.response.status).json({ error: err.response.data })
  } else if (err.request) {
    res.status(500).json({ error: err.request })
  } else {
    res.status(500).json({ error: err.message })
  }
}

router.get('/comment/:id', fetchFromRedis, (req, res) => {
  if (res.redis) {
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  return res.json({ amount: 0 })
})

router.put('/commentAmount/:id', (req, res) => {
  const commentUrl = req.url.replace('commentAmount', 'comment')
  redisWriting(commentUrl, JSON.stringify(req.body), null, 2 * 30 * 24 * 60 * 60)
  return res.json(req.body)
})

router.get('/quiz/:id', fetchFromRedis, (req, res) => {
  if (res.redis) {
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  return res.json({ amount: 0 })
})

router.get('/quizTotal/:id', fetchFromRedis, (req, res) => {
  if (res.redis) {
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  return res.json({ amount: 0 })
})

router.put('/quizAnswerTrue/:id', (req, res) => {
  const quizUrl = req.url.replace('quizAnswerTrue', 'quiz')
  redisWriting(quizUrl, JSON.stringify(req.body), null, 2 * 30 * 24 * 60 * 60)
  return res.json(req.body)
})

router.put('/quizTotalAmount/:id', (req, res) => {
  const quizUrl = req.url.replace('quizTotalAmount', 'quizTotal')
  redisWriting(quizUrl, JSON.stringify(req.body), null, 2 * 30 * 24 * 60 * 60)
  return res.json(req.body)
})

router.post('/subscribe', (req, res) => {
  axios({
    method: 'post',
    url: 'https://us20.api.mailchimp.com/3.0/lists/95d9bf4ca7/members/',
    data: req.body,
    headers: { 'Content-Type': 'application/json' },
    auth: {
      username: 'readr',
      password: MAILCHIMP_API_KEY
    }
  })
  .then(response => {
    res.json(response.data)
  })
  .catch(err => {
    res.status(err.response.status).json({ error: err.response.data.title })
  })
})

module.exports = router
