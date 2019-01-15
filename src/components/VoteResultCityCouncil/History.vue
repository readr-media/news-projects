<template>
  <div class="map-history">
    <nav class="map-history__nav">
      <button
        v-for="item in countyNav"
        :key="item"
        :class="{ active: item === countyName }"
        @click="$emit('changeCounty', item)"
        v-text="item">
      </button>
      <button @click="$emit('closeLightbox')"><img src="/proj-assets/vote2018-result-city-council/close.png" alt=""></button>
    </nav>
    <div class="map-history__info">
      <div class="yaer-controller">
        <button v-if="currentYear !== yearList[0]" class="prev" @click="$emit('minusYear')"></button>
        <span v-text="currentYear"></span>
        <button v-if="currentYear !== yearList[yearList.length - 1]" class="next" @click="$emit('addYear')"></button>
      </div>
      <div class="speaker-history">
        <div>
          <p v-for="item in councilSpeaker" :key="`${item.name}-speaker`"><span v-text="item.name"></span>議長</p>
        </div>
        <div>
          <p v-for="item in councilSpeaker" :key="`${item.name}-deputy-speaker`"><span v-text="item.name"></span>副議長</p>
        </div>
      </div>
      <div class="gantt">
        <div v-for="(item, index) in councilSpeaker" :key="`${item.name}-gantt`">
          <h3 v-text="item.name"></h3>
          <p v-if="item['家族'] && item['家族'] !== '無'">在{{ countyName }}議會屬於{{ item['家族'] }}家族</p>
          <p><span>個人當選議員次數 {{ item['當選次數'] }} 次</span><span v-if="item['家族'] && item['家族'] !== '無'">；含親屬當選議員次數共 次</span></p>
          <div :id="`chart-test`" class="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Highcharts from 'highcharts'
import Xrange from 'highcharts/modules/xrange'

export default {
  name: 'ProjectHistory',
  props: {
    councilCsv: {
      type: Array
    },
    countyName: {
      type: String
    },
    currentYear: {
      type: Number
    },
    yearList: {
      type: Array
    }
  },
  
  computed: {
    councilSpeaker () {
      return this.councilCsv.filter(councilor => (Number(councilor.year) === this.currentYear) && councilor.county === this.countyName  && councilor['議長'] )
    },
    countyNav () {
      const isNewTaipei = /臺北縣|新北/
      const regex = /桃園|臺中|臺南|高雄/
      if (this.countyName.match(isNewTaipei)) {
        return [ '新北市', '臺北縣' ]
      } else if (this.countyName.match(regex)) {
        const county = this.countyName.substring(0, 2)
        return [ `${county}市`, `${county}縣` ]
      } 
      return [ this.countyName ]
    },
  },
  watch: {
    councilSpeaker () {
      console.log('watch councilSpeaker', document.querySelector('#chart-test'))
    }
  },
  mounted () {
    Xrange(Highcharts)
    console.log('dasdas', this.councilSpeaker, document.querySelector('#chart-test'))
    // this.drawHighChart()
  },
  methods: {
    drawHighChart () {
      Highcharts.chart('chart-test', {
        chart: { type: 'xrange', backgroundColor: 'rgba(0,0,0, .1)',  width: 1200, height: 200, marginRight: 50 },
        title: { text: '' },
        legend: { enabled: false },
        plotOptions: {
          series: {
            color: '#8d8d8d',
            colorByPoint: false,
          }
        },
        xAxis: {
          type: 'linear',
          labels: {
            style: {
              color: '#fff',
              fontSize: '12px'
            },
            rotation: -45,
            y: -20,
          },
          tickPositions: [1955, 1953, 1955, 1958, 1961, 1964, 1968, 1973, 1977, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018],
          tickLength: 0,
          tickColor: '#a9a6a3',
          gridLineColor: '#a9a6a3',
          gridLineWidth: 1,
          startOnTick: true,
          endOnTick: true,
          lineWidth: 0,
          opposite: true
        },
        yAxis: {
          title: { text: '' },
          labels: {
            enabled: false
          },
          gridLineWidth: 0,
          categories: ['議員1', '議員2', '議員3'],
          reversed: true
        },
        tooltip: { enabled: false },
        series: [{
          borderColor: 'rgba(103, 94, 86, .95)',
          pointWidth: 15,
          data: [{
            x: 1994,
            x2: 2002,
            y: 0,
          }, {
            x: 2002,
            x2: 2010,
            y: 1
          }, {
            x: 2010,
            x2: 2018,
            y: 2
          }],
          dataLabels: {
            enabled: true,
            // style: {
            //   color: '#fff',
            //   fontSize: '12px',
            //   fontWeight: 200,
            //   textOutline: 0
            // },
            // formatter: function () {
            //   return this.key
            // },
          },
        }],
        exporting: { enabled: false },
        credits: { enabled: false },
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.map-history
  position relative
  width 100%
  height 100%
  padding 0 0 40px
  text-align center
  background-color rgba(103, 94, 86, .95)
  button
    cursor pointer
  &__nav
    display flex
    height 55px
    > button
      flex 1
      display block
      padding 0
      color #a0a0a0
      font-size 1.3125rem
      background-color #000000
      border none
      opacity .3
      &:last-child
        max-width 55px
        width 55px
        background-color #313131
        opacity 1
      &.active
        color #fff
        background-color transparent
        opacity 1
      img
        width 25px
        height 25px
        object-fit contain
        object-position center center
  &__info
    height calc(100% - 55px)
    padding 0 15px
    overflow-y auto
  
  .yaer-controller
    position relative
    display inline-flex
    align-items center
    justify-content center
    margin-top 35px
    color #fff
    font-size 1.625rem
    > button
      position absolute
      display block
      width 0
      height 0
      padding 0
      background-color transparent
      border-style solid
      &.prev
        left -70px
        border-width 10px 17.3px 10px 0
        border-color transparent #fff transparent transparent
      &.next
        right -70px
        border-width 10px 0 10px 17.3px
        border-color transparent transparent transparent #fff
    > span
      margin 0
      user-select none
  
  .speaker-history
    display flex
    flex-wrap wrap
    margin-top 20px
    > div
      width 50%
      & + div
        border-left 1px solid #dcdcdc
      > p
        margin 0
        color #dcdcdc
        > span
          margin-right 1em
  .gantt
    margin-top 50px
    color #fff
    h3
      margin 0
      padding .5em 0
      letter-spacing 1px
      background-color #48423c
    p
      margin 1em 0 0
    .chart
      margin-top 20px

@media (min-width: 768px)
  .map-history
    &__info
      width 60%
      margin 0 auto
      padding 0
@media (min-width: 1200px)
  .map-history
    &__nav
      > button
        &:last-child
          display none
    
</style>
