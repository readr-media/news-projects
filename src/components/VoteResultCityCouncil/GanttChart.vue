<template>
  <div :class="[ party, 'gantt-chart' ]">
    <h3 v-text="councilor['姓名']"></h3>
    <p>在{{ councilor['地區'] }}議會{{ councilor['家族'] && councilor['家族'] !== '無' ? `屬於${councilor['家族']}家族` : `無家族成員擔任議員` }}</p>
    <p><span>至 2018 年總共當選 {{ personalCount }} 次</span><span v-if="councilor['家族'] && councilor['家族'] !== '無'">，含議員親屬當選次數 {{ familyCount }} 次</span></p>
    <div :id="`chart-${currentYear}-${index}`" class="chart"></div>
  </div>
</template>
<script>
import Highcharts from 'highcharts'
import Xrange from 'highcharts/modules/xrange'
import { union, uniq } from 'lodash'

const convertCountyNameToLatest = (countyName) => {
  if (countyName.match(/桃園/)) {
    return '桃園市'
  } else if (countyName.match(/臺中/)) {
    return '臺中市'
  } else if (countyName.match(/台南/)) {
    return '台南市'
  } else if (countyName.match(/高雄/)) {
    return '高雄市'
  } else if (countyName === '臺北縣') {
    return '新北市'
  }
  return countyName
}

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
    yearListFixed () {
      return [ ...this.yearList, 2022 ]
    },
    councilorsName () {
      return uniq(this.family.map(councilor => councilor['姓名']))
    },
    councilorsSeries () {
      const rrr = []
      const ttt = this.councilorsName.map((councilor, index) => {
        const personal = this.family.filter(item => item['姓名'] === councilor)
        const record = personal.map(item => {
          const startYearIndex = this.yearList.findIndex(year => year === Number(item['年份']))
          const endYear = Number(item['年份']) === 2018 ? 2022 : this.yearList[startYearIndex + 1]
          return { x: Number(item['年份']), x2: endYear, y: index, name: item['姓名'] }
        })
        const mergeYear = []
        if (record.length > 1) {
          let origin = record[0]
          for (let i = 1; i < record.length; i += 1) {
            if (record[i].x === origin.x2 && i === record.length - 1) {
              origin.x2 = record[i].x2
              mergeYear.push(origin)
            } else if (record[i].x === origin.x2) {
              origin.x2 = record[i].x2
            } else {
              mergeYear.push(origin)
              origin = record[i]
            }
          }
        } else {
          mergeYear.push(record[0])
        }
        return mergeYear
      })
      for (let i = 0; i < ttt.length; i += 1) {
        for (let j = 0; j < ttt[i].length; j += 1) {
          rrr.push(ttt[i][j])
        }
      }
      return rrr
    },
    family () {
      if (this.councilor['家族']) {
        return this.councilCsv.filter(councilor => (councilor['家族'] === this.councilor['家族']) && (convertCountyNameToLatest(councilor['地區']) === convertCountyNameToLatest(this.councilor['地區'])))
      }
      return this.councilCsv.filter(councilor => (councilor['姓名'] === this.councilor['姓名']))
    },
    familyCount () {
      if (this.councilor['家族']) {
        return this.councilCsv.filter(councilor => (councilor['家族'] === this.councilor['家族']) && (convertCountyNameToLatest(councilor['地區']) === convertCountyNameToLatest(this.councilor['地區']))).length
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
            dataLabels: {
              enabled: true,
              format: "{key}", 
              style: {
                color: '#fff',
                fontSize: '12px',
                fontWeight: 200,
                textOutline: 0
              },
            }
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
          tickPositions: this.yearListFixed,
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
          categories: this.councilorsName,
          reversed: true
        },
        tooltip: { enabled: false },
        series: [{
          borderColor: 'rgba(103, 94, 86, .95)',
          pointWidth: 15,
          data: this.councilorsSeries,
          // dataLabels: {
            
          //   formatter: function () {
          //     console.log('formatter', this)
          //     return this.name
          //   },
          // },
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
    width 100%
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

@media (min-width: 1200px)
  .gantt-chart
    > h3
      width calc(100% - 70px)

</style>
