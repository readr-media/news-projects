<template>
  <article class="fixed-slides">
    <div class="fixed-slides__picture-container" ref="pictureContainer">
      <picture class="fixed-slides__picture first" ref="img1">
        <source type="image/webp" media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/1-desk.webp">
        <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/1-desk.png">
        <source type="image/webp" srcset="/proj-assets/formosaincident/img/opening/1-mob.webp">
        <img src="/proj-assets/formosaincident/img/opening/1-mob.png" alt="">
      </picture>

      <picture class="fixed-slides__picture" ref="img2">
        <source type="image/webp" media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/2-desk.webp">
        <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/2-desk.png">
        <source type="image/webp" srcset="/proj-assets/formosaincident/img/opening/2-mob.webp">
        <img src="/proj-assets/formosaincident/img/opening/2-mob.png" alt="">
      </picture>

      <picture class="fixed-slides__picture" ref="img3">
        <source type="image/webp" media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/3-desk.webp">
        <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/3-desk.png">
        <source type="image/webp" srcset="/proj-assets/formosaincident/img/opening/3-mob.webp">
        <img src="/proj-assets/formosaincident/img/opening/3-mob.png" alt="">
      </picture>

      <div class="fixed-slides__img-wrapper" ref="img4Wrapper">
        <picture class="fixed-slides__picture" id="slides-img4" ref="img4">
          <source type="image/webp" media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/4-desk.webp">
          <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/4-desk.png">
          <source type="image/webp" srcset="/proj-assets/formosaincident/img/opening/4-mob.webp">
          <img class="obf-cover" src="/proj-assets/formosaincident/img/opening/4-mob.png" alt="">
        </picture>
        <div id="slides-img4-text" ref="img4Text">
          <p>你這雜誌哪裡來的！<br>美麗島雜誌破壞團結，你哪裡找來的？<br>這本書我得沒收！</p>
        </div>
      </div>

      <picture class="fixed-slides__picture" id="slides-img5" ref="img5" :class="$parent.isDeskW ? 'desk' : ''">
        <source type="image/webp" media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/5-desk.webp">
        <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/5-desk.png">
        <source type="image/webp" srcset="/proj-assets/formosaincident/img/opening/5-mob.webp">
        <img src="/proj-assets/formosaincident/img/opening/5-mob.png" alt="">
      </picture>

      <div class="fixed-slides__img-wrapper" id="slides-img6-wrapper" ref="img6Wrapper">
        <picture class="fixed-slides__picture" id="slides-img6-1" ref="img61">
          <source type="image/webp" media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/puzzle-desk.webp">
          <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/puzzle-desk.png">
          <source type="image/webp" srcset="/proj-assets/formosaincident/img/opening/puzzle-mob.webp">
          <img class="obf-cover" src="/proj-assets/formosaincident/img/opening/puzzle-mob.png" alt="">
        </picture>
        <picture class="fixed-slides__title" id="slides-img6-2" ref="img62" :class="$parent.isDeskW ? 'desk' : ''">
          <source type="image/webp" media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/title-desk.webp">
          <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/opening/title-desk.png">
          <source type="image/webp" srcset="/proj-assets/formosaincident/img/opening/title-mob.webp">
          <img class="obf-cover" src="/proj-assets/formosaincident/img/opening/title-mob.png" alt="">
        </picture>
      </div>
    </div>

    <div class="fixed-slides__text-container" ref="textContainer">
      <div class="fixed-slides__text-wrapper" id="slides-text1" >
        <p>「這是什麼啊？」</p>
      </div>
      <div class="fixed-slides__text-wrapper" ref="text2">
        <p>「三十年來，國民黨以禁忌、神話隱蔽我們國家社會的許許多多問題⋯⋯」</p>
        <p>許許多多問題⋯⋯是國民黨造成的？</p>
      </div>
      <div class="fixed-slides__text-wrapper" ref="text3">
        <p>「民主萬歲！」民主是什麼？會影響我的生活嗎？</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="slides-text4" ref="text4"></div>
      <div class="fixed-slides__text-wrapper" id="slides-text5-1" ref="text51">
        <p>40 年前，臺灣實施報禁，看禁書要把房門窗戶鎖好，看完還得燒掉</p>
      </div>
      <div class="fixed-slides__text-wrapper" ref="text52"></div>
      <div class="fixed-slides__text-wrapper">
        <p>40 年前，臺灣實施黨禁，國民黨壟斷政治權力，黨外運動卻越來越熱烈</p>
      </div>
      <div class="fixed-slides__text-wrapper" ref="text61"></div>
      <div class="fixed-slides__text-wrapper">
        <p>40 年前，臺灣的民主，因為一間雜誌社，有了截然不同的發展</p>
      </div>
      <div class="fixed-slides__text-wrapper" id="slides-text7" ref="text7"></div>
      <div class="fixed-slides__text-wrapper" id="slides-text8" ref="text8"></div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'FixedSlides',
  mounted () {
    this.animateSlides()
  },
  computed: {
    img5Scale () {
      const [ ww, wh ] = this.$store.state.viewport
      const windowAspectRatio = ww / wh

      let imgOriginW
      let imgOriginH
      let imgInnerPhotoOriginW
      let imgInnerPhotoOriginH
      
      if (ww >= 720) {
        imgOriginW = 3845
        imgOriginH = 2627
        imgInnerPhotoOriginW = 1200
        imgInnerPhotoOriginH = 839
      } else {
        imgOriginW = 1215
        imgOriginH = 1572
        imgInnerPhotoOriginW = 920
        imgInnerPhotoOriginH = 643
      }

      const imgAspectRatio = imgOriginW / imgOriginH
      const imgObjectFitContainRatio = (windowAspectRatio >= imgAspectRatio ? wh / imgOriginH : ww / imgOriginW)

      const imgInnerPhotoW = imgInnerPhotoOriginW * imgObjectFitContainRatio
      const imgInnerPhotoH = imgInnerPhotoOriginH * imgObjectFitContainRatio

      const imgInnerPhotoAspectRatio = imgInnerPhotoOriginW / imgInnerPhotoOriginH
      const scale = Math.ceil(windowAspectRatio >= imgInnerPhotoAspectRatio ? ww / imgInnerPhotoW : wh / imgInnerPhotoH)
      return scale
    }
  },
  methods: {
    animateSlides () {
      const {
        img1,
        img2,
        img3,
        img4Wrapper,
        img4,
        img4Text,
        img5,
        img6Wrapper,
        img61,
        img62,
        text2,
        text3,
        text4,
        text51,
        text52,
        text61,
        text7,
        text8,
        pictureContainer,
        textContainer
      } = this.$refs

      const [ ww, wh ] = this.$store.state.viewport

      const controller = new ScrollMagic.Controller()

      const tween1 = new TimelineLite()
      tween1.to(img1, 0.3, { opacity: 0 })
      tween1.to(img2, 0.3, { opacity: 1, scale: 1 })
      new ScrollMagic.Scene(this.setScrollScene(text2))
        .setTween(tween1).addTo(controller)
        // .addIndicators()

      const tween2 = new TimelineLite()
      tween2.to(img2, 0.3, { opacity: 0 })
      tween2.to(img3, 0.3, { opacity: 1, scale: 1 })
      new ScrollMagic.Scene(this.setScrollScene(text3))
        .setTween(tween2).addTo(controller)
        // .addIndicators()

      const tween3 = new TimelineLite()
      tween3.to(img4, 0.3, { opacity: 1, scale: 1 })
      tween3.set(img4Text, { x: '-50%', y: '-50%' })
      tween3.to(img4Text, 0.3, { scale: 1, opacity: 1, ease: Power4.easeOut }, 0.3)
      new ScrollMagic.Scene(this.setScrollScene(text4, 0.8, '120%'))
        .on('start', function (e) {
          const isForward = e.scrollDirection === 'FORWARD'
          TweenLite.set(img3, { opacity: isForward ? 0 : 1 })
        })
        .setTween(tween3).addTo(controller)
        // .addIndicators()

      const tween4 = new TimelineLite()
      tween4.to(img4Wrapper, 0.3, { opacity: 0 })
      tween4.to(img5, 0.3, { opacity: 1 })
      new ScrollMagic.Scene(this.setScrollScene(text51, 0.8, '80%'))
        .on('end', function (e) {
          const isForward = e.scrollDirection === 'FORWARD'
          TweenLite.set(img61, { opacity: isForward ? 1 : 0 })
        })
        .setTween(tween4).addTo(controller)
        // .addIndicators()

      const tween5 = TweenLite.from(img5, 0.3, { scale: this.img5Scale, ease: Power2.easeOut })
      new ScrollMagic.Scene(this.setScrollScene(text52, 0.5, '80%'))
        .setTween(tween5).addTo(controller)
        // .addIndicators()

      const tween6 = TweenLite.to(img5, 0.3, { transformOrigin: ww >= 720 ? '49.88% 111%' : '50% 118%', scale: 0.8, opacity: 0, ease: Power2.easeOut })
      new ScrollMagic.Scene(this.setScrollScene(text61, 0.5, '80%'))
        .setTween(tween6).addTo(controller)
        // .addIndicators()

      const tween7 = new TimelineLite()
      tween7.to(img61, 0.3, { scale: 1 })
      tween7.to(img62, 0.45, { opacity: 1, x: 0 })
      new ScrollMagic.Scene(this.setScrollScene(text7, 0.5, '160%'))
        .setTween(tween7).addTo(controller)
        // .addIndicators()

      new ScrollMagic.Scene(this.setScrollScene(text8, 1, 0))
        .on('start', (e) => {
          const textContainerH = textContainer.getBoundingClientRect().height
          // const wh = this.$store.state.viewport[ 1 ]

          if (e.scrollDirection === 'FORWARD') {
            pictureContainer.classList.add('pos-a')
            img6Wrapper.style.marginTop = `${textContainerH - wh}px`
          } else {
            pictureContainer.classList.remove('pos-a')
            img6Wrapper.style.marginTop = 0
          }
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

#slides
  &-img4
    background-image radial-gradient(circle at 50% 50%, #7a6a56, #000000 86%)
  &-img4-text
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
  &-img5
    // (643 / 2 + 99) / 1572
    transform-origin 50% 26.75%
    transform scale(1)
    // transform scale(4)
    background-image none
    &.desk
      transform-origin 49.88% 32.95%
  &-img6-1
    z-index -1
    transform scale(2)
  &-text1
    margin-top 20vh
  &-text4
    height 160vh
  &-text5-1
    height 140vh
  &-text7
    height 220vh
  &-text8
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
    &.pos-a
      position absolute
  &__picture
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-image radial-gradient(circle at 50% 50%, #7a6a56, #000000 270%)
    opacity 0
    transform scale(1.02)
    &.first
      opacity 1
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
    &.desk
      bottom 0
      & img
        max-width 640px
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
