<template>
  <footer class="footer">
    <TheDonateButton
      class="footer__donate"
    />
    <TheNewsletterSubscribe
      class="footer__newsletter"
    />
  </footer>
</template>

<script>
import TheDonateButton from './TheDonateButton.vue'
import TheNewsletterSubscribe from './TheNewsletterSubscribe.vue'

export default {
  components: {
    TheDonateButton,
    TheNewsletterSubscribe
  }
}
</script>

<style lang="stylus" scoped>
.footer
  background-color white
  padding 65px 0
  display flex
  flex-direction column
  align-items center
  position relative
  z-index 200
  &__newsletter
    margin 50px 0 0 0

@media (max-width 768px)
  .footer
    padding 0 10px
</style>