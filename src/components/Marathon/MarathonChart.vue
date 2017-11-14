<template>
  <div class="marathonChart" :class="`chart--${chart}`">
    <h1 v-if="chartTitle" v-text="chartTitle"></h1>
    <h2 v-if="chartSubtitle" v-text="chartSubtitle"></h2>
    <div class="marathonChart__chart" :class="chartPosition">
      <img v-if="chartPeopleImage" :src="`https://www.mirrormedia.mg/projects/images/marathon/chart-${chartPeopleImage}.png`">
      <div :id="`js-chart-${chart}`"></div>
    </div>
    <h3 v-if="chartDescr" v-text="chartDescr"></h3>
  </div>
</template>
<script>
  import Highcharts from 'highcharts'

  export default {
    name: 'MarathonChart',
    props: {
      chart: {
        type: Number,
        required: true,
      },
      chartDescr: {
        type: String,
        default: undefined,
      },
      chartPeopleImage: {
        type: String,
        default: undefined,
      },
      chartPosition: {
        type: String,
        default: '',
      },
      chartSubtitle: {
        type: String,
        default: undefined,
      },
      chartTitle: {
        type: String,
        default: undefined,
      }
    },
    mounted() {
      this.$_marathon_drawChart(this.chart)
    },
    methods: {
      $_marathon_drawChart(chart) {
        switch(chart) {
          case 1:
            return this.$_marathon_drawChart1()
          case 2:
            return this.$_marathon_drawChart2()
          case 3:
            return this.$_marathon_drawChart3()
          case 4:
            return this.$_marathon_drawChart4()
          case 5:
            return this.$_marathon_drawChart5()
          case 6:
            return this.$_marathon_drawChart6()
          case 7:
            return this.$_marathon_drawChart7()
          default:
            this.$_marathon_drawChart1()
        }
      },
      $_marathon_drawChart1() {
        Highcharts.chart('js-chart-1', {
          chart: { type: 'column', backgroundColor: 'rgba(244, 91, 105, .1)', borderRadius: 5, spacingTop: 50 },
          title: { text: '' },
          xAxis: {
            title: { text: '次數/週', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['<3', '3-5', '5-9', '10-14', '15-20', '>20'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '數量 (間)', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -20, offset: 5, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { enabled: false },
          plotOptions: {
            column: {
              dataLabels: {
                color: '#f45b69',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '數量',
            showInLegend: false,
            color: '#f45b69',
            data: [958, 541, 236, 18, 2, 1],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart2() {
        Highcharts.chart('js-chart-2', {
          chart: { type: 'column', backgroundColor: 'rgba(255, 191, 85, .1)', borderRadius: 5, spacingTop: 50 },
          title: { text: '' },
          xAxis: {
            title: { text: '公里/週', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['<10', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '>50'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '人數', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -20, offset: 15, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { enabled: false },
          plotOptions: {
            column: {
              dataLabels: {
                color: '#ffbf55',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '數量',
            showInLegend: false,
            color: '#ffbf55',
            data: [0, 58, 192, 296, 274, 244, 185, 139, 115, 253],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart3() {
        Highcharts.chart('js-chart-3', {
          chart: { type: 'line', backgroundColor: 'rgba(0, 152, 218, .1)', borderRadius: 5, spacingTop: 50 },
          title: { text: '' },
          xAxis: {
            title: { text: '月份', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '平均<br>次數', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -30, offset: 0, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { headerFormat: '<b>{point.x}月平均</b>', pointFormat: ' {point.y} 次' },
          plotOptions: {
            column: {
              dataLabels: {
                color: '#0098da',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '數量',
            showInLegend: false,
            color: '#0098da',
            data: [7, 7, 8, 9, 10, 11, 12, 13, 13, 14, 14, 13],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart4() {
        Highcharts.chart('js-chart-4', {
          chart: { type: 'line', backgroundColor: 'rgba(0, 152, 218, .1)', borderRadius: 5, spacingTop: 50 },
          title: { text: '' },
          xAxis: {
            title: { text: '月份', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '平均<br>公里', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -30, offset: 0, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { headerFormat: '<b>{point.x}月平均</b>', pointFormat: ' {point.y} 公里' },
          plotOptions: {
            column: {
              dataLabels: {
                color: '#0098da',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '數量',
            showInLegend: false,
            color: '#0098da',
            data: [84.7, 80.7, 89.4, 89.0, 93.6, 85.5, 97.1, 109.7, 114.5, 144.7, 149.3, 162.2],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart5() {
        Highcharts.chart('js-chart-5', {
          chart: { type: 'bar', backgroundColor: 'rgba(255, 191, 85, .1)', borderRadius: 5, spacingTop: 10 },
          title: { text: '' },
          xAxis: {
            categories: ['台南市立<br>田徑場', '新竹田徑場', '鳳山體育場', '板橋<br>重慶國小', '浮洲橋<br>→ 城林橋', '衛武營<br>都會公園', '文心花栗鼠', '四號公園', '植物園<br>→ 科博館', '板橋<br>五權公園'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '次數', align: 'high', style: { color: '#4d4d4d' }, rotation: 0 },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { enabled: false },
          plotOptions: {
            bar: {
              dataLabels: {
                color: '#ffbf55',
                enabled: true,
                style: { fontSize: '14px', textOutline: 0 },
              },
              pointPadding: 0.2,
              borderWidth: 0,
            },
          },
          series: [{
            name: '數量',
            showInLegend: false,
            color: '#ffbf55',
            data: [1208, 843, 791, 772, 625, 615, 514, 325, 146, 83],
          }],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart6() {
        Highcharts.chart('js-chart-6', {
          chart: { type: 'column', backgroundColor: 'rgba(244, 91, 105, .1)', borderRadius: 5, spacingTop: 20 },
          title: { text: '' },
          xAxis: {
            title: { text: '次數/週', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['<3', '3-5', '5-9', '10-14', '15-20'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          tooltip: { headerFormat: '<b>佔 {series.name} 跑者的</b>', pointFormat: ' {point.y} %' },
          yAxis: {
            title: { text: '(%)', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -20, offset: 15, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
            symbolRadius: 0,
            itemDistance: 10
          },
          series: [
            { name: '< 3hr', color: '#f45b69', data: [6.1, 33.3, 48.5, 12.1, 0.0] },
            { name: '3~4hr', color: '#ffbf55', data: [22.6, 53.1, 22.2, 2.1, 0.0] },
            { name: '4~5hr', color: '#0098da', data: [33.0, 55.2, 10.8, 0.9, 0.1] }
          ],
          credits: { enabled: false },
        })
      },
      $_marathon_drawChart7() {
        Highcharts.chart('js-chart-7', {
          chart: { type: 'line', backgroundColor: 'rgba(244, 91, 105, .1)', borderRadius: 5, spacingTop: 20 },
          title: { text: '' },
          xAxis: {
            title: { text: '公里/週', align: 'middle', style: { color: '#4d4d4d' }, x: -20 },
            categories: ['<10', '10-19', '20-29', '30-39', '40-49', '>50'],
            crosshair: true,
            labels: { style: { fontSize: '12px', color: '#4d4d4d' } },
            tickColor: '#fff',
            gridLineColor: '#fff',
            gridLineWidth: '1',
            lineColor: '#fff'
          },
          yAxis: {
            title: { text: '(%)', align: 'high', style: { color: '#4d4d4d' }, rotation: 0, y: -20, offset: 15, },
            labels: { overflow: 'justify', style: { fontSize: '12px', color: '#4d4d4d' } },
            gridLineColor: '#fff',
          },
          tooltip: { headerFormat: '<b>佔 {series.name} 跑者的</b>', pointFormat: ' {point.y} %' },
          plotOptions: {
            line: { marker: { symbol: 'circle' } },
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
            symbolRadius: 0,
            itemDistance: 10
          },
          series: [
            { name: '< 3hr', color: '#f45b69', data: [0.0, 6, 10, 10, 16, 58] },
            { name: '3~4hr', color: '#ffbf55', data: [0.0, 4, 16, 27, 23, 31] },
            { name: '4~5hr', color: '#0098da', data: [0.0, 16, 39, 26, 12, 7] }
          ],
          credits: { enabled: false },
        })
      },
    }
  }
</script>
<style lang="stylus" scoped>

h1
  width 6em
h1, h2, h3
  line-height 1.3
h2, h3
  color #4d4d4d
h3
  position relative
  padding-left 35px
  font-size 16px
  text-align justify
  font-weight 300
  &:before
    content ''
    position absolute
    top 2px
    left 0
    width 20px
    height 20px
    background-color #000
  &:after
    content ''
    position absolute
    top 2px
    left 20px
    width 20px
    height 20px
    border-style solid
    border-width 10px 0 10px 10px
    border-color transparent transparent transparent #000

.marathonChart
  img
    position absolute
    top 0
    right 10px
    width 35%
    z-index 10
  &__chart
    position relative
    width 100%
    min-height 50px
    margin-top 20px
    padding 10px 0
    border-radius 5px

.chart--1
  h3
    &:before
      background-color #f45b69
    &:after
      border-color transparent transparent transparent #f45b69
  img
    transform translate(20%, -40%)
.chart--2
  h3
    &:before
      background-color #ffbf55
    &:after
      border-color transparent transparent transparent #ffbf55
  img
    transform translate(30%, -80%)
.chart--3
  img
    transform translate(20%, -90%)
.chart--4
  h3
    &:before
      background-color #0098da
    &:after
      border-color transparent transparent transparent #0098da

.chart--5
  img
    top auto
    bottom 0
    right -10px
    transform translateY(-50%)

.chart--6
  .highcharts-legend
    &g:before
      content '最後時間'

.chart--7
  img
    left 0
    right auto
    width 25%
    transform translate(60%, 45%)

@media (min-width: 600px)
  h1
    width auto
  .marathonChart
    img
      width 25%
  .chart--2
    img
      transform translate(30%, -60%)
  .chart--3
    img
      transform translate(20%, -70%)
  .chart--7
    img
      width 20%
      transform translate(50%, -20%)

@media (min-width: 900px)
  .marathonChart
    position relative
    width 800px
    padding 5% 0
    margin 0 auto 100px
    &::after
      content ''
      display block
      position absolute
      right 0
      bottom -100px
      z-index 999
      width 35px
      height 100px
      background-image url(https://www.mirrormedia.mg/projects/images/marathon/road-03.png)
      background-size 40px auto
      background-repeat repeat-y
      background-position right top
    img
      width 25%
    &__chart
      position static
      width 70%
      &.right
        margin-left auto
        margin-right 0
  .chart--3.marathonChart::after, .chart--6.marathonChart::after, .chart--7.marathonChart::after
    display none
  .chart--5.marathonChart::after
    left 0
    right auto
  .chart--1
    img
      top auto
      right auto
      left 0
      bottom 0
      transform translate(0, 15%)
  .chart--2
    h3
      position absolute
      top 70%
      right 0
      width 25%
      transform translateY(-50%)
    img
      top 0
      right 0
      left auto
      bottom auto
      transform translate(0, -20%)
  .chart--3
    margin-bottom 0
    padding-bottom 0
    img
      top auto
      right auto
      left 0
      bottom 0
      transform translate(0, 100%)
  .chart--4
    padding-top 0
    h3
      position absolute
      top -30%
      left 0
      width 25%
      transform translateY(-50%)
  .chart--5
    img
      top 0
      right 0
      left auto
      bottom auto
      transform translate(0, -20%)
    .marathonChart__chart
      width 80%
      
  .chart--6
    margin-bottom 0
    padding-bottom 0
  .chart--7
    padding-top 0
    margin-bottom 0
    img
      top auto
      right auto
      left 10%
      bottom 0
      width 30%
      transform translate(-50%, 10%)

@media (min-width: 1100px)
  .marathonChart
    width 900px

@media (min-width: 1500px)
  .marathonChart
    width 1100px
    &::after
      width 47px
      background-size 47px auto
  .chart--2
    img
      transform translate(0, -30%)

// highcharts
#js-chart-1, #js-chart-2, #js-chart-3, #js-chart-4, #js-chart-6, #js-chart-7
  height 300px
#js-chart-5
  height 500px

</style>