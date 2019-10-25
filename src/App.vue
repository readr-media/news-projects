<template>
  <div id="app">
    <AppHeader v-if="hideAppHeader" />
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import { PROJECTS_NOT_NEED_APP_HEADER } from './constants/index.js'

const updateViewport = (store) => {
  const wEl = window
  const htmlEl = document.documentElement
  const ww = Math.min(wEl.innerWidth, htmlEl.clientWidth)
  const wh = wEl.innerHeight || htmlEl.clientHeight
  const viewport = [ ww, wh ]
  return store.dispatch('UPDATE_VIEWPORT', viewport)
}
export default {
  components: {
    AppHeader: () => import('./components/AppHeader.vue')
  },
  computed: {
    hideAppHeader () {
      return !PROJECTS_NOT_NEED_APP_HEADER.includes(this.$route.params.project)
    }
  },
  beforeMount () {
    updateViewport(this.$store)
  },
  mounted () {
    window.addEventListener('resize', this.$_app_updateViewport)
    window.ga && window.ga('send', 'pageview')
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$_app_updateViewport)
  },
  methods: {
    $_app_updateViewport () {
      updateViewport(this.$store)
    }
  }
}
</script>
<style lang="stylus">
// noUi
.noUi-base
  position relative
  width 100%
  height 5px
  border-radius 5px
  background-color #ffad5e
.noUi-origin
  position absolute
  right 0
  top 0
  left 0
  bottom 0
  background-color #050505
.noUi-handle
  position relative
.noUi-handle:after
  content ''
  display inline-block
  width 20px
  height 20px
  background #ffad5e
  position absolute
  top -8px
  left 0
  border-radius 50%
  cursor grab

</style>
