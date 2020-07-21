<template>
  <article class="result-page">
    <div class="container">
      <h1>你的選擇最接近民國 {{ result.year }} 年發行的第{{ result.era }}代身分證！</h1>
      <div class="intro">
        <p>​{{ result.description }}</p>
      </div>
      <div class="img-wrapper">
        <template v-if="result.doesHasGender">
          <img :src="`/proj-assets/eid/illus/${result.year}-front-${profileId}-f.png`" alt="">
          <img :src="`/proj-assets/eid/illus/${result.year}-back-f.png`" alt="">
          <img :src="`/proj-assets/eid/real/${result.year}-front-f.jpg`" alt="">
          <img :src="`/proj-assets/eid/real/${result.year}-back-f.jpg`" alt="">

          <img :src="`/proj-assets/eid/illus/${result.year}-front-${profileId}-m.png`" alt="">
          <img :src="`/proj-assets/eid/illus/${result.year}-back-m.png`" alt="">
          <img :src="`/proj-assets/eid/real/${result.year}-front-m.jpg`" alt="">
          <img :src="`/proj-assets/eid/real/${result.year}-back-m.jpg`" alt="">
        </template>
        <template v-else>
          <img :src="`/proj-assets/eid/illus/${result.year}-front-${profileId}.png`" alt="">
          <img :src="`/proj-assets/eid/illus/${result.year}-back.png`" alt="">
          <img :src="`/proj-assets/eid/real/${result.year}-front.jpg`" alt="">
          <img :src="`/proj-assets/eid/real/${result.year}-back.jpg`" alt="">
        </template>
      </div>
      <div class="intro">
        <p>而即將換發的新版身分證欄位簡潔許多。</p>
      </div>
      <div class="img-wrapper">
        <img src="/proj-assets/eid/real/110.jpeg" class="center" alt="">
      </div>
      <div class="intro">
        <p>註：數位身分證最終定稿樣式尚未出爐，內政部戶政司表示最晚將於今年底公布。目前示意樣張為 2018 年內政部「身分證明文件再設計」比賽，獲得首獎的作品。</p>
        <p>​​​根據內政部 2020 年 5 月公布的招標文件，新版數位身分證卡面上的個資，將從現行的 11 項，減少至 5 項，進一步保障使用者隱私。</p>
        <p>新版晶片身分證的正面有： 姓名、身分證統一編號、出生日期、個人相片。</p>
        <p>背面有：結婚狀態（有 / 無）、製證日期、應換領日期、證件號碼條碼、統一編號條碼、機器可讀取區（MRZ）。</p>
        <p>​​​晶片內資料實施分區保護，第一區可直接讀取的資料，是僅顯示到村里鄰的戶籍地址。第二區公開區需輸入身分證號後 6 碼，可讀取姓名、身份證統一編號、出生日期、詳細戶籍地址、役別、結婚狀態、證件號碼、應換領日期、製證日期、個人相片。第三區加密區，由本人輸入自訂的 6 位密碼，可讀取父母姓名、配偶姓名、出生地、性別、個人相片、證件號碼後 6 碼，以及公開區的資料。第四區自然人憑證區，由本人輸入憑證密碼才能使用，民眾可自行決定是否開通自然人憑證連接數位身分證的功能，隨時可申請停用或重新啟用。</p>
      </div>

      <DonateBlock class="result-page__donate-block" />
    </div>

    <div class="btn-wrapper-bottom">
      <button
        type="button"
        class="normal normal--three"
        @click="shareToFb(result.year)"
      >
        分享結果到 FB
      </button>
      <button
        type="button"
        class="normal normal--three"
        @click="shareToLine(result.year)"
      >
        分享結果到 LINE
      </button>
      <button
        type="button"
        class="normal normal--three"
        @click="$emit('gotoReport', 'report')"
      >
        閱讀專題報導
      </button>
    </div>
  </article>
</template>

<script>
import { READR_SITE_URL } from 'src/constants'

import DonateBlock from './DonateBlock.vue'

export default {
  name: 'ResultPage',
  components: {
    DonateBlock
  },
  props: ['result', 'profileId'],
  methods: {
    sharedUrl (year) {
      return `${READR_SITE_URL}eid/${year}`
    },
    shareToFb (year) {
      window.open(`https://www.facebook.com/share.php?u=${this.sharedUrl(year)}`)
    },
    shareToLine (year) {
      window.open(`https://line.me/R/msg/text/?${this.sharedUrl(year)}`)
    }
  }
}
</script>

<style lang="stylus">
@import '../variables.styl'

.result-page
  padding-top 42px
  .container
    max-width 720px
    margin-left auto
    margin-right auto
  h1
    color #000928
    padding-left 10px
    padding-right 10px
    @media (min-width 740px)
      padding-left 0
      padding-right 0
      margin-bottom 42px
  &__donate-block
    margin-top 30px
    margin-left 10px
    margin-right 10px
    @media (min-width 740px)
      margin-left 0
      margin-right 0
      margin-top 36px
  .intro
    color rgba(0, 0, 0, 0.87)
    padding-left 30px
    padding-right 30px
    @media (min-width 780px)
      padding-left 0
      padding-right 0
      text-align center
  .img-wrapper
    padding-left 10px
    padding-right 10px
    margin-bottom 30px
    margin-top 30px
    @media (min-width 740px)
      padding-left 0
      padding-right 0
    @media (min-width $breakpoint-md)
      display flex
      justify-content space-between
      flex-wrap wrap
      margin-top 36px
      margin-bottom 0
  img
    width 100%
    height auto
    display block
    @media (min-width $breakpoint-md)
      width calc(50% - 16px)
      margin-bottom 36px
    + img
      margin-top 6px
      @media (min-width $breakpoint-md)
        margin-top 0
    &.center
      margin-left auto
      margin-right auto
  .btn-wrapper-bottom
    margin-top 30px
    @media (min-width $breakpoint-md)
      margin-top 36px
</style>
