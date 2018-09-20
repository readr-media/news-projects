<template>
  <div :class="[ 'section-content-explore-aside-hint', { 'section-content-explore-aside-hint--show': showAsideHint } ]">
    <div class="section-content-explore-aside-hint__container">
      <img
        :class="[ 'section-content-explore-aside-hint__finger-hint', { 'section-content-explore-aside-hint__finger-hint--animate': showFingerAnimation }]"
        src="/proj-assets/political-contribution/finger.png" alt=""
      >
      <div class="section-content-explore-aside-hint__text">
        <p>點擊頭像</p>
        <p>看政商關係圖</p>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty, } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  watch: {
    shouldShowAsideHint () {
      // TODO: refactor
      if (this.shouldShowAsideHint) {
        this.scroller = window.scrollama()
        this.scroller
          .setup({
            step: '.section-content-explore-candidates', // candidates' portrait container in won list
            offset: .5,
          })
          .onStepEnter(this.asideHintHandleStepEnter)
          .onStepExit(this.asideHintHandleStepExit)
      }
    },
    showAsideHint () {
      if (this.showAsideHint) {
        this.showCount += 1
      }
    }
  },
  data () {
    return {
      showAsideHint: false,
      showCount: 0,
      scroller: undefined,
    }
  },
  computed: {
    ...mapGetters([
      'rawDataBasicCurrentOrdinal',
    ]),
    shouldShowAsideHint () {
      return !isEmpty(this.rawDataBasicCurrentOrdinal) && this.$store.state.useragent.isDesktop
    },
    showFingerAnimation () {
      return this.showAsideHint && this.showCount <= 1
    }
  },
  methods: {
    asideHintHandleStepEnter () {
      this.showAsideHint = true
    },
    asideHintHandleStepExit () {
      this.showAsideHint = false
    },
    scrollerResizeHandler () {
      this.scroller.resize()
    },
  },
  mounted () {
    // TODO: refactor
    if (this.shouldShowAsideHint) {
      this.scroller = window.scrollama()
      this.scroller
        .setup({
          step: '.section-content-explore-candidates', // candidates' portrait container in won list
          offset: .5,
        })
        .onStepEnter(this.asideHintHandleStepEnter)
        .onStepExit(this.asideHintHandleStepExit)

      window.addEventListener('resize', this.scrollerResizeHandler)
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.scrollerResizeHandler)
  }
}
</script>

<style lang="stylus" scoped>
@-webkit-keyframes bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(-30px, 0, 0);
    transform: translate3d(-30px, 0, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0);
  }

  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(-30px, 0, 0);
    transform: translate3d(-30px, 0, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0);
  }

  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.section-content-explore-aside-hint
  // width 50px
  width max-content
  height calc(100vh - 60px)
  // background-color black
  position fixed
  top 60px
  right calc((calc(100vw - 900px) / 2) + 900px + 10px)
  opacity 0
  transition opacity .25s
  display flex
  justify-content center
  align-items center
  pointer-events none
  &--show
    opacity 1
    pointer-events initial
  &__container
    display flex
    flex-direction column
    justify-content center
  &__text
    display flex
    p
      margin 3px
      color gray
      writing-mode vertical-rl
      text-orientation upright
  &__finger-hint
    width 60px
    // position relative
    // bottom 2px
    margin 0 0 10px 0
    &--animate
      animation bounceInLeft 1s

@media (max-width 1024px)
  .section-content-explore-aside-hint
    display none
</style>

