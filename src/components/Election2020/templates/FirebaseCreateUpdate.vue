<template>
  <section class="firebase-create-template">
    <section>
      <h1>test-collection data:</h1>
      <div>
        <button @click="set">
          set('set' will choose to dispatch either `patch` OR `insert` automatically)
        </button>
        <button @click="patch">
          patch
        </button>
        <button @click="insert">
          insert
        </button>
      </div>
      <div
        v-text="realtimeTest"
      />
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      realtimeTest: state => state.realtimeTest.data
    })
  },
  created() {
    /*
    ** Open realtime data sync channel.
    ** For more info: https://mesqueeb.github.io/vuex-easy-firestore/query-data.html#realtime-updates-opendbchannel
    */
    this.$store.dispatch('realtimeTest/openDBChannel')
  },
  methods: {
    /*
    ** For more info about add and manage data
    ** check: https://mesqueeb.github.io/vuex-easy-firestore/add-and-manage-data.html#basic-usage
    */
    set() {
      const randomInt = Math.floor(Math.random() * Math.floor(1000))

      // 'set' will choose to dispatch either `patch` OR `insert` automatically
      this.$store.dispatch('realtimeTest/set', {
        'test-key': `hello-test-value-${randomInt}`
      })
    },
    patch() {
      const randomInt = Math.floor(Math.random() * Math.floor(1000))
      const id = 'mjcCNQaNHFcfAPJAm7lJ'
      this.$store.dispatch('realtimeTest/patch', {
        id,
        'test-key': `hello-test-value-${randomInt}`
      })
    },
    insert() {
      const randomInt = Math.floor(Math.random() * Math.floor(1000))
      this.$store.dispatch('realtimeTest/insert', {
        'test-key': `hello-test-value-${randomInt}`
      }) 
    }
  }
}
</script>

<style lang="stylus" scoped>
.firebase-create-template
  padding 100px 5%
  white-space pre-wrap // 暫時
  word-break break-word // 暫時
  overflow-wrap break-word // 暫時
  word-wrap break-word // 暫時
  button
    display block
</style>
