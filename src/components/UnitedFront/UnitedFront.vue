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
            :key="article.name"
            :name="article.name"
            :data-name="article.name"
          />
          <Article
            :key="article.name"
            class="article"
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
      title: '',
      description: '',
      metaUrl: 'china-company',
      metaImage: 'china-company/ogimage.png',
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
    createScroller () {
      require('intersection-observer')
      const scrollama = require('scrollama')
      this.scroller = scrollama()
  
      this.scroller
        .setup({
          step: '.article-landing',
          offset: 0.5
        })
        .onStepExit(({element, index, direction}) => {
          const encounterArticleName = element.dataset.name
          const lastArticleName = _.get(this.articles, [ index - 1, 'name' ], '')
          if (direction === 'down') {
            this.SET_NAV(encounterArticleName)
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
    top 50vh
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
