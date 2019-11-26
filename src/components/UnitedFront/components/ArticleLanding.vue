<template>
  <section class="article-landing">
    <!-- <img
      :src="`/proj-assets/unitedfront/article-landings/${name}-web.png`"
      alt=""
    > -->
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
</style>