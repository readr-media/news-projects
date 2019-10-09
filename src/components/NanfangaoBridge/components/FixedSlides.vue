<template>
  <section class="fixed-slides" ref="container">
    <div
      class="fixed-slides__graphic"
      :style="{ width: `${this.ww}px`, height: `${imgH}px` }"
      :class="{ fixed: isGraphicFixed, bottom: isGraphicBottom }"
      ref="graphic"
    >
      <img
        :src="`/proj-assets/nanfangao-bridge/img/step/step${imgId}-${imgSize}.png`"
        v-for="imgId in imgsId"
        :key="imgId"
        :class="{ active: ImgActiveId === imgId }"
        alt=""
      >
    </div>
    <div class="fixed-slides__text" v-for="(text, idx) in texts" :key="text.id" :class="{ step1: idx === 0 }">
      <p>{{ text.content }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FixedSlides',
  data () {
    return {
      wEl: null,
      htmlEl: null,
      ww: 0,
      wh: 0,
      isGraphicFixed: false,
      isGraphicBottom: false,
      ImgActiveId: 1,
      imgsId: [ 1, 2, 3, 4, 5, 6 ],
      texts: [
        {
          id: 1,
          content: '南方澳大橋在 1997 年興建，為讓船舶通過，採取類似吊橋的設計，由 13 根吊索支撐橋面，是亞洲第一座雙叉式單拱橋。'
        },
        {
          id: 2,
          content: '2019 年 10 月 1 日 9 時 30 分，南方澳跨港大橋靠海側第 6 根吊索突然斷裂。'
        },
        {
          id: 3,
          content: '第 6 根吊索斷裂後，第 8、9 根吊索也隨之斷裂。'
        },
        {
          id: 4,
          content: '其餘吊索承受的拉力逐漸變多，超過承受極限，第 10、11、12 根吊索也斷裂。'
        },
        {
          id: 5,
          content: '之後，橋面從中間呈 V 字型斷裂。'
        },
        {
          id: 6,
          content: '橋體掉落，撞擊 3 艘漁船，導致漁船沉沒於航道，橋面上行駛的油罐車也落海起火，共計有 19 名人員傷亡，6 名死者皆為移工。'
        }
      ]
    }
  },
  mounted () {
    this.wEl = window
    this.htmlEl = document.documentElement
    this.ww = Math.min(this.wEl.innerWidth, this.htmlEl.clientWidth)
    this.wh = this.wEl.innerHeight

    this.wEl.addEventListener('scroll', this.locateGraphic)
    this.wEl.addEventListener('scroll', this.changeImg)
    this.wEl.addEventListener('resize', this.alterWindowSize)
    this.wEl.addEventListener('orientationChange', this.alterWindowSize)
  },
  computed: {
    imgSize () {
      if (this.ww >= 460 && this.ww < 719.98) {
        return 'tablet-small'
      } else if (this.ww >= 720 && this.ww < 999.98) {
        return 'tablet-large'
      } else if (this.ww >= 1000 && this.ww < 1599.98) {
        return 'desktop-small'
      } else if (this.ww >= 1600) {
        return 'desktop-large'
      } else {
        return 'mobile'
      }
    },
    imgH () {
      let aspectRatio
      switch (this.imgSize) {
        case 'tablet-large':
          aspectRatio = 1.143
          break
        case 'desktop-small':
          aspectRatio = 1.143
          break
        case 'desktop-large':
          aspectRatio = 1.143
          break
        default:
          aspectRatio = 1
          break
      }
      return Math.floor(this.ww / aspectRatio)
    }
  },
  methods: {
    alterWindowSize () {
      this.ww = this.htmlEl.clientWidth
      this.wh = this.wEl.innerHeight
    },
    locateGraphic () {
      const container = this.$refs.container
      const graphic = this.$refs.graphic
      const graphicH = graphic.offsetHeight
      const { top: containerT, bottom: containerB } = container.getBoundingClientRect()
      const offsetT = (this.wh - graphicH) / 2
      const offsetB = this.wh - offsetT
      if (containerT > offsetT) {
        this.isGraphicFixed = false
      } else if (containerB <= offsetB) {
        this.isGraphicFixed = false
        this.isGraphicBottom = true
      } else {
        this.isGraphicFixed = true
        this.isGraphicBottom = false
      }
    },
    changeImg () {
      const container = this.$refs.container
      const totalImgs = this.imgsId.length
      const part = container.offsetHeight / (totalImgs + 1)
      const containerT = container.getBoundingClientRect().top
      if (containerT >= 0) return
      const intoPart = Math.ceil(Math.abs(containerT / part))
      this.ImgActiveId = (intoPart <= totalImgs ? intoPart : totalImgs)
    }
  },
  beforeDestroy () {
    this.wEl.removeEventListener('scroll', this.locateGraphic)
    this.wEl.removeEventListener('resize', this.alterWindowSize)
    this.wEl.removeEventListener('orientationChange', this.alterWindowSize)
  }
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.fixed-slides
  position relative
  margin-top 40px
  margin-bottom 40px
  background-color #404040
  @media (min-width $desktop-breakpoint)
    margin-top 30px
    margin-bottom 30px
  &__graphic
    position absolute
    top 0
    left 50%
    transform translateX(-50%)
    &.fixed
      position fixed
      top 50%
      transform translate(-50%, -50%)
    &.bottom
      top auto
      bottom 0
    & img
      width 100%
      display block
      position absolute
      top 0
      left 0
      opacity 0
      transition opacity 0.3s ease
      &.active
        opacity 1
  &__text
    position relative
    // padding-top 70vh
    padding-bottom 70vh
    z-index 9
    margin-left auto
    margin-right auto
    max-width 700px
    &.step1
      padding-top 70vh
    & p
      line-height 1.78
      color #fff
      // text-shadow 2px 2px 1px rgba(0, 0, 0, 0.5)
      text-shadow 1px 1px 2px #000000
      font-family $font-serif
      font-weight 500
      font-size 1.8rem
      padding 15px 12px
      background-color rgba(51, 51, 51, 0.6)
      @media (min-width 720px)
        font-size 2.0rem
        line-height 2
        padding 20px 25px
</style>