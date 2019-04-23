<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
import postMessageScroll from './mixins/postMessageScroll'

const updateViewport = (store) => {
  const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const viewport = [ w, h ]
  return store.dispatch('UPDATE_VIEWPORT', viewport)
}
export default {
  mixins: [ postMessageScroll ],
  beforeMount () {
    updateViewport(this.$store)
  },
  mounted () {
    window.addEventListener('resize', this.$_app_updateViewport)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$_app_updateViewport)
  },
  methods: {
    $_app_updateViewport () {
      updateViewport(this.$store)
    },
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
