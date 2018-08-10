const isProd = process.env.NODE_ENV === 'production'
// const isTest = process.env.NODE_ENV === 'test'
const RedisConnectionPool = require('redis-connection-pool')

const { 
  REDIS_AUTH,
  REDIS_CONNECTION_TIMEOUT,
  REDIS_MAX_CLIENT,
  REDIS_READ_HOST,
  REDIS_READ_PORT,
  REDIS_WRITE_HOST,
  REDIS_WRITE_PORT,
  REDIS_TIMEOUT, } = require('../config')

const debug = require('debug')('READR-PROJECT:api:middle:redisHandler')

const redisPoolRead = RedisConnectionPool('myRedisPoolRead', {
  host: REDIS_READ_HOST,
  port: REDIS_READ_PORT,
  max_clients: REDIS_MAX_CLIENT ? REDIS_MAX_CLIENT : 50,
  perform_checks: false,
  database: 0,
  options: {
    auth_pass: REDIS_AUTH,
  },
})

const redisPoolWrite = isProd ? RedisConnectionPool('myRedisPoolWrite', {
  host: REDIS_WRITE_HOST,
  port: REDIS_WRITE_PORT,
  max_clients: REDIS_MAX_CLIENT ? REDIS_MAX_CLIENT : 50,
  perform_checks: false,
  database: 0,
  options: {
    auth_pass: REDIS_AUTH,
  },
}) : redisPoolRead

class TimeoutHandler {
  constructor (callback) {
    this.isResponded = false
    this.timeout = REDIS_CONNECTION_TIMEOUT || 2000

    this.destroy = this.destroy.bind(this)
    this.init = this.init.bind(this)
    this.init(callback)
  }
  init (callback) {
    this.timeoutHandler = setInterval(() => {
      this.timeout -= 1000
      debug('Redis counting down...', this.timeout)
      if (this.isResponded) {
        this.destroy()
        debug('this.timeoutHandler destroying...')
        return
      }
      if (this.timeout <= 0) {
        this.destroy()
        debug('ERROR: Timeout occured while connecting to redis.')
        callback && callback({ error: 'ERROR: Timeout occured while connecting to redis.', data: null, })
      }
    }, 1000)
  }
  destroy () {
    debug('TimeoutHandler is about to destroy...')
    clearInterval(this.timeoutHandler)
  }
}

const redisFetching = (key, callback) => {
  debug('Fetching data from redis.')
  debug(decodeURIComponent(key))
  let timeoutHandler = new TimeoutHandler(callback)
  
  const onFinished = (error, data) => {
    timeoutHandler.isResponded = true
    timeoutHandler.destroy()
    if (timeoutHandler.timeout <= 0) {
      timeoutHandler = null
      return
    }
    timeoutHandler = null
    callback && callback({ error, data, })
  }
  redisPoolRead.get(decodeURIComponent(key), (error, data) => {
    if (!error) {
      redisPoolRead.ttl(decodeURIComponent(key), (err, dt) => {
        if (!err && dt) {
          debug('Ttl:', dt)
          if (dt === -1) {
            redisPoolWrite.del(decodeURIComponent(key), (e) => {
              if (e) {
                console.error('REDIS: deleting key ', decodeURIComponent(key), 'from redis in fail ', e)
              }
              console.error('REDIS: deleting key ', decodeURIComponent(key), 'from redis in fail ', e)
              onFinished(e, data)
            })
          } else {
            onFinished(err, data)
          }
        } else {
          console.error('REDIS: fetching ttl in fail ', err)
          onFinished(err, data)
        }
      })
    } else {
      console.error('REDIS: fetching key/data in fail ', error)
      onFinished(error, data)
    }
  })
}
const redisWriting = (key, data, callback, timeout) => {
  debug('Setting key/data to redis. Timeout:', timeout || REDIS_TIMEOUT)
  debug(decodeURIComponent(key))
  let timeoutHandler = new TimeoutHandler(callback)
  redisPoolWrite.set(decodeURIComponent(key), data, (err) => {
    if(err) {
      console.error('redis writing in fail. ', decodeURIComponent(key), err)
    } else {
      redisPoolWrite.expire(decodeURIComponent(key), timeout || REDIS_TIMEOUT, function(error) {
        if(error) {
          console.error('failed to set redis expire time. ', decodeURIComponent(key), err)
        } else {
          debug('Wrote redis successfully.')
          timeoutHandler.isResponded = true
          timeoutHandler.destroy()
          timeoutHandler = null
          callback && callback()
        }
      })
    }
  })
}

const insertIntoRedis = (req, res) => {
  redisWriting(req.url, res.dataString, () => {
    // next()
  })
}
const fetchFromRedis = (req, res, next) => {
  debug('req.url', req.url)
  debug('req.url', req.url)
  debug('req.url', req.url)
  debug('req.url', req.url)
  redisFetching(req.url, ({ error, data, }) => {
    if (!error) {
      res.redis = data
      next()
    } else {
      next(error)
    }
  })
}

module.exports = {
  fetchFromRedis,
  insertIntoRedis,
  redisFetching,
  redisWriting,
}
