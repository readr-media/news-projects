<template>
  <span class="hint">
    <span
      class="hint__title"
      @click="toggleQuote"
      v-text="title"
    />
    <span
      v-show="isQuoteToggled"
      :class="[
        'hint__quote',
        { 'hint__quote--toggled': isQuoteToggled }
      ]"
      v-text="quote"
    />
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    quote: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isQuoteToggled: false
    }
  },
  methods: {
    toggleQuote () {
      this.isQuoteToggled = !this.isQuoteToggled
    }
  }
}
</script>

<style lang="stylus" scoped>
.hint
  &__title
    font-weight 500
    color #de3b24
    cursor pointer
    &:after
      content ''
      display inline-block
      margin 0 5px
      width 0
      height 0
      border-style solid
      border-width 18px 12px 0 12px
      border-color #dc3d2d transparent transparent transparent
  &__quote
    margin 20px 0
    padding 7px 13px
    background-color white
    color #4a4a4a
    &--toggled
      display block
</style>
