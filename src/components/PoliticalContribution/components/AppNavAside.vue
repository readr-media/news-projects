<template>
  <nav class="app-nav-aside" :style="{ height: `${defaultHeight}px`, transform: `scale(${scaling})` }">
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'chart-g.png'"
      :hintWording="$t('POLITICAL_CONTRIBUTION.NAVS.CHARTS')"
      @click.native="navigateRoute('dashboard')"
      :routerLinkActive="slug === 'dashboard'"
    />
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'tool-g.png'"
      :hintWording="$t('POLITICAL_CONTRIBUTION.NAVS.EXPLORE')"
      @click.native="navigateRoute('explore')"
      :routerLinkActive="slug === 'explore'"
    />
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'article-g.png'"
      :hintWording="$t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS')"
      @click.native="navigateRoute('story1')"
      :routerLinkActive="renderedSectionContent === 'storys'"
    />
    <div class="app-nav-aside__article-container">
      <router-link class="app-nav-aside__article-nav" to="story1" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="$t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY1')"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story2" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="$t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY2')"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story3" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="$t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY3')"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story4" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="$t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY4')"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story5" v-scroll-to="'.section-content'">
        <span class="new-content-wording">NEW</span>
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="$t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY5')"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story6" v-scroll-to="'.section-content'">
        <span class="new-content-wording">NEW</span>
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="$t('POLITICAL_CONTRIBUTION.NAVS.ANALYSIS_STORY6')"
        />
      </router-link>
    </div>
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'paper-g.png'"
      :hintWording="$t('POLITICAL_CONTRIBUTION.NAVS.DATA')"
      @click.native="newTab('https://github.com/mirror-media/politicalcontribution')"
    />
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'text-g.png'"
      :hintWording="$t('POLITICAL_CONTRIBUTION.NAVS.RELATED')"
      @click.native="openLightboxRelatedTopics"
    />
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'hand-g.png'"
      :hintWording="$t('POLITICAL_CONTRIBUTION.NAVS.COOP')"
      @click.native="newTab('https://campaign-finance.g0v.ctiml.tw/')"
    />
  </nav>
</template>

<script>
import ButtonSection from './buttons/ButtonSection.vue'
import AppArrowTooltip from './AppArrowTooltip.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    ButtonSection,
    AppArrowTooltip,
  },
  data () {
    return {
      defaultHeight: 739,
      availableHeight: 739,
    }
  },
  computed: {
    ...mapGetters([
      'slug',
      'renderedSectionContent',
    ]),
    scaling () {
      return Math.min(this.availableHeight / this.defaultHeight, 1)
    },
  },
  methods: {
    navigateRoute (path) {
      this.$router.push(path)
      this.$scrollTo('.section-content')
    },
    openLightboxRelatedTopics () {
      this.$emit('openLightboxRelatedTopics')
    },
    newTab (url) {
      window.open(url)
    },
    calcAvailableHeight () {
      this.availableHeight = window.innerHeight - 60
    }
  },
  mounted () {
    this.calcAvailableHeight()
    window.addEventListener('resize', this.calcAvailableHeight)
  },
  destroyed () {
    window.removeEventListener('resize', this.calcAvailableHeight)
  }
}
</script>

<style lang="stylus" scoped>
.app-nav-aside
  width 60px
  &__button-section
    &:not(:nth-child(1))
      margin 20px 0 0 0
  &__article-container
    width 30px
    margin 10px auto  0 auto
  &__article-nav
    display flex
    justify-content center
    align-items center
    r = 30px
    width r
    height r
    border-radius r
    background-color #808080
    transition background-color .25s
    position relative
    font-size 10px
    text-decoration none
    color white
    & + &
      margin 10px 0 0 0
    &:hover
      .app-nav-aside__tooltip
        visibility visible
        opacity 1
  &__tooltip
    position absolute !important
    top 0
    left 300%
    z-index 10
    margin 0 0 0 -50px
    visibility hidden
    opacity 0
    transition opacity 1s
    width max-content !important
    padding 5px 10px !important
    box-sizing content-box // For fixing width max-content issue in dafari
    font-size 16px

.new-content-wording
  position relative
  top 2px
  color #9e005d
  font-weight 600
  transform translateX(-35px)

.router-link-exact-active
  background-color #9e005d
</style>


