<template>
  <div class="related-footer">
    <div class="related-footer__projects">
      <iframe src="https://www.mirrormedia.mg/project-list/light?excluding=president-promise"  width="100%" frameborder="0" scrolling="no" style="width: 1px; min-width: 100%; *width: 100%; height: 100%"></iframe>
    </div>
    <div class="related-footer__facebook">
      <div class="fb-comments" :data-href="commentsUrl" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </div>
  </div>
</template>

<script>
import { READR_DOMAIN, } from '../../../constants'
import { currEnv } from '../../../util/comm'

export default {
  data () {
    return {
      commentsUrl: `https://dev.${READR_DOMAIN}/project/president-promise/`,
    }
  },
  mounted () {
    if (currEnv() === 'prod') {
      this.commentsUrl = `https://www.${READR_DOMAIN}/project/president-promise/`
    }
  }
}
</script>


<style lang="stylus" scoped>
.related-footer
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 100px 0
  &__projects
    width 760px
    height 300px
    background-color white
  &__facebook
    margin 50px 0 0 0
    width 760px

@media (max-width 425px)
  .related-footer
    padding 50px 20px
    &__projects
      width 100%
      height 380px
    &__facebook
      margin 25px 0 0 0
      width 100%
</style>

