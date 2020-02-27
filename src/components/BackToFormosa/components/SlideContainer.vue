<template>
  <div class="slide-container">
    <SlideItem v-for="(item, key) in slideItems" :style="{ backgroundColor: item.bgColor }" :ref="`slideItem${key}`" :key="`slideItem${key}`">
      <picture class="slide-item__img" v-for="img in item.imgs" :style="imgStyle(img, item.animationPlayState)">
        <img :src="`/proj-assets/backtoformosa/img/${img.name}.png`" alt="">
      </picture>
      <div
        :class="[ 'slide-item__text', item.content.color ]"
        :style="textStyle(item.content, item.animationPlayState)"
      >
        <p v-for="text in item.content.texts">{{ text }}</p>
      </div>
    </SlideItem>
  </div>
</template>

<script>
import slideItems from '../data/slideItems.js'
import SlideItem from './SlideItem.vue'

export default {
  name: 'SlideContainer',
  components: {
    SlideItem
  },
  mounted () {
    window.addEventListener('scroll', this.controlSlideItemAnimation)
    this.controlSlideItemAnimation()
  },
  data () {
    return {
      curtSlideItemId: 1,
      animatedItemIds: [ 1 ],
      slideItems
    }
  },
  methods: {
    imgStyle ({ name, animation = 'none' }, animationPlayState = 'paused') {
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
      if (top <= 0) {
        this.slideItems[ nextSlideItemId ][ 'animationPlayState' ] = 'running'
        this.animatedItemIds.push(nextSlideItemId)
        if (nextSlideItemId < this.slideItems.length) {
          this.curtSlideItemId += 1
        }
      }
    }
  }
}
</script>

<style lang="stylus">
@keyframes slide-content
  0%
    opacity 0
    transform translateY(-32px)
  100%
    opacity 1
    transform translateY(0px)

@keyframes slide1-img
  0%
    transform scale(1)
  100%
    transform scale(1.05)

@keyframes slide2-img-back
  0%
    transform scale(1)
  100%
    transform scale(1.05)

@keyframes slide2-img-front
  0%
    transform scale(1)
  100%
    transform scale(1.1)
</style>
