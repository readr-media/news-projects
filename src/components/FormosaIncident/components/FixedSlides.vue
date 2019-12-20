<template>
  <article class="fixed-slides">
    <div class="fixed-slides__picture-container" ref="pictureContainer">
      <picture class="fixed-slides__picture op-1 scale-1" id="slides-img1">
        <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/1-desk.png">
        <img src="/proj-assets/formosaincident/img/opening/1-mob.png" alt="">
      </picture>
      <picture class="fixed-slides__picture" id="slides-img2">
        <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/2-desk.png">
        <img src="/proj-assets/formosaincident/img/opening/2-mob.png" alt="">
      </picture>
      <picture class="fixed-slides__picture" id="slides-img3">
        <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/3-desk.png">
        <img src="/proj-assets/formosaincident/img/opening/3-mob.png" alt="">
      </picture>
      <div class="fixed-slides__img-wrapper" id="slides-img4-wrapper">
        <picture class="fixed-slides__picture" id="slides-img4">
          <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/4-desk.png">
          <img class="obf-cover" src="/proj-assets/formosaincident/img/opening/4-mob.png" alt="">
        </picture>
        <div id="slides-img4-text">
          <p>你這雜誌哪裡來的！<br>美麗島雜誌破壞團結，你哪裡找來的？<br>這本書我得沒收！</p>
        </div>
      </div>
      <picture class="fixed-slides__picture" id="slides-img5-1">
        <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/5-1-desk.png">
        <img src="/proj-assets/formosaincident/img/opening/5-1-mob.png" alt="">
      </picture>
      <!-- <picture class="fixed-slides__picture" id="slides-img5-2">
        <img src="/proj-assets/formosaincident/img/opening/5-2-mob.png" alt="">
      </picture> -->
      <div class="fixed-slides__img-wrapper" id="slides-img6-wrapper">
        <picture class="fixed-slides__picture" id="slides-img6-1">
          <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/puzzle-desk.png">
          <img class="obf-cover" src="/proj-assets/formosaincident/img/opening/puzzle-mob.png" alt="">
        </picture>
        <picture class="fixed-slides__title" id="slides-img6-2">
          <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/title-desk.png">
          <img class="obf-cover" src="/proj-assets/formosaincident/img/opening/title-mob.png" alt="">
        </picture>
      </div>
    </div>
    <div class="fixed-slides__text-container" ref="textContainer">
      <div class="fixed-slides__text-wrapper" id="slides-text1">
        <p>這就是那本<br>不能讀的禁書嗎？</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="slides-text2">
        <p>「三十年來，國民黨以禁忌、神話隱蔽我們國家社會的許許多多問題⋯⋯」</p>
        <p>許許多多問題⋯⋯是國民黨造成的？</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="slides-text3">
        <p>「民主萬歲！」民主是什麼？會影響我的生活嗎？</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="slides-text4"></div>
      <div class="fixed-slides__text-wrapper" id="slides-text5-1">
        <p>40 年前，臺灣實施報禁，看禁書要把房門窗戶鎖好，看完還得燒掉</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="slides-text5-2"></div>
      <div class="fixed-slides__text-wrapper" id="slides-text5-3">
        <p>40 年前，臺灣實施黨禁，國民黨壟斷政治權力，黨外運動卻越來越熱烈</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="slides-text6-1"></div>
      <div class="fixed-slides__text-wrapper" id="slides-text6-2">
        <p>40 年前，臺灣的民主，因為一間雜誌社，有了截然不同的發展</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="slides-text7"></div>
      <div class="fixed-slides__text-wrapper" id="slides-text8"></div>
    </div>
  </article>
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

      const tween1 = new TimelineLite()
      tween1.to('#slides-img1', 0.3, { opacity: 0 })
      tween1.to('#slides-img2', 0.3, { opacity: 1, scale: 1 })
      new ScrollMagic.Scene(this.setScrollScene('#slides-text2'))
        .setTween(tween1).addTo(controller)
        // .addIndicators()

      const tween2 = new TimelineLite()
      tween2.to('#slides-img2', 0.3, { opacity: 0 })
      tween2.to('#slides-img3', 0.3, { opacity: 1, scale: 1 })
      new ScrollMagic.Scene(this.setScrollScene('#slides-text3'))
        .setTween(tween2).addTo(controller)
        // .addIndicators()

      const tween3 = new TimelineLite()
      tween3.to('#slides-img4', 0.3, { opacity: 1, scale: 1 })
      tween3.to('#slides-img4-text', 0.3, { scale: 1, opacity: 1, ease: Power4.easeOut }, 0.3)
      new ScrollMagic.Scene(this.setScrollScene('#slides-text4', 0.8, '120%'))
        .on('start', function (e) {
          const isForward = e.scrollDirection === 'FORWARD'
          TweenLite.set('#slides-img3', { opacity: isForward ? 0 : 1 })
        })
        .setTween(tween3).addTo(controller)
        // .addIndicators()

      const tween4 = new TimelineLite()
      tween4.to('#slides-img4-wrapper', 0.3, { opacity: 0 })
      tween4.to('#slides-img5-1', 0.3, { opacity: 1 })
      new ScrollMagic.Scene(this.setScrollScene('#slides-text5-1', 0.8, '80%'))
        .on('end', function (e) {
          const isForward = e.scrollDirection === 'FORWARD'
          TweenLite.set('#slides-img6-1', { opacity: isForward ? 1 : 0 })
        })
        .setTween(tween4).addTo(controller)
        // .addIndicators()

      const tween5 = TweenLite.to('#slides-img5-1', 0.3, { scale: 1, ease: Power2.easeOut })
      new ScrollMagic.Scene(this.setScrollScene('#slides-text5-2', 0.5, '80%'))
        // .on('end', function (e) {
        //   const isForward = e.scrollDirection === 'FORWARD'
        //   TweenLite.set('#slides-img5-1', { opacity: isForward ? 0 : 1 })
        //   TweenLite.set('#slides-img5-2', { opacity: isForward ? 1 : 0 })
        // })
        .setTween(tween5).addTo(controller)
        // .addIndicators()

      // const tween6 = TweenLite.to('#slides-img5-2', 0.3, { scale: 0.5, opacity: 0, ease: Power2.easeOut })
      const tween6 = TweenLite.to('#slides-img5-1', 0.3, { transformOrigin: '50% 116%', scale: 0.8, opacity: 0, ease: Power2.easeOut })
      new ScrollMagic.Scene(this.setScrollScene('#slides-text6-1', 0.5, '80%'))
        .setTween(tween6).addTo(controller)
        // .addIndicators()

      const tween7 = new TimelineLite()
      tween7.to('#slides-img6-1', 0.3, { scale: 1 })
      tween7.to('#slides-img6-2', 0.45, { opacity: 1, x: 0 })
      new ScrollMagic.Scene(this.setScrollScene('#slides-text7', 0.5, '160%'))
        .setTween(tween7).addTo(controller)
        // .addIndicators()

      new ScrollMagic.Scene(this.setScrollScene('#slides-text8', 1, 0))
        .on('progress', (e) => {
          const isForward = e.scrollDirection === 'FORWARD'
          const { pictureContainer, textContainer } = this.$refs
          const { height: textContainerH } = textContainer.getBoundingClientRect()

          TweenLite.set(pictureContainer, { position: isForward ? 'absolute' : '' })
          TweenLite.set('#slides-img6-wrapper', { marginTop: isForward ? `${(textContainerH - this.$store.state.viewport[ 1 ])}px` : 0 })
        })
        .addTo(controller)
        // .addIndicators()
    },
    setScrollScene (triggerElement, triggerHook = 0.8, duration = '40%') {
      return {
        triggerElement,
        triggerHook,
        duration
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

#slides-img4
  background-image radial-gradient(circle at 50% 50%, #7a6a56, #000000 86%)
#slides-img4-text
  position absolute
  width 100%
  top 50%
  left 50%
  transform translate(-50%, -50%) scale(0)
  font-size 2.1rem
  color #fff
  line-height 2.76
  font-weight 500
  text-align center
  padding-right 34px
  padding-left 34px
  opacity 0
  @media (min-width $breakpoint.sm)
    font-size 4rem
    line-height 1.45
  // transform scale(0)
// #slides-img5-1, #slides-img5-2
//   background-image none
#slides-img5-1
  // (643 / 2 + 99) / 1572
  transform-origin 50% 26.75%
  transform scale(4)
  background-image none
// #slides-img5-2
//   transform-origin 50% 64%
#slides-img6-1
  z-index -1
  transform scale(2)

#slides-text1
  margin-top 20vh
#slides-text4
  height 180vh
#slides-text5-1
  height 140vh
#slides-text7
  height 220vh
#slides-text8
  height 0

.fixed-slides
  position relative
  &__picture-container
    position fixed
    width 100%
    height 100vh
    top 0
    left 0
    background-color #000
  &__picture
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-image radial-gradient(circle at 50% 50%, #7a6a56, #000000 270%)
    opacity 0
    transform scale(1.02)
    &.op-1
      opacity 1
    &.scale-1
      transform scale(1)
    & img
      width 100%
      height 100%
      object-fit contain
      &.obf-cover
        object-fit cover
  &__title
    position absolute
    width 100%
    left 0
    bottom 31.4%
    opacity 0
    transform translateX(-24px)
    & img
      margin-right auto
      margin-left auto
      max-width 320px
      height auto
  &__img-wrapper
    position absolute
    width 100%
    height 100%
  &__text-container
    position relative
    color #fff
    font-size 1.8rem
    line-height 2
    @media (min-width $breakpoint.sm)
      font-size 2.4rem
      line-height 1.5
  &__text-wrapper
    text-align center
    max-width 280px
    margin-right auto
    margin-left auto
    height 100vh
    display flex
    flex-direction column
    justify-content center
    @media (min-width $breakpoint.sm)
      max-width 700px
    & p
      padding 14px 22px
      background-color rgba(0, 0, 0, 0.9)
      box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
      @media (min-width $breakpoint.sm)
        padding 22px 125px
</style>
