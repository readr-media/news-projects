<template>
  <div class="rent2">
    <div class="info">
      <!--span class="info__total" v-for="(g, k) in grouped" v-text="`${$t(`RENT.${k}`)}:${get(g, 'length', 0)} `"></span>
      <span class="info__total" v-text="`TOTAL: ${total}`"></span-->
    </div>
    <header>
      <Logo class="no-sprite" href="https://www.readr.tw/" top="20px" left="20px" bgImage="/proj-assets/logo_readr_black.png"></Logo>
      <Share :shareUrl="shareLink" top="20px" right="20px" bgColor="#544356" direction="down"></Share>
    </header>
    <Brief></Brief>
    <MainContent v-show="isLoaded"></MainContent>
    <footer v-show="isLoaded">
      <RelatedReports theme="white"></RelatedReports>    
    </footer>
  </div>
</template>
<script>
  import Brief from 'src/components/Rent/Brief.vue'
  import Logo from 'src/components/Logo.vue'
  import MainContent from 'src/components/Rent/MainContent.vue'
  import RelatedReports from 'src/components/RelatedReports.vue'
  import RentStoreModule from 'src/store/modules/Rent'
  import Share from 'src/components/Share.vue'
  import Spinner from 'src/components/Spinner.vue'
  import titleMeta from 'src/util/titleMeta'
  import axios from 'axios'
  import { READR_SITE_URL, } from 'src/constants'
  import { drawRectWithRound, } from 'src/components/Rent/common'
  import { filter, get, map, uniqWith, } from 'lodash'

  const debug = require('debug')('CLIENT:Rent')
  const fetchData = url => {
    return new Promise((resolve, reject) => {
      axios.get(url, {})
      .then(response => resolve(response.data))
      .catch(error => reject(error))
    })
  }


  export default {
    name: 'Rent',
    metaInfo () {
      return {
        title: 'rent',
        description: 'rent',
        metaUrl: 'rent',
        metaImage: '',
      }
    },
    computed: {
      isLoaded () {
        // const requiredLen = map(CITIES, c => c).length
        // return filter(get(this.$store, 'state.Rent.assetsCheck', {}), item => item === true).length === requiredLen
        return get(this.$store, 'state.Rent.isLoaded')
      },
    },
    components: {
      Brief,
      Logo,
      MainContent,
      RelatedReports,
      Share,
      Spinner,
    },
    data () {
      return {
        grouped: {},
        isLoading: true,
        infographic: {},
        infographicViewWidth: 400,
        infographicViewHeight: 300,
        particleContainers: {},
        particleContainersJobs: [],
        shareLink: `${READR_SITE_URL}rent`,
        // stage: {},
        texture: {},
        total: 0,
      }
    },
    methods: {
      get,
    },
    /**
     * Hooks
     */
    created () {
      this.$store.registerModule('Rent', RentStoreModule)
    },
    destroyed () {
      this.$store.unregisterModule('Rent')
    },   
    mounted () {
      Promise.resolve()
      .then(() => {
        this.isLoading = false
        debug(this.grouped)
      })
      .catch(error => {
        debug('init in fail!', error)
        debug('init in fail!', error)
      })
    },
  }
</script>
<style lang="stylus" scoped>
  .rent2
    font-family "source-han-sans-traditional", sans-serif
    header
      position fixed
      top 0
      left 0
      height 70px
      width 100vw
      background-color rgba(255, 255, 255, 0.9)
      z-index 999
    footer
      margin 75px 0
</style>