<template>
  <div id="map" ref="map">
    <transition name="fade" mode="out-in">
      <div v-show="isCurrentLevelTW && showClickHint" class="click-hint">
        <p class="click-hint__text">選一個地方看投票結果</p>
        <img class="click-hint__finger" src="/proj-assets/vote2018-result/finger.png" alt="">
      </div>
    </transition>
    <div
      v-show="showTooltip"
      class="map-tooltip"
      :style="{
        top: `${tooltipY + 30}px`,
        left: `${tooltipX - 30}px`
      }"
      v-text="tooltipText"
    >
    </div>
    <svg class="svg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'
import { get } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('VoteResult')

const debug = require('debug')('VOTE2018-RESULT:CLIENT:DashboardMap')

export default {
  data () {
    return {
      showClickHint: false,
      showTooltip: false,
      tooltipText: '',
      tooltipX: 0,
      tooltipY: 0,
    }
  },
  computed: {
    ...mapState({
      currentLocation: state => state.map.currentLocation,
      currentLocationLevel: state => state.map.currentLocation.level,
      codeMapping: state => state.locationCodeMapping
    }),
    isCurrentLevelTW () {
      return this.currentLocationLevel === 'tw'
    },
  },
  methods: {
    ...mapActions([
      'FETCH_DATA_VOTE'
    ]),
    ...mapMutations([
      'SET_MAP_CURRENT_LOCATION',
      'SET_MAP_PREVIOUS_LOCATION_ID'
    ]),
  },
  mounted () {
    const vm = this

    const m_width = d3.select('#map').node().getBoundingClientRect().width
    const m_height = d3.select('#map').node().getBoundingClientRect().height
    const width = 938
    const height = 480
    // const aspect = width / height
    const aspect = height / width
    let county
    let town

    const projection = d3.geoMercator()
    const path = d3.geoPath()

    const svg =
      d3.select('#map .svg')
          .attr('preserveAspectRatio', 'xMidYMid')
          .attr('viewBox', `0 0 ${width} ${height}`)
          // .attr('width', m_height * aspect)
          // .attr('height', m_height)
          .attr('width', m_width)
          .attr('height', m_width * aspect)

    svg
      .append('rect')
      .attr('class', 'background')
      .attr('id', 'id-background')
      .attr('width', width)
      .attr('height', height)
      .on('click', county_clicked)

    var g = svg.append('g')

    // load tw topo josn
    d3.json('/proj-assets/vote2018-result/tw.json')
      .then(tw => {
        vm.showClickHint = true

        projection.fitExtent([[ 200, 0 ], [ width, height ]], topojson.feature(tw, tw.objects.county))
        path.projection(projection)

        g
          .append('g')
          .attr('id', 'counties')
          .selectAll('path')
          .data(topojson.feature(tw, tw.objects.county).features)
          .enter()
          .append('path')
          .attr('id', d => `id-${d['properties']['COUNTYCODE']}`)
          .attr('data-county-code', d => d['properties']['COUNTYCODE'])
          .attr('d', path)
          .on('click', county_clicked)
          .on('mouseover', d => {
            const countyId = d['properties']['COUNTYCODE']
            const countyName = get(this.codeMapping, [ countyId, 'name' ], '')
            vm.showTooltip = true
            vm.tooltipText = countyName
          })
          .on('mousemove', d => {
            vm.tooltipX = d3.event.clientX
            vm.tooltipY = d3.event.clientY
          })
          .on('mouseout', d => {
            vm.showTooltip = false
            vm.tooltipText = ''
          })
      })

    function zoom(xyz) {
      g
        .transition()
        .duration(750)
        .attr('transform', `translate(${width / 2}, ${height / 2})scale(${xyz[2]})translate(-${xyz[0]}, -${xyz[1]})`)

      g
        .selectAll(['#counties', '#towns', '#villages'])
        .style('stroke', 'white')
        .style('stroke-linejoin', 'round')
        .style('stroke-linecap', 'round')
        .style('stroke-width', '0px')
        .transition()
        .delay(750)
        .duration(0)
        .style('stroke-width', `${.3 / xyz[2]}px`)
        .selectAll('.villages')
        .attr('d', path.pointRadius(20.0 / xyz[2]))
    }

    function get_xyz(d) {
      const bounds = path.bounds(d)
      const w_scale = (bounds[1][0] - bounds[0][0]) / width
      const h_scale = (bounds[1][1] - bounds[0][1]) / height
      const z = .56 / Math.max(w_scale, h_scale)
      // var x = (bounds[1][0] + bounds[0][0]) / 2
      // var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6)

      // NOTE: Add
      const centroid = path.centroid(d)
      const x = centroid[0]
      const y = centroid[1]
      return [x, y, z]
    }

    function county_clicked(d) {
      g.selectAll(['#towns', '#villages']).remove()
      town = null

      // if (country) {
      //   console.log(country)
      //   const id = country['properties']['COUNTYCODE']
      //   g.selectAll('#' + id).style('display', null)
      // }

      // if (d && county !== d) {
      if (d) {
        const xyz = get_xyz(d)

        county = d

        const countyId = d['properties']['COUNTYCODE']
        vm.SET_MAP_CURRENT_LOCATION({ level: 'county', id: countyId })
        vm.FETCH_DATA_VOTE(`${countyId}.json`)

        debug('---')
        debug('county_clicked:')
        debug('path id is:', `#id-${countyId}`)
        debug('d is:', d)
        debug('---')
        vm.SET_MAP_PREVIOUS_LOCATION_ID('background')

        d3.json(`/proj-assets/vote2018-result/${countyId}.topo${countyId === '10018' ? '.new' : ''}.json`)
          .then(town => {
            g
              .append('g')
              .attr('id', 'towns')
              .selectAll('path')
              .data(topojson.feature(town, town.objects[countyId]).features)
              .enter()
              .append('path')
              .attr('id', d => `id-${countyId === '10018' ? `${countyId}0${d['properties']['VOTEDIVISIONID']}` : d['properties']['TOWNCODE']}`)
              .attr('data-county-code', d => d['properties']['COUNTYCODE'])
              .attr('data-town-code', d => {
                const code = d['properties']['TOWNCODE']
                return code.slice(code.length - 3, code.length)
              })
              .attr('class', 'active')
              .attr('d', path)
              .on('click', town_clicked)
              .on('mouseover', d => {
                const countyId = d['properties']['COUNTYCODE']

                let townId = countyId === '10018' ? `${countyId}0${d['properties']['VOTEDIVISIONID']}` : d['properties']['TOWNCODE']
                townId = townId.slice(townId.length - (countyId === '10018' ? 2 : 3), townId.length)

                const townObj = get(vm.codeMapping, [ countyId, townId ], {})
                const villageObjFirstItem = get(townObj, Object.keys(townObj)[0], {})

                const countyName = get(vm.codeMapping, [ countyId, 'name' ], '')
                const townName = get(villageObjFirstItem, 'AreaName', '')
                vm.showTooltip = true
                vm.tooltipText = `${countyName} ${townName}`
              })
              .on('mousemove', d => {
                vm.tooltipX = d3.event.clientX
                vm.tooltipY = d3.event.clientY
              })
              .on('mouseout', d => {
                vm.showTooltip = false
                vm.tooltipText = ''
              })

            zoom(xyz)
            // g.selectAll('#' + d.id).style('display', 'none')
          })
      } else {
        const xyz = [width / 2, height / 2, 1]
        county = null
        vm.SET_MAP_CURRENT_LOCATION({ level: 'tw' })
        zoom(xyz)
      }
    }

    function town_clicked(d) {
      g.selectAll('#villages').remove()
      g.selectAll('.active').classed('active', false)

      // if (d && town !== d) {
      if (d) {
        var xyz = get_xyz(d)
        town = d

        const countyId = d['properties']['COUNTYCODE']
        const townId = countyId === '10018' ? `${countyId}0${d['properties']['VOTEDIVISIONID']}` : d['properties']['TOWNCODE']
        vm.SET_MAP_CURRENT_LOCATION({ level: 'town', id: townId })
        vm.FETCH_DATA_VOTE(`${townId}.json`)

        debug('---')
        debug('town_clicked:')
        debug('path id is:', `#id-${townId}`)
        debug('d is:', d)
        debug('---')

        vm.SET_MAP_PREVIOUS_LOCATION_ID(countyId)

        d3.json(`/proj-assets/vote2018-result/${townId}.topo${countyId === '10018' ? '.new' : ''}.json`)
          .then(tw => {
            g
              .append('g')
              .attr('id', 'villages')
              .selectAll('path')
              .data(topojson.feature(tw, tw.objects[townId]).features)
              .enter()
              .append('path')
              .attr('id', d => `id-${d['properties']['VILLCODE']}`)
              .attr('data-county-code', d => d['properties']['COUNTYCODE'])
              .attr('data-town-code', d => {
                const code = d['properties']['TOWNCODE']
                return code.slice(code.length - 3, code.length)
              })
              .attr('data-village-code', d => {
                const code = d['properties']['VILLCODE']
                return code.slice(code.length - 3, code.length)
              })
              .attr('class', 'active villages')
              .attr('d', path.pointRadius(20 / xyz[2]))
              .on('click', d => {

                g.selectAll('.active').classed('active', false)
                d3.select(`#id-${d['properties']['VILLCODE']}`)
                  .attr('class', 'active')
      
                const villageId = d['properties']['VILLCODE']
                vm.SET_MAP_CURRENT_LOCATION({ level: 'village', id: villageId })
                vm.FETCH_DATA_VOTE(`${d['properties']['TOWNCODE']}_detail.json`)

                debug('---')
                debug('village_clicked:')
                debug('path id is:', `#id-${villageId}`)
                debug('d is:', d)
                debug('---')
                vm.SET_MAP_PREVIOUS_LOCATION_ID(townId)
              })
              .on('mouseover', d => {
                const countyId = d['properties']['COUNTYCODE']

                let townId = countyId === '10018' ? `0${d['properties']['VOTEDIVISIONID']}` : d['properties']['TOWNCODE']
                // townId = townId.slice(townId.length - (countyId === '10018' ? 2 : 3), townId.length)

                const townObj = get(vm.codeMapping, [ countyId, townId ], {})
                const villageObjFirstItem = get(townObj, Object.keys(townObj)[0], {})

                const countyName = get(vm.codeMapping, [ countyId, 'name' ], '')
                const townName = get(villageObjFirstItem, 'AreaName', '')

                let villageId = d['properties']['VILLCODE']
                villageId = villageId.slice(villageId.length - (countyId === '10018' ? 2 : 3), villageId.length)
                if (countyId === '10018') {
                  villageId = `0${villageId}`
                }

                const villageName = get(vm.codeMapping, [ countyId, townId, villageId, 'VillageName' ], '')

                vm.showTooltip = true
                vm.tooltipText = `${countyName} ${townName} ${villageName}`
              })
              .on('mousemove', d => {
                vm.tooltipX = d3.event.clientX
                vm.tooltipY = d3.event.clientY
              })
              .on('mouseout', d => {
                vm.showTooltip = false
                vm.tooltipText = ''
              })

            zoom(xyz)
          })
      } else {
        town = null
        county_clicked(county)
      }
    }

    window.addEventListener('resize', () => {
      const w = d3.select('#map').node().getBoundingClientRect().width
      const h = d3.select('#map').node().getBoundingClientRect().height
      svg.attr('width', w)
      svg.attr('height', w * aspect)
    })
  }
}
</script>

<style lang='stylus'>
#map
  width 100vw
  height calc(100vh - 50px)
  display flex
  justify-content center
  align-items center

.background {
  fill: none
  pointer-events: all
  cursor pointer
}

#counties {
  fill: #e6e6e6
  stroke: white
  stroke-width: 0.3px
  stroke-linejoin: round
  stroke-linecap: round
  cursor: pointer
}

#towns {
  fill: #e6e6e6
  cursor: pointer
}

#villages
  fill: #e6e6e6
  cursor: pointer

// #countries .active {
//   fill: #9e005d
// }

// #county-borders {
//   fill: none
//   stroke: white
//   stroke-width: 0px
//   stroke-linejoin: round
//   stroke-linecap: round
//   pointer-events: none
// }

.active {
  fill: #9e005d
  // box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.75);
}

.click-hint
  position absolute
  top 30vh
  left calc(50vw - 200px)
  display flex
  align-items center
  &__text
    font-size 16px
    color #9b9b9b
    margin 0 10px 0 0
  &__finger
    height 60px

.map-tooltip
  position fixed
  top 0
  left 0
  background-color white
  padding 10px

.fade-enter-active, .fade-leave-active
  transition opacity .5s
.fade-enter, .fade-leave-to
  opacity 0
</style>

