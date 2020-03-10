<template>
  <div class="slide-container">
    <SlideItem v-for="(item, key) in slideItems" :style="slideItemStyle(item)" :ref="`slideItem${key}`" :key="`slideItem${key}`" :id="`slide-item--${key}`">
      <picture class="slide-item__picture" v-for="picture in item.pictures" :style="pictureStyle(picture, item.animationPlayState)" :id="`slide-item__picture--${picture.name}`">
        <img :src="`/proj-assets/backtoformosa/img/opening/${picture.name}.${picture.type}`" alt="">
      </picture>
      <div
        v-if="Object.keys(item.content).length"
        :id="`slide-item__text--${key}`"
        class="slide-item__text"
        :class="[ ...item.content.classNames ]"
        :style="textStyle(item.content, item.animationPlayState)"
        v-html="item.content.text"
      >
      </div>
    </SlideItem>
  </div>
</template>

<script>
import { raf } from '../util/'

import slideItems from '../data/slideItems.js'
import SlideItem from './SlideItem.vue'

export default {
  name: 'SlideContainer',
  components: {
    SlideItem
  },
  mounted () {
    window.addEventListener('scroll', raf(this.controlSlideItemAnimation))
    // this.controlSlideItemAnimation()
  },
  data () {
    return {
      curtSlideItemId: 1,
      animatedItemIds: [ 1 ],
      slideItems
    }
  },
  computed: {
    wh () {
      return this.$store.state.viewport[ 1 ]
    }
  },
  methods: {
    slideItemStyle ({ animation = 'none', animationPlayState = 'paused' }) {
      return {
        animation,
        animationPlayState
      }
    },
    pictureStyle ({ animation = 'none' }, animationPlayState = 'paused') {
      return {
        animation,
        animationPlayState
      }
    },
    textStyle ({ animation = 'none' }, animationPlayState = 'paused') {
      return {
        animation,
        animationPlayState
      }
    },
    controlSlideItemAnimation () {
      // console.log('enter')

      const nextSlideItemId = this.curtSlideItemId + 1
      if (this.animatedItemIds.includes(nextSlideItemId)) { return }

      // console.log('detect')
      const slideItem = this.$refs[ `slideItem${nextSlideItemId}` ][ 0 ].$el
      const { top } = slideItem.getBoundingClientRect()
      if ((top - this.wh * 0.25) <= 0) {
        // console.log('trigger')

        this.slideItems[ nextSlideItemId ][ 'animationPlayState' ] = 'running'
        this.animatedItemIds.push(nextSlideItemId)
        if (nextSlideItemId < Object.keys(this.slideItems).length) {
          this.curtSlideItemId += 1
        }
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.slide-item
  &__text
    &.description
      font-size 3.0rem
      font-weight 700
      line-height 1.67
      color #fff
      width 100%
      text-align center
      & > div
        font-size 2.0rem
        // line-height 1.4
        margin-top 124px
        font-weight 400
        & p + p
          margin-top 15px

#slide-item
  &--5
    display flex
    align-items center
    padding-top 30vh
    padding-bottom 30vh
    background-image linear-gradient(to bottom, #000000, #a56c6a)
  &--6
    background-color #a56c6a
  &__picture
    &--slide6-title
      // max-width 300px
      width 93.75%
      height auto
      top auto
      left 50%
      transform translateX(-50%)
      bottom 0
      padding-right 10px
      padding-left 10px
      box-sizing content-box
      @media (min-width $breakpoint-md)
        // max-width 928px
        width 64.51%
        right 55px
        left auto
        transform translateX(0)
        padding-right 0
        padding-left 0
      & img
        // @media (min-width $breakpoint-md)
        height auto
        object-fit fill
  &__text
    &--1
      // min-width 200px
      // width 100%
      // left 50%
      bottom 7.04%
      // transform translateX(-50%)
      @media (min-width $breakpoint-md)
        bottom 4.83%
        left 12.99%
        // transform translateX(0)
        // width auto
    &--2
      top 7.04%
      @media (min-width $breakpoint-md)
        top 8.02%
        left 11.6%
    &--4
      top 7.04%
      @media (min-width $breakpoint-md)
        top 7.9%
        left 10%
    &--5
      position relative
      // @media (min-width $breakpoint-md)
      left auto
      transform translateX(0)

@keyframes take-in
  0%
    opacity 0.5
    // transform translateX(-50%)
  // 90%
  //   transform translateX(0%) rotate(3deg)
  100%
    opacity 1
    // transform translateX(0%)

@keyframes slide-content
  0%
    opacity 0
    transform translateY(-32px)
  100%
    opacity 1
    transform translateY(0px)

// @keyframes slide1-img
//   0%
//     transform scale(1)
//   100%
//     transform scale(1.05)

@keyframes slide-img-back
  0%
    transform scale(1)
  100%
    transform scale(1.05)

@keyframes slide-img-front
  0%
    transform scale(1)
  100%
    transform scale(1.1)
</style>
