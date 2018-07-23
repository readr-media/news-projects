<template>
  <main class="hotel-hostess">
    <app-logo
      class="no-sprite"
      href="https://www.readr.tw/"
      top="20px"
      left="20px"
      bg-image="/proj-assets/hotel-hostess/images/readr-logo.png" />
    <section class="hotel-hostess__bg origin" />
    <section class="hotel-hostess__bg color" />
    <div class="credit mobile">
      <p>文字、攝影：鐘聖雄</p>
      <p>網頁：HY Tan</p>
      <p>設計：許玲瑋</p>
      <p>Model：山貓</p>
      <p>特別感謝：妹子與酒</p>
      <p>、席耶娜、王世倫</p>
    </div>
    <div class="heading--desktop">
      <div>
        <h1>殺死那個酒店小姐</h1>
      </div>
      <p>47% 酒店小姐入行後變得憂鬱</p>
      <p>51% 曾求助心理醫生</p>
      <p>13% 至少自殺過一次</p>
      <h3>為什麼酒店小姐會成為自殺高風險族群？</h3>
    </div>
    <div
      class="list list--desktop"
      @mouseover="$_hotelHostess_handleMouseOver"
      @mouseout="$_hotelHostess_handleMouseOut">
      <a
        href="/project/hotel-hostess-series/foreword"
        class="item"
        @click="$_hotelHostess_handleClickGAEvent('go to foreword')"
        @touchstart="$_hotelHostess_handleTouchStart"
        @touchend="$_hotelHostess_handleTouchEnd">
        <span>就像洋蔥</span>
      </a>
      <a
        href="/project/hotel-hostess-series/questionnaire"
        class="item"
        @click="$_hotelHostess_handleClickGAEvent('go to questionnaire')"
        @touchstart="$_hotelHostess_handleTouchStart"
        @touchend="$_hotelHostess_handleTouchEnd">
        <span>小姐群像</span>
      </a>
      <a
        href="/project/hotel-hostess-series/emotional-labor"
        class="item"
        @click="$_hotelHostess_handleClickGAEvent('go to emotional-labor')"
        @touchstart="$_hotelHostess_handleTouchStart"
        @touchend="$_hotelHostess_handleTouchEnd">
        <span>爛牌人生</span>
      </a>
      <a
        href="/project/hotel-hostess-series/environment"
        class="item"
        @click="$_hotelHostess_handleClickGAEvent('go to environment')"
        @touchstart="$_hotelHostess_handleTouchStart"
        @touchend="$_hotelHostess_handleTouchEnd">
        <span>愛情麥當勞</span>
      </a>
      <a
        href="/project/hotel-hostess-series/case-stories"
        class="item"
        @click="$_hotelHostess_handleClickGAEvent('go to case-stories')"
        @touchstart="$_hotelHostess_handleTouchStart"
        @touchend="$_hotelHostess_handleTouchEnd">
        <span>姊妹</span>
      </a>
    </div>
    <article id="fullpage">
      <section class="section">
        <div class="heading">
          <h2>殺死那個</h2>
          <h1>酒店小姐</h1>
        </div>
        <div
          class="arrow"
          @click="$_hotelHostess_moveDown">
          <img
            src="/proj-assets/hotel-hostess/images/arrow.png"
            alt="">
          <span>滑動以繼續閱讀</span>
        </div>
      </section>
      <template v-if="viewportX < 900">
        <section class="section">
          <div class="heading--mobile">
            <p>47% 酒店小姐入行後變得憂鬱</p>
            <p>51% 曾求助心理醫生</p>
            <p>13% 至少自殺過一次</p>
            <h3>為什麼酒店小姐會成為自殺高風險族群？</h3>
          </div>
        </section>
        <section class="section">
          <div class="list">
            <a
              href="/project/hotel-hostess-series/foreword"
              class="item"
              @click="$_hotelHostess_handleClickGAEvent('go to foreword')"
              @touchstart="$_hotelHostess_handleTouchStart"
              @touchend="$_hotelHostess_handleTouchEnd">
              <span>就像洋蔥</span>
            </a>
            <a
              href="/project/hotel-hostess-series/questionnaire"
              class="item"
              @click="$_hotelHostess_handleClickGAEvent('go to questionnaire')"
              @touchstart="$_hotelHostess_handleTouchStart"
              @touchend="$_hotelHostess_handleTouchEnd">
              <span>小姐群像</span>
            </a>
            <a
              href="/project/hotel-hostess-series/emotional-labor"
              class="item"
              @click="$_hotelHostess_handleClickGAEvent('go to emotional-labor')"
              @touchstart="$_hotelHostess_handleTouchStart"
              @touchend="$_hotelHostess_handleTouchEnd">
              <span>爛牌人生</span>
            </a>
            <a
              href="/project/hotel-hostess-series/environment"
              class="item"
              @click="$_hotelHostess_handleClickGAEvent('go to environment')"
              @touchstart="$_hotelHostess_handleTouchStart"
              @touchend="$_hotelHostess_handleTouchEnd">
              <span>愛情麥當勞</span>
            </a>
            <a
              href="/project/hotel-hostess-series/case-stories"
              class="item"
              @click="$_hotelHostess_handleClickGAEvent('go to case-stories')"
              @touchstart="$_hotelHostess_handleTouchStart"
              @touchend="$_hotelHostess_handleTouchEnd">
              <span>姊妹</span>
            </a>
            <footer class="footer">
              <div class="credit">
                <p>文字、攝影：鐘聖雄<span></span>Model：山貓</p>
                <p>網頁：HY Tan<span></span>設計：許玲瑋</p>
                <p>特別感謝：妹子與酒、席耶娜、王世倫</p>
              </div>
              <div class="share">
                <a
                  :href="`https://www.facebook.com/share.php?u=${pageUrl}`"
                  class="item"
                  target="_blank"
                  @click="$_hotelHostess_handleClickGAEvent('share to fb')">
                  <img src="/proj-assets/hotel-hostess/images/share-fb.png">
                </a>
                <a
                  :href="`https://line.me/R/msg/text/?${pageUrl}`"
                  class="item"
                  target="_blank"
                  @click="$_hotelHostess_handleClickGAEvent('share to line')">
                  <img src="/proj-assets/hotel-hostess/images/share-line.png">
                </a>
                <a
                  :href="`https://plus.google.com/share?url=${pageUrl}`"
                  class="item"
                  target="_blank"
                  @click="$_hotelHostess_handleClickGAEvent('share to gplus')">
                  <img src="/proj-assets/hotel-hostess/images/share-gplus.png">
                </a>
              </div>
            </footer>
          </div>
        </section>
      </template>
    </article>
    <template v-if="viewportX >= 900">
      <footer class="footer">
        <div class="share">
          <a
            :href="`https://www.facebook.com/share.php?u=${pageUrl}`"
            class="item"
            target="_blank"
            @click="$_hotelHostess_handleClickGAEvent('share to fb')">
            <img src="/proj-assets/hotel-hostess/images/share-fb.png">
          </a>
          <a
            :href="`https://line.me/R/msg/text/?${pageUrl}`"
            class="item"
            target="_blank"
            @click="$_hotelHostess_handleClickGAEvent('share to line')">
            <img src="/proj-assets/hotel-hostess/images/share-line.png">
          </a>
          <a
            :href="`https://plus.google.com/share?url=${pageUrl}`"
            class="item"
            target="_blank"
            @click="$_hotelHostess_handleClickGAEvent('share to gplus')">
            <img src="/proj-assets/hotel-hostess/images/share-gplus.png">
          </a>
        </div>
        <div class="credit">
          <p>文字、攝影：鐘聖雄<span></span>網頁：HY Tan<span></span>設計：許玲瑋<span></span>Model：山貓<span></span>特別感謝：妹子與酒、席耶娜、王世倫</p>
        </div>
      </footer>
    </template>
  </main>
