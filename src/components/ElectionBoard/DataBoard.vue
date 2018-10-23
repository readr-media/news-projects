<template>
  <div class="data-board">
    <template v-if="board">
      <div class="data-board__image">
        <img :src="`https://www.readr.tw${board.image}`" alt="">
        <div class="data-board__correction" @click="$router.push(`/project/election-board/verify?board=${board.id}`)">這不是{{ mode === 'coordinate' ? '看板' : $route.query.candidate }}，我要校正</div>
      </div>
      <div class="data-board__info">
        <div class="content">
          <h3 v-text="address"></h3>
          <p>看板 ID：{{ board.id }}</p>
          <ul>
            <li>此資料已被驗證 {{ board.verified_amount }} 次</li>
            <template>
              <li v-if="board.price !== null">候選人共花了 <strong>{{ board.price || 0 | currency }}</strong> 元購買此塊看板</li>
              <li v-else>此廣告還未有價位資料</li>
            </template>
            <template>
              <li v-if="board.receipt !== null && board.receipt.length > 0" class="has-receipt" @click="showReceiptBox(board.id)">候選人自主上傳的廣告購買資料<br><span>點我看</span></li>
              <li v-else>此廣告還未有價位資料</li>
            </template>
          </ul>
          <a v-if="!board.has_price_info && !board.has_receipt_info" :href="`https://docs.google.com/forms/d/e/${isProd ? PROD_GOOGLE_FORM : DEV_GOOGLE_FORM}/viewform?entry.1354888527=${board.id}`"
            target="_blank">我是候選人團隊！我要補充收據及價位資料</a>
        </div>
        <div class="action" :class="{ coordinate: mode === 'coordinate' }">
          <button class="btn btn--back" @click="$emit('closeDataBoard')"><img src="/proj-assets/election-board/images/arrow.png"></button>
          <button v-if="mode !== 'coordinate'" class="btn btn--upload" @click="coordinates = board.coordinates">同一地點其他看板</button>
        </div>
      </div>
    </template>
    <DataBoardsByCoordinate v-if="coordinates" :address="address" :boardID="board.id" :coordinates="coordinates" @close="coordinates = undefined" @openDataBoard="openDataBoard">
      <DataBoard v-show="showDataBoard && boardByCoordinate" :mode="'coordinate'" :board="boardByCoordinate" @closeDataBoard="closeDataBoard"></DataBoard>
    </DataBoardsByCoordinate>
    <div v-if="board && board.receipt !== null && board.receipt.length > 0" v-show="showReceipt" class="receipt">
      <h3>購買資料照片</h3>
      <div class="receipt-container">
        <img v-for="(item, index) in board.receipt" :key="`receipt-${index}`" :src="`http://drive.google.com/uc?export=view&id=${getReceiptID(item)}`" alt="">
      </div>
      <button class="receipt__btn" @click="showReceipt = false">離開</button>
    </div>
  </div>
</template>
<script>

import DataBoardsByCoordinate from './DataBoardsByCoordinate.vue'
import { currEnv } from '../../util/comm'

const DEV_GOOGLE_FORM = '1FAIpQLSf7-7U24k-c-Femdmi5QmxSFSEbVAG0uxi_2kLb2eKSG8LK3w'
const PROD_GOOGLE_FORM = '1FAIpQLSdhTycTivVox4INDaRXCZ1BIJJ_pgyNZbzZfApnEYuIVaph8g'

export default {
  name: 'DataBoard',
  components: {
    DataBoardsByCoordinate
  },
  filters: {
    currency (value) {
      return value.toLocaleString('en-US')
    }
  },
  props: {
    board: {
    },
    mode: {
    }
  },
  data () {
    return {
      DEV_GOOGLE_FORM,
      PROD_GOOGLE_FORM,
      boardByCoordinate: undefined,
      coordinates: undefined,
      showDataBoard: false,
      showReceipt: false,
      isProd: false
    }
  },
  watch: {
    coordinates () {
      window.ga('send', 'event', 'projects', 'click', `go board list by coordinates from board ${this.board.id}`, { nonInteraction: false })
    }
  },
  computed: {
    address () {
      return `${this.board.county.length < 3 ? `${this.board.county}市` : this.board.county}${this.board.district.length < 3 ? `${this.board.district}區` : this.board.district}${this.board.road}`
    }
  },
  beforeMount () {
    if (currEnv() === 'prod') {
      this.isProd = true
    }
  },
  methods: {
    closeDataBoard () {
      this.boardByCoordinate = undefined
      this.showDataBoard = false
    },
    getReceiptID (url) {
      return url.split('?id=')[1]
    },
    goCorrection (id) {
      this.$router.push(`/project/election-board/verify?board=${id}`)
      window.ga('send', 'event', 'projects', 'click', `go correction from board ${id}`, { nonInteraction: false })
    },
    openDataBoard (board) {
      this.boardByCoordinate = board
      this.showDataBoard = true
    },
    showReceiptBox (id) {
      this.showReceipt = true
      window.ga('send', 'event', 'projects', 'click', `go receipt from board ${id}`, { nonInteraction: false })
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #4897db

.data-board
  display flex
  flex-direction column
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 20
  width 100%
  background-color #000
  &__image
    flex 1
    position relative
    > img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      object-fit contain
      object-position center center
  &__correction
    position absolute
    left 0
    bottom 0
    width 100%
    color theme-color
    text-align center
    font-size .875rem
    line-height 30px
    background-color rgba(0,0,0,.5)
    cursor pointer
  &__info
    padding 25px
  .content
    color #fff
    ul
      margin-top 20px
      padding-left 1.5em
      li
        color #a0a0a0
        font-weight 300
        strong
          color #4897db
        span
          display inline-block
          padding 0 .3em
          color #000
          font-size 0.875rem
          background-color #4897db
          border-radius 2px
        &.has-receipt
          cursor pointer
    > h3
      font-size 1rem
      font-weight 300
    > p
      color #4897db
      font-size .875rem
    > a
      display inline-block
      padding-left 1.5em
      color theme-color
      font-size .875rem
      cursor pointer
      > span
        border-bottom 1px solid theme-color
  .action
    display flex
    justify-content space-between
    margin-top 20px
    &.coordinate
      .btn--back
        width 100%
    .btn
      height 50px
      font-size 1.25rem
      font-weight 700
      border none
      border-radius 2px
      cursor pointer
      &--back
        width 55px
        padding 11px
        background-color #a0a0a0
        > img 
          width 34px
      &--upload
        flex 1
        margin-left 15px
        background-color theme-color
  .receipt
    display flex
    flex-direction column
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    height 100%
    padding 25px
    background-color #000
    overflow-y auto
    h3
      color #fff
      font-size 1.25rem
      font-weight 500
    &__btn
      // position absolute
      // left 25px
      // bottom 20px
      width 100%
      height 50px
      margin-top 20px
      background-color #a0a0a0
      border none
      border-radius 2px
      cursor pointer
      
    .receipt-container
      flex 1
      margin-top 20px
      overflow-y auto
      > img
        width 100%
        object-fit contain
        object-position center center
        & + img
          margin-top 20px
@media (min-width: 768px)
  .data-board
    justify-content center
    padding 0 calc((100% - 450px) / 2)
    &__image
      flex none
      width 450px
      padding-top 56.25%
      > img
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        width 100%
        height 100%
        object-fit contain
    &__info
      padding 0
      margin-top 35px
    .content
      h3
        font-size 1.25rem
    .action
      margin-top 30px
    .receipt
      padding 50px calc((100% - 450px) / 2)
</style>
