<template>
  <div class="lightbox-input-container">
    <h1 class="lightbox-input-container__title" v-text="title"></h1>
    <input :class="[ 'lightbox-input-container__input', { 'lightbox-input-container__input--alert': alert } ]" :placeholder="placeholder" v-model="emailLocal">
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
    email: {
      type: String,
      default: '',
    },
    alert: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    email () {
      if (this.email === '') this.emailLocal = ''
      this.emailLocal = this.email
    },
    emailLocal () {
      this.$emit('update:email', this.emailLocal)
    }
  },
  data () {
    return {
      emailLocal: ''
    }
  },
}
</script>

<style lang="stylus" scoped>
.lightbox-input-container
  width 100%
  display flex
  flex-direction column
  align-items center
  margin-top 35px
  &__title
    font-size 32px
    font-weight 900
    line-height 1.38
    text-align center
    color #b2dbd5
    margin 0 0 20px 0
  &__input
    width 100%
    height 48px
    padding 16px
    background-color #1f464f
    border none
    color white
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
  .lightbox-input-container
    align-items flex-start
    &__title
      font-size 22px
      font-weight 900
      line-height 1.09
      margin 0 0 17px 13px
    &__input
      padding 16px 13px
      &::-webkit-input-placeholder
      // , &::-moz-placeholder, &:-moz-placeholder, &:-ms-input-placeholder
        font-size 16px
        line-height 1.5
</style>


