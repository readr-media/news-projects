<template>
  <div class="explanation">
    <div class="string" :class="{ 'white-back': get(data, 'isExplanation', false), }" v-html="$t(`RENT.EXPLANATION.${data.id}`)" v-if="data.type === PROGRAM_TYPE.STRING"></div>
    <div class="graph" v-else-if="data.type === PROGRAM_TYPE.GRAPH">
      <div class="primary" v-html="$t(`RENT.EXPLANATION.${data.id}`)"></div>
      <div class="subinfo">
        <div class="item" v-for="(info, index) in data.subinfo">
          <div class="city"><span v-text="$t(`RENT.${info.city}_SHORT`)"></span></div>
          <div class="info"><span v-text="info.feature"></span></div>
          <div class="stamp" :class="get(data, `stamp.${index}.type`)" v-if="get(data, `stamp.${index}`)">
            <span v-text="$t(`RENT.${get(data, `stamp.${index}.name`)}`)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { PROGRAM_TYPE, } from 'src/components/Rent/constants'
  import { get, } from 'lodash'
  export default {
    name: 'MainContentAsideExplanation',
    data () {
      return {
        PROGRAM_TYPE,
      }
    },
    methods: {
      get,
    },
    mounted () {},
    props: {
      data: {
        type: Object,
        default: {},
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .explanation
    > div
      & >>> p
        margin 0
      & >>> p + p
        margin-top 40px    
    .string
      margin-top 65px
      padding 31px 20px
      background-color #eee
      border-radius 2px
      font-size 1rem
      font-weight 100
      line-height normal
      color #313131
      text-align justify
      &.white-back
        background-color #fff
        padding 31px 0
        margin-top 0
    & + &
      .graph
        margin-top 200px
    .graph
      margin-top 50px
      .primary
        background-color #e97d8f
        font-size 1.125rem
        font-weight 400
        line-height normal
        color #fff
        padding 23px 26px
        & >>> p
          text-align center
        & >>> strong
          font-size 2.875rem
          margin 0 5px
      .subinfo
        display flex
        justify-content space-between
        align-items center
        margin-top 16px
        .item
          color #e97d8f
          font-weight 400
          position relative
          > div
            text-align center
          > div + div
            margin 11px 0
          .city
            font-size 1.25rem
          .info
            font-size 1rem
          .stamp
            border 1px solid #dfe166
            border-radius 2px
            color #dfe166
            width 42px
            height 50px
            display flex
            justify-content center
            align-items center
            &.black
              background-color #dfe166
              color #fff
  @media screen and (min-width: 0px) and (max-width: 767px)
    .explanation
      & + &
        .graph
          margin-top 50px 
      .string
        &.white-back
          padding 25px
      .graph
        .primary
          padding 23px
          font-size 1.25rem
          & >>> strong
            font-size 2.875rem
            margin 0 5px   
        .subinfo
          padding 0 10px
</style>