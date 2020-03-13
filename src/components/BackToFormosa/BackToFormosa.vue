<template>
  <div class="back-to-formosa">
    <SlideContainer ref="opening" />
    <article class="back-to-formosa__middle" :style="{ color: isDark ? '#fff' : '' }" ref="middle">
      <div class="bg bg--file" />
      <div class="bg bg--dark" :style="{ opacity: isDark ? '' : 0 }" />

      <div class="middle__scene" id="middle__scene--1">
        <div class="scene-heading" id="scene-heading--1">
          <picture class="scene-heading__person">
            <img src="/proj-assets/backtoformosa/img/scene1/person.png" alt="">
          </picture>
          <picture class="scene-heading__title">
            <img src="/proj-assets/backtoformosa/img/scene1/title.svg" alt="">
          </picture>
        </div>

        <div class="middle__container">
          <div class="middle__content">
            <p>1979 年 12 月 12 日，美麗島事件發生後的第 2 天，雜誌社核心人物施明德、呂秀蓮、林義雄、陳菊和張俊宏在姚嘉文家連夜開會，討論遊行善後的事情。結束後天色已晚，呂秀蓮聽從陳菊的建議，借住在施明德的家（位在美麗島雜誌社樓上）。</p>
            <p>隔日清晨 5 點多，門鈴突響，緊接著傳來施明德的叫聲：「他們來抓人了！」呂秀蓮趕忙衝進浴室換下睡衣，一旁的陳菊顧不得自己只穿著睡衣，抱著重要文件就從後院跳下去。沒想到，軍警早就團團包圍住雜誌社。</p>
            <p>這是警備總部對美麗島事件的回應。遊行結束後不久，警備總部召開會議，檢討當天的警力配置，總司令汪敬煦最後下達指示，包括：一、將不法份子拘捕法辦；二、拘捕後注意可能引起的副作用，以及預先防範處置；三、全面加強維安。逮捕和偵訊計畫統稱為「一二一〇專案」。</p>
            <p>13 日天還未亮，林義雄、呂秀蓮和陳菊被情治人員押上囚車，施明德跳上屋頂，展開逃亡；同一時間，軍警突襲張俊宏、姚嘉文的住所，把他們送往看守所。14 日，立法院召開臨時院會，同意警總逮捕美麗島雜誌發行人、時任立委黃信介。隔年 1 月初，逃亡超過 20 天的施明德與林弘宣，在臺北落網。</p>
            <p>不到 1 個月，國民黨政府出動警總、調查局、警政署、憲兵司令部四大系統，將「美麗島雜誌社重要幹部」全數緝拿到案。</p>
          </div>
        </div>
      </div>

      <div class="middle__scene" id="middle__scene--2">
        <picture id="scene2-title">
          <img src="/proj-assets/backtoformosa/img/scene2/title.svg" alt="">
        </picture>

        <div class="middle__container" ref="reportPage1">
          <div class="report-page">
            <div class="report-page__intro">
              <p>大逮捕之後，情治單位各自展開調查。</p>
              <p>漫長的偵訊過程，每個人都寫下了他們的「犯罪動機」。</p>
            </div>
            <ReportPageContent v-for="content in reportPageContent[ '1' ]" :content="content" src="scene2/" :key="content.name" />
          </div>
        </div>

        <div id="middle-yao-container">
          <div class="middle__container">
            <div class="middle__content">
              <p>然而，從國發會檔案管理局收藏的政治犯筆錄中，卻發現了他們遭遇疲勞偵訊或是刑求的證據，例如被送往警總保安處的林義雄，他在 2 月 25 日撰寫的備忘錄中提及「偵訊就是反反覆覆問同樣的問題，一開始是好幾天不准睡覺，接下來是答覆的不滿意就打，打到讓你受不了，屈服了就改變態度。一方面以刑求做威脅，一方面以政府會寬大做引誘，要達到他們取得十全十美，令人一看就滿意的筆錄。」</p>
              <p>偵訊人員軟硬兼施，林義雄寫下一些讓他印象深刻的恐嚇，例如「如果你不說，拿出證據來，每一樣都幾個人來痛打你一頓。打死了，就說你畏罪自殺」、「如果不合作，把你打成共產黨」、「人總是人，識時務者為俊傑，你這個身體受不了那些」；他也記錄了自己被刑求的過程：「打的部位是前胸、後背、腹部，腳踢的是小腿和腹部，有時候也用香菸燙我的臉，燒我的鬍子。他們一方面打，一方面以拖到地下室做威脅，說什麼過五關、打幸福針（我不知道這是什麼意思，只覺得很恐怖），痛打之後，他們看我已屈服，就不再打，開始對我好。」</p>
              <p>連續幾 10 天的訊問，林義雄改了 5、6 次的筆錄，被迫承認美麗島活動就是一個叛亂行為，美麗島雜誌社是一個叛亂組織，他主張臺灣獨立，鼓勵人民反抗政府等等。林義雄語帶無奈寫道，「這些調查人員的主觀之強烈，是很少見的，在他們的心目中，黨外的言行除了顛覆政府外，不可能有其他目的。所謂民主自由都是黨外為了遂行自己的政治野心提出來的口號而已，他們自認為把黨外看得十分透徹，但我覺得這種態度，是今天黨外人士之所以會走極端，和國民黨站在絕對的立場之根本原因。」</p>
            </div>
          </div>
          <div id="scene2-yao">
            <picture>
              <img src="/proj-assets/backtoformosa/img/scene2/yao.png" alt="">
            </picture>
          </div>
          <div class="middle__container">
            <div class="middle__content">
              <p>呂秀蓮則被送到景美軍法看守所，她在 3 月 24 日撰寫的「司法行政部調查局違法偵訊實情」一文中寫道，「調查員常拿吳春發<TextNotation><p>吳春發原本是詐欺犯，逃亡日本後結識中國駐外人員，表明願意替中共在臺灣進行武裝暴動，1978 年遭逮，最後依「懲治叛亂條例」第二條第一項，判處死刑。</p></TextNotation>被槍斃的事情來威脅取供，某天他們還給我看他鮮血淋漓的照片，又勒令我高聲朗誦殯儀館通知吳妻認領屍體的公函，然後說『妳就是第二個吳春發，妳離靶場越來越近了，不久妳的家人也會收到殯儀館領屍的通知』等話，也會要我撰寫遺囑，交代後事，讓我覺得罪該萬死。」</p>
              <p>除了言語恐嚇，呂秀蓮也記錄了身體遭受的苦痛，像是調查人員若逼供不成，會要求她罰站，往往一站就是 4、5 個小時以上；超過 12 個小時不予進食是家常便飯，當時她罹患甲狀腺癌，再加上全天候偵訊，常感覺頭暈眼花、痛苦不已。此外，呂秀蓮撰寫的供詞如果不合要求，調查人員會當面撕裂或焚燒，命她反覆重寫，所謂的自白書根本是「他白書」。</p>
              <p>偵訊告一段落後，臺灣警備總司令部軍法處 2 月 20 日，以《懲治叛亂條例》第二條第一項的叛亂罪，起訴黃信介、施明德、張俊宏、姚嘉文、林義雄、陳菊、呂秀蓮、林弘宣 8 人，並由軍事法庭審理，其餘 37 人移送司法機關偵辦。</p>
            </div>
          </div>
        </div>

        <div class="middle__container" ref="listPage">
          <div class="list-page">
            <div class="list-page__intro">
              <p>偵訊時，他們被如何對待：</p>
            </div>
            <ListPageContent :listItems="listItems" />
            <picture id="blood">
              <img src="/proj-assets/backtoformosa/img/scene2/blood.svg" alt="">
            </picture>
          </div>
        </div>
      </div>

      <div class="middle__scene" id="middle__scene--3" ref="scene3">
        <div class="scene-heading" id="scene-heading--3">
          <picture class="scene-heading__person">
            <source media="(min-width: 768px)" srcset="/proj-assets/backtoformosa/img/scene3/person-desk.png">
            <img src="/proj-assets/backtoformosa/img/scene3/person-mob.png" alt="">
          </picture>
          <picture class="scene-heading__title">
            <source media="(min-width: 768px)" srcset="/proj-assets/backtoformosa/img/scene3/title-desk.svg">
            <img src="/proj-assets/backtoformosa/img/scene3/title-mob.svg" alt="">
          </picture>
        </div>

        <div class="middle__container">
          <div class="middle__content">
            <p>3 月 18 日，「高雄事件」叛亂案展開為期 9 天的軍法審判，審判席上坐著審判長劉岳平和 4 位審判官，控方則有主任檢察官蔡籐雄和軍事檢察官林輝煌；另一方，則是 8 名被告與蘇貞昌、謝長廷、陳水扁、尤清等 15 名律師組成的辯護團。審判期間開放旁聽和採訪，包含國際人權組織和國外媒體幾乎全程參與，民眾透過報紙記錄的控辯內容，得以暸解美麗島雜誌社幹部舉辦遊行的原因，以及其主張的政治理念。</p>
            <p>公開審判庭一開始，律師團就提出三大質疑，包括<strong>為什麼被告要受軍事審判</strong>、<strong>戒嚴令的合法性</strong><TextNotation><p>警總以戒嚴時期為由，擴充解釋犯罪構成要件，以此限制人民的政治活動。</p></TextNotation>，以及<strong>自白書的任意性</strong><TextNotation><p>被告的自白是出於自願，不是以不正當方法逼供。</p></TextNotation>。黃信介首先接受提訊，他不同意偵訊筆錄的說法，稱自白書是「<strong>他們幫我作文的，我寫了再改，改了再寫</strong>」。檢察官則辯稱「一個人如果沒有犯罪，怎麼會受他人威脅利誘呢」。</p>
            <p>接下來接受提訊的呂秀蓮更披露，偵訊時遭調查人員疲勞審訊和恐嚇，「在那邊有 3、40 天處於失眠狀態，覺得自己一定會死，跟他們合作還可以好好過，就照他們的話去做。」其他人紛紛跟進，例如林義雄就說：「<strong>我只想早點結束這個折磨，筆錄我沒看就簽名了，不知寫些什麼。</strong>」</p>
            <p>張俊宏稱：「調查人員威脅趕快承認，如果不承認的話，<strong>政府會安其他的罪名</strong>。」</p>
            <p>姚嘉文面對審判官詢問，其筆錄裡提及要成立另一個政府，直言「我是說更改國旗、國號並沒有必要，內部改革才是重點，<strong>筆錄都是斷章取義</strong>，沒辦法完整傳達我原本的意思，我認為筆錄沒有參考的價值，庭上應該以今天提訊的內容為主。」</p>
            <p>八個被告裡，只有陳菊一度承認自白書是真實的。呂秀蓮在回憶錄裡曾提及，陳菊因為不認識她的律師，加上偵訊時嚇壞了，在法庭上很順從，直到審訊的最後幾天，才受到呂秀蓮的鼓勵，決定翻供。陳菊的弟弟陳武進出庭時曾說：「我姐姐審理時稱調查局自白實在，我知道她內心是痛苦的，為國家委曲求全，希望庭上以法律立場審理此案。」不過檢察官仍反駁，陳菊先前都承認了，這個翻供是假的，不足以採信。</p>
            <p>除了推翻之前的說詞，被告在法庭上還侃侃而談政治理念，施明德出庭時常常掛著微笑，從容回應審判官的問題，表示「臺灣不存在獨立的問題，只有民主化的內部問題，這涉及到四個層面，包括<strong>黨禁、報禁、戒嚴令和萬年國會</strong>，其中我覺得最嚴重的是黨禁，所以我才會到各地成立服務處，希望成立一個沒有黨名的黨，推動<strong>全民參政</strong>，這是我的目的，絕不是叛亂。」</p>
            <p>檢察官批評施明德，聲稱臺灣獨立已經 30 年，「是棄大陸 7 億同胞不顧嗎？居心叵測！」施明德則援引國際法指出，「獨立有兩種，一種是事實存在，一種是法律存在，現在臺灣國民黨主權不及大陸，然後美國和匪結交，等於承認中共的合法性，我方又硬要和美國建立實質關係，所以我只是陳述事實，不是主張臺灣獨立。」巧妙回應質問。</p>
          </div>
        </div>

        <div class="middle__container" ref="reportPage2">
          <div class="report-page">
            <ReportPageContent v-for="content in reportPageContent[ '2' ]" :content="content" src="scene3/" :key="content.name" />
          </div>
        </div>

        <div class="middle__container">
          <div class="middle__content">
            <p>隨著審判進入尾聲，大部分被告才從家屬在庭上的發言，得知林義雄家發生血案<TextNotation><p>該年 2 月 28 日，林義雄臺北市住家發生兇殺案，其 60 歲母親游阿妹及 7 歲雙胞胎女兒林亮均、林亭均被刺殺身亡，9 歲長女林奐均重傷，此案至今未偵破。促轉會 2020 年 2 月 17 日公布「<a href="https://admin.tjc.gov.tw/public/cipas-uploads/news/2020/02/3952c81b707e941391c462e3b17814cd.pdf" target="_blank">林義雄宅血案調查報告</a>」，指出當年威權統治當局涉案的可能性不容排除。</p></TextNotation>，施明德在最後陳述時情緒難以平復，脫口而出：「林義雄家發生這件悲慘的事，讓我感到這個國家將會受到更多創傷及更大的災禍⋯⋯如果<strong>能帶給國家社會和諧，我請求判我死刑</strong>。」</p>
            <p>林義雄則請求審判官「能擺脫一切政治上、輿論上、感情上的壓力，作最公正判決。」現場氣氛哀戚，從檢察官的話語，也看出他的態度軟化許多，他說：「對林義雄家變，心中很沉痛，我們是以哀矜勿喜的態度處理此案」，但仍不忘訓誡「被告要爭人權、爭自由、政治改革，應該循政治常軌，而不是打破人頭」。</p>
            <p>3 月 28 日，軍法大審結束最後一場言詞辯論，8 名被告還押看守所，等待判決的結果。</p>
          </div>
        </div>
      </div>
    </article>

    <EndingPage ref="ending" />

    <div class="back-to-formosa__after">
      <picture>
        <source media="(min-width: 768px)" srcset="/proj-assets/backtoformosa/img/after/photo-desk.png">
        <img src="/proj-assets/backtoformosa/img/after/photo-mob.png" alt="">
      </picture>
      <div class="after__wrapper">
        <div class="after__caption">
          <p>4 月 18 日</p>
          <p>軍事法庭判決 8 人全部有罪</p>
          <p>施明德判處無期徒刑</p>
          <p>黃信介 14 年有期徒刑</p>
          <p>其餘 6 人 12 年有期徒刑</p>
        </div>
        <AfterTable :tableItems="afterTableItems" />
        <!-- <div class="after__table">
          <div class="after__table__wrapper">
            <p class="after__table__title">施明德<br>服刑 10 年 4 個月</p>
            <p class="after__table__intro">民進黨第 6 屆主席<br>2006 年發起反貪倒扁運動</p>
          </div>
        </div> -->
        <!-- <picture class="after__table">
          <img src="/proj-assets/backtoformosa/img/after/table-desk.png" alt="">
        </picture> -->
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script>
import { ScrollController, controlCoveredEffect, raf } from './util/index.js'
import listItems from './data/listItems.js'
import reportPageContent from './data/reportPageContent.js'
import afterTableItems from './data/afterTableItems.js'

