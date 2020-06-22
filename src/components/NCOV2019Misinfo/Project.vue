<template>
  <div>
    <section class="landing center">
      <h1>Landing（一屏）</h1>
    </section>

    <section class="scrolly">
      <figure class="scrolly__sticky-chart">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        {{currentChart}}
      </figure>
      <article class="scrolly__textboxes textboxes">
        <div class="enter-view-step textboxes__textbox textboxes__textbox--scrolly" data-chart="1">
          <p>在武漢肺炎的疫情仍在中國境內傳播時，假訊息傳播的速度顯然比較快。READr 分析國際事實查核組織聯盟超過 5000 篇查核報告，帶你看這五個月以來假訊息傳播的趨勢。</p>
        </div>
        <div class="enter-view-step textboxes__textbox textboxes__textbox--scrolly" data-chart="2">
          <p>在二月時，主要的假訊息的主題跟「中國」有關。</p>
        </div>
        <div class="enter-view-step textboxes__textbox textboxes__textbox--scrolly" data-chart="3">
          <p>但隨著病毒傳播到全世界，各國也開始面臨鋪天蓋地的假訊息。

            2/21 伊朗開始成為傳染節點
            2/25 義大利開始成為傳染節點
            2/29 美國出現第一起死亡案例

          </p>
        </div>
        <div class="enter-view-step textboxes__textbox textboxes__textbox--scrolly" data-chart="4">
          <p>副標要家海上童以裡定流不一臺</p>
        </div>
      </article>
    </section>

    <section class="long-chart">
      <figure class="long-chart__chart">
        <p style="height: 500px">這是一張很長的圖表</p>
        <p>真的很長</p>
      </figure>
      <article class="long-chart__textboxes textboxes" :class="{ fix: shouldFixLongChartArticle }">
        <div class="textboxes__textbox">
          <p>在武漢肺炎的疫情仍在中國境內傳播時，假訊息傳播的速度顯然比較快。READr 分析國際事實查核組織聯盟超過 5000 篇查核報告，帶你看這五個月以來假訊息傳播的趨勢。</p>
        </div>
      </article>
    </section>

    <section class="scrolly">
      <figure class="scrolly__sticky-chart">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        {{currentChart}}
      </figure>
      <article class="scrolly__textboxes textboxes">
        <div class="enter-view-step textboxes__textbox textboxes__textbox--scrolly" data-chart="1">
          <p>在武漢肺炎的疫情仍在中國境內傳播時，假訊息傳播的速度顯然比較快。READr 分析國際事實查核組織聯盟超過 5000 篇查核報告，帶你看這五個月以來假訊息傳播的趨勢。</p>
        </div>
        <div class="enter-view-step textboxes__textbox textboxes__textbox--scrolly" data-chart="2">
          <p>在二月時，主要的假訊息的主題跟「中國」有關。</p>
        </div>
        <div class="enter-view-step textboxes__textbox textboxes__textbox--scrolly" data-chart="3">
          <p>但隨著病毒傳播到全世界，各國也開始面臨鋪天蓋地的假訊息。

            2/21 伊朗開始成為傳染節點
            2/25 義大利開始成為傳染節點
            2/29 美國出現第一起死亡案例

          </p>
        </div>
        <div class="enter-view-step textboxes__textbox textboxes__textbox--scrolly" data-chart="4">
          <p>副標要家海上童以裡定流不一臺</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
  import enterView from 'enter-view'
  import scrollama from 'scrollama'

  export default {
    data() {
      return {
        currentChart: '',
        shouldFixLongChartArticle: false
      }
    },
    mounted() {
      enterView({
        selector: '.enter-view-step',
        enter: (el) => {
          const chartStepNumber = parseInt(el.dataset.chart)
          this.currentChart = `一屏圖表，變化： ${chartStepNumber}`
        },
        exit: (el) => {
          const chartStepNumber = parseInt(el.dataset.chart) - 1
          this.currentChart = `一屏圖表，變化： ${chartStepNumber}`
        },
      })

      const scroller = scrollama()
        .setup({
          step: '.long-chart',
          offset: 1,
        })
        .onStepEnter((response) => {
          this.shouldFixLongChartArticle = true
        })
        .onStepExit((response) => {
          this.shouldFixLongChartArticle = false
        })
      window.addEventListener('resize', scroller.resize)
    }
  }
</script>

<style scoped>
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
    background-color: gray;
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
  }
  .textboxes__textbox--scrolly {
    margin-bottom: 100vh;
  }

  .long-chart {
    position: relative;
  }
  .long-chart__chart {
    height: 200vh;
    background-color: #a0aec0;
  }
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

  @media (min-width: 768px) {
    .scrolly__textboxes	{
      width: 400px;
      margin: 0 200px 0 auto;
    }

    .long-chart__textboxes	{
      width: 400px;
      right: 200px;
    }
    .long-chart__textboxes.fix	{
      right: 200px;
    }
  }
</style>
