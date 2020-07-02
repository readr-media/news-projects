<template>
  <div>
    <section class="landing center">
      <h1>Landing（一屏）</h1>
    </section>
    <section class="scrolly">
      <figure class="scrolly__sticky-chart sticky-chart">
        <template v-if="$store.state.viewport[0] >= 768">
          <ChartFullData
            v-if="chartIndexScrolly >= 1 && chartIndexScrolly <= 3"
            class="sticky-chart__bubble-chart"
            :chart-index="chartIndexScrolly"
          />
          <ChartLine
            v-if="chartIndexScrolly === 3"
            class="sticky-chart__line-chart"
          />
        </template>
        <template v-else>
          <ChartFullDataMobile
            v-if="chartIndexScrolly >= 1"
            class="sticky-chart__bubble-chart"
            :chart-index="chartIndexScrolly"
          />
          <ChartLineMobile
            v-if="chartIndexScrolly === 3"
            class="sticky-chart__line-chart"
          />
        </template>
      </figure>
      <article class="scrolly__textboxes textboxes">
        <div
          class="enter-view-step textboxes__textbox textboxes__textbox--scrolly"
          data-chart="1"
        >
          <p>在武漢肺炎的疫情仍在中國境內傳播時，假訊息傳播的速度顯然比較快。READr 分析國際事實查核組織聯盟超過 5000 篇查核報告，帶你看這五個月以來假訊息傳播的趨勢。</p>
        </div>
        <div
          class="enter-view-step textboxes__textbox textboxes__textbox--scrolly"
          data-chart="2"
        >
          <p>從事實查核報告的數量變化可以觀察到，2 月初期有一波小高峰，這時因為疫情主要都在中國，各國主要的假訊息主題跟和「中國」有關。</p>
        </div>
        <div
          class="enter-view-step textboxes__textbox textboxes__textbox--scrolly"
          data-chart="3"
        >
          <p>但隨著病毒傳播到全世界，各國也開始面臨鋪天蓋地的假訊息。</p>
          <div class="mobile-only">
            <br>
            <p><span class="orange">2/21</span> 伊朗開始成為傳染節點</p>
            <p><span class="orange">2/25</span> 義大利開始成為傳染節點</p>
            <p><span class="orange">2/29</span> 美國出現第一起死亡案例</p>
          </div>
        </div>
      </article>
    </section>
    <section class="long-chart long-chart-group-by-country">
      <template v-if="showLongChartsCountry">
        <template v-if="$store.state.viewport[0] >= 768">
          <ChartGroupByCountry class="long-chart__chart" />
        </template>
        <template v-else>
          <ChartGroupByCountryMobile class="long-chart__chart" />
        </template>
      </template>
      <article class="long-chart__textboxes textboxes" :class="{ fix: shouldFixLongChartArticleCountry }">
        <div class="textboxes__textbox">
          <p>在所有國家中，印度的假訊息查核報告是最多的。除了當地事實查核組織的活躍度以外，也彰顯出印度受到假訊息的危害程度。</p>
        </div>
      </article>
    </section>
    <section class="long-chart long-chart-group-by-platform">
      <template v-if="showLongChartsPlatform">
        <template v-if="$store.state.viewport[0] >= 768">
          <ChartGroupByPlatform class="long-chart__chart" />
        </template>
        <template v-else>
          <ChartGroupByPlatformMobile class="long-chart__chart" />
        </template>
      </template>
      <article class="long-chart__textboxes textboxes" :class="{ fix: shouldFixLongChartArticlePlatform }">
        <div class="textboxes__textbox">
          <p>而這些假訊息有超過一半都是透過 Facebook 傳播。社群平台 Twitter 和通訊軟體 Whatsapp 也是散播的主要媒介。</p>
        </div>
      </article>
    </section>
    <section class="long-chart long-chart-group-by-topic">
      <template v-if="showLongChartsTopic">
        <template v-if="$store.state.viewport[0] >= 768">
          <ChartGroupByTopic class="long-chart__chart" />
        </template>
        <template v-else>
          <ChartGroupByTopicMobile class="long-chart__chart" />
        </template>
      </template>
      <article class="long-chart__textboxes textboxes" :class="{ fix: shouldFixLongChartArticleTopic }">
        <div class="textboxes__textbox">
          <p>我們參考路透社新聞研究所的研究方法，人工替這些查核報告裡的假訊息分類，發現「病毒在社區中的傳播」（通常是誇大疫情的影響）是最多的。</p>
        </div>
      </article>
    </section>
    <section class="scrolly">
      <figure class="scrolly__sticky-chart sticky-chart">
        <template v-if="$store.state.viewport[0] >= 768">
          <br>
          <br>
          <br>
          <p>pending</p>
        </template>
        <template v-else>
          <br>
          <br>
          <br>
          <p>pending</p>
        </template>
      </figure>
      <article class="scrolly__textboxes textboxes">
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="1"
        >
          <p>數量最多的，是「病毒在社區中的傳播」類的假訊息。內容主要闡述疫情的影響，例如誇大疫情的影響，如疫情造成民眾自殺、引起抗議等；或聲稱某個地方首次遭到病毒感染；指責某些種特定種族傳播病毒等等。平均每 4 則假訊息就有 1 則是這個主題。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="2"
        >
          <p>「棺材」（coffins）——用滿地是棺材的照片傳言該地區已經因為武漢肺炎死了很多人</p>
          <p>「病例」（case）——宣稱某個地區已經有了第一起武漢肺炎病例</p>
          <p>「圖片」（images）——挪用各式各樣不相干的圖片來誇大疫情的影響</p>
          <p>「委內瑞拉」（venezuela）——佯稱義大利人覺得「錢對挽救生命毫無用處」，把錢撒在馬路上。但原本的故事發生在委內瑞拉，且與武漢肺炎無關</p>
          <p>「暴動」（riots）——英國倫敦因為食物不足引起了暴動，但事實上挪用了舊影片</p>
        </div>
      </article>
    </section>
    <section class="text-only-section">
      <p>除了主題以外，READr 也嘗試探索這些假訊息的影響力。根據事實查核組織的註記，在這些報告中，有 782 篇是在 Twitter 上散佈的假訊息。我們人工抓出報告中假訊息的原文（由於有些事實查核報吿沒有標記原文、有些原文在 Twitter 上已經佚失，共找到 351 篇，佔整體 45%），並在 Twitter 以及政治大學鄭宇君團隊提供的 Twitter 封存推文資料中查詢它們的影響力。發現了不太一樣的趨勢。</p>
    </section>
    <section class="scrolly">
      <figure class="scrolly__sticky-chart sticky-chart">
        <template v-if="$store.state.viewport[0] >= 768">
          <img
            v-show="chartIndexScrollyRetweet === 1"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-1-web.png"
            alt="retweet-chart-1"
          >
          <img
            v-show="chartIndexScrollyRetweet === 2"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-2-web.png"
            alt="retweet-chart-2"
          >
          <img
            v-show="chartIndexScrollyRetweet === 3"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-3-web.png"
            alt="retweet-chart-3"
          >
          <img
            v-show="chartIndexScrollyRetweet === 4"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-4-web.png"
            alt="retweet-chart-4"
          >
          <img
            v-show="chartIndexScrollyRetweet === 5"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-5-web.png"
            alt="retweet-chart-5"
          >
          <img
            v-show="chartIndexScrollyRetweet === 6"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-6-web.png"
            alt="retweet-chart-6"
          >
        </template>
        <template v-else>
          <img
            v-show="chartIndexScrollyRetweet === 1"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-1-mobile.png"
            alt="retweet-chart-1"
          >
          <img
            v-show="chartIndexScrollyRetweet === 2"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-2-mobile.png"
            alt="retweet-chart-2"
          >
          <img
            v-show="chartIndexScrollyRetweet === 3"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-3-mobile.png"
            alt="retweet-chart-3"
          >
          <img
            v-show="chartIndexScrollyRetweet === 4"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-4-mobile.png"
            alt="retweet-chart-4"
          >
          <img
            v-show="chartIndexScrollyRetweet === 5"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-5-mobile.png"
            alt="retweet-chart-5"
          >
          <img
            v-show="chartIndexScrollyRetweet === 6"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-6-mobile.png"
            alt="retweet-chart-6"
          >
        </template>
      </figure>
      <article class="scrolly__textboxes textboxes">
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="1"
        >
          <p>從轉推數可以看到，影響力最大的假訊息分類是「因為疫情衍生出的行為」，但從事實查核報告的統計中，此類型假訊息的數量只佔整體 8%。</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="2"
        >
          <p>轉推數第一名、第二名的假訊息都是有關大自然因為人類減少活動而恢復。</p>
          <br>
          <p>被轉推了超過 30 萬次的這兩則推文是關於一組海豚與天鵝現身義大利威尼斯水道的照片。但事實上海豚沒有現身在那裡，天鵝也不是因為武漢肺炎封城後才出現，這是一種誤導的假訊息。</p>
          <br>
          <p>在疾病大流行的氛圍中，這類的訊息是一種「好消息」，但追根究底它們還是假的。</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="3"
        >
          <p>這類的假訊息除了大自然恢復平靜以外，也包含了政治人物的說法或是政治鬥爭。由於這些人本身在推特上就有很多追蹤者，所說的話自然也容易被關注。</p>
          <br>
          <p>轉推數第三名的假訊息來自美國總統川普——但需要注意的是，讓它成為假訊息的原因是後續的效應——川普在推特上不斷稱讚奎寧的療效，加上媒體錯誤報導推波助瀾，讓害怕染疫的人在沒有醫囑的狀況下自行服用，造成危險。</p>
          <br>
          <p>前副總統喬・拜登的推文也在榜上。他指出對武漢肺炎提出警告的疾管署官員不再被重用，但被華盛頓郵報查核所言並非全部屬實。</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="4"
        >
          <p>「病毒在社區中的傳播」、「醫學相關、疾病的影響」這兩個分類，在查核報告的統計中數量是最多的。</p>
          <br>
          <p>從轉推數來看，「醫學相關」的假訊息的影響力似乎大過於「病毒在社區中的傳播」，但那是因為前 2 則轉推數最高的都與川普稱讚奎寧的療效引發的效應有關。</p>
          <br>
          <p>若撇除這 2 則，兩個分類的影響力差不多。而在推特上關於「病毒在社區中的傳播」、影響力又較大的假訊息相對比較多。</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="5"
        >
          <p>都是影片：一位醫生嘗試想要擁抱據說感染了武漢肺炎而被隔離的嬰兒的影片，在推特上瘋傳；義大利人於隔離期間在自己的陽台上唱歌跳舞；違反檢疫規定的義大利人被警察當場逮捕；居住在中國的黑人被亞洲人圍毆攻擊⋯⋯</p>
          <br>
          <p>被感人的、開心的、可怕的，都是會令人感到「共鳴」的元素，讓人想要分享。這是假訊息傳播的要件之一。</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="6"
        >
          <p>「醫學相關」的內容中，除了奎寧以外，「布洛芬」會對患者造成負面影響的訊息也在推特上傳佈。</p>
          <br>
          <p>從這些內容中可以看見，武漢肺炎沒有特效藥的恐懼還在驅動著人們找尋解答。</p>
        </div>
      </article>
    </section>
    <section class="text-only-section">
      <p>武漢肺炎疫情仍在全球延燒，但除了病毒之外，還需要注意的是與病毒一樣會奪取人們性命、甚至跑得比病毒還快的假訊息。關於這些假訊息的影響力，請見 READr 製作的另一篇報導：武漢肺炎——跑得比病毒還快的假訊息。</p>
    </section>
    <Footer style="margin-top: 50px" />
  </div>
