<template>
  <div class="finding">
    <div class="finding__title"><h2><span v-text="$t('REFERENDUM.FINDING.TITLE')"></span></h2></div>
    <div class="finding__brief"><div v-html="$t('REFERENDUM.FINDING.BRIEF')"></div></div>
    <template v-for="n in 6">    
      <div class="finding__wrapper">
        <div class="title"><h3><span v-text="$t(`REFERENDUM.FINDING.ITEMS.${n - 1}.TITLE`)"></span></h3></div>
        <template v-for="(sub, index) in get($t(`REFERENDUM.FINDING.ITEMS.${n - 1}`), 'SUB')">
          <div class="content">
            <!--FindingShow v-if="isDesktop"
              :id="`finding-show-${n}-${index}`">
              <div class="infographic finding-show-comp" slot="infographic"><img :src="`/proj-assets/referendum/findings/${get(sub, 'NAME')}-web@2x-100.jpg`"></div>
              <div class="explanation finding-show-comp" slot="explanation" v-html="get(sub, 'CONTENT')"></div>
            </FindingShow-->
            <FindingShowMobile
              :id="`finding-show-${n}-${index}`">
              <div class="infographic" slot="infographic">
                <img :src="`/proj-assets/referendum/findings/${get(sub, 'NAME')}-${ isDesktop ? 'web' : 'phone' }@2x-100.jpg`">
              </div>
              <div class="explanation" slot="explanation" v-html="get(sub, 'CONTENT')"></div>
            </FindingShowMobile>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
  import FindingShow from './FindingShow.vue'
  import FindingShowMobile from './FindingShowMobile.vue'
  import { get, } from 'lodash'
  export default {
    name: 'Finding',
    computed: {
      isDesktop () {
        return get(this.$store, 'state.useragent.isDesktop')
      },      
    },
    components: {
      FindingShow,
      FindingShowMobile,
    },
    methods: {
      get,
    },
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
  .finding
    padding 55px 0
    &__title
      h2
        font-size 1.5rem
        font-weight 600
        letter-spacing normal
        margin-bottom 40px
        color #a40035
        text-align center
    &__brief
      font-size 1rem
      font-weight normal
      line-height 1.88
      color #313131
      padding 0 25px
      position relative
      z-index 10
    &__wrapper
      margin 50px 0
      display flex
      justify-content center
      align-items center
      flex-direction column
      .title
        margin 0 12px
        border-radius 20px
        border 2px solid #a40035
        padding 15px 25px
        background-color #fff
        position relative
        z-index 10     
        h3
          margin 0
          font-size 1.25rem
          font-weight 600
          line-height 1.4
          letter-spacing normal
          text-align justify
          color #a40035
      .content
        padding 20px 0
        font-size 1rem
        font-weight normal
        line-height 1.88
        color #1a1a1a
        text-align justify
        letter-spacing normal
        position relative
        z-index 9
        .infographic
          img
            width 100%
  @media screen and (min-width: 600px) 
    .finding
      &__title
        h2
          font-size 1.875rem
          font-weight 600
          line-height 1.48
      &__brief
        font-size 1rem
        text-align justify
        width 500px
        margin 0 auto
      &__wrapper
        margin 50px auto

        .title
          padding 35px
          margin-bottom 50vh
          width 500px     
          h3
            font-size 1.5rem
            line-height 1.5
        .content
          // display flex
          // align-items center
          // justify-content center
          // margin 50px 0
          // &:last-child
          //   margin-bottom 30vh
          .explanation
            max-width 600px
            // margin-left 40px
          //   width 50%
          //   &.finding-show-comp
          //     width 100%
          .infographic
          //   flex 1
          //   img
          //     width 100%
          //     max-width 650px
          //     object-fit contain
          //     object-position center center
            img
              max-width 600px
              // width auto
              // height 100%
              

  @media screen and (min-width: 700px) 
    .finding
      &__brief
        width 600px
      &__wrapper
        .title
          width 600px
</style>