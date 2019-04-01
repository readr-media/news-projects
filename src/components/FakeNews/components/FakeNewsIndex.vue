<template>
  <div class="index">
    <a class="title">謠言與牠們的產地</a>
    <a v-for="(chapter, index) in article"
      :key="`index-${index}`"
      :href="`#article-${index + 1}-1`"
      :class="[ { active: getStatus(index) }, 'chapter' ]"
      @click="goTo(`#article-${index + 1}-1`)"
      v-text="chapter.title">
    </a>
    <FakeNewsCredit v-if="mounted && $store.state.viewport[0] < 1024" class="index__credit" />
  </div>
</template>
<script>
import FakeNewsCredit from './FakeNewsCredit.vue'

export default {
  name: 'FakeNewsIndex',
  props: {
    article: {
      type: Array
    },
    currentChapter: {
      type: Number
    },
    currentChapterMobile: {
      type: Number
    }
  },
  data () {
    return {
      mounted: false
    }
  },
  components: {
    FakeNewsCredit
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
      this.$store.state.viewport[0] < 1024 ? this.$emit('goTo', anchor) : ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.index
  position absolute
  top 0
  left 100%
  z-index 500
  width 100%
  height calc(100vh - 126px)
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
  &__credit
    position absolute
    left 0
    right 0
    bottom 0

@media (min-width: 1024px)
  .index
    // position fixed
    // top 94px
    top 10px
    left calc((100% - 1020px) / 2 )
    width 186px
    a
      padding .5em
      background-color transparent
      border none
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
            
</style>
