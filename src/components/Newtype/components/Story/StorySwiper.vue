<template>
  <div>
    <div v-swiper:videoSwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <video class="swiper-slide__vid" :id="`slide-story${storyIndex}-vid1`" playsinline :muted="muted" :poster="responsiveSrc.includes('phone') ? `${responsiveSrc}1.png` : null">
            <!-- <source :src="`/proj-assets/newtype/images/story2/video/phonechinese.mp4`" type='video/mp4'/> -->
            <source :src="`${responsiveSrc}1.mp4`" type='video/mp4'/>
            <!-- <source src="https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4" type='video/mp4'/> -->
          </video>
          <!-- 0 -->
        </div>
        <div class="swiper-slide">
          <video class="swiper-slide__vid" :id="`slide-story${storyIndex}-vid2`" playsinline :muted="muted" :poster="responsiveSrc.includes('phone') ? `${responsiveSrc}2.png` : null">
            <!-- <source :src="`/proj-assets/newtype/images/story1/video/1_2.mp4`" type='video/mp4'/> -->
            <source :src="`${responsiveSrc}2.mp4`" type='video/mp4'/>
            <!-- <source src="https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4" type='video/mp4'/> -->
          </video>
          <!-- 1 -->
        </div>
        <div class="swiper-slide">
          <video class="swiper-slide__vid" :id="`slide-story${storyIndex}-vid3`" playsinline :muted="muted" :poster="responsiveSrc.includes('phone') ? `${responsiveSrc}3.png` : null">
            <source :src="`${responsiveSrc}3.mp4`" type='video/mp4'/>
            <!-- <source src="https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4" type='video/mp4'/> -->
          </video>
          <!-- 2 -->
        </div>
        <div class="swiper-slide" v-if="storyIndex === 1">
          <video class="swiper-slide__vid" :id="`slide-story${storyIndex}-vid4`" playsinline :muted="muted" :poster="responsiveSrc.includes('phone') ? `${responsiveSrc}4.png` : null">
            <source :src="`${responsiveSrc}4.mp4`" type='video/mp4'/>
            <!-- <source src="https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4" type='video/mp4'/> -->
          </video>
          <!-- 3 -->
        </div>
        <div class="swiper-slide" v-if="storyIndex === 1">
          <video class="swiper-slide__vid" :id="`slide-story${storyIndex}-vid5`" playsinline :muted="muted" :poster="responsiveSrc.includes('phone') ? `${responsiveSrc}5.png` : null">
            <source :src="`${responsiveSrc}5.mp4`" type='video/mp4'/>
            <!-- <source src="https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4" type='video/mp4'/> -->
          </video>
          <!-- 4 -->
        </div>
        <div class="swiper-slide" v-if="storyIndex === 1">
          <video class="swiper-slide__vid" :id="`slide-story${storyIndex}-vid6`" playsinline :muted="muted" :poster="responsiveSrc.includes('phone') ? `${responsiveSrc}6.png` : null">
            <source :src="`${responsiveSrc}6.mp4`" type='video/mp4'/>
            <!-- <source src="https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4" type='video/mp4'/> -->
          </video>
          <!-- 5 -->
        </div>
      </div>
      <div class="swiper-button-prev" slot="button-prev" v-if="responsiveSrc.includes('web')"></div>
      <div class="swiper-button-next" slot="button-next" v-if="responsiveSrc.includes('web')"></div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
      <!-- opening container -->
      <div :class="[ 'opening', { 'opening--visible': !inViewport } ]">
        <img class="title" :src="`/proj-assets/newtype/images/story${storyIndex}/video/title.png`" alt="">
        <h2 class="landing-hint">點擊播放鍵，聽新二代說說他們的故事</h2>
        <h2 class="landing-credits">旁白、插圖{{ storyIndex === 1 ? '洪金晶' : '朱家賢' }}</h2>
      </div>
      <transition name="fade">
        <div class="play-icon" alt="" v-show="!playing"></div>
      </transition>
      <!--  -->
    </div>
    <div class="sound-indicator" v-show="inViewport" :style="{ maskImage: muted ? 'url(/proj-assets/newtype/images/soundoff.png)' : 'url(/proj-assets/newtype/images/soundon.png)' }" @click="toggleMuted()"></div>
  </div>
