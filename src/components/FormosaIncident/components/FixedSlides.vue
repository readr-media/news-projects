<template>
  <section class="fixed-slides">
    <div class="fixed-slides__picture-container">
      <picture v-for="slide in slides" :key="slide.id" :class="{ active: slide.id === slideActiveId }">
        <!-- <source media="(min-width: 460px) and (max-width: 719.98px)" :srcset="imgSrc(imgId, 'tablet-small')">
        <source media="(min-width: 720px) and (max-width: 999.98px)" :srcset="imgSrc(imgId, 'tablet-large')">
        <source media="(min-width: 1000px) and (max-width: 1599.98px)" :srcset="imgSrc(imgId, 'desktop-small')">
        <source media="(min-width: 1600px)" :srcset="imgSrc(imgId, 'desktop-large')"> -->
        <!-- <img class="lazyer" loading="lazy" :data-src="imgSrc(imgId, 'mobile')" src="" alt=""> -->
        <img :src="slide.imgName" alt="">
      </picture>
    </div>
    <div class="fixed-slides__text-container">
      <div class="fixed-slides__text-wrapper" v-for="slide in slides" :key="slide.id">
        <p :id="`text${slide.id}`">{{ slide.text }}</p>
      </div>
    </div>
  </section>
</template>

<script>
// todo remove package
// if (typeof window !== 'undefined') {
//   import "scrollmagic/scrollmagic/minified/ScrollMagic.min.js"
// }

export default {
  name: 'FixedSlides',
  data () {
    return {
      slideActiveId: 1,
      slides: [
        {
          id: 1,
          imgName: 'https://picsum.photos/id/0/800/600',
          text: '這就是那本不能讀的禁書嗎？'
        },
        {
          id: 2,
          imgName: 'https://picsum.photos/id/1/800/600',
          text: '「三十年來，國民黨以禁忌、神話隱蔽我們國家社會的許許多多問題⋯⋯」'
        },
        {
          id: 3,
          imgName: 'https://picsum.photos/id/10/800/600',
          text: '「民主萬歲！」民主是什麼？會影響我的生活嗎？'
        }
      ]
    }
  },
  mounted () {
    this.animateOpening()
  },
  methods: {
    animateOpening () {
      const controller = new ScrollMagic.Controller()
      // const tl1 = new TimelineMax()
      // tl1.set(this, {
      //   slideActiveId: 2
      // })
      const tween = new TweenLite.set(this, {
        slideActiveId: 2
      })
      var scene1 = new ScrollMagic.Scene({
        triggerElement: '#text2',
        triggerHook: 0.5
      }).setTween(tween)
      controller.addScene(scene1)
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.fixed-slides
  position relative
  &__picture-container
    position fixed
    width 100%
    height 100vh
    top 0
    left 0
    & picture
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      opacity 0
      &.active
        opacity 1
    & img
      width 100%
      height 100%
      object-fit cover
      object-position center top
  &__text-container
    position relative
    color #fff
    font-size 1.8rem
    line-height 2
    @media (min-width $breakpoint.sm)
      font-size 2.4rem
      line-height 1.5
  &__text-wrapper
    // padding-top 80vh
    text-align center
    max-width 280px
    margin-right auto
    margin-left auto
    @media (min-width $breakpoint.sm)
      max-width 700px
    & + .fixed-slides__text-wrapper
      padding-top 80vh
    & p
      // padding 14px 22px
      background-color #000
      box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
      // @media (min-width $breakpoint.sm)
      //   padding 22px 125px
</style>
