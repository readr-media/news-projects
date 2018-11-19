<template>
  <div class="pk">
    <div class="pk__title"><h2><span v-text="$t('REFERENDUM.PK.TITLE')"></span></h2></div>
    <PkMech class="pk__mech"></PkMech>
  </div>
</template>
<script>
  import PkMech from './PkMech.vue'
  export default {
    name: 'Pk',
    components: {
      PkMech,
    },
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
  .pk
    padding 150px 0 150px
    position relative
    z-index 10
    &__title
      h2
        margin 0
        font-size 30px
        font-weight 600
        font-style normal
        font-stretch normal
        line-height 1.48
        letter-spacing normal
        text-align center
        color #a40035
    &__mech
      margin 70px auto 0
      padding 0 20px
      width 100%
      max-width 1200px
</style>