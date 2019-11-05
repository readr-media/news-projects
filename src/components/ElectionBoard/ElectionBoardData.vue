<template>
  <section :class="{ 'no-scroll': candidate }" class="eb-data">
    <h1>看板<span class="title--upload">追</span><span class="title--verify">追</span><span class="title--data">追</span>{{ is2018 ? '' : ' 2.0' }}</h1>
    <h2>{{ intro }}</h2>
    <FormSelectPosition
      :address="address"
      class="eb-data__select-pos"
      @updateAddressForData="updateAddressForData"
    />
    <div class="eb-data__select-type">
      <select v-model="type" v-if="is2018">
        <option value="mayors">縣 / 市長</option>
        <option value="councilors">縣 / 市議員</option>
      </select>
      <select v-model="type" v-else>
        <option value="presidents">總統</option>
        <option value="legislators">立法委員</option>
      </select>
    </div>
    <div class="eb-data__year-title">
      <p>{{ is2018 ? '2018' : '2020' }} 看板</p>
      <a :href="`/project/election-board/data${is2018 ? '' : '-2018'}`" target="_blank">看 {{ is2018 ? '2020' : '2018' }} 看板資料</a>
    </div>
    <template v-for="item in candidates">
      <router-link :key="item.uid" :to="`/project/election-board/data${is2018 ? '-2018' : ''}?candidate=${item.name}`" class="data-candidate" @click.native="sendGA(item.name)">
        <img :src="`https://www.readr.tw${getBoardImage(item)}`" alt="">
        <div class="data-candidate__info">
          <h2 v-text="item.name"></h2>
          <p>目前看板資料：{{ item.verified_board_amount || 0 }} 筆</p>
          <p>目前未驗證看板資料：{{ item.unverified_board_amount || 0 }} 筆</p>
        </div>
      </router-link>
    </template>
    <router-link v-show="!loading && candidates.length < 1" to="/project/election-board/upload" class="message">目前沒有候選人有看板資訊，你有看板照想上傳嗎？（點擊到上傳頁面）</router-link>
    <p v-show="loading" class="message">讀取資料中，請稍候⋯</p>
    <DataBoards v-if="candidate" :candidate="candidate"/>
    <ElectionBoardBackBtn />
  </section>
</template>
<script>
import DataBoards from './DataBoards.vue'
import ElectionBoardBackBtn from './ElectionBoardBackBtn.vue'
import FormSelectPosition from './FormSelectPosition.vue'
import { get as _get } from 'lodash'
import { get as axiosGet } from 'axios'

const DEFAULT_PAGE = 1

const REGEX_ADDRESS = /(\D+[縣市])(\D+?(市區|鎮區|鎮市|[鄉鎮市區]))/

const fetchElections = (store, year = 2018) => {
  return store.dispatch('ElectionBoard/FETCH_ELECTIONS', year)
}

const fetchCandidates = (store, {
  county,
  electionYear = 2020,
  page = DEFAULT_PAGE,
  type = 'presidents'
} = {}) => {
  return store.dispatch('ElectionBoard/FETCH_CANDIDATES', {
    county,
    electionYear,
    page,
    type,
    // 被驗證過 3 次
    verifiedAmount: 3,
    // 驗證為「不是看板」少於 2 次
    notBoardAmount: 2
  }).then((res) => {
    if (res.next) return fetchCandidates(store, { county, type, electionYear, page: (page + 1) })
  })
}

const fetchPolitiContrib = ({ dispatch }) => {
  return dispatch('ElectionBoard/FETCH_POLITI_CONTRIB')
}

