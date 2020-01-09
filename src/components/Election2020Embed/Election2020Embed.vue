<template>
  <section class="election-2020-embed">
    <div class="title">
      <div class="color-text left">
        <span>總</span>
        <span>統</span>
        <span>大</span>
        <span>選</span>
      </div>
      <h1>2020 總統大選即時看</h1>
      <div class="color-text right">
        <span>2</span>
        <span>0</span>
        <span>2</span>
        <span>0</span>
      </div>
    </div>
    <div class="real-time-president">
      <div
        v-for="(candidate, number) in presidentData"
        :key="`candidate-${number}`"
        :class="mapPresidentPartyAbbrEn(number)"
        class="real-time-president__block"
      >
        <div class="real-time-president__count">
          <div>
            <span class="name">{{ getPresidentName(number) }}</span><br><span class="label">得票數</span><br>
            <span class="count"><Counter :count="candidate.tks" /></span>
          </div>
        </div>
        <div class="real-time-president__ratio">
          <div class="bar" :style="{ width: `${candidate.R}%` }" />
          <span v-text="getPresidentParty(number)"></span>
          <span><Counter :count="candidate.R" :decimals="2" />%</span>
        </div>
      </div>
    </div>
    <div class="news-and-btn">
      <NewsTicker :news="news" />
      <div class="link">
        <span>想看更多即時開票資訊嗎？</span>
        <a
          href="https://www.readr.tw/project/election-2020"
          target="_blank"
          @click="sendGaClick"
        >
          前往 2020 總統大選即時看
        </a>
      </div>
    </div>
  </section>
</template>
<script>
import { mapPresidentPartyAbbrEn } from '../Election2020/utility/mappings'
import Counter from '../Election2020/components/Counter.vue'
import NewsTicker from '../Election2020Embed/NewsTicker.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('realtimePresidents')
const { mapGetters: mapGettersUpdate } = createNamespacedHelpers('realtimeUpdate')

export default {
  name: 'Election2020Embed',
  components: {
    Counter,
    NewsTicker
  },
  metaInfo() {
    return {
      title: '2020 總統立委大選即時看',
      description: '2020 總統立委選舉將於1月11日舉行，READr 將呈現即時開票結果、即時快訊，讓你隨時掌握最新資訊！',
      metaUrl: 'election2020',
      metaImage: 'election2020/images/ogimage.jpg',
    }
  },
  computed: {
    ...mapGetters({
      presidentData: 'dataWithoutId'
    }),
    ...mapGettersUpdate({
      news: 'dataWithoutId'
    })
  },
  created () {
    this.$store.dispatch('realtimePresidents/openDBChannel')
    this.$store.dispatch('realtimeUpdate/openDBChannel')
  },
  beforeMount () {
    document.querySelector('html').classList.add('iframe')
  },
  filters: {
    comma (value) {
      return value ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''
    }
  },
  methods: {
    getPresidentName (number) {
      const mapping = {
        '1': '宋楚瑜',
        '2': '韓國瑜',
        '3': '蔡英文'
      }
      return mapping[number]
    },
    getPresidentParty (number) {
      const mapping = {
        '1': '親民黨',
        '2': '國民黨',
        '3': '民進黨'
      }
      return mapping[number]
    },
    mapPresidentPartyAbbrEn,
    sendGaClick () {
      window.ga('send', 'event', 'projects', 'click', 'iframe to website', { nonInteraction: false })
    }
  }
}
</script>
<style lang="stylus" scoped>

$color-grey = rgba(216, 216, 216, .3)

