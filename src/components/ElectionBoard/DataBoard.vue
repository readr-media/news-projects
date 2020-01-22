<template>
  <div class="data-board">
    <template v-if="board">
      <div class="data-board__image">
        <img :src="`https://www.readr.tw${board.image}`" alt="">
      </div>
      <div class="data-board__info">
        <div class="content">
          <h3 v-text="address"></h3>
          <p>看板 ID：{{ board.id }}</p>
          <ul>
            <li>此資料已被驗證 {{ board.verified_amount }} 次</li>
            <template>
              <li v-if="board.price !== null" class="content__price">候選人共花了 <strong>{{ board.price || 0 | currency }}</strong> 元購買此塊看板 <span v-if="board.note && board.note !== 'string'" v-text="board.note"></span></li>
              <li v-else>此廣告還未有價位資料</li>
            </template>
            <template>
              <li v-if="board.receipt !== null && board.receipt.length > 0" class="has-receipt" @click="showReceiptBox(board.id)">候選人自主上傳的廣告購買資料<br><span>點我看購買資料</span></li>
              <li v-else>此廣告還未有價位資料</li>
            </template>
          </ul>
          <a v-if="!board.has_price_info && !board.has_receipt_info" :href="`https://docs.google.com/forms/d/e/${isProd ? PROD_GOOGLE_FORM : DEV_GOOGLE_FORM}/viewform?entry.1354888527=${board.id}`"
            target="_blank">我是候選人團隊！我要補充收據及價位資料</a>
        </div>
        <div class="action" :class="{ coordinate: mode === 'coordinate' }">
          <button class="btn btn--back" @click="$emit('closeDataBoard')"><img src="/proj-assets/election-board/images/arrow.png"></button>
          <button v-if="mode !== 'coordinate'" class="btn btn--upload" @click="coordinates = board.coordinates">同一地點其它看板</button>
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
    board: {},
    mode: {}
  },
  data () {
    return {
      DEV_GOOGLE_FORM,
      PROD_GOOGLE_FORM,
      boardByCoordinate: undefined,
      coordinates: undefined,
      showDataBoard: false,
      showReceipt: false,
      isProd: false,
      electionYear: 2020
    }
  },
  watch: {
    coordinates () {
      window.ga('send', 'event', 'projects', 'click', `go board list by coordinates from board ${this.board.id}`)
    }
  },
  computed: {
    address () {
      return `${this.board.county.length < 3 ? `${this.board.county}市` : this.board.county}${this.board.district.length < 3 ? `${this.board.district}區` : this.board.district}${this.board.road}`
    },
    candidatesName () {
      return this.board.candidates.map((cand) => cand.name).filter((name) => name).join('、')
    }
  },
  beforeMount () {
    if (currEnv() === 'prod') {
      this.isProd = true
    }
    this.electionYear = (this.$route.params.params.includes('2018') ? 2018 : 2020)
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
      window.ga('send', 'event', 'projects', 'click', `go correction from board ${id}`)
    },
    openDataBoard (board) {
      this.boardByCoordinate = board
      this.showDataBoard = true
    },
    showReceiptBox (id) {
      this.showReceipt = true
      window.ga('send', 'event', 'projects', 'click', `go receipt from board ${id}`)
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
    position relative
    height 100%
    > img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      object-fit contain
      object-position bottom center
  &__info
    padding 25px 25px 30px 25px
  .content
    color #fff
    ul
      margin-top 15px
      margin-bottom 15px
      padding-left 25px
      line-height 1.4
      li
        color #a0a0a0
        strong
          color #4897db
        span
          display inline-block
          padding 2px 8px
          color #000
          font-size 0.875rem
          background-color #4897db
          border-radius 2px
          margin-top 4px
        &.content__price
          > span
            padding 0
            color #4897db
            font-size 0.875rem
            background-color transparent
            border-radius 0
            margin-bottom 4px
        &.has-receipt
          cursor pointer
    > h3
      font-size 1rem
      font-weight 300
    > p
      color #4897db
      font-size .875rem
      line-height 1.64
    > a
      display inline-block
      padding-left 25px
      color theme-color
      font-size .875rem
      cursor pointer
      line-height 1.4
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
      height 48px
      line-height 48px
      font-size 1.25rem
      font-weight 700
      border none
      border-radius 2px
      cursor pointer
      padding 0
      @media (min-width 768px)
        border-radius 6px
      &--back
        width 56px
        background-color #a0a0a0
        display flex
        justify-content center
        align-items center
        @media (min-width 768px)
          width 95px
        > img 
          width 34px
          height auto
      &--upload
        flex 1
        margin-left 14px
        background-color theme-color
        @media (min-width 768px)
          margin-left 20px
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
    padding 60px 25px 30px 25px
    background-color #000
    overflow-y auto
    h3
      color #fff
      font-size 1.25rem
      font-weight 700
    &__btn
      padding 0
      width 100%
      height 48px
      line-height 48px
      margin-top 30px
      background-color #a0a0a0
      border none
      border-radius 2px
      cursor pointer
      font-size 1.25rem
      font-weight 700
      @media (min-width 768px)
        border-radius 6px
      
    .receipt-container
      flex 1
      margin-top 25px
      overflow-y auto
      > img
        width 100%
        object-fit contain
        object-position center center
        vertical-align top
        & + img
          margin-top 20px
@media (min-width: 768px)
  .data-board
    justify-content center
    padding 0 calc((100% - 450px) / 2)
    &__info
      padding 35px 0 0 0
    .content
      h3
        font-size 1.25rem
        line-height 1.4
    .action
      margin-top 30px
      margin-bottom 45px
    .receipt
      padding 50px calc((100% - 450px) / 2)
</style>
