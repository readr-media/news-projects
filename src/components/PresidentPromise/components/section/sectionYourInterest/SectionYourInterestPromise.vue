<template>
  <div class="section-your-interest-promise">
    <!-- <h1 class="section-your-interest-promise__order" v-text="order + 1"></h1> -->
    <div class="order">
      <h1 class="order__text" v-text="order + 1"></h1>
    </div>
    <div class="section-your-interest-promise__container">
      <h1 class="section-your-interest-promise__title" v-text="interest.title"></h1>
      <TagPromise
        v-show="currTooltipPromise.status !== null"
        :tagType="currTooltipPromise.status"
      />
      <blockquote class="section-your-interest-promise__stuck-reason" v-show="interest.isStuck"><span>“</span><span>{{ interest.stuckReason }}</span></blockquote>
      <p class="section-your-interest-promise__description" v-html="interest.description"></p>
      <a class="section-your-interest-promise__source" :href="interest.sourceLink" target="_blank" v-text="interest.source"></a>
    </div>
  </div>
</template>

<script>
import TagPromise from '../../TagPromise.vue'

export default {
  props: {
    order: {
      type: Number,
      required: true,
    },
    interest: {
      type: Object,
      required: true,
      default () {
        return {}
      },
    },
  },
  components: {
    TagPromise
  }
}
</script>

<style lang="stylus">
.section-your-interest-promise
  display flex
  width 755px
  margin 0 0 70px 0
  &__container
    display flex
    flex-direction column
    min-width 657px
  &__title
    font-size 24px
    font-weight normal
    line-height 1.42
    text-align justify
    color #ffffff
    margin-top 0
  &__stuck-reason
    margin 12px 0 auto 0
    position relative
    span
      &:nth-child(1)
        font-size 60px
        font-style normal
        color #ffffff
        position absolute
        top 0
      &:nth-child(2)
        padding 0 0 0 49px
        font-size 18px
        line-height 1.44
        text-align justify
        color #ffffff
        font-style italic
  &__description
    font-size 18px
    line-height 1.44
    text-align justify
    color #c9c9c9
    > br
      content ""
      display block
      margin 30px 0
  &__source
    font-size 16px
    font-weight 300
    line-height 0.86
    text-align right
    color #b5b5b5
    text-decoration none
    border-bottom 1px solid #b5b5b5
    padding 0 0 6px 0
    align-self flex-end

.order
  width 56px
  min-width 56px
  margin 0 42px 0 0
  display flex
  justify-content center
  align-items flex-start
  &__text
    font-size 100px
    line-height .8
    color transparent
    -webkit-text-stroke 2px white
    margin 0

@media (max-width 425px)
  .section-your-interest-promise
    width 100%
    margin 0 0 28px 0
    &__container
      min-width calc(100% - 28px - 24px)
    &__title
      font-size 22px
      line-height 1.36
    &__stuck-reason
      display flex
    &__description
      font-size 16px
      line-height 1.5
      > br
        margin 15px 0
    &__source
      font-size 14px

  .order
    min-width 28px
    max-width 28px
    margin 0 24px 0 0
    &__text
      font-size 50px
      line-height 1
</style>

