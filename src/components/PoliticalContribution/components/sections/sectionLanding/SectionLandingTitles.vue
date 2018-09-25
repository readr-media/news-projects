<template>
  <div class="section-landing-titles">
    <a class="section-landing-titles__readr-link" :href="`https://${READR_DOMAIN_PROD}`" target="_blank">
      <img class="section-landing-titles__readr-logo" src="/proj-assets/political-contribution/logo.png" alt="section-landing-titles__readr-logo">
    </a>
    <h1 class="section-landing-titles__h1">數讀政治獻金<div class="v2">2.0</div></h1>
    <h2 class="section-landing-titles__h2"><div class="quote-container">翻開立委<div class="quote">八年份</div>的</div><div>金主投資名冊</div></h2>
  </div>
</template>

<script>
import { READR_DOMAIN_PROD, } from 'src/constants'

export default {
  data () {
    return {
      READR_DOMAIN_PROD,
      // isSectionContentRendered: false,
    }
  },
  // methods: {
  //   routerLinkClicked () {
  //     if (!this.isSectionContentRendered) {
  //       const sectionContent = document.querySelector('.section-content')
  //       if (sectionContent) {
  //         this.isSectionContentRendered = true
  //       }
  //     }

  //     // Perform a auto scroll while section content component is already exist
  //     if (this.isSectionContentRendered) {
  //       this.$scrollTo('.section-content')
  //     }
  //   },
  // },
}
</script>

<style lang="stylus" scoped>
.section-landing-titles
  max-width 761px
  position absolute
  top 50px
  // top calc(50px + 40vw / 2 - (40vw / 2 / 3) - (80px + 38px + 15px))
  left 11.4%
  &__readr-link
    display inline-block
    margin 0 0 38px 0
  &__readr-logo
    width 80px
    height 80px
  &__h1
    font-size 90px
    margin 15px 0
    display flex
    align-items center
  &__h2
    font-size 50px
    font-weight 400
    margin 15px 0
    display flex
    align-items center

.v2
  d = 100px
  width d
  height d
  border-radius 100%
  background-color #9e005d
  color white
  display flex
  justify-content center
  align-items center
  font-size 52px

.quote-container
  display flex
  align-items center
.quote
  border-top 1px solid black
  border-bottom 1px solid black
  font-size .6em
  line-height 48px
  margin 0 10px
  display inline-block

@media (max-width 1280px)
  .section-landing-titles
    &__h1
      font-size 72px
    &__h2
      font-size 40px

  .v2
    d = 80px
    width d
    height d
    font-size 41px

  .quote
    line-height 40px

@media (max-width 1024px)
  .section-landing-titles
    max-width 100%
    position static
    &__readr-link
      margin 0 0 19px 0
    &__readr-logo
      width 80px
      height 80px
    &__h1
      font-size 100px
    &__h2
      font-size 60px
      flex-direction column
      align-items flex-start

  .v2
    d = 50px
    width d
    height d
    font-size 22px

  .quote
    line-height 50px

@media (max-width 425px)
  .section-landing-titles
    max-width 100%
    position static
    &__readr-link
      margin 0
    &__readr-logo
      width 60px
      height 60px
    &__h1
      font-size 50px
    &__h2
      font-size 30px

  .v2
    d = 50px
    width d
    height d
    font-size 22px

  .quote
    line-height 28px

// @media (max-width 375px)
//   .section-landing-titles
//     max-width 100%
//     position static
//     &__readr-link
//       margin 0 0 19px 0
//     &__readr-logo
//       width 60px
//       height 60px
//     &__h1
//       font-size 50px
//     &__h2
//       font-size 26px

@media (max-width 320px)
  .section-landing-titles
    &__readr-link
      margin 0
    &__readr-logo
      width 50px
      height 50px
    &__h1
      font-size 40px
    &__h2
      font-size 22px

  .v2
    d = 40px
    width d
    height d
    font-size 18px

  .quote
    line-height 18px
</style>

