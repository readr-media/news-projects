<template>
  <div class="lightbox-textarea-container">
    <h1 class="lightbox-textarea-container__title" v-text="title"></h1>
    <textarea :class="[ 'lightbox-textarea-container__textarea', { 'lightbox-textarea-container__textarea--alert': alert }]" :placeholder="placeholder" v-model="textareaContentLocal"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '標題',
    },
    placeholder: {
      type: String,
      default: '內容',
    },
    textareaContent: {
      type: String,
      default: '',
    },
    alert: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    textareaContent () {
      if (this.textareaContent === '') this.textareaContentLocal = ''
    },
    textareaContentLocal () {
      this.$emit('update:textareaContent', this.textareaContentLocal)
    }
  },
  data () {
    return {
      textareaContentLocal: ''
    }
  },
}
</script>

<style lang="stylus" scoped>
.lightbox-textarea-container
  width 100%
  display flex
  flex-direction column
  align-items center
  &__title
    font-size 32px
    font-weight 900
    line-height 1.38
    color #b2dbd5
    margin 0 0 20px 0
  &__textarea
    width 100%
    height 240px
    padding 16px
    background-color #1f464f
    border none
    color white
    resize none
    &:focus
      outline none
    &::-webkit-input-placeholder
    // , &::-moz-placeholder, &:-moz-placeholder, &:-ms-input-placeholder
      font-size 18px
      line-height 1.44
      text-align justify
      color #c9c9c9
    &--alert
      outline 1px solid red

@media (max-width 425px)
  .lightbox-textarea-container
    align-items flex-start
    &__title
      font-size 22px
      font-weight 900
      line-height 1.09
      margin 0 0 17px 13px
    &__textarea
      height 200px
      padding 16px 13px
      &::-webkit-input-placeholder
      // , &::-moz-placeholder, &:-moz-placeholder, &:-ms-input-placeholder
        font-size 16px
        line-height 1.5
</style>


