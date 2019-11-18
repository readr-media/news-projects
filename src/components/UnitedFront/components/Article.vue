<template>
  <section class="article">
    <ArticleLanding />
    <ArticleContent />
  </section>
</template>

<script>
import ArticleLanding from './ArticleLanding.vue'
import ArticleContent from './ArticleContent.vue'

export default {
  components: {
    ArticleLanding,
    ArticleContent
  }
}
</script>

<style lang="stylus" scoped>

</style>