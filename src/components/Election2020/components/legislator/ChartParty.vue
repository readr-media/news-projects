<template>
  <div class="chart-wrapper">
    <div class="chart-wrapper__y-ticks y-ticks">
      <p class="y-ticks__top-tick">
        50%
      </p>
      <div class="y-ticks__five-percent-tick five-percent-tick">
        <p class="five-percent-tick__text">
          5%
        </p>
      </div>
      <p class="y-ticks__bottom-tick">
        0%
      </p>
    </div>
    <transition-group
      name="flip-list"
      tag="div"
      class="chart-wrapper__chart chart"
    >
      <Bar
        class="chart__bar"
        v-for="party in dataChart"
        :key="party.partyCode"
        :partyName="party.name"
        :color="mapColor(party)"
        :votePercentage="party.r"
        :voteCount="party.tks"
      />
    </transition-group>
    <Legends class="chart-wrapper__legends" />
  </div>
</template>

<script>
import Bar from './ChartPartyBar.vue'
import Legends from './ChartPartyLegends.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    Bar,
    Legends
  },
  computed: {
    ...mapGetters({
      dataChart: 'realtimeLegislatorsParty/dataChart'
    })
  },
  methods: {
    mapColor({ name = '', r = 0 }) {
      if (r < 0.05) {
        return 'default'
      }

      const map = {
        民進黨: 'green',
        國民黨: 'blue'
      }

      if (!Object.keys(map).includes(name)) {
        return 'others'
      } else {
        return map[name]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.flip-list-move {
  transition: transform 1s;
}

.chart-wrapper
  position relative
  padding 0 10px
  &__y-ticks
    position absolute
    top 0
    left 10px
  &__legends
    margin 16px 0 0 0

.y-ticks
  width calc(100vw - 20px)
  height 238px
  pointer-events none
  border-top 1px solid rgba(0, 0, 0, 0.3)
  border-bottom 1px solid rgba(0, 0, 0, 0.3)
  z-index 499
  &__top-tick
    position absolute
    top -16px
    right 0
    margin 0
    font-size 13px
    font-weight bold
    font-family $font-family-serif
    color $color-black-lighter
  &__five-percent-tick
    position absolute
    bottom 23.8px // 50% is 238px, so 5% is 23.8px
    left 0
  &__bottom-tick
    position absolute
    bottom 1px
    right 0
    margin 0
    font-size 13px
    font-weight bold
    font-family $font-family-serif
    color $color-black-lighter

.five-percent-tick
  width 100%
  height 2px
  background-color black
  &__text
    position absolute
    right 0
    bottom 10px
    font-size 26px
    font-family $font-family-serif
    font-weight bold
    margin 0

.chart
  display flex
  align-items flex-end
  overflow-y scroll
  min-height 288px

@media (min-width 768px)
  .chart-wrapper
    padding 0
    width 95%
    &__y-ticks
      left 0
    &__legends
      margin 32px 0 0 0
      width 105%

  .y-ticks
    width 100%
    &__top-tick
      font-size 14px
      top -8px
      right -40px
    &__bottom-tick
      font-size 14px
      bottom -8px
      right -40px

  .five-percent-tick
    &__text
      font-size 30px
      right -50px
      bottom -12px

  .chart
    overflow-y hidden
</style>