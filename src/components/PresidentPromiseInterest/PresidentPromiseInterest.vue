<template>
  <div id="president-promise-interest" class="president-promise-interest">
    <AppHeader class="president-promise-interest__header"/>
    <div class="president-promise-interest__article-container">
      <article class="article">
        <h1 class="article__title">大家最關心：族群政策</h1>
        <AppTable :rankData="constants.RANK_CATEGORY"/>
      </article>
      <article class="article">
        <h1 class="article__title">大家最關心：4G 網路普不普及</h1>
        <AppTable id="rank-promise-table" :rankData="constants.RANK_PROMISE"/>
      </article>
      <article class="article article-top3">
        <h1 class="article__title">關心度前三名，進度到哪兒？</h1>
        <section class="article-top3__section">
          <AppQuotePromise
            :order="1"
            :title="'確實普及4G 網路建設，降低網路電信資費'"
            :description="'蔡英文團隊希望解決光纖到府的最後一里問題，並確實普及 4G 網路建設，降低網路電信資費、完成數位匯流。'"
            :citeDescription="'20150607，訪美期間臉書動態'"
            :citeLinkSrc="'http://iing.tw/posts/20'"
          />
          <div class="line-chart-container">
            <h2 class="line-chart-container__title">4G 普及率已達 100%，<br>光纖入戶仍有實務上困難</h2>
            <AppLineChart/>
            <p class="line-chart-container__note">備註：普及率參考NCC過去發佈之新聞稿，4G帳號數／人口數；光纖帳號數／戶數</p>
          </div>
          <AppTimeline :timelineData="constants.TIMELINE_TOP1"/>
          <section class="article__content">
            <p>台灣的 4G 普及率已在今年五月正式突破 100%，但立委李昆澤就在審查相關法案時指出，城市偏鄉落差大，全台 84 個偏鄉大概有 3 到 4 成都沒有 4G 服務。</p>
            <p>且光纖入戶始終停滯不前。儘管 2015 年修法規定公部門新建物及一定面積以上的新建住宅要將光纖網路設為基本配備，但現有的住宅與商辦大樓，還是面臨需經過住戶或管委會同意才能變更建物電信設備、管線設計等問題，難以迅速普及。目前用戶數為 364 萬，普及率僅有四成。</p>
            <p>目前有以政府力量戮力推動光纖網路佈建的是台北市政府。由廠商負責建設、營運、出資，採收取使用費與權利金方式，政府零出資，成本完全由廠商負擔。2011 年由台灣智慧光網得標，在 2015 年正式開台營運，光纖網路覆蓋率接近 100%。</p>
          </section>
        </section>
        <section class="article-top3__section">
          <AppQuotePromise
            :order="2"
            :title="'召開年金國是會議，讓各行各業都參與討論'"
            :description="'推動「年金永續計畫」，召開年金國是會議，讓各行各業都參與討論。現在各大退撫基金或保險，都潛藏了鉅額債務，總計約17兆8千億元。如果我們不去積極解決，年金破產危機將難以避免。'"
            :citeDescription="'20151222，五大社會安定計畫'"
            :citeLinkSrc="'http://iing.tw/policies/fssp'"
            :isPromiseDone="true"
          />
          <AppTimeline :timelineData="constants.TIMELINE_TOP2"/>
          <section class="article__content">
            <p>蔡英文上任後，將年金改革委員會提升到總統府層次。從 2016 年底開始召開年金國是會議分區大會，至 2017 年 1 月得全國大會，參與人除了專家學者、公民團體、婦女、青年、政黨、政府機關代表、年改委員會成員以外，邀請各利害關係人職業別團體，包括退休與現職（含警消）公務人員代表、退休與現職（含私校）教育人員代表、勞工代表、雇主代表、農民代表、漁民代表等，實踐「各行各業」的承諾。雖屢屢遭反年改團體在場外抗議，但還是如期辦完。</p>
            <p>2018年6月底立法院陸續通過軍、公、教、政務人員年改法案，內容包含分階段終結 18% 優惠存款、調降公教人員所得替代率、延後退休請領年齡等，於 6 月 30 日全部完成。只是目前反年改團體的抗議仍未停歇。</p>
          </section>
        </section>
        <section class="article-top3__section">
          <AppQuotePromise
            :order="3"
            :title="'建立數位時代法制基礎'"
            :description="'蔡英文認為，台灣過去專注硬體代工，對於應用與服務的發展相當落後。應該把握機會，利用現有的產業優勢切入物聯網時代。主張檢討法律制度，解決隱私權保護、資料開放、資通安全、網路金融、網路智財權問題。'"
            :citeDescription="'20150607，訪美期間臉書動態'"
            :citeLinkSrc="'http://iing.tw/posts/20'"
          />
          <AppTimeline :timelineData="constants.TIMELINE_TOP3"/>
          <section class="article__content">
            <p>「數位時代法制基礎」字義範疇廣大，我們嘗試從政府已提出的計畫來追蹤。 2017 年 10 月行政院核定通過「數位國家・創新經濟發展方案（2017-2025）」，簡稱「Digi+」計畫。在行政院最新的施政報告中，列出了已通過的《金融科技發展與創新實驗條例》、《外國專業人才延攬及僱用法》；仍在立法院審議中的《電信管理法》、《數位通訊傳播法》；以及尚未提出版本的《資通安全管理法》等法令。</p>
            <p>《電信管理法》鬆綁業者進場制度，將特許制改為登記制；《數位通訊傳播法》則採基本法的精神立法，低度管理，政府不宜介入，盼打下治理基礎。而《金融科技發展與創新實驗條例》及《外國專業人才延攬及僱用法》則鬆綁既有法規，嘗試建立更友善的產業環境。</p>
            <p>但在政府定義的業務範疇外，仍有如交通部研擬修法，將訂房網站納管，若有非法旅宿刊登，平台方也需被罰款，若連續罰了不改善，主管機關還可以阻斷平台的 IP 等引起爭議的數位時代法制相關事件。</p>
          </section>
        </section>
      </article>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import * as constants from './constants'
