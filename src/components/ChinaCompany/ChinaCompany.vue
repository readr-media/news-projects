<template>
  <section id="china-company">
    <Landing />
    <Article />
  </section>
</template>

<script>
import Landing from './modules/landing/index.vue'
import Article from './modules/article/index.vue'

export default {
  metaInfo () {
    return {
      title: '中國發大財',
      description: '',
      metaUrl: '',
      metaImage: ''
    }
  },
  components: {
    Landing,
    Article
  }
}
</script>

<style lang="stylus">
</style>
