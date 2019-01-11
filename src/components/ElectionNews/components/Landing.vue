<template>
  <section class="landing">
    <div class="landing__navs navs">
      <Button
        class="navs__nav"
        @click.native="navigate({ param: defaultParams })"
      >
        單一關鍵字
      </Button>
      <Button
        class="navs__nav"
        @click.native="navigate({ param: defaultParams, subparam: defaultSubparams})"
      >
        我要看 PK
      </Button>
    </div>
  </section>
</template>

<script>
import Button from './Button.vue'

const debug = require('debug')('ELECTION-NEWS:CLIENT:Landing.vue')

export default {
  components: {
    Button
  },
  data () {
    return {
      defaultParams: '韓國瑜',
      defaultSubparams: '陳其邁'
    }
  },
  methods: {
    navigate ({ param = '', subparam = '' }) {
      const { params, subparams } = this.$route.params
      const shouldScroll = (param === params) || ((param === params) && (subparam === subparams) )
      if (shouldScroll) {
        this.$scrollTo('.content')
      }

      this.$router.navigate({ param, subparam })
    }
  }
}
</script>

<style lang="stylus" scoped>
.landing
  display flex
  flex-direction column
  justify-content flex-end
  padding 50px 14px
  background-color rgba(0, 0, 0, 0.85)
  height 200vh
  &__navs
    display flex
    justify-content space-between
</style>