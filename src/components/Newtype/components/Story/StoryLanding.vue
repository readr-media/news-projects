<template>
  <div :class="[ 'article-landing', `article-landing--story${storyIndex}` ]">
    <template v-if="storyIndex === 1 || storyIndex === 4">
      <StorySwiper v-if="device" :responsiveSrc="responsiveSrc" :storyIndex="storyIndex"></StorySwiper>
    </template>
    <template v-if="storyIndex === 2">
      <img class="landing-hint" v-show="shouldplay.vid1" src="/proj-assets/newtype/images/story2/video/viethint.png" alt="">
      <img class="landing-hint" v-show="shouldplay.vid2" src="/proj-assets/newtype/images/story2/video/chinesehint.png" alt="">
      <div class="vid-container" id="vid1-container">
        <video id="vid1" loop playsinline :muted="muted" onloadstart="this.volume=1" @click="tap('vid1')" :poster="device === 'phone' ? `/proj-assets/newtype/images/story2/video/phoneviet.png` : null">
          <source v-if="device" :src="`${responsiveSrc}viet.mp4`" type='video/mp4'/>
        </video>
        <transition name="fade">
          <div class="play-icon" alt="" v-show="!playing.vid1" @click="tap('vid1')"></div>
        </transition>
      </div>
      <div class="vid-container" id="vid2-container">
        <video id="vid2" loop playsinline :muted="muted" onloadstart="this.volume=1" @click="tap('vid2')" :poster="device === 'phone' ? `/proj-assets/newtype/images/story2/video/phonechinese.png` : null">
          <source v-if="device" :src="`${responsiveSrc}chinese.mp4`" type='video/mp4'/>
        </video>
        <transition name="fade">
          <div class="play-icon" alt="" v-show="!playing.vid2" @click="tap('vid2')"></div>
        </transition>
        <!-- <transition name="fade">
          <img class="landing-hint" v-show="playing.vid2" src="/proj-assets/newtype/images/story2/video/viethint.png" alt="">
        </transition>  -->
      </div>
      <transition name="fade">
        <div v-show="!inViewport" :class="[ 'opening', { 'opening--visible': !inViewport } ]">
          <img class="title" src="/proj-assets/newtype/images/story2/video/title.png" alt="">
          <h2 class="landing-playhint">點擊播放鍵，聽新二代說說他們的故事</h2>
          <h2 class="landing-credits">旁白、作文吳觀玲</h2>
        </div>
      </transition>
      <div class="sound-indicator" v-show="inViewport" :style="{ maskImage: muted ? 'url(/proj-assets/newtype/images/soundoff.png)' : 'url(/proj-assets/newtype/images/soundon.png)' }" @click="toggleMuted()"></div>
    </template>
    <!-- <img :src="`/proj-assets/newtype/images/story${storyIndex}/bg-top-landing.png`"></img> -->
  </div>
</template>

<script>
import StorySwiper from './StorySwiper.vue'

import storyLandingTransition from '../../mixins/scrollmagic/storyLandingTransition.js'
import story2Landing from '../../mixins/scrollmagic/transform/story2Landing.js'

export default {
  props: [ 'storyIndex' ],
  mixins: [ storyLandingTransition, story2Landing ],
  // mixins: [ storyLandingTransition ],
  components: {
    StorySwiper
  },
  data () {
    return {
      device: undefined,
      inViewport: false,
      playing: {
        vid1: false,
        vid2: false
      },
      shouldplay: {
        vid1: false,
        vid2: false
      },
      muted: false
    }
  },
  computed: {
    responsiveSrc () {
      return `/proj-assets/newtype/images/story${this.storyIndex}/video/${this.device}`
    }
  },
  methods: {
    toggleMuted () {
      this.muted = !this.muted
      if (!this.muted) {
        document.querySelector('#vid1').play()
        document.querySelector('#vid2').play()
      }
    },
    tap (id) {
      if (this.$el.querySelector(`#${id}`).paused) {
        this.$el.querySelector(`#${id}`).play()
        this.playing[id] = true
        ga('send', 'event', 'projects', 'click', `play_story${this.storyIndex}`, { nonInteraction: false })
      } else {
        this.$el.querySelector(`#${id}`).pause()
        this.playing[id] = false
      }
    }
  },
  mounted () {
    if (process.browser) {
      window.innerWidth <= 767 ? this.device = 'phone' : this.device = 'web'
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-landing
  position relative
  z-index 10
  &--story1
    background-color white
    height 100vh
  &--story2
    background-color gray
    height 300vh
  .opening
    width 100vw
    height 100vh
    background-color rgba(0, 0, 0, .3)
    position absolute
    z-index 3
    top 0
    left 0
    // opacity 0
    will-change opacity
    // transition opacity .5s
    // transition-delay 1s
    display flex
    flex-direction column
    justify-content center
    align-items center
    .title
      // position absolute
      // margin auto
      // top 0
      // bottom 0
      // left 0
      // right 0
      width 50vw
    // &--visible
    //   opacity 1
    &.fade-enter-active, &.fade-leave-active
      transition-delay 1s
      transition opacity .5s
    &.fade-enter, &.fade-leave-to
      opacity 0
    .landing-playhint
      color white
      font-weight 400
      &:before
        background-image url(/proj-assets/newtype/images/playicon.png)
        background-size 50px 50px
        display inline-block
        width 50px
        height 50px
        content ''
        margin-right 25px
        vertical-align bottom
      // &:after
      //   background-image url(/proj-assets/newtype/images/click-the-sound.png)
      //   background-size calc(384px / 4) calc(440px / 4)
      //   display inline-block
      //   width calc(384px / 4)
      //   height calc(440px / 4)
      //   content ''
      //   margin-left 25px
    .landing-credits
      color white
      font-weight 400
      position absolute
      right 80px
      bottom 40px
      margin 0

  .sound-indicator
    // -webkit-mask-image url(/proj-assets/newtype/images/soundoff.png)
    -webkit-mask-position center center
    -webkit-mask-size 100% auto
    -webkit-mask-repeat no-repeat
    background-color black
    position fixed
    top calc(44px + 10px)
    right 10px
    width 44px
    height 44px
    z-index 999
    cursor pointer

  video
    // min-width 100vw
    width 100vw
    &#vid2
      opacity 1
      // will-change transform

#vid2-container
  width 100%
  height 100%

.landing-hint
  width 44px
  position fixed
  top calc(10px + 44px + 10px + 44px + 10px)
  right 10px
  z-index 998

.play-icon
  -webkit-mask-image url(/proj-assets/newtype/images/playicon.png)
  -webkit-mask-position center center
  -webkit-mask-size 100% auto
  -webkit-mask-repeat no-repeat
  background-color gray
  width 80px
  height 80px
  position absolute
  margin auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 1
  &.fade-enter-active, &.fade-leave-active
    transition opacity .25s
  &.fade-enter, &.fade-leave-to
    opacity 0

  &--story1
    img
      width 100%
      position static
  &--story2
    img
      width 100%
      position static
      // position absolute
      // bottom 0
      // left 0

@media (max-width: 767px)
  .article-landing
    width auto
    // height 100vh
    &--story3, &--story5
      height 0
    .opening
      .title
        width 100vw
      .landing-playhint
        display flex
        flex-direction row
        width 80%
        &:before
          padding-right 50px
        &:after
          display none
      .landing-credits
        right initial
</style>

