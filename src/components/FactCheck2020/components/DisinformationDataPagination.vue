<template>
  <div class="pagination">
    <button
      v-for="index in paginationCount"
      :key="`pagination${index}`"
      :class="{ active: page === index }"
      :disabled="page === index"
      class="pagination__item"
      @click="$emit('pageTo', index)"
      v-text="index"
    />
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('FactCheck')

export default {
  name: 'DisinformationDataPagination',
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState([
      'page'
    ]),
    paginationCount () {
      return Math.ceil(this.count / 5)
    }
  }
}
</script>
<style lang="stylus" scoped>
.pagination
  &__item
    width 25px
    height 30px
    color #9b9b9b
    background-color rgba(255, 255, 255, .1)
    border none
    border-radius 2px
    &.active
      color #fff
      background-color rgba(255, 255, 255, .4)
    & + .pagination__item
      margin-left 5px
</style>