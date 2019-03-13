<template>
  <div class="energy-policy">
    <Logo class="energy-policy__logo no-sprite" href="https://www.readr.tw/" top="10px" left="10px" bgImage="/proj-assets/logo_readr.png" />
    <Share :shareUrl="`${READR_SITE_URL}energy-policy`" class="energy-policy__share" top="10px" right="10px" direction="down" />
    <div id="fullpage" ref="fullpage">
      <section class="section fp-noscroll">
        <div class="landing container">
          <div class="landing__block"></div>
          <div class="landing__block"></div>
          <div class="landing__block"></div>
          <div class="landing__heading"></div>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="foreword container">
          <div>
            <p>你是否曾經思考過：電價會不會漲、火力和核能真的不好嗎⋯⋯等問題？</p>
            <p>2018 年末的公民投票，讓「能源議題」從國會進到千家萬戶。由於「電」的問題直接影響民生，臺大風險中心在公投前抽樣的民調顯示，有超過八成的民眾關心能源政策發展。透過 READr 的小測驗，來看看你的想法跟哪個總統最接近！</p>
            <p>背負能源轉型的責任，蔡英文政府卻面臨困境。距離小英 2020 年爭取連任的投票日剩不到 365 天，一起來看看她的能源政策推行得如何。</p>
            <div class="foreword__choices">
              <button @click="moveTo(3)">做測驗</button>
              <button @click="moveTo(4)">看文章</button>
            </div>
          </div>
        </div>
      </section>
      <section class="section fp-noscroll">
        <EnergyPolicyQuiz class="container" @moveToArticle="moveTo(4)"/>
      </section>
      <section class="section fp-noscroll">
        <div class="article photo container">
          <h2>臺灣能源為什麼要轉型？</h2>
          <ul>
            <li>臺灣的能源 98% 仰賴進口，應提高自主程度，實現能源安全</li>
            <li>現有核電廠退役年限逼近，核廢料存放、核四是否重啟、替代能源哪裡來⋯⋯這些議題不能再拖</li>
            <li>回應臺灣社會對空污、生態環境永續的呼聲</li>
            <li>回應各國受到極端天氣衝擊，開始降低碳排放的世界潮流</li>
            <li>跟上世界發展綠能產業鏈，讓產業及鄉鎮轉型</li>
          </ul>
          <p>但有專家質疑能源是否一定要轉型？小英上台後發生的幾次「能源危機」，也在挑戰人民對能源轉型的信心。</p>
          <ReadMoreButton class="btn-readmore" type="open" @click="openReadMoreHandler(1)">
            <template v-slot:moreText>
              <span>能源轉型有必要嗎？</span>
            </template>
          </ReadMoreButton>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article container">
          <h2>承諾能源轉型，卻頻頻遇上危機？</h2>
          <p class="highlight">總統蔡英文上任後發生的能源大事</p>
          <div class="timeline">
            <div class="event">
              <p>2017-08-15</p>
              <p>815 全臺大停電</p>
              <p>大潭發電廠跳電造成停電，影響戶數超過 830 萬戶，經濟損失數億元</p>
            </div>
            <div class="event">
              <p>2017-07 ~ 2018-12</p>
              <p>彰化漁民抗議離岸風電開發案</p>
              <p>彰化漁民抗議離岸風電設廠破壞當地生態、影響漁獲，環保團體也參與抗議</p>
            </div>
            <div class="event">
              <p>2018-04-01</p>
              <p>電價漲 3%</p>
              <p>電價 4 年半來首度調漲，未過門檻的小度數住戶與商家電價不會漲</p>
            </div>
            <div class="event">
              <p>2018-10-08</p>
              <p>觀塘三接案環評通過</p>
              <p>中油第三天然氣接受站（簡稱三接）環評在環保團體抗議聲中通過，環保署副署長詹順貴請辭</p>
            </div>
            <div class="event">
              <p>2018-10-12</p>
              <p>停止擴建深澳發電廠</p>
              <p>因可能帶來空污、破壞當地環境，深澳火力電廠擴建案爭議多時，在三接環評通過後，行政院長賴清德宣布停建深澳</p>
            </div>
            <div class="event">
              <p>2018-11-03 ~ 11-18</p>
              <p>反空污遊行</p>
              <p>臺北、高雄、台中分別舉辦以減煤為主訴求的反空汙遊行，總計約上萬人走上街頭</p>
            </div>
            <div class="event">
              <p>2018-11-24</p>
              <p>能源議題公投通過，非核家園條款失效</p>
              <p>反空污（第 7 案）、反燃煤電廠（第 8 案）、廢除《電業法》非核家園條文（第 16 案）公投通過，《電業法》中規定 2025 非核家園的條款失效。火力發電每年要減少 1% 並不再新建擴建燃煤電廠，政府因此需重新調整能源政策</p>
            </div>
            <div class="event">
              <p>2019-01-19</p>
              <p>躉購價爭議，離岸風電廠商停工</p>
              <p>因 2019 年預告的躉購電價比去年大降 12.7%，考量成本，外商沃旭能源停止執行與臺灣廠商的合約，引發風電外商是否「棄臺」的擔憂，也有人認為政府不該花鉅額向外商買電</p>
            </div>
            <div class="event">
              <p>2019-03-04</p>
              <p>經濟部提出新能源配比</p>
              <p>因應公投結果與電源開發計畫，政府提出新的 2025 能源配比：燃氣 50%、燃煤 27%、再生能源 20%、核電 1%、燃油和抽蓄水力也各 1%</p>
            </div>
          </div>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article container">
          <h2>與現況大不同的能源轉型目標</h2>
          <p>蔡政府在 2017 宣佈能源轉型目標，2019 年初經過修正，但不管是原版還是修正版，與發電現況相比都有很大不同：</p>
          <figure>
            <img class="lazy" data-img="/proj-assets/energy-policy/chart-3.png" src="" alt="臺灣發電結構的現況與未來">
          </figure>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article container">
          <h2>能源轉型目標：20、50、30 → ?</h2>
          <p>蔡政府原先規劃的 2025 年能源配比為：再生能源發電量 20%、天然氣 50%、燃煤 30%，因應去年底的公投民意，經濟部在 2019 年 3 月微調成核能、燃油、抽蓄水力各 1%，燃煤 27%。</p>
          <p>經濟部重申「非核家園」目標不變——2025 年 5 月最後一座核電廠執照到期後不再延役，確定核電將走入歷史，但長期的能源配比究竟為何，經濟部還在研議。</p>
          <ReadMoreButton class="btn-readmore" type="open" @click="openReadMoreHandler(2)">
            <template v-slot:moreText>
              <span>小英能源政策，專家怎麼看？</span>
            </template>
          </ReadMoreButton>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article photo container">
          <h2>為了達標，政府怎麼做？</h2>
          <p class="highlight">處理過去能源轉型的阻礙：</p>
          <ul>
            <li>落實綠電先行（修正《再生能源發展條例》）</li>
            <li>修法開始初步電力自由化，終結台電壟斷電力市場（修正《電業法》）</li>
            <li>將「核電歸零」明確時間點寫入法條</li>
            <li>檢討《環境影響評估法》對能源相關開發案的限制，兼顧保育與發展</li>
          </ul>
          <p class="highlight">確保開發新能源時不缺電：</p>
          <ul>
            <li>訂定再生能源階段性發展目標</li>
            <li>要求台電加強建置智慧電網和儲能設備</li>
            <li>加強維護發電設施，確保緊急時刻有足夠的機組可以供電</li>
          </ul>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article photo container">
          <h2>但同時也引發這些擔憂：</h2>
          <ul>
            <li>再生能源成本高，加上分攤擴建燃氣、封存核四的成本，未來電價會漲 20% 至 30%</li>
            <li class="no-style"><span>蔡政府回應</span>：2025 年前電價可能會上漲，但不一定漲足 30%，要視該年能源成本而定，且已設下 3% 的電價漲跌幅上限，保證電價不因能源轉型而大漲</li>
            <li>大幅提高發電不穩定的再生能源比例，會有缺電危機</li>
            <li class="no-style"><span>學者指出</span>：相較於電價，臺灣居高不下的用電量更應該擔心</li>
            <li class="no-style"><span>蔡政府回應</span>：為了節能，推動讓民眾能直接看到用電量的智慧電表普及化</li>
          </ul>
          <p>就算解決轉型後的電價問題，降低煤電、不要核電後，電從那裡來？身負重任的再生能源能及時補上缺口嗎？</p>
          <ReadMoreButton class="btn-readmore" type="open" @click="openReadMoreHandler(3)">
            <template v-slot:moreText>
              <span>燃料和發電成本造成電價波動</span>
            </template>
          </ReadMoreButton>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article photo container">
          <h2>提升再生能源面臨什麼挑戰？</h2>
          <p>按照蔡政府的規劃，發電量的缺口將由再生能源來填補。但綠能的發展卻引發一些批評：</p>
          <p class="highlight">綠能不穩定</p>
          <ul>
            <li>加強智慧電網、儲能設施、電網調度，經由調節提高供電穩定性</li>
            <li>提升對風、陽光的預報能力</li>
          </ul>
          <p class="highlight">綠能很貴</p>
          <ul>
            <li>綠能推動臺灣產業轉型，前期投入的金額較高，但發電達到一定規模後，成本會大幅下降</li>
            <li>核煤發電成本被低估，發電衍生的污染物、安全性等外部成本都沒有被計算</li>
          </ul>
          <p class="highlight">綠能裝置土地有限且影響生態環境</p>
          <ul>
            <li>制定法規讓農漁業用地和綠能裝置共存、清查可用閒置國土、生態衝擊由環評把關</li>
          </ul>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article photo container">
          <h2>再生能源：從 5% 提升到 20%</h2>
          <p>目前再生能源以水力發電為最大宗，生質能（垃圾沼氣發電）排第二，但這兩者已近飽和，想大幅提升再生能源，要從太陽光電和風力發電著手。</p>
          <figure>
            <img class="lazy" data-img="/proj-assets/energy-policy/chart-5.png" src="" alt="臺灣再生能源裝置容量現況與目標">
          </figure>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article container">
          <h2>政策推動太陽光電成長</h2>
          <p>預計 2025 年，太陽光電會取代水力，成為臺灣最主要的再生能源。</p>
          <p>臺灣自 2000 年開始補助政府單位及民間設置太陽光電設施，2009 年《再生能源發展條例》確立台電以 20 年為期，以固定優惠價格收購綠電的「躉購制度」後，裝置容量才開始明顯快速上升，蔡英文上台後，推動「太陽光電 2 年推動計畫」，2016 年至 2017 年的裝置容量成長率達 42%。</p>
          <figure>
            <img v-if="$store.state.viewport[0] > 768"
              class="lazy"
              data-img="/proj-assets/energy-policy/chart-6-desktop.png"
              src=""
              alt="太陽光電裝置容量自 2010 年開始大幅成長">
            <img v-else
              class="lazy"
              data-img="/proj-assets/energy-policy/chart-6.png"
              src=""
              alt="太陽光電裝置容量自 2010 年開始大幅成長">
          </figure>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article photo container">
          <h2>太陽光電要如何「破關」？</h2>
          <p>雖然過去在政策鼓勵達成高成長率，但要達成目標還需要高倍數的成長。且要順利設置太陽光電還有重重關卡：</p>
          <ul>
            <li>可裝設面板的土地和屋頂有限</li>
            <li>投資綠電有利，農漁業用地被拿去「種電」</li>
            <li>申請裝設手續繁瑣、小規模發電利潤低，影響民眾參與意願</li>
          </ul>
          <figure>
            <img class="lazy" data-img="/proj-assets/energy-policy/chart-7.png" src="" alt="太陽光電裝置容量現況與目標">
          </figure>
          <ReadMoreButton class="btn-readmore" type="open" @click="openReadMoreHandler(4)">
            <template v-slot:moreText>
              <span>政策如何幫助太陽光電「破關」？</span>
            </template>
          </ReadMoreButton>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article photo container">
          <h2>風力發電欠什麼「東風」？</h2>
          <p>臺灣風電發展比太陽光電早，但仍有問題未解：</p>
          <ul>
            <li>風機開發衝擊當地生態、產業（如漁業）</li>
            <li>風力強勁的冬季非用電高峰期</li>
            <li>風電躉購價格的高低代表全民要花多少錢買電，引起民眾疑慮</li>
            <li>臺灣缺乏離岸風機技術，需引進外商，若政策有變動（如收購價格）容易影響廠商投資意願</li>
          </ul>
          <figure>
            <img class="lazy" data-img="/proj-assets/energy-policy/chart-8.png" src="" alt="2014 年以來風力發電裝置容量與目標容量">
          </figure>
          <ReadMoreButton class="btn-readmore" type="open" @click="openReadMoreHandler(5)">
            <template v-slot:moreText>
              <span>離岸風電如何突破瓶頸？</span>
            </template>
          </ReadMoreButton>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article photo container">
          <h2>火力發電廠如何轉型？</h2>
          <p>從燃煤為主轉成燃氣為主，遇到這些挑戰：</p>
          <ul>
            <li>天然氣發電成本比煤貴</li>
            <li>要增加天然氣接收站，但選址遇到困難</li>
            <li>天然氣需進口，且儲存期較短，若遇到天災讓運輸船無法靠岸，將有「斷氣」危機</li>
            <li>地方要求減煤的進度太快，影響政府規劃</li>
          </ul>
          <figure>
            <img class="lazy" data-img="/proj-assets/energy-policy/chart-9.png" src="" alt="燃氣配比要在 2025 年前大幅提升">
          </figure>
          <ReadMoreButton class="btn-readmore" type="open" @click="openReadMoreHandler(6)">
            <template v-slot:moreText>
              <span>燃氣「大躍進」遇到什麼問題？</span>
            </template>
          </ReadMoreButton>
        </div>
      </section>
      <section class="section fp-noscroll">
        <div class="article photo container">
          <h2>臺灣的零核之路還有多遠？</h2>
          <p>要從發電量近 10% 降到 0%，遇到這些挑戰：</p>
          <ul>
            <li>少了核電會不會缺電？供電不穩？</li>
            <li>核電議題成為選舉籌碼</li>
            <li>朝野一直以來都有擁核勢力</li>
            <li>主張現有核電廠延役和重啟核四的呼聲不斷</li>
          </ul>
          <ReadMoreButton class="btn-readmore" type="open" @click="openReadMoreHandler(7)">
            <template v-slot:moreText>
              <span>四十年仍未解的核電爭議 </span>
            </template>
          </ReadMoreButton>
        </div>
      </section>
      <section class="section normal-scroll">
        <div class="other container">
          <div class="credit">
            <img class="lazy" data-img="/proj-assets/logo_mm_white.png" src="" alt="鏡傳媒">
            <p><span>文字：劉子維</span><span>設計：陳怡蒨</span><span>工程：譚學勇</span></p>
            <p>照片來源：台灣電力公司、中華民國外交部、姜永年、楊彩成</p>
            <p>2019/03</p>
          </div>
          <iframe v-if="mounted" src="https://www.readr.tw/comment?resource_url=https://www.readr.tw/series/energy-policy" frameborder="0"></iframe>
          <RelatedReports :theme="'light'" class="related"/>
        </div>
      </section>
    </div>
    <div ref="readMore" class="read-more">
      <div></div>
      <ReadMoreButton type="close" @click="openReadMore = false"></ReadMoreButton>
    </div>
  </div>
