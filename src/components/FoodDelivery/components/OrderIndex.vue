<template>
  <div class="order-index">
    <div class="order-index__wrapper" v-for="(reportId, idx) in reportIds" :key="`order-index${reportId}`">
      <MapMarker
        :num="reportId"
        :class="[ { active: currentReadReportId === reportId }, 'order-index__marker']"
        @click.native="scrollToOrder(reportId)"
      />
      <div class="order-index__popup">
        <div>
          <p class="order-index__title">{{ contents[idx].title }}</p>
          <p>預估時間：{{ contents[idx].time }}</p>
        </div>
      </div>
    </div>
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
      'contents',
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
  &__wrapper
    position relative
    & + .order-index__wrapper
      margin-top 20px
  &__marker
    width 25.42px
    height 35.8px
    cursor pointer
    user-select none
    display block
    // position relative
    &.active, &:hover
      & .marker-color
        fill #000
    &:hover + .order-index__popup
      visibility visible
  &__popup
    position absolute
    top 50%
    left 61.4px
    transform translateY(-50%)
    font-size 1.4rem
    color #4a4a4a
    padding 10px 14px
    background-color #fff
    line-height normal
    visibility hidden

    width max-content
    width -webkit-max-content
    width -moz-max-content
    @supports not ((width max-content) or (width -webkit-max-content) or (width -moz-max-content))
      min-width 210px
      padding-right 0
    // todo 箭頭長寬、陰影
    &:before
      content ''
      display block
      position absolute
      left -20px
      top 50%
      transform translateY(-50%)
      width 0
      height 0
      border-style solid
      border-width 13px 20px 13px 0
      border-color transparent #fff transparent transparent
  &__title
    font-weight 700
  &__line
    position absolute
    top 0
    left 50%
    transform translateX(-50%)
    z-index -1
</style>