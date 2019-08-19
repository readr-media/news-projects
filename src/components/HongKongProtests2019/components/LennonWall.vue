<template>
  <div>
    LennonWall
  </div>
</template>
<script>

export default {
  name: 'LennonWall',
  serverPrefetch () {
    return this.$store.dispatch('HongKongProtests/FETCH_MESSAGES', { stateName: 'messages', range: '連儂牆留言板!A:D' })
  },
  computed: {
    messages () {
      return this.$store.state.HongKongProtests.spreadsheet.messages
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
