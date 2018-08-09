const D3Node = require('d3-node')
const debug = require('debug')('READR-PROJECT:api:rent')
const express = require('express')
const router = express.Router()
// const axios = require('axios')
const { CITIES, VIEW_SIZE, AXIS, RENT_LOCALE, } = require('./constants')
const { concat, filter, find, findIndex, each, get, map, slice, uniqWith, } = require('lodash')
const { fetchCityData, getBounds, updateScales, renderChart, } = require('./common')
const { fetchFromRedis, insertIntoRedis, redisWriting, redisFetching, } = require('../redisHandler')
const { RENT_PREPARE_AUTH, SERVER_HOST, SERVER_PROTOCOL } = require('../../config')


router.get('/infographic/bounds', fetchFromRedis, (req, res) => {
  if (res.redis) {
    return res.json(JSON.parse(res.redis))
  } else {
    res.status(503).send('Data is not ready yet.')
  }
})


router.get('/infographic/calc', fetchFromRedis, (req, res, next) => {
  if (res.redis) {
    return res.json(JSON.parse(res.redis))
  } else {
    debug(req.query)
    let raw_grouped = []
    // let raw_grouped_keys = []    
    const rangeFilter = (data, key, field, padding = 1) => {
      const btm = get(req, `query.${key}.0`, 0)
      const top = get(req, `query.${key}.1`)
      const new_data = filter(data, obj => {
        if (top) {
          return Number(obj[ field ]) >= btm * padding && Number(obj[ field ]) <= top * padding
        } else {
          return Number(obj[ field ]) >= btm * padding
        }
      })
      return new_data
    }
    const calc = () => {
      // const params = {
      //   city: get(req, 'body.POSITION'),
      //   budget: get(req, 'body.BUDGET'),
      //   size: get(req, 'body.SIZE'),
      //   type: get(req, 'body.TYPE'),
      //   role: get(req, 'body.ROLE'),
      //   other: get(req, 'body.OTHER'),
      // }
      let data = []

      // if (req.query.POSITION && req.query.POSITION !== 'ENTIRE') {
      //   const index = findIndex(raw_grouped_keys, city => city === req.query.POSITION)
      //   data = get(raw_grouped, index, [])
      //   debug(req.query.POSITION, 'calc only')
      // } else {
        data = concat(...map(raw_grouped, d => d))
      // }
      if (req.query.BUDGET) { data = rangeFilter(data, 'BUDGET', 'rent', 1000) }
      if (req.query.SIZE) { data = rangeFilter(data, 'SIZE', 'unit') }
      if (req.query.TYPE) { data = filter(data, { obj_type: req.query.TYPE, }) }
      if (req.query.ROLE) {
        switch (req.query.ROLE) {
          case 'student':
            data = filter(data, { is_limit_student: 'TRUE', })
            break
          case 'daily_worker':
            data = filter(data, { is_limit_daily_woker: 'TRUE', })
            break
          case 'family':
            data = filter(data, { is_limit_family: 'TRUE', })
            break
        }
      }
      if (req.query.OTHER) {
        const isPettable = find(req.query.OTHER, o => o === 'is_pettable') ? true : false
        const isCookable = find(req.query.OTHER, o => o === 'is_cookable') ? true : false
        const params = {}
        isPettable ? params.is_pettable = 'TRUE' : null
        isCookable ? params.is_cookable = 'TRUE' : null
        data = filter(data, params)
      }
      debug('data.length', data.length)
      // const uniqData = data.length > 30000 ? [] : uniqWith(data, (a, o) => (a.rent === o.rent && a.unit === o.unit))
      res.json({
        source_count: data.length,
        // raw: uniqData,
      })
      res.dataString = JSON.stringify({
        source_count: data.length,
        // raw: uniqData,
      })
      next()
    }

    // let source = 'rent.raw_grouped'
    // if (req.query.POSITION && req.query.POSITION !== 'ENTIRE') { source = `${source}.${req.query.POSITION}` }
    // debug('source:', source)

    // if (raw_grouped.length === 0 || raw_grouped_keys.length === 0) {
    //   redisFetching(source, ({ error, data, }) => {
    //     if (!error) {
    //       raw_grouped = JSON.parse(data)
    //       // redisFetching('rent.raw_grouped_keys', ({ error: err, data: dt, }) => {
    //       //   if (!err) {
    //       //     raw_grouped_keys = JSON.parse(dt)
    //           calc()
    //       //   } else {
    //       //     debug(err)   
    //       //     res.status(503).send('Data is not ready yet.')
    //       //   }
    //       // })
    //     } else {
    //       debug(error)
    //       res.status(503).send('Data is not ready yet.')
    //     }
    //   })
    // } else {
    //   calc()
    // }

    const dataFetching = () => (req.query.POSITION && req.query.POSITION !== 'ENTIRE'
    ? fetchCityData(`${SERVER_PROTOCOL}://${SERVER_HOST}/proj-assets/rent/${req.query.POSITION}.json`).then(raw => ([ raw ]))
    : Promise.all([
      ...map(CITIES, city => fetchCityData(`${SERVER_PROTOCOL}://${SERVER_HOST}/proj-assets/rent/${city}.json`))
    ]))
    dataFetching().then(raw_data => {
      raw_grouped = raw_data
      calc()
    }).catch(err => {
      debug(err)  
      res.status(503).send('Data is not ready yet.') 
    })
  }  
}, insertIntoRedis)

