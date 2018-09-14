<template>
  <section :class="{ 'no-scroll': candidate }" class="eb-data">
    <h1>看板<span class="title--upload">追</span><span class="title--verify">追</span><span class="title--data">追</span></h1>
    <h2>本月初，在新莊區掛上第一面特色看板的蘇貞昌，有別於以往傳統參選人看板，雙手叉腰，並以「背面」示人，光以其招牌「禿頭」特色，就足具辨識度，一度成為民眾熱門打卡點。</h2>
    <FormSelectPosition :address="address" class="eb-data__select-pos" @updateCounty="updateCounty"/>
    <div class="eb-data__select-type">
      <select v-model="type" >
        <option value="mayors">市長</option>
        <option value="councilors">議員</option>
      </select>
    </div>
    <template v-for="item in candidates">
      <router-link :key="item.uid" :to="`/project/election-board/data?candidate=${item.name}`" class="data-candidate">
        <img src="" alt="">
        <div class="data-candidate__info">
          <h2 v-text="item.name"></h2>
          <p>目前看板資料：{{ item.boardsVerifiedAmount || 0 }}筆</p>
          <p>目前未驗證看板資料：{{ item.boardsUnverifiedAmount || 0 }} 筆</p>
        </div>
      </router-link>
    </template>
    <DataBoards v-if="candidate"/>
  </section>
</template>
<script>
import DataBoards from './DataBoards.vue'
import FormSelectPosition from './FormSelectPosition.vue'

const DEFAULT_PAGE = 1

const fetchCandidates = (store, {
  county = '台北市',
  page = DEFAULT_PAGE,
  type = 'mayors'
} = {}) => {
  store.dispatch('ElectionBoard/FETCH_CANDIDATES', {
    county: county,
    electionYear: 2018,
    page: page,
    type: type
  }).then(res => {
    if (res.next) {
      fetchCandidates(store, { county, type, page: page + 1 })
    }
    return res
  }).catch(err => err)
}

export default {
  name: 'ElectionBoardData',
  data () {
    return {
      address: '台北市信義區',
      type: 'mayors'
    }
  },
  components: {
    DataBoards,
    FormSelectPosition
  },
  computed: {
    candidate () {
      return this.$route.query.candidate
    },
    candidates () {
      if (this.type === 'mayors') {
        return this.$store.state.ElectionBoard.candidates.mayors
      } else {
        const regex = new RegExp(`${this.district}`)
        const councilors = this.$store.state.ElectionBoard.candidates.councilors || []
        const candidates = councilors.filter(councilor => councilor.district.match(regex))
        return candidates
      }
    },
    district () {
      const regex = /市(.*?)區/
      if (this.address.match(regex)) {
        return this.address.match(regex)[1]
      }
      return ''
    }
  },
  beforeMount () {
    fetchCandidates(this.$store)
    fetchCandidates(this.$store, { type: 'councilors' })
  },
  methods: {
    updateCounty (value) {
      console.log('updateCounty', value)
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
  &.no-scroll
    position fixed
    overflow hidden
  h1, h2, p
    margin 0
    color #fff
  h1
    font-size 2.25rem
    font-weight 500
    .title--upload
      color color-upload
    .title--verify
      color color-verify
    .title--data
      color color-data
  h2
    font-size 1rem
    font-weight 300
    text-align justify
  &__select-pos
    margin-top 1em
  &__select-type
    position relative
    width 100%
    margin-top .5em
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
    select
      position relative
      z-index 10
      width 100%
      height 30px
      padding 0
      text-indent .5em
      background-color transparent
      border none
      -webkit-appearance none
      -moz-appearance none
      appearance none
  .data-candidate
    display flex
    margin-top 25px
    > img
      width 90px
      height 90px
      background-color #a0a0a0
    &__info
      flex 1
      margin-left 15px
      h2
        margin-bottom .2em
      p
        color #a0a0a0
        font-size .875rem

@media (min-width: 768px)
  .eb-data
    padding 60px calc((100% - 450px) / 2)
    > h2
      margin-top 40px
    &__select-pos
      margin 50px 0 40px 0
    
    .data-candidate
      > img
        width 120px
        height 120px
      &__info
        margin-left 25px
        h2
          margin-bottom 1em
          font-size 1.25rem
        p
          font-size 1rem
</style>