</template>
<script>

import EnergyPolicyQuiz from './EnergyPolicyQuiz.vue'
import Logo from '../Logo.vue'
import ReadMoreButton from './ReadMoreButton.vue'
import RelatedReports from 'src/components/RelatedReports.vue'
import Share from '../Share.vue'
import { READ_MORE_CONTENT, } from './constant'
import { READR_SITE_URL } from '../../constants'

const loadImage = (index) => {
  const lazyImage = document.querySelector(`.section:nth-child(${index + 1}) img.lazy`)
  if (lazyImage) {
    lazyImage.src = lazyImage.getAttribute('data-img')
    lazyImage.classList.remove('lazy')
  }
}

export default {
  name: 'EnergyPolicy',
  components: {
    EnergyPolicyQuiz,
    Logo,
    ReadMoreButton,
    RelatedReports,
    Share
  },
  metaInfo() {
    return {
      title: '小英來電嗎——能源轉型怎麼做？',
      description: '蔡英文政府力拚 2025 年能源轉型——要實現非核、提升燃氣與綠能，小英能源政策的理想遇到哪些現實阻礙？',
      metaUrl: 'energy-policy',
      metaImage: 'energy-policy/og.jpg',
    };
  },
  data () {
    return {
      READ_MORE_CONTENT,
      READR_SITE_URL,
      fullpage: undefined,
      mounted: false,
      openReadMore: false,
      readMoreIndex: 1,
    }
  },
  computed: {
    readMoreContent () {
      return READ_MORE_CONTENT[this.readMoreIndex - 1].contents
    },
  },
  watch: {
    openReadMore (value) {
      if (value) {
        window.fullpage_api.setAllowScrolling(false)
        this.$refs.readMore.classList.add('active')
        this.$refs.fullpage.classList.add('hasReadMore')
      } else {
        window.fullpage_api.setAllowScrolling(true)
        this.$refs.readMore.classList.remove('active')
        this.$refs.fullpage.classList.remove('hasReadMore')
      }
    }
  },
  beforeMount () {
    import('fullpage.js/vendors/scrolloverflow.min.js')
    import('fullpage.js/dist/fullpage.extensions.min.js').then(fullpageModule => {
      window.fullpage = fullpageModule.default
      this.initFullPage()
    })
  },
  mounted () {
    this.mounted = true
    ga('send', 'pageview')
  },
  methods: {
    initFullPage () {
      let max = 1
      this.fullpage = new window.fullpage('#fullpage', {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        autoScrolling: true,
        normalScrollElements: '.read-more',
        scrollOverflow: true,
        scrollOverflowReset: true,
        onLeave (origin, destination, direction) {
          loadImage(destination.index + 1)
          if (destination.index + 1 > max) {
            max += 1
            ga('send', 'event', 'projects', 'scroll', `move to ${max}`, { nonInteraction: false })
          }
        }
      })
    },
    moveTo (sectionIndex) {
      window.fullpage_api.moveTo(sectionIndex)
      ga('send', 'event', 'projects', 'click', `move to ${sectionIndex}`, { nonInteraction: false })
    },
    openReadMoreHandler (index) {
      const readMoreContent = document.querySelector('.read-more > div')
      readMoreContent.innerHTML = READ_MORE_CONTENT[index - 1].contents
      readMoreContent.scrollTop = 0
      this.openReadMore = true
      ga('send', 'event', 'projects', 'click', `read more ${index}`, { nonInteraction: false })
    }
  }
}
</script>
<style lang="stylus" scoped>

  >>> h2, >>> h3, >>> p, >>> ul, >>> figure, >>> img
    margin 0 auto
  >>> h2
    font-size 1.25rem
    & + p, & + ul
      margin-top .5em
  >>> h3
    font-size 1.125rem
    & + p, & + ul
      margin-top .5em
  >>> p
    font-size 1rem
    text-align justify
    line-height 1.67
    & + h3, & + p, & + ul, & + figure, & + img
      margin-top .5em
    
  >>> ul
    padding-left 20px
    font-size 1rem
    text-align justify
    line-height 1.4
    & + h3, & + p, & + figure, & + img
      margin-top .5em
    li
      &.no-style
        text-shadow none
        list-style-type none
      &+ li
        margin-top .5em
    
  >>> a
    text-decoration none

  >>> button
    font-size 1.25rem
    background-color transparent
    border none
    cursor pointer
    > span
      font-size .75rem
  >>> img
    display block
  >>> figure
    margin .5em 0
    img
      width 100%
    figcaption
      color #9b9b9b
      margin-top .2em 
      font-size .875rem
      text-align center
  .energy-policy
    position relative
    color #fff
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    #fullpage
      &.hasReadMore
        .container
          background-color rgba(0, 0, 0, .6)
    &__logo
      width 40px !important
      height 40px !important
      background-size 40px auto !important

    .section
      height 100vh
      background-color #9b9b9b
      background-position center center
      background-size cover
      background-repeat no-repeat
      &:not(:first-child):not(:nth-child(3))
        .container
          padding 60px 0 30px
      &:nth-of-type(5), &:nth-of-type(6), &:nth-of-type(7), &:nth-of-type(12)
        .container
          > h2, > p, > ul
            text-shadow none
      &.normal-scroll
        position relative
      
      &:nth-of-type(4)
        background-image linear-gradient(to right, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .5) 60%, rgba(0, 0, 0, 0) 100%), url(/proj-assets/energy-policy/bg-1.jpg)
      &:nth-of-type(8)
        background-image linear-gradient(to right, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .5) 60%, rgba(0, 0, 0, 0) 100%), url(/proj-assets/energy-policy/bg-2.jpg)
      &:nth-of-type(9)
        background-image linear-gradient(to right, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .5) 60%, rgba(0, 0, 0, 0) 100%), url(/proj-assets/energy-policy/bg-3.jpg)
      &:nth-of-type(10)
        background-image linear-gradient(to right, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .5) 60%, rgba(0, 0, 0, 0) 100%), url(/proj-assets/energy-policy/bg-4.jpg)
      &:nth-of-type(11)
        background-image linear-gradient(to right, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .5) 60%, rgba(0, 0, 0, 0) 100%), url(/proj-assets/energy-policy/bg-5.jpg)
      &:nth-of-type(13)
        background-image linear-gradient(to right, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .5) 60%, rgba(0, 0, 0, 0) 100%), url(/proj-assets/energy-policy/bg-6.jpg)
      &:nth-of-type(14)
        background-image linear-gradient(to right, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .5) 60%, rgba(0, 0, 0, 0) 100%), url(/proj-assets/energy-policy/bg-7.jpg)
      &:nth-of-type(15)
        background-image linear-gradient(to right, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .5) 60%, rgba(0, 0, 0, 0) 100%), url(/proj-assets/energy-policy/bg-8.jpg)
      &:nth-of-type(16)
        background-image linear-gradient(to right, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, .5) 60%, rgba(0, 0, 0, 0) 100%), url(/proj-assets/energy-policy/bg-9.jpg)
    
    .container
      position relative
      height 100%
      &.other
        height auto
        > h2, > p, > ul
          text-shadow none
      > h2, > p, > ul, > figure
        width 90%
      > h2, > p, > ul
        text-shadow 1px 1px 0 rgba(0, 0, 0, .7)
      > figure
        margin-left auto
        margin-right auto
      p.highlight
        color #eede28
        font-weight 500
        text-shadow none
      li
        span
          padding 0 .2em
          color #000
          background-color #f8e71c
    .landing
      display flex
      flex-direction column
      position relative
      &__block
        flex 1
        background-repeat no-repeat
        background-size 80% auto
        background-position-y bottom
        &:nth-child(1)
          background-color #257069
          background-image url(/proj-assets/energy-policy/landing-mobile-1.png)
          background-position-x 120%
        &:nth-child(2)
          background-color #fffb08
          background-image url(/proj-assets/energy-policy/landing-mobile-2.png)
          background-position-x 0
        &:nth-child(3)
          background-color #e10583
          background-image url(/proj-assets/energy-policy/landing-mobile-3.png)
          background-position-x 200%
      &__heading
        position absolute
        left 15px
        bottom 15px
        width 50%
        height calc(33% - 30px)
        background-image url(/proj-assets/energy-policy/title-mobile.png)
        background-position center center
        background-repeat no-repeat
        background-size contain
    .foreword
      p
        color #fff
        text-align justify
        font-weight 300
      > div
        position relative
        width 90%
        height 100%
        margin 0 auto
      &__choices
        display flex
        position absolute
        left 0
        bottom 0
        width 100%
        button
          flex 1
          padding .5em
          color #000
          background-color #fff
          & + button
            margin-left 30px
    .timeline
      width 90%
      margin .5em auto 0
      .event
        position relative
        padding-left 20px
        &::before
          content ''
          position absolute
          top 2.5px
          left 0
          width 10px
          height 10px
          border-radius 50%
          background-color #f8e71c
        &::after
          content ''
          position absolute
          left 5px
          bottom -7px
          transform translateX(-50%)
          width 1px
          height calc(100% - 5px)
          background-color #fff
        &:last-child
          &::after
            content none
        & + .event 
          margin-top 5px
        p
          font-weight 500
          line-height 1
          & + p
            margin-top .5em
          &:first-child
            color #f8e71c
          &:last-child
            display none
    .read-more
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      transform translateX(-100%)
      z-index 1000
      width 80%
      // height 100vh
      padding 15px 5px 15px 15px
      color #000
      background-color #fff
      visibility hidden
      transition transform .25s ease-out, visibility .1s ease-out
      &.active
        transform translateX(0)
        visibility visible
      >>> h2,  >>> h3, >>> p, >>> ul
        & + h3, & + p, & + ul, & + img
          margin-top .8em
      > div
        height 100%
        padding-right 10px
        overflow auto
      >>> a
        color #4A90E2
      button
        position absolute
        right -20px
        bottom 15px
    .other
      > iframe
        display block
        width 80%
        margin 10px auto 0
    .credit
      width 80%
      margin 0 auto
      img
        width 40px
        height 40px
        & + p
          margin-top .5em
      p
        margin-top .2em
        font-size .75rem
        text-align center
        line-height 1.3
        span
          & + span
            margin-left 1em
    .related
      margin-top 1em
    .btn
      &-readmore
        position absolute
        left 15px
        bottom 15px

  @media (max-width: 374px) // iPhone SE
    
    >>> h2
      font-size 1rem
      
    >>> p, >>> ul
      font-size .8125rem
      
    >>> button
      font-size .9375rem

    .energy-policy
      .section
        &:not(:first-child):not(:nth-child(3))
          .container
            padding 50px 0 30px
      
      .landing__heading
        left 10px
      
      &__logo
        top 5px !important
      &__share
        top 5px !important
        
  @media (min-width: 768px)
    h1
      left 30px
      font-size 3.4375rem
    >>> h2
      font-size 1.5rem
    >>> h3
      font-size 1.375rem
    >>> p
      font-size 1.25rem
    >>> button
      font-size 1.5rem

    .energy-policy
      .container
        > h2, > p, > ul
          width 60%
        > h2
          font-size 1.5rem
        > p, > ul
          font-size 1.25rem
        > figure
          width 80%
      .foreword
        display flex
        align-items center
        > div
          width 60%
          max-width 600px
          height auto
        &__choices
          position static
          margin-top 70px

      .article
        display flex
        flex-direction column
        justify-content center
        align-items center

      .timeline
        width 60%
        .event
          &::after
            bottom -12.5px
            height 100%
          & + .event
            margin-top 10px
      .other
        > iframe
          width calc(100% - 100px)
      .read-more
        padding 30px 20px 30px 30px

      .btn-readmore
        left 20%
        bottom 30px

  @media (min-width: 769px)
    .energy-policy
      .section
        &:not(:first-child):not(:nth-child(2)):not(:nth-child(3))
          .container
            padding-bottom 80px
        &:nth-child(5)
          .container
            > h2, > p
              margin-left 10%
      .container
        &.photo
          > h2, > ul, > p, > figure
            max-width 620px
            margin-left 5%
            margin-right auto
        > figure
          position relative
          flex 1
          > img
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            width 100%
            height 100%
            object-fit contain
            object-position center center
          
      .landing
        &__block
          background-size contain
          &:nth-child(1)
            background-position-x 100%
          &:nth-child(2)
            background-position-x 40%
          &:nth-child(3)
            background-position-x 120%

      .timeline
        display flex
        flex-direction column
        width auto
        margin .5em auto 0 10%
        .event
          padding 0 20px 0 0
          &::before
            left auto
            right 0
          &::after
            left auto
            right 4px
            bottom -17.5px
            height calc(100% + 5px)
          & + .event
            margin-top 15px
          p
            font-size 1rem
            text-align right
            &:last-child
              position absolute
              top 0
              left calc(100% + 10px)
              display block
              width calc(80vw - 100%)
              margin 0
              font-size .875rem
              text-align left
              line-height 1.3

      .btn-readmore
        left 5%
      .other
        > iframe
          width 60%
          height 180px
      .credit
        p
          font-size 1.125rem

  @media (min-width: 1200px)
    .energy-policy
      .container
        > h2, > p, > ul
          max-width 900px
        > figure
          width 50%
          max-width 800px
      .landing
        flex-direction row
        &__block
          background-size 150% auto
          &:nth-child(1)
            background-image url(/proj-assets/energy-policy/landing-desktop-1.png)
            background-position-x 30%
          &:nth-child(2)
            background-image url(/proj-assets/energy-policy/landing-desktop-2.png)
            background-position-x 50%
          &:nth-child(3)
            background-image url(/proj-assets/energy-policy/landing-desktop-3.png)
            background-position-x 30%
        &__heading
          top 1.5em
          left 50%
          bottom auto
          transform translateX(-50%)
          max-width 1000px
          background-image url(/proj-assets/energy-policy/title-desktop.png)
      .timeline
        margin-top 1em
      .read-more
        width 50%
</style>
