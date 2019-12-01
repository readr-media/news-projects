<template>
  <section class="landing">
    <div class="landing__map-wrapper">
      <div
        class="flourish-embed"
        data-src="visualisation/919227"
      />
    </div>
    <div class="landing__intro-wrapper intro-wrapper">
      <div class="intro-wrapper__intro intro">
        <div class="intro__titles titles">
          <h1>
            <img src="/proj-assets/unitedfront/title.png" alt="">
          </h1>
          <h2>全方位解析兩岸青年交流團</h2>
        </div>
        <div class="intro__paragraphs paragraphs">
          <p>你知道一個暑假，至少有 3000 名臺灣青年去中國「交流」嗎？ 11 天甘肅絲路之旅、兩個月北京實習、青年創業基地參訪⋯⋯盤點已知的交流團形式，就能發現其「無孔不入」的程度：從小學就有機會參與，大學則是交流黃金期，甚至到畢業實習都有包辦。但這些交流真的只是平凡的交流嗎？READr 透過深度訪談和數據，呈現「交流」與「統戰」之間千絲萬縷的關係。 </p>
        </div>
      </div>
    </div>
    <TheReadMore
      class="landing__read-more-wrapper"
      @click.native="handleReadMore"
    />
  </section>
</template>

<script>
import TheReadMore from './TheReadMore.vue'

export default {
  components: {
    TheReadMore
  },
  methods: {
    handleReadMore() {
      this.$scrollTo('#序篇')
      window.ga('send', 'event', 'projects', 'click', 'read more', { nonInteraction: false })
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -50%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.landing
  background-color black
  position relative
  z-index 200
  &__map-wrapper
    background-image url(/proj-assets/unitedfront/landing-bg.png)
    background-position center center
    background-size cover
    background-repeat norepeat
    min-height 600px
  &__intro-wrapper
    position absolute
    top 0
    left calc((100vw - 1000px) / 2 - 20px)
  &__read-more-wrapper
    position absolute
    bottom 20px
    left 0

.intro-wrapper
  width 480px
  height 100%
  display flex
  align-items center
  color white

.intro
  &__paragraphs
    margin 10px 0 0 0

.titles
  opacity 0
  animation-name fadeInDown
  animation-duration .5s
  animation-delay 1.5s
  animation-fill-mode forwards
  h1
    margin 0
    // font-size 60px
    img
      width 360px
  h2
    margin 0
    font-size 30px
    color #f8e71c
    font-weight normal

.paragraphs
  opacity 0
  animation-name fadeInDown
  animation-duration .5s
  animation-delay 2s
  animation-fill-mode forwards
  p
    margin 0
    font-size 18px
    line-height 1.67
    text-align justify
</style>