router.get('/infographic/:target', fetchFromRedis, (req, res) => {
  const target = get(req, 'params.target')
  debug('target:', target)
  if (res.redis) { return res.send(res.redis) }
  else { return res.status(503).send('Data is not ready yet.') }
})

/**
 * Accept req to prepare rent 2.0 data.
 */

const comparisoner = (a, o) => {
  /**
   * is_limit_student
   * is_limit_daily_woker
   * is_limit_family
   * is_limit_gender
   * is_cookable
   * is_pettable
   */
  // const score_ref_1 = [ 'is_limit_student', 'is_limit_daily_woker', 'is_limit_family', 'is_limit_gender', ]
  // const score_ref_2 = [ 'is_cookable', 'is_pettable', ]
  // let score = [ 0, 0, ]
  // each(score_ref_1, ref => {
  //   score[ 0 ] += get(a, 'ref') === 'TRUE' ? 1 : 0
  //   score[ 1 ] += get(o, 'ref') === 'TRUE' ? 1 : 0
  // })
  // each(score_ref_2, ref => {
  //   score[ 0 ] += get(a, 'ref') === 'FALSE' ? 1 : 0
  //   score[ 1 ] += get(o, 'ref') === 'FALSE' ? 1 : 0
  // })

  // const isEqual = a.rent === o.rent && a.unit === o.unit
  // // isEqual && score[ 1 ] > score[ 0 ] ? a = o : null
  // if (isEqual && score[ 1 ] > score[ 0 ]) { a = o }
  // return isEqual
  // return a.rent === o.rent && a.unit === o.unit 
  return a.rent === o.rent && a.unit === o.unit
  && a.is_limit_student === o.is_limit_student
  && a.is_limit_daily_woker === o.is_limit_daily_woker
  && a.is_limit_family === o.is_limit_family
  && a.is_cookable === o.is_cookable 
  && a.is_pettable === o.is_pettable 
}

const maxMemUsageLimit = 1000 * 1024 * 1024
const formatMem = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(2) + ' Mb'
}      
const checkMem = () => {
  const mem = process.memoryUsage()
  debug('MEMORY STAT(heapUsed):', formatMem(mem.heapUsed))
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
    debug(e)
    // process.exit(1)
  }
}


router.post('/infographic/prepare/EMPTY', (req, res) => {
  const pass_auth = get(req, 'body.pass_auth')
  const size = get(req, 'body.size')
  debug('Got a call preparing EMPTY')
  if (pass_auth && pass_auth === RENT_PREPARE_AUTH) {
    res.send('Going to prepare it in several minutes.')
    redisFetching('/infographic/bounds', ({ error: e, data: dt, }) => {
      if (!e) {
        const _b = JSON.parse(dt)
        renderChart([], _b, size)
        .then(d3String => redisWriting(`/infographic/EMPTY?size=${size}`, d3String, () => {
          checkMem()
          debug('svg rendering completely!')
        }, 3 * 365 * 24 * 60 * 60))
      } else {
        debug(e)   
      }
    })    
  } else {
    res.status(403).send('Forbidden.')
  }
})

router.post('/infographic/prepare/:city', (req, res) => {
  const pass_auth = get(req, 'body.pass_auth')
  const city = get(req, 'params.city')
  const size = get(req, 'body.size')
  debug('Got a call preparing city', city)
  if (pass_auth && pass_auth === RENT_PREPARE_AUTH && city) {
    res.send('Going to prepare it in several minutes.')

    const prepare_start_timestamp = Date.now()
    fetchCityData(`${SERVER_PROTOCOL}://${SERVER_HOST}/proj-assets/rent/${city}.json`)
    .then(raw => {
      redisFetching('/infographic/bounds', ({ error: e, data: dt, }) => {
        if (!e) {
          const _b = JSON.parse(dt)
          const data = uniqWith(raw, comparisoner)
          debug('Uniq data completely.', data.length, `${Date.now() - prepare_start_timestamp}ms`)
          checkMem()
    
          renderChart(data, _b, size)
          .then(d3String => redisWriting(`/infographic/${city}?size=${size}`, d3String, () => {
            checkMem()
            debug('svg rendering completely!')
          }, 3 * 365 * 24 * 60 * 60))
        } else {
          debug(e)   
        }
      })
    })
    .catch(err => debug(err))
  } else {
    res.status(403).send('Forbidden.')
  }
})


