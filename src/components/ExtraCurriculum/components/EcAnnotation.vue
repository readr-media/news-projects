<template>
  <div class="ec-anno">
    <button
      :class="{ open: showAnnotation }"
      @click="showAnnotation = !showAnnotation"
    />
    <div v-show="showAnnotation" class="ec-anno__content" v-text="content" />
  </div>
</template>
<script>
export default {
  name: 'EcAnnotation',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showAnnotation: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.ec-anno
  display inline
  button
    display inline-flex
    justify-content center
    align-items center
    margin 0 .5em 0 0
    width 25px
    height 25px
    padding .2em
    vertical-align text-top
    border none
    cursor pointer
    background-image url(/proj-assets/extra-curriculum/annotation.svg)
    background-size 28px 28px
    background-color transparent
    background-position center center
    &.open
      background-image url(/proj-assets/extra-curriculum/annotation-close.svg)
  &__content
    margin .5em 0
    padding 10px 25px
    background-color #ece4ba
    border-radius 14px
</style>