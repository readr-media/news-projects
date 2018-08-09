const D3Node = require('d3-node')
const axios = require('axios')
const debug = require('debug')('READR-PROJECT:api:rent:common')
const { AXIS, DATA_LIMIT, VIEW_SIZE, RENT_LOCALE, } = require('./constants')
const { each, get, } = require('lodash')

const fetchCityData = url => {
  return new Promise((resolve, reject) => {
    axios.get(url, {})
    .then(response => resolve(response.data))
    .catch(error => reject(error))
  })
}

function getBounds (data, paddingFactor = 1) {
  // Find min and maxes (for the scales)
  const bounds = {}
  each(data, data => {
    each(data, (d, k) => {
      bounds[ k ] = bounds[ k ] || {}
      if(isNaN(d)) { return }
      const numricData = Number(d)
      if(bounds[ k ].min === undefined || numricData < bounds[ k ].min) { bounds[ k ].min = numricData }
      if(bounds[ k ].max === undefined || numricData > bounds[ k ].max) { bounds[ k ].max = numricData }            
    })
  })
  each(bounds, (b, k) => {
    b.max > DATA_LIMIT.MAX[ k.toUpperCase() ] && DATA_LIMIT.MAX[ k.toUpperCase() ]? b.max = DATA_LIMIT.MAX[ k.toUpperCase() ] : b.max = b.max
    b.max > 0 ? b.max *= paddingFactor : b.max /= paddingFactor
    b.min > 0 ? b.min /= paddingFactor : b.min *= paddingFactor
  })
  return bounds
}

function updateScales (d3, bounds = {}, size = 'S') {
  debug('bounds:', bounds[ AXIS.X ], bounds[ AXIS.Y ])

  const xScale = d3.scaleLinear()
  .domain([ get(bounds, `${AXIS.X}.min`, 0), get(bounds, `${AXIS.X}.max`, 0) ])
  .range([ 50, VIEW_SIZE[ size ].WIDTH - 20 ])

  const yScale = d3.scaleLinear()
  .domain([ get(bounds, `${AXIS.Y}.min`, 0), get(bounds, `${AXIS.Y}.max`, 0) ])
  .range([ VIEW_SIZE[ size ].HEIGHT - 75, 0 ])

  return { xScale, yScale, }
}

