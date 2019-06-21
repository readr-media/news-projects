<template>
  <section class="article-section">
    <div class="article-section__rich-badge">
      be rich
    </div>
    <div class="article-section__article article">
      <div class="article__inner-wrapper">
        <ArticleContent />
      </div>
    </div>
  </section>
</template>

<script>
import ArticleContent from './components/ArticleContent.vue'

export default {
  components: {
    ArticleContent
  }
}
</script>

<style lang="stylus" scoped>
.article-section
  background-color #000537
  padding 0 54px 54px 54px
  &__rich-badge
    height 343px
    background-color #000537
    position sticky
    top 0
    // border 1px solid red
    display flex
    justify-content center
    align-items center
    color white

.article
  background-color #e9dbb6
  &__inner-wrapper
    max-width 1400px
    margin 0 auto
    padding 70px 0
</style>
