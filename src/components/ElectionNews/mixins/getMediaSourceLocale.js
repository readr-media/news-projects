import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('ElectionNews')

export default {
  computed: {
    ...mapState({
      mediaSourcesEN: state => state.mediaSourcesEN
    })
  },
  methods: {
    getMediaSourceLocale (source) {
      return this.$i18n.locale === 'en' ? this.mediaSourcesEN[source] : source
    }
  }
}