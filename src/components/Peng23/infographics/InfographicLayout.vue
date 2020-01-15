<template>
  <div class="infographic">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: '',
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
.infographic
  position relative
  display inline-block
  width 402px
  height 582px
  &__label
    text-align center
    margin-top 10px
</style>