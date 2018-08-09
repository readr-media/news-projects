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
    <div class="infographic__tip" v-show="tip" v-if="isDesktop"><span v-html="tip"></span></div>
    <div class="infographic__loading" v-show="isLoading"><Spinner show="true"></Spinner></div>    
  </InfographicLayout>
</template>
<script>
  import InfographicLayout from 'src/components/Rent/InfographicLayout.vue'
  import InfographicGraph from 'src/components/Rent/InfographicGraph.vue'
  import Spinner from 'src/components/Spinner.vue'
  import axios from 'axios'
  import { CITIES, GEARS, TIPS, INFOGRAPH_AXIS, VIEW_SIZE, PROGRAM, } from 'src/components/Rent/constants'
  import { concat, each, filter, get, map, slice, uniqWith, } from 'lodash'
  const debug = require('debug')('CLIENT:Infographic')
  const fetchInfographic = (store, position, size) => store.dispatch('Rent/FETCH_INFOGRAPHIC', { position, size,})
  const fetchInfographicCalc = (store, params) => store.dispatch('Rent/FETCH_INFOGRAPHIC_CALC', { params, })

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
      isDesktop () {
        return get(this.$store, 'state.useragent.isDesktop')
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
        graphEmty: '',
        id: 0,
        isSvgActive: false,
        isNoRequired: true,
        isLoading: false,
        tip: '',
      }
    },
    methods: {
      each,
      get,
      mouseoverSvg (event) {
        const target = event.target
        const isCircle = target.tagName === 'circle'
        if (!isDesktop) { return }
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
    mounted () {
      debug('Infographic mounted!')
      this.id = Math.round(Math.random() * 10000000000)
      const stamp = Date.now()
    },
    watch: {
      'current_filters.POSITION': function (n, o) {
        debug('Mutation detected: current_filters.POSITION', this.current_filters.POSITION)
        this.isLoading = true
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
