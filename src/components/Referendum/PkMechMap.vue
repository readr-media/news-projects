<template>
  <div class="map">
    <div class="map__wrapper">
      <svg></svg>
      <div id="tooltip" class="hidden"><p><span id="name"></span></p></div>      
    </div>
    <div class="map__island lianjiang"
      :class="{ active: activeCity === $t('REFERENDUM.LIANJIANG') }" @click="chooseCity($t('REFERENDUM.LIANJIANG'))">
      <div class="island"><img src="/proj-assets/referendum/icons/lianjiang.png"></div>
      <div class="vs">
        <div class="base" :style="islandBarHeight($t('REFERENDUM.LIANJIANG'), 'base')"></div>
        <div class="comparison" :style="islandBarHeight($t('REFERENDUM.LIANJIANG'), 'comparison')"></div>
      </div>
    </div>
    <div class="map__island jinmen"
      :class="{ active: activeCity === $t('REFERENDUM.JINMEN') }" @click="chooseCity($t('REFERENDUM.JINMEN'))">
      <div class="island"><img src="/proj-assets/referendum/icons/jinmen.png"></div>
      <div class="vs">
        <div class="base" :style="islandBarHeight($t('REFERENDUM.JINMEN'), 'base')"></div>
        <div class="comparison" :style="islandBarHeight($t('REFERENDUM.JINMEN'), 'comparison')"></div>
      </div>      
    </div>
  </div>
