<template>
  <header class="header">
    <HeaderKeywordLegend class="header__legend"/>
    <SearchKeyword class="header__search"/>
  </header>
</template>

<script>
import HeaderKeywordLegend from './HeaderKeywordLegend.vue'
import SearchKeyword from '../SearchKeyword.vue'

// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    HeaderKeywordLegend,
    SearchKeyword
  }
}
</script>

<style lang="stylus" scoped>
.header
  &__search
    margin 10px 0 0 0

@media (min-width 1024px)
  .header
    &__search
      margin 20px 0 0 0
</style>