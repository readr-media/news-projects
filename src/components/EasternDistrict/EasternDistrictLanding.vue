<template>
  <section class="landing">
    <div class="landing-container">
      <div class="map-container">
        <div id="map" class="map"></div>
        <h1><span>東區沒落</span><br>不只是租金問題</h1>
        <div class="legend">
          <p class="legend__year">{{ currentYear }} 年</p>
          <div class="legend__info">
            <p class="open"><span>開店</span><span>{{ openAmount }} 家</span></p>
            <p class="close"><span>關店</span><span>{{ closeAmount }} 家</span></p>
          </div>
        </div>
      </div>
      <div class="brief">
        <h1><span>東區沒落</span><br>不只是租金問題</h1>
        <p>今年年初，營業超過 40 年的東區老字號餐聽「永福樓」歇業，業者對外表示是租金不堪負荷所致，為「東區沒落」的說法再上添一筆。近一兩年，「國際名店出走」、「東區老店歇業」的新聞多次躍上媒體版面。東區名店的熄燈是個案還是東區真的在走下坡？READr 從數據走進東區，看看東區到底怎麼了？</p>
      </div>
    </div>
  </section>
</template>
<script>
import * as d3 from 'd3'
import { mapStyle } from './config'

export default {
  name: 'EasternDistrictLanding',
  data () {
    return {
      currentYear: 101,
      data: [],
      inited: false,
      timer: undefined
    }
  },
  computed: {
    closeAmount () {
      return this.data.filter(item => item.year == this.currentYear && item.status === 'dismiss').length
    },
    openAmount () {
      return this.data.filter(item => item.year == this.currentYear && item.status === 'setup').length
    }
  },
  mounted () {
    if (window.google) {
      this.initMap()
    } else {
      this.timer = setInterval(this.handleInterval, 1000)
    }
  },
  methods: {
    handleInterval () {
      if (!this.inited && window.google) {
        this.initMap()
      } else if (this.inited) {
        clearInterval(this.timer)
      }
    },
    initMap () {
      this.inited = true
      const lat = this.$store.state.viewport[0] >= 1200 ? 25.0412406 : 25.0435151
      const lng = this.$store.state.viewport[0] >= 1200 ? 121.5492358 : 121.5491499
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 16,
        disableDefaultUI: true,
        draggable: false,
        styles: mapStyle
      })
      
      d3.csv('/proj-assets/eastern-district/data-compress.csv')
        .then(data => {
          this.data = data
          let current = 101
          for (let i = 1; i < 9; i+=1) {
            const year = 100 + i
            const filtered = data.filter(item => item.year == year)
            createOverlay(this, year, filtered)
          }

          function createOverlay (vue, year, dataFiltered) {
            const overlay = new google.maps.OverlayView()
            overlay.onAdd = function () {
              const layerOpen = d3.select(this.getPanes().overlayLayer).append('div').attr('class', `stores open overlay-${year}`)
              const layerClose = d3.select(this.getPanes().overlayLayer).append('div').attr('class', `stores close overlay-${year}`)
              overlay.draw = function () {
                const projection = this.getProjection()
                const padding = 10
                const open = dataFiltered.filter(item => item.status === 'setup')
                const close = dataFiltered.filter(item => item.status === 'dismiss')
                drawRect(layerOpen, projection, open, padding)
                drawRect(layerClose, projection, close, padding)
              }
              if (year === 101) {
                const defaultOverlay = [ ...document.querySelectorAll('.overlay-101')]
                defaultOverlay.map(item => item.classList.add('active'))
              }
              if (year === 108) {
                setInterval(() => {
                  current += 1
                  current > 108 ? current = 101 : ''
                  vue.currentYear = current
                  const overlays = [ ...document.querySelectorAll('.stores')]
                  const nextOverlay = [ ...document.querySelectorAll(`.overlay-${current}`)]
                  overlays.map(item => item.classList.remove('active'))
                  nextOverlay.map(item => item.classList.add('active'))
                }, 2000)
              }
            }
            overlay.setMap(map)
          }

          function drawRect (layer, projection, data, padding) {
            const marker = layer.selectAll('svg')
              .data(data)
              .each(function (d) {
                d = new google.maps.LatLng(d.lat, d.lng)
                d = projection.fromLatLngToDivPixel(d)
                return d3.select(this)
                  .style("left", (d.x - padding) + "px")
                  .style("top", (d.y - padding) + "px")
              })
              .enter().append('svg')
              .each(function (d) {
                d = new google.maps.LatLng(d.lat, d.lng)
                d = projection.fromLatLngToDivPixel(d)
                return d3.select(this)
                  .style("left", (d.x - padding) + "px")
                  .style("top", (d.y - padding) + "px")
              })
              .attr('class', `marker`)
            marker
              .append('rect')
              .attr('width', randomRect)
              .attr('height', randomRect)
              .attr('x', padding)
              .attr('y', padding)
          }

          function randomRect () {
            return Math.floor(Math.random()*4) + 3
          }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.landing
  background-color #1a1a1a
  h1, p
    margin 0
  h1
    font-size 2.25rem
    line-height normal
    span
      font-size 3.375rem
  .map-container
    position relative
    height 100vh
    h1
      position absolute
      top 70px
      left 5%
    .map
      height 100%
  .legend
    position absolute
    left 0
    bottom -1px
    width 100%
    padding .5em 5%
    color #fff
    background-color #1a1a1a
    &__year
      font-size 1.5rem
    &__info
      display flex
      justify-content space-between
      margin-top .5em
      p
        &::before
          content ''
          display inline-block
          width 10px
          height 10px
          margin-right .5em
        &.open
          &::before
            background-color #ffd41f
        &.close
          &::before
            background-color #326d8e
      span
        & + span
          margin-left .5em
  .brief
    padding 1.5em 0
    background-color #1a1a1a
    h1
      display none
    p
      width 90%
      margin 0 auto
      font-size 1.25rem
      text-align justify
      line-height 1.7

  >>> .stores
    position absolute
    opacity 0
    transition opacity .5s
    svg
      position absolute
      width 60px
      height 20px
      font 10px sans-serif
    &.active
      opacity 1
    &.open
      rect
        fill #ffd41f
    &.close
      rect
        fill #326d8e


@media (min-width: 768px)
  .landing
    .map-container
      h1
        left 20%
    .legend
      padding 1.5em 20%
    .brief
      padding 3em 0
      p
        width 60%

@media (min-width: 1200px)
  .landing
    display flex
    justify-content center
    align-items center
    height 100vh
    h1
      font-size 3.75rem
      span
        font-size 6.25rem
    &-container
      display flex
      width 90%
      height 75vh
      margin 0 auto
    .map-container
      flex 1
      height auto
      h1
        display none
    .legend
      display flex
      justify-content center
      align-items center
      padding .5em 0
      &__info
        margin 0 0 0 50px
        p
          & + p
            margin-left 50px
    .brief
      width 540px
      padding 0
      margin-left 50px
      h1
        display block
      p
        width auto
        margin-top 50px
</style>
