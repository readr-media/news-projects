<template>
  <li class="list-item">
    <h1 class="list-item__title">{{ data.name }} {{ data.bosses }}</h1>
    <h2 class="list-item__subtitle">核心公司：{{ data.mainCompanies }}</h2>
    <p class="list-item__paragraph"><span class="list-item__money">{{ data.donatesSum.toLocaleString() }}</span> 元</p>
    <BarHorizontalStackedOrdinalCorpDonates :data="data"/>
  </li>
</template>

<script>
import BarHorizontalStackedOrdinalCorpDonates from '../../../charts/BarHorizontalStackedOrdinalCorpDonates.vue'

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    BarHorizontalStackedOrdinalCorpDonates,
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  border-bottom 1px solid #d3d3d3
  padding 15px 0
  &__title
    font-size 22px
    font-weight 400
    margin 5px 0
  &__subtitle
    font-size 18px
    font-weight 400
    margin 5px 0
  &__paragraph
    font-size 18px
    margin 5px 0
  &__money
    font-size 22px
    color #9e005d
    font-weight 600
</style>