</template>

<script>
  import enterView from 'enter-view'
  import scrollama from 'scrollama'
  import ChartFullData from './ChartFullData.vue'
  import ChartFullDataMobile from './ChartFullDataMobile.vue'
  import ChartLine from './ChartLine.vue'
  import ChartLineMobile from './ChartLineMobile.vue'
  import ChartGroupByCountry from './ChartGroupByCountry.vue'
  import ChartGroupByCountryMobile from './ChartGroupByCountryMobile.vue'
  import ChartGroupByPlatform from './ChartGroupByPlatform.vue'
  import ChartGroupByPlatformMobile from './ChartGroupByPlatformMobile.vue'
  import ChartGroupByTopic from './ChartGroupByTopic.vue'
  import ChartGroupByTopicMobile from './ChartGroupByTopicMobile.vue'
  import Footer from './Footer.vue'

  export default {
    components: {
      ChartFullData,
      ChartFullDataMobile,
      ChartLine,
      ChartLineMobile,
      ChartGroupByCountry,
      ChartGroupByCountryMobile,
      ChartGroupByPlatform,
      ChartGroupByPlatformMobile,
      ChartGroupByTopic,
      ChartGroupByTopicMobile,
      Footer
    },
    data() {
      return {
        chartIndexScrolly: 0,
        chartIndexScrollyTopics: 0,
        chartIndexScrollyRetweet: 0,
        showLongChartsCountry: false,
        showLongChartsPlatform: false,
        showLongChartsTopic: false,
        shouldFixLongChartArticleCountry: false,
        shouldFixLongChartArticlePlatform: false,
        shouldFixLongChartArticleTopic: false
      }
    },
    mounted() {
      enterView({
        selector: '.enter-view-step',
        enter: (el) => {
          this.chartIndexScrolly = parseInt(el.dataset.chart)
        },
        exit: (el) => {
          this.chartIndexScrolly = parseInt(el.dataset.chart) - 1
        },
      })
      enterView({
        selector: '.enter-view-step-topics',
        enter: (el) => {
          this.chartIndexScrollyTopics = parseInt(el.dataset.chart)
        },
        exit: (el) => {
          this.chartIndexScrollyTopics = parseInt(el.dataset.chart) - 1
        },
      })
      enterView({
        selector: '.enter-view-step-retweet',
        enter: (el) => {
          this.chartIndexScrollyRetweet = parseInt(el.dataset.chart)
        },
        exit: (el) => {
          this.chartIndexScrollyRetweet = parseInt(el.dataset.chart) - 1
        },
      })


      const scrollerCountry = scrollama()
        .setup({
          step: '.long-chart-group-by-country',
          offset: 1,
        })
        .onStepEnter((response) => {
          this.showLongChartsCountry = true
          this.shouldFixLongChartArticleCountry = true
        })
        .onStepExit((response) => {
          this.shouldFixLongChartArticleCountry = false
        })
      window.addEventListener('resize', scrollerCountry.resize)

      const scrollerPlatform = scrollama()
        .setup({
          step: '.long-chart-group-by-platform',
          offset: 1,
        })
        .onStepEnter((response) => {
          this.showLongChartsPlatform = true
          this.shouldFixLongChartArticlePlatform = true
        })
        .onStepExit((response) => {
          this.shouldFixLongChartArticlePlatform = false
        })
      window.addEventListener('resize', scrollerPlatform.resize)

      const scrollerTopic = scrollama()
        .setup({
          step: '.long-chart-group-by-topic',
          offset: 1,
        })
        .onStepEnter((response) => {
          this.showLongChartsTopic = true
          this.shouldFixLongChartArticleTopic = true
        })
        .onStepExit((response) => {
          this.shouldFixLongChartArticleTopic = false
        })
      window.addEventListener('resize', scrollerTopic.resize)
    }
  }
