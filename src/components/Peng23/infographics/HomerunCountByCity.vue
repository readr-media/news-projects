<template>
  <div class="infographic">
    <svg></svg>
    <div id="tooltip" class="hidden"><p><span id="name"></span></p></div>    
    <div class="infographic__label"><span v-html="$t('PENG23.LABEL.HOMERUN_COUNT_BY_CITY')"></span></div>
  </div>
</template>
<script>
  import * as topojson from 'topojson'
  import { STATIUMS_CITY_MAP } from '../constants'
  import { find, filter, get, groupBy, max, map as lmap, min, sortBy } from 'lodash'
  const debug = require('debug')('CLIENT:HomerunCountByCity')
  export default {
    name: 'HomerunCountByCity',
    data () {
      return {
        centroids: {},
        d3: {},
        features: {},        
      }
    },
    methods: {
      drawHotMap () {
        this.d3 = require('d3')
        const parent = this
        this.d3.json('/proj-assets/referendum/json/taiwan.json').then(map => {
          const projection = this.d3.geoMercator().center([ 120.5, 23.5, 5 ]).scale(7500).translate([ 150, 260 ])
          const path = this.d3.geoPath().projection(projection)

          parent.features = filter(topojson.feature(map, map.objects.County_WGS84).features, feature => {
            return get(feature, 'properties.C_Name') !== parent.$t('REFERENDUM.LIANJIANG')
              && get(feature, 'properties.C_Name') !== parent.$t('REFERENDUM.JINMEN')
          })

          const siteCounts = lmap(parent.groupedData, s => s.length)
          const maxCount = max(siteCounts) || 100
          const minCount = min(siteCounts) || 1
          const color = this.d3.scaleLinear().domain([ minCount, maxCount ]).range([ '#fff4d4', '#ffbe00' ])
          for(let i = parent.features.length - 1; i >= 0; i-- ) { 
            const site = parent.features[ i ].properties.C_Name
            const parameter = get(parent.groupedData, `${site}.length`, 0)
            parent.features[ i ].properties.parameter = parameter
          }        
          
          this.d3.select('svg').selectAll('path')
          .data(parent.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', d => color(d.properties.parameter))
          .attr('stroke', '#b3b3b3')
          .attr('class', 'area')
          .on('mouseover', function (d) {
            const center = parent.getCentroid(parent.d3.select(this))
            parent.d3.select('#tooltip')
            .style('left', center[0] + 'px')
            .style('top', center[1] + 'px')
            .select('#name')
            .html(() => {
              const stadiums = filter(STATIUMS_CITY_MAP, s => s.city === d.properties.C_Name)
              debug('stadiums', stadiums)
              return `${d.properties.C_Name}<br>${lmap(stadiums, s => s.name + ': ' + get(parent.groupedByStadium, `${s.name}.length`)).join('<br>')}`
            })
            parent.d3.select('#tooltip').classed('hidden', false)
          })
          .on('mouseout', function (d) {
            parent.d3.select('#tooltip').classed('hidden', true); 
          })
          .on('click', function (d) {
            parent.$emit('update:activeCity', parent.activeCity === d.properties.C_Name ? parent.$t('REFERENDUM.TAIWAN') : d.properties.C_Name)
          })
          .text(function (d) {
            return d.properties.C_Name
          })
        })        
      },
      getCentroid(selection) {
        const element = selection.node()
        const bbox = element.getBBox()
        return [ bbox.x + bbox.width / 2, bbox.y + bbox.height / 2 ]
      },       
    },
    mounted () {
      this.drawHotMap()
    },
    props: {
      groupedData: {},
      groupedByStadium: {},
    }
  }
</script>
<style lang="stylus" scoped>
.infographic
  position relative
  &__label
    text-align center
    margin-top 10px
svg
  position relative
  width 352px
  height 482px
  overflow visible
  >>> .area
    stroke #fcca30
    stroke-width "6"
    stroke-linecap "round"
    cursor pointer
    &.active
      fill #d3d3d3
      stroke #fff
      stroke-width "6"
      stroke-linecap "round"
  >>> rect
    &.hidden
      display none
  
#tooltip
  position absolute
  width auto
  height auto
  padding 10px
  background-color rgba(255,255,255,0.5)
  border-radius 5px
  pointer-events none
  &.hidden
    display none
  p
    margin 0
    font-family sans-serif
    font-size 16px
    line-height 20px
</style>