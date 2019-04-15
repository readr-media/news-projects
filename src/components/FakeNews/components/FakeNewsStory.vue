<template>
  <div class="story">
    <div class="story-container">
      <template v-for="(item, index) in STORY">
        <figure :key="`story-${index}`" @click="handleSlideshow(index + 1)">
          <img :src="item.img" :alt="item.title">
          <figcaption v-text="truncateTitle(item.title)"></figcaption>
        </figure>
      </template>
    </div>
    <div v-show="openSlideshow" class="story-slideshow">
      <div class="story-slideshow-container">
        <div class="story-slideshow__header">
          <nav>
            <div v-for="(item, index) in STORY" :key="`story-nav-${index}`" @click="current = index + 1">
              <div :style="{ width: getProcessWidth(index + 1) }" class="process"></div>
            </div>
          </nav>
          <div class="story-slideshow__header-title">
            <button @click="openSlideshow = false"><img src="/proj-assets/disinformation/close.png"></button>
          </div>
        </div>
        <img
          v-for="(item, index) in STORY"
          v-show="current === index + 1"
          :key="`story-img-${index}`"
          :src="item.img"
          :alt="item.title"
          @click="nextStory(index + 1)">
      </div>
      <div class="story-slideshow__curtain"></div>
    </div>
  </div>
</template>
<script>
import { STORY } from '../constant'
import { truncate } from 'lodash'

const checkImage = (ele) => {
  new Promise((resolve, reject) => {
    ele.onload = () => resolve()
    ele.onerror = () => reject()
  })
}

export default {
  name: 'FakeNewsStory',
  data () {
    return {
      STORY,
      current: 1,
      openSlideshow: false,
      time: 0,
      timer: undefined,
      timerForNav: undefined
    }
  },
  watch: {
    current () {
      this.removeInterval()
      this.time = 0
      this.setTimer()
    },
    openSlideshow (value) {
      value ? '' : this.removeInterval()
    }
  },
  beforeMount () {
    const images = [ ...document.querySelectorAll('.story img') ]
    Promise.all(images.map(item => checkImage(item)))
    .then(() => {
      this.openSlideshow = true
      this.setTimer()
    })
  },
  methods: {
    getProcessWidth (index) {
      if (index < this.current) {
        return '100%'
      } else if (index > this.current) {
        return '0%'
      } else {
        return `${this.time / 50 * 100}%`
      }
    },
    handleSlideshow (index) {
      this.current = index
      this.openSlideshow = true
      window.ga && window.ga('send', 'event', 'projects', 'click', `story ${index}`, { nonInteraction: false })
    },
    nextStory (current) {
      if (current + 1 > STORY.length) {
        this.openSlideshow = false
      } else {
        this.current = current + 1
      }
    },
    removeInterval () {
      clearInterval(this.timer)
      clearInterval(this.timerForNav)
      this.time = 0
    },
    setTimer () {
      this.timer = setInterval(() => {
        this.nextStory(this.current)
        this.time = 0
      }, 5000)
      this.timerForNav = setInterval(() => {
        this.time += 1
      }, 100)
    },
    truncateTitle (text) {
      if (this.$store.state.viewport[0] < 1024) {
        return truncate(text, { length: 16 })
      }
      return truncate(text, { length: 27 })
    },
  }
}
</script>
<style lang="stylus" scoped>
.story
  padding 1em 0
  background-color #fff
  border 1px solid #dddfe2
  border-left none
  border-right none
  p
    padding 0 1em
  figure
    position relative
    display inline-block
    width 110px
    height 150px
    margin 0 0 0 1em
    cursor pointer
    & + figure
      margin-left .4em
    &:last-of-type
      margin-right 1em
    &::after
      content ''
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      background-image linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .8) 100%)
    img
      width 100%
      height 100%
      border-radius 4px
      object-fit cover
      object-position center bottom
    figcaption
      position absolute
      left 0
      bottom 0
      z-index 1
      width 100%
      padding .5em
      color #fff
      font-size .8125rem
      text-align justify
      white-space normal
  &-container
    width 100%
    overflow-x auto
    white-space nowrap
  &-slideshow
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 999
    width 100%
    background-color rgba(0,0,0,.8)
    img
      width 100%
      height 100%
      object-fit contain
      object-position center center
      cursor pointer
    &-container
      position relative
      width 100%
      height 100%
    &__header
      position absolute
      top 0
      left 0
      right 0
      z-index 10
      width 100%
      padding 1em 1em 0
      nav
        display flex
        justify-content space-around
        > div
          flex 1
          position relative
          height 3px
          background-color #ccd0d5
          cursor pointer
          & + div
            margin-left 5px
        .process
          position absolute
          top 0
          left 0
          height 100%
          background-color #e19e3d
      &-title
        display flex
        margin-top .5em
        p
          padding 0
          color #fff
          font-size .9375rem
        button
          margin 0 0 0 auto
          img
            width 15px
            height 15px
    &__curtain
      display none
@media (min-width: 768px)
  .story
    &-slideshow
      display flex
      justify-content center
      align-items center
      &-container
        z-index 10
        width 50%
        height 80%
        margin 0 auto

@media (min-width: 1024px)
  .story
    padding 1em
    border-left 1px solid #dddfe2
    border-right 1px solid #dddfe2
    border-radius 4px
    p
      padding 0
    figure
      display flex
      align-items center
      width 100%
      height auto
      margin 0
      font-size 0
      & + figure
        margin 10px 0 0 
      &::after
        content none
      img
        width 50px
        height 50px
        border-radius 50%
      figcaption
        flex 1
        position static
        padding 0
        margin-left 15px
        color #000
        font-size .875rem
        font-weight 600
        text-align justify
    &-container
      white-space normal
    &-slideshow
      display flex
      justify-content center
      align-items center
      img
        position relative
        left 0
        bottom 0
        height calc(100% - 30px)
        object-fit contain
      &-container
        z-index 10
        max-width 375px
        width 25%
        max-height 700px
        height 80%
        padding-top 20px
      &__header-title
        button
          position fixed
          top 15px
          right 15px
      &__curtain
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        width 100%
        display block

</style>