</template>

<script>
import storyLandingTransition from '../../mixins/scrollmagic/storyLandingTransition.js'
import Vue from 'vue'
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}

export default {
  props: [ 'responsiveSrc', 'storyIndex' ],
  mixins: [ storyLandingTransition ],
  data () {
    const vm = this
    // const navigationObj = this.responsiveSrc.includes('phone') ? null : { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    return {
      inViewport: false,
      playing: false,
      // muted: true,
      muted: false,
      swiperOption: {
        // loop: true,
        // watchSlidesVisibility: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChange () {
            // console.log(`slideChange to ${this.realIndex}, from ${this.previousIndex}`)
            const prevVid = vm.$el.querySelector(`#slide-story${vm.storyIndex}-vid${this.previousIndex + 1}`)
            prevVid.currentTime = 0
            prevVid.pause()
            // vm.muted = true
            // vm.playing = false
          },
          transitionEnd () {
            // console.log(`transitionEnd to ${this.realIndex}, from ${this.previousIndex}`)
            if (window.innerWidth > 767) {
              const currentVid = vm.$el.querySelector(`#slide-story${vm.storyIndex}-vid${this.realIndex + 1}`)
              currentVid.play()
              vm.playing = true
              ga('send', 'event', 'projects', 'autoplay', `play_story${vm.storyIndex}`, { nonInteraction: false })
            } else {
              vm.playing = false
            }
          },
          tap () {
            const currentVid = vm.$el.querySelector(`#slide-story${vm.storyIndex}-vid${this.realIndex + 1}`)
            if (currentVid.paused) {
              currentVid.play()
              vm.playing = true
              ga('send', 'event', 'projects', 'click', `play_story${vm.storyIndex}`, { nonInteraction: false })
            } else {
              currentVid.pause()
              vm.playing = false
            }
          }
        }
      }
    }
  },
  methods: {
    toggleMuted () {
      const currentVid = document.querySelector(`#slide-story${this.storyIndex}-vid${this.videoSwiper.realIndex + 1}`)
      this.muted = !this.muted
      currentVid.play()
    }
  },
  mounted () {
    // document.querySelectorAll('.swiper-slide__vid').forEach((vid) => { vid.onended = () => { this.videoSwiper.realIndex !== 5 ? this.videoSwiper.slideNext() : this.$scrollTo(`.article--story${this.storyIndex}`) } })
    this.$el.querySelectorAll('.swiper-slide__vid').forEach((vid) => { vid.onended = () => {
      this.videoSwiper.slideNext()
      // this.muted = true
    }})
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../node_modules/swiper/dist/css/swiper.css'

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
  .landing-hint
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
  .landing-credits
    color white
    font-weight 400
    position absolute
    right 80px
    bottom 40px
    margin 0
    // &:after
    //   background-image url(/proj-assets/newtype/images/click-the-sound.png)
    //   background-size calc(384px / 4) calc(440px / 4)
    //   display inline-block
    //   width calc(384px / 4)
    //   height calc(440px / 4)
    //   content ''
    //   margin-left 25px

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

.swiper-container
  background-color white
  .swiper-wrapper
    height 100vh
    width 100%
    .swiper-slide
      text-align center
      // font-size 38px
      // font-weight 700
      // background-color #eee
      display flex
      justify-content center
      align-items center
      video
        height 100vh
        width auto
    // .swiper-button-prev
    //   // opacity .75
    //   width 100px
    //   height 100px
    //   left 0
    // .swiper-button-next
    //   // opacity .75
    //   width 100px
    //   height 100px
    //   right 0

    .swiper-pagination
      .swiper-pagination-bullet
        background-color red

@media (max-width: 767px)
  .opening
    .title
      width 100vw
    .landing-hint
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


