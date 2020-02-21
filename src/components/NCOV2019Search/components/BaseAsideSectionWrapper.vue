<template>
  <div class="aside-section-wrapper">
    <h1
      class="aside-section-wrapper__title"
      v-text="title"
    />
    <div class="aside-section-wrapper__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.aside-section-wrapper
  background-color white
  &__title
    font-size 17px
    color rgba(0, 0, 0, 0.87)
    font-weight 600
    margin 0
    height 44px
    padding 0 20px
    display flex
    align-items center
  &__content
    border-top 2px solid rgba(216, 216, 216, 0.5)
</style>
