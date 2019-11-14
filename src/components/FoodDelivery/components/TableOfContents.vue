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

// const scrollIntoView = require('scroll-into-view')

export default {
  name: 'TableOfContents',
  components: {
    UserStatus,
    MapMarker
  },
  data () {
    return {
      // todo time
      contents: [
        {
          id: 1,
          title: '如何成為外送員',
          time: '05:02'
        },
        {
          id: 2,
          title: '美食外送平台解決了什麼問題',
          time: '03:10'
        },
        {
          id: 3,
          title: '司機管理仰賴檢舉和評價',
          time: '07:28'
        },
        {
          id: 4,
          title: '外送員最害怕的事：車禍',
          time: '05:30'
        },
        {
          id: 5,
          title: '外送產業帶來的好與壞',
          time: '01:40'
        }
      ],
      lineH: 0
    }
  },
  mounted () {
    const height = this.$refs.nav.offsetHeight - 24.6
    this.lineH = (height >= 0 ? height : 0)
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
      // const reportEl = document.getElementById(`report${id}`)
      // scrollIntoView(reportEl, { time: 0, align: { top: 0, left: 0 } }, () => {
        this.changeClickedReportId(id)
        this.toggleReportContent(true)
        this.$router.push(`/project/food-delivery/order${id}`).catch((err) => {})
      // })
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.table-of-contents
  // background-image url(/proj-assets/food-delivery/img/map.jpg)
  // background-size cover
  // background-position center
  // background-repeat no-repeat
  // min-height 100vh
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
  // todo max-width
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
    min-height calc(100vh - 84px)
    @media (min-width $mobile)
      min-height calc(100vh - 120px)
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
    @media (min-width $mobile)
      padding-left 45px
      padding-right 45px
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
    // 20 + (45 - 35.8) / 2
    top 24.6px
    // 10 + (25.42 / 2) - (1 / 2)
    left 22.21px
    @media (min-width $mobile)
      // 45 + (25.42 / 2) - (1 / 2)
      left 57.21px
</style>
