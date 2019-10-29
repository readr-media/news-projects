<template>
  <section class="report-result">
    <TheUser />
  </section>
</template>

<script>
import TheUser from './TheUser.vue'

export default {
  name: 'ReportResult',
  components: {
    TheUser
  }
}
</script>

<style lang="stylus">
.report-result
  background-image url(/proj-assets/food-delivery/img/map.jpg)
  background-size cover
  background-position center
  background-repeat no-repeat
  height 100vh
</style>