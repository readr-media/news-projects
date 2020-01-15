<template>
  <header class="header">
    <p class="header__station-name" v-text="stationPrev"></p>
    <AppHeaderTimeline class="header__timeline" :time="time"/>
    <p class="header__station-name" v-text="stationNext"></p>
  </header>
</template>

<script>
import AppHeaderTimeline from './AppHeaderTimeline.vue'

export default {
  props: {
    stationPrev: {
      type: String,
      required: true,
    },
    stationNext: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: '00:00:00'
    }
  },
  components: {
    AppHeaderTimeline
  }
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  justify-content center
  align-items flex-end
  width 100%
  height 70px
  padding 0 0 10px 0
  background-color white
  &__station-name
    font-size 16px
  &__timeline
    margin 0 11px 4px 11px
</style>

