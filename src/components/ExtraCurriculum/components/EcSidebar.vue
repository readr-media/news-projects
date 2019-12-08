<template>
  <aside class="ec-sidebar">
    <div class="ec-sidebar-container">
      <a :class="{ active: current === 1 }" class="ec-sidebar__link" @click="$emit('scrollTo', 'chapter-1')">兩種不同的彩虹</a>
      <a :class="{ active: current === 2 }" class="ec-sidebar__link" @click="$emit('scrollTo', 'chapter-2')">獨家調查：小學晨光時間入校團體解密</a>
      <a :class="{ active: current === 3 }" class="ec-sidebar__link" @click="$emit('scrollTo', 'chapter-3')">彩虹媽媽的面貌</a>
      <a :class="{ active: current === 4 }" class="ec-sidebar__link" @click="$emit('scrollTo', 'chapter-4')">我要查詢孩子學校晨光時間的活動</a>
    </div>
  </aside>
</template>
<script>
import { throttle } from 'lodash'

export default {
  name: 'EcSidebar',
  props: {
    current: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    if (this.$store.state.viewport[0] >= 768) {
      this.detectFixed()
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    detectFixed () {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const sidebar = document.querySelector('.ec-sidebar-container')
      const rect = sidebar.getBoundingClientRect()
      if (rect.bottom <= viewportHeight) {
        sidebar.classList.add('fixed')
      } else {
        sidebar.classList.remove('fixed')
      }
    },
    handleScroll: throttle(function () {
      this.detectFixed()
    }, 300)
  }
}
</script>
<style lang="stylus" scoped>
.ec-sidebar
  position fixed
  top 0
  left 0
  bottom 0
  z-index 500
  width 100% !important
  padding-top 50px
  background-color #2c585e
  transform translateX(-100%)
  transition transform .5s
  a, a:link, a:visited, a:hover, a:active
    color #fff
    cursor pointer
    text-decoration none
  &-container
    display flex
    flex-direction column
    height 100%
  &__link
    flex 1
    display flex
    justify-content center
    align-items center
    font-size .9375rem
    & + .ec-sidebar__link
      border-top 1px solid #9b9b9b
    &.active
      font-weight 700

@media (max-width: 767px)
  .ec-sidebar
    &.active
      transform translateX(0)

// fix header
@media (max-width: 768px)
  .ec-sidebar
    padding-top 40px

@media (min-width: 768px)
  .ec-sidebar
    position absolute
    width 300px !important
    padding-top 0
    transform translateX(0)
    &-container
      justify-content flex-start
      height auto
      &.fixed
        position sticky
        top 50%
        left 0
        transform translateY(-50%)
    &__link
      flex none
      height 75px
      border-top 1px solid #9b9b9b
      &:last-child
        border-bottom 1px solid #9b9b9b

@media (min-width: 1200px)
  .ec-sidebar
    width 400px !important
</style>