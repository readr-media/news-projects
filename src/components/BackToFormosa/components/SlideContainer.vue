<template>
  <div class="slide-container">
    <SlideItem v-for="(item, key) in slideItems" :style="{ backgroundColor: item.bgColor }" :ref="`slideItem${key}`" :key="key">
      <div class="slide-item__bg-img" v-for="bgImg in item.bgImgs" :style="bgImgStyle(bgImg, item)" />
      <div
        :class="[ 'slide-item__text', item.content.color === 'dark' ? 'dark' : '' ]"
        :style="textStyle(item.content)"
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
    window.addEventListener('scroll', this.controlBgImgAnimation)
    this.controlBgImgAnimation()
  },
  data () {
    return {
      curtSlideItemId: 1,
      animatedItemIds: [ 1 ],
      slideItems
    }
  },
  methods: {
    bgImgStyle ({ name, animation = 'none' }, { canAnimate = false }) {
      return {
        backgroundImage: `url(/proj-assets/backtoformosa/img/${name}.png)`,
        animation,
        animationPlayState: canAnimate ? 'running' : 'paused'
      }
    },
    textStyle ({ position = { top: 0, left: 0 } }) {
      const { top = 'auto', right = 'auto', bottom = 'auto', left = 'auto' } = position
      return { top, right, bottom, left }
    },
    controlBgImgAnimation () {
      // console.log('enter')
      const nextSlideItemId = this.curtSlideItemId + 1
      if (this.animatedItemIds.includes(nextSlideItemId)) { return }

      // console.log('detect')
      const slideItem = this.$refs[ `slideItem${nextSlideItemId}` ][ 0 ].$el
      const { top } = slideItem.getBoundingClientRect()
      if (top <= 0) {
        this.slideItems[ nextSlideItemId ].canAnimate = true
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
@keyframes slide1
  0%
    transform scale(1)
  100%
    transform scale(1.1)

@keyframes slide2-back
  0%
    transform scale(1)
  100%
    transform scale(1.1)

@keyframes slide2-front
  0%
    transform scale(1)
  100%
    transform scale(1.2)
</style>
