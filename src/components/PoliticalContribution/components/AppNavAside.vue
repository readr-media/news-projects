<template>
  <nav class="app-nav-aside" :style="{ height: `${defaultHeight}px`, transform: `scale(${scaling})` }">
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'chart-g.png'"
      :hintWording="'圖表區'"
      @click.native="navigateRoute('dashboard')"
      :routerLinkActive="slug === 'dashboard'"
    />
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'tool-g.png'"
      :hintWording="'查找政商關係'"
      @click.native="navigateRoute('explore')"
      :routerLinkActive="slug === 'explore'"
    />
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'article-g.png'"
      :hintWording="'現金解析文章'"
      @click.native="navigateRoute('story1')"
      :routerLinkActive="renderedSectionContent === 'storys'"
    />
    <div class="app-nav-aside__article-container">
      <router-link class="app-nav-aside__article-nav" to="story1" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="'選一次立委，金流超過 28 億！'"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story2" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="'立委篇／老鳥與新秀，募款能力差了 6.6 倍'"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story3" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="'企業篇／金權遊戲？翻開金主的投資名冊'"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story4" v-scroll-to="'.section-content'">
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="'政治獻金開放了嗎？'"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story5" v-scroll-to="'.section-content'">
        <span class="new-content-wording">NEW</span>
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="'資料怎麼看？政治獻金的五個發現'"
        />
      </router-link>
      <router-link class="app-nav-aside__article-nav" to="story6" v-scroll-to="'.section-content'">
        <span class="new-content-wording">NEW</span>
        <AppArrowTooltip
          class="app-nav-aside__tooltip"
          :hintText="'政治獻金資料到底解密了什麼？'"
        />
      </router-link>
    </div>
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'paper-g.png'"
      :hintWording="'原始素材資料'"
      @click.native="newTab('https://github.com/mirror-media/politicalcontribution')"
    />
    <ButtonSection
      class="app-nav-aside__button-section"
      :iconSrc="'text-g.png'"
      :hintWording="'查看相關討論'"
      @click.native="openLightboxRelatedTopics"
    />
    <ButtonSection
      class="app-nav-aside__button-section"
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

.router-link-exact-active
  background-color #9e005d
</style>


