<template>
  <section class="ec-s-d">
    <div class="filter">
      <p>我要查詢</p>
      <div class="filter__two-col">
        <div class="select">
          <select v-model="county">
            <option value="" selected disabled hidden>縣市</option>
            <option
              v-for="county in counties"
              :key="county"
              :value="county"
              v-text="county"
            />
          </select>
        </div>
        <div class="select">
          <select v-model="district">
            <option value="" selected disabled hidden>鄉鎮市區</option>
            <option
              v-for="district in districts"
              :key="district"
              :value="district"
              v-text="district"
            />
          </select>
        </div>
      </div>
      <div class="select">
        <select v-model="school">
          <option value="" selected disabled hidden>學校名稱</option>
          <option
            v-for="school in schools"
            :key="school"
            :value="school"
            v-text="school"
          />
        </select>
      </div>
      <p>的晨光時間</p>
    </div>
    <div class="info">
      <img v-lazy="'/proj-assets/extra-curriculum/clock.png'" alt="">
      <div class="info__content">
        <p class="heading">
          <span v-text="county"/> 
          <span v-text="district"/> 
          <span v-text="school"/>
          <template v-if="get(schoolSelected, 'hasGroup')">
            <span>，晨光時間<strong>{{ schoolSelected.hasGroup === 'Y' ? '有' : '無' }}</strong>校外團體</span>
          </template>
        </p>
        <p>
          <template v-if="get(schoolSelected, 'group')">
            <span>團體是</span><span v-text="schoolSelected.group" />
          </template>
          <template v-if="get(schoolSelected, 'teachingContent')">
            <span>，教學內容為</span><span v-text="schoolSelected.teachingContent" />
          </template>
          <template v-if="get(schoolSelected, 'remarks')">
            <span v-if="showRemarksComma">，</span><span v-text="schoolSelected.remarks" />
          </template>
        </p>
        <ul v-if="get(schoolSelected, 'source') || get(schoolSelected, 'sourceRemarks')">
          <li v-if="get(schoolSelected, 'source')">資料來源：{{ get(schoolSelected, 'source') }}</li>
          <li v-if="get(schoolSelected, 'sourceRemarks')">備註：{{ get(schoolSelected, 'sourceRemarks') }}</li>
        </ul>
      </div>
    </div>
    <a class="opinion-link" href="https://forms.gle/bu6AEe3EfoLZRgd26" target="_blank">我覺得有遺漏或問題想回報</a>
  </section>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'
import { get } from 'lodash'

const { mapGetters } = createNamespacedHelpers('ExtraCurriculum')

export default {
  name: 'EcSchoolData',
  data () {
    return {
      county: '',
      district: '',
      school: ''
    }
  },
  computed: {
    ...mapGetters({
      schoolDataFormated: 'schoolDataFormated'
    }),
    counties () {
      return this.schoolDataFormated
        .map(data => data.county)
        .filter((data, pos, arr) => arr.indexOf(data) === pos)
        .filter(data => data.match(/(市|縣)/))
    },
    districts () {
      const regex = new RegExp(this.county, 'g')
      return this.schoolDataFormated
        .filter(data => data.county.match(regex))
        .map(data => data.district)
        .filter((data, pos, arr) => arr.indexOf(data) === pos)
    },
    schoolSelected () {
      return this.schoolDataFormated
        .filter(data => data.county === this.county && data.school === this.school)[0]
    },
    schools () {
      const regexCounty = new RegExp(this.county, 'g')
      const regexDistrict = new RegExp(this.district, 'g')
      return this.schoolDataFormated
        .filter(data => data.county.match(regexCounty))
        .filter(data => data.district.match(regexDistrict))
        .map(data => data.school)
        .filter((data, pos, arr) => arr.indexOf(data) === pos)
    },
    showRemarksComma () {
      return get(this.schoolSelected, 'group') || get(this.schoolSelected, 'teachingContent')
    }
  },
  watch: {
    county () {
      this.district = this.districts[0]
    },
    district () {
      this.school = this.schools[0]
    }
  },
  mounted () {
    const routeParams = this.$route.params.params
    if (routeParams && routeParams.match(/chapter-4$/)) {
      window.onload = () => {
        this.$emit('scrollTo', 'chapter-4')
      }
    }
  },
  methods: {
    get
  }
}
</script>
<style lang="stylus" scoped>
.ec-s-d
  text-align center
  background-color #ece4ba
  p
    margin 0
    color #4a4a4a
    font-size 1.3125rem
    font-weight 300
  a
    color: #4a4a4a
    font-weight 300
  .filter
    > *
      & + *
        margin-top 10px
    .select
      position relative
      width 280px
      margin-left auto
      margin-right auto
      background-color #fff
      border-radius 8px
      &:after
        content ''
        position absolute
        top calc(50% - 3px)
        right 10px
        width 0
        height 0
        border 6px solid transparent
        border-color #2c585e transparent transparent transparent
    select
      position relative
      z-index 1
      width 280px
      padding .2em .5em
      color #4a4a4a
      background-color transparent
      -webkit-appearance none
      -moz-appearance none
      appearance none
    &__two-col
      display flex
      justify-content center
      width 280px
      margin-left auto
      margin-right auto
      select
        width 130px
      .select
        width 130px
        & + .select
          margin-left 20px
  .info
    position relative
    margin-top 40px
    padding 80px 15px 25px
    background-color #2c585e
    > *
      & + *
        margin-top 10px
    > img
      position absolute
      top -35px
      left 50%
      transform translateX(-50%)
      width 120px
      height 120px
    p
      color #fff
      font-size 1rem
      line-height 1.7
      text-align justify
      & + p
        margin-top 10px
      &.heading
        font-size 1.3125rem
        line-height 1.3
        text-align center
    ul
      padding-left 35px
      color #fff
      font-size .875rem
      font-weight 300
      text-align left
      line-height 1.86

  .opinion-link
    display inline-block
    margin-top 30px

@media (min-width: 1024px)
  .ec-s-d
    text-align left
    .filter
      display flex
      > * + *
        margin-top 0
      select
        width 140px
      .select
        width 140px
        margin 0
        & + p
          margin-left 20px
      &__two-col
        width 220px
        margin 0 20px
        select
          width 100px
    .info
      display flex
      align-items flex-start
      padding 20px 30px
      margin-top 20px
      > * + *
        margin-top 0
      > img
        position static
        transform none
        margin-right 25px
      p.heading
        margin-top 5px
        text-align left
      &__content
        flex 1

</style>