.election-2020-embed
  background-color $color-grey
  .title
    position relative
    h1
      margin 0
      padding 17px 0
      color rgba(0, 0, 0, .87)
      font-size .9375rem
      font-family $font-family-serif
      text-align center
    .color-text
      position absolute
      top 50%
      transform translateY(-50%)
      &.left
        left 0
      &.right
        right 0
      span
        display inline-block
        width 20px
        height 20px
        font-size .9375rem
        line-height 20px
        text-align center
        &:nth-child(1)
          background-color $color-green
          color $color-blue
        &:nth-child(2)
          background-color $color-blue
          color $color-purple
        &:nth-child(3)
          background-color $color-purple
          color $color-gray
        &:nth-child(4)
          background-color $color-gray
          color $color-green
  .real-time-president
    display flex
    justify-content center
    min-height 100px
    padding 0 10px
    &__block
      flex 1
      &.pfp
        .real-time-president__count
          background-image url(/proj-assets/election-2020/images/iframe_orange.png)
          &:before
            background-image url(/proj-assets/election-2020/images/iframe_soong.png)
        .real-time-president__ratio
          .bar
            background-color $color-orange
      &.kmt
        .real-time-president__count
          background-image url(/proj-assets/election-2020/images/iframe_blue.png)
          &:before
            background-image url(/proj-assets/election-2020/images/iframe_han.png)
        .real-time-president__ratio
          .bar
            background-color $color-blue
      &.dpp
        .real-time-president__count
          background-image url(/proj-assets/election-2020/images/iframe_green.png)
          &:before
            background-image url(/proj-assets/election-2020/images/iframe_tsai.png)
        .real-time-president__ratio
          .bar
            background-color $color-green
    &__count
      position relative
      height 100px
      padding 3px 5px 0 0
      text-align right
      background-color #fff
      background-position left bottom
      background-size contain
      background-repeat no-repeat
      overflow hidden
      &:before
        content ''
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background-position left bottom
        background-size 60px 60px
        background-repeat no-repeat
      span
        position relative
        z-index 100
        font-size .9375rem
        font-family $font-family-serif
        font-weight bold
        line-height 1.3
      br
        &:first-of-type
          display none
    &__ratio
      position relative
      display flex
      justify-content space-between
      padding 0 3px
      background-color $color-grey
      span
        position relative
        color $color-black-lighter
        font-size .8125rem
        line-height 1.85
      .bar
        position absolute
        top 0
        left 0
        height 100%
        transition width .5s ease-out
        
  .news-and-btn
    margin-top 8px
    background-color $color-black-light
    .news
      padding 0 10px
      color $color-black-light
      line-height 1.87
      .news-ticker
        span
          display inline-block
          width 100%
          min-height calc(1rem * 1.87 * 2)
    .link
      padding 16px 10px 19px
      color #fff
      text-align center
      a
        display block
        width calc(100% - 20px)
        height 44px
        margin 17px auto 0
        color $color-black-light
        text-align center
        text-decoration none
        line-height 44px
        background-color #fff
        border-radius 4px
        cursor pointer

@media (min-width: 700px)
  .election-2020-embed
    .title
      padding 12px 72px
      h1
        padding 3px 0
        font-size 1.5rem
        background-color $color-grey
      .color-text
        &.left
          left 15px
        &.right 
          right 15px
    .real-time-president
      min-height 100px
      padding 0
      &__count
        display flex
        align-items center
        padding 0 13px 0 0
        &:before
          background-size 90px 90px
        > div
          margin 0 0 0 auto
        span
          line-height 1.5
          &.name
            font-size 1.3125rem
          &.count
            line-height 1
            > span
              font-size 1.5rem
        br
          &:first-of-type
            display inline
      &__ratio
        padding 0 10px
      &__block
        & + .real-time-president__block
          margin-left 10px
    .news-and-btn
      margin-top 5px
      padding 0 15px
      .link
        width 100%

@media (min-width: 1024px)
  .election-2020-embed
    .real-time-president
      min-height 170px
      &__count
        height 170px
        &:before
          background-size: 145px 145px
        span.label
          display inline-block
          margin-top 10px
        span.count
          > span
            font-size 2.25rem
    .news-and-btn
      display flex
      padding 0
      .news-ticker
        flex 1
        max-width calc(100% - 340px)
      .link
        display flex
        flex-direction column
        justify-content center
        align-items center
        width 340px
        height auto
        padding 0
        border-left 2px solid #fff
        a
          width calc(100% - 50px)
          margin-top 25px
</style>