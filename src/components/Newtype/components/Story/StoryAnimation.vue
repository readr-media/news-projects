<template>
  <div :class="['animation', `animation--story${storyIndex}`]">
    <template v-if="storyIndex === 1">
      <!-- <img id="line" src="/proj-assets/newtype/images/story1/animation/line.png" alt=""> -->
      <transition name="fade">
        <!-- <img v-show="story1Ending" id="text" src="/proj-assets/newtype/images/story1/animation/text.png" alt=""> -->
        <img id="text" src="/proj-assets/newtype/images/story1/animation/text.png" alt="">
      </transition>
      <img id="writing-hand" src="/proj-assets/newtype/images/story1/animation/writing-hand.png" alt="">
    </template>
    <template v-if="storyIndex === 2">
      <transition name="fade">
        <img v-show="!story2Ending" id="left-hand" src="/proj-assets/newtype/images/story2/animation/L-hand@1x.png" alt="">
      </transition>
      <transition name="fade">
        <img v-show="!story2Ending" id="right-hand" src="/proj-assets/newtype/images/story2/animation/R-hand@1x.png" alt="">
      </transition>
      <transition name="fade">
        <img v-show="story2Ending" id="story2-ending" src="/proj-assets/newtype/images/story2/animation/both.png" alt="">
      </transition>
    </template>
    <template v-if="storyIndex === 4">
      <img id="taiwan" src="/proj-assets/newtype/images/story4/animation/taiwan.png" alt="">
      <img id="bird" src="/proj-assets/newtype/images/story4/animation/bird.png" alt="">
    </template>
  </div>
</template>

<script>
import animation from '../../mixins/scrollmagic/animation'

export default {
  props: [ 'storyIndex' ],
  mixins: [ animation ],
  data () {
    return {
      story1Ending: false,
      story2Ending: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.animation
  position relative
  width 100vw
  overflow hidden
  // overflow-x hidden
  // overflow-y visible
  &.animation--story1
    height 60vh
  &.animation--story2
    height 80vh
  &.animation--story4
    height 60vh
  img
    // width 85vw
    // max-height 70vh
    position absolute
    z-index 100
    &#writing-hand
      width 75vw
      bottom 0
      right -5vw
    &#line
      width 70vw
      left 0
      bottom 0
    &#text
      width 50vw
      left 30vh
      bottom 5vh
    &#left-hand
      width 85vw
      left -85vw
    &#right-hand
      width 85vw
      right -85vw
    &#story2-ending
      width 100vw
      // bottom 20vh
    &#bird
      width 50vw
      left -50vw
    &#taiwan
      width 30vw
      right 20vw
      top 50%
    &.fade-enter-active, &.fade-leave-active
      transition opacity .25s
    &.fade-enter, &.fade-leave-to
      opacity 0

@media (max-width: 767px)
  .animation
    &.animation--story1
      height 50vh
    &.animation--story2
      height 50vh
    &.animation--story4
      height 50vh
    img
      &#writing-hand
        width auto
        height 50vh
        right -150vw
      &#text
        width 100vw
        left 0vh
        bottom 5vh
      &#left-hand
        width 150vw
        left -150vw
        top 10vh
      &#right-hand
        width 150vw
        right -150vw
        top 10vh
      &#story2-ending
        width 150vw
        left -25vw
        top 10vh
      &#bird
        width 70vw
        left -70vw
        bottom 0
      &#taiwan
        width 100vw
        right -20vw
        top 30%
</style>


