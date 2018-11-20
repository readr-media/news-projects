<template>
  <div v-show="amount !== 0" class="rect" :style="{ backgroundColor, width }">
    {{ amount !== 0 ? amount.toFixed(1) : '' }}
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountMax: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      maxWidth: 720
    }
  },
  computed: {
    width () {
      return `${this.amount / this.amountMax * this.maxWidth}px`
    },
  }
}
</script>

<style lang="stylus" scoped>
.rect
  height 30px
  text-align right
  padding 0 10px 0 0
  font-size 16px
  line-height 30px
</style>

