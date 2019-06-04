import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('ElectionNews')

export default {
  computed: {
    ...mapState({
      keywordsEN: state => state.keywordsEN
    })
  },
  methods: {
    getKeywordLocale (keyword) {
      return this.$i18n.locale === 'en' ? this.keywordsEN[keyword] : keyword
    }
  }
}