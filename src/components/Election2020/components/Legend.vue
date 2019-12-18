<template>
  <!-- 
    How to use this component:
    <Legend
      :showSquareBorder="true || false"
      :squareColor="'black'"
      :text="'foo legend text'"
    />
   -->
  <div class="legend">
    <Square
      class="legend__square"
      :color="squareColor"
      :showBorder="showSquareBorder"
    />
    <span
      class="legend__text"
      v-text="text"
    />
  </div>
</template>

<script>
import Square from './Square.vue'

export default {
  props: {
    squareColor: {
      type: String,
      default: 'black',
      validator(value) {
        return [
          'black',
          'white',
          'blue',
          'green',
          'orange',
          'purple',
          'gray'
        ].includes(value)
      }
    },
    showSquareBorder: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'foo legend text'
    }
  },
  components: {
    Square
  }
}
</script>

<style lang="stylus" scoped>
.legend
  display flex
  align-items center
  &__text
    margin 0 0 0 10px
    font-size 14px
    color $color-black-lighter
</style>