import SlideContainer from './components/SlideContainer.vue'
import ReportPageContent from './components/ReportPageContent.vue'
import ListPageContent from './components/ListPageContent.vue'
import TextNotation from './components/TextNotation.vue'
import EndingPage from './components/EndingPage.vue'
import AfterTable from './components/AfterTable.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'BackToFormosa',
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'backtoformosa',
      metaImage: ''
      // customScript: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"><\/script>'
    }
  },
  components: {
    SlideContainer,
    ReportPageContent,
    ListPageContent,
    TextNotation,
    EndingPage,
    AfterTable,
    TheFooter
  },
  data () {
    return {
      listItems,
      reportPageContent,
      afterTableItems,
      isDarks: [ false, false, false ]
    }
  },
  mounted () {
    const {
      container,
      opening,
      middle,
      ending,
      reportPage1,
      reportPage2,
      listPage
    } = this.$refs

    window.addEventListener('scroll', raf(controlCoveredEffect(opening.$el, middle)))
    window.addEventListener('scroll', raf(controlCoveredEffect(middle, ending.$el)))

    // window.addEventListener('scroll', raf(triggerAnimation(middle, () => { this.animateSceneHeading(scene1HeadingPerson, scene1HeadingTitle, middleText1) }, 0.5)))

    // window.addEventListener('scroll', raf(triggerAnimation(scene3, () => { this.animateSceneHeading(scene3HeadingPerson, scene3HeadingTitle, middleText2) }, 0.5)))

    const scrollController = new ScrollController()

    Array.prototype.forEach.call([ reportPage1, listPage, reportPage2 ], (el, idx) => {
      scrollController.setScrollScene(idx + 1,
        {
          startEl: el,
          includeBottom: true,
          enterStartFn: () => { this.setDarkenPage(idx, true) },
          leaveStartFn: () => { this.setDarkenPage(idx, false) }
        }
      )
    })
  },
  computed: {
    isDark () {
      return this.isDarks.some((d) => d)
    }
  },
  methods: {
    // animateSceneHeading (personEl, titleEl, textEl) {
    //   // const tl = gsap.timeline({ /* repeat: -1, repeatDelay: 1, */ defaults: { duration: 1.2 } })
    //   const tl = gsap.timeline()
    
    //   // tl.set(personEl, { scale: 0.3, opacity: 1 })
    //   // tl.to(personEl, { scale: 0.3, opacity: 0, ease: 'sine.in' })

    //   // tl.set(personEl, { scale: 0.6, opacity: 1 })
    //   // tl.to(personEl, { scale: 0.6, opacity: 0, ease: 'sine.in' })

    //   // tl.set(personEl, { scale: 0.9, opacity: 1 }, '>0.15')

    //   tl.to(personEl, { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' })
    //   tl.to(titleEl, { scale: 1, opacity: 1, duration: 0.45, ease: 'power1.in' }, '<0.45')
    //   tl.to(textEl, { opacity: 1, y: 0, duration: 0.6, ease: 'sine.out' }, '>0.3')
    // },
    setDarkenPage (idx, darken) {
      this.$set(this.isDarks, idx, darken)
    }
  }
}
</script>

