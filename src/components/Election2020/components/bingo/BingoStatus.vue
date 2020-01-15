<template>
  <section class="bingo-status-root">
    <div class="bingo-status-conencted">
      <div class="bingo-status-title">連線數</div>
      <div class="bingo-status-highlight">{{connectedLines}}</div>
    </div>
    <hr/>
    <div class="bingo-status-elapsed">
      <div class="bingo-status-title">開票已結束</div>
      <div v-show="false" class="bingo-status-highlight">
        <span v-if="remainingTimeInfo.hours < 0" v-text="`${-remainingTimeInfo.hours}`" />
        <span v-else>00</span>
        <span>:</span>
        <span v-if="remainingTimeInfo.minutes < 0" v-text="`${-remainingTimeInfo.minutes}`" />
        <span v-else>00</span>
        <span>:</span>
        <span v-if="remainingTimeInfo.seconds < 0" v-text="`${-remainingTimeInfo.seconds}`" />
        <span v-else>00</span>
      </div>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('Election2020/bingo', {
      connectedLines: 'connectedLines',
    }),
    ...mapGetters('Election2020', {
      remainingTime: 'timer/remainingTime',
      remainingTimeInfo: 'timer/remainingTimeInfo'
    })
  }
}
</script>
<style lang="stylus" scoped>
.bingo-status-root
  display flex
  flex-direction row
  justify-content space-evenly
.bingo-status-title
  font-size 1rem
  font-weight bold
.bingo-status-root hr
  height 3rem
  width 0
  border 1px solid rgba(0, 0, 0, 0.6);
  
.bingo-status-conencted, .bingo-status-elapsed
  width 50%

.bingo-status-highlight
  font-family $font-family-serif
  color $color-black
  font-size 1.625rem
  line-height 1.42
  margin-top .5rem
  margin-bottom 1rem
</style>