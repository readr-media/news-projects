<template>
  <div class="slide-container">
    <div class="bg bg--between" id="bg-between-opening" ref="bgBetweenOpening" />

    <SlideItem v-for="(item, key) in slideItems" :ref="`slideItem${key}`" :key="`slideItem${key}`" :id="`slide-item--${key}`" :class="{ paused: !item.canAnimate }">
      <picture class="slide-item__picture" v-for="picture in item.pictures" :id="`slide-item__picture--${picture.name}`">
        <!-- <source media="(min-width: 460px) and (max-width: 719.98px)" :srcset="`/proj-assets/backtoformosa/img/opening/${picture.name}-ts.${picture.type}`"> -->
        <source media="(min-width: 720px) and (max-width: 999.98px)" :srcset="`/proj-assets/backtoformosa/img/opening/${picture.name}-tl.${picture.type}`">
        <source media="(min-width: 1000px)" :srcset="`/proj-assets/backtoformosa/img/opening/${picture.name}-ds.${picture.type}`">
        <img :src="`/proj-assets/backtoformosa/img/opening/${picture.name}-ts.${picture.type}`" alt="">
      </picture>
      <div
        v-if="Object.keys(item.content).length"
        :id="`slide-item__text--${key}`"
        class="slide-item__text"
        :class="item.content.className"
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
    controlSlideItemAnimation () {
      // console.log('enter')

      const nextSlideItemId = this.curtSlideItemId + 1
      if (this.animatedItemIds.includes(nextSlideItemId)) { return }

      // console.log('detect')
      const slideItem = this.$refs[ `slideItem${nextSlideItemId}` ][ 0 ].$el
      const { top } = slideItem.getBoundingClientRect()
      if ((top - this.wh * 0.25) <= 0) {
        // console.log('trigger')

        this.slideItems[ nextSlideItemId ][ 'canAnimate' ] = true
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
        margin-top 124px
        font-weight 400
        & p + p
          margin-top 15px

#slide-item
  &--1
    background-color #9e655f
  &--2
    background-color #000
  &--4
    background-color #9f6260
  &--5
    display flex
    align-items center
    padding-top 30vh
    padding-bottom 30vh
    background-image linear-gradient(to bottom, #000000, #a56c6a)
  &--6
    background-color #a56c6a
  &__picture
    &--slide1-back, &--slide2-back
      animation slide-img-back-default 3s $easeInOutCubic both
    &--slide1-front, &--slide2-front
      animation slide-img-front-default 3s $easeInOutCubic both
    &--slide3
      &-title1
        animation slide3-img 0.9s $easeInOutExpo both
      &-title2
        animation slide3-img 0.9s 0.45s $easeInOutExpo both
      &-title3
        animation slide3-img 0.9s 0.9s $easeInOutExpo both
      &-title4
        animation slide3-img 0.6s 1.35s $easeInOutExpo both
      &-title5
        animation slide3-img 0.6s 1.65s $easeInOutExpo both
      &-title6
        animation slide3-img 0.6s 1.95s $easeInOutExpo both
      &-title7
        animation slide3-img 0.3s 2.25s $easeInOutExpo both
      &-title8
        animation slide3-img 0.3s 2.4s $easeInOutExpo both
    &--slide4
      &-back
        animation slide4-img-back 3s $easeInOutCubic both
      &-front
        animation slide4-img-front 3s $easeInOutCubic both
    &--slide6-title
      width 93.75%
      height auto
      top auto
      margin-right auto
      margin-left auto
      bottom 0
      padding-right 10px
      padding-left 10px
      box-sizing content-box
      animation slide6-img-title 0.9s $easeInOutCubic both
      @media (min-width $breakpoint-tl)
        width 64.51%
        right 3.8%
        left auto
        margin-left 0
        margin-right 0
        padding-right 0
        padding-left 0
      & img
        height auto
        object-fit fill
  &__text
    &--1
      bottom 7.04%
      @media (min-width $breakpoint-tl)
        bottom 4.83%
        left 12.99%
    &--2
      top 7.04%
      @media (min-width $breakpoint-tl)
        top 8.02%
        left 11.6%
    &--4
      top 7.04%
      @media (min-width $breakpoint-tl)
        top 7.9%
        left 10%
    &--5
      position relative
      left auto
      transform translateX(0)
      animation slide5-text 0.75s $easeOutSine both
      & > div
        animation slide5-text 0.75s 0.75s $easeOutSine both

// animations
@keyframes slide-img-back-default
  0%
    // transform scale(1.12)
    transform scale(1)
  100%
    transform scale(1.06)
@keyframes slide-img-front-default
  0%
    // transform scale(1.06)
    transform scale(1)
  100%
    transform scale(1.12)
    // transform scale(1)

@keyframes slide-text-default
  0%
    opacity 0
    transform translate(-50%, 24px)
  100%
    opacity 1
    transform translateY(-50%, 0px)

@keyframes slide-text-default-md
  0%
    opacity 0
    transform translateY(24px)
  100%
    opacity 1
    transform translateY(0px)

@keyframes slide5-text
  0%
    opacity 0
    transform translateY(24px)
  100%
    opacity 1
    transform translateY(0px)


@keyframes slide3-img
  0%
    opacity 0
    transform scale(3)
  100%
    opacity 1
    transform scale(1)

@keyframes slide4-img-back
  0%
    transform scale(1)
  100%
    transform scale(1.06)
@keyframes slide4-img-front
  0%
    transform scale(1)
  100%
    transform scale(1.12)

@keyframes slide6-img-title
  0%
    opacity 0
    transform translateX(-24px)
  100%
    opacity 1
    transform translateX(0px)
</style>
