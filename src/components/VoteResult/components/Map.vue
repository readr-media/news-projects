<template>
  <div id="map" ref="map">
    <!-- <div @click='show'>hoho</div> -->
    <svg class="svg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'

import { createNamespacedHelpers, } from 'vuex'
const { mapState, mapMutations, } = createNamespacedHelpers('VoteResult')

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      currentLocation: state => state.map.currentLocation
    }),
    
    aspectRatio () {
      // return this.width / this.height
    }
  },
  methods: {
    ...mapMutations([
      'SET_MAP_CURRENT_LOCATION'
    ]),

    // show () {
    //   d3.json(`/proj-assets/vote2018-result/63000.topo.json`)
    //   .then(county => {
    //     console.log(county)
    //   })
    // }
  },
  mounted () {
    const vm = this

    const m_height = d3.select('#map').node().getBoundingClientRect().height
    const width = 938
    const height = 500
    const aspect = width / height
    let county
    let town

    const projection = d3.geoMercator()
    const path = d3.geoPath()

    const svg =
      d3.select('#map .svg')
          .attr('preserveAspectRatio', 'xMidYMid')
          .attr('viewBox', `0 0 ${width} ${height}`)
          .attr('width', m_height * aspect)
          .attr('height', m_height)

    svg
      .append('rect')
      .attr('class', 'background')
      .attr('width', width)
      .attr('height', height)
      .on('click', county_clicked)

    var g = svg.append('g')

    // load tw topo josn
    d3.json('/proj-assets/vote2018-result/tw.json')
      .then(tw => {
        projection.fitExtent([[ 200, 0 ], [ width, height ]], topojson.feature(tw, tw.objects.county))
        path.projection(projection)

        g
          .append('g')
          .attr('id', 'counties')
          .selectAll('path')
          .data(topojson.feature(tw, tw.objects.county).features)
          .enter()
          .append('path')
          .attr('id', d => d['properties']['COUNTYCODE'])
          .attr('d', path)
          .on('click', county_clicked)
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
        .style('stroke-width', `${.5 / xyz[2]}px`)
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

      if (d && county !== d) {
        const xyz = get_xyz(d)

        county = d

        const countyId = d['properties']['COUNTYCODE']
        vm.SET_MAP_CURRENT_LOCATION({ level: 'county', id: countyId })

        d3.json(`/proj-assets/vote2018-result/${countyId}.topo.json`)
          .then(town => {
            g
              .append('g')
              .attr('id', 'towns')
              .selectAll('path')
              .data(topojson.feature(town, town.objects[countyId]).features)
              .enter()
              .append('path')
              .attr('id', d => d['properties']['TOWNCODE'])
              .attr('class', 'active')
              .attr('d', path)
              .on('click', town_clicked)

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

      if (d && town !== d) {
        var xyz = get_xyz(d)
        town = d

        const townId = d['properties']['TOWNCODE']
        vm.SET_MAP_CURRENT_LOCATION({ level: 'town', id: townId })

        d3.json(`/proj-assets/vote2018-result/${townId}.topo.json`)
          .then(tw => {
            g
              .append('g')
              .attr('id', 'villages')
              .selectAll('path')
              .data(topojson.feature(tw, tw.objects[townId]).features)
              .enter()
              .append('path')
              .attr('id', d => d['properties']['VILLCODE'])
              .attr('class', 'active villages')
              .attr('d', path.pointRadius(20 / xyz[2]))
              .on('click', d => {
                const villageId = d['properties']['VILLCODE']
                vm.SET_MAP_CURRENT_LOCATION({ level: 'village', id: villageId })
              })

            zoom(xyz)
          })
      } else {
        town = null
        county_clicked(county)
      }
    }

    window.addEventListener('resize', () => {
      var h = d3.select('#map').node().getBoundingClientRect().height
      svg.attr('width', h * aspect)
      svg.attr('height', h)
    })
  }
}
</script>

<style lang='stylus'>
#map
  width 100vw
  height calc(100vh - 50px)
  // display flex
  // justify-content center
  // align-items center

.background {
  fill: none
  pointer-events: all
}

#counties {
  fill: #e6e6e6
  stroke: white
  stroke-width: 0.5px
  stroke-linejoin: round
  stroke-linecap: round
}

#towns {
  fill: #e6e6e6
}

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
  // stroke: white
  // stroke-width .2px
}
</style>

