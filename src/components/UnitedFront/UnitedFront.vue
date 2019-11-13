<template>
  <section id="unitedfront">
    <Article />
  </section>
</template>

<script>
import Article from './components/Article.vue'

export default {
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'china-company',
      metaImage: 'china-company/ogimage.png'
    }
  },
  components: {
    Article
  }
}
</script>

<style lang="stylus">
</style>
