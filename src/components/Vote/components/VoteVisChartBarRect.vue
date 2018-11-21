<template>
  <div v-show="amount !== 0" class="rect" :style="{ backgroundColor, width }">
    {{ amount >= 0.2 ? amount.toFixed(1) : '' }}
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
  },
  methods: {
    resizeHandler () {
      if (window.innerWidth <= 768) {
        this.maxWidth = window.innerWidth
      } else {
        if (this.maxWidth !== 720) {
          this.maxWidth = 720
        }
      }
    }
  },
  mounted () {
    if (window.innerWidth <= 768) {
      this.maxWidth = window.innerWidth
    }

    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandler)
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

