<template>
  <aside
    :class="[
      'intro-wrapper',
      `intro-wrapper--${direction}`
    ]"
  >
    <h1
      class="intro-wrapper__title"
      v-text="title"
    />
    <p
      class="intro-wrapper__description"
      v-html="description"
    />
  </aside>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'normal',
      validator (value) {
        return ['normal', 'reverse'].includes(value)
      }
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.intro-wrapper
  display flex
  flex-direction column
  justify-content center
  background-color #000537
  box-sizing border-box
  &--normal
    padding 98px 0 98px 98px
  &--reverse
    padding 98px 98px 98px 0
  &__title
    font-size 60px
    font-weight 500
    color #dd3c2d
    margin 0
  &__description
    font-size 30px
    color white
    line-height 1.5
    margin 35px 0 0 0

@media (max-width 1400px)
  .intro-wrapper
    display flex
    flex-direction column
    justify-content center
    align-items center !important
    padding 30px
    text-align left !important
    height 100vh
    &__title
      font-size 60px
    &__description
      font-size 20px
      margin 35px 0 0 0
      text-align center
      // & >>> br
      //   display none
</style>
