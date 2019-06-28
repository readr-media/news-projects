<template>
  <footer class="rich-footer">
    <img
      class="rich-footer__square-word square-word"
      src="/proj-assets/china-company/發.svg"
      alt=""
    >
    <div class="rich-footer__banner banner">
      <div
        v-show="currentCatalog !== '0'"
        class="banner-mobile"
      >
        <a
          v-show="currentCatalog !== '1'"
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
        class="catalog-wrapper__catalog"
      >
        <a href="#h2-3">測試索引：「補助款」只是金錢補助，還是有政治意圖？</a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      currentCatalog: '0',
      currentCatalogTitle: ''
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
        rootMargin: '-65px 0px 0px 0px',
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
            if (h2) {
              const title = h2.querySelector('span').innerText
              this.currentCatalogTitle = title
            } else {
              this.currentCatalogTitle = ''
            }
          } else if (step === '1' && this.currentCatalog === '1') {
            this.currentCatalog === '0'
            this.currentCatalogTitle === ''
          }
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
  background linear-gradient(to bottom, transparent 50%, #e9dbb6 50%)
  &__square-word
    height 85px
  &__banner
    flex 1 1 auto 
    background-color #000537
    height 40px 
    margin 0 5px
    z-index 10000
  &__catalog-wrapper
    position absolute
    right 74px
    bottom calc(40px + (85px - 40px) / 2 - 5px)
    z-index 9999

.banner-mobile
  display none

.catalog-wrapper
  width 550px
  pointer-events none
  &__img
    width 100%
  &__catalog
    position absolute
    top 50px
    left 100px
    width 200px
    height 50px
    // border 1px solid red
    pointer-events auto

@media (max-width 1400px)
  .rich-footer
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
</style>
