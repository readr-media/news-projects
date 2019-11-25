<template>
  <div 
    :class="[ getClassName(data), { first: index === 0, second: index === 1, third: index === 2 } ]"
    class="statistics-data"
  >
    <div class="info">
      <div class="info__data">
        <h2 v-text="get(data, 'candidate')" />
        <p class="amount">錯誤訊息數<span v-text="get(data, 'amount.wrong')|| 0"></span></p>
        <div class="detailed">
          <p>談話內容拆成 {{ get(data, 'amount.total')|| 0 }} 則，其中：</p>
          <ul>
            <li>・含有可查證內容 {{ get(data, 'amount.verifiable')|| 0 }} 則</li>
            <li>・不屬於查證範圍 {{ get(data, 'amount.unverification')|| 0 }} 則</li>
            <li>・一般敘述性文字或個人意見 {{ get(data, 'amount.normal')|| 0 }} 則</li>
          </ul>
        </div>
        <p class="verified">目前已查核 {{ get(data, 'amount.verified') }}/{{ get(data, 'amount.verifiable') }} 則</p>
      </div>
      <div class="info__photo">
        <div class="info__photo-image" />
        <div class="info__photo-circle" />
      </div>
    </div>
    <div class="percentage">
      <div class="bar">
        <div
          v-if="percentage.real > 0"
          :style="{ width: `${percentage.real}%` || '0%' }"
          class="real"
          v-text="`${percentage.real}%`"
        />
        <div
          v-if="percentage.controversial > 0"
          :style="{ width: `${percentage.controversial}%` || '0%' }"
          class="controversial"
          v-text="`${percentage.controversial}%`"
        />
        <div
          v-if="percentage.wrong > 0"
          :style="{ width: `${percentage.wrong}%` || '0%' }"
          class="wrong"
          v-text="`${percentage.wrong}%`"
        />
      </div>
      <div class="legend">
        <div v-if="percentage.real > 0" class="real">正確</div>
        <div v-if="percentage.controversial > 0" class="controversial">片面事實</div>
        <div v-if="percentage.wrong > 0" class="wrong">含有錯誤訊息</div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash'

export default {
  name: 'DisinformationStatistics',
  props: {
    data: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    percentage () {
      return {
        real: Math.round(get(this.data, 'percentage.real') * 100),
        controversial: Math.round(get(this.data, 'percentage.controversial') * 100),
        wrong: Math.round(get(this.data, 'percentage.wrong') * 100)
      }
    }
  },
  methods: {
    get,
    getClassName (data) {
      if (data.candidate === '蔡英文') {
        return 'tsai'
      } else if (data.candidate === '韓國瑜') {
        return 'han' 
      }
      return 
    }
  }
}
</script>
<style lang="stylus" scoped>
.statistics-data
  .info
    position relative
    display flex
    padding .5em
    border-radius 8px
    &::before
      content ''
      position absolute
      bottom 0
      left 0
      width 100%
    > *
      flex 1
    &__data
      > *
        text-align left
        & + *
          margin-top .5em
      h2
        margin .3em 0 .5em
      .amount
        display flex
        font-weight 600
        line-height 1.625rem
        span
          margin-left .4em
          font-size 1.625rem
      .detailed
        display none
      .verified
        font-size .875rem
    &__photo
      position relative
      height 110px
    &__photo-image
      position absolute
      left 50px
      bottom 0
      z-index 1
      width 100px
      height 100%
      background-size contain
      background-repeat no-repeat
      background-position 50% 100%
    &__photo-circle
      position absolute
      left 0
      bottom 0
      width 100px
      height 100px
      background-color transparent
      border 6px #fff solid
      border-radius 100px
  
  .percentage
    margin-top .5em
    .bar
      display flex
      height 15px
      font-size .75rem
      > div
        display flex
        justify-content center
        align-items center
      .real
        width 33%
        background-color #4a4a4a
      .controversial
        width 33%
        background-color #9b9b9b
      .wrong
        width 34%
        background-color #fff
    .legend
      display flex
      justify-content flex-end
      margin-top .5em
      font-size .8125rem
      > div
        display flex
        align-items center
        &::before
          content ''
          display inline-block
          width 12px
          height 12px
          margin-right .3em
        &.real
          &::before
            background-color #4a4a4a
        &.controversial
          &::before
            background-color #9b9b9b
        &.wrong
          &::before
            background-color #fff
        & + div
          margin-left 1em
  &.tsai
    .info
      &::before
        background-color rgba(102, 205, 165, .15)
    .info__photo-circle
      border-color #66cda5
    .info__photo-image
      background-image url(/proj-assets/fact-check/tsai.png)
    .bar
      .wrong
        background-color #66cda5 !important
    .legend
      .wrong
        &::before
          background-color #66cda5 !important
  &.han
    .info
      &::before
        background-color rgba(47, 132, 201, .15)
    .info__photo-circle
      border-color #2f84c9
    .info__photo-image
      background-image url(/proj-assets/fact-check/han.png)
    .bar
      .wrong
        background-color #2f84c9 !important
    .legend
      .wrong
        &::before
          background-color #2f84c9 !important
  &.first
    .info
      &::before
        height 100%
  &.second
    .info
      &::before
        height 66%
  &.third
    .info
      &::before
        height 33%

@media (min-width: 1024px)
  .statistics-data
    position relative
    padding 20px
    border-radius 8px
    &::before
      content ''
      position absolute
      bottom 0
      left 0
      width 100%
    .info
      position relative
      padding 0
      &::before
        content none
      &__data
        position relative
        z-index 1
        .amount
          flex-wrap wrap
          span
            width 100%
            margin .2em 0 0
        .detailed
          display block
          margin-top 130px
          ul
            margin .5em 0 0
            padding 0
            list-style-type none
            li
              & + li
                margin-top .5em
        .verified
          margin-top 1em
          font-size 1rem
      &__photo
        position absolute
        top 25px
        left 0
        width 100%
        height 200px
      &__photo-image
        left auto
        right 10px
        width 170px
        height 170px
      &__photo-circle
        left 50px
        top 0
        bottom auto
        width 180px
        height 180px
        border-width 8px
        border-radius 220px
    
    .percentage
      margin-top 1em
      .legend
        margin-top 1em
    &.tsai
      &::before
        background-color rgba(102, 205, 165, .15)
    &.han
      &::before
        background-color rgba(47, 132, 201, .15)
    &.first
      &::before
        height 100%
    &.second
      &::before
        height 66%
    &.third
      &::before
        height 33%
</style>