<template>
  <article class="scroll-timeline">
    <div v-for="data in timelineData.filter((data) => data.id !== 19)" :key="`timeline-wrapper${data.id}`">
      <picture>
        <source type="image/webp" :srcset="`/proj-assets/formosaincident/img/${data.imgSrc}-mob.webp`">
        <img v-if="data.imgSrc" :src="`/proj-assets/formosaincident/img/${data.imgSrc}-mob.png`" alt="">
      </picture>
      <div class="scroll-timeline__text">
        <p v-if="data.date">{{ data.date }}</p>
        <div v-html="data.text"></div>
        <picture class="small-map">
          <source type="image/webp" :srcset="`/proj-assets/formosaincident/img/map/${data.smallMapName}.webp`">
          <img v-if="data.smallMapName" :src="`/proj-assets/formosaincident/img/map/${data.smallMapName}.png`" alt="">
        </picture>
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
  & .small-map
    width 60%
    max-width 260px
    min-width 200px
    margin-left auto
    margin-right auto
    margin-top 21px
  & img
    width 100%
    height auto
  &__text
    padding 28px 20px
    & p + p
      margin-top 28px
</style>