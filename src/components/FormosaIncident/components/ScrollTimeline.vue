<template>
  <article class="scroll-timeline">
    <div v-for="data in timelineData.filter((data) => data.id !== 19)" :key="`timeline-wrapper${data.id}`">
      <img v-if="data.imgSrc" :src="`/proj-assets/formosaincident/img/${data.imgSrc}-mob.png`" alt="">
      <div class="scroll-timeline__text">
        <p v-if="data.date">{{ data.date }}</p>
        <div v-html="data.text"></div>
        <img class="small-map" v-if="data.smallMapName" :src="`/proj-assets/formosaincident/img/map/${data.smallMapName}.png`" alt="">
      </div>
    </div>
  </article>
</template>

<script>
import timelineData from '../constant/timeline.js'

export default {
  name: 'ScrollTimeline',
  data () {
    return {
      timelineData
    }
  }
}
</script>

<style lang="stylus">
.scroll-timeline
  background-color #7a6a56
  color #fff
  font-size 1.6rem
  line-height 1.75
  text-align center
  & img
    width 100%
    height auto
    &.small-map
      width 60%
      max-width 260px
      min-width 200px
      margin-left auto
      margin-right auto
      margin-top 21px
  &__text
    padding 28px 20px
    & p + p
      margin-top 28px
</style>