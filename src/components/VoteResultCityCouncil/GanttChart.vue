<template>
  <div :class="[ party, 'gantt-chart' ]">
    <h3 v-text="councilor['姓名']"></h3>
    <p v-if="councilor['家族'] && councilor['家族'] !== '無'">在{{ councilor['地區'] }}議會屬於{{ councilor['家族'] }}家族</p>
    <p><span>個人當選議員次數 {{ personalCount }} 次</span><span v-if="councilor['家族'] && councilor['家族'] !== '無'">；含親屬當選議員次數共 {{ familyCount }} 次</span></p>
    <div :id="`chart-${currentYear}-${index}`" class="chart"></div>
  </div>
</template>
<script>
import Highcharts from 'highcharts'
import Xrange from 'highcharts/modules/xrange'
import { uniq } from 'lodash'

export default {
  name: 'GanttChart',
  props: {
    councilCsv: {
      type: Array
    },
    councilor: {
      type: Object
    },
    currentYear: {
      type: Number
    },
    index: {
      type: Number
    },
    yearList: {
      type: Array
    }
  },
  computed: {
    councilorsName () {
      return uniq(this.family.map(councilor => councilor['姓名']))
    },
    councilorsSeries () {
      return this.councilorsName.map((councilor, index) => {
        const personal = this.family.filter(item => item['姓名'] === councilor)
        const record = personal.map(item => {
          const startYearIndex = this.yearList.findIndex(year => year === Number(item['年份']))
          const endYear = Number(item['年份']) === 2018 ? 2019 : this.yearList[startYearIndex + 1]
          return { x: Number(item['年份']), x2: endYear, y: index }
        })
        // const mergeYear = []
        // const origin = record[0]
        // for(let i = 1; i < record.length; i += 1) {
        //   if (record[i].x === origin.x2 && i === record.length - 1) {
        //     origin.x2 = record[i].x2
        //     mergeYear.push(origin)
        //   } else if (record[i].x === origin.x2) {
        //     origin.x2 = record[i].x2
        //   } else {
        //     mergeYear.push(origin)
        //   }
        // }
        return record
      })
    },
    family () {
      if (this.councilor['家族']) {
        return this.councilCsv.filter(councilor => (councilor['家族'] === this.councilor['家族']) && (councilor['年份'] <= this.councilor['年份']))
      }
      return this.councilCsv.filter(councilor => (councilor['姓名'] === this.councilor['姓名']) && (councilor['年份'] <= this.councilor['年份']))
    },
    familyCount () {
      if (this.councilor['家族']) {
        return this.councilCsv.filter(councilor => (councilor['家族'] === this.councilor['家族']) && (councilor['年份'] <= this.councilor['年份'])).length
      }
      return 0
    },
    party () {
      if (this.councilor['黨籍'] === '中國國民黨') {
        return 'kmt'
      } else if (this.councilor['黨籍'] === '民主進步黨') {
        return 'dpp'
      } else if (this.councilor['黨籍'] === '新黨') {
        return 'new'
      } else if (this.councilor['黨籍'] === '親民黨') {
        return 'pfp'
      } else if (this.councilor['黨籍'] === '無黨籍') {
        return 'none'
      }
      return 'unknow'
    },
    personalCount () {
      return this.councilCsv.filter(councilor => (councilor['姓名'] === this.councilor['姓名']) && (councilor['年份'] <= this.councilor['年份'])).length
    }
  },
  mounted () {
    Xrange(Highcharts)
    this.drawHighChart()
  },
  methods: {
    drawHighChart () {
      Highcharts.chart(`chart-${this.currentYear}-${this.index}`, {
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
          tickPositions: this.yearList,
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
.gantt-chart
  letter-spacing 1px
  & + .gantt-chart
    margin-top 40px
  > h3
    position relative
    width calc(100% - 70px)
    margin 0 auto
    padding .5em 0
    letter-spacing 1px
    text-shadow 1.4px 1.4px 1.9px rgba(0, 0, 0, 0.2)
    background-color #48423c
    overflow hidden
    &::before, &::after
      content ''
      position absolute
      top 0
      width 35px
      height 100%
      background-repeat no-repeat
      background-size cover
    &::before
      left 0
      background-position -26px 50%
    &::after
      right 0
      background-position 8px 50%
  > p
    margin 1em 0 0

  .chart
    margin-top 20px
    overflow-x auto !important
  
  &.kmt
    > h3
      background-color #364d77
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-kmt.png)
  &.dpp
    > h3
      background-color #147266
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-dpp.png)
  &.new
    > h3
      background-color #ffdb00
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-new.png)
  &.pfp
    > h3
      background-color #fe6407
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-pfp.png)
  &.none
    > h3
      background-color #7d7d7d
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-none.png)
  &.unknow
    > h3
      background-color #48423c
      &::before, &::after
        background-image url(/proj-assets/vote2018-result-city-council/party-unknow.png)
</style>
