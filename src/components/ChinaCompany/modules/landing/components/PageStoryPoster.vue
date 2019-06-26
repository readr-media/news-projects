<template>
  <main class="img-wrapper">
    <picture>
      <source
        :srcset="`/proj-assets/china-company/${img}-mobile.png`"
        media="(max-width: 1400px)"
      >
      <img
        class="img-wrapper__img"
        :src="`/proj-assets/china-company/${img}-web.png`"
        alt=""
      >
    </picture>
  </main>
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
    object-fit contain

@media (max-width 1400px)
  .img-wrapper
    &__img
      height 100vh
</style>
