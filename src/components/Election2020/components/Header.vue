<template>
  <header ref="header" class="header">
    <a href="https://www.readr.tw/" target="_blank">
      <img src="/proj-assets/election-2020/images/logo.svg" alt="READr">
    </a>
    <span :class="{ show: showHeaderTitle }">2020 總統大選即時看</span>
    <a href="https://www.readr.tw/donate" target="_blank">
      <img src="/proj-assets/election-2020/images/donate.svg" alt="贊助我們">
    </a>
  </header>
</template>
<script>
import { throttle } from 'lodash'

export default {
  name: 'Header',
  data () {
    return {
      showHeaderTitle: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    detectHeadingInViewport () {
      const heading = document.querySelector('#js-title')
      const rect = heading.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const headerHeight = this.$refs.header.offsetHeight
      if (rect.top <= viewportHeight && rect.bottom > headerHeight ) {
        return true
      }
      return false
    },
    handleScroll: throttle(function () {
      this.showHeaderTitle = !this.detectHeadingInViewport()
    }, 300)
  }

}
</script>
<style lang="stylus" scoped>
.header
  display flex
  align-items center
  position fixed
  top 0
  left 0
  z-index 999
  width 100%
  height 44px
  padding 0 5%
  background-color $color-black
  > a
    width 36px
    height 33px
    &:first-child
      margin 0 auto 0 0
    &:last-child
      margin 0 0 0 auto
    img
      width 100%
      height 100%
      object-fit contain
      object-position center center
  > span
    margin 0 auto
    color #fff
    font-size .9375rem
    font-family $font-family-serif
    opacity 0
    transition opacity .2s ease-in
    &.show
      opacity 1

@media (min-width: 768px)
  .header
    padding 0 20px

@media (min-width: 1024px)
  .header
    height 70px
    > a
      width 44px
      height 41px
    > span
      font-size 1.5rem
</style>