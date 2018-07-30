import module from 'src/store/modules/PoliticalContribution'

export default {
  created () {
    this.$store.registerModule('PoliticalContribution', module)
  },
  destroyed () {
    this.$store.unregisterModule('PoliticalContribution')
  },
}