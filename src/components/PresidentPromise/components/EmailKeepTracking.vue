<template>
  <div class="email-keep-tracking">
    <h1 class="email-keep-tracking__hint">持續追蹤</h1>
    <div class="email-keep-tracking__input-container">
      <input class="email-keep-tracking__input" type="text" placeholder="請輸入您的 email" v-model="emailKeepTracking">
      <button :class="[ 'email-keep-tracking__submit', { 'email-keep-tracking__submit--disabled': !isEmailValid || showCheckIcon } ]" @click="submit">
        <span v-show="!showCheckIcon">確定</span>
        <div class="email-keep-tracking__check-icon-container" v-show="showCheckIcon">
          <div class="email-keep-tracking__check-icon"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { isEmail, isEmpty, } from 'validator'
import { PRESIDENT_PROMISE_FEEDBACK_SHEET_ID, } from 'api/config'

const DEFAULT_VALUEINPUTOPTION = 'RAW'
const appendSheet = (store, {
  spreadsheetId = PRESIDENT_PROMISE_FEEDBACK_SHEET_ID,
  range,
  valueInputOption = DEFAULT_VALUEINPUTOPTION,
  resource
}) => {
  return store.dispatch('APPEND_SHEET', {
    params: {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: valueInputOption,
      resource: resource,
    }
  })
}

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
  computed: {
    isEmailValid () {
      return isEmail(this.emailKeepTracking)
    },
    showCheckIcon () {
      return !isEmpty(this.$store.state.PresidentPromise.emailKeepTracking) && this.emailKeepTracking === this.$store.state.PresidentPromise.emailKeepTracking
    }
  },
  methods: {
    submit () {
      if (this.isEmailValid && !this.$store.state.PresidentPromise.emailKeepTrackingIsSubmitted) {
        this.$store.commit('PresidentPromise/UPDATE_EMAIL_KEEPTRACKING', this.emailKeepTracking)
        this.$store.commit('PresidentPromise/SUBMIT_EMAIL_KEEPTRACKING')

        const DEFAULT_MAJORDIMENSION = 'ROWS'
        appendSheet(this.$store, {
          range: 'follow',
          resource: {
            'majorDimension': DEFAULT_MAJORDIMENSION,
            'values': [
              [ this.emailKeepTracking ]
            ],
          }
        })
      }
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
    transition color .25s
    &:focus
      outline none
    &--disabled
      color #2b616d
      transition color .25s
      pointer-events none
  &__check-icon-container
    padding 0 5px
  &__check-icon
    width 26px
    height 26px
    background-color #fa8d62
    transition background-color .15s
    transform rotate(45deg)
    clip-path polygon(85% 0, 100% 0, 100% 100%, 43% 100%, 43% 85%, 85% 85%)
    position relative
    bottom 6px
    right 1px
    margin auto
    
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
