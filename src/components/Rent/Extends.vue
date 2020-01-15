<template>
  <div class="extends">
    <div class="extends__title"><span v-text="$t('RENT.EXTENDS.TITLE')"></span></div>
    <div class="extends__items">
      <a class="extends__item" href="https://www.mirrormedia.mg/projects/rent-house" target="_blank">
        <div class="img"><img src="/proj-assets/rent/rent-ogg.jpg"></div>
        <div class="title"><span v-text="$t('RENT.EXTENDS.RENT_OGG.TITLE')"></span></div>
        <div class="description"><span v-text="$t('RENT.EXTENDS.RENT_OGG.DESC')"></span></div>
      </a>
      <a class="extends__item" href="https://www.mirrormedia.mg/projects/rent-king" target="_blank">
        <div class="img"><img src="/proj-assets/rent/rent-king.jpg"></div>
        <div class="title"><span v-text="$t('RENT.EXTENDS.RENT_KING.TITLE')"></span></div>
        <div class="description"><span v-text="$t('RENT.EXTENDS.RENT_KING.DESC')"></span></div>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Extends',
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
  .extends
    width 100%
    background-color #eeeeee
    padding 38px 20px
    margin-bottom 114px
    &__title
      color #313131
      font-size 2.125rem
      margin-bottom 43px
      text-align center
    &__items
      display flex
      justify-content center
      align-items center
    &__item
      width 400px
      &, &:hover, &:link, &:visited
        text-decoration none
        color #313131
      &:not(:first-child)
        margin-left 77px
      .img
        width 100%
        height 210px
        img
          height 100%
          object-fit cover
          object-position center center
      .title
        font-size 1.5rem
        font-weight 400
        line-height normal
        padding 32px 0 23px
      .description
        font-size 1rem
        font-weight normal
        line-height 1.88
  @media screen and (min-width: 0px) and (max-width: 767px)
    .extends
      padding 38px 0
      &__items
        flex-direction column
        padding 0 20px
      &__item
        width 100%
        &:not(:first-child)
          margin-left 0
          margin-top 45px
        .title
          padding 20px 0
        .img
          width 100%
          height auto
          img
           width 100%
           height auto
</style>