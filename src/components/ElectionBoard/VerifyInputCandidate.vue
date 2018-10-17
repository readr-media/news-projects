<template>
  <div class="input-candidate">
    <div class="input-candidate-container">
      <div class="input-container">
        <input v-model.trim="selectedName" type="text" placeholder="候選人名字" @blur="openList = false" @focus="openList = true">
        <div class="list" :class="{ open: openList }">
          <p
            v-for="item in candidatesForList"
            :key="item.uid"
            @click="selectedName = item.name">
            {{ item.name }}
            <span v-text="item.county"></span>
          </p>
        </div>
      </div>
      <p v-if="candidate">目前資訊：{{ candidate.name }}</p>
    </div>
    <!-- <p v-show="hasError" class="error">目前沒有這位候選人的資料</p> -->
  </div>
</template>
<script>
import { get, } from 'lodash'

export default {
  name: 'VerifyInputCandidate',
  props: {
    board: {
      type: Object
    },
    candidate: {
      default: undefined
    },
    candidates: {
      type: Array,
    },
    index: {
      type: Number,
    },
    selectedCandidates: {
      type: Array,
    }
  },
  data () {
    return {
      candidatesForList: [],
      openList: false,
      selectedId: undefined,
      selectedName: ''
    }
  },
  computed: {
    candidatesFiltered () {
      return this.candidates.filter(item => !this.selectedCandidatesWithoutSelf.includes(item.id))
    },
    // hasError () {
    //   return this.selectedName && !this.selectedId
    // },
    selectedCandidatesWithoutSelf () {
      return this.selectedCandidates.filter(id => id !== this.selectedId)
    },
  },
  watch: {
    board () {
      this.candidatesForList = []
      this.openList = false
      this.selectedId = undefined
      this.selectedName = get(this.board, [ 'candidates', this.index - 1, 'name' ], '') || ''
    },
    // hasError (value) {
    //   this.$emit('updateInputError', this.index, value)
    // },
    selectedId (newValue, oldValue) {
      this.$emit('updateSelectedId', newValue, oldValue)
    },
    selectedName (value) {
      const keyword = value.trim()
      const regex = new RegExp(`${keyword}`)
      const candidate = this.candidatesFiltered.find(candidate => candidate.name === keyword)
      const matchedCandidates = this.candidatesFiltered.filter(candidate => {
        return candidate.name.match(regex) && (candidate.name !== keyword)
      })
      this.candidatesForList = []
      this.selectedId = undefined
      if (candidate) {
        this.selectedId = candidate.id
      }
      if (value.trim() && matchedCandidates.length > 0) {
        this.candidatesForList = matchedCandidates
        this.openList = true
      } else {
        this.openList = false
      }
    }
  },
  mounted () {
    this.selectedName = get(this.board, [ 'candidates', this.index - 1, 'name' ], '') || ''
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.input-candidate
  input
    position relative
    z-index 10
    width 100%
    height 30px
    padding 0
    text-indent .5em
    line-height 30px
    background-color #a0a0a0
    border none
    border-radius 2px
    -webkit-appearance none
    -moz-appearance none
    appearance none
    &::-webkit-input-placeholder
      font-size 1rem
      color #4c4c4c
  
  &-container
    display flex
    > *
      flex 1
    > p
      display inline-block
      margin-left 10px
      color #fff
  .input-container
    position relative
    max-width calc(50% - 5px)
    .list
      position absolute
      top 30px
      left 0
      z-index 500
      width 100%
      max-height 150px
      background-color rgba(160, 160, 160, .95)
      box-shadow 0px 2px 9px 1px rgba(0, 0, 0, .3)
      overflow-y auto
      visibility hidden
      &.open
        visibility visible
      > p
        padding-left .5em
        line-height 30px
        user-select none
        cursor pointer
        > span
          margin-left .5em
          font-size .75rem
  .error
    color #fa6e59
    font-size .75rem
    
</style>
