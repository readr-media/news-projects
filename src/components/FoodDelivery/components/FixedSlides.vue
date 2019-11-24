<template>
  <section class="fixed-slides" ref="container">
    <div
      class="fixed-slides__graphic"
      :style="{ height: `${imgH}px` }"
      :class="{ fixed: isGraphicFixed, bottom: isGraphicBottom }"
      ref="graphic"
    >
      <picture v-for="(imgId, idx) in imgCount" :key="`fixed-slides-img${imgId}`" :class="{ active: ImgActiveId === imgId }">
        <source type="image/webp" :media="`(min-width: ${breakPoints[ 0 ]}px)`" :srcset="`${imgSrcs[ idx ][ 1 ]}.webp`">
        <source type="image/png" :media="`(min-width: ${breakPoints[ 0 ]}px)`" :srcset="`${imgSrcs[ idx ][ 1 ]}.png`">
        <source type="image/webp" :srcset="`${imgSrcs[ idx ][ 0 ]}.webp`">
        <img :src="`${imgSrcs[ idx ][ 0 ]}.png`" alt="" loading="lazy">
      </picture>
    </div>
    <div class="fixed-slides__text" v-for="(text, idx) in texts" :key="`fixed-slides-text${text.id}`" :class="{ step1: idx === 0 }">
      <p>{{ text.content }}</p>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('FoodDelivery')

export default {
  name: 'FixedSlides',
  props: {
    reportId: {
      type: Number
    },
    imgCount: {
      type: Number,
      required: true
    },
    imgSrcs: {
      type: Array,
      required: true
    },
    texts: {
      type: Array,
      required: true
    },
    imgAspectRatio: {
      type: Array,
      required: true
    },
    breakPoints: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isGraphicFixed: false,
      isGraphicBottom: false,
      ImgActiveId: 1,
      containerWidth: 0,
      scrolledEl: null,
    }
  },
  mounted () {
    this.scrolledEl = document.getElementById('base-report')

    this.updateContainerWidth()

    this.scrolledEl.addEventListener('scroll', this.locateGraphic)
    this.scrolledEl.addEventListener('scroll', this.changeImg)

    window.addEventListener('resize', this.updateContainerWidth)
    window.addEventListener('orientationChange', this.updateContainerWidth)
  },
  computed: {
    ...mapState([
      'isReportContent',
      'currentReadReportId',
      'isAutoScrolling'
    ]),
    imgH () {
      const aspectRatio = this.imgAspectRatio[ this.ww >= this.breakPoints[0] ? 1 : 0 ] 
      return Math.floor(this.containerWidth / aspectRatio)
    },
    ww () {
      return this.$store.state.viewport[0]
    },
    wh () {
      return this.$store.state.viewport[1]
    }
  },
  methods: {
    updateContainerWidth () {
      this.containerWidth = this.$refs.container.offsetWidth
    },
    locateGraphic () {      
      if (this.reportId !== this.currentReadReportId || !this.isReportContent || this.isAutoScrolling) return
      
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
      const part = container.offsetHeight / (this.imgCount + 1)
      const containerT = container.getBoundingClientRect().top
      if (containerT >= 0) return
      const intoPart = Math.ceil(Math.abs(containerT / part))
      this.ImgActiveId = (intoPart <= this.imgCount ? intoPart : this.imgCount)
    }
  },
  watch: {
    isReportContent (newVal) {
      if (newVal) {
        this.updateContainerWidth()
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateContainerWidth)
    window.removeEventListener('orientationChange', this.updateContainerWidth)
  }
}
</script>

<style lang="stylus">
.fixed-slides
  position relative
  &__graphic
    position absolute
    width 100%
    top 0
    &.fixed
      position fixed
      top 50%
      transform translateY(-50%)
    &.bottom
      top auto
      bottom 0
    & picture
      width 100%
      height 100%
      display block
      position absolute
      top 0
      left 0
      opacity 0
      &.active
        opacity 1
    & img
      display block
      width 100%
      height 100%
  &__text
    position relative
    z-index 9
    margin-left auto
    margin-right auto
</style>