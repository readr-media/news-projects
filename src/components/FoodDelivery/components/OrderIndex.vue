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
          <p>閱讀時間：{{ contents[idx].time }}</p>
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
  // data () {
  //   return {
  //     isAutoScrolling: false
  //   }
  // },
  computed: {
    ...mapState([
      'contents',
      'reportIds',
      'currentReadReportId',
      'isAutoScrolling'
    ])
  },
  methods: {
    ...mapMutations([
      'changeCurrentReadReportId',
      'toggleAutoScrolling'
    ]),
    scrollToOrder (id) {
      if (this.isAutoScrolling) return
      this.toggleAutoScrolling(true)
      // this.isAutoScrolling = true
      this.changeCurrentReadReportId(id)
      const reportEl = document.getElementById(`report${this.currentReadReportId}`)
      scrollIntoView(reportEl,
        {
          time: 1000,
          align: { top: 0, left: 0 },
          ease: (t) => t * t * t * t
        }, 
        () => { this.toggleAutoScrolling(false) })
    }
  }
}
</script>

<style lang="stylus">
.order-index
  position fixed
  top 50px
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
    &:hover, &.active
      & .marker-color
        fill #000
    &:hover + .order-index__popup
      display block
  &__popup
    position absolute
    top 50%
    left 40.4px
    transform translateY(-50%)
    font-size 1.4rem
    color #4a4a4a
    padding 10px 14px
    background-color #fff
    line-height normal
    box-shadow 0 2px 4px rgba(#000, 0.5)
    display none
    @supports not ((width max-content) or (width -webkit-max-content) or (width -moz-max-content))
      min-width 210px
      padding-right 0
    & > div
      width max-content
      width -webkit-max-content
      width -moz-max-content
  &__title
    font-weight 700
  &__line
    position absolute
    top 0
    // left calc((100% - 1px) / 2)
    left 50%
    transform translateX(-50%)
    z-index -1
</style>