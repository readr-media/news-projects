<template>
  <article class="fixed-timeline">
    <div class="fixed-timeline__bg" ref="bg">
      <div class="fixed-timeline__img-container">
        <img v-for="data in timelineData.filter((data) => data.id !== 28)" :src="`/proj-assets/formosaincident/img/${data.imgSrc}-desk.png`" alt="" :key="`img${data.id}`" :ref="`img${data.id}`">
      </div>
    </div>
    
    <div class="fixed-timeline__text-container" ref="textContainer">
      <div class="fixed-timeline__text-wrapper" v-for="data in timelineData.filter((data) => data.id !== 19)" :key="`text${data.id}`" :ref="`text${data.id}`">
        <p class="date" v-if="data.date">{{ data.date }}</p>
        <div v-html="data.text"></div>
        <img class="small-map" v-if="data.smallMapName" :src="`/proj-assets/formosaincident/img/map/${data.smallMapName}.png`" alt="">
      </div>
    </div>
    <div ref="end"></div>
  </article>
</template>

<script>
import timelineData from '../constant/timeline.js'

export default {
  name: 'FixedTimeline',
  data () {
    return {
      timelineData
    }
  },
  mounted () {
    this.fixedTimeline()
    this.animateTimeline()
  },
  methods: {
    fixedTimeline () {
      const { textContainer, bg } = this.$refs

      const controller = new ScrollMagic.Controller()
      new ScrollMagic.Scene(this.setScrollScene(textContainer, 0, 0))
        .on('start', (e) => {
          if (e.scrollDirection === 'FORWARD') {
            bg.classList.add('fixed')
          } else {
            bg.classList.remove('fixed')
          }
        })
        .addTo(controller)
    },
    animateTimeline () {
      const { end, textContainer, bg, img17, img18, img19, img27, img29, text18, text29 } = this.$refs
      const controller = new ScrollMagic.Controller()
      const specials = [ 18, 28 ]

      for (let id = 1; id < timelineData.length; id++) {
        if (specials.includes(id) || specials.includes(id + 1)) { continue }

        const tween = new TimelineLite()
        tween.to(this.$refs[ `img${id}` ], 0.3, { opacity: 0 })
        tween.to(this.$refs[ `img${id + 1}` ], 0.3, { opacity: 1, scale: 1 })
        new ScrollMagic.Scene(this.setScrollScene(this.$refs[ `text${id + 1}` ]))
        .setTween(tween)
        .addTo(controller)
        // .addIndicators()
      }

      const tween1 = new TimelineLite()
      tween1.to(img17, 0.3, { opacity: 0 })
      tween1.to(img18, 0.3, { opacity: 1, scale: 1 })
      tween1.to(img18, 0.3, { opacity: 0 })
      tween1.to(img19, 0.3, { opacity: 1, scale: 1 })
      new ScrollMagic.Scene(this.setScrollScene(text18, 0.5, '120%'))
        .setTween(tween1)
        .addTo(controller)
        // .addIndicators()

      const tween2 = new TimelineLite()
      tween2.to(img27, 0.3, { opacity: 0 })
      tween2.to(img29, 0.3, { opacity: 1, scale: 1 })
      new ScrollMagic.Scene(this.setScrollScene(text29))
        .setTween(tween2)
        .addTo(controller)
        // .addIndicators()
      
      new ScrollMagic.Scene(this.setScrollScene(end, 1, 0))
        .on('start', (e) => {
          const textContainerH = textContainer.getBoundingClientRect().height
          const wh = this.$store.state.viewport[ 1 ]

          if (e.scrollDirection === 'FORWARD') {
            bg.classList.add('pos-a')
            bg.style.marginTop = `${textContainerH - wh}px`
          } else {
            bg.classList.remove('pos-a')
            bg.style.marginTop = 0
          }
        })
        .addTo(controller)
    },
    setScrollScene (triggerElement, triggerHook = 0.5, duration = '40%') {
      return {
        triggerElement,
        triggerHook,
        duration
      }
    }
  }
}
</script>

<style lang="stylus">
.fixed-timeline
  position relative
  &__bg
    position absolute
    top 0
    left 0
    width 100%
    height 100vh
    background-image linear-gradient(to bottom, #000000, #7a6a56)
    &.fixed
      position fixed
    &.pos-a
      position absolute
    & img
      top 0
      right 0
      position absolute
      width 100%
      height 100%
      object-fit cover
      opacity 0
      transform scale(1.02)
      &:first-child
        opacity 1
        transform scale(1)
  &__img-container
    width 72%
    height 100%
    margin-left auto
    position relative
    background-color #000
  &__text-container
    position relative
    width 28%
    color #fff
    &::before
      content ''
      position absolute
      display block
      width 2px
      top 42vh
      background-color #fff
      height calc(100% - 42vh)
      left 4.1vw
  &__text-wrapper
    padding-top 40vh
    padding-bottom 40vh
    font-size 1.6rem
    line-height 2.19
    margin-left 6.81vw
    padding-right 2.71vw
    position relative
    &:nth-child(18)
      padding-bottom 120vh
    &:nth-child(27)
      padding-bottom 0
    & p + p
      margin-top 35px
    &::before, &::after
      content ''
      position absolute
      display block
      width 20px
      height 20px
      border-radius 50%
      left calc(-2.71vw - 9px)
    &::before
      background-color #fff
      // 35 - 20 / 2 = 7.5
      top calc(40vh + 7.5px)
    &::after
      // 7.5 + 12 = 19.5
      top calc(40vh + 19.5px)
      border 1px solid #fff
    & .date
      font-size 2.1rem
      font-weight 500
      line-height 1.67
      margin-bottom 20px
    & .small-map
      width 100%
      height auto
      margin-top 128px
      max-width 260px
</style>
