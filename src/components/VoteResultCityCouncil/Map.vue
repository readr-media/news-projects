<template>
  <section class="interactive-map-container">
    <div class="hint">請點選地圖，切換不同縣市議長資料</div>
    <h3>議長當選次數</h3>
    <p>若有家族成員也擔任同縣市議員，則加上親屬當選次數</p>
    <div class="interactive-map">
      <div class="interactive-map__map">
        <div v-show="finishedtw && currentYear >= 2010" id="map-twmerge"></div>
        <div v-show="currentYear < 2010" id="map-tw"></div>
        <div v-show="finishedkinmen" id="map-kinmen"></div>
        <div v-show="finishedlienchiang" id="map-lienchiang"></div>
      </div>
    </div>
    <div :class="{ open: openContent }" class="lightbox">
      <History
        :councilCsv="councilCsv"
        :countyName="countyName"
        :currentYear="currentYear"
        :yearList="yearList"
        @addYear="currentYear = yearList[currentYearIndex + 1]"
        @minusYear="currentYear = yearList[currentYearIndex - 1]"
        @changeCounty="changeCounty"
        @closeLightbox="openContent = false" />
    </div>

  </section>
</template>
<script>

import * as d3 from 'd3'
import * as topojson from 'topojson'
import History from './History.vue'
import axios from 'axios'
import { get, find, uniq } from 'lodash'

const getSVGWidth = (section, viewportWidth) => {
  if (section === 'kinmen' || section === 'lienchiang') {
    return 75
  } else if (viewportWidth >= 1200) {
    return viewportWidth / 2
  }
  return viewportWidth
}

const getSVGHeight = (section, viewportWidth, viewportHeight) => {
  if (section === 'kinmen' || section === 'lienchiang') {
    return 75
  } else if (viewportWidth >= 1200) {
    return viewportHeight - 134
  }
  return viewportHeight
}

const getYearList = (currentYear, countyName, yearCsv) => {
  let yearList
  if (currentYear >= 2014 && countyName.match(/桃園/)) {
    yearList = yearCsv.find(data => data['地區'].match(/桃園/)) || {}
  } else {
    yearList = yearCsv.find(data => data['地區'] === countyName.replace('台', '臺')) || {}
  }
  return Object.entries(yearList).filter(data => data[1] === '1').map(data => Number(data[0]))
}

const getCouncilSpeaker = (currentYear, countyName, yearCsv, councilCsv) => {
  const yearListConverted = getYearList(currentYear, countyName, yearCsv)
  let year
  for (let i = 0; i < yearListConverted.length; i += 1) {
    if (yearListConverted[i] <= currentYear) {
      year = yearListConverted[i]
    }
  }
  return councilCsv.filter(council => council['地區'] === countyName.replace('台', '臺')
    && Number(council['年份']) === year
    && council['議長']).sort((a, b) => b['議長順序'] - a['議長順序'])[0]
}

const filterGeoJson = (geoJson, county = undefined) => {
  let features
  if (geoJson && geoJson.features) {
    if (county) {
      features = geoJson.features.filter(i => i.properties.COUNTYNAME === county)
    } else {
      features = geoJson.features.filter(i => {
        return i.properties.COUNTYNAME !== '連江縣' && i.properties.COUNTYNAME !== '金門縣'
      })
    }
  }
  return { type: 'FeatureCollection', features: features } 
}

