<template>
  <div class="section-landing-titles">
    <a class="section-landing-titles__readr-link" :href="`https://${READR_DOMAIN_PROD}`" target="_blank">
      <img class="section-landing-titles__readr-logo" src="/proj-assets/political-contribution/logo.png" alt="section-landing-titles__readr-logo">
    </a>
    <h1 class="section-landing-titles__h1">政治獻金 2.0</h1>
    <h2 class="section-landing-titles__h2">副標題副標題副標題</h2>
  </div>
</template>

<script>
import { READR_DOMAIN_PROD, } from 'src/constants'

export default {
  data () {
    return {
      READR_DOMAIN_PROD,
      isSectionContentRendered: false,
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
  top 105px
  left 11.4%
  &__readr-link
    display inline-block
    margin 0 0 38px 0
  &__readr-logo
    width 80px
    height 80px
  &__h1
    font-size 100px
    margin 15px 0
  &__h2
    font-size 50px
    font-weight 400
    margin 15px 0

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
      font-size 50px

@media (max-width 425px)
  .section-landing-titles
    max-width 100%
    position static
    &__readr-link
      margin 0 0 19px 0
    &__readr-logo
      width 60px
      height 60px
    &__h1
      font-size 50px
    &__h2
      font-size 26px

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
</style>

