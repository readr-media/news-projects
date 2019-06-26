<template>
  <section class="article-section">
    <!-- <RichBadge class="article-section__rich-badge"/> -->
    <div class="article-section__article article">
      <div class="article__inner-wrapper">
        <ArticleContent />
      </div>
    </div>
  </section>
</template>

<script>
// import RichBadge from './components/RichBadge.vue'
import ArticleContent from './components/ArticleContent.vue'

export default {
  components: {
    // RichBadge,
    ArticleContent
  }
}
</script>

<style lang="stylus" scoped>
.article-section
  background-color #000537
  padding 85px 54px 54px 54px
  // overflow-y scroll
  height auto !important
  box-sizing border-box
  // &__rich-badge
  //   position sticky
  //   top 0

.article
  background-color #e9dbb6
  &__inner-wrapper
    max-width 1400px
    margin 0 auto
    padding 70px 0

@media (max-width 1400px)
  .article-section
    padding 65px 0 0 0

  .article
    &__inner-wrapper
      max-width auto
      padding 30px 0
</style>
