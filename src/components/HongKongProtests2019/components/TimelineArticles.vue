<template>
  <section class="articles">
    <TimelineArticle class="articles__article" />
    <TimelineArticle class="articles__article" />
    <TimelineArticle class="articles__article" />
    <TimelineArticle class="articles__article" />
    <TimelineArticle class="articles__article" />
    <TimelineArticle class="articles__article" />
  </section>
</template>

<script>
import TimelineArticle from './TimelineArticle.vue'

export default {
  components: {
    TimelineArticle
  }
}
</script>

<style lang="stylus" scoped>
.articles
  width 640px
  padding 43px 0
  &__article
    & + &
      margin 130px 0 0 0
</style>