function renderChart (data, bounds, size) {
  return new Promise(resolve => {
    global.gc()
    let d3n = new D3Node()
    let d3 = d3n.d3
  
    const svg = d3n.createSVG(VIEW_SIZE[ size ].WIDTH, VIEW_SIZE[ size ].HEIGHT - 50)
    .attr('width', VIEW_SIZE[ size ].WIDTH)
    .attr('height', VIEW_SIZE[ size ].HEIGHT - 50)
  
    const chart = svg.append('g')
    .classed('chart', true)
    .attr('transform', 'translate(0, 0)')
  
    /**
     * setup axis wording
     */
    chart.append('text')
    .attr('id', 'xLabel')
    .attr('x', VIEW_SIZE[ size ].WIDTH - 40)
    .attr('y', VIEW_SIZE[ size ].HEIGHT - 80)
    .attr('text-anchor', 'middle')
    .text(get(RENT_LOCALE, AXIS.X.toUpperCase(), AXIS.X ))
  
    chart.append('text')
    .attr('id', 'yLabel')
    .attr('transform', `translate(65, 20) rotate(-90)`)
    .attr('text-anchor', 'middle')
    .text(get(RENT_LOCALE, AXIS.Y.toUpperCase(), AXIS.Y )) 
  
    let { xScale, yScale, } = updateScales(d3, bounds, size)
  
    const makeXAxis = s => {
      s.call(d3.axisBottom(xScale))
    }
    const makeYAxis = s => {
      s.call(d3.axisLeft(yScale))
    }
  
  
    /**
     * setup grid
     */
    debug('HEIGHT:', VIEW_SIZE[ size ].HEIGHT)
    const axisXGrid = d3.axisBottom(xScale)
    // .ticks(10)
    .tickFormat('')    
    .tickSize(0 - VIEW_SIZE[ size ].HEIGHT + 70)
  
    const axisYGrid = d3.axisLeft(yScale)
    // .ticks(10)
    .tickFormat('')
    .tickSize(0 -  VIEW_SIZE[ size ].WIDTH + 65)
  
    chart.append('g')
    .call(axisXGrid)
    .attr('fill', 'none')
    .attr('stroke', 'rgba(0,0,0,.1)')
    .attr('transform', `translate(0, ${VIEW_SIZE[ size ].HEIGHT - 70})`)
  
    chart.append('g')
    .call(axisYGrid)
    .attr('fill', 'none')
    .attr('stroke', 'rgba(0,0,0,.1)')
    .attr('transform','translate(45, 0)')
  
    /**
     * setup line
     */
  
    chart.append('g')
      .attr('id', 'xAxis')
      .attr('transform', `translate(0, ${VIEW_SIZE[ size ].HEIGHT - 70})`)
      .call(makeXAxis)
    chart.append('g')
      .attr('transform', `translate(45, 0)`)
      .attr('id', 'yAxis')
      .call(makeYAxis)
  
    /**
     * Render scatters
     */
    
    debug('Going to render', data.length, 'spots.')
    chart.selectAll('circle')
    .data(data)
    .enter()
    .append('circle') 
    .attr('cx', d => xScale(d[ AXIS.X ]))
    .attr('cy', d => yScale(d[ AXIS.Y ]))
    .attr('rent', d => d[ AXIS.X ])
    .attr('unit', d => d[ AXIS.Y ])
    .attr('floor', d => d[ 'floor' ])
    .attr('building_height', d => d[ 'building_height' ])
    .attr('floor_from_top', d => d[ 'floor_from_top' ])
    .attr('obj_type', d => d[ 'obj_type' ])
    .attr('rooms', d => d[ 'rooms' ])
    .attr('living_rooms', d => d[ 'living_rooms' ])
    .attr('electricity_fee', d => d[ 'electricity_fee' ])
    .attr('water_fee', d => d[ 'water_fee' ])
    .attr('gas_fee', d => d[ 'gas_fee' ])
    .attr('internet_fee', d => d[ 'internet_fee' ])
    .attr('tv_fee', d => d[ 'tv_fee' ])
    .attr('is_offer_bed', d => d[ 'is_offer_bed' ])
    .attr('is_offer_tv', d => d[ 'is_offer_tv' ])
    .attr('is_offer_aircon', d => d[ 'is_offer_aircon' ])
    .attr('is_offer_sofa', d => d[ 'is_offer_sofa' ])
    .attr('is_offer_frige', d => d[ 'is_offer_frige' ])
    .attr('r', 1)
    .attr('class', d => {
      let spot_class = 'spot'
      if (d[ 'is_cookable' ] === 'TRUE') { spot_class += ' cookable' }
      if (d[ 'is_pettable' ] === 'TRUE') { spot_class += ' pettable' }
      if (d[ 'is_limit_family' ] === 'TRUE') { spot_class += ' family' }
      if (d[ 'is_limit_daily_woker' ] === 'TRUE') { spot_class += ' daily-worker' }
      if (d[ 'is_limit_student' ] === 'TRUE') { spot_class += ' student' }
      if (Number(d[ 'rent' ]) < '6600') { spot_class += ' less-than-6600' }
      if (d[ 'is_limit_gender' ] === 'TRUE' && d[ 'limit_gender' ] === '1') { spot_class += ' female-limit' }
      if (d[ 'floor_from_top' ] === '-1') { spot_class += ' from-top-minus-1' }
      else if (d[ 'floor_from_top' ] === '0') { spot_class += ' from-top-0' }
      spot_class += ` obj-type-${d[ 'obj_type' ]}`
      return spot_class
    })    

    const svgString = d3n.svgString()
  
    /**
     *  release memory
     */ 
    bounds = null
    d3n = null
    d3 = null
    xScale = null
    yScale = null
    global.gc()
    debug('Release memory.')
    resolve(svgString)
  })
}

module.exports = {
  fetchCityData,
  getBounds,
  renderChart,
  updateScales,
}