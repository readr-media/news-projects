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

      <div class="replay-wrapper">
        <div class="replay" @click="$emit('replayGame')">
          <svg fill="none" height="44" viewBox="0 0 44 44" width="44" xmlns="http://www.w3.org/2000/svg"><g fill="#5f6c11"><path d="m5.28482 24.0289c-.08493-.7076-.12857-1.4106-.12857-2.0289 0-9.2299 7.61385-16.84375 16.84375-16.84375 4.3053 0 8.3359 1.73587 11.3008 4.4429l-1.4868 1.51265c-.335.335-.4639.8248-.335 1.289.1547.4381.5156.7735.9795.8765.2595.0521 8.7841 2.7991 8.2413 2.69.6905.2299 1.7117-.5066 1.5214-1.5211-.0524-.2598-1.9397-9.72937-1.8306-9.18689-.103-.46393-.4384-.85065-.9023-.97956-.4381-.1289-.9282 0-1.2632.33503l-1.2632 1.23736c-3.8931-3.63489-9.2387-5.85214-14.9619-5.85214-12.09134 0-22 9.90866-22 22v.0514c0 .7267.0332337 1.2884.0718384 1.718.0513606.5694.4709776 1.0357 1.0315816 1.1481l2.64829.5294c.86206.1725 1.63718-.5502 1.53311-1.418z"/><path d="m42.9042 19.0804-2.656-.5412c-.8631-.1759-1.6436.5476-1.5375 1.4194.092.7523.1329 1.4837.1329 2.0413 0 9.2296-7.6139 16.8438-16.8437 16.8438-4.3053 0-8.336-1.7359-11.3008-4.4688l1.4868-1.4868c.335-.335.4639-.8248.335-1.289-.1548-.4384-.5156-.7735-.9796-.8765-.2595-.0524-8.78406-2.799-8.24124-2.6899-.43842-.0772-.87683.0517-1.16016.3608-.30951.2837-.43841.7476-.3612 1.1602.05237.2595 1.93997 9.6431 1.83087 9.1007.10272.4642.43808.8509.90201.9795.53811.135.98727-.0282 1.26321-.335l1.2377-1.2374c3.89271 3.6352 9.23831 5.9384 14.98741 5.9384 12.0913 0 22-9.9086 22-22v-.0775c0-.5714-.0209-1.1323-.0685-1.6899-.049-.5697-.467-1.0376-1.0272-1.1521z"/></g></svg>
          <p>再玩一次</p>
        </div>
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
        class="normal normal--three emphasize"
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
      align-items flex-start
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
  .replay
    margin-top 30px
    cursor pointer
    user-select none
    display inline-block
    @media (min-width $breakpoint-md)
      margin-top 36px
    &-wrapper
      text-align center
    svg
      display block
      margin-left auto
      margin-right auto
    p
      font-size 15px
      line-height 1.5
      letter-spacing 2.5px
      border-bottom 1px solid #5f6c11
      color #5f6c11
      font-weight 700
      margin-top 10px
      display inline-block
      margin-left 2.5px
</style>
