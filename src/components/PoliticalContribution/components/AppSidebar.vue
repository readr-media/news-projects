<template>
  <aside class="app-sidebar" ref="app-sidebar">
    <div :class="[ 'app-sidebar__dimmed', { 'app-sidebar__dimmed--toogled': isSidebarToogle } ]" ref="app-sidebar__dimmed" @click="toogleSidebarOff"></div>
    <div :class="[ 'app-sidebar__slot-container', { 'app-sidebar__slot-container--toogled': isSidebarToogle }, { 'app-sidebar__slot-container--padding': isSectionContentReachTop } ]" ref="app-sidebar__slot-container">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
import { disableBodyScroll, enableBodyScroll, } from 'body-scroll-lock'

export default {
  props: {
    isSidebarToogle: {
      type: Boolean,
      required: true,
    },
    isSectionContentReachTop: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isSidebarToogle () {
      this.isSidebarToogle ? disableBodyScroll(this.scrollableTarget) : enableBodyScroll(this.scrollableTarget)

      if (this.isSidebarToogle && !this.$store.state.useragent.isDesktop) {
        const realVH = this.getVH()
        this.calcSidebarDimensions(realVH)
      }
    }
  },
  data () {
    return {
      scrollableTarget: undefined,
    }
  },
  methods: {
    getVH () {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    },
    calcSidebarDimensions (realVH = this.$store.getters['heightMobile']) {
      // Using JS to calculate the dimensions except using CSS viewport, in order to avoid browser's bottom nav bar causing vh inconsistent
      this.$refs['app-sidebar__dimmed'].style['height'] = `${realVH}px`
      this.$refs['app-sidebar__slot-container'].style['height'] = `${realVH}px`
    },
    toogleSidebarOff () {
      this.$emit('toogleSidebarOff')
    }
  },
  // When user visit a candidate directly, we should disable root container's scroll immediately
  mounted () {
    this.scrollableTarget = this.$el.querySelector('.app-sidebar__slot-container')
    if (this.isSidebarToogle) {
      disableBodyScroll(this.scrollableTarget)
    }

    if (!this.$store.state.useragent.isDesktop) {
      this.calcSidebarDimensions()
    }
  },
}
</script>

<style lang="stylus" scoped>
.app-sidebar
  z-index 10005
  &__dimmed
    position fixed
    top 0
    left 0
    width 100vw
    height 100vh
    background-color transparent
    transition background-color .5s
    pointer-events none
    z-index 10004
    &--toogled
      background-color rgba(0, 0, 0, .8)
      pointer-events initial
  &__slot-container
    width 596px
    height 100vh
    padding 0 0 0 0
    position fixed
    top 0
    right 0
    background-color white
    z-index 10005
    transform translate3d(596px, 0, 0)
    transition transform .5s
    transition-timing-function ease-out
    &--toogled
      transform translate3d(0, 0, 0)
    &--padding
      padding 60px 0 0 0

@media (max-width 1024px)
  .app-sidebar
    &__slot-container
      width 80vw
      height 100vh
      padding 0 0 0 0
      position fixed
      top 0
      right 0
      background-color white
      z-index 10005
      overflow-y scroll
      -webkit-overflow-scrolling touch
      transform translate3d(80vw, 0, 0)
      &--toogled
        transform translate3d(0, 0, 0)
      &--padding
        padding 60px 0 0 0
</style>

