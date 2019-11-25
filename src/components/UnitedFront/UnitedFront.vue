<template>
  <section id="unitedfront">
    <TheAsideNav class="unitedfront__aside-nav" />
    <Landing />
    <div
      class="
        unitedfront__articles
        articles
        articles--gradient-background
        articles--repeat-background-img
      "
    >
      <div class="articles__inner-wrapper">
        <Article class="article" />
        <Article class="article" />
        <Article class="article" />
        <Article class="article" />
      </div>
    </div>
    <Credit />
    <Footer />
  </section>
</template>

<script>
import TheAsideNav from './components/TheAsideNav.vue'
import Landing from './components/Landing.vue'
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
    TheAsideNav,
    Landing,
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
  &__aside-nav
    position fixed
    top 50vh
    left calc((100vw - 1000px) / 2 + 90px)
    z-index 2

.articles
  &--gradient-background
    background linear-gradient(180deg, #212338 0%, #d02525 100%)
  &--repeat-background-img
    background-image: url(/proj-assets/unitedfront/bg-asset.png)
  &__inner-wrapper
    max-width 1000px
    margin 0 auto

.flourish-embed
  .flourish-credit
    display none
</style>
