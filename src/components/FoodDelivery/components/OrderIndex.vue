<template>
  <div class="order-index">
    <MapMarker
      :num="id"
      v-for="id in reportIds"
      :key="`order-index${id}`"
      :class="[ { active: currentReadReportId === id }, 'order-index__marker']"
      @click.native="scrollToOrder(id)"
    />
    <svg class="order-index__line" width="1" height="259" xmlns="http://www.w3.org/2000/svg"><path d="M.5 0v259" stroke="#979797" fill="none" fill-rule="evenodd" stroke-dasharray="6" stroke-linecap="square"/></svg>
  </div>
</template>

<script>
const scrollIntoView = require('scroll-into-view')

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('FoodDelivery')

import MapMarker from './MapMarker.vue'

export default {
  name: 'OrderIndex',
  components: {
    MapMarker
  },
  computed: {
    ...mapState([
      'reportIds',
      'currentReadReportId',
    ])
  },
  methods: {
    ...mapMutations([
      'changeCurrentReadReportId'
    ]),
    scrollToOrder (id) {
      this.changeCurrentReadReportId(id)
      const reportEl = document.getElementById(`report${this.currentReadReportId}`)
      // todo ease & time
      scrollIntoView(reportEl, { align: { top: 0, left: 0 } })
    }
  }
}
</script>

<style lang="stylus">
.order-index
  // position absolute
  position fixed
  top 50px
  // left 0
  width calc((100% - 600px) / 2)
  max-width 100px
  display flex
  flex-direction column
  align-items center
  z-index 199
  &__marker
    width 25.42px
    height 35.8px
    cursor pointer
    position relative
    &.active, &:hover
      & .marker-color
        fill #000
    & + .order-index__marker
      margin-top 20px
  &__line
    position absolute
    top 0
    left 50%
    transform translateX(-50%)
    z-index -1
</style>