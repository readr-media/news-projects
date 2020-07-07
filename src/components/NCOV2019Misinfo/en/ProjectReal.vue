<template>
  <div>
    <section
      class="landing center"
      v-observe-visibility="{
        callback: (isVisible) => isVisible && handleVisible('landing'),
        once: true,
      }"
    >
      <div class="landing-wrapper">
        <div class="landing-wrapper-chart">
          <ChartLanding/>
        </div>
        <div class="landing-wrapper-text">
          <h1>5000 Fact-checking<br> Reports Analysis</h1>
          <h2>COVID-19 <br><span style="color: #ff8261">Disinformation</span><br> War</h2>
          <div class="landing-wrapper-text__description-wrapper description-wrapper">
            <p>READr analyzed over 5000 fact-checking reports, and discovered the danger of "COVID-19 disinformation". We show the trends in the spread of  disinformation in the last 5 months through data visualization.</p>
            <blockquote>Note: We use the TF-IDF word segmentation method and manual analysis to find the unique words in the text of fact-checking reports.</blockquote>
          </div>
        </div>
      </div>
    </section>
    <section class="scrolly">
      <figure class="scrolly__sticky-chart sticky-chart">
        <div
          v-show="chartIndexScrolly === 1"
          class="legend"
        >
          <div class="circle-hint circle-hint--orange"></div>
          <p>一天的查核報告數量</p>
        </div>
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
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart1-1'),
            once: true,
          }"
        >
          <p>When the spreading of the virus was restricted to China, the spreading of disinformation was remarkably faster. READr analyzed over 5000 IFCN reports and the real situation of disinformation spreading in SNS, to show the trends in the spread of  disinformation in the last 5 months.</p>
        </div>
        <div
          class="enter-view-step textboxes__textbox textboxes__textbox--scrolly"
          data-chart="2"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart1-2'),
            once: true,
          }"
        >
          <p>From the change of the number of fact-checking reports, we can see a small peak in early February. At that time, the epidemic mainly broke out in China, so the major topics of disinformation were related to "China" in every country.</p>
        </div>
        <div
          class="enter-view-step textboxes__textbox textboxes__textbox--scrolly"
          data-chart="3"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart1-3'),
            once: true,
          }"
        >
          <p>As the virus is spreading to the world, every country begins to face overwhelming disinformation.</p>
          <div class="mobile-only">
            <br>
            <p><span class="orange">21 Feb</span>, Iran became a point of mass infection</p>
            <p><span class="orange">25 Feb</span>, Italy became a point of mass infection</p>
            <p><span class="orange">29 Feb</span>, the first death case in the United States</p>
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
        <div
          class="textboxes__textbox"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart2'),
            once: true,
          }"
        >
          <p>India has the most fact-checking reports among all countries. Beside the activity of the local fact-checking organization, it also shows how much India is harmed by disinformation.</p>
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
        <div
          class="textboxes__textbox"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart3'),
            once: true,
          }"
        >
          <p>Ｍore than half of these disinformation are spread on Facebook. The social platform Twitter and the communication software Whatsapp are also the main media for spreading.</p>
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
        <div
          class="textboxes__textbox"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart4'),
            once: true,
          }"
        >
          <p>READr referred to the <a href="https://reutersinstitute.politics.ox.ac.uk/types-sources-and-claims-covid-19-misinformation" target="_blank" rel="noreferrer noopener" style="color: #ff8261;">research method of Reuters Institute for the Study of Journalism</a> and classified the samples manually. We found that  "community spread" was the type with the largest number. Most contents are about exaggerating the impact of the epidemic.</p>
        </div>
      </article>
    </section>
    <section
      class="scrolly"
    >
      <figure class="scrolly__sticky-chart sticky-chart">
        <div
          v-show="showChartTopicLegend && chartIndexScrollyTopics >= 1 && chartIndexScrollyRetweet === 0"
          class="legend"
        >
          <div class="circle-hint circle-hint--orange"></div>
          <p>一篇查核報告</p>
        </div>
        <template v-if="$store.state.viewport[0] >= 768">
          <template v-for="order in 8">
            <component
              :is="`ChartTopics${order}`"
              v-if="chartIndexScrollyTopics >= order * 2 - 1 && chartIndexScrollyTopics <= order * 2"
              :showKeywords="chartIndexScrollyTopics === order * 2"
            />
          </template>
        </template>
        <template v-else>
          <template v-for="order in 8">
            <component
              :is="`ChartTopics${order}Mobile`"
              v-if="chartIndexScrollyTopics >= order * 2 - 1 && chartIndexScrollyTopics <= order * 2"
              :showKeywords="chartIndexScrollyTopics === order * 2"
            />
          </template>
        </template>
      </figure>
      <article class="scrolly__textboxes textboxes">
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="1"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-1'),
            once: true,
          }"
        >
          <p>The type "community spread" has the largest number of fact-checking reports. The content mainly describes the impact of the epidemic; for example, exaggerating the impact with suicides or protests caused by the epidemic, by claiming that a certain location was infected with the virus for the first time, or by accusing some specific races spreading the virus. According to the result, 1 out of 4 disinformation is on this topic.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="2"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-2'),
            once: true,
          }"
        >
          <p>For example,</p>
          <p><span style="color: #f5867a;">"Coffins"</span>, using pictures of piles of coffins to start a rumor about many people having died from COVID-19 in that area.</p>
          <p><span style="color: #ffad61;">"Case"</span>, claiming a place had the first COVID-19 confirmed case.</p>
          <p><span style="color: #ffd663;">"Images"</span>, using various irrelevant pictures to exaggerate the impact of the epidemic.</p>
          <p><span style="color: #b2d199;">"Venezuela"</span>, claiming that the Italians felt "money is useless for saving lives" and threw money on the streets. But the original story happened in Venezuela and has nothing to do with COVID-19.</p>
          <p><span style="color: #78b8cc;">"Riots"</span>, claiming that insufficient food caused riots in London, but in fact, it embezzled an old video.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="3"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-3'),
            once: true,
          }"
        >
          <p>We can often see "authorities" in the disinformation. The authorities make the disinformation persuasive. The content of the type "Public Authority Action/Policy" claims to be the state policies or WHO recommendations. It also exaggerates the content of policies. The number of this type ranks second.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="4"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-4'),
            once: true,
          }"
        >
          <p>For example,</p>
          <p><span style="color: #f5867a;">"UNICEF"</span>, claiming that the The United Nations Children's Fund recommended a series of measures to avoid infections, including drinking hot water and not eating ice cream.</p>
          <p><span style="color: #ffad61;">"WHO"</span>, World Health Organization is the most frequently cited authority in the COVID-19 disinformation, including  various remedies or the latest news on epidemics.</p>
          <p><span style="color: #ffd663;">"Military"</span>, claiming that the government would mobilize the military to take more stringent prevention measures.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="5"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-5'),
            once: true,
          }"
        >
          <p>The third in number is the most dangerous topic of disinformation, "General medical advice and virus characteristics". This kind of disinformation rumored that various remedies can cure COVID-19. People tried wrong remedies and died. For instance, more than 2,000 people in Iran were poisoned and 244 people died after drinking toxic alcohol.</p>
          <br>
          <p>There is no effective drugs for COVID-19,  which makes this type of disinformation keep spreading rampantly.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="6"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-6'),
            once: true,
          }"
        >
          <p><span style="color: #f5867a;">"Cure"</span>, the most common word in this type of disinformation, claiming certain food or therapy could cure COVID-19, like <span style="color: #ffad61;">"vitamin"</span>, <span style="color: #ffd663;">"coffee"</span>, <span style="color: #b2d199;">"tea"</span>, <span style="color: #78b8cc;">"garlic"</span>.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="7"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-7'),
            once: true,
          }"
        >
          <p>The type "prominent actors" is about talks or acts of celebrities, politicians, and companies. They often claim that celebrities were infected by COVID-19, or claim a company was offering discounts due to the epidemic. For example, Queen Elizabeth II and Chinese actor Jackie Chan have rumors of being infected. The number of disinformation in this type ranks fourth.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="8"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-8'),
            once: true,
          }"
        >
          <p>For example,</p>
          <p><span style="color: #f5867a;">"Denied"</span>, the most common word in this type in the fact-checking reports. The disinformation claims  celebrities have been infected, or they donate money, etc. But none of these things happened.</p>
          <br>
          <p>For instance, the Vatican <span style="color: #ffad61;">"pope"</span> is rumored to be infected. The Portuguese football player <span style="color: #ffd663;">"ronaldo"</span> has been declared to donate his house for hospital use.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="9"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-9'),
            once: true,
          }"
        >
          <p>The type "other incidents caused by COVID-19" means some incidents happened because of the epidemic, but not directly related to the virus, such as political struggles between politicians, frauds happened when people need quarantine, or nature restoration since many countries stop business activities.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="10"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-10'),
            once: true,
          }"
        >
          <p>For example,</p>
          <p><span style="color: #f5867a;">"Hantavirus"</span>, claiming that a new virus of human-to-human transmission emerged in China after COVID-19. But the hantavirus has actually been around for a long time.</p>
          <p><span style="color: #ffad61;">"Mosque"</span>, claiming Chinese President Xi visited the mosque and prayed for the country.</p>
          <p><span style="color: #ffd663;">"Rob"</span>, claiming somebody would come to the door to provide free masks. When you put on the mask, you would fall into a coma, and the gangster would rob you at that time. This is a variant of an ancient rumor.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="11"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-11'),
            once: true,
          }"
        >
          <p>The type "virus transmission" of disinformation is mainly  spreading rumors about the various ways of virus transmission. For example, claiming the virus may spread through unshaved beards and newspapers. Or, claiming that do not eat seafood because some countries discard infected bodies on the beach.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="12"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-12'),
            once: true,
          }"
        >
          <p>For example, they claim that coronavirus could infect <span style="color: #f5867a;">"animals"</span> and <span style="color: #ffad61;">"pets"</span>. Or coronavirus was found in <span style="color: #ffd663;">"broiler"</span> chicken.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="13"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-13'),
            once: true,
          }"
        >
          <p>The types "conspiracies", "virus transmission" and "the epidemic is not serious" often show up in the same piece of disinformation. These types of disinformation claim that the coronavirus has long existed, the COVID-19 epidemic has been predicted, or someone is behind the epidemic. They also imply that COVID-19 epidemic is not serious by comparing with the death numbers of other illnesses like flu or AIDS.</p>
          <br>
          <p>These types of disinformation also relate to the argument about "the origins of virus" between China and the USA. A research finds some disinformation are related to the Information war initiated by China.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="14"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-14'),
            once: true,
          }"
        >
          <p>For example, in type "Conspiracies",</p>
          <p><span style="color: #f5867a;">"Nostradamus"</span>, a French astrologer in the 1500s. He left a collection of prophecies in poems. Some researchers saw historical events that occurred in the "future" from these short poems, such as the French Revolution, the rise of Hitler and so on. COVID-19 is included.</p>
          <p><span style="color: #ffad61;">"Predicted"</span>, claiming that COVID-19 has been predicted to happen. Beside astrologers, novels, TV series or "The Simpsons" have predicted it.</p>
          <p><span style="color: #ffd663;">"5G"</span>, China launched the first 5G networks in last December, which coincided with the rise of COVID-19. People with bad intentions made the rumor that virus spread through 5G base stations. Some 5G base stations in the UK were destroyed because of the rumor.</p>
          <p><span style="color: #b2d199;">"Bill Gates"</span>, who is rumored behind the COVID-19. The disinformation claims that he created the virus for the huge profits of the vaccine, or to reduce the world population.</p>
          <p><span style="color: #78b8cc;">"Laboratory"</span>, claiming that COVID-19 is a man-made biological weapon in a Chinese laboratory.</p>
          <br>
          <p>And in type "The epidemic is not serious", <span style="color: #609EE6">"flu"</span> is the most common word. The disinformation uses the death number of flu to imply that COVID-19 epidemic is not that serious. The disinformation also claims COVID-19 is just a <span style="color: #B68BDB">"cold"</span>.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="15"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-15'),
            once: true,
          }"
        >
          <p>The type "vaccine development and availability" claims about the development of vaccines. Many countries claim that they have successfully developed a vaccine for COVID-19, but  it is false, because no vaccine is ever developed successfully to date.</p>
          <br>
          <p>"Public preparedness" refers to people hoarding or purchasing materials, or observing (or not observing) government regulations. For example,  embezzle an old video to claim that people rush into the supermarket in panic to buy goods, or photos of empty shelves in the supermarket.</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="16"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart5-16'),
            once: true,
          }"
        >
          <p>For example,</p>
          <p><span style="color: #f5867a;">"Developed"</span>, claiming the progress of vaccine development, or claiming the vaccine has been developed successfully.</p>
          <p><span style="color: #ffad61;">"Senegal"</span>, claiming 7 children died because of the vaccine experiment in Senegal.</p>
          <p><span style="color: #ffd663;">"Supermarket"</span>, using photos of empty shelves in the supermarket or a crowd rushing into the supermarket, to create fear of supply shortage.</p>
        </div>
      </article>
    </section>
    <section
      class="text-only-section"
      v-observe-visibility="{
        callback: (isVisible) => isVisible && handleVisible('text-only-section-1'),
        once: true,
      }"
    >
      <p
        v-observe-visibility="isVisible => { showChartTopicLegend = !isVisible }"
      >In addition to the topics, we also tried to explore the influence of disinformation. According to the notes made by fact-checking organizations, 782 of the reports were disinformation spread on Twitter. We manually extracted the original text of the disinformation in the reports. (Some fact-checking reports do not mark the original text. Some original text have been lost on Twitter. We found a total of 351 articles, accounting for 45% of the total). We checked their influence in Twitter and in the archived tweet data provided by Yu-Chung Cheng’s team at National Chengchi University. We found a slightly different trend.</p>
    </section>
    <section class="scrolly">
      <figure class="scrolly__sticky-chart sticky-chart">
        <template v-if="$store.state.viewport[0] >= 768">
          <img
            v-show="chartIndexScrollyRetweet === 1"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-web-E.png"
            alt="retweet-chart-1"
          >
          <img
            v-show="chartIndexScrollyRetweet === 2"
            src="/proj-assets/ncov2019misinfo/static-charts/C2-web-E.png"
            alt="retweet-chart-2"
          >
          <img
            v-show="chartIndexScrollyRetweet === 3"
            src="/proj-assets/ncov2019misinfo/static-charts/C3-web-E.png"
            alt="retweet-chart-3"
          >
          <img
            v-show="chartIndexScrollyRetweet === 4"
            src="/proj-assets/ncov2019misinfo/static-charts/C4-web-E.png"
            alt="retweet-chart-4"
          >
          <img
            v-show="chartIndexScrollyRetweet === 5"
            src="/proj-assets/ncov2019misinfo/static-charts/C5-web-E.png"
            alt="retweet-chart-5"
          >
          <img
            v-show="chartIndexScrollyRetweet === 6"
            src="/proj-assets/ncov2019misinfo/static-charts/C6-web-E.png"
            alt="retweet-chart-6"
          >
        </template>
        <template v-else>
          <img
            v-show="chartIndexScrollyRetweet === 1"
            src="/proj-assets/ncov2019misinfo/static-charts/C1-mobile-E.png"
            alt="retweet-chart-1"
          >
          <img
            v-show="chartIndexScrollyRetweet === 2"
            src="/proj-assets/ncov2019misinfo/static-charts/C2-mobile-E.png"
            alt="retweet-chart-2"
          >
          <img
            v-show="chartIndexScrollyRetweet === 3"
            src="/proj-assets/ncov2019misinfo/static-charts/C3-mobile-E.png"
            alt="retweet-chart-3"
          >
          <img
            v-show="chartIndexScrollyRetweet === 4"
            src="/proj-assets/ncov2019misinfo/static-charts/C4-mobile-E.png"
            alt="retweet-chart-4"
          >
          <img
            v-show="chartIndexScrollyRetweet === 5"
            src="/proj-assets/ncov2019misinfo/static-charts/C5-mobile-E.png"
            alt="retweet-chart-5"
          >
          <img
            v-show="chartIndexScrollyRetweet === 6"
            src="/proj-assets/ncov2019misinfo/static-charts/C6-mobile-E.png"
            alt="retweet-chart-6"
          >
        </template>
      </figure>
      <article class="scrolly__textboxes textboxes">
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="1"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart6-1'),
            once: true,
          }"
        >
          <p>From the retweet count, the influence of disinformation in the type of "incidents caused by the epidemic" is obviously more powerful than the other types. </p>
          <br>
          <p>In the total statistics of fact-checking reports, this type of disinformation only accounts for 8% of the total.</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="2"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart6-2'),
            once: true,
          }"
        >
          <p>The first and second popular tweets are about the nature is restored due to the reduction of human activities.</p>
          <br>
          <p>Two tweets retweeted for more than 300,000 times are a group of photos of dolphins and swans appearing in the Venice canals. However, the dolphins did not show up there, nor did the swans appear after COVID-19 lockdown. This is a misleading disinformation.</p>
          <br>
          <p>These are "good news" in the pandemic gloom. But after all, they are still fake.</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="3"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart6-3'),
            once: true,
          }"
        >
          <p>This type of disinformation not only contains the idea of nature restoration, but also contains politicians' statements or political struggles. Since politicians have a lot of followers on Twitter, their tweets easily attract attention.</p>
          <br>
          <p>The third most retweeted disinformation came from US President Donald Trump. It is noticeable that the reason of making it disinformation is the follow-up effect: Trump constantly praised Quinine's efficacy on Twitter which was supported by the media’s misreporting. People who are afraid of infection take Quinine by themselves without medical advice, which will pose a danger.</p>
          <br>
          <p>The tweets from former US Vice President Joe Biden are also on the list. He pointed out that a CDC official who warned against COVID-19 was silenced. This tweet was retweeted nearly 50,000 times, but it was false, checked by the Washington Post.</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="4"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart6-4'),
            once: true,
          }"
        >
          <p>The two types "community spread" and "general medical advice and virus characteristics" are the largest in the statistics of the fact-checking reports.</p>
          <br>
          <p>From the retweet counts, the influence of "general medical advice and virus characteristics" seems to be greater than "community spread", but that is due to the top 2 highest retweet counts are related to Trump’s praise of the effect of Quinine.</p>
          <br>
          <p>Excluding these two, the two types have similar influence. We also found that the count and the influence of disinformation in "community spread"  are relatively more on Twitter.</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="5"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart6-5'),
            once: true,
          }"
        >
          <p>They are all videos and are going viral on Twitter: a doctor tried to hug a baby who is rumored to be infected and quarantined. The Italians sang and danced on their balcony during lockdown. An Italian was arrested because he violated the rules of quarantine. A black living in China was attacked by Asians, etc.</p>
          <br>
          <p>The emotions of touching, delighting, and terrifying are elements that will strike a chord with people and make them want to share. They are the key factors for dissemination of disinformation.</p>
        </div>
        <div
          class="enter-view-step-retweet textboxes__textbox textboxes__textbox--scrolly"
          data-chart="6"
          v-observe-visibility="{
            callback: (isVisible) => isVisible && handleVisible('chart6-6'),
            once: true,
          }"
        >
          <p>In the content of type "general medical advice and virus characteristics",   the information about that "Ibuprofen" can bring negative effects on patients is also spread on Twitter.</p>
          <br>
          <p>These contents show the fear of COVID-19 without medicine is still driving people to find answers.</p>
        </div>
      </article>
    </section>
    <section
      class="text-only-section"
      v-observe-visibility="{
        callback: (isVisible) => isVisible && handleVisible('text-only-section-2'),
        once: true,
      }"
    >
      <p>Given the continual spread of COVID-19 around the world, aside from the virus, we should also be aware of the disinformation which can take human lives and spread faster than the virus. For the influence of these kinds of disinformation, please read another report produced by READr: <a href="https://www.readr.tw/project/covid19-disinformation/en" target="_blank" style="color: #ff8261;">"The Visible Virus: COVID-19 Disinformation"</a>.</p>
    </section>
    <Footer
      style="margin-top: 50px"
      v-observe-visibility="{
        callback: (isVisible) => isVisible && handleVisible('footer'),
        once: true,
      }"
    />
  </div>
