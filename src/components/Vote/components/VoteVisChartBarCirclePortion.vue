<template>
  <div
    :style="{ backgroundImage, backgroundColor }"
  >
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: 'white'
    },
    nonVisibleColor: {
      type: String,
      required: true
    },
    portion: {
      type: Number,
      default: .3
    }
  }, 
  computed: {
    backgroundImage () {
      if (this.portion === 1) {
        return 'none'
      } else if (this.portion >= 0.5) {
        return `linear-gradient(${90 + (360 * this.portion) - 180}deg, transparent 50%, ${this.backgroundColor} 50%),linear-gradient(90deg, ${this.nonVisibleColor} 50%, transparent 50%)`
      } else if (this.portion < 0.5) {
        return `linear-gradient(${90 + (360 * this.portion)}deg, transparent 50%, ${this.nonVisibleColor} 50%),linear-gradient(90deg, ${this.nonVisibleColor} 50%, transparent 50%)`
      }
    }
  } 
}
</script>

<style lang="stylus" scoped>
div
  d = 30px
  width d
  height d
  border-radius d
</style>

