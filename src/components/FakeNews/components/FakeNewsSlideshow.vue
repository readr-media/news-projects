<template>
  <div class="slideshow">
    <div class="preview">
      <template v-for="(item, index) in slideshowImages">
        <div :key="item" class="preview__img" @click="handleSlideshow(index)">
          <img :src="item">
        </div>
      </template>
    </div>
    <div v-show="openSlideshow" class="lightbox">
      <div class="lightbox__header">
        <button @click="openSlideshow = false"></button>
        <p>假訊息與它們的產地</p>
      </div>
      <div class="lightbox-container">
        <div class="lightbox__img">
          <img v-for="(item, index) in slideshowImages" v-show="index === current" :key="`lightbox-${item}`" :class="{ active: current === index }" :src="item">
          <button
            v-if="current !== 0"
            class="left"
            @click="current -= 1">
            <img src="/proj-assets/fake-news/arrow_toleft.png" alt="上一個">
          </button>
          <button
            v-if="current !== slideshowImages.length - 1"
            class="right"
            @click="current += 1">
            <img src="/proj-assets/fake-news/arrow_toright.png" alt="下一個">
          </button>
        </div>
        <div class="lightbox__caption">
          <p v-text="slideshow.content[current].figcaption"></p>
          <p class="resource" v-text="slideshow.resource"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FakeNewsSlideshow',
  props: {
    slideshow: {
      type: Object
    }
  },
  data () {
    return {
      current: 0,
      openSlideshow: false,
    }
  },
  computed: {
    slideshowImages () {
      return this.slideshow.content.map(item => item.src)
    }
  },
  methods: {
    handleSlideshow (index) {
      this.openSlideshow = true
      this.current = index
    }
  }
}
</script>
<style lang="stylus" scoped>
.slideshow
  position relative
  left -1em
  width calc(100% + 2em)

.preview
  display flex
  flex-wrap wrap
  justify-content space-between
  background-color #f5f6f7
  &__img
    position relative
    width calc(50% - .1em)
    padding-top 50%
    cursor pointer
    & + .preview__img
      margin-top .2em
    &:first-child
      width 100%
      padding-top 66.66%
    img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      object-fit cover
      object-position center center

.lightbox
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 999
  width 100%
  background-color #fff
  &__header
    position absolute
    top 0
    left 0
    right 0
    z-index 10
    width 100%
    height 42px
    background-color #4868a5
    p
      color #fff
      line-height 42px
      text-align center
    button
      position absolute
      top 0
      left 0
      height 100%
      width 42px
      background-image url(/proj-assets/fake-news/back.png)
      background-repeat no-repeat
      background-position center center
      background-size 10px auto
      
  &-container
    height 100%
    padding-top 42px
    overflow-y auto
  &__img
    position relative
    width 100%
    padding-top 100%
    > img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      object-fit contain
      object-position center center
    button
      position absolute
      top 50%
      transform translateY(-50%)
      width 40px
      padding 0
      font-size 0
      &.left
        left 0
      &.right
        right 0
  &__caption
    padding 0 1em
    p.resource
      margin-top .5em
      text-align justify

@media (min-width: 1024px)
  .lightbox
    background-color rgba(0,0,0,.8)
    &-container
      display flex
      padding 35px
    &__header
      background-color transparent
      p
        display none
      button
        left auto
        right 0
        width 35px
        height 35px
        background-image url(/proj-assets/fake-news/close.png)
        background-size 15px auto
    &__img
      width 75%
      padding 0
      background-color #000
    &__caption
      width 25%
      padding 1em
      background-color #fff
</style>
