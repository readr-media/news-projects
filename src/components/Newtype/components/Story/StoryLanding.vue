<template>
  <div :class="[ 'article-landing', `article-landing--story${storyIndex}` ]">
    <template v-if="storyIndex === 1">
      <StorySwiper v-if="device" :responsiveSrc="responsiveSrc" :storyIndex="storyIndex"></StorySwiper>
    </template>
    <template v-if="storyIndex === 2">
      <video id="vid1" loop playsinline :muted="muted" onloadstart="this.volume=1">
        <source v-if="device" :src="`${responsiveSrc}viet.mp4`" type='video/mp4'/>
      </video>
      <video id="vid2" loop playsinline :muted="muted" onloadstart="this.volume=0">
        <source v-if="device" :src="`${responsiveSrc}chinese.mp4`" type='video/mp4'/>
      </video>
      <div :class="[ 'opening', { 'opening--visible': !inViewport } ]">
        <img class="title" src="/proj-assets/newtype/images/story2/video/title.png" alt="">
        <h2>點擊右上方音效鍵，聽聽他們的故事</h2>
      </div>
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
      playing: false,
      muted: true
    }
  },
  computed: {
    responsiveSrc () {
      // return `/proj-assets/newtype/images/story${this.storyIndex}/video/${this.device}`
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
    setStoryLandingHeight () {
      const height = window.innerHeight
      this.$el.style.height = `${height * 2}px`
      this.$el.querySelector('#vid1').style.height = `${height}px`
      this.$el.querySelector('#vid2').style.height = `${height}px`
    }
  },
  mounted () {
    if (process.browser) {
      window.innerWidth <= 767 ? this.device = 'phone' : this.device = 'web'
      if (this.storyIndex === 2) {
        this.setStoryLandingHeight()
        window.addEventListener('resize', () => {
          this.setStoryLandingHeight()
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-landing
  // width 100vw
  // height 200vh
  // background-color white
  position relative
  // display flex
  // flex-direction column
  // justify-content flex-end
  // .sound-indicator
  //   -webkit-mask-image url(/proj-assets/newtype/images/soundoff.png)
  //   -webkit-mask-position center center
  //   -webkit-mask-size 100% auto
  //   -webkit-mask-repeat no-repeat
  //   background-color black
  //   position fixed
  //   top calc(44px + 10px)
  //   right 10px
  //   width 44px
  //   height 44px
  z-index 10
  &--story1
    background-color white
    height 100vh
  &--story2
    background-color gray
    height 200vh
  .opening
    width 100vw
    height 100vh
    background-color rgba(0, 0, 0, .3)
    position absolute
    z-index 2
    top 0
    left 0
    opacity 0
    will-change opacity
    transition opacity .5s
    transition-delay 1s
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
    &--visible
      opacity 1
    h2
      color white
      font-weight 400
      &:before
        background-image url(/proj-assets/newtype/images/earphone.png)
        background-size 50px 50px
        display inline-block
        width 50px
        height 50px
        content ''
        margin-right 25px
      &:after
        background-image url(/proj-assets/newtype/images/click-the-sound.png)
        background-size calc(384px / 4) calc(440px / 4)
        display inline-block
        width calc(384px / 4)
        height calc(440px / 4)
        content ''
        margin-left 25px

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
    // width 100vw
    min-width 100vw
    // height 100vh
    &#vid2
      position absolute
      left 0
      top 0
      opacity 0
      will-change opacity
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
      h2
        display flex
        flex-direction row
        width 80%
        &:before
          padding-right 50px
        &:after
          display none
</style>

