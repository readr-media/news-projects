<template>
  <div class="stacked">
    <div class="stacked__agree-text">
      同意
    </div>
    <div class="stacked__graph graph">
      <div
        class="graph__agree"
        :style="{ width: `${percentageAgree * 100}%` }"
        v-text="`${(percentageAgree * 100).toFixed(1)}%`"
      >
      </div>
      <div
        class="graph__disagree"
        :style="{ width: `${percentageDisagree * 100}%` }"
        v-text="`${(percentageDisagree * 100).toFixed(1)}%`"
      >
      </div>
    </div>
    <div class="stacked__disagree-text">
      不同意
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    tksAgree () {
      return get(this.data, 'agreeTks', 0)
    },
    tksDisagree () {
      return get(this.data, 'disagreeTks', 0)
    },
    tksTotal () {
      return this.tksAgree + this.tksDisagree 
    },
    percentageAgree () {
      return Number((this.tksAgree / this.tksTotal).toFixed(3))
    },
    percentageDisagree () {
      return Number((1 - this.percentageAgree).toFixed(3))
    }
  }
}
</script>

<style lang="stylus" scoped>
.stacked
  width 100%
  height 40px
  display flex
  align-items center
  &__agree-text
    min-width calc(30px + 14px)
    font-size 20px
    margin 0 5px 0 0
  &__graph
    width 100%
    height 40px
  &__disagree-text
    min-width 65px
    font-size 20px
    margin 0 0 0 5px

.graph
  display flex
  &__agree
    font-size 20px
    font-weight 600
    height 100%
    display flex
    align-items center
    color white
    padding 0 0 0 10px
    justify-content flex-start
    background-color #9e005d
  &__disagree
    font-size 20px
    font-weight 600
    height 100%
    display flex
    align-items center
    padding 0 10px 0 0
    justify-content flex-end
    background-color #d8d8d8
</style>

