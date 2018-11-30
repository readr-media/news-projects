<template>
  <div class="stacked">
    <div
      class="stacked__male"
      :style="{ width: `${percentageMale * 100}%` }"
      v-text="`男 ${(percentageMale * 100).toFixed(1)}%`"
    >
    </div>
    <div
      class="stacked__female"
      :style="{ width: `${percentageFemale * 100}%` }"
      v-text="`${(percentageFemale * 100).toFixed(1)}% 女`"
    >
    </div>
  </div>
</template>

<script>
import { get, sum } from 'lodash'

export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    total () {
      return sum(this.data)
    },
    percentageMale () {
      return Number((get(this.data, '0', 0) / this.total).toFixed(3))
    },
    percentageFemale () {
      return Number((get(this.data, '1', 0) / this.total).toFixed(3))
    }
  }
}
</script>

<style lang="stylus" scoped>
.stacked
  width 100%
  height 40px
  display flex
  font-size 20px
  // font-weight 600
  &__male
    height 100%
    display flex
    align-items center
    color white
    justify-content flex-start
    background-color #979797
    padding 0 0 0 10px
  &__female
    height 100%
    display flex
    align-items center
    justify-content flex-end
    background-color #d8d8d8
    padding 0 10px 0 0
</style>

