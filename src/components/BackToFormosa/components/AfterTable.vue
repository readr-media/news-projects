<template>
  <div class="after-table">
    <div class="after-table__item" v-for="item in tableItems" :key="item.key">
      <p class="after-table__title" v-html="item.title" />
      <p class="after-table__intro" v-html="item.intro" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AfterTable',
  props: {
    tableItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.after-table
  font-size 1.6rem
  line-height 1.4
  color #fff
  // display flex
  // flex-direction column
  // align-items center
  text-align center
  padding 30px 10px 45px 10px
  max-width 600px
  margin-right auto
  margin-left auto
  @media (min-width 620px)
    padding-right 0
    padding-left 0
  &__item
    border-bottom 1px solid #fff
    padding-top 15px
    padding-bottom 15px
    &:last-child
      border-bottom none
  &__title
    font-weight 700
    margin-bottom 10px
  &__intro
    font-weight 300
</style>
