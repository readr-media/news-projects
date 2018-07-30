<template>
  <aside class="app-sidebar">
    <div :class="[ 'app-sidebar__dimmed', { 'app-sidebar__dimmed--toogled': isSidebarToogle } ]" @click="toogleSidebarOff"></div>
    <div :class="[ 'app-sidebar__slot-container', { 'app-sidebar__slot-container--toogled': isSidebarToogle }, { 'app-sidebar__slot-container--padding': isSectionContentReachTop } ]">
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
      this.isSidebarToogle ? disableBodyScroll(this.rootContainer) : enableBodyScroll(this.rootContainer)
    }
  },
  data () {
    return {
      rootContainer: undefined,
    }
  },
  methods: {
    toogleSidebarOff () {
      this.$emit('toogleSidebarOff')
    }
  },
  // When user visit a candidate directly, we should disable root container's scroll immediately
  mounted () {
    this.rootContainer = document.querySelector('#political-contribution')
    if (this.isSidebarToogle) {
      disableBodyScroll(this.rootContainer)
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
</style>

