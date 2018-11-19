<template>
  <div class="what-experts-say">
    <div class="what-experts-say__title"><h2><span v-text="$t('REFERENDUM.WHAT_EXPERTS_SAY.TITLE')"></span></h2></div>
    <div class="what-experts-say__brief first"><span v-text="$t('REFERENDUM.WHAT_EXPERTS_SAY.BRIEF.0')"></span></div>
    <div class="what-experts-say__chart">
      <div class="item header">
        <div class="name"></div>
        <div class="before"><span v-text="$t('REFERENDUM.WHAT_EXPERTS_SAY.BEFORE')"></span></div>
        <div class="after"><span v-text="$t('REFERENDUM.WHAT_EXPERTS_SAY.AFTER')"></span></div>
      </div>
      <template v-for="n in 7">
        <div class="item">
          <div class="name"><span v-text="$t(`REFERENDUM.WHAT_EXPERTS_SAY.LAW_COMPARING.${n - 1}.NAME`)"></span></div>
          <div class="before"><span v-text="$t(`REFERENDUM.WHAT_EXPERTS_SAY.LAW_COMPARING.${n - 1}.BEFORE`)"></span></div>
          <div class="after"><span v-text="$t(`REFERENDUM.WHAT_EXPERTS_SAY.LAW_COMPARING.${n - 1}.AFTER`)"></span></div>
        </div>      
      </template>
    </div>
    <div class="what-experts-say__brief last"><span v-text="$t('REFERENDUM.WHAT_EXPERTS_SAY.BRIEF.1')"></span></div>
    <template v-for="n in 3">    
      <WhatExpertsSayDetail
        :avatar="`/proj-assets/referendum/icons/${$t(`REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.${n - 1}.AVATAR`)}.png`"
        :name="$t(`REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.${n - 1}.NAME`)"
        :saying="$t(`REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.${n - 1}.SAYING`)"
        :title="$t(`REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.${n - 1}.TITLE`)"></WhatExpertsSayDetail>
    </template>
  </div>
</template>
<script>
  import WhatExpertsSayDetail from './WhatExpertsSayDetail.vue'
  import verge from 'verge'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'  
  export default {
    name: 'WhatExpertsSay',
    components: {
      WhatExpertsSayDetail,
    },
    data () {
      return {
        isGaSent: false,
      }
    },
    methods: {},
    mounted () {
      window.addEventListener('scroll', () => {
        const current_top_y = currentYPosition()
        const content_top_y = elmYPosition(`.what-experts-say`)
        const content_height = this.$el.clientHeight
        const device_height = verge.viewportH()
        if (!this.isGaSent && (content_top_y < current_top_y + device_height / 3)) {
          window.ga('send', 'event', 'projects', 'scroll', `scroll to 9`, { nonInteraction: false })
          this.isGaSent = true
        }
      })      
    },
  }
</script>
<style lang="stylus" scoped>
  .what-experts-say
    padding 50px 0
    position relative
    z-index 10
    &__title
      padding 0 25px
      h2
        font-size 1.5rem
        font-weight 600
        font-style normal
        font-stretch normal
        line-height 1.42
        letter-spacing normal
        text-align center
        color #a40035 
    &__brief
      padding 0 25px
      font-size 1rem
      font-weight normal      
      line-height 1.88
      letter-spacing normal
      text-align justify
      color #313131
      &.first
        margin 40px auto 20px
      &.last
        margin 20px auto 40px      
    &__chart
      background-color #f9f9f7
      .item
        display flex
        font-size 0.75rem
        font-weight normal
        line-height 1.33
        letter-spacing normal
        color #313131
        .name
          flex 1
          border-bottom 2px solid #a40035
          padding 10px
        .before, .after
          padding 10px
          border-bottom 2px solid #a40035
          border-left 2px solid #a40035
          width 40%
        &:last-child
          .before, .after, .name
            border-bottom none
  @media screen and (min-width: 600px) 
    .what-experts-say
      padding 100px 0
      &__title
        padding 0
        h2
          font-size 1.875rem
          line-height 1.48
      &__brief
        max-width 600px
        padding 0
      &__chart
        max-width 600px
        margin 0 auto
        .item
          .before, .after, .name
            padding 15px
          .name
            display flex
            justify-content center
</style>