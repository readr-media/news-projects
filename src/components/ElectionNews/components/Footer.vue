<template>
  <footer class="footer">
    <div class="footer__comment">
      <iframe src="https://www.readr.tw/comment?resource_url=https://www.readr.tw/series/2018-vote" frameborder="0"></iframe>
    </div>
    <div class="footer__related-projects">
      <RelatedReports :theme="'light'"/>
    </div>
  </footer>
</template>

<script>
import RelatedReports from 'src/components/RelatedReports.vue'

export default {
  components: {
    RelatedReports
  }
}
</script>

<style lang="stylus" scoped>
.footer
  &__comment
    iframe
      width 100%
</style>