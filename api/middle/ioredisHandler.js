const Redis = require("ioredis")

const isProd = process.env.NODE_ENV === 'production'

const { 
  REDIS_AUTH,
  REDIS_CONNECTION_TIMEOUT,
  REDIS_READ_HOST,
  REDIS_READ_PORT,
  REDIS_WRITE_HOST,
  REDIS_WRITE_PORT,
  REDIS_TIMEOUT
} = require('../config')

const retryStrategy = (times) => {
  if (times > 200 * 3) {
    // End reconnecting after a specific timeout and flush all commands
    // with a individual error
    return new Error('Retry time exhausted')
  }
  return 100
}

const readClient = new Redis({
  port: REDIS_READ_PORT,
  host: REDIS_READ_HOST,
  password: REDIS_AUTH,
  retryStrategy
})

const writeClient = isProd ? new Redis({
  port: REDIS_WRITE_PORT,
  host: REDIS_WRITE_HOST,
  password: REDIS_AUTH,
  retryStrategy
}) : readClient

readClient.on('reconnecting', () => console.warn('[IOREDIS]Read client reconnecting...'))
writeClient.on('reconnecting', () => console.warn('[IOREDIS]Write client reconnecting...'))

readClient.on('error', err => console.error('[IOREDIS]Read client error', err))
writeClient.on('error', err => console.error('[IOREDIS]Write client error', err))

const promiseTimeout = (promise) => {
  const time = REDIS_CONNECTION_TIMEOUT || 200
  let timeout = new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      reject('Timed out in '+ time + 'ms.')
    }, time)
  })
  return Promise.race([
    promise,
    timeout
  ])
}

const redisFetching = (url, callback) => {
  let decodedUrl
  let redisPoolReadError
  console.log(`[IOREDIS]Fetching. url: ${url}`)
  try {
    decodedUrl = decodeURIComponent(url)
  } catch (error) {
    console.error('[IOREDIS]Decoding url in fail while fetching data to Redis. URIError: URI malformed.', url)
    decodedUrl = url
  }
  
  promiseTimeout(readClient.get(decodedUrl))
    .then(data => {
      if (data === null) {
        redisPoolReadError = 'Key does not exist.'
      }
      return data
    })
    .catch(error => redisPoolReadError = error)
    .then(data => callback && callback({ error: redisPoolReadError, data }))
}

const redisWriting = (url, data, callback, timeout) => {
  const redisTimeout = timeout || REDIS_TIMEOUT || 5000
  let decodedUrl
  try {
    decodedUrl = decodeURIComponent(url)
  } catch (error) {
    console.error('[IOREDIS]Decoding url in fail while writing data to Redis. URIError: URI malformed.\n', url)
    decodedUrl = url
  }

  promiseTimeout(writeClient.set(decodedUrl, data, 'EX', redisTimeout))
    .then(() => callback && callback())
    .catch(err => console.error(`[IOREDIS]Set redis in fail. ${decodedUrl} Error:`, err))
}

const insertIntoRedis = (req, res) => {
  redisWriting(req.url, res.dataString, null, res.redisTimeout)
}

const fetchFromRedis = (req, res, next) => {
  redisFetching(req.url, ({ error, data }) => {
    if (!error) {
      res.redis = data
      next()
    } else {
      console.log('[IOREDIS]Fetch data from Redis in fail with error.', error)
      next()
    }
  })
}

module.exports = {
  fetchFromRedis,
  insertIntoRedis,
  redisFetching,
  redisWriting,
}
