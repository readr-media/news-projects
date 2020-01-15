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
      <h1 class="section-content-story__title" v-text="$t('POLITICAL_CONTRIBUTION.STORY4.TITLE')"></h1>
      <SectionContentCredits :publishedDate="'2017/11/16'"/>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[0]') }}
        <a
          class="section-content-story__link"
          href="https://g0v.hackpad.tw/8ow2GnliH48"
          target="_blank"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[1]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[2]') }}
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            {{ $t('POLITICAL_CONTRIBUTION.STORY4.HINTS[0][0]') }}
            <a
              class="section-content-story__link"
              href="https://readr.sayit.mysociety.org/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%912014%E5%B9%B4-g0v-%E5%B0%88%E6%A1%88%E7%99%BC%E8%B5%B7%E4%BA%BA%E7%8E%8B%E5%90%91%E6%A6%AE%E5%B0%88%E8%A8%AA"
              target="_blank"
            >
              {{ $t('POLITICAL_CONTRIBUTION.STORY4.HINTS[0][1]') }}
            </a>
          </div>
        </SectionContentStorysInfoboxHint>
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[3]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[4]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[5]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[6]') }}
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            {{ $t('POLITICAL_CONTRIBUTION.STORY4.HINTS[1]') }}
          </div>
        </SectionContentStorysInfoboxHint>
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[7]') }}
      </div>
      <figure class="section-content-story__figure">
        <img class="section-content-story__figure-img" v-lazy="'/proj-assets/political-contribution/ocr.jpeg'" alt="">
        <figcaption class="section-content-story__figcaption">
          {{ $t('POLITICAL_CONTRIBUTION.STORY4.IMG_CAPTIONS[0]') }}
        </figcaption>
      </figure>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[8]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[9]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[10]') }}
      </div>
      <h2 class="section-content-story__subtitle">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.SUBTITLES[0]') }}
      </h2>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[11]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[12]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[13]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[14]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[15]') }}
      </div>
      <h2 class="section-content-story__subtitle">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.SUBTITLES[1]') }}
      </h2>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[16]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[17]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[18]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[19]') }}
        <a
          class="section-content-story__link"
          href="http://law.cec.gov.tw/LawContentDetails.aspx?id=GL000292&KeyWordHL=&StyleType=1"
          target="_blank"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[20]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[21]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[22]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[23]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[24]') }}
      </div>
      <h2 class="section-content-story__subtitle">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.SUBTITLES[2]') }}
      </h2>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[25]') }}
        <router-link
          class="section-content-story__link"
          to="story2"
          v-scroll-to="'.section-content'"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[26]') }}
        </router-link>
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[27]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[28]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[29]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[30]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[31]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY4.P[32]') }}
      </div>
    </article>
    <article v-if="slug === 'story5'">
      <h1 class="section-content-story__title" v-html="$t('POLITICAL_CONTRIBUTION.STORY5.TITLE')"></h1>
      <SectionContentCredits :isNewCredit="true" :showConsultant="true" :publishedDate="'2018/09/27'"/>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[0]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[1]') }}
      </div>
      <h2 class="section-content-story__subtitle">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.SUBTITLES[0]') }}
      </h2>
      <div class="visualization">
        <h3 class="visualization__subtitle">
          {{ $t('POLITICAL_CONTRIBUTION.STORY5.CHART_TITLES[0]') }}
        </h3>
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
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[2]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[3]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[4]') }}
      </div>
      <div class="visualization">
        <h3 class="visualization__subtitle">
          {{ $t('POLITICAL_CONTRIBUTION.STORY5.CHART_TITLES[1]') }}
        </h3>
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
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[5]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[6]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[7]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[8]') }}
      </div>
      <h2 class="section-content-story__subtitle">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.SUBTITLES[1]') }}
      </h2>
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
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[9]') }}
        <a
          class="section-content-story__link"
          href="http://www.mof.gov.tw/public/Attachment/34811505540.pdf"
          target="_blank"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[10]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[11]') }}
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            {{ $t('POLITICAL_CONTRIBUTION.STORY5.HINTS[0]') }}
          </div>
        </SectionContentStorysInfoboxHint>
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[12]') }}
      </div>
      <h2 class="section-content-story__subtitle">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.SUBTITLES[2]') }}
      </h2>
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
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[13]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[14]') }}
        <SectionContentStorysInfoboxHint :hint="`（${$t('POLITICAL_CONTRIBUTION.STORY_HINT')}）`">
          <div>
            {{ $t('POLITICAL_CONTRIBUTION.STORY5.HINTS[1][0]') }}
            <a
              class="section-content-story__link"
              href="https://www.economist.com/international/2016/05/07/the-party-winds-down"
              target="_blank"
            >
              {{ $t('POLITICAL_CONTRIBUTION.STORY5.HINTS[1][1]') }}
            </a> 
            {{ $t('POLITICAL_CONTRIBUTION.STORY5.HINTS[1][2]') }}
          </div>
        </SectionContentStorysInfoboxHint>
        。
      </div>
      <h2 class="section-content-story__subtitle">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.SUBTITLES[3]') }}
      </h2>
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
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[15]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[16]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[17]') }}
      </div>
      <h2 class="section-content-story__subtitle">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.SUBTITLES[4]') }}
      </h2>
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
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[18]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[19]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[20]') }}
      </div>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[21]') }}
        <router-link
          class="section-content-story__link"
          to="dashboard"
          v-scroll-to="'.section-content'"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[22]') }}
        </router-link>
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[23]') }}
        <a
          class="section-content-story__link"
          href="https://github.com/mirror-media/politicalcontribution"
          target="_blank"
        >
          {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[24]') }}
        </a>
        {{ $t('POLITICAL_CONTRIBUTION.STORY5.P[25]') }}
      </div>
    </article>
    <article v-if="slug === 'story6'">
      <h1 class="section-content-story__title" v-text="$t('POLITICAL_CONTRIBUTION.STORY6.TITLE')"></h1>
      <SectionContentCredits :isNewCredit="true" :publishedDate="'2018/09/27'"/>
      <div class="section-content-story__paragraph">
        {{ $t('POLITICAL_CONTRIBUTION.STORY6.P[0]') }}
      </div>
      <SectionContentStorysTimelines/>
    </article>
    <div class="related-storys">
      <h2 class="section-content-story__subtitle section-content-story__subtitle--align-left">
        {{ $t('POLITICAL_CONTRIBUTION.NAVS.FOOTER_TITLE') }}
      </h2>
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


