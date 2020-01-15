<template>
  <div
    :class="{ loading: loading }"
    class="data-list"
  >
    <div class="heading">
      <p>篩選結果</p>
      <p v-show="data.length > 0" class="small">第 {{ (page - 1) * 5 + 1 }}-{{ page * 5 }} 則</p>
    </div>
    <DisinformationDataItem
      v-for="item in data"
      :key="`list-${item.sentences}`"
      :data="item"
    />
    <p
      v-if="!loading && currentCount === 0"
      class="small"
    >
      目前尚未有資料
    </p>
    <p
      v-show="currentCount > 0"
      class="small count-info"
    >
      第 {{ currentCount }}/{{ count }} 則
    </p>
    <slot name="loadMore" />
    <Loading class="loading-effect"/>
    <slot name="pagination" />
  </div>
</template>
<script>
import DisinformationDataItem from './DisinformationDataItem.vue'
import Loading from './Loading.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapState } = createNamespacedHelpers('FactCheck')

export default {
  name: 'DisinformationDataList',
  components: {
    DisinformationDataItem,
    Loading
  },
  props: {
    data: {
      data: {
        type: Array,
        default: () => []
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.dataListLoading
    }),
    ...mapGetters({
      count: 'verifiedDataCountFormated'
    }),
    currentCount () {
      return this.data.length
    },
    page () {
      return this.$store.state.FactCheck.page
    },
  }
}
</script>
<style lang="stylus" scoped>

.data-list
  &.loading
    .loading-effect
      display block
  p.small
    margin-top 10px
    color #9b9b9b
  .heading
    color #9b9b9b
    > p.small
      display none
  .data-item
    margin-top 5px
  .count-info
    margin-top 20px
    text-align center
  .load-more
    width 100%
    height 45px
    margin-top 5px
    color #07172e
    background-color rgba(255, 255, 255, .85)
    border-radius 6px
  .loading-effect
    display none
    left 50%
    transform translateX(-50%)
    margin-top 10px

@media (max-width: 1023px)
  .data-list
    &.switching
      .data-item, .count-info
        display none
    .pagination
      display none !important

@media (min-width: 1024px)
  .data-list
    .heading
      > p, > p.small
        display inline-block
      > p.small
        margin 0 0 0 10px
    .data-item
      margin-top 20px
    .count-info
      display none
    .load-more
      display none !important
</style>
