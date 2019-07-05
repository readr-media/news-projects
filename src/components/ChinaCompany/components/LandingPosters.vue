<template>
  <section class="landing-posters">
    <img
      :class="[
        'landing-posters__poster',
        'landing-posters__poster--left',
        { 'landing-posters__poster--active-animate': isActive },
      ]"
      src="/proj-assets/china-company/1990.jpg"
      alt=""
    >
    <img
      :class="[
        'landing-posters__poster',
        'landing-posters__poster--right',
        { 'landing-posters__poster--active-animate': isActive },
      ]"
      src="/proj-assets/china-company/2020.jpg"
      alt=""
    >
    <div
      :class="[
        'landing-posters__scroll-down-hint',
        'scroll-down-hint',
        { 'scroll-down-hint--active-animate': isActive }
      ]"
      @click="$emit('nextSlide')"
    >
      <img
        src="/proj-assets/china-company/arrow.png"
        alt=""
      >
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

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

.landing-posters
  background-color #000537
  display flex
  justify-content space-between
  padding 0 118px
  box-sizing border-box
  &__poster
    width calc((100% - 84px) / 2)
    object-fit cover
    animation-duration 1s
    animation-timing-function ease-out
    animation-name none
    opacity 0
    &--left
      animation-delay .25s
      &.landing-posters__poster--active-animate
        animation-name fadeInLeft
        animation-fill-mode forwards
    &--right
      animation-delay 1s
      &.landing-posters__poster--active-animate
        animation-name fadeInRight
        animation-fill-mode forwards
  &__scroll-down-hint
    position absolute
    bottom 50px
    left calc(50vw - 35px)

.scroll-down-hint
  width 70px
  height 70px
  border-radius 100%
  border 2px solid #dd3c2d
  display flex
  justify-content center
  align-items center
  cursor pointer
  opacity 0
  transition opacity 0s 0s
  img
    transform rotate(-90deg)
    width 50px
    animation-name fadeInDown
    animation-duration 3s
    animation-timing-function ease-out
    animation-iteration-count infinite
  &--active-animate
    transition opacity .25s 2s
    opacity 1
</style>
