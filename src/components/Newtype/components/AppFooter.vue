<template>
  <section class="footer">
    <div class="projects">
      <iframe src="https://www.mirrormedia.mg/project-list/light?excluding=newtype"  width="100%" frameborder="0" scrolling="no" style="width: 1px; min-width: 100%; *width: 100%;"></iframe>
    </div>
    <div class="fb-comments-container">
      <div class="fb-comments" data-href="https://www.mirrormedia.mg/projects/political-contribution/" data-colorscheme="light" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </div>
  </section>
</template>

<style lang="stylus" scoped>
.footer
  padding 5% 20%
  background-image url(/proj-assets/newtype/images/story1/texture.jpg)
  .projects
    background-color white
    max-width 842px
    min-height 100px
    height 326px
    margin-left auto
    margin-right auto
    margin-bottom 5%
    iframe
      max-width 842px
      height 326px
  .fb-comments-container
    padding 10px
    background-color white

@media (max-width: 767px)
  .footer
    padding 2em 1em
    .projects
      height auto
      iframe
        height auto
</style>
