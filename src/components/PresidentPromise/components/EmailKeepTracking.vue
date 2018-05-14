<template>
  <div class="email-keep-tracking">
    <h1 class="email-keep-tracking__hint">持續追蹤</h1>
    <div class="email-keep-tracking__input-container">
      <input class="email-keep-tracking__input" type="text" placeholder="請輸入您的 email" v-model="emailKeepTracking">
      <button class="email-keep-tracking__submit" @click="submit">確定</button>
    </div>
  </div>
</template>

<script>
import { isEmail, } from 'validator'

export default {
  watch: {
    '$store.state.PresidentPromise.emailKeepTracking' (value) {
      this.emailKeepTracking = value
    }
  },
  data () {
    return {
      emailKeepTracking: ''
    }
  },
  methods: {
    submit () {
      if (isEmail(this.emailKeepTracking)) this.$store.commit('PresidentPromise/UPDATE_EMAIL_KEEPTRACKING', this.emailKeepTracking)
    }
  }
}
</script>


<style lang="stylus" scoped>
.email-keep-tracking
  display flex
  flex-direction column
  align-items center
  background-color #2b616d
  &__hint
    font-size 40px
    font-weight 900
    line-height 0.95
    text-align center
    color #b2dbd5
    margin 52px 0
  &__input-container
    display flex
    align-items center
    margin 0 0 87px 0
  &__input
    width calc(760px - 53px)
    height 48px
    background-color #1f464f
    border none
    padding 15px 17px
    font-size 18px
    line-height 1.17
    text-align justify
    color #c9c9c9
    &:focus
      outline none
    &::-webkit-input-placeholder
    // , &::-moz-placeholder, &:-moz-placeholder, &:-ms-input-placeholder
      font-size 18px
      line-height 1.17
      text-align justify
      color #c9c9c9
  &__submit
    height 48px
    border none
    background-color #1f464f
    cursor pointer
    padding 0 16px
    font-size 18px
    line-height 1.17
    text-align center
    color #b2dbd5
    &:focus
      outline none
    
@media (max-width 425px)
  .email-keep-tracking
    align-items flex-start
    &__hint
      padding 0 0 0 20px
      font-size 24px
      margin 17px 0
    &__input-container
      margin 0 0 45px 0
      width 100%
    &__input
      width auto
      flex 1 1 auto
      padding 15px 20px
      border-radius 0
      &::-webkit-input-placeholder
        line-height 1.5
    &__submit
      padding 0 20px 0 0
</style>
