const { API_HOST, API_PORT, API_PROTOCOL, API_TIMEOUT, } = require('./config')
const { fetchFromRedis, insertIntoRedis, } = require('./middle/redisHandler')
const { initBucket, makeFilePublic, uploadFileToBucket } = require('./service/google/storage')
const { generateToken } = require('./service/jwt')
const express = require('express')
const fs = require('fs')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const moment = require('moment')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const apiHost = API_PROTOCOL + '://' + API_HOST + ':' + API_PORT
const debug = require('debug')('READR-PROJECT:api')

const maxMemUsageLimit = 1000 * 1024 * 1024
const formatMem = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(2) + ' Mb'
}

const handleError = (err, res) => {
  if (err.response) {
    res.status(err.response.status).json({ error: err.response.data })
  } else if (err.request) {
    res.status(500).json({ error: err.request })
  } else {
    res.status(500).json({ error: err.message })
  }
}

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false, }))
// parse application/json
router.use(bodyParser.json())

router.use('*', (req, res, next) => {
  res.on('finish', function () {
    const mem = process.memoryUsage()
    console.log('MEMORY STAT(heapUsed):', formatMem(mem.heapUsed))
    if (mem.heapUsed > maxMemUsageLimit) {
      for (let i = 0; i < 10; i += 1) {
        console.error('MEMORY WAS RUNNING OUT')
      } 
      console.error(`KILLING PROCESS IN 1 SECOND(At ${(new Date).toString()})`)
      // process.exit(1)
    }
    try {
      global.gc()
    } catch (e) {
      // process.exit(1)
    }
  })  
  next()
})

router.use('/election-board', require('./middle/election-board'))
router.use('/googlesheet', require('./middle/googlesheet'))
router.use('/googledrive', require('./middle/googledrive'))
router.use('/rent', require('./middle/rent'))

router.get('/data', fetchFromRedis, async (req, res, next) => {
  if (res.redis) {
    console.error('fetch data from Redis.', req.url)
    debug('fetch data from Redis.', req.url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  } else {
    try {
      const response = await axios.get(`https://www.readr.tw${req.query.url}`, { timeout: API_TIMEOUT })
      const dt = response.data
      res.json(dt)
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
        next()
      }
    } catch (error) {
      handleError(error, res)
    }
  }
}, insertIntoRedis)

router.get('/token', (req, res) => {
  const token = generateToken()
  res.json({ token: token })
})

router.get('/reports', (req, res, next) => {
  req.url = req.url.replace('/reports', '/report/list')
  next()
}, fetchFromRedis, (req, res, next) => {
  if (res.redis) {
    console.error('fetch data from Redis.', req.url)
    debug('fetch data from Redis.', req.url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  axios.get(`${apiHost}${req.url}`, { timeout: API_TIMEOUT })
    .then((response) => {
      const dt = response.data
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
      }
      res.json(dt)
      next()
    })
    .catch((err) => {
      handleError(err, res)
    })
}, insertIntoRedis)

router.get('/report/count', fetchFromRedis, (req, res, next) => {
  const url = `/report/count`
  if (res.redis) {
    console.error('fetch data from Redis.', url)
    const resData = JSON.parse(res.redis)
    return res.json(resData)
  }
  axios.get(`${apiHost}${url}`, { timeout: API_TIMEOUT })
    .then((response) => {
      const dt = response.data
      if (Object.keys(dt).length !== 0 && dt.constructor === Object) {
        res.dataString = JSON.stringify(response.data)
      }
      res.json(dt)
      next()
    })
    .catch((err) => {
      handleError(err, res)
    })
}, insertIntoRedis)

// auth issue
router.post('/upload/image', upload.single('image'), (req, res) => {
  const file = req.file
  const fileFormat = file.mimetype.split('/')[1].replace('jpeg', 'jpg')
  const fileName = `${moment().unix()}-${file.filename}.${fileFormat}`
  const path = file.path
  const folderName = req.headers['folder-name']
  
  if (!folderName) {
    res.status(400).send('folder name is missing.')
  } else {
    const bucket = initBucket()
    const destination = `${folderName}/uploads/images/${fileName}`
    uploadFileToBucket(bucket, path, {
      destination: destination,
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false
    }).then(bucketFile => {
      makeFilePublic(bucketFile)
      fs.unlink(path, (err) => {
        if (err) { console.error(`Error: delete ${path} fail`) }
      })
      console.info(`file ${fileName}(${path}) completed uploading to bucket `)
      res.status(200).send({ url: `/proj-assets/${destination}` })
    })
    .catch(err => {
      res.status(500).send(err)
      console.error(`error during fetch data from : ${url}`)
      console.error(err)
    })
  }
})

module.exports = router
