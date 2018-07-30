<template>
  <div class="section-landing-titles">
    <a class="section-landing-titles__readr-link" :href="`https://${READR_DOMAIN_PROD}`" target="_blank">
      <img class="section-landing-titles__readr-logo" src="/proj-assets/political-contribution/logo.png" alt="section-landing-titles__readr-logo">
    </a>
    <h1 class="section-landing-titles__h1">政治獻金 2.0</h1>
    <h2 class="section-landing-titles__h2">副標題副標題副標題</h2>
    <router-link to="/project/political-contribution/story1" @click.native="routerLinkClicked">to story1</router-link>
    <router-link to="/project/political-contribution/story2" @click.native="routerLinkClicked">to story2</router-link>
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
  methods: {
    routerLinkClicked () {
      if (!this.isSectionContentRendered) {
        const sectionContent = document.querySelector('.section-content')
        if (sectionContent) {
          this.isSectionContentRendered = true
        }
      }

      // Perform a auto scroll while section content component is already exist
      if (this.isSectionContentRendered) {
        this.$scrollTo('.section-content')
      }
    },
  },
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
    margin 0 0 58px 0
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
</style>

