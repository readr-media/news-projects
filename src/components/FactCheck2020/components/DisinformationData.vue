<template>
  <div class="d-data">
    <p>在此你可以自行選擇想要看的候選人和查核結果，看看他們說了什麼話，哪些是真、哪些是假。</p>
    <DisinformationDataSelector
      :authenticity.sync="authenticity"
      :candidate.sync="candidate"
    />
    <DisinformationDataList
      :class="{ switching: switchLoading }"
      :data="verifiedDataFormated"
    >
      <template v-slot:loadMore>
        <button
          v-if="viewportWidth < 1024 && hasMore"
          v-show="!loading"
          class="load-more"
          @click="loadmore"
        >
          載入更多
        </button>
      </template>
      <template v-slot:pagination>
        <DisinformationDataPagination
          :count="count"
          @pageTo="updateDataList"
        />
      </template>
    </DisinformationDataList>
  </div>
</template>
<script>
import DisinformationDataList from './DisinformationDataList.vue'
import DisinformationDataPagination from './DisinformationDataPagination.vue'
import DisinformationDataSelector from './DisinformationDataSelector.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapState } = createNamespacedHelpers('FactCheck')

export default {
  name: 'DisinformationData',
  components: {
    DisinformationDataList,
    DisinformationDataPagination,
    DisinformationDataSelector
  },
  props: {
    switchLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      authenticity: '',
      candidate: ''
    }
  },
  computed: {
    ...mapState({
      loading: state => state.dataListLoading
    }),
    ...mapGetters({
      count: 'verifiedDataCountFormated',
      verifiedDataFormated: 'verifiedDataFormated'
    }),
    currentCount () {
      return this.verifiedDataFormated.length
    },
    hasMore () {
      return this.currentCount > 0 && this.currentCount < this.count
    },
    viewportWidth () {
      return this.$store.state.viewport[0] || 0
    }
  },
  watch: {
    authenticity (value) {
      this.$emit('updateDataList', { authenticity: value, candidate: this.candidate })
    },
    candidate (value) {
      this.$emit('updateDataList', { authenticity: this.authenticity, candidate: value })
    }
  },
  methods: {
    loadmore () {
      this.$emit('updateDataList', {
        authenticity: this.authenticity,
        candidate: this.candidate,
        isLoadMore: true
      })
    },
    updateDataList (page) {
      this.$emit('updateDataList', {
        authenticity: this.authenticity,
        candidate: this.candidate,
        page
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.d-data
  p
    line-height 1.5
  .data-selector
    margin-top 20px
  .data-list
    margin-top 35px

@media (min-width: 1024px)
  .d-data
    position relative
    > p
      width calc(100% - 350px)
      margin 0 0 0 auto
    .data-selector
      position absolute
      top 0
      left 0
      width 300px
      margin 0
    .data-list
      width calc(100% - 350px)
      margin-left auto
      margin-right 0
    .pagination
      margin-top 30px
      text-align center
    
</style>
