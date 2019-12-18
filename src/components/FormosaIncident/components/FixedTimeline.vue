<template>
  <article class="fixed-timeline">
    <div class="fixed-timeline__bg">
      <img v-for="data in timelineData.filter((data) => data.id !== 28)" :src="`/proj-assets/formosaincident/img/${data.imgSrc}-desk.png`" alt="" :key="`img${data.id}`" :id="`timeline-img${data.id}`">
    </div>
    <div class="fixed-timeline__text-container">
      <div class="fixed-timeline__text-wrapper" v-for="data in timelineData.filter((data) => data.id !== 19)" :key="`text${data.id}`" :id="`timeline-text${data.id}`">
        <p class="date" v-if="data.date">{{ data.date }}</p>
        <div v-html="data.text"></div>
      </div>
    </div>
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
    this.animateTimeline()
  },
  methods: {
    animateTimeline () {
      const controller = new ScrollMagic.Controller()
      const specials = [ 19, 28 ]
      for (let id = 1; id < timelineData.length; id++) {
        if (specials.includes(id) || specials.includes(id + 1)) { continue }

        const tl = new TimelineLite()
        tl.to(`#timeline-img${id}`, 0.3, { opacity: 0 })
        tl.to(`#timeline-img${id + 1}`, 0.3, { opacity: 1, scale: 1 })
        new ScrollMagic.Scene({
          triggerElement: `#timeline-text${id + 1}`,
          duration: '40%'
        })
        .setTween(tl)
        .addTo(controller)
        // .addIndicators()
      }
    }
  }
}
</script>

<style lang="stylus">
.fixed-timeline
  &__bg
    position fixed
    top 0
    left 0
    width 100%
    height 100vh
    background-image linear-gradient(to bottom, #000000, #7a6a56)
    // background-color #000
    // opacity 0
    & img
      top 0
      right 0
      position absolute
      width 72%
      height 100%
      object-fit cover
      // object-fit contain
      margin-left auto
      opacity 0
      transform scale(1.02)
      &:first-child
        opacity 1
        transform scale(1)
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
      height 100%
      // left 14.75%
      left 4.1vw
  &__text-wrapper
    padding-top 40vh
    padding-bottom 40vh
    font-size 1.6rem
    line-height 2.19
    // margin-left 24.5%
    margin-left 6.81vw
    padding-right 2.71vw
    // padding-right 15px
    // padding 40vh 2.71vw 40vh 6.81vw
    position relative
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
    // background-image linear-gradient(to bottom, #000000, #7a6a56)
</style>
