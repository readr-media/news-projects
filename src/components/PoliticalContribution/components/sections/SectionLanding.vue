<template>
  <section class="section-landing">
    <img class="section-landing__hand" src="/proj-assets/political-contribution/hand.png" alt="">
    <div class="section-landing__donut-background"></div>
    <AppParticles class="section-landing__particles" id="section-landing-particles-first"/>
    <AppParticles class="section-landing__particles" id="section-landing-particles-second"/>
    <div class="section-landing__content-container">
      <SectionLandingTitles/>
      <nav class="section-landing__navs">
        <SectionLandingNav
          class="section-landing__nav section-landing__nav--delay2"
          :iconSrc="'chart-g.png'"
          :hint="{ 
            text: '圖表區',
            type: 'router-link',
            link: 'dashboard'
          }"
        />
        <SectionLandingNav
          class="section-landing__nav section-landing__nav--delay3"
          :iconSrc="'tool-g.png'"
          :hint="{ 
            text: '查找政商關係',
            type: 'router-link',
            link: 'explore'
          }"
        />
        <SectionLandingNav
          class="section-landing__nav section-landing__nav--delay4"
          :iconSrc="'article-g.png'"
          :hint="{ 
            text: '獻金解析文章',
            type: 'router-link',
            link: 'story1'
          }"
        />
        <SectionLandingNav
          class="section-landing__nav section-landing__nav--delay5"
          :iconSrc="'paper-g.png'"
          :hint="{ 
            text: '原始資料',
            type: 'href',
            link: 'https://github.com/mirror-media/politicalcontribution'
          }"
        />
      </nav>
    </div>
  </section>
</template>

<script>
import SectionLandingTitles from './sectionLanding/SectionLandingTitles.vue'
import SectionLandingNav from './sectionLanding/SectionLandingNav.vue'
import AppParticles from '../AppParticles.vue'

export default {
  components: {
    SectionLandingTitles,
    SectionLandingNav,
    AppParticles,
  },
  methods: {
    applyHeightMobile () {
      // Using JS to calculate the dimensions except using CSS viewport, in order to avoid browser's bottom nav bar causing vh inconsistent
      this.$el.style['height'] = `${this.$store.getters['heightMobile']}px`
      this.$el.querySelector('.section-landing__content-container').style['height'] = `${this.$store.getters['heightMobile']}px`
    },
  },
  mounted () {
    if (!this.$store.state.useragent.isDesktop) {
      this.applyHeightMobile()
    }
  },
}
</script>

<style lang="stylus" scoped>
@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

// @-webkit-keyframes fadeInDown {
//   from {
//     opacity: 0;
//     -webkit-transform: translate3d(0, -100%, 0);
//     transform: translate3d(0, -100%, 0);
//     pointer-events: none;
//   }

//   to {
//     opacity: 1;
//     -webkit-transform: translate3d(0, 0, 0);
//     transform: translate3d(0, 0, 0);
//     pointer-events: initial;
//   }
// }

// @keyframes fadeInDown {
//   from {
//     opacity: 0;
//     -webkit-transform: translate3d(0, -100%, 0);
//     transform: translate3d(0, -100%, 0);
//     pointer-events: none;
//   }

//   to {
//     opacity: 1;
//     -webkit-transform: translate3d(0, 0, 0);
//     transform: translate3d(0, 0, 0);
//     pointer-events: initial;
//   }
// }

// @-webkit-keyframes fadeInDownAtUpper {
//   from {
//     opacity: 0;
//     -webkit-transform: translate3d(0, -100%, 0);
//     transform: translate3d(0, -100%, 0);
//     pointer-events: none;
//   }

//   to {
//     opacity: 1;
//     -webkit-transform: translate3d(0, -107px, 0);
//     transform: translate3d(0, -107px, 0);
//     pointer-events: initial;
//   }
// }

// @keyframes fadeInDownAtUpper {
//   from {
//     opacity: 0;
//     -webkit-transform: translate3d(0, -100%, 0);
//     transform: translate3d(0, -100%, 0);
//     pointer-events: none;
//   }

//   to {
//     opacity: 1;
//     -webkit-transform: translate3d(0, -107px, 0);
//     transform: translate3d(0, -107px, 0);
//     pointer-events: initial;
//   }
// }

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
    // pointer-events: none;
  }

  to {
    opacity: 1;
    // pointer-events: auto;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    // pointer-events: none;
  }

  to {
    opacity: 1;
    // pointer-events: auto;
  }
}

.section-landing
  width 100vw
  height 100vh
  position relative
  overflow hidden
  &__hand // aspect ratio 2:1
    position absolute
    top 50px
    right -100px
    width 40vw
    opacity 0
    animation-name fadeInRight
    animation-duration 1s
    animation-delay 1s
    animation-fill-mode forwards
  &__donut-background
    position absolute
    top calc(105px + 40vw / 2 + 0px)
    right 0
    width 70vw
    height 70vw
    border calc(45vw / 3) solid #dee5df 
    border-radius 100vh
    background-color white
  &__particles
    position absolute
    opacity 0
    animation-name fadeIn
    animation-duration 1s
    animation-delay 2s
    animation-fill-mode forwards
  &__navs
    position absolute
    // top calc(50px + 40vw / 2 - (40vw / 2 / 3))
    // left calc(100vw - (40vw - 100px))
    bottom 10%
    right 11.4%
    display flex
    // flex-direction column
  &__nav
    opacity 0
    // pointer-events none
    animation-name fadeIn
    animation-duration 1s
    animation-fill-mode forwards
    animation-delay 2s
    // animation-duration .5s
    // animation-fill-mode forwards
    // &--delay2
    //   animation-name fadeInDown
    //   animation-delay 2s
    // &--delay3
    //   animation-name fadeInDownAtUpper
    //   animation-delay 2.5s
    // &--delay4
    //   animation-name fadeInDown
    //   animation-delay 3s
    // &--delay5
    //   animation-name fadeInDownAtUpper
    //   animation-delay 3.5s
    & + &
      margin 0 0 0 60px
    &:nth-child(2), &:nth-child(4)
      transform translateY(-157px)

#section-landing-particles-first
  top 105px
  left 0
  width 10%
  height 400px
#section-landing-particles-second
  left 30vw
  bottom 0
  width 200px
  height calc(100vh - 105px - 339px - 30px)

@media (max-width 1440px)
  .section-landing
    &__nav
      & + &
        margin 0 0 0 40px
      &:nth-child(2), &:nth-child(4)
        transform translateY(-107px)

@media (max-height 750px)
  .section-landing
    &__nav
      &:nth-child(2), &:nth-child(4)
        transform translateY(0px)

@media (max-width 1024px)
  .section-landing
    // height 100vh // JS calculated height
    display flex
    justify-content center
    align-items center
    &__hand // aspect ratio 2:1
      top initial
      bottom 50vh
      right 0
      width 20vh
      opacity 1
      animation-name none
      z-index -1
    &__donut-background
      top initial
      bottom 0
      right -25vh
      width 50vh
      height 50vh
      border calc(25vh / 3) solid #dee5df 
      border-radius 50vh
      z-index -1
    &__particles
      animation-delay 0s
    &__content-container
      // height 100vh // JS calculated height
      display flex
      flex-direction column
      justify-content space-around
      align-items flex-start
    &__navs
      position static
      flex-direction column
    &__nav
      opacity 1
      pointer-events initial
      animation-name none
      transform translateY(0) !important
      & + &
        margin 10px 0 0 0

  #section-landing-particles-first
    top 0
    left 0
    width 10%
    height 70vh
  #section-landing-particles-second
    display none
</style>

