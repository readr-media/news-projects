<template>
  <div class="annotation">
    <span
      @click="openAnnotation = !openAnnotation"
      v-text="text"
    />
    <div
      v-show="openAnnotation"
      class="annotation__content"
      v-html="annotationContent"
    />
  </div>
</template>

<script>
export default {
  name: 'ArticleAnnotation',
  props: {
    text: {
      type: String,
      required: true
    },
    annotationContent: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      openAnnotation: false
    }
  }
}
</script>

<style lang="stylus" scoped>

.annotation
  display inline
  span
    color #14c40d
    font-weight 500
    cursor pointer
    &::after
      content '註'
      display inline-flex
      justify-content center
      align-items center
      width 24px
      height 24px
      margin 0 .3em
      color #fff
      background-color #14c40d
      border-radius 50%
      box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
  &__content
    margin 5px 0
    padding 14px 20px 9px
    color #ffffff
    font-size 15px
    text-align justify
    line-height 1.73
    background-color #26c226
    border-radius 14px
    box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
</style>
