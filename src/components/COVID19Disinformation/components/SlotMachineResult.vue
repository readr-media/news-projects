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

        <p v-if="locale === 'tw'">
          它曾被{{ resultContent.area.tw }}的事實查核組織{{ resultContent.organization.tw }}查核為假訊息，<a
            :href="resultContent.href"
            target="_blank"
            rel="noopener noreferrer"
            @click="sendGAEvent('點我看查核報告')"
          >點我看查核報告</a>。
        </p>
        <p v-else>
          It is confirmed to be disinformation by {{ resultContent.area.en }} fact-checking organization {{ resultContent.organization.en || resultContent.organization.tw }}.
          <a
            :href="resultContent.href"
            target="_blank"
            rel="noopener noreferrer"
            @click="sendGAEvent('點我看查核報告')"
          >Click here to read the fact-checking report</a>.
        </p>
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
  SLOT_MACHINE_COLUMN_1_EN,
  SLOT_MACHINE_COLUMN_2_TW,
  SLOT_MACHINE_COLUMN_2_EN,
  SLOT_MACHINE_COLUMN_3_TW,
  SLOT_MACHINE_COLUMN_3_EN,
  SLOT_MACHINE_RESULTS_EXIST_CONTENT
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
    },
    locale: {
      type: String,
      default: 'tw'
    }
  },
  // data () {
  //   return {
  //     SLOT_MACHINE_RESULTS_EXIST_CONTENT
  //   }
  // },
  computed: {
    textColumn1 () {
      return this.$route.params.params === 'en'
        ? SLOT_MACHINE_COLUMN_1_EN[this.column1]
        : SLOT_MACHINE_COLUMN_1_TW[this.column1]
    },
    textColumn2 () {
      return this.$route.params.params === 'en'
        ? SLOT_MACHINE_COLUMN_2_EN[this.column2]
        : SLOT_MACHINE_COLUMN_2_TW[this.column2]
    },
    textColumn3 () {
      return this.$route.params.params === 'en'
        ? SLOT_MACHINE_COLUMN_3_EN[this.column3]
        : SLOT_MACHINE_COLUMN_3_TW[this.column3]
    },
    resultContent () {
      return SLOT_MACHINE_RESULTS_EXIST_CONTENT[this.result]
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
