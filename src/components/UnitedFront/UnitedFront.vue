<template>
  <section id="unitedfront">
    <Landing />
    <div class="unitedfront__articles articles articles--gradient-background">
      <div class="articles__inner-wrapper">
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
    </div>
    <Credit />
    <Footer />
  </section>
</template>

<script>
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

.articles
  &--gradient-background
    background linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(231,0,0,1) 100%)
  &__inner-wrapper
    max-width 1000px
    margin 0 auto

.flourish-embed
  .flourish-credit
    display none
</style>