export default {
  name: 'ProjectMap',
  components: {
    History
  },
  data () {
    return {
      currentYear: 2018,
      countyName: '臺北市',
      maxElectedCount: 24,
      // loading: true,
      // geoJson: undefined,
      // geoJsonMerge: undefined,

      councilCsv: [],
      yearCsv: [],
      twGeoJson: undefined,
      twMergeGeoJson: undefined,
      kinmenGeoJson: undefined,
      lienchiangGeoJson: undefined,

      twMap: undefined,
      twmergeMap: undefined,
      kinmenMap: undefined,
      lienchiangMap: undefined,

      finishedtw: false,
      finishedtwmerge: false,
      finishedkinmen: false,
      finishedlienchiang: false,
      openContent: false,
    }
  },
  computed: {
    currentYearIndex () {
      return this.yearList.findIndex(year => year === this.currentYear)
    },
    yearList () {
      return getYearList(this.currentYear, this.countyName, this.yearCsv)
    },
    speakerList () {
      const geo = this.currentYear < 2010 ? this.twGeoJson : this.twMergeGeoJson
      const geoFeatures = geo.features || []
      const counties = uniq(geoFeatures.map(feature => feature.properties.COUNTYNAME))
      counties.push('金門縣', '連江縣')
      const speakers = counties.map(county => {
        if (county.match(/桃園/) && this.currentYear < 2014) {
          county = '桃園縣'
        }
        let count = 0
        const speaker = getCouncilSpeaker(this.currentYear, county, this.yearCsv, this.councilCsv)
        const family = speaker ? speaker['家族'] : undefined
        if (speaker && family) {
          count = this.councilCsv.filter(council => council['家族'] === family && Number(council['年份']) <= this.currentYear).length
        } else if (speaker) {
          count = this.councilCsv.filter(council => council['姓名'] === speaker['姓名'] && Number(council['年份']) <= this.currentYear).length
        }
        
        return { county: county, speaker: speaker, count: count }
      })
      return speakers
    }
  },
  created () {
  },
  beforeMount () {
    Promise.all([
      axios.get('/proj-assets/vote2018-result-city-council/twCounty2010.topo.json'),
      axios.get('/proj-assets/vote2018-result-city-council/twCounty2010merge.topo.json'),
      d3.csv('/proj-assets/vote2018-result-city-council/ccm.csv'),
      d3.csv('/proj-assets/vote2018-result-city-council/ccm_year.csv')
    ]).then(res => {
      const twTopoJson = res[0].data
      const twMergeTopoJson = res[1].data
      const twMergeGeoJson = topojson.feature(twMergeTopoJson, twMergeTopoJson.objects.layer1)
      this.twMergeGeoJson = filterGeoJson(twMergeGeoJson)
      this.kinmenGeoJson = filterGeoJson(twMergeGeoJson, '金門縣')
      this.lienchiangGeoJson = filterGeoJson(twMergeGeoJson, '連江縣')
      this.twGeoJson = filterGeoJson(topojson.feature(twTopoJson, twTopoJson.objects.layer1))
      this.councilCsv = res[2]
      this.yearCsv = res[3]
    })
  },
  watch: {
    twGeoJson (value) {
      this.drawMap('tw', value, 35)
    },
    twMergeGeoJson (value) {
      this.drawMap('twmerge', value, 35)
      this.fillColor('twmerge')
    },
    kinmenGeoJson (value) {
      this.drawMap('kinmen', value)
      this.fillColor('kinmen')
    },
    lienchiangGeoJson (value) {
      this.drawMap('lienchiang', value)
      this.fillColor('lienchiang')
    },
    // councilCsv (value) {
    //   let familyList = uniq(value.filter(councilor => councilor['家族']).map(councilor => councilor['家族']))
    //   this.maxElectedCount = Math.max(...familyList.map(family => value.filter(councilor => councilor['家族'] === family).length))
    // },
    openContent (value) {
      if (value) {
        document.querySelector('body').classList.add('stop-scrolling')
      } else {
        document.querySelector('body').classList.remove('stop-scrolling')
      }
    },
    currentYear (value) {
      value < 2010 ? this.fillColor('tw') : this.fillColor('twmerge')
      this.fillColor('kinmen')
      this.fillColor('lienchiang')
    },
    countyName (value) {
      // const yearListConverted = getYearList(this.currentYear, value, this.yearCsv)
      // let year
      // for (let i = 0; i < yearListConverted.length; i += 1) {
      //   if (yearListConverted[i] <= currentYear) {
      //     year = yearListConverted[i]
      //   }
      // }
      this.currentYear = this.yearList[this.yearList.length - 1]
      // this.currentYear = year
    } 
  },
  methods: {
    changeCounty (county) {
      this.countyName = county
    },
    drawMap(section, geoJson, offsetFix = 0) {
      const width = getSVGWidth(section, this.$store.state.viewport[0])
      const height = getSVGHeight(section, this.$store.state.viewport[0], this.$store.state.viewport[1])
      const center = d3.geoCentroid(geoJson)
      const offset = [(width / 2) + offsetFix, height / 2]
      let scale = 6500
      if (this.$store.state.viewport[0] === 768 && section !== 'kinmen' && section !== 'lienchiang') {
        scale = 9500
      }
      const projection = d3.geoMercator().center(center).scale(scale).translate(offset)
      const path = d3.geoPath().projection(projection)
      this[`${section}Map`] = d3.select(`#map-${section}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      this[`${section}Map`].selectAll('path')
        .data(geoJson.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke-opacity', .3)
        .style('stroke', '#000')
        .on('click', this.handleClick)
      this[`finished${section}`] = true
    },
    fillColor (section) {
      this[`${section}Map`]
        .selectAll('path')
        .style('fill', (d) => {
          const councilSpeaker = this.speakerList.find(speaker =>{
            let county = d.properties.COUNTYNAME
            if (county.match(/桃園/) && this.currentYear < 2014) {
              county = '桃園縣'
            }
            return speaker.county === county
          })
          const count = councilSpeaker.count
          if (councilSpeaker.speaker && councilSpeaker.speaker['黨籍'] === '中國國民黨') {
            return `rgba(54, 77, 119, ${count / this.maxElectedCount + 0.2})`
          } else if (councilSpeaker.speaker && councilSpeaker.speaker['黨籍'] === '民主進步黨') {
            return `rgba(20, 114, 102, ${count / this.maxElectedCount + 0.2})`
          } else if (councilSpeaker.speaker && councilSpeaker.speaker['黨籍'] === '無黨籍') {
            return `rgba(125, 125, 125, ${count / this.maxElectedCount + 0.2})`
          } else if (councilSpeaker.speaker) {
            return `rgba(199, 89, 17, ${count / this.maxElectedCount + 0.2})`
          }
          return '#fff'
        })
    },
    handleClick (d) {
      this.countyName = d.properties.COUNTYNAME
      this.$store.state.viewport[0] < 1200 ? this.openContent = true : ''
      // this.$store.state.useragent.isMobile ? this.openContent = true : ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  .interactive-map-container
    background-color #eee
    > h3, > p
      width calc(100% - 40px)
      margin 1em auto 0
    > h3
      font-size 1rem
    > p
      font-size .875rem
    .hint
      padding .3em 1em
      color #fff
      font-size 1rem
      font-weight 400
      text-align center
      background-color #e5004f
    .lightbox
      display none
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      z-index 100
      align-items center
      &.open
        display flex
    
  .interactive-map
    position relative
    min-height 100vh
    text-align center
    #map-tw, #map-twmerge
      font-size 0
    #map-kinmen
      position absolute
      top 135px
      left 20px
      width 75px
      height 75px
      border 1px solid rgba(0,0,0,.5)
    #map-lienchiang
      position absolute
      top 50px
      left 20px
      width 75px
      height 75px
      border 1px solid rgba(0,0,0,.5)
    &__map
      > h3
        display inline
        position absolute
        top 50px
        right 50px
        z-index 10
        margin 0
        padding .2em 1em
        text-align center
        font-weight 400
    
    .content-container
      position relative
      width 100%
      max-height 100%
      // height 100%
      padding 50px 1em 1em
      background-color rgba(255, 255, 255, .8)
      // overflow hidden
      > h2
        position absolute
        top 12px
        left 16px
        margin 0
        font-size 1.5rem
      > button
        position absolute
        top 12px
        right .5em
        padding 0 .5em
        line-height 0
        background-color transparent
        border none
        img
          width 25px
          height 25px
          object-fit contain
          object-position center center
      .content
        height 100%
        // padding 0 0 50px
        // margin 50px 0 0
        overflow-y auto
        text-align justify
        > p
          margin 0
          line-height 1.67
          word-break break-word
          & + p
            margin-top .5em

@media (min-width: 768px)
  .interactive-map-container
    text-align center
    > h3
      font-size 1.3125rem
    > p
      font-size 1rem
    .hint
      height 40px
      padding 0
      font-size 1.3125rem
      line-height 40px

@media (min-width: 1200px)
  .interactive-map-container
    position relative
    > h3, > p
      width 50%
    > h3
      margin 1em 0 0 auto
    > p
      margin 1em 0 0 auto
    .lightbox
      display flex
      position absolute
      top 40px
      width 50%
      height calc(100% - 40px)
  .interactive-map
    width 50%
    min-height calc(100vh - 134px)
    margin 15px 0 0 auto

</style>
