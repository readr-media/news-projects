<template>
  <article class="covid-article">
    <p>{{ $t('COVID19_D.CHAPTER_1.P_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_3.TEXT_1') }}<a href="https://www.poynter.org/fact-checking/2020/783880/" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_3.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_1.P_3.TEXT_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_4') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_5.TEXT_1') }}<a href="https://www.poynter.org/fact-checking/2020/the-2019-coronavirus-virus-lands-in-the-u-s-after-killing-17-and-taking-eight-to-prison/" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_5.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_1.P_5.TEXT_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_6') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_7') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_8') }}</p>
    <p><a href="https://reutersinstitute.politics.ox.ac.uk/risj-review/how-fact-checkers-are-fighting-coronavirus-misinformation-worldwide" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_9.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_1.P_9.TEXT_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_10.TEXT_1') }}<a href="https://www.poynter.org/ifcn-covid-19-misinformation/" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_10.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_1.P_10.TEXT_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_11') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_12.TEXT_1') }}<a href="/" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_12.LINK') }}</a></p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_1.TITLE')"
      />
      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="`/proj-assets/covid19-disinformation/chart-01-desktop${isLocaleEN ? '-en' : ''}.png`"
        >
        <img
          :src="`/proj-assets/covid19-disinformation/chart-01${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_1.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>
        <a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >The CoronaVirusFacts Alliance Database</a> (2020-01-29~2020-05-12)
      </p>
      <p><strong v-text="$t('COVID19_D.ANNOTATION')" />{{ $t('COVID19_D.CHART_1.ANNOTATION') }}</p>
    </figure>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_13') }}</p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_2.TITLE')"
      />
      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="`/proj-assets/covid19-disinformation/chart-02-desktop${isLocaleEN ? '-en' : ''}.png`"
        >
        <img
          :src="`/proj-assets/covid19-disinformation/chart-02${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_2.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>
        <a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >The CoronaVirusFacts Alliance Database</a> (2020-01-29~2020-05-12)
      </p>
      <p><strong v-text="$t('COVID19_D.ANNOTATION')" />{{ $t('COVID19_D.CHART_2.ANNOTATION') }}</p>
    </figure>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_14.TEXT_1') }}<a href="https://reutersinstitute.politics.ox.ac.uk/types-sources-and-claims-covid-19-misinformation" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_14.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_1.P_14.TEXT_2') }}</p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_3.TITLE')"
      />
      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="`/proj-assets/covid19-disinformation/chart-03-desktop${isLocaleEN ? '-en' : ''}.png`"
        >
        <img
          :src="`/proj-assets/covid19-disinformation/chart-03${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_3.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>
        <a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >The CoronaVirusFacts Alliance Database</a> (2020-01-29~2020-05-12)、<a
          href="https://reutersinstitute.politics.ox.ac.uk/types-sources-and-claims-covid-19-misinformation"
          target="_blank"
          rel="noopener noreferrer">{{ $t('COVID19_D.CHART_3.SOURCE') }}</a> (2020-01-01~2020-03-30)
      </p>
      <p><strong v-text="$t('COVID19_D.ANNOTATION')" />{{ $t('COVID19_D.CHART_3.ANNOTATION') }}</p>
    </figure>

    <h2>{{ $t('COVID19_D.CHAPTER_2.HEADING') }}</h2>
    <p class="quote">
      <strong v-text="$t('COVID19_D.CHAPTER_2.QUOTE_1')" />
    </p>
    <p class="quote">
      <strong v-text="$t('COVID19_D.CHAPTER_2.QUOTE_2')" />
    </p>
    <p class="quote">
      <strong v-text="$t('COVID19_D.CHAPTER_2.QUOTE_3')" />
    </p>
    <p>{{ $t('COVID19_D.CHAPTER_2.P_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_2.P_2') }}</p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_4.TITLE')"
      />
      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="`/proj-assets/covid19-disinformation/chart-04-desktop${isLocaleEN ? '-en' : ''}.png`"
        >
        <img
          :src="`/proj-assets/covid19-disinformation/chart-04${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_4.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>
        <a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >The CoronaVirusFacts Alliance Database</a> (2020-01-29~2020-05-12)、<span v-html="$t('COVID19_D.CHART_4.SOURCE')" /></p>
      <p><strong v-text="$t('COVID19_D.ANNOTATION')" />{{ $t('COVID19_D.CHART_4.ANNOTATION') }}</p>
    </figure>
    <p>{{ $t('COVID19_D.CHAPTER_2.P_3') }}</p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_5.TITLE')"
      />
      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="`/proj-assets/covid19-disinformation/chart-05-desktop${isLocaleEN ? '-en' : ''}.png`"
        >
        <img
          :src="`/proj-assets/covid19-disinformation/chart-05${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_5.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>
        <a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >The CoronaVirusFacts Alliance Database</a> (2020-01-29~2020-05-12)、<span v-html="$t('COVID19_D.CHART_5.SOURCE')" /></p>
      <p><strong v-text="$t('COVID19_D.ANNOTATION')" />{{ $t('COVID19_D.CHART_5.ANNOTATION') }}</p>
    </figure>
    <p>{{ $t('COVID19_D.CHAPTER_2.P_4') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_2.P_5') }}</p>
    <p class="quote"><strong>{{ $t('COVID19_D.CHAPTER_2.QUOTE_4.BOLD') }}</strong>{{ $t('COVID19_D.CHAPTER_2.QUOTE_4.NORMAL') }}</p>
    <p class="quote"><strong>{{ $t('COVID19_D.CHAPTER_2.QUOTE_5.BOLD') }}</strong>{{ $t('COVID19_D.CHAPTER_2.QUOTE_5.NORMAL') }}</p>
    <p class="quote"><strong>{{ $t('COVID19_D.CHAPTER_2.QUOTE_6.BOLD_1') }}<a
      href="https://www.facebook.com/mehul.parekh.75685/videos/2550573411857545/"
      target="_blank"
      rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_2.QUOTE_6.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_2.QUOTE_6.BOLD_2') }}</strong></p>
    <p>{{ $t('COVID19_D.CHAPTER_2.P_6') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_2.P_7.TEXT_1') }}<a href="https://au.news.yahoo.com/virus-misinformation-fuels-hatred-against-indias-muslims-055230690--spt.html" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_2.P_7.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_2.P_7.TEXT_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_2.P_8.TEXT_1') }}<a href="https://www.thequint.com/news/webqoof/increase-in-communal-tone-in-covid-19-fake-news-in-india-study" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_2.P_8.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_2.P_8.TEXT_2') }}</p>

    <h2>{{ $t('COVID19_D.CHAPTER_3.HEADING') }}</h2>
    <p>{{ $t('COVID19_D.CHAPTER_3.P_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_3.P_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_3.P_3.TEXT_1') }}<a
      href="https://reutersinstitute.politics.ox.ac.uk/risj-review/how-fact-checkers-are-fighting-coronavirus-misinformation-worldwide"
      target="_blank"
      rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_3.P_3.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_3.P_3.TEXT_2') }}
    </p>
    <p>{{ $t('COVID19_D.CHAPTER_3.P_4.TEXT_1') }}<a
      href="https://abcnews.go.com/Health/iran-confronts-deadly-alcohol-crisis-midst-dealing-coronavirus/story?id=69842613"
      target="_blank"
      rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_3.P_4.LINK_1') }}</a>{{ $t('COVID19_D.CHAPTER_3.P_4.TEXT_2') }}<a
      href="https://www.reuters.com/article/us-health-coronavirus-india-cow-urine-pa/hindu-group-offers-cow-urine-in-a-bid-to-ward-off-coronavirus-idUSKBN2110D5"
      target="_blank"
      rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_3.P_4.LINK_2') }}</a>{{ $t('COVID19_D.CHAPTER_3.P_4.TEXT_3') }}
    </p>
    <p>{{ $t('COVID19_D.CHAPTER_3.P_5') }}</p>

    <h2>{{ $t('COVID19_D.CHAPTER_4.HEADING') }}</h2>
    <p>{{ $t('COVID19_D.CHAPTER_4.P_1') }}</p>
    <p class="quote"><strong>{{ $t('COVID19_D.CHAPTER_4.QUOTE_1') }}</strong></p>
    <p class="quote"><strong>{{ $t('COVID19_D.CHAPTER_4.QUOTE_2') }}</strong></p>
    <p class="quote"><strong>{{ $t('COVID19_D.CHAPTER_4.QUOTE_3') }}</strong></p>
    <p>{{ $t('COVID19_D.CHAPTER_4.P_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_4.P_3') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_4.P_4') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_4.P_5.TEXT_1') }}<a
      href="https://fit.thequint.com/fit-webqoof/fit-webqoof-janta-curfew-of-one-day-will-not-free-india-of-coronavirus"
      target="_blank"
      rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_4.P_5.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_4.P_5.TEXT_2') }}
    </p>
    <p>{{ $t('COVID19_D.CHAPTER_4.P_6.TEXT_1') }}<a
      href="https://www.thequint.com/news/webqoof/candle-heat-will-kill-covid-19-fake-claims-viral-after-pms-message"
      target="_blank"
      rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_4.P_6.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_4.P_6.TEXT_2') }}
    </p>

    <h2>{{ $t('COVID19_D.CHAPTER_5.HEADING') }}</h2>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_1') }}</p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_6.TITLE')"
      />
      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="`/proj-assets/covid19-disinformation/chart-06-desktop${isLocaleEN ? '-en' : ''}.png`"
        >
        <img
          :src="`/proj-assets/covid19-disinformation/chart-06${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_6.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>
        <a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >The CoronaVirusFacts Alliance Database</a> (2020-01-29~2020-05-12)、<span v-html="$t('COVID19_D.CHART_6.SOURCE')" /></p>
      <p><strong v-text="$t('COVID19_D.ANNOTATION')" />{{ $t('COVID19_D.CHART_6.ANNOTATION') }}</p>
    </figure>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_3') }}</p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_7.TITLE')"
      />
      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="`/proj-assets/covid19-disinformation/chart-07-desktop${isLocaleEN ? '-en' : ''}.png`"
        >
        <img
          :src="`/proj-assets/covid19-disinformation/chart-07${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_7.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>
        <a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >The CoronaVirusFacts Alliance Database</a> (2020-01-29~2020-05-12)、{{ $t('COVID19_D.CHART_7.SOURCE') }}</p>
    </figure>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_4') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_5') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_6') }}</p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_8.TITLE')"
      />
      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="`/proj-assets/covid19-disinformation/chart-08-desktop${isLocaleEN ? '-en' : ''}.png`"
        >
        <img
          :src="`/proj-assets/covid19-disinformation/chart-08${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_8.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>
        <a
          href="https://medium.com/doublethinklab-tw/疾病下的中國資訊作戰-e3f9ce4e72e"
          target="_blank"
          rel="noopener noreferrer"
        >{{ $t('COVID19_D.CHART_8.SOURCE') }}</a>
      </p>
    </figure>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_7') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_8') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_9') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_5.P_10') }}</p>

    <h2>{{ $t('COVID19_D.CHAPTER_6.HEADING') }}</h2>
    <p>{{ $t('COVID19_D.CHAPTER_6.P_1') }}</p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_9.TITLE')"
      />
      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="`/proj-assets/covid19-disinformation/chart-09-desktop${isLocaleEN ? '-en' : ''}.png`"
        >
        <img
          :src="`/proj-assets/covid19-disinformation/chart-09${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_9.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong><a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >The CoronaVirusFacts Alliance Database</a> (2020-01-29~2020-05-12)
      </p>
      <p><strong v-text="$t('COVID19_D.ANNOTATION')" />{{ $t('COVID19_D.CHART_9.ANNOTATION') }}</p>
    </figure>
    <p>{{ $t('COVID19_D.CHAPTER_6.P_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_6.P_3') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_6.P_4.TEXT_1') }}<a
      href="https://fit.thequint.com/fit-webqoof/fit-webqoof-janta-curfew-of-one-day-will-not-free-india-of-coronavirus"
      target="_blank"
      rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_6.P_4.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_6.P_4.TEXT_2') }}
    </p>
    <p>{{ $t('COVID19_D.CHAPTER_6.P_5') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_6.P_6') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_6.P_7') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_6.P_8') }}</p>

    <h2>{{ $t('COVID19_D.CHAPTER_7.HEADING') }}</h2>
    <p>{{ $t('COVID19_D.CHAPTER_7.P_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_7.P_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_7.P_3') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_7.P_4') }}</p>

    <h2>{{ $t('COVID19_D.CHAPTER_8.HEADING') }}</h2>
    <p>{{ $t('COVID19_D.CHAPTER_8.P_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_8.P_2.TEXT_1') }}<span class="annotation">{{ $t('COVID19_D.CHAPTER_8.P_2.ANNOTATION') }}</span>{{ $t('COVID19_D.CHAPTER_8.P_2.TEXT_2') }}</p>
    <figure class="covid-article__img">
      <p
        class="title"
        v-text="$t('COVID19_D.CHART_10.TITLE')"
      />
      <picture class="chart-10-img">
        <img
          :src="`/proj-assets/covid19-disinformation/chart-10${isLocaleEN ? '-en' : ''}.png`"
          :alt="$t('COVID19_D.CHART_10.TITLE')"
        >
      </picture>
      <div class="chart-10-iframe">
        <iframe src='https://flo.uri.sh/visualisation/3047523/embed' frameborder='0' scrolling='no' style='width:100%;height:600px;'></iframe>
        <div style='width:100%!;margin-top:4px!important;text-align:right!important;'>
          <a class='flourish-credit' href='https://public.flourish.studio/visualisation/2954585/?utm_source=embed&utm_campaign=visualisation/2954585' target='_top' style='text-decoration:none!important'>
          <img v-lazy="'https://public.flourish.studio/resources/made_with_flourish.svg'" alt='Made with Flourish' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'>
          </a>
        </div>
      </div>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>{{ $t('COVID19_D.CHART_10.SOURCE.TEXT_1') }}<a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >{{ $t('COVID19_D.CHART_10.SOURCE.LINK') }}</a>{{ $t('COVID19_D.CHART_10.SOURCE.TEXT_2') }}
      </p>
    </figure>
    <p>{{ $t('COVID19_D.CHAPTER_8.P_3') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_8.P_4') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_8.P_5') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_8.P_6') }}</p>

    <h2>{{ $t('COVID19_D.CHAPTER_9.HEADING') }}</h2>
    <p>{{ $t('COVID19_D.CHAPTER_9.P_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_9.P_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_9.P_3') }}</p>

    <h2>{{ $t('COVID19_D.CHAPTER_10.HEADING') }}</h2>
    <p>{{ $t('COVID19_D.CHAPTER_10.P_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_10.P_2.TEXT_1') }}<a
      href="https://today.yougov.com/topics/politics/articles-reports/2020/05/26/republicans-democrats-misinformation"
      target="_blank"
      rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_10.P_2.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_10.P_2.TEXT_2') }}
    </p>
    <p v-html="$t('COVID19_D.CHAPTER_10.P_3')" />
    <p>{{ $t('COVID19_D.CHAPTER_10.P_4.TEXT_1') }}<a
      href="https://reutersinstitute.politics.ox.ac.uk/risj-review/how-fact-checkers-are-fighting-coronavirus-misinformation-worldwide"
      target="_blank"
      rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_10.P_4.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_10.P_4.TEXT_2') }}
    </p>

    <div class="info-box">
      <h3>{{ $t('COVID19_D.INFO_BOX.HEADING') }}</h3>
      <p>
        1. {{ $t('COVID19_D.INFO_BOX.P_1.TEXT_1') }}<a href="https://www.poynter.org/ifcn-covid-19-misinformation/" target="_blank" rel="noopener noreferrer">The CoronaVirusFacts Alliance Database</a>{{ $t('COVID19_D.INFO_BOX.P_1.TEXT_2') }}
      </p>
      <p>
        2. <a
          href="https://reutersinstitute.politics.ox.ac.uk/types-sources-and-claims-covid-19-misinformation"
          target="_blank"
          rel="noopener noreferrer">{{ $t('COVID19_D.INFO_BOX.P_2.LINK') }}</a>{{ $t('COVID19_D.INFO_BOX.P_2.TEXT_1') }}
      </p>
      <table>
        <tr>
          <th>{{ $t('COVID19_D.INFO_BOX_TABLE.COLUMN_1_HEADING') }}</th>
          <th>{{ $t('COVID19_D.INFO_BOX_TABLE.COLUMN_2_HEADING') }}</th>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_1.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_1.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_2.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_2.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_3.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_3.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_4.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_4.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_5.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_5.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_6.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_6.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_7.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_7.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_8.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_8.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_9.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_9.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_10.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_10.COLUMN_2') }}</td>
        </tr>
        <tr>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_11.COLUMN_1') }}</td>
          <td>{{ $t('COVID19_D.INFO_BOX_TABLE.ROW_11.COLUMN_2') }}</td>
        </tr>
      </table>
      <p>3. {{ $t('COVID19_D.INFO_BOX.P_3') }}</p>
      <p>4. {{ $t('COVID19_D.INFO_BOX.P_4') }}</p>
    </div>
  </article>
</template>

<script>

export default {
  name: 'TheArticle',
  computed: {
    isLocaleEN () {
      return this.$route.params.params === 'en'
    }
  }
}
</script>

<style lang="stylus" scoped>
.covid-article
  padding 39px 0 59px
  background-color #f8f8f8
  @media (min-width: 1024px)
    padding 109px 0 54px
  *
    + .info-box
      margin-top 60px
  h2, h3, p
    margin-top 0
  h2
    + p
      margin-top 20px
  p
    margin 0 auto
    text-align justify
    + *
      margin-top 30px
  picture
    margin 0

  > *
    width 280px
    margin-left auto
    margin-right auto
    @media (min-width: 768px)
      width 60%
      max-width 800px
  &__img
    color #4a4a4a
    font-size 15px
    font-weight 300
    line-height normal
    text-align justify
    + h2, + p
      margin-top 60px

    picture
      display block
      img
        display block
        width 100%
      + *
        margin-top 10px
    .title
      font-size 21px
      text-align center
      + *
        margin-top 10px
    p
      + p
        margin-top 1em
.quote
  position relative
  padding-left 38px
  color #000
  font-size 16px
  line-height 30px
  &::before
    content ''
    position absolute
    top 6px
    left 0
    display inline-block
    width 30px
    height 30px
    background-image url(/proj-assets/covid19-disinformation/quote-tw.svg)
    background-size 30px 30px
    background-repeat no-repeat
    background-position center center
    @media (min-width: 1024px)
      top 0
  & + p:not(.quote)
    margin-top 60px

.annotation
  color #26c226
  font-weight 500

.info-box
  width 100%
  @media (min-width: 768px)
    width 60%
    max-width 800px
  h3, p
    width 280px
    margin-left auto
    margin-right auto
    @media (min-width: 768px)
      width auto
  h3
    font-size 16px
    font-weight 500
    line-height 1.75
    & + p
      margin-top 6px
  p
    font-size 15px
    line-height 1.6
    + p
      margin-top .5em
  table
    font-size 15px
    line-height 1.6
    border-collapse collapse
    border-style hidden
    tr
      &:nth-child(2n + 1)
        background-color #dcf0dc
      &:first-child
        background-color transparent
    th, td
      padding 1em
      border 2px solid #979797
    th
      padding .2em 1em 1em
      text-align left
      &:first-child
        width 80px
        @media (min-width: 1024px)
          width 140px
    + p
      margin-top 30px

.covid-article__img
  .chart-10-img
    @media (min-width: 1024px)
      display none
  .chart-10-iframe
    display none
    @media (min-width: 1024px)
      display block

</style>
