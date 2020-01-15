<template>
  <div class="tooltip">
    {{ targetName }} 共捐獻 <span>{{ donatesValue }}</span> 元<br>
    給 {{ sourceName }}
  </div>
</template>

<script>
import { get, } from 'lodash'

export default {
  props: {
    tooltipData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sourceName () {
      return get(this.tooltipData, ['source', 'name'], '')
    },
    targetName () {
      return get(this.tooltipData, ['target', 'name'], '')
    },
    donatesValue () {
      return get(this.tooltipData, 'value', 0).toLocaleString()
    }
  }
}
</script>

<style lang="stylus" scoped>
.tooltip
  padding 15px
  font-size 18px
  line-height 1.5
  span
    color #9e005d
    font-size 24px
    font-weight 600
</style>