import AppHeader from './components/AppHeader.vue'
import AppTable from './components/AppTable.vue'
import AppQuotePromise from './components/AppQuotePromise.vue'
import AppLineChart from './components/AppLineChart.vue'
import AppTimeline from './components/AppTimeline.vue'
import AppFooter from './components/AppFooter.vue'
// store module
import store from '../../store/modules/PresidentPromiseInterest'

export default {
  metaInfo () {
    return {
      title: '小英，說好的承諾呢？三個月追蹤',
      description: '兩年了，你還記得總統曾經對人民許下的承諾嗎？ READr 針對三個月來讀者們最關心的政策做了後續追蹤！',
      metaUrl: 'president-promise-interest',
      metaImage: 'president-promise-interest/ogimage.jpg'
    }
  },
  components: {
    AppHeader,
    AppTable,
    AppQuotePromise,
    AppLineChart,
    AppTimeline,
    AppFooter,
  },
  data () {
    return {
      constants,
    }
  },
  created () {
    this.$store.registerModule('PresidentPromiseInterest', store)
  },
  destroyed () {
    this.$store.unregisterModule('PresidentPromiseInterest')
  },
  mounted () {
    window.ga('send', 'pageview')
  }
}
</script>

<style lang="stylus" scoped>
#president-promise-interest
  background-color #1f464f
  padding 0 0 86px 0

#rank-promise-table
  & >>> td:nth-child(3)
    text-align justify !important
  & >>> tr
    &:nth-child(1)
      color #fa8d62 !important
    &:nth-child(2)
      color #ffc1a9 !important
    &:nth-child(3)
      color #ffc1a9 !important
    &:nth-child(4)
      color #ffc1a9 !important
    &:nth-child(5)
      color white !important

.president-promise-interest
  &__header
    position fixed
    top 0 
    left 0
    width 100%
    z-index 1000
    height 66px
  &__article-container
    max-width 728px
    margin 0 auto
    padding 105px 0 0 0

.article
  margin 101px 0
  &:nth-of-type(1)
    margin 0 0 101px 0
  &__title
    font-size 40px
    font-weight 900
    line-height 1.1
    letter-spacing normal
    text-align center
    color #b2dbd5
    margin 45px 0
  &__content
    font-size 18px
    line-height 1.78
    text-align justify
    color #ffffff
    p
      margin 52px 0

.article-top3
  &__section
    margin 87px 0
    &:nth-of-type(1)
      margin 0 0 87px 0

.line-chart-container
  margin 48px 0 55px 0
  &__title
    width 100%
    height 90px
    display flex
    justify-content center
    align-items center
    font-size 24px
    font-weight 900
    color white
    background-color #2b616d
    margin 0 0 43px 0
    br
      display none
  &__note
    font-size 18px
    color #c9c9c9
    text-align center
    margin 29px 0 0 0

@media(max-width 425px)
  #rank-promise-table
    & >>> th:nth-child(2)
      display none
    & >>> td:nth-child(2)
      display none
    & >>> td:nth-child(3)
      text-align justify !important
      padding 20px 20px 0 0

  .president-promise-interest
    &__article-container
      max-width 100%
      padding 86px 20px 0 20px

  .article
    margin 54px 0
    &:nth-of-type(1)
      margin 0 0 54px 0
    &__title
      font-size 24px
      line-height 1.7
      text-align left
      margin 19px 0
    &__content
      font-size 16px
      line-height 1.5
      p
        margin 38px 0

  .article-top3
    &__section
      margin 54px 0
      &:nth-of-type(1)
        margin 0 0 54px 0

  .line-chart-container
    margin 74px 0 31px 0
    &__title
      width calc(100% + 20px + 20px)
      position relative
      left -20px
      height 130px
      font-size 22px
      line-height 1.36
      margin 0 0 74px 0
      br
        display initial
    &__note
      font-size 14px
      line-height 1.43
      text-align left
      margin 17px 0 0 0
</style>