</template>

<script>
  import enterView from 'enter-view'
  import scrollama from 'scrollama'
  import ChartLanding from './ChartLanding.vue'
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
  import ChartTopics1 from './ChartTopics1.vue'
  import ChartTopics2 from './ChartTopics2.vue'
  import ChartTopics3 from './ChartTopics3.vue'
  import ChartTopics4 from './ChartTopics4.vue'
  import ChartTopics5 from './ChartTopics5.vue'
  import ChartTopics6 from './ChartTopics6.vue'
  import ChartTopics7 from './ChartTopics7.vue'
  import ChartTopics8 from './ChartTopics8.vue'
  import ChartTopics1Mobile from './ChartTopics1Mobile.vue'
  import ChartTopics2Mobile from './ChartTopics2Mobile.vue'
  import ChartTopics3Mobile from './ChartTopics3Mobile.vue'
  import ChartTopics4Mobile from './ChartTopics4Mobile.vue'
  import ChartTopics5Mobile from './ChartTopics5Mobile.vue'
  import ChartTopics6Mobile from './ChartTopics6Mobile.vue'
  import ChartTopics7Mobile from './ChartTopics7Mobile.vue'
  import ChartTopics8Mobile from './ChartTopics8Mobile.vue'
  import Footer from './Footer.vue'

  import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)

  export default {
    components: {
      ChartLanding,
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
      ChartTopics1,
      ChartTopics2,
      ChartTopics3,
      ChartTopics4,
      ChartTopics5,
      ChartTopics6,
      ChartTopics7,
      ChartTopics8,
      ChartTopics1Mobile,
      ChartTopics2Mobile,
      ChartTopics3Mobile,
      ChartTopics4Mobile,
      ChartTopics5Mobile,
      ChartTopics6Mobile,
      ChartTopics7Mobile,
      ChartTopics8Mobile,
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
        shouldFixLongChartArticleTopic: false,
        showChartTopicLegend: false,
      }
    },
    methods: {
      handleVisible(label) {
        window.ga('send', 'event', 'projects', 'scroll', label, { nonInteraction: false })
      },
      visibilityChanged(isVisible) {
        if (isVisible) {
          this.showLongChartsTopic = false
          this.showLongChartsPlatform = false
          this.showLongChartsCountry = false
        }
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
  blockquote {
    margin: 20px 0 0 0;
    color: #4a4a4a;
    line-height: 1.5;
    padding: 0 0 0 13px;
    border-left: 1px solid #979797;
    /*text-align: justify;*/
  }
  .circle-hint {
    width: 14px;
    height: 14px;
    border-radius: 100%;
    margin: 0 10px 0 0;
  }
  .circle-hint--orange {
    background-color: #ec894c;
  }
  .legend {
    position: fixed;
    top: 40px;
    left: 0;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .landing-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .landing-wrapper-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .landing-wrapper-text h1 {
    margin: 0;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
  }
  .landing-wrapper-text h2 {
    margin: 10px 0 0 0;
    font-size: 30px;
    text-align: center;
  }
  .description-wrapper {
    background-color: #f9f9f9;
    padding: 20px 20px 24px 20px;
    line-height: 1.75;
    /*text-align: justify;*/
    margin-top: 30px;
  }
  .description-wrapper p {
    margin: 0;
  }

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
    min-height: 100vh;
    padding: 0 20px;
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
    display: none;
  }
  .long-chart__textboxes.fix {
    display: initial;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }

  .text-only-section {
    max-width: 820px;
    font-size: 16px;
    line-height: 1.75;
    /*text-align: justify;*/
    color: #4a4a4a;
    margin: 0 20px;
  }
  .text-only-section p {
    margin: 0;
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
    .landing-wrapper-chart {
      width: 50%;
    }
    .legend {
      position: fixed;
      top: auto;
      bottom: 50px;
      left: 200px;
      width: initial;
      display: flex;
      align-items: center;
    }
    .landing-wrapper {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .landing-wrapper-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .landing-wrapper-text h1 {
      margin: 0;
      font-size: 30px;
      font-weight: normal;
    }
    .landing-wrapper-text h2 {
      margin: 20px 0 0 0;
      font-size: 60px;
    }
    .landing-wrapper-text br {
      display: none;
    }
    .description-wrapper {
      width: 50%;
      background-color: #f9f9f9;
      padding: 13px 28px 20px 28px;
      line-height: 1.75;
      text-align: justify;
      margin-top: 30px;
    }
    .description-wrapper p {
      margin: 0;
    }

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
  @media (max-width: 320px) {
    /*.description-wrapper p {*/
    /*  font-size: 14px;*/
    /*}*/
    .landing {
      padding: 50px 0 0 0;
    }
  }
</style>
