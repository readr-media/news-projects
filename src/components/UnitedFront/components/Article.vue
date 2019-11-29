<template>
  <section
    class="article unitedfront-article"
    ref="root"
    :style="{
      top: `calc(-${height}px + 100vh)`
    }"
  >
    <ArticleContent
      :name="name"
      @toggleHint="calcHeight"
    />
  </section>
</template>

<script>
import ArticleContent from './ArticleContent.vue'

const calcElementHeight = element => {
  return element.offsetHeight
}

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
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
    window.addEventListener('resize', this.calcHeight)
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
.article
  position sticky
</style>