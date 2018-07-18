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
    <div class="heading--desktop">
      <div>
        <h1>姐妹</h1>
        <h2>——酒店小姐要副標</h2>
      </div>
      <p>26歲那年，黛西留下丈夫和二個孩子在馬尼拉，展開在苗栗、高雄、杜拜、台北漂泊的生活，和同在異鄉的女工交往，也有了愛情的依靠。</p>
      <div class="heading__arrow">
        <span>滑動以繼續閱讀</span>
        <img
          src="/proj-assets/hotel-hostess/images/arrow.png"
          alt=""
          @click="$_hotelHostess_moveDown">
      </div>
    </div>
    <div class="list list--desktop">
      <a
        href="/project/hotel-hostess-series/questionnaire"
        class="item"
        @touchstart="$_hotelHostess_handleTouchStart"
        @touchend="$_hotelHostess_handleTouchEnd">
        <span>問卷結果</span>
      </a>
      <a
        href=""
        class="item"
        @touchstart="$_hotelHostess_handleTouchStart"
        @touchend="$_hotelHostess_handleTouchEnd">
        <span>情緒勞動</span>
      </a>
      <a
        href="/project/hotel-hostess-series/environment"
        class="item"
        @touchstart="$_hotelHostess_handleTouchStart"
        @touchend="$_hotelHostess_handleTouchEnd">
        <span>工作環境</span>
      </a>
      <a
        href="/project/hotel-hostess-series/case-stories"
        class="item"
        @touchstart="$_hotelHostess_handleTouchStart"
        @touchend="$_hotelHostess_handleTouchEnd">
        <span>個案分享</span>
      </a>
    </div>
    <article id="fullpage">
      <section class="section">
        <div class="heading">
          <h1>姐妹</h1>
          <h2>——酒店小姐要副標</h2>
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
          <p>26歲那年，黛西留下丈夫和二個孩子在馬尼拉，展開在苗栗、高雄、杜拜、台北漂泊的生活，和同在異鄉的女工交往，也有了愛情的依靠。</p>
        </section>
        <section class="section">
          <div class="list">
            <a
              href="/project/hotel-hostess-series/questionnaire"
              class="item"
              @touchstart="$_hotelHostess_handleTouchStart"
              @touchend="$_hotelHostess_handleTouchEnd">
              <span>問卷結果</span>
            </a>
            <a
              href=""
              class="item"
              @touchstart="$_hotelHostess_handleTouchStart"
              @touchend="$_hotelHostess_handleTouchEnd">
              <span>情緒勞動</span>
            </a>
            <a
              href="/project/hotel-hostess-series/environment"
              class="item"
              @touchstart="$_hotelHostess_handleTouchStart"
              @touchend="$_hotelHostess_handleTouchEnd">
              <span>工作環境</span>
            </a>
            <a
              href="/project/hotel-hostess-series/case-stories"
              class="item"
              @touchstart="$_hotelHostess_handleTouchStart"
              @touchend="$_hotelHostess_handleTouchEnd">
              <span>個案分享</span>
            </a>
            <footer class="footer">
              <div class="share">
                <a
                  :href="`https://www.facebook.com/share.php?u=${pageUrl}`"
                  class="item"
                  target="_blank">
                  <img src="/proj-assets/hotel-hostess/images/share-fb.png">
                </a>
                <a
                  :href="`https://line.me/R/msg/text/?${pageUrl}`"
                  class="item"
                  target="_blank">
                  <img src="/proj-assets/hotel-hostess/images/share-line.png">
                </a>
                <a
                  :href="`https://plus.google.com/share?url=${pageUrl}`"
                  class="item"
                  target="_blank">
                  <img src="/proj-assets/hotel-hostess/images/share-gplus.png">
                </a>
              </div>
              <div class="credit">
                credit credit credit
              </div>
            </footer>
          </div>
        </section>
      </template>
      <template v-else>
        <section class="section" />
      </template>
    </article>
    <template v-if="viewportX >= 900">
      <footer class="footer">
        <div class="share">
          <a
            :href="`https://www.facebook.com/share.php?u=${pageUrl}`"
            class="item"
            target="_blank">
            <img src="/proj-assets/hotel-hostess/images/share-fb.png">
          </a>
          <a
            :href="`https://line.me/R/msg/text/?${pageUrl}`"
            class="item"
            target="_blank">
            <img src="/proj-assets/hotel-hostess/images/share-line.png">
          </a>
          <a
            :href="`https://plus.google.com/share?url=${pageUrl}`"
            class="item"
            target="_blank">
            <img src="/proj-assets/hotel-hostess/images/share-gplus.png">
          </a>
        </div>
        <div class="credit">
          credit credit credit
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
      title: '酒店小姐',
      description: '酒店小姐',
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
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.$_hotelHostess_handleMouseMove);
  },
  methods: {
    $_hotelHostess_handleMouseMove(e) {
      const left = this.$store.state.viewport[0] / 2 - e.pageX;
      const top = this.$store.state.viewport[1] / 2 - e.pageY;
      document.querySelector('.hotel-hostess__bg.origin').style.transform = `translate(${-left / 100}px, ${-top / 100}px)`;
      document.querySelector('.hotel-hostess__bg.color').style.transform = `translate(${-left / 100}px, ${-top / 100}px)`;
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
    &:not(:first-child)
      background-color rgba(0,0,0,.75)
    p
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 90%
      margin 0
      color #fff
      text-align justify
      line-height 2
      font-weight 700
  .heading
    position relative
    top 10%
    color #69d2cd
    text-align center
    h1
      margin 0
      font-size 1.8rem
      font-weight 700
    h2
      margin 10px 0 0
      font-size 1.4rem
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
    padding 30% 10% 10%
    &--desktop
      display none
    > .item
      flex 1
      display flex
      align-items center
      color #69d2cd
      text-decoration none
      font-weight 700
      background-color #000
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
          width 66.6%
          height 4px
          background-color #69d2cd
      &.touch
        color #fff
        background-color rgba(228,0,127,.5)
        transition background-color .5s
        span
          &::before
            background-color #fff

  .footer
    margin 40px 0 0
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
      margin-top 20px

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
    .arrow
      bottom 40px
    .section
      p
        width 60%
    .list
      padding 30% 20% 20%
    .footer
      .credit
        margin-top 40px

  @media (min-width: 900px)
    .hotel-hostess
      &.panning
        .heading--desktop
          transform translate(40px,-50%)
          text-align left
          .heading__arrow
            visibility hidden
        .list--desktop
          transform translate(0, -50%)
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
        top 60%
        left 0
        z-index 100
        transform translate(calc(50vw - 50%), -50%)
        width 50%
        transition transform 1s
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
        p
          margin 40px 0
          text-align left
          line-height 2
          text-shadow 1px 1px 2px rgba(0, 0, 0, 0.5)
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
        transform translate(100%, -50%)
        width 260px
        height 360px
        padding 0
        transition transform 1s
    .footer
      position fixed
      left 20px
      bottom 20px
      z-index 100
      margin 0
      .share
        justify-content flex-start
      .credit
        margin-top 20px
        color #165855
        font-weight 700
</style>
