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

const debug = require('debug')('READR:api:middle:redisHandler')

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
  const timeoutHandler = new TimeoutHandler(callback)
  const onFinished = (error, data) => {
    timeoutHandler.isResponded = true
    timeoutHandler.destroy()
    if (timeoutHandler.timeout <= 0) { return }
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
  const timeoutHandler = new TimeoutHandler(callback)
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
          callback && callback()
        }
      })
    }
  })
}

const redisFetchCmd = (cmd, key, field, callback) => {
  const timeoutHandler = new TimeoutHandler(callback)
  const onFinished = (error, data) => {
    timeoutHandler.isResponded = true
    timeoutHandler.destroy()
    if (timeoutHandler.timeout <= 0) { return }
    callback && callback({ error, data, })
  }
  redisPoolRead.send_command(cmd, [ key, ...field, ], function (err, data) {
    onFinished(err, data)
  })
}
const redisWriteCmd = (cmd, key, value, callback) => {
  const timeoutHandler = new TimeoutHandler(callback)
  const onFinished = (error, data) => {
    timeoutHandler.isResponded = true
    timeoutHandler.destroy()
    if (timeoutHandler.timeout <= 0) { return }
    callback && callback({ error, data, })
  }
  redisPoolWrite.send_command(cmd, [ key, ...value, ], function (err, data) {
    onFinished(err, data)
  })
}

const insertIntoRedis = (req, res) => {
  console.log('-- insertIntoRedis')
  redisWriting(req.url, res.dataString, () => {
    // next()
  })
}
const fetchFromRedis = (req, res, next) => {
  console.log('-- fetchFromRedis')
  redisFetching(req.url, ({ error, data, }) => {
    if (!error) {
      res.redis = data
      next()
    } else {
      next(error)
    }
  })
}
const fetchFromRedisCmd = (req, res, next) => {
  const cmd = req.redis_get.cmd
  const key = req.redis_get.key
  const field = req.redis_get.field || []
  debug(`Goin to get(${cmd}) data from redis.`, key, field)
  redisFetchCmd(cmd, key, field, ({ error, data, }) => {
    if (!error) {
      res.redis = data
      next()
    } else {
      console.error(`Error occurred during fetching(${cmd}) data from redis.`)
      console.error(error)
      next(error)
    }
  })
}
const insertIntoRedisSadd = (req) => {
  const key = req.sadd.key
  const value = req.sadd.value
  debug('Abt to SADD data to redis.', key, value)
  redisWriteCmd('SADD', key, value, ({ error, }) => {
    if (!error) {
      // next()
    } else {
      // next(error)
    }    
  })
}

module.exports = {
  fetchFromRedis,
  fetchFromRedisCmd,
  insertIntoRedis,
  insertIntoRedisSadd,
  redisFetchCmd,
  redisFetching,
  redisWriting,
  redisWriteCmd,
}
