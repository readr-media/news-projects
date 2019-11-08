<template>
  <section class="table-of-contents">
    <UserStatus />
    <nav ref="nav">
      <svg class="table-of-contents__line" width="1" :height="lineH" xmlns="http://www.w3.org/2000/svg"><path :d="`M.5 0v${lineH}`" stroke="#979797" fill="none" fill-rule="evenodd" stroke-dasharray="6" stroke-linecap="square"/></svg>
      <ul>
        <li v-for="content in contents" :key="`content-${content.id}`" @click="showReport(content.id)">
        <!-- <li v-for="content in contents" :key="`content-${content.id}`" @click="$emit('showReport', content.id)"> -->
          <div class="table-of-contents__num">
            <MapMarker :num="content.id" />
          </div>
          <div class="table-of-contents__text">
            <p class="table-of-contents__title">{{ content.title }}</p>
            <p class="table-of-contents__time">預估時間：{{ content.time }}</p>
          </div>
          <!-- <div class="table-of-contents__arrow"> -->
          <img class="table-of-contents__arrow" src="/proj-assets/food-delivery/img/enter--comp.svg" alt="">
          <!-- </div> -->
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('FoodDelivery')

import UserStatus from './UserStatus.vue'
import MapMarker from './MapMarker.vue'

export default {
  name: 'TableOfContents',
  components: {
    UserStatus,
    MapMarker
  },
  data () {
    return {
      contents: [
        {
          id: 1,
          title: '外送業的難題',
          time: '02 : 30'
        },
        {
          id: 2,
          title: '我要如何成為外送員？',
          time: '05 : 15'
        },
        {
          id: 3,
          title: '市場龍頭大戰：開拓店家',
          time: '07 : 56'
        },
        {
          id: 4,
          title: '消費者促銷優惠',
          time: '06 : 38'
        },
        {
          id: 5,
          title: '為了賺更多錢剝削外送員',
          time: '04 : 40'
        }
      ],
      lineH: 0
    }
  },
  mounted () {
    this.lineH = this.$refs.nav.offsetHeight - 24.6
  },
  // computed: {
  //   ...mapState([
  //     'isReportContent',
  //     'isInfo'
  //   ])
  // },
  methods: {
    ...mapMutations([
      'toggleReportContent',
      'changeClickedReportId'
    ]),
    showReport (id) {
      this.toggleReportContent(true)
      this.changeClickedReportId(id)
      this.$router.push(`/project/food-delivery/order${id}`).catch((err) => {})
    }
  }
}
</script>

<style lang="stylus">
.table-of-contents
  // background-image url(/proj-assets/food-delivery/img/map.jpg)
  // background-size cover
  // background-position center
  // background-repeat no-repeat
  min-height 100vh
  background-color rgba(#000, 0.3)
  overflow hidden
  // &.hide
  //   visibility hidden
  & nav
    position relative
  &__num
    width 25.42px
    height 35.8px
    margin-right 10px
    user-select none
    z-index 1
  &__text
    color #4a4a4a
    line-height normal
    transition all 0.2s
  &__title
    font-size 1.8rem
  &__time
    font-size 1.4rem
  &__arrow
    width 20px
    margin-left auto
  & ul
    background-color #ffdc03
    border-top-left-radius 24px
    border-top-right-radius 24px
    // padding-top 10px
    overflow hidden
    background-color #ffdc03
    height calc(100vh - 84px)
  & li
    background-color #ffdc03
    padding-left 10px
    padding-right 20px
    padding-top 10px
    padding-bottom 10px
    display flex
    align-items center
    cursor pointer
    transition background-color 0.2s
    &:first-child
      padding-top 20px
    &:hover
      background-color #ffec78
      & .table-of-contents__text
        font-weight 500
        color #000
      & .marker-color
        fill #000
  &__line
    position absolute
    top 24.6px
    left 22.205px
</style>
