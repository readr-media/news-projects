<template>
  <section class="landing-intro">
    <h1>
      <span>錢出去，人進來，</span>
      <span>中國讓你發大財！？</span>
    </h1>
    <p>
      <span>簡短前言簡短前言</span>
      <span>簡短前言簡短前言</span>
      <span>簡短前言簡短前言</span>
      <span>簡短前言簡短前言</span>
      <span>簡短前言簡短前言</span>
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
    transform: translate3d(0, -100%, 0) rotate(-90deg);
  }

  50% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(-90deg);
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
  p
    display flex
    flex-direction column
    line-height 1.5
    font-size 20px
    color white
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
    h1
      line-height 1.5
      font-size 28px
    &__scroll-down-hint
      position absolute
      bottom 10px

  .scroll-down-hint
    border none
</style>
