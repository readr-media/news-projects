<template>
  <div :class="{ typed: onKeyPress, success: status === 'success', format: errors === 'format' }" class="subscribe">
    <p><strong>免費訂閱 讀＋ 專題報</strong></p>
    <p>留下你的 E-mail，第一手獲得專題精彩內容！</p>
    <div>
      <input type="email" v-model="email" placeholder="請輸入 E-mail" @keypress="onKeyPress = true">
      <button @click="submit">{{ status === 'success' ? '成功' : '送出' }}</button>
      <p v-if="errors">{{ errorInfo[errors] || '' }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { MAILCHIMP_API_KEY } from '../../../../api/config'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const MAILCHIMP_URL = 'https://us20.api.mailchimp.com/3.0/lists/95d9bf4ca7/members/'

export default {
  name: 'FakeNewsSubscribe',
  data () {
    return {
      email: '',
      errors: '',
      errorInfo: {
        format: '請輸入正確的 E-mail',
        mailchimp: '系統異常，請稍後再試'
      },
      onKeyPress: false,
      status: ''
    }
  },
  watch: {
    email () {
      this.errors = '',
      this.status = ''
    }
  },
  methods: {
    submit () {
      this.status = 'waiting'
      if (!this.errors && this.email.match(EMAIL_REGEX)) {
        const data = {
          email_address: this.email,
          status: 'subscribed'
        }
        axios({
          method: 'post',
          url: MAILCHIMP_URL,
          data: data,
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: 'readr',
            password: MAILCHIMP_API_KEY
          }
        })
        .then(res => {
          this.status = 'success'
        })
        .catch(err => {
          this.errors = 'mailchimp'
        })
      } else {
        this.errors = 'format'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.subscribe
  padding 0 1em
  > div
    display flex
    flex-wrap wrap
    > p
      width 100%
      color #FF0000
  p
    color #616770
    font-size .875rem
    strong
      color #4a4a4a
    & + *
      margin-top .5em
  input
    width calc(100% - 80px)
    height 45px
    padding-left .5em
    line-height 45px
    font-size .875rem
    border 1px solid #ccd0d5
    border-right none
    border-radius 4px 0 0 4px
  button
    width 80px
    height 45px
    color #ccd0d5
    font-size .875rem
    background-color #fff
    border 1px solid #ccd0d5
    border-radius 0 4px 4px 0
    transition color 0.5s, background-color 0.5s
  &.typed
    button
      color #fff
      background-color #4868a5
  &.format
    input
      background-color rgba(255, 0, 0, .2)

@media (min-width: 1024px)
  .subscribe
    padding 0
    p
      font-size .8125rem
      strong
        font-size .9375rem
    input
      width calc(100% - 50px)
      height 30px
      font-size .8125rem
      line-height 30px
    button
      width 50px
      height 30px
      font-size .8125rem
</style>
