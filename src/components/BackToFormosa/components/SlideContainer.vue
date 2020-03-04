<template>
  <div class="slide-container">
    <SlideItem v-for="(item, key) in slideItems" :style="slideItemStyle(item)" :ref="`slideItem${key}`" :key="`slideItem${key}`">
      <picture v-for="picture in item.pictures" :style="pictureStyle(picture, item.animationPlayState)" :class="[ 'slide-item__picture', picture.className ]">
        <img :src="`/proj-assets/backtoformosa/img/opening/${picture.name}.png`" alt="">
      </picture>
      <div
        v-if="Object.keys(item.content).length"
        :class="[ 'slide-item__text', ...item.content.classNames ]"
        :style="textStyle(item.content, item.animationPlayState)"
      >
        <p v-for="text in item.content.texts">{{ text }}</p>
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
    slideItemStyle ({ bgStyle, animation = 'none', animationPlayState = 'paused' }) {
      return {
        ...bgStyle,
        animation,
        animationPlayState
      }
    },
    pictureStyle ({ name, animation = 'none' }, animationPlayState = 'paused') {
      return {
        animation,
        animationPlayState
      }
    },
    textStyle ({ position = { top: 0, left: 0 }, animation = 'none' }, animationPlayState = 'paused') {
      return {
        ...position,
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
