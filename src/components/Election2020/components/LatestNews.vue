<template>
  <section :class="{ empty: !hasLatestNews }" class="e-l-n">
    <span v-if="!hasLatestNews">尚無最新消息</span>
    <div v-else class="e-l-n-container">
      <div
        v-for="news in latestNewsFormated"
        :key="news.content"
        class="item"
      >
        <p v-text="news.title" />
        <div v-text="news.content" />
      </div>
    </div>
  </section>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapState } = createNamespacedHelpers('Election2020')

export default {
  name: 'LatestNews',
  computed: {
    ...mapGetters({
      latestNewsFormated: 'latestNewsFormated'
    }),
    hasLatestNews () {
      return this.latestNewsFormated.length > 0
    }
  }
}
</script>
<style lang="stylus" scoped>
.e-l-n
  padding 20px 0 8px
  text-align center
  background-color rgba(216, 216, 216, 0.25)
  p, span
    margin 0
  span
    color rgba(0, 0, 0, 0.66)
  &-container
    width calc(100% - 20px)
    margin 0 auto
    padding-bottom 12px
    text-align left
    white-space nowrap
    overflow-x scroll
  .item
    display inline-block
    width 100%
    padding 15px 20px 10px
    text-align left
    background-color #fff
    white-space pre-line
    & + .item
      margin-left 10px
    > p
      color rgba(0, 0, 0, 0.87)
      font-size 1.3125rem
      font-family source-han-serif-tc, STSong, serif
      font-weight bold
      line-height 1.14
    > div
      margin-top 3px
      color rgba(0, 0, 0, 0.66)
      text-align justify
      line-height 1.88

@media (min-width 768px)
  .e-l-n
    padding 25px 0 10px
    &.empty
      padding-bottom 25px
    &-container
      width calc(100% - 40px)
      padding-bottom 30px
    .item
      width 320px
      padding 0
      background-color transparent
      & + .item
        margin-left 30px
      > div
        padding 15px 20px
        margin-top 8px
        background-color #fff

</style>