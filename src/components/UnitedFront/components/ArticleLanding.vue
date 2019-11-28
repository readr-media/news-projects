<template>
  <section
    :class="[
      'article-landing',
      { 'article-landing--hidden': name === '序篇' }
    ]"
  >
    <picture>
      <source
        media="(max-width: 768px)"
        :srcset="`/proj-assets/unitedfront/article-landings/${name}-mobile.png`"
      >
      <img
        class="article-landing__img"
        :src="`/proj-assets/unitedfront/article-landings/${name}-web.png`"
        alt=""
      >
    </picture>
  </section>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-landing
  position relative
  z-index 3
  height 600px
  background-color white
  box-shadow: 0px -5px 5px 0px rgba(74,74,74,0.6);
  &--hidden
    height 0px
  &__img
    width 100%

@media (max-width 768px)
  .article-landing
    height auto
</style>