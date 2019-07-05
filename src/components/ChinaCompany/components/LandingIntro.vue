<template>
  <section class="landing-intro">
    <!-- <h1>
      <span>錢進來，人出去，中國讓你發大財！</span>
      <span>解密臺商領取的中國補助款</span>
    </h1> -->
    <img
      class="landing-intro__title"
      src="/proj-assets/china-company/title.png"
      alt=""
    >
    <p>
      <span>在「中國因素」愈來愈敏感之際，臺灣企業旺旺及鴻海陷入領取高額中國補助款的輿論風暴。</span>
      <span>READr 針對中港上市的臺商，調查超過百份財報，</span>
      <span>發現中國在這 10 年內針對 42 家臺商發放了 663 億（新台幣）的補助款，光旺旺、鴻海、頂新就包辦了六成。</span>
      <span>這些補助款代表什麼意義？靠錢打造的中國夢近年來又發生什麼變化？</span>
    </p>
    <div
      class="landing-intro__scroll-down-hint scroll-down-hint"
      @click="$emit('nextSlide')"
    >
      <img
        src="/proj-assets/china-company/arrow.png"
        alt=""
      >
    </div>
  </section>
</template>

<style lang="stylus" scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform translateY(-100%) rotate(-90deg)
  }

  50% {
    opacity: 1;
    transform translateY(0) rotate(-90deg)
  }
}
@keyframes fadeInDownBottom {
  from {
    opacity: 0;
    bottom: 150px
  }

  50% {
    opacity: 1;
    bottom: 110px
  }
}

.landing-intro
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color #000537
  h1
    display flex
    flex-direction column
    line-height 1.5
    font-size 80px
    color white
    text-align center
  p
    display flex
    flex-direction column
    line-height 1.5
    font-size 20px
    color white
    text-align center
  &__title
    width 1000px
  &__scroll-down-hint
    position absolute
    bottom 50px

.scroll-down-hint
  width 70px
  height 70px
  border-radius 100%
  border 2px solid #dd3c2d
  display flex
  justify-content center
  align-items center
  cursor pointer
  img
    transform rotate(-90deg)
    width 50px
    animation-name fadeInDown
    animation-duration 3s
    animation-timing-function ease-out
    animation-iteration-count infinite

@media (max-width 1440px)
  .landing-intro
    padding 0 10px 100px 10px
    box-sizing border-box
    h1
      line-height 1.5
      font-size 22px
    p
      font-size 18px
      display initial
      text-align left
    &__title
      width 100%
    &__scroll-down-hint
      position absolute
      bottom 110px
      animation-name fadeInDownBottom
      animation-duration 3s
      animation-timing-function ease-out
      animation-iteration-count infinite
      img
        animation-name none

  .scroll-down-hint
    border none

@media (max-width 320px)
  .landing-intro
    h1
      font-size 20px
    p
      font-size 12px
</style>
