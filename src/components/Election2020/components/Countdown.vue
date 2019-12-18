<template>
  <div class="countdown">
    <template v-if="remainingTime >= 0">
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

const COUNTING_START_TIME = '2020-01-11T16:00:00+0800' // ISO 8601

export default {
  name: 'Countdown',
  props: {
    updateTime: {
      type: Date,
      default: () => new Date(COUNTING_START_TIME)
    }
  },
  data () {
    return {
      currentTime: new Date().toISOString(),
      timer: undefined
    }
  },
  computed: {
    remainingTime () {
      return new Date(COUNTING_START_TIME) - new Date(this.currentTime)
    },
    remainingTimeInfo () {
      const end = moment(COUNTING_START_TIME)
      const now = moment(this.currentTime)
      const diff = moment.duration(end.diff(now))
      return {
        days: diff.days(),
        hours: diff.hours(),
        minutes: diff.minutes(),
        seconds: diff.seconds()
      }
    }
  },
  watch: {
    remainingTime (value) {
      value < 0 && clearInterval(this.timer)
    }
  },
  mounted () {
    if (!this.timer) {
      this.timer = setInterval(() => this.currentTime = new Date().toISOString(), 1000)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    moment
  }
}
</script>
<style lang="stylus" scoped>
@import '../styles/common.styl'

.countdown
  display inline-block
  padding .4em 1.2em
  font-size .9375rem
  line-height 1.87
  background-color rgba(216, 216, 216, 0.3)
  span
    color $color-black-light
</style>