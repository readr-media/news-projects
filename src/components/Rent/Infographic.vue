<template>
  <InfographicLayout class="infographic" :id="`id-${id}`">
    <div class="infographic__svg" :class="svgClass" @mouseover="mouseoverSvg"
      v-html="get(svgString, 'ENTIRE')"
      v-show="get(current_filters, 'POSITION') === 'ENTIRE' && !isNoRequired"></div>
    <div class="infographic__svg" :class="svgClass" @mouseover="mouseoverSvg"
      v-html="graphEmty"
      v-show="(get(current_filters, 'POSITION') === 'ENTIRE' || get(current_filters, 'POSITION') === '') && isNoRequired"></div>
    <template v-for="city in CITIES">
      <div class="infographic__svg" :class="svgClass" @mouseover="mouseoverSvg"
        v-html="get(svgString, city)"
        v-show="get(current_filters, 'POSITION') === city"></div>      
    </template>
    <div class="infographic__svg__default"
      v-show="(get(current_filters, 'POSITION') === 'ENTIRE' || get(current_filters, 'POSITION') === '') && isNoRequired"></div>
    <template v-for="p in PROGRAM">
      <InfographicGraph class="infographic__svg__static" v-if="get(p, 'graph')" :program="p"></InfographicGraph>
    </template>
    <div class="infographic__tip" v-show="tip"><span v-html="tip"></span></div>
    <div class="infographic__loading" v-show="isLoading"><Spinner show="true"></Spinner></div>    
  </InfographicLayout>
