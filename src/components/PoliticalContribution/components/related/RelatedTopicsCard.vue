<template>
  <a :href="href" target="_blank" class="related-topics-card">
    <h3 class="related-topics-card__title">{{ meta.title }}</h3>
    <img class="related-topics-card__img" :src="imgsrc" alt="">
    <div class="meta">
      <p class="meta__date">{{ meta.date }}</p>
      <p class="meta__source">{{ meta.source }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    imgsrc: {
      type: String,
      default: ''
    },
    meta: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style lang="stylus" scoped>
.related-topics-card
  width calc(100% - 20px)
  border 1px solid lightgray
  border-radius 5%
  padding 10px
  margin 10px 10px
  text-decoration none
  background-color white
  &:hover
    filter brightness(95%)
  &__title
    color #0d87c9
    margin-top 0
    line-height 1.5
  &__img
    width 100%

.meta
  color #808080
  &__date
    margin-bottom 0
  &__source
    margin-top 0
    margin-bottom 0
</style>