</template>
<script>
  import * as topojson from 'topojson'
  import { filter, get, map as _map } from 'lodash'
  const debug = require('debug')('CLIENT:PkMechMap')
  export default {
    name: 'PkMechMap',
    methods: {
      getCentroid(selection) {
        const element = selection.node()
        const bbox = element.getBBox()
        return [ bbox.x + bbox.width / 2, bbox.y + 100 + bbox.height / 2 ]
      },
      chooseCity (city) {
        this.$emit('update:activeCity', this.activeCity === city ? this.$t('REFERENDUM.TAIWAN') : city)
      }, 
      islandBarHeight (city, type) {
        const backgroundColor = this.activeCity === city
          ? type === 'base' ? '#bd8648' : '#006e78'
          : '#a0a0a0'
        return this.activeAll || this.activeCity === city
          ? { height: `${this.pkData[ city ][ type ]}px`, backgroundColor }
          : {}
      },  
      updateMap () {
        const parent = this

        this.d3.select('svg').selectAll('path.area')
        .data(this.features)
        .transition()
        .duration(300)
        .attr('fill', function (d) { 
          if (parent.activeCity === d.properties.C_Name) {
            parent.d3.select('.area.active').classed('active', false) 
            parent.d3.select(this).classed('active', true)
          } else {
            parent.d3.select(this).classed('active', false)
          }
          return '#e3e3e3'
        })

        this.d3.select('svg').selectAll('rect.base')
        .data(this.centroids)
        .transition()
        .duration(300)
        .attr('fill', function (d) {
          parent.d3.select('rect.active').classed('active', false)
          parent.d3.select(this).classed('active', true)
          return parent.activeCity === d.properties.C_Name ? '#bd8648' : '#a0a0a0'
        })        
        .attr('y', d => {
          let bias = 0
          switch (d.properties.C_Name) {
            case this.$t('REFERENDUM.NEW_TAIPEI'): { bias = 0 + 15; break }
            case this.$t('REFERENDUM.TAOYUAN'): { bias = 0 - 20; break }
            case this.$t('REFERENDUM.KAOHSIUNG'): { bias = 0 + 40; break }                
            default: {}
          }            
          return this.activeAll || this.activeCity === d.properties.C_Name ? d.centroid[1] - this.pkData[ d.properties.C_Name ].base + bias : d.centroid[1] + bias
        })
        .attr('height', d => {
          return this.activeAll || this.activeCity === d.properties.C_Name ? this.pkData[ d.properties.C_Name ].base : 0
        })

        this.d3.select('svg').selectAll('rect.comparison')
        .data(this.centroids)
        .transition()
        .duration(300)
        .attr('fill', function (d) {
          parent.d3.select('rect.active').classed('active', false)
          parent.d3.select(this).classed('active', true)
          return parent.activeCity === d.properties.C_Name ? '#006e78' : '#a0a0a0'
        })        
        .attr('y', d => {
          let bias = 0
          switch (d.properties.C_Name) {
            case this.$t('REFERENDUM.NEW_TAIPEI'): { bias = 0 + 15; break }
            case this.$t('REFERENDUM.TAOYUAN'): { bias = 0 - 20; break }
            case this.$t('REFERENDUM.KAOHSIUNG'): { bias = 0 + 40; break }                
            default: {}
          }           
          return this.activeAll || this.activeCity === d.properties.C_Name ? d.centroid[1] - this.pkData[ d.properties.C_Name ].comparison + bias : d.centroid[1] + bias
        })        
        .attr('height', d => {
          return this.activeAll || this.activeCity === d.properties.C_Name ? this.pkData[ d.properties.C_Name ].comparison : 0
        })        
      },
    },
    data () {
      return {
        centroids: {},
        d3: {},
        features: {},
      }
    },
    mounted () {
      this.d3 = require('d3')
      const parent = this
      this.d3.json('/proj-assets/referendum/json/taiwan.json').then(map => {
        debug('map', map)
        const projection = this.d3.geoMercator().center([ 120.5, 23.5, 5 ]).scale(7500).translate([ 150, 260 ])
        const path = this.d3.geoPath().projection(projection)

        parent.features = filter(topojson.feature(map, map.objects.County_WGS84).features, feature => {
          return get(feature, 'properties.C_Name') !== parent.$t('REFERENDUM.LIANJIANG')
            && get(feature, 'properties.C_Name') !== parent.$t('REFERENDUM.JINMEN')
        })
        debug('features', parent.features)

        this.d3.select('svg').selectAll('path')
        .data(parent.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#e3e3e3')
        .attr('stroke', 'rgba(238, 238, 238, 0.5)')
        .attr('class', 'area')
        .on('mouseover', function (d) {
          parent.d3.select(this).attr('fill', '#d7d7d7')
          const center = parent.getCentroid(parent.d3.select(this))
          parent.d3.select('#tooltip')
          .style('left', center[0] + 'px')
          .style('top', center[1] + 'px')
          .select('#name')
          .text(d.properties.C_Name)
          parent.d3.select('#tooltip').classed('hidden', false)
        })
        .on('mouseout', function (d) {
          parent.d3.select(this).attr('fill', '#e3e3e3')
          parent.d3.select('#tooltip').classed('hidden', true); 
        })
        .on('click', function (d) {
          parent.$emit('update:activeCity', parent.activeCity === d.properties.C_Name ? parent.$t('REFERENDUM.TAIWAN') : d.properties.C_Name)
        })
        .text(function (d) {
          return d.properties.C_Name
        })


        /**
         * render base and comparison bar
         */
        parent.centroids = _map(parent.features, feature => ({ centroid: path.centroid(feature), properties: feature.properties, bounds: path.bounds(feature) }))
        // const centroids = parent.activeAll ? parent.centroids : filter(parent.centroids, item => get(item, 'properties.C_Name') === parent.activeCity)
        debug('centroids', parent.centroids)

        this.d3.select('svg').selectAll('rect.base')
        .data(parent.centroids)
        .enter()
        .append('rect')
        // .attr('fill', '#a0a0a0')   
        // .attr('fill', '#bd8648')
        .attr('fill', d => {
          return parent.activeCity === d.properties.C_Name ? '#bd8648' : '#a0a0a0'
        })
        .attr('class', 'base')
        .attr('x', d => {
          switch (d.properties.C_Name) {
            case parent.$t('REFERENDUM.NEW_TAIPEI'): { return d.centroid[0] - 25 }
            // case parent.$t('REFERENDUM.TAOYUAN'): { return d.bounds[0][0] + 17 }
            case parent.$t('REFERENDUM.MIAOLI'): { return d.bounds[0][0] + 17 }
            case parent.$t('REFERENDUM.TAICHUNG'): { return d.bounds[0][0] + 17 }
            case parent.$t('REFERENDUM.ZHANGHUA'): { return d.bounds[0][0] + 17 }
            case parent.$t('REFERENDUM.YUNLIN'): { return d.bounds[0][0] + 27 }
            case parent.$t('REFERENDUM.CHIAYI'): { return d.centroid[0] + 12 }
            case parent.$t('REFERENDUM.KAOHSIUNG'): { return d.bounds[0][0] + 15 }
            case parent.$t('REFERENDUM.TAINAN'): { return d.bounds[0][0] + 10 }
            case parent.$t('REFERENDUM.PENGHU'): { return d.centroid[0] + 13 }  
            default: { return d.centroid[0] - 3 }
          }
        })
        .attr('y', function (d)  {
          let bias = 0
          switch (d.properties.C_Name) {
            case parent.$t('REFERENDUM.NEW_TAIPEI'): { bias = 0 + 15; break }
            case parent.$t('REFERENDUM.TAOYUAN'): { bias = 0 - 20; break }
            case parent.$t('REFERENDUM.KAOHSIUNG'): { bias = 0 + 40; break }                
            default: {}
          }            
          return parent.activeAll || parent.activeCity === d.properties.C_Name ? d.centroid[1] - parent.pkData[ d.properties.C_Name ].base + bias : d.centroid[1] + bias
        })
        .attr('height', d => {
          return parent.activeAll || parent.activeCity === d.properties.C_Name ? parent.pkData[ d.properties.C_Name ].base : 0
        })
        .attr('width', 4)

        this.d3.select('svg').selectAll('rect.comparison')
        .data(parent.centroids)
        .enter()
        .append('rect')   
        // .attr('fill', '#a0a0a0')   
        // .attr('fill', '#006e78')
        .attr('fill', d => {
          return parent.activeCity === d.properties.C_Name ? '#006e78' : '#a0a0a0'
        })
        .attr('class', 'comparison')
        .attr('x', d => {
          switch (d.properties.C_Name) {
            case parent.$t('REFERENDUM.NEW_TAIPEI'): { return d.centroid[0] - 18 }
            // case parent.$t('REFERENDUM.TAOYUAN'): { return d.bounds[0][0] + 23 }
            case parent.$t('REFERENDUM.MIAOLI'): { return d.bounds[0][0] + 23 }
            case parent.$t('REFERENDUM.TAICHUNG'): { return d.bounds[0][0] + 23 }
            case parent.$t('REFERENDUM.ZHANGHUA'): { return d.bounds[0][0] + 23 }
            case parent.$t('REFERENDUM.YUNLIN'): { return d.bounds[0][0] + 33 }            
            case parent.$t('REFERENDUM.CHIAYI'): { return d.centroid[0] + 18 }     
            case parent.$t('REFERENDUM.KAOHSIUNG'): { return d.bounds[0][0] + 21 }
            case parent.$t('REFERENDUM.TAINAN'): { return d.bounds[0][0] + 16 }    
            case parent.$t('REFERENDUM.PENGHU'): { return d.centroid[0] + 19 }  
            default: { return d.centroid[0] + 3 }
          }          
        })
        .attr('y', d => {
          let bias = 0
          switch (d.properties.C_Name) {
            case parent.$t('REFERENDUM.NEW_TAIPEI'): { bias = 0 + 15; break }
            case parent.$t('REFERENDUM.TAOYUAN'): { bias = 0 - 20; break }
            case parent.$t('REFERENDUM.KAOHSIUNG'): { bias = 0 + 40; break }
            default: {}
          }        
          return parent.activeAll || parent.activeCity === d.properties.C_Name ? d.centroid[1] - parent.pkData[ d.properties.C_Name ].comparison + bias : d.centroid[1] + bias 
        })
        .attr('height', d => {
          return parent.activeAll || parent.activeCity === d.properties.C_Name ? parent.pkData[ d.properties.C_Name ].comparison : 0
        })
        .attr('width', 4)

      })     
    },
    props: {
      activeCity: {
        type: String,
        default: '臺灣',
      },
      activeAll: {
        type: Boolean,
        default: false,
      },
      pkData: {
        type: Object,
        default: () => ({}),
      },
    },
    watch: {
      activeCity () {
        this.updateMap()
      },
      activeAll () {
        debug('update map')
        this.updateMap()
      },
      pkData () {
        this.updateMap()
      },
    },
  }
</script>
<style lang="stylus" scoped>
.map
  display flex
  justify-content flex-end
  position relative
  min-width 425px
  &__wrapper
    width 402px
    height 582px
    position relative
  &__island
    position absolute
    left 40px
    height 90px
    width 90px
    border 2px solid #f2f2f2
    display flex
    justify-content center
    align-items center
    cursor pointer
    overflow hidden
    img
      width 80px
      object-fit contain
      object-position center center
    .vs
      position absolute
      right 0
      bottom 0
      padding 6px 9px
      display flex
      justify-content space-around
      align-items flex-end
      > div
        width 4px
        background-color #a0a0a0
        transition height 0.3s
        height 0
        &:last-child
          margin-left 2px
    &.active
      border-color #d3d3d3
    &.lianjiang
      top 100px
      img
        width 100%
    &.jinmen
      top 205px
svg
  position absolute
  top 100px
  right 50px
  width 352px
  height 482px
  overflow visible
  >>> .area
    stroke #fff
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