</template>
<script>
import Logo from '../Logo.vue';
import RelatedReports from '../RelatedReports.vue';
import Share from '../Share.vue';
import { getFBCommentsUrl } from '../../util/comm';

const PROJECT_NAME = 'hotel-hostess';

export default {
  name: 'HotelHostess',
  components: {
    'app-logo': Logo,
    'app-share': Share,
    'related-reports': RelatedReports,
  },
  metaInfo() {
    const metaUrl = PROJECT_NAME;
    const metaImage = `${PROJECT_NAME}/images/og.jpg`;
    const ogLocale = 'zh_TW';

    return {
      title: '殺死那個酒店小姐',
      description: '47% 酒店小姐入行後變得憂鬱、51% 曾求助心理醫生、13% 至少自殺過一次。為什麼酒店小姐會成為自殺高風險族群？',
      locale: ogLocale,
      metaUrl,
      metaImage,
    };
  },
  data() {
    return {
      fullpage: null,
      pageUrl: '',
    };
  },
  computed: {
    viewportX() {
      return this.$store.state.viewport[0];
    },
  },
  beforeMount() {
    this.pageUrl = getFBCommentsUrl();
  },
  mounted() {
    import('fullpage.js/dist/fullpage.extensions.min.js').then((p) => {
      window.fullpage = p;
      this.$_hotelHostess_initFullPage();
    });
    window.addEventListener('mousemove', this.$_hotelHostess_handleMouseMove);
    ga('send', 'pageview');
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.$_hotelHostess_handleMouseMove);
  },
  methods: {
    $_hotelHostess_handleClickGAEvent (label) {
      ga('send', 'event', 'projects', 'click', label, { nonInteraction: false })
    },
    $_hotelHostess_handleMouseMove(e) {
      const left = this.$store.state.viewport[0] / 2 - e.pageX;
      const top = this.$store.state.viewport[1] / 2 - e.pageY;
      document.querySelector('.hotel-hostess__bg.origin').style.transform = `translate(${-left / 100}px, ${-top / 100}px)`;
      document.querySelector('.hotel-hostess__bg.color').style.transform = `translate(${-left / 100}px, ${-top / 100}px)`;
    },
    $_hotelHostess_handleMouseOut() {
      document.querySelector('.hotel-hostess').classList.remove('panning')
    },
    $_hotelHostess_handleMouseOver() {
      document.querySelector('.hotel-hostess').classList.add('panning')
    },
    $_hotelHostess_handleTouchStart(e) {
      if (e.target.classList.contains('item')) {
        e.target.classList.add('touch');
      } else {
        e.target.parentNode.classList.add('touch');
      }
    },
    $_hotelHostess_handleTouchEnd(e) {
      if (e.target.classList.contains('item')) {
        e.target.classList.remove('touch');
      } else {
        e.target.parentNode.classList.remove('touch');
      }
    },
    $_hotelHostess_initFullPage() {
      this.fullpage = new fullpage('#fullpage', {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        autoScrolling: true,
        scrollHorizontally: true,
        controlArrows: false,
        onLeave: (origin, destination, direction) => {
          if (destination.index > 0) {
            document.querySelector('.hotel-hostess').classList.add('panning');
          } else {
            document.querySelector('.hotel-hostess').classList.remove('panning');
          }
        },
      });
    },
    $_hotelHostess_moveDown() {
      fullpage_api.moveSectionDown();
    },
  },
};
</script>
<style lang="stylus" scoped>
  .hotel-hostess
    color #fff
    font-size 16px
    font-style normal
    font-family "source-han-serif-tc", serif
    background-color #000
    &.panning
      .hotel-hostess__bg.color
        opacity 0
        transition opacity 1s
      .credit.mobile
        opacity 0
        visibility hidden
        transition opacity .5s, visibility .5s .5s
    article
      position relative
      z-index 10
      transition transform 1000ms ease
      touch-action none
    &__bg
      position fixed
      top 0
      left 0
      width 100%
      height 100vh
      background-image url(/proj-assets/hotel-hostess/images/bg-color.jpg)
      background-repeat no-repeat
      background-size cover
      background-position 75% 50%
      &.color
        opacity 1
        background-image url(/proj-assets/hotel-hostess/images/bg-color.jpg)
        transition opacity 1s, transform .5s
      &.origin
        background-image url(/proj-assets/hotel-hostess/images/bg-origin.jpg)
        transition transform .5s
  .section
    position relative
    height 100vh
    .heading--mobile
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 85%
      margin 0
      padding 30px 20px
      color #fff
      text-align justify
      line-height 2
      font-weight 500
      letter-spacing 1px
      background-color rgba(0,0,0,.75)
      border-radius 5px
      p
        margin 0
        & + p
          margin-top .5em
      h3
        margin 1em 0 0
        font-size 1.375rem
        font-weight 500
        line-height 1.6
  .heading
    position relative
    top 50%
    color #69d2cd
    text-align center
    letter-spacing 1px
    h1
      margin 10px 0 0
      font-size 3.5rem
      font-weight 700
      letter-spacing 1px
    h2
      margin 0
      font-size 2.25rem
    &--desktop
      display none
  .arrow
    display flex
    flex-direction column
    align-items center
    position absolute
    bottom 20px
    left 50%
    transform translateX(-50%)
    color #cdcccc
    img
      display block
      width 30px
      animation arrow 1s ease-out 1s infinite
    span
      margin-top 20px
  .list
    display flex
    flex-direction column
    height 100%
    padding 90px 10% 5%
    &--desktop
      display none
    > .item
      flex 1
      display flex
      align-items center
      color #69d2cd
      text-decoration none
      font-weight 700
      background-color rgba(0, 0, 0, .75)
      transition background-color .5s, color .5s
      cursor pointer
      &:hover
        color #fff
        background-color rgba(228,0,127,.5)
        span
          &::before
            background-color #fff
      span
        position relative
        margin 20px 0 0 30%
        &::before
          content ''
          position absolute
          top -20px
          left 0
          width 40px
          height 4px
          background-color #69d2cd
      &.touch
        color #fff
        background-color rgba(228,0,127,.5)
        transition background-color .5s
        span
          &::before
            background-color #fff
  .share
    display flex
    justify-content center
    .item
      margin 0
      font-size 0
      & + .item
        margin-left 20px
      img
        width 36px
  .credit
    position fixed
    top 20px
    right 20px
    margin-top 0
    text-align right
    opacity 1
    transition opacity 1s, visibility 0s
    p
      margin 0
      color #cdcccc
      font-size .75rem
      line-height 1.67
      font-weight 700
      text-shadow 1px 1px 2px rgba(0, 0, 0, 0.3)
  .footer
    margin 20px 0 0
    .credit
      display none
      text-align center
      p
        margin 0 auto
        font-size .8rem
        span
          margin-left 10px
        & + p
          margin-top .5em

  @keyframes arrow {
    from {
      transform translateY(-15px)
    }
    to {
      transform translateY(0)
    }
  }

  @media (min-width: 768px)
    .hotel-hostess
      &__bg
        background-position 88% 50%
    .heading
      width 70%
      margin 0 auto
      h1
        font-size 5rem
    .arrow
      bottom 40px
    .section
      p
        width 60%
      .heading--mobile
        width 60%
    .list
      padding 25% 20% 15%
    .footer
      margin-top 40px
      .credit
        p
          font-size 1rem


  @media (min-width: 900px)
    .hotel-hostess
      &__bg
        top -10px
        left -10px
        z-index 10
        width calc(100% + 20px)
        height calc(100vh + 20px)
        background-position 50% 50%
    .section
      &:not(:first-child)
        background-color transparent
    .heading
      display none
      &__arrow
        display flex
        flex-direction column
        align-items center
        color #69d2cd
        img
          display block
          width 30px
          margin-top 20px
          cursor pointer
          animation arrow 1s ease-out 1s infinite
      &--desktop
        display block
        position fixed
        top 50%
        left 0
        z-index 100
        transform translate(40px,-50%)
        width 50%
        text-align left
        h1, h2
          display inline
          margin 0
          color #69d2cd
          text-shadow 1px 1px 2px rgba(0, 0, 0, 0.5)
        h1
          font-size 3.5rem
        h2
          margin-left 15px
          font-size 2rem
        h3
          font-size 1.375rem
          font-weight 500
          letter-spacing 1px
        p
          margin 0
          text-align left
          font-weight 500
          line-height 2
          text-shadow 1px 1px 2px rgba(0, 0, 0, 0.5)
          letter-spacing 1px
          & + p
            margin-top .5em
        p:first-of-type
          margin-top 40px
    .arrow
      display none
    .list
      > .item
        background-color transparent
      &--desktop
        display flex
        position fixed
        top 50%
        right 0
        z-index 100
        transform translate(0, -50%)
        width 260px
        height 400px
        padding 0
    .credit.mobile
      display none
    .footer
      position fixed
      left 20px
      bottom 20px
      z-index 100
      margin 0
      .share
        justify-content flex-start
      .credit
        display block
        position static
        margin-top 20px
        font-weight 700
        p
          font-size .875rem
</style>
