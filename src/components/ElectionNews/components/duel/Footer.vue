<template>
  <footer class="footer">
    <div class="footer__dropdowns">
      <Dropdown
        :position="'left'"
        :atFooter="true"
        :keyword="keywords[0]"
      />
      <Dropdown
        :position="'right'"
        :atFooter="true"
        :keyword="keywords[1]"
      />
    </div>
    <div class="footer__to-single">
      <div
        class="button"
        @click="navigate({ param: '韓國瑜', subparam: '' })"
        ga-on="click"
        ga-event-category="projects"
        ga-event-action="click"
        ga-event-label="sigle keyword button"
      >
        看其它關鍵字風向
      </div>
    </div>
  </footer>
</template>

<script>
import Dropdown from './Dropdown.vue'

export default {
  components: {
    Dropdown
  },
  computed: {
    keywords () {
      const { params = '', subparams = '' } = this.$route.params
      return [ params, subparams ]
    }
  },
  methods: {
    navigate ({ param = '', subparam = '' }) {
      this.$router.navigate({ param, subparam, query: this.$i18n.locale === 'en' ? '?locale=en' : '' })
    },
  }
}
</script>

<style lang="stylus" scoped>
.footer
  &__dropdowns
    display flex
    justify-content space-between
    align-items center
  &__to-single
    margin 10px 0 0 0

.button
  height 20px
  color #4a4a4a
  font-size 10px
  border 1px solid #999999
  display flex
  justify-content center
  align-items center
  cursor pointer
  -webkit-tap-highlight-color transparent

@media (min-width 1024px)
  .footer
    &__to-single
      margin 30px 0 0 0
  .button
    height 30px
    font-size 14px
</style>