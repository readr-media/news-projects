<template>
  <section
    class="article"
    ref="root"
    :style="{
      position: 'sticky',
      top: `calc(-${height}px + 100vh)`
    }"
  >
    <ArticleLanding
      :name="'主題式'"
    />
    <ArticleContent />
  </section>
</template>

<script>
import ArticleLanding from './ArticleLanding.vue'
import ArticleContent from './ArticleContent.vue'

const calcElementHeight = element => {
  return element.offsetHeight
}

export default {
  components: {
    ArticleLanding,
    ArticleContent
  },
  data() {
    return {
      height: 0
    }
  },
  mounted() {
    this.height = calcElementHeight(this.$refs.root)
  }
}
</script>

<style lang="stylus" scoped>

</style>