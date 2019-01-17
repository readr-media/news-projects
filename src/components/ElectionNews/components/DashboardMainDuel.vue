<template>
  <section class="section">
    <Header class="section__header"/>
    <Legends class="section__legends"/>
    <Content class="section__content"/>
    <Footer class="section__footer"/>
  </section>
</template>

<script>
import Header from './duel/Header.vue'
import Legends from './Legends.vue'
import Content from './duel/Content.vue'
import Footer from './duel/Footer.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    Header,
    Legends,
    Content,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
.section
  &__legends
    margin 16px 0 0 0
  &__content
    margin 16px 0 0 0
  &__footer
    margin 32px 0 0 0
</style>