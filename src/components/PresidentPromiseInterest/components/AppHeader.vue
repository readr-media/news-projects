<template>
  <header class="app-header">
    <a class="app-header__readr-link" href="https://www.readr.tw/" target="_blank">
      <img class="app-header__readr-logo" src="/proj-assets/logo_readr.png" alt="">
    </a>
    <!-- <AppHeaderNav class="app-header__navs"/> -->
    <AppShareIcon class="app-header__share-icon" :shareUrl="shareLink" top="0px" right="0px" direction="down"/>
  </header>
</template>

<script>
import { READR_SITE_URL } from '../../../constants'
import AppHeaderNav from './AppHeaderNav.vue'
import AppShareIcon from './AppShareIcon.vue'

export default {
  components: {
    AppHeaderNav,
    AppShareIcon,
  },
  data () {
    return {
      shareLink: `${READR_SITE_URL}president-promise-interest`,
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-header
  display flex
  justify-content space-between
  align-items center
  padding 0 78px 0 0
  width 100%
  background-color #1f464f
  &__readr-logo
    width 52px
    height 47px
    margin 14px 0 0 14px
</style>

