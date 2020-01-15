<template>
  <div class="section" data-anchor="section-landing" ref="section-landing">
    <div class="landing">
      <h1 class="landing__title">小英</h1>
      <h2 class="landing__subtitle">說好的承諾呢</h2>
      <SectionLandingDescription class="landing__description"/>
      <SectionLandingNav class="navigation-container"/>
    </div>
  </div>
</template>

<script>
import SectionLandingDescription from './sectionLanding/SectionLandingDescription.vue'
import SectionLandingNav from './sectionLanding/SectionLandingNav.vue'

export default {
  components: {
    SectionLandingDescription,
    SectionLandingNav,
  },
}
</script>

<style lang="stylus" scoped>
.landing
  // max-width 1366px
  max-height 768px
  height 100%
  // margin auto
  display flex
  flex-direction column
  justify-content center
  align-items center
  &__title
    font-size 120px
    color transparent
    -webkit-text-stroke 3px white
    margin 0 0 24px 0
  &__subtitle
    font-size 52px
    font-weight 900
    line-height 0.85
    color #ffffff
    margin 0 0 47px 0
  &__description
    font-size 24px
    line-height 1.33
    color #c9c9c9
    margin 0 0 43px 0

@media (max-width 425px)
  .landing
    max-width 100%
    max-height 568px
    &__title
      font-size 80px
      margin 0 0 19px 0
    &__subtitle
      font-size 38px
      line-height 1.16
      margin 0 0 28px 0
    &__description
      font-size 22px
      line-height 1.5
      margin 0 0 35px 0

@media (max-width 320px)
  .landing
    padding 30px 0 0 0
    &__title
      margin 0
    &__subtitle
      margin 0
    &__description
      line-height 1.33
      margin 15px 0
</style>