<style lang="stylus">
@import '../../util/reset.css'
@import './util/global.styl'

$ff-sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

html
  font-size 10px
  font-family $ff-sans-serif
picture, img
  display block
strong
  font-weight 700
.mg-l-auto
  margin-left auto
.po-r
  position relative

// .animated-content
//   opacity 0
//   transform translateY(16px)
.paused
  animation-play-state paused !important

.back-to-formosa
  overflow hidden
  &__middle
    z-index 9
    position relative
    padding-bottom 80px
    padding-left 10px
    padding-right 10px
    background-color #000
    transition color 0.3s $easeOutSine
    @media (min-width 620px)
      padding-bottom 64vh
      padding-left 0
      padding-right 0
  &__after
    position relative
    z-index 9
    & picture
      width 100%
    & img
      width 100%
      height auto

.bg
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  z-index -1
  &--file
    background-image url(/proj-assets/backtoformosa/img/bg-file.png)
    background-size contain
    background-repeat repeat
  &--dark
    background-color rgba(#000, 0.8)
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    transition opacity 0.3s $easeOutSine

.scene-heading
  position relative
  margin-bottom 10px
  @media (min-width $breakpoint-md)
    position absolute
    top 0
    left 0
    margin-bottom 0
  // &__person
  //   transform-origin 50% 40%
  &__title
    position absolute
    width 100%
    top 0
    left 0
    // transform-origin 50% 60%
  & img
    width 100%
    height auto

#scene-heading
  &--1
    @media (min-width $breakpoint-md)
      max-width 862px
      width 59.86%
      left -6.25%
    & .scene-heading
      &__person
        animation heading1 0.9s $easeOutCubic both
      &__title
        animation heading1 0.45s 0.45s $easeInQuad both
  &--3
    margin-left -10px
    margin-right -10px
    @media (min-width $breakpoint-md)
      max-width 1062px
      width 73.75%
      margin-left 0
      margin-right 0

@keyframes heading1
  0%
    opacity 0
    transform scale(1.8)
  100%
    opacity 1
    transform scale(1)

#scene2
  &-title
    @media (min-width $breakpoint-md)
      width 62.5%
      right 7.43%
      max-width 900px
      margin-left auto
      position relative
    & img
      width 100%
      height auto
  &-yao
    padding-top 10px
    padding-bottom 35px
    @media (min-width $breakpoint-md)
      margin-top 28px
      padding-top 0
      padding-bottom 0
    & picture
      max-width 300px
      right -10.94%
      position relative
      @media (min-width $breakpoint-md)
        position absolute
        max-width 500px
        top 0
        right -7.64%
    & img
      width 100%
      height auto
#middle-yao-container
  position relative
  @media (min-width $breakpoint-md)
    padding-top 120px

.middle
  &__scene
    position relative
  &__container
    margin-right auto
    margin-left auto
    max-width 600px
  &__content
    font-size 1.6rem
    line-height 1.75
    & p + p
      margin-top 28px
#middle
  &__scene
    &--1, &--3
      @media (min-width $breakpoint-md)
        padding-top 64vh
    &--2
      // padding-top 20px
      // @media (min-width $breakpoint-md)
      padding-top 80px

.after
  &__wrapper
    background-image linear-gradient(to bottom, #a56c6a, #000000)
    padding-top 32px
  &__caption
    font-size 2.0rem
    line-height 1.4
    display flex
    flex-direction column
    align-items center
    & p
      padding 3px 14px
      background-color rgba(#fff, 0.7)
      & + p
        margin-top 16px

.report-page, .list-page
  // padding-top 20vh
  // padding-bottom 20vh
  padding-top 40vh
  margin-bottom 40vh
  &__intro
    font-size 2.0rem
    font-weight 500
    text-align center
    line-height 1.8
    margin-bottom 128px
    @media (min-width $breakpoint-md)
      margin-bottom 152px
.list-page
  position relative

.report-page-content__qa picture
  margin-left auto
  margin-right auto
  margin-top 20px
  @media (min-width $breakpoint-md)
    margin-top 0
    align-self center
  &.lin
    width 80px
    @media (min-width $breakpoint-md)
      margin-left 20px
  &.chen
    width 50px
    @media (min-width $breakpoint-md)
      margin-left 24px
  &.huang
    width 70px
    @media (min-width $breakpoint-md)
      margin-left 32px

#blood
  position absolute
  width 564px
  top -208px
  z-index -1
  @media (min-width $breakpoint-md)
    // 292 + 36
    top 328px
    // 120 / 600
    left -20%
    width 1500px
</style>
