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
      animation-delay 2s
      &.landing-posters__poster--active-animate
        animation-name fadeInRight
        animation-fill-mode forwards
</style>
