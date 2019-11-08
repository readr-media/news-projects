<template>
  <div class="ec">
    <picture class="ec__landing">
      <source media="(min-width: 768px)" srcset="/proj-assets/extra-curriculum/landing.webp">
      <source media="(min-width: 768px)" srcset="/proj-assets/extra-curriculum/landing.jpg">
      <source srcset="/proj-assets/extra-curriculum/landing-m.webp" type="image/webp">
      <img src="/proj-assets/extra-curriculum/landing-m.jpg" alt="">
    </picture>
    <main>
      <h2>副標要家海上童以裡定流不一臺</h2>
      <article>
        <p>開孩夫合時票，多林告家、樂班春導客管在、手清以新？月腦長自，務依排面通朋好？一教。</p>
        <p>權比難展命的朋活存把方事比會廣因海行國直國不資熱布定事的，想土房相們我！全超子回包石故們標紅集，觀夜活發業東沒石和升教大是數期也自風長生。</p>
        <figure class="ec__image">
          <h2>可能會有照片</h2>
          <picture>
            <img src="/proj-assets/extra-curriculum/landing.jpg" alt="">
          </picture>
          <figcaption>照片圖說照片圖說</figcaption>
        </figure>
      </article>
      <section class="ec__credit">
        <p>
          <span>credit</span>
          <span>credit</span>
        </p>
      </section>
      <EcSubscription />
      <EcSidebar :class="{ active: openSidebar }" />
    </main>
    <div :class="{ open: openSidebar }" class="btn-sidebar" @click="openSidebar = !openSidebar" />
    
  </div>
</template>
<script>

export default {
  name: 'ExtraCurriculum',
  components: {
    EcSidebar: () => import('./components/EcSidebar.vue'),
    EcSubscription: () => import('./components/EcSubscription.vue')
  },
  metaInfo() {
    return {
      title: 'ExtraCurriculum',
      description: 'ExtraCurriculum',
      metaUrl: 'extra-curriculum',
      metaImage: 'extra-curriculum/og.jpg',
    }
  },
  data () {
    return {
      openSidebar: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.ec
  main
    padding 25px 0 30px
    > *
      width 90%
      margin-left auto
      margin-right auto
    h2
      line-height normal
    article
      margin-top 20px
      > *
        & + *
          margin-top 30px
      picture
        min-height 150px
        background-color #d3d3d3
  picture
    display block
    font-size 0
    img
      width 100%
  h2, p
    color #4a4a4a
  h2
    font-size 1.3125rem
    font-weight 300
  p, figure
    margin 0
  p
    font-size .9375rem
    line-height 1.87
    text-align justify
  &__landing
    width 100%
    height 414px
    margin-top 50px
    img
      width 100%
      height 100%
      object-fit cover
      object-position left center
  &__image
    h2
      margin 0
      text-align center
    picture
      margin-top 10px
      img
        width 100%
    figcaption
      margin-top 10px
      color #4a4a4a
      font-size .875rem
      font-weight 300
      text-align center

  &__credit
    margin-top 30px
    p
      span
        & + span
          margin-left 10px
  
  .btn-sidebar
    display none
    position fixed
    top 50%
    left 0
    z-index 600
    width 25px
    height 50px
    transform translateY(-50%)
    background-image url(/proj-assets/extra-curriculum/menu.svg)
    background-size 25px auto
    background-position-x -2px
    background-repeat no-repeat
    &.open
      background-image url(/proj-assets/extra-curriculum/menu-close.svg)

@media (max-width: 767px)
  .ec
    .btn-sidebar
      display block

// fix header
@media (max-width: 768px)
  .ec
    &__landing
      margin-top 40px

@media (min-width: 768px)
  .ec
    main
      position relative
      padding-left 300px
    &__landing
      height 870px
    &__image
      width 80%
      margin-left auto !important
      margin-right auto !important

@media (min-width: 1024px)
  .ec
    &__landing
      height calc(100vh - 50px)
      img
          object-position left 40%

@media (min-width: 1200px)
  .ec
    main
      padding-left 400px
      > *
        width 80%
</style>