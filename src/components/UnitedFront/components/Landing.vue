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
          <h1>一統去交流</h1>
          <h2>全方位解析兩岸青年交流團</h2>
        </div>
        <div class="intro__paragraphs paragraphs">
          <p>你知道一個暑假，有多少年輕人去中國「交流」嗎？11 天甘肅絲路之旅、兩個月北京實習、青年創業基地參訪⋯⋯報名簡章上寫的「落地接待」、「補助」、「高規格參訪」有多優待？這些團去中國做了什麼？見了誰？READr 透過深度訪談和數據，呈現「交流」與「統戰」之間千絲萬縷的關係。</p>
        </div>
      </div>
    </div>
    <TheReadMore
      class="landing__read-more-wrapper"
      @click.native="$scrollTo(`#主題式`)"
    />
  </section>
</template>

<script>
import TheReadMore from './TheReadMore.vue'

export default {
  components: {
    TheReadMore
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
    margin 34px 0 0 0

.titles
  opacity 0
  animation-name fadeInDown
  animation-duration .5s
  animation-delay 1.5s
  animation-fill-mode forwards
  h1
    margin 0
    font-size 60px
  h2
    margin 10px 0 0 0
    font-size 40px
    font-weight normal

.paragraphs
  opacity 0
  animation-name fadeInDown
  animation-duration .5s
  animation-delay 2s
  animation-fill-mode forwards
  p
    margin 0
    font-size 24px
    line-height 1.5
    text-align justify
</style>