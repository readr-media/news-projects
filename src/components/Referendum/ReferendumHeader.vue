<template>
  <header class="header">
    <Logo class="header__logo no-sprite" href="https://www.readr.tw/" :top="position.TOP" :left="position.LEFT" bgImage="/proj-assets/referendum/icons/logo-readr.png" :zIndex="99999"></Logo>
    <Share class="header__share" :shareUrl="shareLink" :top="position.TOP" :right="position.RIGHT" bgColor="#fff" direction="down" :zIndex="99999"></Share>
  </header>
</template>
<script>
  import Logo from 'src/components/Logo.vue'
  import Share from 'src/components/Share.vue'
  import { READR_SITE_URL, } from 'src/constants'
  import { get, } from 'lodash'
  
  export default {
    name: 'ReferendumHeader',
    components: {
      Logo,
      Share,
    },
    computed: {
      isDesktop () {
        return 
      },
      position () {
        return get(this.$store, 'state.useragent.isDesktop', false)
          ? { top: '10px', LEFT: '15px', RIGHT: '15px' }
          : { top: '10px', LEFT: '10px', RIGHT: '10px' }
      },
    },
    data () {
      return {
        shareLink: `${READR_SITE_URL}taiwan-2018-referendum`,
      }
    },
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
  .header
    height 65px
    width 100vw
    padding 10px
    position fixed
    top 0
    left 0
    z-index 9999

    & >>> .toggle
      background-image url(/proj-assets/referendum/icons/icon-share.png)!important
      background-size contain!important
      background-position center center!important
</style>