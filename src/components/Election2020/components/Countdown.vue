<template>
  <div class="countdown">
    <template v-if="!isElectionBoxOpeningStart">
      <span>離開票還有 </span>
      <span v-if="remainingTimeInfo.days > 0" v-text="`${remainingTimeInfo.days} 日 `" />
      <span v-if="remainingTimeInfo.hours > 0" v-text="`${remainingTimeInfo.hours} 時 `" />
      <span v-if="remainingTimeInfo.minutes > 0" v-text="`${remainingTimeInfo.minutes} 分 `" />
      <span v-if="remainingTimeInfo.seconds > 0" v-text="`${remainingTimeInfo.seconds} 秒`" />
    </template>
    <template v-else>
      <span>最後更新時間 </span>
      <span v-text="moment(updateTime).format('HH:mm:ss')" />
    </template>
  </div>
</template>
<script>

import moment from 'moment'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('Election2020')

import { COUNTING_START_TIME } from '../../../store/modules/Election2020/modules/timer.js'

export default {
  name: 'Countdown',
  props: {
    updateTime: {
      type: Date,
      default: () => new Date(COUNTING_START_TIME)
    }
  },
  computed: {
    ...mapGetters({
      remainingTime: 'timer/remainingTime',
      remainingTimeInfo: 'timer/remainingTimeInfo',
      isElectionBoxOpeningStart: 'timer/isElectionBoxOpeningStart'
    })
  },
  methods: {
    moment
  }
}
</script>
<style lang="stylus" scoped>
.countdown
  display inline-block
  padding .4em 1.2em
  font-size .9375rem
  line-height 1.87
  background-color rgba(216, 216, 216, 0.3)
  span
    color $color-black-light
</style>