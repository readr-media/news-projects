<template>
  <section class="bingo-status">
    <div class="bingo-status-conencted">
      <p class="bingo-status-title">連線數</p>
      <p class="bingo-status-highlight">{{connectedLines}}</p>
    </div>
    <div class="bingo-status-elapsed">
      <p class="bingo-status-title">開票持續時間</p>
      <p class="bingo-status-highlight">
        <span v-if="remainingTimeInfo.hours < 0" v-text="`${remainingTimeInfo.hours}`" />
        <span v-else>00</span>
        <span>:</span>
        <span v-if="remainingTimeInfo.minutes < 0" v-text="`${remainingTimeInfo.hours}`" />
        <span v-else>00</span>
        <span>:</span>
        <span v-if="remainingTimeInfo.seconds < 0" v-text="`${remainingTimeInfo.seconds}`" />
        <span v-else>00</span>
      </p>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('Election2020')
export default {
  props: {
    connectedLines: Number
  },
  computed: {
    ...mapGetters({
      remainingTime: 'timer/remainingTime',
      remainingTimeInfo: 'timer/remainingTimeInfo'
    })
  }
}
</script>
<style lang="stylus" scoped>
  .bingo-status
    display: grid
    grid-column-gap: 2px
  .bingo-status-title
    font-size 0.8rem
    font-weight bold
  .bingo-status-conencted
    grid-column 1
  .bingo-status-elapsed
    grid-column 2
  .bingo-status-highlight
    font-family $font-family-serif
    color $color-black
    font-size 1.625rem
    line-height 1.42
</style>