</script>

<style scoped>
  .mobile-only {
    display: block;
  }

  .orange {
    color: #ec894c;
  }
  figure {
    margin: 0;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .landing {
    height: 100vh;
    background-color: rgba(51, 51, 51, 0.9);
  }

  .scrolly__sticky-chart {
    position: sticky;
    width: 100%;
    height: 100vh;
    /*background-color: gray;*/
    top: 0;
    left: 0;
  }
  .sticky-chart__line-chart {
    position: absolute;
    top: 0;
    left: 0;
  }
  .sticky-chart__bubble-chart {
    position: absolute;
    top: 0;
    left: 0;
  }
  .scrolly__textboxes {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .textboxes__textbox {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    line-height: 1.75;
  }
  .textboxes__textbox p {
    margin: 0;
  }
  .textboxes__textbox--scrolly {
    margin-bottom: 100vh;
  }

  .long-chart {
    position: relative;
    padding: 0 0 200px 0;
  }
  /*.long-chart__chart {*/
  /*  height: 200vh;*/
  /*  background-color: #a0aec0;*/
  /*}*/
  .long-chart__textboxes {
    position: absolute;
    bottom: 10px;
    right: 10px;
    max-width: 80%;
  }
  .long-chart__textboxes.fix {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }

  .text-only-section {
    max-width: 820px;
    font-size: 16px;
    line-height: 1.75;
    text-align: justify;
    color: #4a4a4a;
    margin: 0 20px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  img {
    display: block;
    height: calc(100% - 50px);
    object-fit: contain;
    margin: 0 auto;
    padding-top: 50px;
  }

  @media (min-width: 768px) {
    .mobile-only {
      display: none;
    }

    .scrolly__textboxes	{
      width: 400px;
      margin: 0 200px 0 auto;
    }

    .long-chart__textboxes {
      width: 400px;
      right: 200px;
    }
    .long-chart__textboxes.fix {
      right: 200px;
    }

    .text-only-section {
      margin: 0 auto;
    }

    img {
      display: block;
      height: calc(100% - 50px);
      object-fit: contain;
      margin: 0 auto;
      padding-top: 50px;
    }
  }
</style>
