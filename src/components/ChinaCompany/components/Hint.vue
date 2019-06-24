<template>
  <span class="hint">
    <span
      class="hint__title title"
    >
      <template v-if="href === ''">
        {{ title }}<span class="title__icon" @click="toggleQuote" />
      </template>
      <template v-else>
        <a
          :href="href"
          target="_blank"
          rel="noopener"
          v-text="title"
        />
        <span class="title__icon" @click="toggleQuote" />
      </template>
    </span>
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
    },
    href: {
      type: String,
      default: ''
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
    color #4a4a4a
  &__quote
    margin 20px 0
    padding 7px 13px
    background-color white
    color #4a4a4a
    &--toggled
      display block
  a
    text-decoration none
    color #4a4a4a
    border-bottom 2px solid #de3b24

.title
  &__icon
    cursor pointer
    content ''
    display inline-block
    margin 0 5px
    width 0
    height 0
    border-style solid
    border-width 18px 12px 0 12px
    border-color #4a4a4a transparent transparent transparent

@media (max-width 1400px)
  .title
    &__icon
      margin 0
      border-width 14px 9px 0 9px
</style>
