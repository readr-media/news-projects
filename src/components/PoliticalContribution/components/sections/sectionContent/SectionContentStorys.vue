<template>
  <main class="section-content-story">
    <article v-if="slug === 'story1'">
      <h1 class="section-content-story__title">選一次立委，金流超過 28 億！</h1>
      <SectionContentCredits :publishedDate="'2017/11/9'"/>
      <div class="section-content-story__paragraph">
        2016 年，台灣剛結束一場熱鬧的選舉，緊接著 2018 年的選舉又將到來。民主制度是台灣人驕傲的資產，但如何讓手中的這一票，發揮它最大的價值？近幾年來，人民對於政治開放的訴求愈來愈高，但卻有一項重要的資料被技術性地「鎖」在政府機關，那就是政治獻金。
      </div>
      <div class="section-content-story__paragraph">
        根據資料統計， 2016 年的選舉，光是區域立委候選人
        <SectionContentStorysInfoboxHint :hint="'（註）'">
          <div>
            本政治獻金專案統計的範圍是「有開設政治獻金專戶」且「有登記參選」的候選人，不分區立委是按照政黨票得票比率來決定當選與否，沒有個人的政治獻金專戶。所以只有區域立委候選人、原住民立委候選人共計 261 人為此次的統計樣本。
          </div>
        </SectionContentStorysInfoboxHint>
        就收到了 28 億元的捐贈。倘若人們想要知道這 28 億金流的細節，要付出什麼樣的代價？
      </div>
      <div class="section-content-story__paragraph">
        雖然台灣有規定候選人必須依《政治獻金法》申報政治獻金，資料也會在選舉結束後被公開檢視，但與其說是「公開」，不如說是像文物一樣被「典藏」。上網公開的只有各項政治獻金的統計，想知道明細，必須先向監察院提出申請，付小額的查閱費用，但最多也只能把資料印在一張張的 A4 紙上，完全無法應用。
      </div>
      <div class="section-content-story__paragraph">
        正因如此，在 2014 年，著名的公民社群 g0v 零時政府發起了一項<a class="section-content-story__link" href="https://g0v.hackpad.tw/8ow2GnliH48" target="_blank">「政治獻金透明化」</a>專案，將從監察院印出的候選人政治獻金資料，以「字」為單位切成小塊的圖檔，利用文字辨識（OCR, Optical Character Recognition）的概念，讓網友來參與，結果在 24 小時之內，就完成了將近 31 萬格的文字辨識，成功數位化 7 個政治獻金專戶、 2637 份文件資料。
      </div>
      <div class="section-content-story__paragraph">
        當時獲得的熱烈迴響，還包括多位立委提出《政治獻金法》修法，讓專案發起人之一王向榮覺得「效果已達到，等修完法就有乾淨的數位檔可以用了」，沒想到這麼一等，等到立委又再選了一輪，政治獻金明細公開的法源仍然沒有下文。
      </div>
      <div class="section-content-story__paragraph">
        也就是說，儘管這些金流完全合法，卻無法公開被檢視。《鏡傳媒》與從事政治獻金研究的中研院副研究員李宗榮合作，鎖定 2016 年立委選舉的「營利事業捐贈」捐獻明細，把資料從監察院帶出來、數位化、並開發成工具，希望能透過資料實際被應用的過程，彰顯公開這份資料的重要性。
      </div>
      <!-- chart1-1 here -->
      <div class="visualization">
        <h2 class="visualization__title">本次政治獻金的組成</h2>
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
        我們發現，這 261 位候選人共收入政治獻金 2,817,453,078 元。其中營利事業的政治獻金捐贈佔了 32%，分別捐給 208 位候選人。這 5797 筆明細分別由 4162 家公司捐贈，但只有 255 家有捐超過 100 萬，最後一名是捐 100 塊。
      </div>
      <div class="section-content-story__paragraph">
        再比對母公司與集團資料後，有 432 家公司隸屬於 254 個集團，掌握了 40％ 的營利事業政治獻金，第一名是徐旭東的遠東集團，共捐了 5 千 400 萬，是第二名裕隆集團的 1.6 倍。
      </div>
      <div class="section-content-story__paragraph">
        這份資料當然有它的侷限，檯面下的利益交換、或是否有刻意不被申報的金流，都不在我們能夠檢視的範圍內。候選人在資料裡收入數字的多寡，最理想的情況，能夠直接代表他的募款能力；但以現實來講，則是候選人願意誠實申報的內容。
      </div>
      <div class="section-content-story__paragraph">
        那，我們應該怎麼來解讀這些合法的政治金流呢？
      </div>
      <div class="section-content-story__paragraph">
        在《政治獻金法》的定義裡，政治獻金指的是國民對「競選活動或其他政治相關活動」無償提供的資產，不能有對價、或其他經濟利益的掛鉤。
      </div>
      <div class="section-content-story__paragraph">
        實際上呢？我們節錄了一些訪問，或許可以提供給讀者一些閱讀的面向：
      </div>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          「國外的學者認為，政治獻金不一定是直接的影響力，但是是一種影響的管道。不是我給你錢，就可以命令你做什麼，但跟其他人比起來，至少多了一個管道。他（捐贈者）要怎麼運用這個管道是另一回事，但我們一般人就沒有這個管道。
        </div>
        <div class="section-content-story__paragraph">
          而台灣有些研究認為，政治獻金是一種買保險的概念。我現在用不到，就是灑錢，但我需要的時候、有困難的時候，至少有人可以幫我解決問題。錢灑得愈多、愈廣，保險的網就愈大。」
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （中研院社會所副研究員李宗榮）
        </div>
      </blockquote>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          「選舉的時候，真的永遠都覺得錢不夠，多一點錢、多掛幾個看板、多買幾份廣告，多找幾個工讀生，選到後來就覺得差一點點了。對於選舉的人來說，這些政治獻金就是無止盡的『即時雨』，很難拒絕的。」
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （助選志工）
        </div>
      </blockquote>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          「企業可以選我，我也可以選企業啊，我不收總可以吧。但通常沒去要，他們也不會主動給，沒有私人關係，是不會給的。」
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （立委助理）
        </div>
      </blockquote>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          「政治獻金只是競選經費的一個來源，假設你是一個沒有錢的候選人，政治獻金的多寡就很關鍵。但對自有財產的候選人，政治獻金可能只是錦上添花。
        </div>
        <div class="section-content-story__paragraph">
          企業捐款，通常會事先計算抵稅需求，可以撥出多少錢來捐款。由於捐款有上限，針對一個候選人是 100 萬、多位候選人則是 200 萬。如果要做公關的話，捐給多位候選人，一個人頂多 20 萬。如果針對個人捐超過 50 萬、或是捐到滿（ 100 萬），就需要特別關注。」
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （中正大學政治系副教授、2016 年社民黨候選人陳尚志）
        </div>
      </blockquote>
      <blockquote class="section-content-story__blockquote">
        <div class="section-content-story__paragraph">
          「我覺得還是要鼓勵政治人物申報政治獻金。除非真的被抓到對價關係，不然只有沒錢或乖乖申報的人被檢視。很多人會成立公司、基金會、協會去規避，通常沒錢的人，募多少，花多少。帳面上少的人，花的才可怕。」
        </div>
        <div class="section-content-story__paragraph section-content-story__paragraph--quote-by">
          （立委助理）
        </div>
      </blockquote>
      <div class="section-content-story__paragraph">
        接下來幾天，我們還會就立委、企業、政黨等面向作更進一步的分析（歡迎點此訂閱通知追蹤後續報導）！如果你也對這份資料有什麼好奇，歡迎你留言告訴我們，<router-link class="section-content-story__link" to="/project/political-contribution/explore">或是透過我們製作的工具來挖掘看看吧！</router-link>
      </div>
    </article>
    <article v-if="slug === 'story2'">
      <h1 class="section-content-story__title">立委篇／<br>老鳥與新秀，募款能力差了 6.6 倍</h1>
      <SectionContentCredits :publishedDate="'2017/11/13'"/>
      <div class="section-content-story__paragraph">
        以候選人自主申報的政治獻金資料來看，第九屆區域立委的政治獻金流還是集中在少數人身上，共計 261 位候選人中，收入前 48 位掌握了五成的政治獻金，數據也顯示，「現任」立委有較好的募款優勢。
      </div>
      <!-- chart2-1 here -->
      <div class="visualization">
        <h2 class="visualization__title"><span class="visualization__title--highlight">48 名候選人（20%）</span>掌握了 50% 的政治獻金</h2>
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
        從總收入、營利事業收入的排行中，前五名都是現任的立委。值得注意的是，營利事業收入排行榜中，位居第一、第二名的立委柯建銘與邱志偉，營利事業收入佔總收入的比例都超過五成。
      </div>
      <!-- chart2-2 here -->
      <div class="visualization">
        <h2 class="visualization__title">誰收到最多政治獻金捐贈？（總收入）</h2>
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
        <h2 class="visualization__title">誰收到最多營利事業政治獻金捐贈？</h2>
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
      <h2 class="section-content-story__subtitle">台灣人捐款就像宗教信仰</h2>
      <div class="section-content-story__paragraph">
        現任立委有較高的募款能力，國內外皆然。如美國 2002 年的聯邦眾議員選舉，現任者的募款金額平均是挑戰者的 7 倍，獲勝率超過 90%；台灣政治學者王鼎銘針對第六屆立委做的政治獻金研究，連任者募款的平均金額超過新秀的 2 倍。而我們從第九屆的資料中看到，差距已經來到了 3.6 倍。
      </div>
      <div class="section-content-story__paragraph">
        從捐款者的角度而言，如美國的選舉資料顯示，利益團體的有八成的捐款會流向現任民代
        <SectionContentStorysInfoboxHint :hint="'（註）'">
          <div>
            2012 年內政部委託之<a class="section-content-story__link" href="http://ir.lib.pccu.edu.tw/retrieve/46392/RRPG10105-0231-2751535.pdf" target="_blank">《我國政治獻金制度改革之研究》</a>
          </div>
        </SectionContentStorysInfoboxHint>
        ；時代力量黨團秘書長陳惠敏也以「宗教性」來形容台灣政治支持者的捐款動向，「台灣人傾向把錢投在他覺得會當選的人身上。選不上的他不投資，因為他（參選人）不會帶著你的政治理念往前走。」
      </div>
      <!-- chart2-4 here -->
      <div class="visualization">
        <h2 class="visualization__title">現任立委佔優勢（與非現任立委比較）</h2>
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
        若以四分位數來拆解政治獻金分布的狀況，可以看到資源過度集中在少數候選人身上，尤其在非現任立委身上更明顯。就像我們將非現任的 189 位參選人收到的政治獻金由小至大排行，並分成四組，金額分佈在前 1/4 位的新竹市立委參選人邱顯智 收入 9,475,771 元，但分佈在 3/4 位的新北市立委參選人董建一只有 260,110 元，兩人相差了 36 倍。
      </div>
      <div class="section-content-story__paragraph">
        細看資料，發現獻金收入愈高的非現任立委參選人，幾乎都不是政治新手，大多由現任議員挑戰，如收入前十名的排行榜中，只有時代力量的兩位候選人是第一次參選。
      </div>
      <!-- chart2-5 here -->
      <div class="visualization">
        <h2 class="visualization__title">非現任立委獻金收入前十名</h2>
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
        我們更進一步調查「第一次參選民選公職」的名單，發現不只募款能力與現任立委相差了 6.6 倍，連當選率都只有 9%。
      </div>
      <!-- chart2-6 here -->
      <div class="visualization">
        <h2 class="visualization__title">現任立委佔優勢（與第一次參選公職者比較）</h2>
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
        但從四分位數拆解，同樣出現了資源集中在少數人的現象。細看名單，在收入前十名的排行榜中，有一半的人屬於政治世家
        <SectionContentStorysInfoboxHint :hint="'（註）'">
          <div>
            此處引用《天下雜誌》<a class="section-content-story__link" href="http://topic.cw.com.tw/2015politicaldynasty/" target="_blank">「立委二代接班， 64 位政治世家全解析」</a>資料，定義為至少一位長輩、平輩或晚輩親屬從政。
          </div>
        </SectionContentStorysInfoboxHint>
        。
      </div>
      <!-- chart2-7 here -->
      <div class="visualization">
        <h2 class="visualization__title">第一次參選公職者獻金收入前十名</h2>
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
        不過，2016 年的選舉，因為特殊的政治氛圍、以及新興政黨的出現，還是讓當選名單出現了新的氣象。位在收入前五名的丁守中、吳育昇連任挑戰失敗，代表砸錢並不一定就是選票的證明。我們也找出落選名單中捐獻收入最高的前五名：
      </div>
      <!-- chart2-8 here -->
      <div class="visualization">
        <h2 class="visualization__title">誰收到最多捐獻最後卻沒選上？</h2>
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
        其中，丁守中敗給該區深耕多年的議員吳思瑤，吳育昇則敗給該選區曾連任八屆的議員之女呂孫綾。第三、第四名的對手，則是這次的新興勢力時代力量，分別是林昶佐、洪慈庸，第五名的楊麗環則僅以 160 票之差輸給民進黨的鄭寶清。
      </div>
      <div class="section-content-story__paragraph">
        若以政黨來看，從資料中可以發現，國、民兩大黨的營利事業收入差異不大，但國民黨有偏高的政黨補助，民進黨個人捐贈則突破五成。而時代力量主要的捐獻來源是個人捐贈，營利事業捐贈相較於兩大黨的比例也較少。
      </div>
      <!-- chart2-9 here -->
      <div class="visualization">
        <h2 class="visualization__title">不同政黨立委的政治獻金收入組成</h2>
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
        另一個值得關注的角度是，這些由候選人自行申報的獻金資料，揭露了多少政治現實？我們的制度是否鼓勵政治人物誠實申報政治獻金？
      </div>
      <div class="section-content-story__paragraph">
        台灣目前的制度，主要分為捐款人的年度捐獻總額與資格限制。在資格限制上，如營利事業「政府投資 20％」、「與政府有鉅額採購或建設契約」、「虧損中的企業」不得捐贈。限制看來合理，但執行查證資金來源的責任是由候選人承擔，中正大學政治系副教授陳尚志就指出，「誠實申報的人必須負擔很高的成本，不打算誠實申報的人，就可以輕易逃避懲罰。」
      </div>
      <div class="section-content-story__paragraph">
        這些「不打算誠實申報的人」可以如何規避？像是《政治獻金法》第 21 條規定，收受捐款總額超過一千萬，才須委託會計師查核簽證。而 2016 年的區域立委選舉，就有 155 個候選人申報的政治獻金小於一千萬元，占全部候選人的 59%。陳尚志也提到，參選人申報的會計報告書缺少對候選人自有資金的揭露，許多政治人物透過基金會募款，皆不受《政治獻金法》管轄，監察院也不曾主動追查。
      </div>
      <div class="section-content-story__paragraph">
        至於現行的政治獻金制度還有什麼問題，又要如何讓它變得更好呢？請期待我們的追蹤報導喔！
      </div>
    </article>
    <article v-if="slug === 'story3'">
      <h1 class="section-content-story__title">企業篇／<br>金權遊戲？翻開金主的投資名冊</h1>
      <SectionContentCredits :publishedDate="'2017/11/15'" :showSpecialThanks="true"/>
      <!-- chart3-1 here -->
      <div class="visualization">
        <h2 class="visualization__title">營利事業政治獻金組成</h2>
        <div class="chart-container">
          <BarVerticalStackedOrdinalDonatesFrom
            class="chart-container__chart"
            id="chart3-1"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        誰可以當立委的金主？政治獻金有分 5 種不同的來源，個人、營利事業、政黨、人民團體、匿名捐贈。在 2016 年立委選舉中，營利事業政治獻金佔了總捐贈的 32%，216 名候選人中，只有 8 位候選人沒有收到營利事業的捐贈。
      </div>
      <div class="section-content-story__paragraph">
        「金錢雖然不是政治影響力的唯一來源，卻是資本主義社會中最重要的影響要素之一。」中研院社會所副研究員李宗榮在其研究<a class="section-content-story__link" href="https://www.academia.edu/27129103/%E4%BC%81%E6%A5%AD%E6%AC%8A%E5%8A%9B%E8%88%87%E6%B0%91%E4%B8%BB_%E5%8F%B0%E7%81%A3%E4%BC%81%E6%A5%AD%E9%9B%86%E5%9C%982008%E5%B9%B4%E7%AB%8B%E5%A7%94%E9%81%B8%E8%88%89%E7%9A%84%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E5%88%86%E6%9E%90" target="_blank">《企業權力與民主：台灣企業集團 2008 年立委選舉的政治獻金分析》</a>中寫道，美國的政治學家賴特米爾斯（C. Wright Mills）也認為，政治獻金讓經濟權力的掌控者，可以將金錢直接轉換為政治的運作。
      </div>
      <div class="section-content-story__paragraph">
        在聯想到權力的施展之前，先來認識一下台灣捐贈政治獻金的限制，可能會有助於我們去分辨這些金額的意義。
      </div>
      <div class="section-content-story__paragraph">
        由於政治獻金可以抵稅，但可減除的金額不能超過所得額 10% ，總額也不得超過新台幣 50 萬元。從這個限制看來，意在抵稅的公司佔了大多數，4162 家公司中，3769 家公司捐獻金額在 50 萬元以下，只有 393 家公司捐超過 50 萬元。
      </div>
      <div class="section-content-story__paragraph">
        而每家公司同年度針對單一候選人的捐獻上限是 100 萬，對多位候選人的捐獻上限是 200 萬，中正大學政治系副教授陳尚志就提到，「如果要做公關的話，多位候選人，一個人頂多 20 萬。針對個人捐超過 50 萬、或是捐到滿（100萬），就可以特別關注。」
      </div>
      <div class="section-content-story__paragraph">
        參選人可以在投票日的前十個月開始收政治獻金。但捐獻人的額度是以「年度」計算，假設企業想要捐好捐滿，以 2016 年立委選舉在 1 月投票為例，企業可以選擇在 2015 年尾、 2016 年初各捐一次，就能對同一位候選人捐到 200 萬，如立委柯建銘、吳秉叡都有收到這類跨年度的捐款。
      </div>
      <div class="section-content-story__paragraph">
        我們也在李宗榮的協助下，將這 5797 筆捐獻明細與與集團資料相對照
        <SectionContentStorysInfoboxHint :hint="'（註）'">
          <div>
            關於集團資料是透過李宗榮協助比對幾個企業資料庫，佐以人工查證方式增補。若有遺漏，歡迎來信或留言補充。另集團與子公司的關聯狀態是以捐獻時為主，故 2016 年之後退出或加入（集團）的關係都不採計。
          </div>
        </SectionContentStorysInfoboxHint>
        ，發現隸屬於 254 個集團的 432 家公司，掌握了 40％ 的營利事業政治獻金，第一名是徐旭東的遠東集團，共捐了 5 千 400 萬，是第二名裕隆集團的 1.6 倍。
      </div>
      <!-- chart3-2 here -->
      <div class="visualization">
        <h2 class="visualization__title">哪些集團／公司最支持立委？</h2>
        <div class="chart-container">
          <ScatterOrdinalCorpDonates
            class="chart-container__chart"
            id="chart3-2"
            :ordinal="'ninth'"
            :howManyNodes="20"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        從捐獻前二十名的企業名單可以發現另一個特色。這 21 個集團中，有 15 個（遠東、裕隆、台泥、潤泰、味丹、仰德、力麗、金鼎證券、日月光、大慶、所羅門、國產實業、宏泰、冠德、中纖）屬於家族集團
        <SectionContentStorysInfoboxHint :hint="'（註）'">
          <div>
            家族企業定義為董事互為親屬關係；而集團中，有上市公司是家族企業，就把集團歸納為家族集團。
          </div>
        </SectionContentStorysInfoboxHint>
        ，比例高達 71% 。
      </div>
      <div class="section-content-story__paragraph">
        李宗榮提到，「家族企業為了要傳承，就會很積極地去累積各式各樣的政商關係，除了打通人脈，鞏固家族的所有權，也讓外部有一些資源。加上家族企業本身就很會累積社會關係、政商關係，尤其關係的累積需要長時間的，又可以傳承給下一代。」
      </div>
      <div class="section-content-story__paragraph">
        若跟李宗榮以 2008 年立委政治獻金做的<a class="section-content-story__link" href="https://www.academia.edu/27129103/%E4%BC%81%E6%A5%AD%E6%AC%8A%E5%8A%9B%E8%88%87%E6%B0%91%E4%B8%BB_%E5%8F%B0%E7%81%A3%E4%BC%81%E6%A5%AD%E9%9B%86%E5%9C%982008%E5%B9%B4%E7%AB%8B%E5%A7%94%E9%81%B8%E8%88%89%E7%9A%84%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E5%88%86%E6%9E%90" target="_blank">研究</a>對照，集團的捐款都有提高，如遠東集團增加了 1 千 400 萬、裕隆集團增加了 1 千 654 萬；另外則有些集團從排行榜上「退位」， 2008 年能排進前 30 名的遠雄、中國信託、台塑、威京、耐斯、寶來、太子汽車、統一等集團， 在 2016 年選舉的捐獻都不若以往。
      </div>
      <div class="section-content-story__paragraph">
        雖然無法得知集團捐獻排行變化的確切原因，李宗榮則提供一個解讀的方向，「或許是時代有點不太一樣了。」
      </div>
      <div class="section-content-story__paragraph">
        「現在台灣自由化程度高，該讓給財團的也都讓了，政治權力對經濟利益的影響小了很多。所以對很多大財團來說，政治獻金不那麼重要了，才造成他們沒有那麼積極。」李宗榮指出，「經歷過需要政商關係才能發展的那個世代漸漸退位，讓位給下一代，新一代不一定吃這一套。以前是你不跟政治打交道，政治也要跟你打交道，政治介入是必須的。但現在有點不太一樣了。」
      </div>
      <div class="section-content-story__paragraph">
        那哪些產業會需要跟政治打交道？李宗榮指出，「會嘗試去影響政治的人，都是企業受到政府很強的管制，如美國，國防企業、水電、電網、瓦斯、石化工業等，利益多寡都受政府掌控，它需要疏通，對影響政治就有比較高的誘因。」
      </div>
      <div class="section-content-story__paragraph">
        「以台灣為例，早期金控的捐款很高，因為金融產業高度受國家管制；又或者像水泥，一個法律的規範就可以影響它的特許這麼久。若產業受到的影響大多來自國家政策的改變時，就會相對積極。」李宗榮提到。
      </div>
      <div class="section-content-story__paragraph">
        他也指出，「電子業相較於其他產業，就特別不愛參與政治獻金。因為產業的競爭受到全球環境、市場的左右，不太需要國內政府的配合。」我們以「母公司」的產業為單位，統計了這些捐獻政治獻金的企業分屬哪些產業：
      </div>
      <!-- chart3-3 here -->
      <div class="visualization">
        <h2 class="visualization__title">佛心產業前十名</h2>
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
        從表中可以看見，的確有很多容易受到政府政策影響的產業上榜。但從第一名是「其他」、第二名是李宗榮提過不太參與政治獻金遊戲的「電子工業」，我們推測「公司母數」應該有很大的影響，也就是說，或許在台灣的產業分布裡，這些公司的數量本來就比較多。
      </div>
      <div class="section-content-story__paragraph">
        我們進一步地分析這些樂於捐獻的公司佔其產業的比例，得到這樣的結果：
      </div>
      <!-- chart3-4 here -->
      <div class="visualization">
        <h2 class="visualization__title">哪些產業與政治人物互動性較高？</h2>
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
        2016 年 5 月時，《經濟學人》（The Economist）發布了最新的「裙帶資本主義指數」（Crony Capitalism）<a class="section-content-story__link" href="https://www.economist.com/international/2016/05/07/the-party-winds-down" target="_blank">報告</a>，用以統計各國的億萬富豪在與政府往來密切的行業中，所獲取的財富佔 GDP 的比例。在 22 個國家中，台灣以 3.2% 排名第 10 名，高於亞洲的日本、韓國、甚至中國。
      </div>
      <div class="section-content-story__paragraph">
        指數愈高，就代表在這個國家裡有愈多的企業，商業的成功與否取決於政商關係的密切度，而這些優惠與偏袒都是合法的。他們通常會以壟斷或遊說等手段，讓政府運用行政權力，提供較好的生存環境與利益。簡單來說，就是「靠關係」賺錢。
      </div>
      <div class="section-content-story__paragraph">
        我們找出《經濟學人》用以評估裙帶資本主義的<a class="section-content-story__link" href="https://www.economist.com/graphic-detail/2016/05/05/comparing-crony-capitalism-around-the-world" target="_blank">產業</a>，有賭場、國防、信貸投資銀行、基礎設施、管線、油、瓦斯等能源業、房地產、建設業、鋼鐵、金屬、礦石等等。從這次的資料中發現，最樂於捐獻的產業前十名中，就有 6 個屬於裙帶資本主義產業。
      </div>
      <div class="section-content-story__paragraph">
        因為政商之間的關係本來就敏感，各國對於是否允許營利事業捐款有不同的規定。根據內政部委託之<a class="section-content-story__link" href="http://ir.lib.pccu.edu.tw/retrieve/46392/RRPG10105-0231-2751535.pdf" target="_blank">《我國政治獻金制度改革之研究》</a>研究中就提到，美國、韓國、加拿大、法國的企業不能捐贈政治獻金，日本的企業也只能捐給政黨（不能給個人）。
      </div>
      <div class="section-content-story__paragraph">
        計畫主持人楊泰順最後也在文中寫道，「由於禁止公司與工會捐款已漸成各先進民主國家的趨勢，其原則仍然值得我國借鏡，尤其營利事業的捐款上限為個人的十倍，研究團隊主張以較嚴苛的標準審視公司與工會的捐款。 」
      </div>
      <div class="section-content-story__paragraph">
        「但企業透過錢去影響政治，這個趨勢是很難去阻擋的。完全禁止，就有辦法杜絕官商勾結嗎？我覺得很難，因為它可以用別的方法去捐獻。」李宗榮表示，「關鍵應該是我們要多大程度讓它變得透明。」
      </div>
      <div class="section-content-story__paragraph">
        台灣在 2004 年制定《政治獻金法》，規定政治人物必須申報選舉時的政治獻金，政商關係就跟著透明了嗎？還有哪些是陽光照不到的地方？請鎖定我們的後續報導喔，歡迎訂閱最新進度！
      </div>
    </article>
    <article v-if="slug === 'story4'">
      <h1 class="section-content-story__title">政治獻金開放了嗎？</h1>
      <SectionContentCredits :publishedDate="'2017/11/16'"/>
      <div class="section-content-story__paragraph">
        「（政治獻金資料）完全不算公開啊。資料的價值是在能被使用，而不是在紙上被人家看。」 2014 年 g0v <a class="section-content-story__link" href="https://g0v.hackpad.tw/8ow2GnliH48" target="_blank">政治獻金透明化專案</a>共同發起人王向榮
        <SectionContentStorysInfoboxHint :hint="'（註）'">
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
        <SectionContentStorysInfoboxHint :hint="'（註）'">
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
        從立委的政治獻金<router-link class="section-content-story__link" to="/project/political-contribution/story2" v-scroll-to="'.section-content'">分析</router-link>可以看見，不但資源過度集中在現任立委上，現任立委與新科挑戰者的勝選率也相當懸殊。陳尚志以自己的選舉經驗為例，「錢真的太重要了」。
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
      <SectionContentCredits :publishedDate="'2018/xx/xx'"/>
      <div class="section-content-story__paragraph">
        去年做完第九屆立委政治獻金數位化之後，我們發現還有很多問題無法解答，浮現「要是有歷史資料能夠對照就好了」的念頭。我們藉由鄉民的幫助，完成了第七屆、第八屆立委營利事業捐贈的數位化。
      </div>
      <div class="section-content-story__paragraph">
        當然，這份資料還是無法百分之百呈現選舉期間的金流樣貌（但這牽涉到候選人自主申報與監察院是否主動調查），卻是這個議題重要的起點。我們發現了一些有趣的現象：
      </div>
      <h2 class="section-content-story__subtitle">大多數的集團捐贈的政黨傾向並非鐵板一塊</h2>
      <div class="visualization">
        <!-- <h2 class="visualization__title">哪些集團捐最多錢？捐藍還捐綠？</h2> -->
        <SectionContentExploreRadios class="visualization__radios"/>
        <div class="chart-container">
          <ScatterOrdinalCorpDonates
            class="chart-container__chart"
            id="chart5-1"
          />
        </div>
      </div>
      <div class="visualization">
        <!-- <h2 class="visualization__title">哪些集團三屆立委選舉都捐錢？政黨傾向變化？</h2> -->
        <SectionContentExploreRadios class="visualization__radios"/>
        <div class="chart-container">
          <ScatterOrdinalCorpDonates
            class="chart-container__chart"
            id="chart5-2"
            :filterCorp="CHART_DATA.GROUPS_TOP_TEN_DONATES_SEVENTH_EIGHTH_NINTH"
          />
        </div>
      </div>
      <div class="section-content-story__paragraph">
        從三屆都有捐的前十名的政黨傾向變化，發現只有少數企業是鐵板一塊，捐贈的候選人政黨光譜都大致從藍慢慢走向綠，有些企業在 2016 年的立委選舉時甚至藍綠翻盤。
      </div>
      <div class="section-content-story__paragraph">
        2008年時，捐獻金額在前十名的集團捐獻傾向幾乎都偏藍，只有態度變動很大的台灣基礎集團 38％偏綠（第八屆變成偏藍 72%）、以及潤泰集團80%偏綠跟其他集團有不同的答案。
      </div>
      <div class="section-content-story__paragraph">
        值得一提的是，潤泰集團在大多數集團慢慢往綠走的光譜中，做出了相反的決定。第八屆捐獻是 100% 捐綠的潤泰，第九屆只剩下 20%，有高達 68% 的捐款捐給國民黨候選人。
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
        <SectionContentStorysInfoboxHint :hint="'（註）'">
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
        <SectionContentStorysInfoboxHint :hint="'（註）'">
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
        你也有什麼好奇的問題嗎？歡迎從<router-link class="section-content-story__link" to="dashboard">圖表區</router-link>或是<a class="section-content-story__link" href="https://github.com/mirror-media/politicalcontribution" target="_blank">原始資料區</a>挖掘出更多與我們分享！
      </div>
    </article>
  </main>
