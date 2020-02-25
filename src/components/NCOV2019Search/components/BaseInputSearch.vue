<template>
  <div
    :class="[
      'search-wrapper',
      { 'search-wrapper--show-border': isInputFocus },
      { 'search-wrapper--text-dark': isDone }
    ]"
  >
    <input
      class="search-wrapper__input"
      type="text"
      v-model="value"
      :placeholder="placeholder"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
      @keyup.enter="handleSubmit"
    >
    <button
      class="search-wrapper__submit-button submit-button"
      @click="handleSubmit"
    >
      <img
        class="submit-button__img"
        src="/proj-assets/ncov2019search/search.svg"
        alt="search"
      >
    </button>
  </div>
</template>

<script>
export default {
  props: {
    input: {
      type: String,
      default: ''
    },
    isDone: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isInputFocus: false,
      value: this.input,
      placeholder: '您想問什麼？'
    }
  },
  watch: {
    input(value) {
      this.value = value
    }
  },
  methods: {
    handleInputFocus() {
      this.isInputFocus = true
    },
    handleInputBlur() {
      this.isInputFocus = false
    },
    handleSubmit() {
      this.$emit('submit', this.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-wrapper
  display flex
  background-color white
  justify-content space-between
  border-radius 2px
  border 2px solid transparent
  transition border .25s ease-out
  font-size 16px
  color rgba(0, 0, 0, 0.6)
  min-width 220px
  &--show-border
    border 2px solid #429057
  &--text-dark
    color rgba(0, 0, 0, 0.87)
  &__input
    flex 1 1 auto
    border none
    padding 0 14px
    border-radius 2px
    font-size inherit
    color inherit
    display flex
    align-items center
    &:focus
      outline none
    &::placeholder
      line-height 1.25

.submit-button
  display flex
  justify-content center
  align-items center
  padding 0
  width 40px
  height 40px
  background-color transparent
  border none
  cursor pointer
  border-radius 2px
  &:focus
    outline none
  &__img
    width 17px
    height 17px
</style>
