<template>
  <div class="hamburger-icon"
    :class="{ open: isMenuOpen }"
    :style="[{
      top: `${top}`,
      right: `${right}`,
      bottom: `${bottom}`,
      left: `${left}`,
      zIndex: `${zIndex}` } ]" @click="$_hamburger_toggleItmes">
    <transition name="fade">
      <a v-show="currentStoryIndex === 0" id="nav-toggle"><span></span></a>
    </transition>
    <transition name="fade">
      <img v-show="currentStoryIndex === 1" :src="`/proj-assets/newtype/images/header/hamburger-1.png`" alt="">
    </transition>
    <transition name="fade">
      <img v-show="currentStoryIndex === 2" :src="`/proj-assets/newtype/images/header/hamburger-2.png`" alt="">
    </transition>
    <transition name="fade">
      <img v-show="currentStoryIndex === 3" :src="`/proj-assets/newtype/images/header/hamburger-3.png`" alt="">
    </transition>
    <transition name="fade">
      <img v-show="currentStoryIndex === 4" :src="`/proj-assets/newtype/images/header/hamburger-4.png`" alt="">
    </transition>
    <transition name="fade">
      <img v-show="currentStoryIndex === 5" :src="`/proj-assets/newtype/images/header/hamburger-5.png`" alt="">
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HamburgerIcon',
  props: {
    top: {
      type: String,
      default: 'auto'
    },
    right: {
      type: String,
      default: 'auto'
    },
    bottom: {
      type: String,
      default: 'auto'
    },
    left: {
      type: String,
      default: 'auto'
    },
    zIndex: {
      type: Number,
      default: 999
    },
    isMenuOpen: {
      type: Boolean,
      default: false
    },
    currentStoryIndex: {
      type: Number,
      default: 0
    },
    // really needed?
    bgColor: {
      default: 'transparent'
    },
    border: {
      type: String,
      default: 'none'
    }
  },
  methods: {
    // $_hamburger_ga() {
    //   window.ga('send', 'event', 'projects', 'click', 'hamburger', { nonInteraction: true })
    // },
    $_hamburger_toggleItmes() {
      this.$emit('toogleMenu')
    }
  },
}
</script>

<style lang="stylus" scoped>
.hamburger-icon
  position fixed
  width 44px
  height 44px
  cursor pointer
  background-color black
  border-radius 50%
  display flex
  flex-direction row
  justify-content center
  align-items center
  // transition transform .25s
  &.open
    // transform rotate(90deg)
    filter brightness(50%)
  #nav-toggle span, #nav-toggle span:before, #nav-toggle span:after
    cursor pointer
    border-radius 1px
    height 4px
    width 30px
    background white
    // position absolute
    display block
    content ''
  #nav-toggle span:before, #nav-toggle span:after
    position absolute
  #nav-toggle span:before
    top 12px
  #nav-toggle span:after
    bottom 12px
  #nav-toggle.fade-enter-active, #nav-toggle.fade-leave-active
    transition opacity .25s
  #nav-toggle.fade-enter, #nav-toggle.fade-leave-to
    opacity 0
  img
    width 44px
    height 44px
    position fixed
    top 10px
    right 10px
    &.fade-enter-active, &.fade-leave-active
      transition opacity .5s
    &.fade-enter, &.fade-leave-to
      opacity 0

@media (max-width: 767px)
  .hamburger-icon
    &.open
      filter none
</style>