</template>
<script>
  // import * as D3 from 'src/components/Rent/d3.js'
  import InfographicLayout from 'src/components/Rent/InfographicLayout.vue'
  import InfographicGraph from 'src/components/Rent/InfographicGraph.vue'
  import Spinner from 'src/components/Spinner.vue'
  import axios from 'axios'
  import { CITIES, GEARS, TIPS, INFOGRAPH_AXIS, VIEW_SIZE, PROGRAM, } from 'src/components/Rent/constants'
  import { concat, each, filter, get, map, slice, uniqWith, } from 'lodash'
  const d3 = require('d3')
  const debug = require('debug')('CLIENT:Infographic')
  const fetchData = url => {
    return new Promise((resolve, reject) => {
      axios.get(url, {})
      .then(response => resolve(response.data))
      .catch(error => reject(error))
    })
  }
  // const fetchSvg = (url, size) => {
  //   return new Promise((resolve, reject) => {
  //     axios.get(url, { params: { size, }, })
  //     .then(response => resolve(response.data))
  //     .catch(error => reject(error))
  //   })    
  // }
  // const fetchBounds = store => store.dispatch('Rent/FETCH_BOUNDS', {})
  const fetchInfographic = (store, position, size) => store.dispatch('Rent/FETCH_INFOGRAPHIC', { position, size,})
  const fetchInfographicCalc = (store, params) => store.dispatch('Rent/FETCH_INFOGRAPHIC_CALC', { params, })
  const setupFilters = (store, filters) => store.dispatch('Rent/SETUP_FILTER', { filters, })

  export default {
    name: 'Infographic',
    components: {
      InfographicGraph,
      InfographicLayout,
      Spinner,
    },
    computed: {
      current_filters () {
        return get(this.$store, 'state.Rent.filters')
      },
      current_position () {
        this.isLoading = true
        return get(current_filters, 'POSITION')
      },
      scale () {
        const xScale = d3.scaleLinear()
        .domain([ get(get(this.$store, 'state.Rent.bounds'), `rent.min`, 0), get(get(this.$store, 'state.Rent.bounds'), `rent.max`, 0) ])
        .range([ 50, 665 - 20 ])
        // debug(get(get(this.$store, 'state.Rent.bounds'), `rent.min`, 0), get(get(this.$store, 'state.Rent.bounds'), `rent.max`, 0))
        // debug(get(get(this.$store, 'state.Rent.bounds'), `unit.min`, 0), get(get(this.$store, 'state.Rent.bounds'), `unit.max`, 0))
        const yScale = d3.scaleLinear()
        .domain([ get(get(this.$store, 'state.Rent.bounds'), `unit.min`, 0), get(get(this.$store, 'state.Rent.bounds'), `unit.max`, 0) ])
        .range([ 420 - 75, 0 ])

        return { xScale, yScale }
      },   
      svgString () {
        return get(this.$store, 'state.Rent.svgStrs', {})
      }, 
      svgClass () {
        debug(`filter(get(this.current_filters, 'OTHER'), 'is_cookable')`, filter(get(this.current_filters, 'OTHER'), o => o === 'is_cookable'))
        debug(`filter(get(this.current_filters, 'OTHER'), 'is_cookable')`, filter(get(this.current_filters, 'OTHER'), o => o === 'is_pettable'))
        return {
          // 'active': this.isSvgActive,
          // 'active': true,
          'no-required': this.isNoRequired,
          'ya-only': get(this.current_filters, 'TYPE') === 3,
          'share-tao-only': get(this.current_filters, 'TYPE') === 2,
          'tao-only': get(this.current_filters, 'TYPE') === 1,
          'household-only': get(this.current_filters, 'TYPE') === 0,
          'student-only': get(this.current_filters, 'ROLE') === 'student',
          'family-only': get(this.current_filters, 'ROLE') === 'family',
          'daily-worker-only': get(this.current_filters, 'ROLE') === 'daily_worker',
          'cookable-needed': filter(get(this.current_filters, 'OTHER'), o => o === 'is_cookable').length > 0,
          'pettable-needed': filter(get(this.current_filters, 'OTHER'), o => o === 'is_pettable').length > 0,
          'less-than-6600-only': get(this.current_filters, 'POGRAM_BUDGET') === 'less-than-6600',
          'female-only': get(this.current_filters, 'POGRAM_GENDER') === 'female',
          'top-minus-1-only': get(this.current_filters, 'POGRAM_FLOOR') === -1,
          'top-0-only': get(this.current_filters, 'POGRAM_FLOOR') === 0,
          'question': get(this.current_filters, 'POGRAM_NULL'),
        }
      }, 
      targetSourceRaw () {
        return uniqWith(get(this.$store, 'state.Rent.calc.raw', []), (a, o) => (a.rent === o.rent && a.unit === o.rent))
      },
    },
    data () {
      return {
        CITIES,
        PROGRAM,
        bounds: {},
        clientSvg: null,
        graphEmty: '',
        id: 0,
        infographicViewWidth: 800,
        infographicViewHeight: 600,        
        isSvgActive: false,
        isNoRequired: true,
        isLoading: false,
        // latstSrouceRaw: null,
        // originalData: [],
        raw: {},
        tip: '',
        xAxis: 'rent',
        yAxis: 'unit',
        xScale: () => {},
        yScale: () => {},
        // svgHtml: '',
      }
    },
    methods: {
      each,
      get,
      mouseoverSvg (event) {
        const target = event.target
        const isCircle = target.tagName === 'circle'
        if (isCircle) {
          const isExtraExpItems = [ 'electricity_fee', 'water_fee', 'gas_fee', 'internet_fee', 'tv_fee' ]
          const isExtraExp = filter(isExtraExpItems, item => target.getAttribute(item) === 'TRUE').length > 0
          const isThingsOfferedItems = [ 'is_offer_bed', 'is_offer_tv', 'is_offer_aircon', 'is_offer_sofa', 'is_offer_frige' ]
          const isThingsOffered = filter(isThingsOfferedItems, item => target.getAttribute(item) === 'T').length > 0

          this.tip = map(TIPS, (item, key) => {       
            switch (key) {
              case 'WATER':
              case 'POWER':
              case 'GAS':
              case 'INTERNET':
                return target.getAttribute(item) === 'TRUE' ? this.$t(`RENT.TIP.${key}`) + ' ' : ' '
              case 'WIRE':
                return target.getAttribute(item) === 'TRUE'
                  ? this.$t(`RENT.TIP.${key}`) + ' ' + (this.$t(`RENT.TIP.EXTRA_COUNT`) + isThingsOffered ? '，' : '')
                  : isExtraExp ? this.$t(`RENT.TIP.EXTRA_COUNT`) + (this.$t(`RENT.TIP.EXTRA_COUNT`) + isThingsOffered ? '，' : '') : ''
              case'BED':
                return isThingsOffered
                  ? target.getAttribute(item) === 'TRUE' ? this.$t(`RENT.TIP.OFFER`) + ' ' + this.$t(`RENT.TIP.${key}`) : this.$t(`RENT.TIP.OFFER`) + ' '
                  : ''
              case'TV':
              case'AIR_CONDITIONER':
              case'SOFA':
              case'FRIGE':
                return target.getAttribute(item) === 'T' ? this.$t(`RENT.TIP.${key}`) + ' ' : ''
              case 'UNIT':
              case 'FLOOR':
              case 'ROOMS':
                return `${target.getAttribute(item)} ${this.$t(`RENT.TIP.${key}`)} `
              case 'LIVING_ROOMS':
                return `${target.getAttribute(item)} ${this.$t(`RENT.TIP.${key}`)}，`
              case 'RENT':
                return `${this.$t(`RENT.TIP.${key}_PREFIX`)} ${target.getAttribute(item)} ${this.$t(`RENT.TIP.${key}_POSTFIX`)}，`
              case 'OBJ_TYPE':
                return this.$t(`RENT.TIP.OBJ_TYPE_${target.getAttribute(item)}`) + '，'
              default:
                return ''
            }
          }).join('')            
        } else {
          setTimeout(() => {
            this.tip = ''
          }, 3000)
        }        
    },
    },
    beforeMount () {
      // fetchBounds(this.$store)
    },
    mounted () {
      debug('Infographic mounted!')
      this.id = Math.round(Math.random() * 10000000000)
      const stamp = Date.now()
      // return
      // Promise.all([
      //   // fetchInfographicCalc(this.$store, this.current_filters),
      //   fetchInfographic(this.$store, get(this.current_filters, 'POSITION') || 'ENTIRE', 'L').then(html => {
      //     // this.svgHtml = html
      //     const svgDom = this.$el.querySelector('.infographic__svg > div')
      //     const svgDomVirtual = document.createElement('div')
      //     svgDomVirtual.onload = () => {
      //       debug('Loaded:', Date.now() - stamp, 'ms')
      //     }
      //     debug('Assign:', Date.now() - stamp, 'ms')
      //     svgDomVirtual.innerHTML = html
      //     svgDom ? this.$el.querySelector('.infographic__svg').replaceChild(svgDomVirtual, svgDom) : this.$el.querySelector('.infographic__svg').appendChild(svgDomVirtual)
      //     // this.isLoading = false
      //     debug('Rendering Done:', Date.now() - stamp, 'ms')
      //     // this.isSvgActive = false
      //     return
      //   }),
      // ])
      // .then(outcome => {
      // //   return Promise.all([
      // //     ...map(CITIES, city => fetchData(`http://localhost:8080/proj-assets/rent/${city}.json`))
      // //   ])
      // // })
      // // .then(raw_data => {
      // //   this.originalData = concat(raw_data)
      // //   debug('Raw data done.')
      // })
      // .catch(err => debug(err))
    },
    watch: {
      'current_filters.POSITION': function (n, o) {
        debug('Mutation detected: current_filters.POSITION', this.current_filters.POSITION)
        this.isLoading = true
        // const filters = {}
        // each(GEARS, (g, k) => { k!== 'POSITION' && (filters[ k ] = undefined) })
        // Promise.all([
        //   setupFilters(this.$store, filters),
        //   fetchInfographic(this.$store, get(this.current_filters, 'POSITION') || 'ENTIRE', 'L').then(html => {
        //     // this.svgHtml = html
        //     const svgDom = this.$el.querySelector('.infographic__svg > div')
        //     const svgDomVirtual = document.createElement('div')
        //     svgDomVirtual.innerHTML = html
        //     svgDom ? this.$el.querySelector('.infographic__svg').replaceChild(svgDomVirtual, svgDom) : this.$el.querySelector('.infographic__svg').appendChild(svgDomVirtual)
        //     this.isLoading = false
        //     return
        //   })
        // ])
        // .then(outcome => {
        // //   this.setupSvgBehavior()
        //   // const currentSourceCount = get(document.querySelectorAll(`#id-${this.id} svg g.chart circle`), 'length', 0)
        // })        
      },
      current_filters: function (n, o) {
        this.isSvgActive = filter(this.current_filters, f => f && f !== 'ENTIRE').length > 0
        this.isNoRequired = filter(this.current_filters, (f, k) => k !== 'POSITION' && ((f && f.length !== 0) || f === 0)).length === 0
        // this.isLoading = true
        fetchInfographicCalc(this.$store, this.current_filters).then(() => {
          this.isLoading = false
        })
      }, 
      '$store.state.Rent.svgStrs': {
        handler: function () {
          debug('Got EMPTY!')
          this.$forceUpdate()
        },
        deep: true
      },
      '$store.state.Rent.isLoaded': function () {
        debug('READY!')
        this.graphEmty = get(this.$store, 'state.Rent.svgStrs.EMPTY')
      }
    },
  }
</script>
