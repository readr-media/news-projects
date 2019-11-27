<template>
  <section
    class="article unitedfront-article"
    ref="root"
    :style="{
      position: 'sticky',
      top: `calc(-${height}px + 100vh)`
    }"
  >
    <ArticleContent @toggleHint="calcHeight" />
  </section>
</template>

<script>
import ArticleContent from './ArticleContent.vue'

const calcElementHeight = element => {
  return element.offsetHeight
}

export default {
  components: {
    ArticleContent
  },
  data() {
    return {
      height: 0
    }
  },
  mounted() {
    this.calcHeight()
  },
  methods: {
    calcHeight() {
      this.$nextTick(() => {
        this.height = calcElementHeight(this.$refs.root)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>