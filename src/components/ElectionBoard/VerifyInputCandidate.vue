<template>
  <div class="input-candidate">
    <div class="input-candidate-container">
      <div class="input-container" v-click-outside="closeList">
        <input v-model.trim="selectedName" type="text" placeholder="請填寫候選人姓名" @focus="openList = true">
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
      <!-- <p v-if="candidate">目前資訊：{{ candidate.name }}</p> -->
      <p>目前資訊：吳沛憶</p>
    </div>
    <!-- <p v-show="hasError" class="error">目前沒有這位候選人的資料</p> -->
  </div>
</template>
<script>
import { get } from 'lodash'

export default {
  name: 'VerifyInputCandidate',
  directives: {
    'click-outside': {
      bind (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },
  props: {
    board: {
      type: Object
    },
    candidate: {
      default: undefined
    },
    candidateAmount: {
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
      selectedId: get(this.selectedCandidates, [ this.index - 1 ], undefined) || undefined,
      selectedName: get(this.board, [ 'candidates', this.index - 1, 'name' ], '') || ''
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
      this.selectedId = get(this.selectedCandidates, [ this.index - 1 ], undefined) || undefined
      this.selectedName = get(this.board, [ 'candidates', this.index - 1, 'name' ], '') || ''
    },
    candidateAmount () {
      this.selectedId = get(this.selectedCandidates, [ this.index - 1 ], undefined) || undefined
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
  beforeMount () {
    const defaultId = get(this.selectedCandidates, [ this.index - 1 ], undefined) || undefined
    if (defaultId) {
      this.$emit('updateSelectedId', defaultId, undefined)
    }
  },
  beforeDestroy () {
    if (this.selectedId) {
      this.$emit('updateSelectedId', undefined, this.selectedId)
    }
  },
  methods: {
    closeList () {
      this.openList = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.input-candidate
  input
    position relative
    z-index 10
    width 100%
    height 32px
    padding 0 0 0 12px
    // text-indent .5em
    line-height 32px
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
    // display flex
    // > *
    //   flex 1
    & > p
      // display inline-block
      // margin-left 10px
      color #a0a0a0
      font-size 0.875rem
      margin-top 10px
      // line-height 1
      @media (min-width 768px)
        font-size 1rem
        margin-top 12px
  .input-container
    position relative
    // max-width calc(50% - 5px)
    & .list
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
      & > p
        padding-left 12px
        height 32px
        display flex
        align-items center
        user-select none
        cursor pointer
        & > span
          margin-left .5em
          font-size .75rem
  .error
    color #fa6e59
    font-size .75rem
</style>