export default {
  name: 'ElectionBoardData',
  props: [ 'reload' ],
  data () {
    return {
      address: '台北市信義區',
      type: 'presidents',
      loading: true,
      is2018: false,
      fetchedData: []
    }
  },
  components: {
    DataBoards,
    ElectionBoardBackBtn,
    FormSelectPosition
  },
  mounted () {
    this.is2018 = this.$route.params.params.includes('2018')
    if (this.is2018) this.type = 'mayors'
    const electionYear = (this.is2018 ? 2018 : 2020)
    this.fetchedData = (electionYear === 2018 ?
      [
        fetchElections(this.$store),
        fetchCandidates(this.$store, { type: 'mayors', county: '台北市', electionYear }),
        fetchCandidates(this.$store, { type: 'councilors', county: '台北市', electionYear }),
        fetchPolitiContrib(this.$store)
      ]
      :
      [
        fetchCandidates(this.$store, { electionYear }),
        fetchCandidates(this.$store, { type: 'legislators', county: '全國,台北市', electionYear })
      ]
    )
    Promise.all(this.fetchedData)
    .then(() => {
      this.loading = false
    })
    .catch(() => {
      this.loading = false
    })
  },
  computed: {
    intro () {
      return (this.is2018 ?
        '「看板追追追」計畫邀請鄉民一起為選舉留下紀錄，為催生選舉廣告管理制度提供初步的想像。我們發現，2018 年至少有 60 位候選人的看板經費不是由政治獻金專戶支付，是現行制度下無法追蹤的金流。'
        :
        '每到選舉期間，大街小巷冒出的宣傳看板已經成為台灣的獨特風景。「看板追追追」計畫邀請你一起為此次選舉留下紀錄，為催生選舉廣告管理制度提供初步的想像。')
    },
    candidate () {
      return this.candidates.find((candidate) => candidate.name === this.$route.query.candidate)
    },
    candidates () {
      const data = this.$store.state.ElectionBoard.candidates
      switch (this.type) {
        case 'presidents':
          return data.presidents.filter((candidate) => candidate.boards.coordinates || candidate.boards[0])
          break
        case 'legislators':
          return data.legislators
            .filter((legis) => legis.district.match(new RegExp(`${this.district}|全國`)))
            .filter((candidate) => (candidate.boards.coordinates || candidate.boards[0]))
          break
        case 'mayors':
          return data.mayors.filter(candidate => (candidate.boards.coordinates || candidate.boards[0]))
          break
        case 'councilors':
          const regions = _get(this.$store, [ 'state', 'ElectionBoard', 'elections', this.county, 'regions' ], [])
          const constituency = regions
            .filter((region) => region.district.match(new RegExp(`${this.district}|原住民`)))
            .map((region) => region.constituency) || []
          return data.councilors
            .filter(councilor => constituency.includes(councilor.constituency))
            .filter(candidate => (candidate.boards.coordinates || candidate.boards[0]))
          break
        default:
          break
      }
    },
    county () {
      if (this.address.match(REGEX_ADDRESS) && this.address.match(REGEX_ADDRESS).length > 1) {
        return this.address.match(REGEX_ADDRESS)[1].replace('台', '臺')
      }
      return ''
    },
    district () {
      if (this.address.match(REGEX_ADDRESS) && this.address.match(REGEX_ADDRESS).length > 2) {
        const matched = this.address.match(REGEX_ADDRESS)[2]
        return matched.substring(0, matched.length - 1)
      }
      return ''
    },
    politiContribs () {
      return this.$store.state.ElectionBoard.politiContribs
    }
  },
  watch: {
    county (val) {
      this.loading = true
      const electionYear = this.is2018 ? 2018 : 2020
      if (electionYear === 2018) {
        this.fetchedData = [
          fetchCandidates(this.$store, { type: 'mayors', county: val, electionYear }),
          fetchCandidates(this.$store, { type: 'councilors', county: val, electionYear }),
        ]
      } else {
        this.fetchedData = [
          fetchCandidates(this.$store, { type: 'legislators', county: `全國,${val}`, electionYear })
        ]
      }
      Promise.all(this.fetchedData)
      .then(() => {
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
    }
  },
  methods: {
    getBoardImage (candidate) {
      if (candidate.boards[0]) {
        return candidate.boards[0].image
      }
      return candidate.boards.image
    },
    sendGA (value) {
      window.ga('send', 'event', 'projects', 'click', `go board list ${value}`)
    },
    updateAddressForData (value) {
      this.address = value
    }
  }
}
</script>

<style lang="stylus" scoped>
color-upload = #fa6e59
color-verify = #ffdb5c
color-data = #4897db

.eb-data
  position relative
  min-height 100vh
  padding 60px 25px
  background-color #000
  &__year-title
    margin-top 20px
    display flex
    justify-content space-between
    align-items center
    @media (min-width 768px)
      margin-top 30px
    & p
      font-size 1.25rem
      font-weight 600
    & a
      color color-data
      text-decoration underline
  &.no-scroll
    position fixed
    overflow hidden
  & h1, & h2, & p
    margin 0
    color #fff
  & h1
    font-size 2.25rem
    font-weight 700
    line-height 1
    margin-bottom 20px
    @media (min-width 768px)
      margin-bottom 40px
    .title--upload
      color color-upload
    .title--verify
      color color-verify
    .title--data
      color color-data
  & > h2
    font-size 1rem
    font-weight 400
    text-align justify
    margin-bottom 25px
    line-height 1.8
  &__select-type
    position relative
    width 100%
    margin-top 10px
    background-color #a0a0a0
    border-radius 2px
    &.open
      &::after
        transform rotate(180deg)
    &::after
      content ''
      position absolute
      top 0
      right 0
      width 30px
      height 30px
      background-image url(/proj-assets/election-board/images/filter.png)
      background-size 16px auto
      background-position center center
      background-repeat no-repeat
      transition transform .5s
    & select
      position relative
      z-index 10
      width 100%
      height 32px
      padding 0 0 0 12px
      background-color transparent
      border none
      appearance none
  .message
    display inline-block
    width 100%
    margin-top 20px
    color #a0a0a0
    line-height 1.4
  & .data-candidate
    display flex
    margin-top 20px
    text-decoration none
    > img
      width 90px
      height 90px
      background-color #a0a0a0
      object-fit cover
      object-position center center
      border-radius 1px
    &__info
      margin-left 15px
      & h2
        font-size 1rem
        margin-bottom 8px
        font-weight 700
        @media (min-width 768px)
          margin-bottom 20px
      & p
        color #a0a0a0
        font-size .875rem
        line-height 1.64

@media (min-width: 768px)
  .eb-data
    padding 60px calc((100% - 450px) / 2)
    &__select-pos
      margin-top 30px
    .data-candidate
      > img
        width 120px
        height 120px
      &__info
        margin-left 25px
        h2
          font-size 1.25rem
        p
          font-size 1rem
</style>
