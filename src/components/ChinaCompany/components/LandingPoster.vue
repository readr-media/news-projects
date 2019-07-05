<template>
  <section class="img-wrapper">
    <img
      class="img-wrapper__img"
      :src="`/proj-assets/china-company/${img}.jpg`"
      alt=""
    >
  </section>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.img-wrapper
  background-color #000537
  box-sizing border-box
  &__img
    width 100%
    height 100%
    object-fit cover

@media (max-width 1005px)
  .img-wrapper
    &__img
      height 100vh
</style>
