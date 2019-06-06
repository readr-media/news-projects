<template>
  <main class="section-content-story">
    <article v-if="slug === 'story1'">
      <h1 class="section-content-story__title">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.TITLE') }}
      </h1>
      <SectionContentCredits :publishedDate="'2017/11/9'"/>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[0]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[1]') }}
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            {{ $t('POLITICAL_CONTRIBUTION.STORY1.HINTS[0]') }}
          </div>
        </SectionContentStorysInfoboxHint>
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[2]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[3]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[4]') }}
        <a class="section-content-story__link" href="https://g0v.hackpad.tw/8ow2GnliH48" target="_blank">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[5]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[6]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[7]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[8]') }}
      </div>
      <!-- chart1-1 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.CHART_TITLES[0]') }}
        </h2>
        <div class="chart-container">
          <BarHorizontalStackedOrdinalDonatesFrom
            class="chart-container__chart--wide"
            id="chart1-1"
            :ordinal="'ninth'"
            :legends="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM_LEGENDS"
            :data="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[9]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[10]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[11]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[12]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[13]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[14]') }}
      </div>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[0].P[0]') }}
        </div>
        <div class="section-content-story__paragraph">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[0].P[1]') }}
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （{{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[0].QUOTE_BY') }}）
        </div>
      </blockquote>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[1].P[0]') }}
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （{{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[1].QUOTE_BY') }}）
        </div>
      </blockquote>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[2].P[0]') }}
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （{{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[2].QUOTE_BY') }}）
        </div>
      </blockquote>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[3].P[0]') }}
        </div>
        <div class="section-content-story__paragraph">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[3].P[1]') }}
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （{{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[3].QUOTE_BY') }}）
        </div>
      </blockquote>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[4].P[0]') }}
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （{{ $t('POLITICAL_CONTRIBUTION.STORY1.QUOTES[4].QUOTE_BY') }}）
        </div>
      </blockquote>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[15]') }}
        <router-link class="section-content-story__link" to="explore" v-scroll-to="'.section-content'">
          {{ $t('POLITICAL_CONTRIBUTION.STORY1.P[16]') }}
        </router-link>
      </div>
    </article>
    <article v-if="slug === 'story2'">
      <h1 class="section-content-story__title" v-html="$t('POLITICAL_CONTRIBUTION.STORY2.TITLE')"></h1>
      <SectionContentCredits :publishedDate="'2017/11/13'"/>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[0]') }}
      </div>
      <!-- chart2-1 here -->
      <div class="visualization">
        <h2 class="visualization__title"><span class="visualization__title--highlight">{{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[0][0]') }}</span>{{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[0][1]') }}</h2>
        <h3 class="visualization__subtitle visualization__subtitle--mobile">點擊方塊看獻金資訊</h3>
        <iframe
          src="https://plotdb.io/v/chart/14734"
          width="100%"
          height="500px"
          allowfullscreen="true"
          frameborder="0"
        >
        </iframe>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[1]') }}
      </div>
      <!-- chart2-2 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[1]') }}
        </h2>
        <div class="chart-container">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="chart2-2"
            :ordinal="'ninth'"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_TOTAL"
          />
        </div>
      </div>
      <!-- chart2-3 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[2]') }}
        </h2>
        <div class="chart-container">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="chart2-3"
            :ordinal="'ninth'"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_COMPANY"
          />
        </div>
      </div>
      <h2 class="section-content-story__subtitle">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.SUBTITLES[0]') }}
      </h2>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[2]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[3]') }}
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            {{ $t('POLITICAL_CONTRIBUTION.STORY2.HINTS[0][0]') }}
            <a
              class="section-content-story__link"
              href="http://ir.lib.pccu.edu.tw/retrieve/46392/RRPG10105-0231-2751535.pdf"
              target="_blank"
            >
              {{ $t('POLITICAL_CONTRIBUTION.STORY2.HINTS[0][1]') }}
            </a>
          </div>
        </SectionContentStorysInfoboxHint>
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[4]') }}
      </div>
      <!-- chart2-4 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[3]') }}
        </h2>
        <div class="chart-container">
          <TableDuel
            class="chart-container__chart"
            id="chart2-4"
            :ordinal="'ninth'"
            :data="CHART_DATA.DATA_ORDINAL_DUEL_RE_ELECTED_OR_NOT"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[5]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[6]') }}
      </div>
      <!-- chart2-5 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[4]') }}
        </h2>
        <div class="chart-container">
          <TableTopTen
            class="chart-container__chart chart-container__chart--wide"
            id="chart2-5"
            :legends="CHART_DATA.DATA_NINTH_TOP_TEN_NOT_RE_ELECTED_LEGENDS"
            :data="CHART_DATA.DATA_NINTH_TOP_TEN_NOT_RE_ELECTED"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[7]') }}
      </div>
      <!-- chart2-6 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[5]') }}
        </h2>
        <div class="chart-container">
          <TableDuel
            class="chart-container__chart"
            id="chart2-6"
            :ordinal="'ninth'"
            :data="CHART_DATA.DATA_ORDINAL_DUEL_NEWBIE_ELECTED_OR_NOT"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[8]') }}
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            {{ $t('POLITICAL_CONTRIBUTION.STORY2.HINTS[1][0]') }}
            <a
              class="section-content-story__link"
              href="http://topic.cw.com.tw/2015politicaldynasty/"
              target="_blank"
            >
              {{ $t('POLITICAL_CONTRIBUTION.STORY2.HINTS[1][1]') }}
            </a>
            {{ $t('POLITICAL_CONTRIBUTION.STORY2.HINTS[1][2]') }}
          </div>
        </SectionContentStorysInfoboxHint>
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[9]') }}
      </div>
      <!-- chart2-7 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[6]') }}
        </h2>
        <div class="chart-container">
          <TableTopTen
            class="chart-container__chart chart-container__chart--wide"
            id="chart2-7"
            :legends="CHART_DATA.DATA_NINTH_TOP_TEN_NOT_NEWBIE_ELECTED_LEGENDS"
            :data="CHART_DATA.DATA_NINTH_TOP_TEN_NOT_NEWBIE_ELECTED"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[10]') }}
      </div>
      <!-- chart2-8 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[7]') }}
        </h2>
        <div class="chart-container">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="chart2-8"
            :ordinal="'ninth'"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_BUT_LOST"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[11]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[12]') }}
      </div>
      <!-- chart2-9 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY2.CHART_TITLES[8]') }}
        </h2>
        <div class="chart-container">
          <ParallelOrdinalPartyDonatesFrom
            class="chart-container__chart"
            id="chart2-9"
            :ordinal="'ninth'"
            :legends="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[13]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[14]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[15]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY2.P[16]') }}
      </div>
    </article>
    <article v-if="slug === 'story3'">
      <h1 class="section-content-story__title" v-html="$t('POLITICAL_CONTRIBUTION.STORY3.TITLE')"></h1>
      <SectionContentCredits :publishedDate="'2017/11/15'" :showSpecialThanks="true"/>
      <!-- chart3-1 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY3.CHART_TITLES[0]') }}
        </h2>
        <div class="chart-container">
          <BarVerticalStackedOrdinalDonatesFrom
            class="chart-container__chart"
            id="chart3-1"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[0]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[1]') }}
        <a
          class="section-content-story__link"
          href="https://www.academia.edu/27129103/%E4%BC%81%E6%A5%AD%E6%AC%8A%E5%8A%9B%E8%88%87%E6%B0%91%E4%B8%BB_%E5%8F%B0%E7%81%A3%E4%BC%81%E6%A5%AD%E9%9B%86%E5%9C%982008%E5%B9%B4%E7%AB%8B%E5%A7%94%E9%81%B8%E8%88%89%E7%9A%84%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E5%88%86%E6%9E%90"
          target="_blank"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[2]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[3]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[4]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[5]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[6]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[7]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[8]') }}
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            {{ $t('POLITICAL_CONTRIBUTION.STORY3.HINTS[0]') }}
          </div>
        </SectionContentStorysInfoboxHint>
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[9]') }}
      </div>
      <!-- chart3-2 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY3.CHART_TITLES[1]') }}
        </h2>
        <div class="chart-container">
          <ScatterOrdinalCorpDonates
            class="chart-container__chart chart-container__chart--narrow"
            id="chart3-2"
            :ordinal="'ninth'"
            :howManyNodes="20"
          />
          <SectionContentDashboardOrdinalCorpDonatesMobile
            class="chart-container__chart"
            id="chart3-2-mobile"
            :ordinal="'ninth'"
            :howManyNodes="20"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[10]') }}
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            {{ $t('POLITICAL_CONTRIBUTION.STORY3.HINTS[1]') }}
          </div>
        </SectionContentStorysInfoboxHint>
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[11]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[12]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[13]') }}
        <a
          class="section-content-story__link"
          href="https://www.academia.edu/27129103/%E4%BC%81%E6%A5%AD%E6%AC%8A%E5%8A%9B%E8%88%87%E6%B0%91%E4%B8%BB_%E5%8F%B0%E7%81%A3%E4%BC%81%E6%A5%AD%E9%9B%86%E5%9C%982008%E5%B9%B4%E7%AB%8B%E5%A7%94%E9%81%B8%E8%88%89%E7%9A%84%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E5%88%86%E6%9E%90"
          target="_blank"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[14]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[15]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[16]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[17]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[18]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[19]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[20]') }}
      </div>
      <!-- chart3-3 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY3.CHART_TITLES[2]') }}
        </h2>
        <div class="chart-container">
          <BarHorizontalOrdinalIndustryDonates
            class="chart-container__chart"
            id="chart3-3"
            :ordinal="'ninth'"
            :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_DONATES_INDUSTRY"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[21]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[22]') }}
      </div>
      <!-- chart3-4 here -->
      <div class="visualization">
        <h2 class="visualization__title">
          {{ $t('POLITICAL_CONTRIBUTION.STORY3.CHART_TITLES[3]') }}
        </h2>
        <div class="chart-container">
          <BarHorizontalOrdinalIndustryParticipate
            class="chart-container__chart"
            id="chart3-4"
            :ordinal="'ninth'"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[23]') }}
        <a
          class="section-content-story__link"
          href="https://www.economist.com/international/2016/05/07/the-party-winds-down"
          target="_blank"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[24]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[25]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[26]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[27]') }}
        <a
          class="section-content-story__link"
          href="https://www.economist.com/graphic-detail/2016/05/05/comparing-crony-capitalism-around-the-world"
          target="_blank"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[28]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[29]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[30]') }}
        <a
          class="section-content-story__link"
          href="http://ir.lib.pccu.edu.tw/retrieve/46392/RRPG10105-0231-2751535.pdf"
          target="_blank"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[31]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[32]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[33]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[34]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY3.P[35]') }}
      </div>
    </article>
    <article v-if="slug === 'story4'">
      <h1 class="section-content-story__title">政治獻金開放了嗎？</h1>
      <SectionContentCredits :publishedDate="'2017/11/16'"/>
      <div class="section-content-story__paragraph">
        「（政治獻金資料）完全不算公開啊。資料的價值是在能被使用，而不是在紙上被人家看。」 2014 年 g0v <a class="section-content-story__link" href="https://g0v.hackpad.tw/8ow2GnliH48" target="_blank">政治獻金透明化專案</a>共同發起人王向榮
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            與王向榮的訪談逐字稿，請<a class="section-content-story__link" href="https://readr.sayit.mysociety.org/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%912014%E5%B9%B4-g0v-%E5%B0%88%E6%A1%88%E7%99%BC%E8%B5%B7%E4%BA%BA%E7%8E%8B%E5%90%91%E6%A6%AE%E5%B0%88%E8%A8%AA" target="_blank">點此</a>
          </div>
        </SectionContentStorysInfoboxHint>
        提到。
      </div>
      <div class="section-content-story__paragraph">
        政治獻金透明化始於某次黑客松。公民團體「反核四五六」帶來從監察院印出的七個政治獻金專戶明細，希望檢視支持核電的候選人背後的政商關係，「 g0v 的精神就是開放政府，希望政府的資訊都能盡量簡單的被大家索取用利用。當時知道了政治獻金的明細只能透過紙本這種超不方便的方式取得，讓 g0v 很多的參與者憤憤不平。」王向榮提到，但由於當時政府還沒有開放資料的觀念，只能先嘗試自力救濟。
      </div>
      <div class="section-content-story__paragraph">
        「然後當時時間點也跟太陽花運動差不多，網路上的許多鄉民都對政府的黑箱極度不滿，很想做點事卻不知道能做些什麼。所以我就想透過開放政治獻金協力，讓大家可以發洩一鼓怨氣，了解用鍵盤也能讓國家更好，並且也讓大家可以注意到有政治獻金這個議題。」王向榮說。
      </div>
      <div class="section-content-story__paragraph">
        確定了協作的方向，王向榮便把文件掃描檔以字為單位，切成圖檔，讓鄉民一起來參與辨識
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            如何辨識呢？其實就像我們幾乎每天都會遇到的「圖形驗證」（Captcha），現在各大網站服務為了驗證使用者是不是機器人，會要求使用者輸入圖片中的文字或數字。而 reCAPTCHA 計畫利用了這樣的需求，將太過模糊、不容易被電腦辨識的古老文件轉換成圖檔，當使用者想證明自己不是機器人，輸入正確的文字後，就成功達成圖檔的人工辨識。這個計畫在 2009 年被 Google 收購，全球的用戶每天約可達成 2 億次辨識，可以想見，能協助多少文件、圖檔被數位化。
          </div>
        </SectionContentStorysInfoboxHint>
        。結果在 24 小時之內，鄉民就完成了將近 31 萬格的文字辨識，成功數位化 7 個政治獻金專戶、2637 份文件資料。
      </div>
      <figure class="section-content-story__figure">
        <img class="section-content-story__figure-img" v-lazy="'/proj-assets/political-contribution/ocr.jpeg'" alt="">
        <figcaption class="section-content-story__figcaption">2014 年 g0v 的開放政治獻金專案。</figcaption>
      </figure>
      <div class="section-content-story__paragraph">
        「但是鄉民還是欲罷不能。」王向榮提到，「當時覺得很開心啊。心裡覺得，也許我讓更多鄉民知道，要關心政治、關心國家不需要很麻煩，從小地方就可以開始做了。」公民團體印的七個專戶迅速被破關後，他們就趕緊去印新的專戶出來，產生新的「關卡」讓鄉民挑戰。
      </div>
      <div class="section-content-story__paragraph">
        但這個專案最終沒有破解所有立委的專戶。除了各環節所需人力過大以外，也因為當時有立委順應民意提出《政治獻金法》修法，讓王向榮覺得「效果已達到，等修完法就有乾淨的數位檔可以用了」，沒想到這麼一等，「就像趙敏在大都等張無忌一樣，不知道要等多少年啊！」
      </div>
      <div class="section-content-story__paragraph">
        當年行政院提出修正草案，但只要求「公司團體捐款超過 50 萬」的明細上網公開；而立委陳其邁、李昆澤、李應元（現為環保署署長）都有提出修法版本，皆主張所有收支明細全部公開，甚至李昆澤還在其版本明訂公開資訊「須採便利民眾複製、下載的格式」。但最後條文只有一讀通過，後來就沒有下文。
      </div>
      <h2 class="section-content-story__subtitle">等政府來做，還要等多久？</h2>
      <div class="section-content-story__paragraph">
        直到台灣又經歷了兩次大選，我們取得政治獻金明細資料的方式仍跟三年前無異。對照監察院當年還針對 g0v 行動發出聲明，「希望開啟這項專案的 g0v 更審慎思考，等政府來處理會比較好」，我們還要等多久？
      </div>
      <div class="section-content-story__paragraph">
        當年提案修法的立委，現在只剩陳其邁還有繼續在去年五月提案，他向記者表示，草案之所以不容易過關，「是有人反對啦。怕公開了，很多人會不敢捐，有些人也有個資法的疑慮」，但陳其邁認為「政治獻金明細沒有不公開的理由」。至於這個會期有沒有機會處理，就要「再看看」。
      </div>
      <div class="section-content-story__paragraph">
        針對可能的反對原因，王向榮認為，尊重個人不想公開自己捐款資訊的自由，但是個人捐贈以外的資訊，「像政黨、企業、以及（候選人）支出的部分一定要公開。」
      </div>
      <div class="section-content-story__paragraph">
        「政治獻金並不是錯事，不透明的政治獻金才是問題。」王向榮認為，「很多人都覺得政治獻金四個字就是邪惡的，好像是種勾結，但我們應該要用更公開透明的政治獻金紀錄來扭轉大家的觀念，讓大家能接受政治獻金是民主制度所需要的。」
      </div>
      <div class="section-content-story__paragraph">
        「企業捐贈或是遊說是民主國家應該會有的正常現象，我不會直接把捐贈或遊說當作不正當的利益關係。」王向榮提到，但公開資訊、杜絕檯面下的金錢來往，可以讓選舉變得更公平；企業捐贈也可以讓人民檢視企業跟候選人之間在選舉期間有沒有捐贈的紀錄，當選之後，至少不敢明目張膽幫企業護航。
      </div>
      <h2 class="section-content-story__subtitle">選舉管制，不只是獻金透明而已</h2>
      <div class="section-content-story__paragraph">
        但除了政治獻金資料透明度不足以外，台灣在選舉的管控上還有很大的努力空間。
      </div>
      <div class="section-content-story__paragraph">
        實際參與過 2016 立委選舉的中正大學政治系副教授陳尚志提到，選舉的金流，應該從三個面向去觀察：政府補助、政府管制、公開揭露。台灣制定《政治獻金法》補強了「公開揭露」面向後，前兩項管制卻幾乎沒有了。
      </div>
      <div class="section-content-story__paragraph">
        政府補助，指的是公費補助選舉。台灣一直維持「部分公費補助」制度，如依據候選人的得票數進行一票 30 元的補貼，以及經常性的政黨補助。
      </div>
      <div class="section-content-story__paragraph">
        政府管制，就是政府對選舉活動經費的管制。其實，台灣是有規定競選經費上限的喔！<a class="section-content-story__link" href="http://law.cec.gov.tw/LawContentDetails.aspx?id=GL000292&KeyWordHL=&StyleType=1" target="_blank">《公職人員選舉罷免法》</a>第 41 條規定每次選舉都要公告「競選經費最高金額」，計算方式是選區人口總數的 70% 乘上一票 30 元，再依選舉種類加上一個固定金額，如立委選舉就是加 1 千萬元，按照目前的選區劃分，最多人的選區落在新竹縣，競選金額上限可以達到 1 千 8 百萬。
      </div>
      <div class="section-content-story__paragraph">
        我們檢視資料，發現 2016 年有 77 個立委超過自己選區的競選經費限制，佔總數 30％。為什麼會這樣呢？其實，在 2004 年《政治獻金法》制定之後，競選經費超過上限的罰則被取消了，形成空有規定，卻沒有罰則的奇特現象。
      </div>
      <div class="section-content-story__paragraph">
        陳尚志表示，之所以會取消，是因為政府認為選舉的管制跟透明化是兩種取向，只能二擇一。也就是說，既然政治獻金都透明化了，便沒有加以管制的必要，但真的是這樣嗎？
      </div>
      <div class="section-content-story__paragraph">
        「現在（收取）捐獻無上限、支出也無上限，關於選舉活動的管制非常少；政府補助還是維持一票 30 元，公共宣傳的管道還愈來愈少；政治獻金只看候選人的自主申報，完全沒有主動稽查。這真的是我們想要的選舉嗎？」陳尚志說。
      </div>
      <h2 class="section-content-story__subtitle">選舉更公平，才有新人參政的可能</h2>
      <div class="section-content-story__paragraph">
        從立委的政治獻金<router-link class="section-content-story__link" to="story2" v-scroll-to="'.section-content'">分析</router-link>可以看見，不但資源過度集中在現任立委上，現任立委與新科挑戰者的勝選率也相當懸殊。陳尚志以自己的選舉經驗為例，「錢真的太重要了」。
      </div>
      <div class="section-content-story__paragraph">
        「選舉一開始有沒有資金打知名度，是關鍵。」陳尚志指出，依照規定，參選人在投票前十個月才能開始申請專戶，「等到申請下來，網路金流做好，兩個月過去了；等到錢真的進來，還要再等兩個月。前面半年全部透支，這些透支的錢哪裡來？就是一大問題，更別提民進黨、國民黨是有初選的政黨。」
      </div>
      <div class="section-content-story__paragraph">
        「打知名度，最快的是看板，卻是最貴的，一塊小小的就比房租貴四、五倍。假設選舉掛十二個月，得花多少錢？」陳尚志也提到宣傳管道因金錢而受限，「我自己在選舉的時候，以面紙當作宣傳文宣，面紙可以透過快遞公司或是郵局投遞，但投遞的費用比我們的製作成本還高。最後我們還是選擇請志工挨家挨戶去投，如果政府願意幫每個候選人投幾波，事情就不一樣了。」
      </div>
      <div class="section-content-story__paragraph">
        就算政府有公辦政見發表會，「卻是在很冷門的時段播出，我去參加的時候，準備很久，後來發現完全沒有人看到，只能透過網路。還有參選人跟我說，哇，你好認真，還寫稿。你看大家根本不重視這件事。」陳尚志說。
      </div>
      <div class="section-content-story__paragraph">
        因此，陳尚志多年來致力推動公費候選人制度，希望透過政府投入更多、更公平的選舉補助，消弭新人參政會遇到的金錢門檻。他也認為，關於參選人自有資產的揭露、政治廣告購買的透明化也要加強，才能讓選舉環境更健全。
      </div>
      <div class="section-content-story__paragraph">
        在政府的眼中，能夠在監察院查閱這些被典藏的資料，就已經是資料的開放了。《鏡傳媒》這次透過實際行動印證了限制所在，也希望藉由資料應用、協作的過程凸顯開放資料的價值。但這只是第一步，不管是政商關係的透明、政治獻金的管制、到選舉活動的管理，都需要更多的關注。
      </div>
    </article>
    <article v-if="slug === 'story5'">
      <h1 class="section-content-story__title">資料怎麼看？<br>政治獻金的五個發現</h1>
      <SectionContentCredits :isNewCredit="true" :showConsultant="true" :publishedDate="'2018/09/27'"/>
      <div class="section-content-story__paragraph">
        去年做完第九屆立委政治獻金數位化之後，我們發現還有很多問題無法解答，浮現「要是有歷史資料能夠對照就好了」的念頭。我們藉由鄉民的幫助，完成了第七屆、第八屆立委營利事業捐贈的數位化。
      </div>
      <div class="section-content-story__paragraph">
        當然，這份資料還是無法百分之百呈現選舉期間的金流樣貌（但這牽涉到候選人自主申報與監察院是否主動調查），卻是這個議題重要的起點。我們發現了一些有趣的現象：
      </div>
      <h2 class="section-content-story__subtitle">變心了！大多數的集團捐贈的政黨傾向不是鐵板一塊</h2>
      <div class="visualization">
        <h3 class="visualization__subtitle">哪些集團捐最多錢？捐藍還捐綠？</h3>
        <SectionContentExploreRadios class="visualization__radios"/>
        <div class="chart-container">
          <ScatterOrdinalCorpDonates
            class="chart-container__chart chart-container__chart--narrow"
            id="chart5-1"
          />
          <SectionContentDashboardOrdinalCorpDonatesMobile
            class="chart-container__chart"
            id="chart5-1-mobile"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        2008 年捐獻金額在第 10 名（共捐了 530 萬元）的台塑集團，在之後的捐獻金額都不若以往，2012 年共捐了 135 萬、2016 年只捐了 110 萬，但皆有藍綠都押寶的狀況。
      </div>
      <div class="section-content-story__paragraph">
        知名集團如 2008 年排第 18 名（共捐獻 370 萬）的元大集團，只在 2016 年重出江湖捐獻了 100 萬給兩位民進黨的候選人；而 2008 年排第 14 名的統一集團，則完全消失在之後兩個年度的政治獻金金流中。
      </div>
      <div class="section-content-story__paragraph">
        另外 2008 年不在前 10 名內（總共捐了 408 萬排第 15 名）味丹企業，在之後兩屆用加倍的捐獻金額爬上了第五名。
      </div>
      <div class="visualization">
        <h3 class="visualization__subtitle">哪些集團三屆立委選舉都捐錢？政黨傾向變化？</h3>
        <SectionContentExploreRadios class="visualization__radios"/>
        <div class="chart-container">
          <ScatterOrdinalCorpDonates
            class="chart-container__chart chart-container__chart--narrow"
            id="chart5-2"
            :filterCorp="CHART_DATA.GROUPS_TOP_TEN_DONATES_SEVENTH_EIGHTH_NINTH"
          />
          <SectionContentDashboardOrdinalCorpDonatesMobile
            class="chart-container__chart"
            id="chart5-2-mobile"
            :filterCorp="CHART_DATA.GROUPS_TOP_TEN_DONATES_SEVENTH_EIGHTH_NINTH"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        更進一步，我們整理出三屆立委選舉都有捐錢的集團，並觀察它們捐錢時的政黨傾向，發現只有少數集團是鐵板一塊。大多數集團捐贈的候選人政黨光譜都大致從藍慢慢走向綠，有些企業在 2016 年的立委選舉時甚至藍綠翻盤。
      </div>
      <div class="section-content-story__paragraph">
        2008 年時，捐獻金額在前十名的集團捐獻傾向幾乎都偏藍，只有態度變動很大的台灣基礎集團 38％偏綠（2012 年變成偏藍 72%）、以及潤泰集團80%偏綠跟其他集團有不同的答案。
      </div>
      <div class="section-content-story__paragraph">
        值得一提的是，潤泰集團在大多數集團慢慢往綠走的光譜中，做出了相反的決定。2012 年捐獻是 100% 捐綠的潤泰，2016 年只剩下 20%，有高達 68% 的捐款捐給國民黨候選人。  
      </div>
      <div class="section-content-story__paragraph">
        2012 年，大慶集團（100%）、金鼎證券集團（100%）、燁聯鋼鐵集團（100%）與裕隆集團（97%）仍保持對國民黨候選人的高支持度，但到了2016 年，只剩大慶集團是 100% 捐獻給國民黨，裕隆的「忠誠度」掉到 70%，燁聯鋼鐵集團甚至只剩 38%，首度出現綠大於藍的捐獻傾向。而捐獻金額始終最高的遠東集團，則從偏藍（72%）變成兩邊押寶的偏綠。
      </div>
      <h2 class="section-content-story__subtitle">捐最多政治獻金的產業為批發零售業、製造業與不動產業</h2>
      <div class="visualization">
        <!-- <h2 class="visualization__title">佛心產業前十名</h2> -->
        <SectionContentExploreRadios class="visualization__radios"/>
        <div class="chart-container">
          <BarHorizontalOrdinalIndustryDonates
            class="chart-container__chart"
            id="chart5-3"
            :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_DONATES_INDUSTRY_NEW"
            :isNewData="true"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        我們改變了統計產業類別的方式，以財政部稅籍資料為主，<a class="section-content-story__link" href="http://www.mof.gov.tw/public/Attachment/34811505540.pdf" target="_blank">由行業代碼對應到稅務行業分類的十九大分類</a>。由於一間公司可能會登記多個業別
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            假設 A 公司登記為「製造業」與「批發零售業」，捐贈 2 萬元，則計算方式為「製造業 2 萬元」、「批發零售業 2 萬元」，故加總金額會大於總金額
          </div>
        </SectionContentStorysInfoboxHint>
        ，而只要有販賣行為皆得登記批發零售業，我們猜測是因為母體數量造成它連續拿下第一名的結果。三屆的排名並沒有太大的差異。
      </div>
      <h2 class="section-content-story__subtitle">最積極捐獻政治獻金的產業為礦業、電力燃氣業、不動產業</h2>
      <div class="visualization">
        <!-- <h2 class="visualization__title">哪些產業最積極捐錢給立委？</h2> -->
        <SectionContentExploreRadios class="visualization__radios"/>
        <div class="chart-container">
          <BarHorizontalOrdinalIndustryParticipate
            class="chart-container__chart"
            id="chart5-4"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY_NEW"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        若考慮母體數，更進一步分析捐獻的「積極度」（捐獻公司數占為該年度該分類總公司數），第一名為礦石與土石採取（2016年、2012年）及電力及燃氣供應（2008年），三屆的排名也沒有太大差異。
      </div>
      <div class="section-content-story__paragraph">
        這些高積極度的產業大多符合《經濟學人》所列「靠關係賺錢」的裙帶關係產業
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            2016 年《經濟學人》（The Economist）發布「裙帶資本主義指數」（Crony Capitalism） <a class="section-content-story__link" href="https://www.economist.com/international/2016/05/07/the-party-winds-down" target="_blank">報告</a> ，統計各國的億萬富豪在與政府往來密切的行業中，所獲取的財富佔 GDP 的比例。在 22 個國家中，台灣以 3.2% 排名第 10 名，高於亞洲的日本、韓國、甚至中國。指數愈高，就代表在這個國家裡有愈多的企業，商業的成功與否取決於政商關係的密切度，而這些優惠與偏袒都是合法的。他們通常會以壟斷或遊說等手段，讓政府運用行政權力，提供較好的生存環境與利益。簡單來說，就是「靠關係」賺錢。這些產業有賭場、國防、信貸投資銀行、基礎設施、管線、油、瓦斯等能源業、房地產、建設業、鋼鐵、金屬、礦石等等。
          </div>
        </SectionContentStorysInfoboxHint>
        。
      </div>
      <h2 class="section-content-story__subtitle">民進黨在第九屆吸金氣勢大增，追上國民黨，但捐贈組成差很多</h2>
      <div class="visualization">
        <!-- <h2 class="visualization__title">不同政黨立委的政治獻金收入組成</h2> -->
        <SectionContentExploreRadios class="visualization__radios"/>
        <div class="chart-container">
          <ParallelOrdinalPartyDonatesFrom
            class="chart-container__chart"
            id="chart5-5"
            :legends="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        民進黨在2008年、2012年的收入金額變化不大，2016年比以往增加了 37％的政治獻金，到達 12 億，首度高過國民黨。
      </div>
      <div class="section-content-story__paragraph">
        而國民黨收到的政治獻金除了在 2012 年飆到 14 億的高峰外，其餘兩次都維持在 12 億左右。但收入組成卻有了變化。營利事業捐贈比例在 2016 年調到歷史新低，只佔了總收入的三成。政黨收入比例卻提高到 36% （氣勢最旺的 2012 年只佔 20%），國民黨候選人在 2016 年的選舉主要是靠政黨捐贈來選舉。
      </div>
      <div class="section-content-story__paragraph">
        而民進黨的營利事業捐贈比例雖比起 2008 年掉了 10 個百分點，推估是總營利事業捐獻比例減少的關係（見下點）。值得一提的是，2012 年的選舉民進黨的營利事業捐款不到三成，卻有超過六成的個人捐款；到了 2016 年，營利事業捐款卻成長至 37%，個人捐款比例往下降。
      </div>
      <h2 class="section-content-story__subtitle">總體收入是增加的，但營利事業影響變小？</h2>
      <div class="visualization">
        <!-- <h2 class="visualization__title">本次政治獻金的組成</h2> -->
        <div class="chart-container">
          <BarHorizontalStackedOrdinalDonatesFrom
            class="chart-container__chart"
            id="chart5-6"
            :legends="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM_LEGENDS"
            :data="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM"
            style="margin: 0 0 40px 0"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        立委政治獻金總收入從 2008 年的 22 億提升到 2016 年的 28 億，但參選人數（以有開政治獻金專戶並登記的候選人為主）也從 191 個提升到 261 個。
      </div>
      <div class="section-content-story__paragraph">
        雖然總金額提高，但營利事業的捐獻比例卻次次下降，相對提高的則是個人捐贈。推測是非傳統藍綠的參選人變多（從 2008 年的 52 人提高到 2016年的 122 人），這樣背景的選舉人雖收到的捐款普遍較少，大多仰賴個人捐款支持，較無營利事業吸金能力。
      </div>
      <div class="section-content-story__paragraph">
        有愈來愈多新人投入政治中，「錢」是一個重要的門檻嗎？隨著政府修法，未來政治獻金明細將公開，但這只是第一步，我們會跟您一起繼續監督下去！
      </div>
      <div class="section-content-story__paragraph">
        你也有什麼好奇的問題嗎？歡迎從<router-link class="section-content-story__link" to="dashboard" v-scroll-to="'.section-content'">圖表區</router-link>或是<a class="section-content-story__link" href="https://github.com/mirror-media/politicalcontribution" target="_blank">原始資料區</a>挖掘出更多與我們分享！
      </div>
    </article>
    <article v-if="slug === 'story6'">
      <h1 class="section-content-story__title">政治獻金資料到底解密了什麼？</h1>
      <SectionContentCredits :isNewCredit="true" :publishedDate="'2018/09/27'"/>
      <div class="section-content-story__paragraph">
        READr 政治獻金數位化專案是延續 2014 年 g0v 零時政府透過鄉民的力量數位化資料的靈感，最後成功促使政府修法。目前監察院的查詢平台標案已經決標，政治獻金資料未來是否真的能邁向公開透明，我們會與您一起繼續監督！
      </div>
      <SectionContentStorysTimelines/>
    </article>
    <div class="related-storys">
      <h2 class="section-content-story__subtitle section-content-story__subtitle--align-left">相關文章</h2>
      <SectionContentFooterStorysList/>
    </div>
  </main>
</template>

<script>
import * as CHART_DATA from '../../charts/data'

import SectionContentCredits from './SectionContentCredits.vue'
import SectionContentStorysInfoboxHint from './SectionContentStorys/SectionContentStorysInfoboxHint.vue'
import SectionContentStorysTimelines from './SectionContentStorys/SectionContentStorysTimelines.vue'

import SectionContentExploreRadios from '../sectionContent/SectionContentExplore/SectionContentExploreRadios.vue'
import BarHorizontalOrdinalCandidate from '../../charts/BarHorizontalOrdinalCandidate.vue'
import BarHorizontalOrdinalIndustryDonates from '../../charts/BarHorizontalOrdinalIndustryDonates.vue'
import BarHorizontalOrdinalIndustryParticipate from '../../charts/BarHorizontalOrdinalIndustryParticipate.vue'
import BarVerticalStackedOrdinalDonatesFrom from '../../charts/BarVerticalStackedOrdinalDonatesFrom.vue'
import BarHorizontalStackedOrdinalDonatesFrom from '../../charts/BarHorizontalStackedOrdinalDonatesFrom.vue'
import ScatterOrdinalCorpDonates from '../../charts/ScatterOrdinalCorpDonates.vue'
import SectionContentDashboardOrdinalCorpDonatesMobile from './SectionContentDashboard/SectionContentDashboardOrdinalCorpDonatesMobile.vue'
import TableDuel from '../../charts/TableDuel.vue'
import TableTopTen from '../../charts/TableTopTen.vue'
import ParallelOrdinalPartyDonatesFrom from '../../charts/ParallelOrdinalPartyDonatesFrom.vue'

import SectionContentFooterStorysList from './SectionContentFooterStorysList.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentCredits,
    SectionContentStorysInfoboxHint,
    SectionContentStorysTimelines,
    SectionContentExploreRadios,
    BarHorizontalOrdinalCandidate,
    BarHorizontalOrdinalIndustryDonates,
    BarHorizontalOrdinalIndustryParticipate,
    BarVerticalStackedOrdinalDonatesFrom,
    BarHorizontalStackedOrdinalDonatesFrom,
    ScatterOrdinalCorpDonates,
    SectionContentDashboardOrdinalCorpDonatesMobile,
    TableDuel,
    TableTopTen,
    ParallelOrdinalPartyDonatesFrom,
    SectionContentFooterStorysList,
  },
  data () {
    return {
      CHART_DATA,
    }
  },
  computed: {
    ...mapGetters([
      'slug'
    ])
  },
}
</script>

<style lang="stylus" scoped>
.section-content-story
  padding 167px 0 32px 0 !important
  &__title
    font-size 46px
    font-weight 600
    text-align center
    margin 0 0 40px 0
    line-height 1.25
  &__subtitle
    font-size 28px
    font-weight 500
    text-align center
    margin 40px 0 0 0
    line-height 1.25
    &--align-left
      text-align left
  &__paragraph
    font-size 19px
    line-height 1.5
    text-align justify
    margin 27px 0
    &--quote-by
      color gray
      text-align end
  &__link
    color #9e005d
    text-decoration none
    border-bottom 2px solid #9e005d
    font-weight bold
  &__blockquote
    margin 27px 0
    padding 0 0 0 27px
    border-left 10px solid gray
  &__figure
    margin 27px 0
    display flex
    flex-direction column
    justify-content center
    align-items center
  &__figure-img
    width 80%
  &__figcaption
    font-size 17px
    color gray
    margin 18px 0

.visualization
  display flex
  flex-direction column
  // justify-content center
  align-items center
  margin 60px 0
  &__title
    font-size 28px
    margin 0 0 20px 0
    font-weight 500
    &--highlight
      color #9e005d
  &__subtitle
    font-size 20px
    margin 10px 0 20px 0
    &--mobile
      display none
  &__radios
    margin 0 0 20px 0

.chart-container
  width 100%
  display flex
  justify-content center
  &__chart
    width 80%
    &--narrow
      width 70%
    &--wide
      width 100%

.related-storys
  display none

#chart5-1-mobile
  display none
#chart5-2-mobile
  display none
#chart3-2-mobile
  display none

@media (max-width 1024px)
  .section-content-story
    padding 85px 20px 25px 20px !important
    &__title
      font-size 40px
      margin 0 0 14px 0
    &__subtitle
      font-size 24px
    &__paragraph
      font-size 22px
      line-height 1.64
      &--quote-by
        font-size 18px
    &__figure-img
      width 100%

  .visualization
    &__title
      font-size 24px
    &__subtitle
      &--mobile
        display block

  .chart-container
    &__chart
      width 100%
      &--narrow
        width 100%
      &--wide
        width 100%

  .related-storys
    display initial
    & >>> ul
      width 100% !important
      padding 0 0 0 25px !important
    & >>> li
      width 100% !important
      color #9e005d !important
      text-align justify
      text-decoration underline
      font-size 22px !important
      margin 10px 0 !important
      font-weight 700 !important
    & >>> .new-notification
      color white !important
      background-color #9e005d !important

  #chart3-2
    display none
  #chart3-2-mobile
    display initial
  #chart5-1
    display none
  #chart5-1-mobile
    display initial
  #chart5-2
    display none
  #chart5-2-mobile
    display initial

@media (max-width 375px)
  .section-content-story
    &__title
      font-size 34px

@media (max-width 320px)
  .section-content-story
    &__title
      font-size 30px
    &__paragraph
      &--quote-by
        font-size 16px
</style>


