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
import { throttle } from 'lodash'

const fetchTWJSON = (store) => {
  return store.dispatch('VoteResultCityCouncil/FETCH_TAIWAN_JSON')
}

const getElementTop = (el) => {
  const rect = el.getBoundingClientRect()
  return rect.top
}

const setScrollPos = () => {
  const pos = []
  const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const articles = [ ...document.querySelectorAll('article > h3') ]
  pos.push({ label: 'map', pos: (getElementTop(document.querySelector('.interactive-map-container')) - h * 2 / 3) })
  articles.map((article, index) => {
    pos.push({ label: `article${index + 1}`, pos: (getElementTop(article) - h * 2 / 3) })
  })
  pos.push({ label: 'end', pos: (getElementTop(document.querySelector('.related-reports--wrapper')) - h * 2 / 3) })
  return pos
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
      title: '你全家都議長——誰在議會當老大？',
      description: '新任議會開議，民進黨又經歷一次選舉的慘敗，在全台灣 22 個議會中只贏得 1 席議長。READr 盤點歷史資料，把議會權力爭奪戰拉回到 70 年前，帶你一次看！',
      metaUrl: 'vote2018-result-city-council',
      metaImage: 'vote2018-result-city-council/og.jpg',
    };
  },
  data () {
    return {
      READR_SITE_URL,
      maxScrollTop: 0,
      scrollPos: []
    }
  },
  // beforeCreate () {
  //   this.$store.registerModule('VoteResultCityCouncil', module)
  // },
  mounted () {
    ga('send', 'pageview')
    this.scrollPos = setScrollPos()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    // this.$store.unregisterModule('VoteResultCityCouncil')
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: throttle(function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      for (let [index, value] of this.scrollPos.entries()) {
        if (scrollTop > value.pos && value.pos > this.maxScrollTop) {
          this.maxScrollTop = value.pos
          return ga('send', 'event', 'projects', 'scroll', `scroll to ${value.label}`, { nonInteraction: false })
        }
      }
    }, 500)
  }
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