router.post('/infographic/prepare', (req, res) => {
  debug('Got a call to prepare infographic')
  const pass_auth = get(req, 'body.pass_auth')
  const size = get(req, 'body.size')
  if (pass_auth && pass_auth === RENT_PREPARE_AUTH) {
    res.send('Going to prepare it in several minutes.')
    const prepare_start_timestamp = Date.now()
    debug('Start to fetch data.')
    Promise.all([
      ...map(CITIES, city => fetchCityData(`${SERVER_PROTOCOL}://${SERVER_HOST}/proj-assets/rent/${city}.json`))
    ]).then(raw_data => {
      debug('Fetching data completely.', `${Date.now() - prepare_start_timestamp}ms`)
      let bounds = {}
      let raw_grouped = []
      let raw_grouped_keys = []
      raw_grouped = raw_data
      raw_grouped_keys = map(CITIES, city => city)
      // redisWriting('rent.raw_grouped', JSON.stringify(raw_grouped), () => {}, 1)
      // redisWriting('rent.raw_grouped.ENTIRE', JSON.stringify(raw_grouped), () => {}, 3 * 365 * 24 * 60 * 60)
      // checkMem()

      // each(raw_grouped_keys, (city, index) => redisWriting(`rent.raw_grouped.${city}`, JSON.stringify([ raw_grouped[ index ] ]), () => {}, 3 * 365 * 24 * 60 * 60))
      redisWriting('rent.raw_grouped_keys', JSON.stringify(raw_grouped_keys), () => {}, 3 * 365 * 24 * 60 * 60)
      checkMem()
      
      const data_concated = concat(...map(raw_grouped, d => d))
      debug(`Count: ${data_concated.length}`, `${Date.now() - prepare_start_timestamp}ms`)
      redisWriting('/infographic/count', JSON.stringify({ count: data_concated.length, }), () => {}, 3 * 365 * 24 * 60 * 60)
      checkMem()

      debug('Start to uniq data.', `${Date.now() - prepare_start_timestamp}ms`)
      const data = uniqWith(data_concated, comparisoner)
      // const data = data_concated
      debug('Uniq data completely.', data.length, `${Date.now() - prepare_start_timestamp}ms`)
      checkMem()

      bounds = getBounds(data)
      debug('Bounds calc completely!', `${Date.now() - prepare_start_timestamp}ms`)
      redisWriting('/infographic/bounds', JSON.stringify(bounds), () => {}, 3 * 365 * 24 * 60 * 60)
      checkMem()

      setTimeout(() => {
        renderChart(data, bounds, size).then(d3SvgString => {
          setTimeout(() => {
            debug('Going to save to redis')
            redisWriting(`/infographic/ENTIRE?size=${size}`, d3SvgString, () => {}, 3 * 365 * 24 * 60 * 60)
            checkMem()
          }, 1 * 1000)          
        })
      }, 1 * 1000)

      // return renderChart(data, bounds, 'L')
    // }).then(d3SvgString => {
    //   debug('svg rendering completely!', `${Date.now() - prepare_start_timestamp}ms`)
    //   setTimeout(() => {
    //     debug('Going to save to redis')
    //     redisWriting('/infographic/ENTIRE?size=L', d3SvgString, () => {}, 3 * 365 * 24 * 60 * 60)
    //     checkMem()
    //   }, 120 * 1000)

      // const raw_grouped_uniq = map(raw_grouped, raw => uniqWith(raw, comparisoner))

    //   return Promise.all([
    //     ...map(raw_grouped_keys, (city, index) => renderChart(raw_grouped_uniq[ index ], bounds, 'L').then(d3String => redisWriting(`/infographic/${city}?size=L`,d3String, () => { debug('svg rendering completely!') }, 3 * 365 * 24 * 60 * 60)))
    //   ])
    // }).then(svgs => {
    //   checkMem()
    //   // each(raw_grouped_keys, (city, index) => redisWriting(`/infographic/${city}?size=L`, svgs[ index ], () => { debug('svg rendering completely!') }, 3 * 365 * 24 * 60 * 60))
    //   // redisWriting(`/infographic/TAIPEI?size=L`, svgs[ 0 ], () => { debug('svg rendering completely!') }, 3 * 365 * 24 * 60 * 60)
    //   debug('all city d3 rendering completed.', `${Date.now() - prepare_start_timestamp}ms`)
    }).catch(err => debug(err))
  } else {
    res.status(403).send('Forbidden.')
  }
})

// const cluster = require('cluster')
// if ((cluster.worker && cluster.worker.id === 1) || process.env.NODE_ENV !== 'production') {
// }



module.exports = router