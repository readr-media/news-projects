<template>
  <section class="firebase-read-template">
    <section>
      <h1>即時開票資料：總統</h1>
      <div
        v-text="realtimeDataPresidents"
      />
    </section>
    <section>
      <h1>即時開票資料：區域立委</h1>
      <div
        v-text="realtimeRegionalLegislators"
      />
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      realtimeDataPresidents: state => state.realtimePresidents.data,
      realtimeRegionalLegislators: state => state.realtimeRegionalLegislators.data
    })
  },
  created() {
    /*
    ** Open realtime data sync channel.
    ** For more info: https://mesqueeb.github.io/vuex-easy-firestore/query-data.html#realtime-updates-opendbchannel
    */
    this.$store.dispatch('realtimePresidents/openDBChannel')
    this.$store.dispatch('realtimeRegionalLegislators/openDBChannel')
  }
}
</script>

<style lang="stylus" scoped>
.firebase-read-template
  padding 100px 5%
  white-space pre-wrap // 暫時
  word-break break-word // 暫時
  overflow-wrap break-word // 暫時
  word-wrap break-word // 暫時
</style>
