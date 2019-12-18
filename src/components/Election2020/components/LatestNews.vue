<template>
  <section :class="{ empty: !hasLatestNews }" class="e-l-n">
    <span v-if="!hasLatestNews">尚無最新消息</span>
    <template v-else>
      <transition-group name="latestNews" class="e-l-n-container" tag="div">
        <template v-for="news in latestNewsFormated">
          <a 
            v-if="news.link"
            :key="news.content"
            :href="news.link"
            class="item"
            target="_blank"
          >
            <p v-text="news.title" />
            <div v-text="truncateText(news.content)" />
          </a>
          <div
            v-else
            :key="news.content"
            class="item"
          >
            <p v-text="news.title" />
            <div v-text="truncateText(news.content)" />
          </div>
        </template>
      </transition-group>
    </template>
  </section>
</template>
<script>

import { truncate } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapState } = createNamespacedHelpers('Election2020')

const UPDATE_FREQUENCY = 5 * 60 * 1000 //ms

export default {
  name: 'LatestNews',
  data () {
    return {
      timer: undefined
    }
  },
  computed: {
    ...mapGetters({
      latestNewsFormated: 'latestNewsFormated'
    }),
    hasLatestNews () {
      return this.latestNewsFormated.length > 0
    }
  },
  mounted () {
    if (!this.timer) {
      this.timer = setInterval(() => this.$emit('update'), UPDATE_FREQUENCY)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    truncateText (text) {
      return truncate(text, {
        length: 50
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../styles/common.styl'

.e-l-n
  padding 20px 0 8px
  text-align center
  background-color rgba(216, 216, 216, 0.25)
  p, span
    margin 0
  span
    color $color-black-lighter

  &-container
    display flex
    flex-wrap nowrap
    width 90%
    margin 0 auto
    padding-bottom 12px
    text-align left
    overflow-x auto
    a
      text-decoration none
  .item
    flex 0 0 auto
    display inline-flex
    flex-direction column
    width 100%
    padding 15px 20px 10px
    text-align left
    background-color #fff
    white-space pre-line
    & + .item
      margin-left 10px
    > p
      color $color-black-light
      font-size 1.3125rem
      font-family $font-family-serif
      font-weight bold
      line-height 1.14
    > div
      margin-top 3px
      color $color-black-lighter
      text-align justify
      line-height 1.88

.latestNews-enter-active, .latestNews-leave-active
  transition all 1s

.latestNews-enter, .latestNews-leave-to
  opacity 0

.latestNews-move
  transition all .5s ease-in

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