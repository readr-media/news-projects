<template>
  <div
    v-show="isPlayed"
    :class="{ transitioning }"
    class="slot-machine-result"
  >
    <p
      class="result__text"
      v-text="textColumn1"
    />
    <p
      class="result__text"
      v-text="textColumn2"
    />
    <p
      class="result__text"
      v-text="textColumn3"
    />
    <div class="result__info">
      <template v-if="isExist">
        <h3 v-html="$t('COVID19_D.GAME_RESULT_EXIST_HEADING')" />
        <p>{{ $t('COVID19_D.GAME_RESULT_EXIST_TEXT_1') }}<a
          :href="SLOT_MACHINE_RESULTS_EXIST_LINk[result]"
          target="_blank"
          rel="noopener noreferrer"
          @click="sendGAEvent('點我看查核報告')"
          v-text="$t('COVID19_D.GAME_RESULT_EXIST_LINK')" />{{ $t('COVID19_D.GAME_RESULT_EXIST_TEXT_2') }}</p>
      </template>
      <template v-else>
        <p v-text="$t('COVID19_D.GAME_RESULT_NOT_EXIST_TEXT')" />
        <h3 v-html="$t('COVID19_D.GAME_RESULT_NOT_EXIST_HEADING')" />
      </template>
      <a
        :href="`https://www.facebook.com/share.php?u=https://www.readr.tw/project/covid19-disinformation`"
        class="result__share"
        target="_blank"
        rel="noopener noreferrer"
        @click="sendGAEvent('分享我製造的假訊息')"
        v-html="$t('COVID19_D.GAME_RESULT_SHARE')"
      />
    </div>
  </div>
</template>

<script>

import {
  SLOT_MACHINE_COLUMN_1_TW,
  SLOT_MACHINE_COLUMN_2_TW,
  SLOT_MACHINE_COLUMN_3_TW,
  SLOT_MACHINE_RESULTS_EXIST_LINk
} from '../const.js'

export default {
  name: 'SlotMachineResult',
  props: {
    column1: {
      type: Number,
      default: undefined
    },
    column2: {
      type: Number,
      default: undefined
    },
    column3: {
      type: Number,
      default: undefined
    },
    isExist: {
      type: Boolean,
      default: false
    },
    isPlayed: {
      type: Boolean,
      default: false
    },
    result: {
      type: String,
      default: undefined
    },
    transitioning: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      SLOT_MACHINE_RESULTS_EXIST_LINk
    }
  },
  computed: {
    textColumn1 () {
      return SLOT_MACHINE_COLUMN_1_TW[this.column1]
    },
    textColumn2 () {
      return SLOT_MACHINE_COLUMN_2_TW[this.column2]
    },
    textColumn3 () {
      return SLOT_MACHINE_COLUMN_3_TW[this.column3]
    }
  },
  methods: {
    sendGAEvent (label) {
      window.ga && window.ga('send', 'event', 'projects', 'click', label)
    }
  }
}
</script>

<style lang="stylus" scoped>
.slot-machine-result
  padding 57px 0
  color #ffffff
  text-align center
  @media (min-width: 1024px)
    padding 0
  &.transitioning
    .result__text, .result__info
      visibility hidden
  h3, p
    margin 0
  .result__text
    font-size 20px
    font-weight 500
    line-height 1.4
    @media (min-width: 1024px)
      display none
    & + .result__text
      margin-top 0
  .result__info
    width 300px
    margin 50px auto 0
    padding 25px
    border-radius 18px
    border 2px solid #11e511
    @media (min-width: 1024px)
      width 660px
      margin 0 auto
      padding 0
      border none
    h3
      color #11e511
      font-size 30px
      font-weight 500
      line-height 1.33
      & + p
        margin-top 10px
      & + .result__share
        margin-top 80px
        @media (min-width: 1024px)
          margin-top 10px
      >>> br
        @media (min-width: 1024px)
          display none
    p
      font-size 20px
      line-height 1.5
      & + .result__share
        margin-top 20px
        @media (min-width: 1024px)
          margin-top 10px
    a
      color #fff
      font-size 20px
      font-weight normal
      line-height 1.5
      text-decoration underline
    .result__share
      display block
      margin 0 auto
      padding 15px 50px
      color #4a4a4a
      font-size 20px
      line-height normal
      text-decoration none
      background-color #11e511
      border-radius 9px
      border none
      @media (min-width: 1024px)
        width 320px
        padding 5px 0
        >>> br
          display none
</style>
