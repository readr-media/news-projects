<template>
  <section class="message-board">
    <div class="message-board-container">
      <h1>我要留言</h1>
      <form @submit.prevent="addMessage">
        <p>留言內容</p>
        <div class="message-board__textarea">
          <textarea
            v-model.trim="content"
            placeholder="有什麼話都儘管說！（限制 200 字）"
          />
          <p class="message-board__remaining">剩餘字數 {{ remainingWords }} 字</p>
        </div>
        <p>暱稱</p>
        <input v-model="nickname" placeholder="怎麼稱呼您呢？（限制 20 字）">
        <div>
          <p
            v-if="showErrorMsg"
            class="error">
            請輸入留言內容
          </p>
          <button @click.prevent="addMessage">我要留言</button>
          <button @click.prevent="close">取消</button>
        </div>
      </form>
    </div>
  </section>
</template>
<script>

import { truncate } from 'lodash'

const addMessage = (store, message) => store.dispatch('HongKongProtests/ADD_MESSAGE', { resource: message })

export default {
  name: 'MessageBoard',
  data () {
    return {
      content: '',
      loading: false,
      nickname: '',
      remainingWords: 200,
      showErrorMsg: false,
    }
  },
  watch: {
    content (value) {
      if (value.length > 200) {
        this.content = truncate(value, { length: 200, omission: '' })
        this.remainingWords = 0
      }
      this.remainingWords = 200 - value.length
    },
    nickname (value) {
      if (value.length > 20) {
        this.nickname = truncate(value, { length: 20, omission: '' })
      }
    }
  },
  methods: {
    addMessage () {
      window.ga('send', 'event', 'projects', 'click', 'summit comment', { nonInteraction: false })

      this.showErrorMsg = false
      if (!this.content) {
        this.showErrorMsg =true
      }

      if (!this.loading && !this.showErrorMsg) {
        this.loading = true
        addMessage(this.$store, {
          majorDimension: 'ROWS',
          values: [
            [ this.content, this.nickname, 0, Number(Date.now()) ]
          ]
        })
          .then(res => this.close())
          .catch(err => {
            console.error(err)
          })
      }
    },
    close () {
      this.content = ''
      this.loading = false
      this.nickname = ''
      this.remainingWords = 200
      this.$emit('closeMessageBoard')
    }
  }
}
</script>
<style lang="stylus" scoped>
.message-board
  padding-top 60px
  background-color rgba(0,0,0,.75)
  color #fff
  h1, p
    margin-top 0
    margin-bottom 0
  h1
    font-size 1.125rem
    font-weight 600
  p, form
    font-size .9375rem
  form
    flex 1
    display flex
    flex-direction column
    > div, p, input
      & + *
        margin-top .5em
    button
      margin-top 30px
      & + button
        margin-top 1em
  button
    width 100%
    height 40px
    color #fff
    background-color transparent
    border 2px solid #fff
    border-radius 20px
    cursor pointer
  input, textarea
    width 100%
    border none
    border-radius 2px
  textarea
    height 100%
    padding .5em
    resize none
  input
    height 40px
    padding 0 .5em
    line-height 40px

  &-container
    display flex
    flex-direction column
    position absolute
    top 60px
    left 0
    right 0
    bottom 0
    padding 10px 0 30px
    background-color #000
    transform translateX(100%)
    transition transform .5s .2s
    > *
      width 95%
      margin 0 auto
  &__textarea
    flex 1
    position relative
  &__remaining
    position absolute
    right 7.5px
    bottom 7.5px
    color #9b9b9b
    font-size .875rem !important
  &.open
    .message-board-container
      transform translateX(0)
  .error
    margin-top .5em
    color #f96161
    font-size .875rem
    text-align center
@media (max-width: 767px)
  .message-board
    h1
      & + *
        margin-top 1em
@media (min-width: 768px)
  .message-board
    h1
      display none
    p
      font-size 1.25rem
    form
      > div, p, input
        & + *
          margin-top 1em
      button
        display inline-block
        width calc(50% - 20px)
        & + button
          margin 0 0 0 20px
    &-container
      width 480px
      margin 0 0 0 auto
    
</style>
