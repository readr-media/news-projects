<template>
  <section
    id="unitedfront"
  >
    <TheNavAside
      class="unitedfront__nav-aside"
    />
    <TheNavBottom
      class="unitedfront__nav-bottom"
    />
    <Landing
      class="
        unitedfront__landing
        unitedfront__landing--desktop
      "
    />
    <LandingMobile
      class="
        unitedfront__landing
        unitedfront__landing--mobile
      "
    />
    <div
      class="
        unitedfront__articles
        articles
        articles--styled-background
      "
    >
      <div class="articles__inner-wrapper">
        <template v-for="article in articles">
          <ArticleLanding
            class="article-landing"
            :id="article.name"
            :key="`${article.name}-airticle-landing`"
            :name="article.name"
            :data-name="article.name"
          />
          <Article
            class="article"
            :key="`${article.name}-airticle`"
            :name="article.name"
          />
        </template>
      </div>
    </div>
    <Credit />
    <Footer />
  </section>
</template>

<script>
import TheNavAside from './components/TheNavAside.vue'
import TheNavBottom from './components/TheNavBottom.vue'
import Landing from './components/Landing.vue'
import LandingMobile from './components/LandingMobile.vue'
import ArticleLanding from './components/ArticleLanding.vue'
import Article from './components/Article.vue'
import Credit from './components/Credit.vue'
import Footer from './components/Footer.vue'

import storeModule from 'src/store/modules/UnitedFront'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('UnitedFront')

import _ from 'lodash'

import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

export default {
  metaInfo () {
    return {
      title: '一統去交流：全方位解析兩岸青年交流團',
      description: '你知道一個暑假，至少有 3000 名臺灣青年去中國「交流」嗎？ 11 天甘肅絲路之旅、兩個月北京實習、青年創業基地參訪⋯⋯盤點已知的交流團形式，就能發現其「無孔不入」的程度：從小學就有機會參與，大學則是交流黃金期，甚至到畢業實習都有包辦。但這些交流真的只是平凡的交流嗎？',
      metaUrl: 'unitedfront',
      metaImage: 'unitedfront/ogimage.png',
      customScript: `
        <script src="https://public.flourish.studio/resources/embed.js"><\/script>
      `
    }
  },
  components: {
    TheNavAside,
    TheNavBottom,
    Landing,
    LandingMobile,
    ArticleLanding,
    Article,
    Credit,
    Footer
  },
  data() {
    return {
      gaScrollRecord: {
        '序篇': false,
        '主題式論壇': false,
        '企業實習團': false,
        '旅遊': false,
        '學術研討': false,
        '短期研修': false,
        '專業能力': false,
        '篇七': false,
        '篇八': false
      }
    }
  },
  computed: {
    ...mapState({
      articles: state => state.articles,
      currentArticleName: state => state.nav.currentArticleName
    })
  },
  created() {
    this.$store.registerModule('UnitedFront', storeModule)
  },
  mounted() {
    this.createScroller()
  },
  destroyed() {
    this.$store.unregisterModule('UnitedFront')
  },
  methods: {
    ...mapMutations({
      SET_NAV: 'nav/SET_NAV'
    }),
    handleGAScrollEvent(articleName) {
      if (!this.gaScrollRecord[articleName]) {
        window.ga('send', 'event', 'projects', 'scroll', `scroll to ${articleName}`, { nonInteraction: false })
        this.gaScrollRecord[articleName] = true
      }
    },
    createScroller () {
      require('intersection-observer')
      const scrollama = require('scrollama')
      this.scroller = scrollama()
  
      this.scroller
        .setup({
          step: '.article-landing',
          offset: 1
        })
        .onStepExit(({element, index, direction}) => {
          const encounterArticleName = element.dataset.name
          const lastArticleName = _.get(this.articles, [ index - 1, 'name' ], '')
          if (direction === 'down') {
            this.SET_NAV(encounterArticleName)
            this.handleGAScrollEvent(encounterArticleName)
          } else if (direction === 'up') {
            this.SET_NAV(lastArticleName)
          }
        })
    }
  }
}
</script>

<style lang="stylus">
#unitedfront
  background-color black

.unitedfront
  &__nav-aside
    position fixed
    top 20vh
    left calc((100vw - 1000px) / 2 + 90px)
    z-index 2
  &__nav-bottom
    display none
  &__landing
    &--mobile
      display none

.articles
  &--styled-background
    background-image: url(/proj-assets/unitedfront/bg-asset.png), linear-gradient(180deg, #212338 0%, #d02525 100%)
    background-size contain
  &__inner-wrapper
    max-width 1000px
    margin 0 auto

.flourish-embed
  .flourish-credit
    display none

@media (max-width 768px)
  .unitedfront
    &__nav-aside
      display none
    &__nav-bottom
      display flex
      position fixed
      left 0
      bottom 0
      width 100%
      z-index 2
    &__landing
      &--mobile
        display initial
      &--desktop
        display none
</style>
