<template>
  <section id="china-company">
    <Landing />
  </section>
</template>

<script>
import Landing from './modules/landing/index.vue'

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
    Landing
  }
}
</script>

<style lang="stylus">
</style>
