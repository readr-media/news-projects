<template>
  <section class="fixed-slides">
    <div class="fixed-slides__picture-container">
      <picture class="op-1" id="picture1">
        <!-- <source media="(min-width: 720px)" srcset=""> -->
        <img class="obf-contain" src="/proj-assets/formosaincident/img/opening/1-mob.png" alt="">
      </picture>
      <picture id="picture2">
        <img class="obf-contain" src="/proj-assets/formosaincident/img/opening/2-mob.png" alt="">
      </picture>
      <picture id="picture3">
        <img class="obf-contain" src="/proj-assets/formosaincident/img/opening/3-mob.png" alt="">
      </picture>
      <div class="picture-bg" id="picture4-bg"></div>
      <picture id="picture4">
        <img class="obf-cover" src="/proj-assets/formosaincident/img/opening/4-mob.png" alt="">
      </picture>
      <div class="picture-text" id="picture4-text">
        <p>你這雜誌哪裡來的！<br>美麗島雜誌破壞團結，你哪裡找來的？<br>這本書我得沒收！</p>
      </div>
      <picture id="picture5">
        <img class="obf-contain" src="/proj-assets/formosaincident/img/opening/6-mob.png" alt="">
      </picture>
    </div>
    <div class="fixed-slides__text-container">
      <div class="fixed-slides__text-wrapper" id="text-wrapper1">
        <p>這就是那本<br>不能讀的禁書嗎？</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="text-wrapper2">
        <p>「三十年來，國民黨以禁忌、神話隱蔽我們國家社會的許許多多問題⋯⋯」</p>
        <p>許許多多問題⋯⋯是國民黨造成的？</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="text-wrapper3">
        <p>「民主萬歲！」民主是什麼？會影響我的生活嗎？</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="text-wrapper4"></div>
      <div class="fixed-slides__text-wrapper" id="text-wrapper5"></div>
      <div class="fixed-slides__text-wrapper" id="text-wrapper6">
        <p>40 年前，臺灣實施報禁，看禁書要把房門窗戶鎖好，看完還得燒掉</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FixedSlides',
  mounted () {
    this.animateOpening()
  },
  methods: {
    animateOpening () {
      const controller = new ScrollMagic.Controller()

      const tl1 = new TimelineLite()
      tl1.to('#picture1', 0.3, { opacity: 0 })
      tl1.to('#picture2', 0.3, { opacity: 1, scale: 1 })
      const scene1 = new ScrollMagic.Scene({
        triggerElement: '#text-wrapper2',
        duration: '40%'
      }).setTween(tl1).addTo(controller).addIndicators()

      const tl2 = new TimelineLite()
      tl2.to('#picture2', 0.3, { opacity: 0 })
      tl2.to('#picture3', 0.3, { opacity: 1, scale: 1 })
      const scene2 = new ScrollMagic.Scene({
        triggerElement: '#text-wrapper3',
        duration: '40%'
      }).setTween(tl2).addTo(controller).addIndicators()

      // const tl3 = new TimelineLite()
      // tl3.to('#picture3', 0.075, { opacity: 0 })
      // tl3.to('#picture4-bg', 0.075, { opacity: 1 }, 0)
      // const scene3 = new ScrollMagic.Scene({
      //   triggerElement: '#text-wrapper4'
      // }).setTween(tl3).addIndicators()

      // const tl4 = new TimelineLite()
      // tl4.to('#picture4', 0.075, { opacity: 1 })
      // tl4.from('#picture4-text', 0.3, { scale: 0, opacity: 0, ease: Back.easeOut.config(1.7) })
      // const scene4 = new ScrollMagic.Scene({
      //   triggerElement: '#text-wrapper5',
      //   triggerHook: 0.8
      // }).setTween(tl4).addIndicators()

      // const tl5 = new TimelineLite()
      // tl5.to(['#picture4', '#picture4-text'], 0.3, { opacity: 0 })
      // tl5.to('#picture5', 0.3, { opacity: 1 })
      // const scene5 = new ScrollMagic.Scene({
      //   triggerElement: '#text-wrapper6',
      //   triggerHook: 0.8
      // }).setTween(tl5).addIndicators()

      // controller.addScene([ scene1, scene2, scene3, scene4, scene5 ])
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

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
      transform scale(1.02)
      background-image radial-gradient(circle at 50% 50%, #7a6a56, #000000 270%)
      &.op-1
        opacity 1
    & .picture-bg
      position absolute
      width 100%
      height 100%
      background-color #000
      opacity 0
    & .picture-text
      position absolute
      width 100%
      top 50%
      left 50%
      transform translate(-50%, -50%)
      font-size 2.1rem
      color #fff
      line-height 2.5
      font-weight 500
      text-align center
      padding-right 34px
      padding-left 34px
      // transform scale(0)
      // opacity 0
    & img
      width 100%
      height 100%
      // object-fit cover
      &.obf-cover
        object-fit cover
      &.obf-contain
        object-fit contain
      // object-position center top
  &__text-container
    position relative
    color #fff
    font-size 1.8rem
    // line-height 2
    @media (min-width $breakpoint.sm)
      font-size 2.4rem
      // line-height 1.5
  &__text-wrapper
    // padding-top 80vh
    text-align center
    max-width 280px
    margin-right auto
    margin-left auto
    padding-top 40vh
    padding-bottom 40vh
    &:first-child
      padding-top 50vh
    @media (min-width $breakpoint.sm)
      max-width 700px
    // & + .fixed-slides__text-wrapper
    //   padding-top 80vh
    & p
      // padding 14px 22px
      background-color #000
      box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
      // @media (min-width $breakpoint.sm)
      //   padding 22px 125px
</style>
