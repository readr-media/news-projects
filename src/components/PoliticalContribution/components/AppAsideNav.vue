<template>
  <nav class="app-aside-nav">
    <ButtonSection
      class="app-aside-nav__button-section"
      :iconSrc="'chart-g.png'"
      :hintWording="'圖表區'"
      @click.native="navigateRoute('dashboard')"
      :routerLinkActive="slug === 'dashboard'"
    />
    <ButtonSection
      class="app-aside-nav__button-section"
      :iconSrc="'tool-g.png'"
      :hintWording="'查找政商關係'"
      @click.native="navigateRoute('explore')"
      :routerLinkActive="slug === 'explore'"
    />
    <ButtonSection
      class="app-aside-nav__button-section"
      :iconSrc="'article-g.png'"
      :hintWording="'現金解析文章'"
      @click.native="navigateRoute('story1')"
      :routerLinkActive="renderedSectionContent === 'storys'"
    />
    <div class="app-aside-nav__article-container">
      <router-link class="app-aside-nav__article-nav" to="story1" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-aside-nav__tooltip"
          :hintText="'選一次立委，金流超過 28 億！'"
        />
      </router-link>
      <router-link class="app-aside-nav__article-nav" to="story2" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-aside-nav__tooltip"
          :hintText="'立委篇／老鳥與新秀，募款能力差了 6.6 倍'"
        />
      </router-link>
      <router-link class="app-aside-nav__article-nav" to="story3" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-aside-nav__tooltip"
          :hintText="'企業篇／金權遊戲？翻開金主的投資名冊'"
        />
      </router-link>
      <router-link class="app-aside-nav__article-nav" to="story4" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-aside-nav__tooltip"
          :hintText="'政治獻金開放了嗎？'"
        />
      </router-link>
      <router-link class="app-aside-nav__article-nav" to="story5" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-aside-nav__tooltip"
          :hintText="'我是新文章'"
        />
      </router-link>
      <router-link class="app-aside-nav__article-nav" to="story6" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-aside-nav__tooltip"
          :hintText="'我是新文章'"
        />
      </router-link>
    </div>
    <ButtonSection
      class="app-aside-nav__button-section"
      :iconSrc="'paper-g.png'"
      :hintWording="'原始素材資料'"
      @click.native="newTab('https://github.com/mirror-media/politicalcontribution')"
    />
    <ButtonSection
      class="app-aside-nav__button-section"
      :iconSrc="'text-g.png'"
      :hintWording="'查看相關討論'"
      @click.native="openLightboxRelatedTopics"
    />
    <ButtonSection
      class="app-aside-nav__button-section"
      :iconSrc="'hand-g.png'"
      :hintWording="'鍵盤救國一起來'"
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
  computed: {
    ...mapGetters([
      'slug',
      'renderedSectionContent',
    ])
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
    }
  },
}
</script>

<style lang="stylus" scoped>
.app-aside-nav
  width 60px
  z-index 10000
  &__button-section
    &:not(:nth-child(1))
      margin 20px 0 0 0
  &__article-container
    width 30px
    margin 10px auto  0 auto
  &__article-nav
    display block
    r = 30px
    width r
    height r
    border-radius r
    background-color #808080
    transition background-color .25s
    position relative
    & + &
      margin 10px 0 0 0
    &:hover
      .app-aside-nav__tooltip
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

.router-link-exact-active
  background-color #9e005d
</style>


