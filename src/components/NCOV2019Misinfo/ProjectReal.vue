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
        >
          <p>數量最多的，是「病毒在社區中的傳播」類的假訊息。內容主要闡述疫情的影響，例如誇大疫情的影響，如疫情造成民眾自殺、引起抗議等；或聲稱某個地方首次遭到病毒感染；指責某些種特定種族傳播病毒等等。平均每 4 則假訊息就有 1 則是這個主題。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="2"
        >
          <p><span style="color: #f5867a;">「棺材」（coffins）</span>——用滿地是棺材的照片傳言該地區已經因為武漢肺炎死了很多人；</p>
          <p><span style="color: #ffad61;">「病例」（case）</span>——宣稱某個地區已經有了第一起武漢肺炎病例；</p>
          <p><span style="color: #ffd663;">「圖片」（images）</span>——挪用各式各樣不相干的圖片來誇大疫情的影響；</p>
          <p><span style="color: #b2d199;">「委內瑞拉」（venezuela）</span>——佯稱義大利人覺得「錢對挽救生命毫無用處」，把錢撒在馬路上。但原本的故事發生在委內瑞拉，且與武漢肺炎無關；</p>
          <p><span style="color: #78b8cc;">「暴動」（riots）</span>——英國倫敦因為食物不足引起了暴動，但事實上挪用了舊影片。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="3"
        >
          <p>假訊息中常常可以見到「權威」的存在，因為這會增加信息的可信度。「官方機構的作為」分類代表這些假訊息的內容佯裝成國家政策或 WHO 建議的主張，也會誇大政策的內容。這一類的假訊息數量排名第二。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="4"
        >
          <p><span style="color: #f5867a;">「聯合國兒童基金會」（unicef）</span>——宣稱該組織發布了一系列如何避免染疫的措施，包括飲用熱水、不要吃冰淇淋等；</p>
          <p><span style="color: #ffad61;">「世界衛生組織」（WHO）</span>——世界衛生組織是最常被引用的權威，包括各種偏方或疫情的最新進展；</p>
          <p><span style="color: #ffd663;">「軍方」（military）</span>——因為疫情，政府準備動員軍隊來採取更嚴格的防疫措施。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="5"
        >
          <p>數量排名第三的是最危險的假訊息主題：「醫學相關、疾病的影響」。這類的假訊息謠傳各種可以治癒武漢肺炎的偏方，甚至有人誤信偏方而死亡——例如伊朗有超過 2 千人喝到假酒中毒，244 人因此身亡。</p>
          <br>
          <p>武漢肺炎至今仍然沒有特效藥，這也讓這類的假訊息持續猖獗地傳播。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="6"
        >
          <p><span style="color: #f5867a;">治癒（cures）</span>——是這類假訊息最常見的詞。宣稱某種食物或方式可以治癒武漢肺炎，例如<span style="color: #ffad61;">維他命（vitamin）</span>、<span style="color: #ffd663;">咖啡（coffee）</span>、<span style="color: #b2d199;">茶（tea）</span>、<span style="color: #78b8cc;">大蒜（garlic）</span>。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="7"
        >
          <p>「名人宣稱或相關活動」的假訊息是關於名人、政客、公司企業的談話或作為。常見的內容是名人被確診武漢肺炎，或某公司因為武漢肺炎提供什麼樣的優惠。例如英國女王伊麗莎白、中國男星成龍等都曾被謠傳確診。這一類的假訊息數量排名第四。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="8"
        >
          <p><span style="color: #f5867a;">「否認」（denied）</span>——是這類假訊息的查核報告常出現的詞。因為假訊息會佯稱名人確診、名人捐錢、名人做了什麼事⋯⋯但事實上都沒有。</p>
          <br>
          <p>例如梵蒂岡<span style="color: #ffad61;">「教宗」（pope）</span>被謠傳確診；葡萄牙球星<span style="color: #ffd663;">「羅納度」（ronaldo）</span>還被宣稱要將自己的家捐出來當作醫院使用。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="9"
        >
          <p>「因為疫情衍生出的行為」代表內容並非直接和武漢肺炎有關，而是因為疫情引起的事件，例如政客之間的政治鬥爭、因為民眾需要檢疫發生的詐騙案，或是因為武漢肺炎許多國家停止了商業活動，讓大自然恢復平靜等等。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="10"
        >
          <p><span style="color: #f5867a;">漢他病毒（hantavirus）</span>——繼武漢肺炎之後，中國又出現新的人傳人病毒。但漢他病毒早就存在；</p>
          <p><span style="color: #ffad61;">清真寺（mosque）</span>——中國主席習近平參觀清真寺，為國家祈禱；</p>
          <p><span style="color: #ffd663;">搶劫（rob）</span>——有人會上門提供免費口罩。而當你戴上口罩時，就會陷入昏迷，歹徒藉此搶劫。這是一個古老謠言的變形。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="11"
        >
          <p>「病毒是如何傳播」分類中的假訊息，主要是謠傳各種病毒傳播的方式。例如病毒可能透過未刮的鬍鬚、報紙傳播，或因為某些國家丟棄染疫的屍體在海灘上，所以不要吃海鮮。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="12"
        >
          <p>武漢肺炎可以傳染給<span style="color: #f5867a;">動物（animal）</span>、<span style="color: #ffad61;">寵物（pets）</span>，或是在<span style="color: #ffd663;">雞（broiler）</span>身上發現了新型冠狀病毒。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="13"
        >
          <p>「陰謀論」、「病毒的起源」、「疫情其實不嚴重」這三個分類的主題常常出現在同一則假訊息中。這類的假訊息常常謠傳病毒早就已經存在、大流行早就被預言會發生、或是誰是病毒背後的幕後黑手。也會用流感、愛滋病等等病症的死亡人數來暗示武漢肺炎其實並不嚴重。</p>
          <br>
          <p>這些假訊息也和後期美國與中國在爭論病毒起源來自哪裡有關，也有研究認為部分訊息是中國發起的資訊戰。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="14"
        >
          <p><span style="color: #f5867a;">諾斯特拉達穆斯（Nostradamus）</span>——是 1500 年代法國的占星家。留下以詩體呈現的預言集，有研究者從這些短詩中看到發生在「未來」的歷史事件，如法國大革命、希特勒的崛起等等，武漢肺炎也沒有缺席；</p>
          <p><span style="color: #ffad61;">被預言（predicted）</span>——武漢肺炎早就被預言會發生。除了占星家以外，小說、電視劇或卡通辛普森都曾「預言」過；</p>
          <p><span style="color: #ffd663;">5G（5G）</span>——中國在去年年底啟用了首批 5G 網路，跟武漢肺炎興起的時機不謀而合。有心人士就造謠病毒是透過 5G 基地台傳播，英國有基地台因此被拆毀；</p>
          <p><span style="color: #b2d199;">比爾蓋茲（Bill Gates）</span>——比爾蓋茲被指稱是武漢肺炎的幕後黑手。他創造病毒是為了疫苗的暴利或為了減少世界人口；</p>
          <p><span style="color: #78b8cc;">實驗室（laboratory）</span>——武漢肺炎是人類在中國實驗室做出來的生物武器。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="15"
        >
          <p>「疫苗研發」的假訊息內容跟疫苗的發展有關。各地都有宣稱已經成功研發對抗武漢肺炎疫苗的訊息，但這些都是假的，因為迄今仍然沒有成功的研發案例。</p>
          <br>
          <p>「準備與預防」則是關於人們囤積或購買物資、遵守（或不遵守）政府規定衍生出的行為。例如挪用舊影片宣稱人們驚恐地衝進超市搶購物資，或是空蕩蕩的貨架照片等等。</p>
        </div>
        <div
          class="enter-view-step-topics textboxes__textbox textboxes__textbox--scrolly"
          data-chart="16"
        >
          <p><span style="color: #f5867a;">研發（developed）</span>——疫苗研發的進度，或宣稱已經被研發出來；</p>
          <p><span style="color: #ffad61;">塞內加爾（senegal）</span>——疫苗在塞內加爾進行實驗，死了 7 個小孩。</p>
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
        shouldFixLongChartArticleTopic: false
      }
    },
    methods: {
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
