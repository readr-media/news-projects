<template>
  <div class="conclusion">
    <div class="conclusion__title"><h2><span v-text="$t('REFERENDUM.CONCLUSION.TITLE')"></span></h2></div>
    <div class="conclusion__content"><span v-text="$t('REFERENDUM.CONCLUSION.CONTENT.0')"></span></div>
  </div>
</template>
<script>
  export default {
    name: 'Conclusion',
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
.conclusion
  margin-top 100px
  &__title
    h2
      font-size 1.5rem
      font-weight 600
      font-style normal
      font-stretch normal
      line-height 1.42
      letter-spacing normal
      text-align center
      color #a40035 
  &__content
    padding 0 25px
    font-size 1rem
    font-weight normal
    font-style normal
    font-stretch normal
    line-height 1.88
    letter-spacing normal
    text-align justify
    color #313131
  @media screen and (min-width: 600px) 
    .conclusion
      &__content, &__title
        max-width 600px
        margin 0 auto
      &__title
        h2
          font-size 1.875rem
          line-height 1.48
</style>