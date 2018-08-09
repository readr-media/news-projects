import axios from 'axios'
const debug = require('debug')('CLIENT:RentD3')
const d3 = require('d3')

export class RentD3 {
  constructor (infographicSelector) {
    this.init()
    debug('infographic', infographic)
  }
  init () {
    debug('Abt to init d3')
    debug('Abt to init d3')
    debug('Abt to init d3')
    debug('Abt to init d3')
    debug('Abt to init d3')
    axios.get('http://localhost:8080/proj-assets/rent/TAIPEI.json', {})
    .then(response => {
      debug('raw ata:', response.data.length)
      // const svg = d3.select(infographicSelector)
      // .append('svg')
      // .attr('width', this.svgWidth)
      // .attr('height', this.svgHeight)
    }).catch(error => debug(error))    
  }
}