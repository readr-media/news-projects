<template>
  <div class="city-council">
    <Logo class="no-sprite" href="https://www.readr.tw/" top="15px" left="15px" bgImage="/proj-assets/vote2018-result-city-council/readrlogo.png" />
    <Share :shareUrl="`${READR_SITE_URL}vote2018-result-city-council`" class="city-council__share" top="15px" right="15px" direction="down" />
    <Foreword />
    <Map />
    <Article />
    <RelatedReports :theme="'light'"/>
  </div>
</template>
<script>

import Article from './Article.vue'
import Foreword from './Foreword.vue'
import Logo from '../Logo.vue'
import Map from './Map.vue'
import RelatedReports from 'src/components/RelatedReports.vue'
import Share from '../Share.vue'
import module from 'src/store/modules/VoteResultCityCouncil'
import { READR_SITE_URL } from '../../constants'

const fetchTWJSON = (store) => {
  return store.dispatch('VoteResultCityCouncil/FETCH_TAIWAN_JSON')
}

export default {
  name: 'VoteResultCityCouncil',
  components: {
    Article,
    Foreword,
    Logo,
    Map,
    RelatedReports,
    Share
  },
  metaInfo() {
    return {
      title: '你全家都議長',
      description: '2018 年底的大事，隨著選舉新任縣市長就職，各縣市議會也蓄勢待發。議會開議之前，最重要的是要決定議會的「老大」。議長選舉出爐，READr 帶你來看看這些議長的家庭背景，以及各地方議會有哪些家族勢力。',
      metaUrl: 'vote2018-result-city-council',
      metaImage: 'vote2018-result-city-council/og.jpg',
    };
  },
  data () {
    return {
      READR_SITE_URL,
    }
  },
  beforeCreate () {
    this.$store.registerModule('VoteResultCityCouncil', module)
  },
  created () {
    // fetchTWJSON(this.$store)
  },
  mounted () {
    // ga('send', 'pageview')
  },
  destroyed () {
    this.$store.unregisterModule('VoteResultCityCouncil')
  },
}
</script>
<style lang="stylus">
  .city-council
    padding-bottom 60px
    &__share
      .toggle
        background-image url(/proj-assets/vote2018-result-city-council/share.png) !important
        background-size 34px auto !important
        background-position center center !important
</style>
