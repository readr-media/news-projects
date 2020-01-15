<template>
  <div
    :class="[
      'button',
      { 'button--en': $i18n.locale === 'en' }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.button
  width 130px
  height 30px
  color white
  background-color #4a90e2
  border 1px solid #4a90e2
  display flex
  justify-content center
  align-items center
  font-size 18px
  cursor pointer
  &--en
    font-size 10px

@media (min-width 1024px)
  .button
    width 200px
    height 60px
    font-size 30px
    &--en
      font-size 16px
</style>