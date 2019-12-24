<template>
  <section class="section">
    <CountyList
      class="section__county-list"
    />
    <Legends
      class="section__legends"
    />
  </section>
</template>

<script>
import CountyList from './ChartCountyList.vue'
import Legends from './ChartLegends.vue'

export default {
  components: {
    CountyList,
    Legends
  }
}
</script>

<style lang="stylus" scoped>
.section
  &__county-list
    margin 44px 0 0 0
  &__legends
    margin-top 27px

@media (min-width 768px)
  .section
    &__county-list
      margin 24px 0 0 0
    &__legends
      margin-top 30px
</style>
