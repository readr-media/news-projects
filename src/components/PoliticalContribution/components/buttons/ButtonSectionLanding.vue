<template>
  <div class="button-section-landing">
    <div
      class="button-section-landing__icon"
      :style="{ maskImage: `url(/proj-assets/political-contribution/${iconSrc})` }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    iconSrc: {
      type: String,
      required: true,
    },
  }  
}
</script>

<style lang="stylus" scoped>
.button-section-landing
  r = 8vw
  min-width r
  max-width r
  min-height r
  max-height r
  border-radius r
  border 5px solid #9e005d
  display flex
  justify-content center
  align-items center
  &__icon
    d = calc(8vw * 0.6)
    width d
    height d
    mask-position center center
    mask-size 100% auto
    mask-repeat no-repeat
    background-color #9e005d

@media (max-width 1024px)
  .button-section-landing
    r = 100px
    min-width r
    max-width r
    min-height r
    max-height r
    border-radius r
    background-color #9e005d
    &__icon
      d = calc(100px * 0.6)
      width d
      height d
      background-color white

@media (max-width 425px)
  .button-section-landing
    r = 70px
    min-width r
    max-width r
    min-height r
    max-height r
    border-radius r
    background-color #9e005d
    &__icon
      d = calc(70px * 0.6)
      width d
      height d
      background-color white

// @media (max-width 375px)
//   .button-section-landing
//     r = 70px
//     min-width r
//     max-width r
//     min-height r
//     max-height r
//     border-radius r
//     &__icon
//       d = calc(70px * 0.6)
//       width d
//       height d

@media (max-width 320px)
  .button-section-landing
    r = 60px
    min-width r
    max-width r
    min-height r
    max-height r
    border-radius r
    &__icon
      d = calc(60px * 0.6)
      width d
      height d
</style>

