<template>
  <footer class="rich-footer">
    <img
      class="rich-footer__square-word square-word"
      src="/proj-assets/china-company/發.svg"
      alt=""
    >
    <div class="rich-footer__banner banner">
      <div
        class="banner-mobile"
      >
        <a
          v-show="currentCatalog !== '0'"
          :href="`#h2-${Number(currentCatalog) - 1}`"
        >
          <img
            class="banner-mobile__arrow banner-mobile__arrow--left"
            src="/proj-assets/china-company/arrow.png"
            alt=""
          >
        </a>
        <p
          class="banner-mobile__current-catalog"
          v-text="currentCatalogTitle"
        />
        <a
          v-show="currentCatalog !== '7'"
          :href="`#h2-${Number(currentCatalog) + 1}`"
        >
          <img
            class="banner-mobile__arrow banner-mobile__arrow--right"
            src="/proj-assets/china-company/arrow.png"
            alt=""
          >
        </a>
      </div>
    </div>
    <img
      class="rich-footer__square-word square-word"
      src="/proj-assets/china-company/財.svg"
      alt=""
    >
    <div class="rich-footer__catalog-wrapper catalog-wrapper">
      <img
        class="catalog-wrapper__img"
        src="/proj-assets/china-company/索引bg.png"
        alt=""
      >
      <nav
        class="catalog-wrapper__catalog catalog"
      >
        <ol class="catalog__list catalog__list--left">
          <li>
            <a href="#h2-0">誰領中國補助款</a>
          </li>
          <li>
            <a href="#h2-1">旺旺至中國插旗</a>
          </li>
          <li>
            <a href="#h2-2">富士康的重要性</a>
          </li>
          <li>
            <a href="#h2-3">為什麼要給補助款</a>
          </li>
        </ol>
        <ol class="catalog__list catalog__list--right">
          <li>
            <a href="#h2-4">領中國補助的隱憂</a>
          </li>
          <li>
            <a href="#h2-5">香港也受中資影響</a>
          </li>
          <li>
            <a href="#h2-6">官方擴大讓利對象</a>
          </li>
          <li>
            <a href="#h2-7">臺灣青年的中國夢</a>
          </li>
        </ol>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      currentCatalog: '0',
      currentCatalogTitle: '誰領中國補助款',
      catalogTitles: [
        '誰領中國補助款',
        '旺旺至中國插旗',
        '富士康的重要性',
        '為什麼要給補助款',
        '領中國補助的隱憂',
        '香港也受中資影響',
        '官方擴大讓利對象',
        '臺灣青年的中國夢'
      ]
    }
  },
  mounted () {
    // This is mobile only feature
    this.initIntersectionObserver()
  },
  methods: {
    initIntersectionObserver () {
      require('intersection-observer')

      const options = {
        root: document.querySelector('#china-company'),
        rootMargin: '-75px 0px 0px 0px',
        threshold: 0
      }

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          // Each entry describes an intersection change for one observed
          // target element:
          //   entry.boundingClientRect
          //   entry.intersectionRatio
          //   entry.intersectionRect
          //   entry.isIntersecting
          //   entry.rootBounds
          //   entry.target
          //   entry.time
          const step = entry.target.dataset.step
          if (entry.isIntersecting) {
            this.currentCatalog = step
            const h2 = entry.target.querySelector('h2')
            const anchorTitle = h2.dataset.anchorTitle
            this.currentCatalogTitle = anchorTitle
          }
          // } else if (step === '1' && this.currentCatalog === '1') {
          //   this.currentCatalog === '0'
          //   this.currentCatalogTitle === ''
          // }
        })
      }, options)

      const targets = document.querySelectorAll('.article-subsection')
      targets.forEach(target => { observer.observe(target) })
    }
  }
}
</script>

<style lang="stylus" scoped>
.rich-footer
  z-index 10000
  display flex
  align-items center
  // background linear-gradient(to bottom, transparent 50%, #e9dbb6 50%)
  &__square-word
    height 54px
  &__banner
    flex 1 1 auto 
    background-color #000537
    height 54px 
    // margin 0 5px
    z-index 10000
  &__catalog-wrapper
    position absolute
    right 74px
    bottom 34px
    z-index 10000

.banner-mobile
  display none

.catalog-wrapper
  width 550px
  pointer-events none
  &__img
    width 100%
  &__catalog
    position absolute
    top 80px
    left 110px
    // width 200px
    // height 50px
    // border 1px solid red

.catalog
  pointer-events auto
  display flex
  &__list
    list-style none
    margin 0
    padding 0
    li
      a
        font-size 20px
        color white
        text-decoration none
        line-height 2
    &--right
      margin 80px 0 0 20px


@media (max-width 1400px)
  .rich-footer
    background linear-gradient(to bottom, transparent 50%, #e9dbb6 50%)
    &__square-word
      height 50px
    &__banner
      height 30px
    &__catalog-wrapper  
      display none
  
  .banner-mobile
    padding 6px
    width 100%
    height 100%
    display flex
    align-items center
    &__arrow
      width 20px
      height 14px
      &--right
        transform rotate(180deg)
    &__current-catalog
      margin 0 5px
      color white
      flex 1 1 auto 
      width 0
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      text-align center
</style>
