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
        <ArticleLanding
          :name="'主題式'"
        />
        <Article class="article" />
        <ArticleLanding
          :name="'專業能力'"
        />
        <Article class="article" />
        <ArticleLanding
          :name="'主題式'"
        />
        <Article class="article" />
        <ArticleLanding
          :name="'主題式'"
        />
        <Article class="article" />
        <ArticleLanding
          :name="'主題式'"
        />
        <Article class="article" />
        <ArticleLanding
          :name="'主題式'"
        />
        <Article class="article" />
        <ArticleLanding
          :name="'主題式'"
        />
        <Article class="article" />
        <ArticleLanding
          :name="'主題式'"
        />
        <Article class="article" />
        <ArticleLanding
          :name="'主題式'"
        />
        <Article class="article" />
        <ArticleLanding
          :name="'主題式'"
        />
        <Article class="article" />
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
