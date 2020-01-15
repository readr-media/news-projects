<template>
  <div :class="bgColor" class="lw-message">
    <p class="content" v-html="content"></p>
    <div class="lw-message__footer">
      <button
        class="like"
        @click="addLike(message[2])"
      >
        <img src="/proj-assets/hong-kong-protests-2019/like.png">
      </button>
      <p
        v-if="likeAmount > 0"
        class="like-amount"
        v-text="likeAmount"
      />
      <p class="info">
        <span
          v-if="message[1]"
          class="info__nickname"
          v-text="message[1]"
        />
        <span
          v-if="Number(message[2])"
          v-text="moment(Number(message[2])).format('YYYY/M/D')"
        />
      </p>
    </div>
  </div>
</template>
<script>

import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapState } = createNamespacedHelpers('HongKongProtests')
const COLORS = [ 'default', 'red', 'yellow', 'green', 'blue' ]

export default {
  name: 'LennonWallMessage',
  props: {
    message: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      bgColor: 'default',
      clicked: false,
      loading: false
    }
  },
  computed: {
    ...mapState({
      likes: state => state.spreadsheet.likes
    }),
    likeAmount () {
      const item = this.likes.find(item => item.time === this.message[2])
      return (item ? item.likeAmount : 0) || 0
    },
    content () {
      return this.message[0].replace(/\r?\n\r?\n/g, '\n').replace(/\r?\n/g, '<br>')
    }
  },
  beforeMount () {
    this.bgColor = this.getBgColor()
  },
  methods: {
    ...mapActions([
      'ADD_LIKE',
      'FETCH_SHEET'
    ]),
    addLike (timestamp) {
      if (!this.clicked && !this.loading) {
        this.loading = true
        this.ADD_LIKE({ timestamp })
          .then(() => {
            this.clicked = true
            this.loading = false
            this.FETCH_SHEET({ stateName: 'likes', range: '留言讚總數!A:B' })
          })
          .catch(err => {
            this.loading = false
            console.error('Error: ', err)
          })
      }
      window.ga('send', 'event', 'projects', 'click', 'like', { nonInteraction: false })
    },
    getBgColor () {
      const random = Math.floor(Math.random() * 5)
      return COLORS[random] || 'default'
    },
    moment
  }
}
</script>
<style lang="stylus" scoped>
.lw-message
  p
    margin 0
    font-size .9375rem
  button
    padding 0
    font-size 0
    background-color transparent
    border none
    cursor pointer
  &.red
    background-color #ffe3e6 !important
  &.yellow
    background-color #fffcd4 !important
  &.green
    background-color #efffde !important
  &.blue
    background-color #cde4ff !important
  &__footer
    display flex
    align-items center
    margin-top 10px
    p
      color #4a4a4a
  .content
    text-align justify
    line-height 1.7
  .like
    width 25px
    height 25px
    padding 5px
    img
      width 100%
      height 100%
    &-amount
      margin-left 5px
  .info
    display flex
    max-width 230px
    margin 0 0 0 auto
    span
      & + span
        margin-left 1em
    &__nickname
      display -webkit-box
      -webkit-line-clamp 1
      overflow hidden
      -webkit-box-orient vertical
</style>
