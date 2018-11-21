<template>
  <button class="button" v-text="text"></button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang="stylus" scoped>
.button
  width 120px
  height 40px
  border-radius 8px
  background-color white
  color #061c37
  border 2px solid white
  font-size 16px
  font-weight 400
  cursor pointer
  transition filter .15s ease-out
  &:focus
    outline none
  &:hover
    filter brightness(.8)

@media (max-width 768px)
  .button
    width 100%
    height 40px
    font-size 20px
    &:hover
      filter none
</style>

