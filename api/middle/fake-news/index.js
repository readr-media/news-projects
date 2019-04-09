const express = require('express')
const router = express.Router()

const { fetchFromRedis, redisWriting, } = require('../redisHandler')

router.get('/comment/:id', fetchFromRedis, (req, res) => {
  if (res.redis) {
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  return res.json({ amount: 0 })
})

router.put('/comment/:id', (req, res) => {
  redisWriting(req.url, JSON.stringify(req.body), null, 2 * 30 * 24 * 60 * 60)
  return res.json(req.body)
})

router.get('/vote/:id', fetchFromRedis, (req, res) => {
  if (res.redis) {
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  return res.json({ amount: 0 })
})

router.put('/vote/:id', (req, res) => {
  redisWriting(req.url, JSON.stringify(req.body), null, 2 * 30 * 24 * 60 * 60)
  return res.json(req.body)
})

module.exports = router
