<template>
  <figure>
    <h1 v-text="'test title'" />
    <img src="" alt="">
    <figcaption v-text="'test figcaption'" />
  </figure>
</template>

<script>
export default {
  props: {
    
  }
}
</script>

<style lang="stylus" scoped>
figure
  margin 0
  display flex
  flex-direction column
  align-items center
  h1
    color #4a4a4a
    font-size 21px
    margin 0
  img
    display block
    width 100%
    height 500px
    background-color gray
    margin 10px 0 0 0
  figcaption
    margin 10px 0 0 0
    color #4a4a4a
    font-size 14px
</style>
