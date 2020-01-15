<template>
  <div class="order-index">
    <div class="order-index__wrapper" v-for="(reportId, idx) in reportIds" :key="`order-index${reportId}`">
      <MapMarker
        :num="reportId"
        :class="[ { active: currentReadReportId === reportId }, 'order-index__marker']"
        @click.native="handleClick(reportId)"
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
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('FoodDelivery')

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
      'currentReadReportId'
    ])
  },
  methods: {
    ...mapActions([
      'scrollToOrder'
    ]),
    handleClick (id) {
      this.scrollToOrder({ id })
      let gaLabel = ''
      switch (id) {
        case 1:
          gaLabel = '如何成為外送員'
          break
        case 2:
          gaLabel = '美食外送平台解決了什麼問題'
          break
        case 3:
          gaLabel = '司機管理仰賴檢舉和評價'
          break
        case 4:
          gaLabel = '外送員最害怕的事：車禍'
          break
        case 5:
          gaLabel = '平台經濟帶來的好與壞'
          break
        default:
          break
      }
      window.ga('send', 'event', 'projects', 'click', `索引-${gaLabel}`)
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
    left 50%
    transform translateX(-50%)
    z-index -1
</style>