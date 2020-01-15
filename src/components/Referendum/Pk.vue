<template>
  <div class="pk">
    <div class="pk__title"><h2><span v-text="$t('REFERENDUM.PK.TITLE')"></span></h2></div>
    <PkMech class="pk__mech"></PkMech>
  </div>
</template>
<script>
  import PkMech from './PkMech.vue'
  import verge from 'verge'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'  
  export default {
    name: 'Pk',
    components: {
      PkMech,
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
        const content_top_y = elmYPosition(`.pk`)
        const content_height = this.$el.clientHeight
        const device_height = verge.viewportH()
        if (!this.isGaSent && (content_top_y + (content_height * 2) / 3 < current_top_y + device_height)) {
          window.ga('send', 'event', 'projects', 'scroll', `scroll to 7`, { nonInteraction: false })
          this.isGaSent = true
        }
      })
    },
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