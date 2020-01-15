<template>
  <section class="article-section">
    <!-- <RichBadge class="article-section__rich-badge"/> -->
    <div class="article-section__article article">
      <div class="article__inner-wrapper">
        <ArticleContent />
        <div
          class="fb-comments"
          data-href="https://www.readr.tw/project/china-company"
          data-colorscheme="light"
          data-numposts="10"
          data-width="100%"
          data-order-by="reverse_time"
          style="width: 100%"
        />
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
    max-width 1005px
    margin 0 570px 0 100px
    padding 50px 0

@media (max-width 1005px)
  .article-section
    padding 65px 10px 0 10px

  .article
    &__inner-wrapper
      max-width auto
      margin 0
      padding 30px 0 100px 0
</style>
