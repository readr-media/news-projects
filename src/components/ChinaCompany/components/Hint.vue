<template>
  <span class="hint">
    <span
      class="hint__title title"
    >
      <template v-if="href === ''">
        <span v-text="title" />
        <span
          :class="[
            'title__icon',
            { 'title__icon--toggled': isQuoteToggled }
          ]"
          @click="toggleQuote"
          v-text="'（註）'"
        />
      </template>
      <template v-else>
        <a
          :href="href"
          target="_blank"
          rel="noopener"
          v-text="title"
        />
        <span
          :class="[
            'title__icon',
            { 'title__icon--toggled': isQuoteToggled }
          ]"
          @click="toggleQuote"
        />
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
    font-weight 400
    color black
  &__quote
    margin 20px 0
    padding 7px 13px
    background-color white
    color #686868
    &--toggled
      display block
  a
    text-decoration none
    color #686868
    border-bottom 2px solid #de3b24

.title
  &__icon
    user-select none
    cursor pointer
    color #686868

// @media (max-width 1400px)
//   .title
//     &__icon
//       margin 0 5px
//       border-width 11px 7px 0 7px
</style>
