<template>
  <div class="pagination">
    <template v-for="index in paginationCount">
      <span
        v-if="index == paginationCount"
        v-show="showEndEllipsis"
        :key="`pagination${index}-start`"
        class="ellipsis"
      >
        …
      </span>
      <button
        v-show="showButton(index)"
        :key="`pagination${index}`"
        :class="{ active: page === index }"
        :disabled="page === index"
        class="pagination__item"
        @click="$emit('pageTo', index)"
        v-text="index"
      />
      <span
        v-if="index == 1"
        v-show="showStartEllipsis"
        :key="`pagination${index}-end`"
        class="ellipsis"
      >
        …
      </span>
    </template>
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
    },
    showStartEllipsis () {
      return this.paginationCount > 7 ? Math.abs(this.page - 1) > 3 : false
    },
    showEndEllipsis () {
      return this.paginationCount > 7 ? Math.abs(this.page - this.paginationCount) > 3 : false
    }
  },
  methods: {
    showButton (index) {
      if (this.paginationCount > 7) {
        if (index == 1 || index == this.paginationCount) {
          return true
        } else if (Math.abs(this.page - index) < 3) {
          return true
        }
        return
      }
      return true
      
    }
  }
}
</script>
<style lang="stylus" scoped>
.pagination
  > *
    & + *
      margin-left 5px
  &__item
    width 25px
    height 30px
    padding .2em 0
    color #9b9b9b
    background-color rgba(255, 255, 255, .1)
    border none
    border-radius 2px
    &.active
      color #fff
      background-color rgba(255, 255, 255, .4)
  .ellipsis
    color #9b9b9b
</style>