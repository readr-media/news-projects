<template>
  <div class="index">
    <a class="title">謠言與牠們的產地</a>
    <a v-for="(chapter, index) in ARTICLE"
      :key="`index-${index}`"
      :class="[ { active: getStatus(index) }, 'chapter' ]"
      @click="goTo(`#article-${index + 1}-1`)"
      v-text="chapter.title">
    </a>
    <a v-for="(chapter, index) in ARTICLE_MORE"
      :key="`index-more${index}`"
      :class="[ { active: getStatus(index + ARTICLE.length) }, 'chapter', 'more' ]"
      @click="goTo(`#article-${index + 1 + ARTICLE.length}-1`)"
      v-text="chapter.title">
    </a>
    <FakeNewsSubscribe class="index__subscribe" />
  </div>
</template>
<script>
import FakeNewsSubscribe from './FakeNewsSubscribe.vue'
import { ARTICLE, ARTICLE_MORE } from '../constant'

export default {
  name: 'FakeNewsIndex',
  props: {
    currentChapter: {
      type: Number
    },
    currentChapterMobile: {
      type: Number
    },
  },
  data () {
    return {
      ARTICLE,
      ARTICLE_MORE,
      mounted: false
    }
  },
  components: {
    FakeNewsSubscribe
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    getStatus (index) {
      if (this.$store.state.viewport[0] < 1024) {
        return index + 1 === this.currentChapterMobile
      }
      return index + 1 === this.currentChapter
    },
    goTo (anchor) {
      this.$emit('goTo', anchor)
    }
  }
}
</script>
<style lang="stylus" scoped>
.index
  background-color #f5f6f7
  a
    display flex
    align-items center
    padding 15px
    color #000
    font-size .875rem
    background-color #fff
    border-bottom 1px solid #ccd0d5
    &.title
      color #4a4a4a
      font-size .8125rem
      font-weight 600
      cursor default
    &.chapter
      cursor pointer
      &:before
        content ''
        display inline-block
        width 4px
        height 4px
        margin-right 10px
        background-color #4868a5
        border-radius 50%
      &.active
        background-color #ccd0d5
    &.more
      font-size .75rem
    & + div
      margin-top 1em
  // &__credit
  //   position absolute
  //   left 0
  //   right 0
  //   bottom 0

@media (min-width: 1024px)
  .index
    width 186px
    a
      padding .5em .7em
      background-color transparent
      border none
      & + a
        margin-top .5em
      &.title
        padding 0
        font-size .9375rem
      &.chapter
        &:before
          background-color #ccd0d5
        &:hover
          background-color #fff
          outline 1px solid #ccd0d5
          outline-radius 4px
        &.active
          color #032669
          font-weight 600
          background-color #fff
          outline 1px solid #ccd0d5
          &:before
            background-color #032669
        & + .chapter
          margin-top .2em  
    &__subscribe
      margin-top 1em
</style>
