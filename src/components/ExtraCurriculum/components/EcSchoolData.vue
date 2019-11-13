<template>
  <section class="ec-s-d">
    <div class="filter">
      <p>我要查詢</p>
      <div class="filter__two-col">
        <div class="select">
          <select v-model="county">
            <option
              v-for="county in counties"
              :key="county"
              :value="county"
              v-text="county"
            />
          </select>
        </div>
        <div class="select">
          <select>
            <option>花蓮縣</option>
            <option>花蓮縣</option>
          </select>
        </div>
      </div>
      <div class="select">
        <select>
          <option>海星國小</option>
          <option>明禮國小</option>
        </select>
      </div>
      <p>的晨光時間</p>
    </div>
    <div class="info">
      <img src="/proj-assets/extra-curriculum/clock.png" alt="">
      <div class="info__content">
        <p class="heading">
          <span>苗栗縣</span><span>新興區</span><span>海寶國小</span>晨光時間 <span>有</span> 校外團體
        </p>
        <p>團體是<span>後龍鎮公所清潔隊、苗栗縣石虎保育協會、苗栗縣校外會、苗栗縣稅務局、開南大學運輸研究中心、苗栗縣警局、造橋衛生所、退休校長劉逸民、風箏DIY吳笠萍、苗栗縣婦幼警察隊、東南科大表藝系學生、苗栗高商教官李鎮原、苗栗縣大明社區大學余英傑、苗栗縣輔導諮商中心。</span></p>
        <p>皆為一次性活動。</p>
      </div>
    </div>
    <a class="opinion-link" href="" target="_blank">我覺得有遺漏或問題想回報</a>
  </section>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('ExtraCurriculum')

export default {
  name: 'EcSchoolData',
  data () {
    return {
      county: '高雄市'
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
    }
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
        width 120px
      .select
        width 120px
        margin 0
        & + p
          margin-left 20px
      &__two-col
        width 260px
        margin 0 20px
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
