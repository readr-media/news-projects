<template>
  <section class="section">
    <h1>2020</h1>
    <h2>區域及原住民立委</h2>
    <h3 v-text="h3" />
    <Chart class="section__chart" />
    <Seats class="section__seats" />
  </section>
</template>

<script>
import Chart from './Chart.vue'
import Seats from './Seats.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('Election2020')

export default {
  components: {
    Chart,
    Seats
  },
  computed: {
    ...mapGetters({
      isElectionBoxOpeningStart: 'timer/isElectionBoxOpeningStart'
    }),
    h3() {
      return this.isElectionBoxOpeningStart ? '各選區開票狀態' : '尚未開票'
    }
  }
}
</script>

<style lang="stylus" scoped>
.section
  h1
    font-family $font-family-serif
    font-size 36px
    color $color-black
    text-align center
    font-weight 900
    line-height 1
    margin 0
  h2
    font-family $font-family-serif
    font-size 21px
    color $color-black
    text-align center
    font-weight bold
    line-height 1.14
    margin 28px 0 0 0
  h3
    font-size 15px
    color $color-black
    text-align center
    font-weight normal
    line-height 1.87
    margin 11px 0 0 0
  &__seats
    margin 71px 0 0 0

@media (min-width 768px)
  .section
    max-width 1152px
    margin 0 auto
    h1
      font-size 48px
    h2
      font-size 30px
      text-align left
    h3
      font-size 16px
      text-align left
      margin 19px 0 0 0
      float left
    &__seats
      margin 13px 0 0 0
</style>