</template>

<script>
import * as CHART_DATA from '../../charts/data'

import SectionContentCredits from './SectionContentCredits.vue'
import SectionContentStorysInfoboxHint from './SectionContentStorys/SectionContentStorysInfoboxHint.vue'

import SectionContentExploreRadios from '../sectionContent/SectionContentExplore/SectionContentExploreRadios.vue'
import BarHorizontalOrdinalCandidate from '../../charts/BarHorizontalOrdinalCandidate.vue'
import BarHorizontalOrdinalIndustryDonates from '../../charts/BarHorizontalOrdinalIndustryDonates.vue'
import BarHorizontalOrdinalIndustryParticipate from '../../charts/BarHorizontalOrdinalIndustryParticipate.vue'
import BarVerticalStackedOrdinalDonatesFrom from '../../charts/BarVerticalStackedOrdinalDonatesFrom.vue'
import BarHorizontalStackedOrdinalDonatesFrom from '../../charts/BarHorizontalStackedOrdinalDonatesFrom.vue'
import ScatterOrdinalCorpDonates from '../../charts/ScatterOrdinalCorpDonates.vue'
import TableDuel from '../../charts/TableDuel.vue'
import TableTopTen from '../../charts/TableTopTen.vue'
import ParallelOrdinalPartyDonatesFrom from '../../charts/ParallelOrdinalPartyDonatesFrom.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentCredits,
    SectionContentStorysInfoboxHint,
    SectionContentExploreRadios,
    BarHorizontalOrdinalCandidate,
    BarHorizontalOrdinalIndustryDonates,
    BarHorizontalOrdinalIndustryParticipate,
    BarVerticalStackedOrdinalDonatesFrom,
    BarHorizontalStackedOrdinalDonatesFrom,
    ScatterOrdinalCorpDonates,
    TableDuel,
    TableTopTen,
    ParallelOrdinalPartyDonatesFrom,
  },
  data () {
    return {
      CHART_DATA
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
    margin 10px 0
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
      width 60%
    &--wide
      width 100%

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


