<template>
  <div class="eastern-district">
    <EasternDistrictLanding class="eastern-district__landing"/>
    <article>
      <section class="section-image">
        <lazy-component
          :class="{ active: current === 1 || current === 2 }"
          class="image-fixed image-1"
        />
        <div class="content">
          <div>
            <h2>店主：「整條街越來越暗」</h2>
            <p>臺北「東區」在 1990 年代開始成為購物精華區，也是「時尚」、「潮流」、「精品」的同義詞。但近年來，隨著街上的招租的板變多，在精華地段開店的英國潮牌 Superdry、快時尚平價品牌 SPAO 和 Forever21 、藥妝店日藥本舖、美妝店莎莎……等知名品牌一間一間離開，「倒店潮」、「高租金」、「沒落」等詞彙成為東區的新印象。</p>
            <p>根據臺北市商業處的劃分，「東區」商圈範圍是由復興南路、敦化南路、仁愛路、市民大道所圍住的區域，包含忠孝東路四段、延吉街、大安路在內。實際走訪，主路上的大店舖撤出後，沒有新店舖進駐，取而代之的是深鎖的鐵門，或是在沒有裝潢的空間內設立的短期特賣會會場。</p>
            <p>「這裡是重災區！」當地光武里里長韓修和直指忠孝東路沿線、頂好名店城、敦化南路 190 巷、忠孝東路 101 巷的店舖的關店潮最為慘重：路長不到 300 公尺的敦化南路 190 巷就有 7 家店歇業，更短的忠孝東路 101 巷上更是連著好幾間店面鐵門深鎖，形成一塊塊像補丁般灰撲撲的風景。</p>
            <p>「現在空屋的現象，我覺得是種連鎖反應。」重災區中一位不願具名的店主表示，雖然商店開開關關，不一定馬上有新的店銜接，出現空屋很正常，「但 2017 年開始有不對勁的感覺，附近的店因為租不出去，開始轉型成夾娃娃機店。」</p>
            <p>這位店主提到身為老闆的顧慮，「當你想要投入這條街，看到整條街愈來愈暗，看著周遭鄰居的生意（不好），是會考慮一下的。」</p>
            <p>在 2013 年從師大夜市搬來東區開店的 C 女士，販售從韓國批貨的服飾和美妝，她的小店在一整排歇業的店舖中特別顯眼。生意清淡的下午，她指著對街大門深鎖的一整排店家説：「有些已經空了 3、4 年。」</p>
            <p>C 女士提到從前，路上的流動客很多，生意其實還算不錯。但隨著歇業的店舖不再有新店進駐，2016 年開始，人潮明顯變少。</p>
            <p>從店主、里長的說法可以看出「東區某些區域的狀況不太好」，但東區整體的「災情」如何？</p>
            <p>READr 從經濟部的商業登記資料當中看出，東區確實如「重災區」店主所感覺到的：「越來越暗」。截至 2019 年 2 月，東區做過商業登記變更的地址上，575 個地址是有開店的， 753 個地址的店是歇業狀態。東區商圈範圍內，登記的營業地址為空店的數量明顯比臺北市其他商圈來得高。</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="content">
          <div>
            <h2>租金降，店還是租不出去</h2>
            <p>東區的店舖租賃變化資料，印證了店主們的感受。比起其他商圈，東區的待租店面數量不但持續上漲，待租時間也變長了。</p>
            <lazy-component class="chart">
              <h3>近 3 年臺北商圈店面待租量變化</h3>
              <picture>
                <source media="(min-width: 768px)" srcset="/proj-assets/eastern-district/chart-01.jpg" />
                <img src="/proj-assets/eastern-district/chart-01-mobile.jpg" alt="近 3 年臺北商圈店面待租量變化">
              </picture>
              <p class="small">資料來源：屋比房屋比價平台</p>
              <div class="annotation">
                <p class="small">資料係以近 3 年 4 月底網路待租店面作為統計基礎</p>
              </div>
            </lazy-component>
            <p>根據綜合各家房屋出租業者物件的線上比價網站「屋比房屋比價平台」提供的資料，近 3 年來，東區有上百間待租店面，數量還在持續上升中，且這 3 年的待租店數就增加了 53%，是臺北市所有商圈中增幅最大的。</p>
            <lazy-component class="chart">
              <h3>東區商圈網路待租店面刊登時間變化</h3>
              <table class="chart-2">
                <tr>
                  <td colspan="2"></td>
                  <td>截至 <br>2017 年 <br class="br-mobile">4 月底</td>
                  <td>截至 <br>2018 年 <br class="br-mobile">4 月底</td>
                  <td>截止 <br>2019 年 <br class="br-mobile">4 月底</td>
                </tr>
                <tr>
                  <td rowspan="3">店面出租廣告上架累積時間</td>
                  <td>1 年以上</td>
                  <td>16%</td>
                  <td>26%</td>
                  <td>39%</td>
                </tr>
                <tr>
                  <td>半年至<br>1 年</td>
                  <td>18%</td>
                  <td>17%</td>
                  <td>13%</td>
                </tr>
                <tr>
                  <td>半年內</td>
                  <td>66%</td>
                  <td>57%</td>
                  <td>48%</td>
                </tr>
              </table>
              <p class="small">資料來源：屋比房屋比價平台</p>
            </lazy-component>
            <p>而東區店面「找到主人」的時間也愈來愈長，「以前一個禮拜沒租掉就不得了，現在要半年，這是多麽惡劣、危險的狀況。」擁有 20 多年房仲經驗的屋比房屋創辦人葉國華表示。</p>
            <p>「2004 到 2013 這幾年，東區是一位難求的，租客都要排隊。為了要搶，還半夜去看房。」葉國華憶起，當時一間 10 坪出頭的店面，一個月租金從 20 萬台幣漲到 50 萬台幣都還是炙手可熱。</p>
            <p>戴政源在東區商圈長大，家族兩代在大安路夜市賣鹹酥雞，目睹東區 20 年來的發展，他感嘆：「以前這裡的店面一空，馬上有人排隊進來，你（生意）做不做得起來，三個月見真章，我們叫『武場』。」</p>
            <p>「現在生意是一年比一年差。」實際感受到東區沒落的他提到，去年到今年是最慘的，營業額掉了五成。</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="content">
          <div>
            <h2>租金壓力逼走店主？</h2>
            <p>究竟是什麼原因導致東區沒落？「租金太高」幾乎已經成為既定輿論，除了老牌江浙菜館永福樓，火鍋店「大初 SHABU SHABU」也在 Facebook 上預告因為租金問題要結束營業。</p>
            <p>曾經在大安路夜市經營複合式餐飲店的老闆阿興，在接受採訪時直言：「房租真的太貴了！」</p>
            <p>阿興的店在 2017 年開業，2018 年初就決定結束營業。他的店大約 5 坪，一個月店租 7 萬 5 千元，他和其他兩名家庭成員共同經營，一整個月都沒有休假、沒發薪水給自己，「拚命賣，也只是剛好打平而已。」</p>
            <p>而賣鹹酥雞的戴政源也提到，他的攤位大約 5 坪，一個月店租要 6 萬台幣，每月要至少賣 30 萬才能賺錢，在人潮不如以往的情況下，租金對戴政源造成的壓力越來越大。</p>
            <p>只是，從數據來看，東區商圈的租金在過去 3 年間正在下跌，去年到今年更是降了 9.3%。比起臺北市其他熱門的商圈，降幅是最大的。</p>
            <lazy-component class="chart">
              <h3>近 3 年臺北商圈店面租金開價變化</h3>
              <picture>
                <source media="(min-width: 768px)" srcset="/proj-assets/eastern-district/chart-03.jpg" />
                <img src="/proj-assets/eastern-district/chart-03-mobile.jpg" alt="近 3 年臺北商圈店面租金開價變化">
              </picture>
              <p class="small">資料來源：屋比房屋比價平台</p>
              <div class="annotation">
                <p class="small">我們嘗試用內政部公佈的「不動產實價登錄」來檢視東區與臺北市主要商圈的歷年租金變化，但實價登錄只有透過仲介出租的才需要登錄，臺北市的店面租金資料自 2012 年至 2019 年初僅載有 4000 多筆，在物件不夠完整的情況下，會有極端值的產生，且登錄是以「區段門牌」而非實際地址為單位，無法呈現店面在實際地址上的租金。因此沒有使用此份資料。</p>
              </div>
            </lazy-component>
            <p>里長韓修和指出，租金下調可能與「二房東退場、大房東回流」有關。在東區景氣正旺時，有一些「集團化」的二房東循著商機進入東區，大規模地向大房東租下店面再轉租。但隨著東區的景氣變化，租金也不再那麼「硬」了，韓修和舉光武里為例，「有一排店面去年收掉後，6 個月租不出去，後來二房東受不了撤場，大房東又回來降價租。」</p>
            <p>經營服飾店的 C 女士就是和大房東簽的約，租金漲幅一直維持在合理水平，「我覺得（東區的）房東不可能再漲價，尤其是這 3 年。能夠租出去，他（房東）就要偷笑了。」C 女士說。</p>
            <p>「我們這邊很多大房東都回流了。」韓修和補充。他也強調目前東區的生存危機不是房東樂見，里長就在房東、店主之間扮演溝通橋樑，畢竟，店面能租得出去最重要。</p>
            <p>雖然從屋比房屋比價平台提供的數據看出，東區的租金是全臺北市商圈近 3 年來降幅最大的，但實地採訪，仍能看見不同店家因個別因素而活在「高租金」的壓力之下。</p>
            <p>「房東很壞，租金都任人喊。看到你生意好，就漲價！」戴政源直言，這一帶的房子多是一年簽一次約，附近一間搬走的飲料店就是因為不堪漲租而搬走。</p>
            <p>離開東區的阿興提到，當初就是試圖跟二房東談價，看能不能降低租金，阿興知道二房東向大房東承租的價格大概是 3 萬 5，因此他認為應該有降價空間。他希望以 4、5 萬元的價格承租，遭到二房東以「划不來」為由拒絕。</p>
            <p>臺北市政府的「商圈振興計畫」提到，東區的房租近年雖然略為調降，但由於店面坪數面積較大，租金總價仍偏高，是一般業者較難踏入的高門檻。已經入場的東區店主，仍感受到原本起租價就高的租金所帶來的壓力，阿興收掉東區的攤位後，在木柵另覓新址，40 幾坪的店，月租只要 2 萬多，他說：「沒來東區開店不知道房租這麼硬，一開之後嚇一跳，打死不會再來了！」。</p>
            <p>除了轉租問題，資深房仲葉國華提到，許多東區房地產由少數大家族持有，第二代、第三代大房東可能已經移居海外，房東人不在當地，對於市場的敏感度不高，加上家族產權錯綜複雜，因此租金要漲要降，都需要很長的溝通時程。</p>
            <p>葉國華認為，影響租金的因素眾說紛紜，這是商圈頹敗的必經過程，不管是大房東還是二房東，市場一但沒落，無利可圖的人就走了，「有錢大家賺的時候都沒有問題，市場不好的時候大家才互相抱怨、交相指責。」他認為東區的房東和商家應該共同合作，才能解決問題。</p>
          </div>
        </div>
      </section>
      <section class="section-image">
        <lazy-component
          :class="{ active: current === 4 || current === 5 }"
          class="image-fixed image-2"
        />
        <div class="content">
          <div>
            <h2>「人潮減少」比租金更有殺傷力</h2>
            <p>無論是誰把持了東區的租金，店主們面臨的共同挑戰，還有愈來愈少的人潮。</p>
            <p>C 女士提到，過往東區人氣旺時，再貴的店還是能賺錢，高房租不是問題，但現在人少了，利潤少了，原本可負擔的房租就成了負荷。</p>
            <p>戴政源也同意人潮流失是問題的核心，房租、房東雖然也會影響經營，「但是只要今天人潮夠，哪怕你房租再多，一個月房租 20 萬我有本事還是可以做！」</p>
            <p>其實根據臺北市商業處統計，2018 年臺北市公司行號的銷售額比起前一年提升了近 6%，雖然金額成長仍需考慮物價漲幅、及過去為黑數的店家被輔導納入體系，但整體的商業活動並沒有明顯衰退的跡象，只是人們轉換了消費的方式和地點。</p>
            <p>近年來網路購物的興起對實體店面造成巨大挑戰。根據經濟部統計，電子購物的營業額，6 年來成長了 536 億，年平均成長率 7.4％，零售業年成長率卻只有 1.9%。</p>
            <p>若以商業登記抓出東區店家的輪廓，大致是以餐飲業及服飾業為主，佔了整體的近四成。再細看店家的歇業、開業統計，餐飲店家雖然關得快，但每年都有不少新的開業店家填補進來。而服飾業的歇業店舖數連年上升，新開業店家數卻愈來愈少。</p>
            <p>葉國華分析，現在主要的消費型態，不是在電商網購，就是在百貨城型態的購物場所進行體驗式消費，「街邊店的消費人潮已經完全被稀釋掉了。以街邊店為主的商圈，蕭條的情況會越來越嚴重。」</p>
            <p>街邊店沒落，加上人潮被其他商圈瓜分，更讓東區商業活動雪上加霜。</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="content">
          <dir>
            <h2>人潮錢潮都還在，但流向何方？</h2>
            <p>另一個影響人潮的因素，則是商圈轉移。臺北市的「商圈振興計畫」中以捷運出站人數來分析人潮的流動，2013 年後，忠孝復興、忠孝敦化出站人數呈下降趨勢；而西區的臺北車站、西門、中山站，東邊的信義商圈周邊市政府站、臺北 101 站等站點穩定上升，顯見人潮向西區及信義計畫區移動的趨勢。</p>
            <lazy-component class="chart">
              <h3>臺北市主要商圈捷運站旅運量</h3>
              <picture>
                <source media="(min-width: 768px)" srcset="/proj-assets/eastern-district/chart-04.jpg" />
                <img src="/proj-assets/eastern-district/chart-04-mobile.jpg" alt="臺北市主要商圈捷運站旅運量">
              </picture>
              <p class="small">單位：每年進出站人數</p>
              <p class="small">資料來源：臺北大眾捷運股份有限公司</p>
            </lazy-component>
            <p>根據臺北捷運公司統計，2014 至 2018 年間，捷運流量增加 2465 萬人，成長近一成。若以商圈劃分，在信義區商圈、西門町商圈、中山站南西商圈旅運量持續增長的壓縮下，東區商圈所在的忠孝復興站、忠孝敦化站人潮減少， 5 年來共減少 465 萬人。</p>
          </dir>
        </div>
      </section>
      <div class="eastern-district__box">
        <div
          :class="{ active: current >= 6, middle: current === 7, right: current >= 8 }"
          class="image-box"
        >
          <div class="image-box-container">
            <div class="image image-3"></div>
            <div class="image image-4"></div>
            <div class="image image-5"></div>
          </div>
        </div>
        <section class="section-image">
          <lazy-component
            :class="{ active: current === 6 }"
            class="image-fixed image-3 image-mobile"
          />
          <div class="content">
            <div>
              <h2>不是第一次：東西區風水輪流轉</h2>
              <p>1911 年，全臺第一家電影院「芳乃亭」在西門町開幕。戰後，西門町延續日治時期的繁華氣息，歌廳、舞廳、戲院林立，1961 年中華商場落成，西門町與城中區、臺北車站構成全臺北、也是全臺灣最熱鬧的商業娛樂中心。</p>
              <p>西區蓬勃發展，也帶來過度擁擠的問題，為了紓緩交通、開闢城郊，忠孝東路三段、四段在 1970 年代陸續完工，東區的開發隨之開始。</p>
              <p>1980 年代起，臺北的發展重心東移，東區統領百貨、忠孝東路四段的 SOGO 百貨陸續開幕。1990 年代的東區取代西區，成為臺北最時尚最繁華的商圈，盛極一時的西門町中華商場因設備老舊、來客稀少，在 1992 年被拆除。</p>
              <p>東區發展的同時，臺北市政府也著手開發信義區。信義計畫區在 1986 年完成土地重劃作業，之後陸續進行公私部門建築開發。以「臺北曼哈頓」為目標的信義區，在 1997 年起，陸續興建了百貨和影城，還有 2005 年落成的臺北 101 大樓，以及確立商業化、國際化的世貿展覽中心、世貿辦公大樓、國際會議中心、統一企業大樓等大型建設。</p>
              <p>2013 至 2018 年間，結合辦公大樓與商場的微風松高、微風信義、微風南山陸續落成，「精緻」、「名店」、「高級」的信義區商圈特色被進一步強化。信義區林立的高檔百貨，帶走了過往到東區尋找「高級感、精品感」的逛街人潮。</p>
              <p>沉寂一時的西門町，在 1999 年底捷運開通後，迎來復甦曙光。政府與商家聯手重新打造商圈，翻新老舊電影院、規劃出行人徒步區，興建旅館、舉辦活動等等。</p>
              <p>隨著觀光客來台人數上升，西門町強勢回歸，成為觀光客、年輕人聚集的熱點。2015 年開始，柯文哲市府團隊力推「西區門戶計畫」，從交通建設、古蹟修復、舉辦活動等多管齊下，活化「老城區」。臺北燈節自 2017 年開始移師至西門町舉辦，活動期間為西門、北門商圈帶來大量人潮。</p>
              <p>而東區身處潮流前線 30 年，和當年的西門町一樣，面臨轉型的節點。</p>
              <p>里長韓修和認為，淘汰老店、迎接新店，正是重要的轉型過程，「這邊撤出的餐飲業幾乎都是在地的、大型的、沒有轉型成功的店家。店內設備比較老舊沒有更新，吸引不到客人來。（東區）會慢慢走向精緻、高端的餐廳。」</p>
              <p>「我們其實一直在停留二、三十年前的樣子。」賣鹹酥雞的戴政源也反省東區老化的問題，「（東區）没有更好、没有往前走，我覺得陣痛期都有，怎麼去規劃，怎麼去改變，當然是透過政府。只要能賺錢，只要有人潮，我相信東區的商家都願意配合。」</p>
              <p>店家的冀望落到了政府身上。</p>
            </div>
          </div>
        </section>
        <section class="section-image">
          <lazy-component
            :class="{ active: current === 7 }"
            class="image-fixed image-4 image-mobile"
          />
          <div class="content content-spec">
            <div>
              <h2>西門町成功翻轉，東區可能嗎？</h2>
              <p>「以前人潮好的時候，大家顧自己賺錢，別人怎樣我不管，現在不一樣了。」戴政源與東區的 50 多個房東、店家、企業，在韓修和的統籌下，成立「忠孝復興頂好商圈發展協會」。希望透過自救會和政府的輔導，如舉辦大型活動、改善老舊街道的照明、規劃人車分道等方式，吸引人潮回流。</p>
              <p>臺北市政府則在今年 4 月初，啟動府級的「忠孝東區振興計畫」 ，整合相關單位，就環境硬體面及行銷軟體面等進行改善及輔導。</p>
              <p>西門町就是一個起死回生的例子。西門徒步區街區發展促進會理事長劉家鑫提到，約莫 12 年前，西門町武昌街有幾間店開始歇業，他擔心會引起連鎖反應，「我就趕快跟房東說要快點降價，要不然一直關，（整條街）暗掉了，到時候沒有人要租。」</p>
              <p>劉家鑫自信地說，「西門町食衣住行育樂樣樣不缺，你可以想像成是一個露天的 mall （購物中心）。」整治成徒步區的街道、電影院、特色平價旅店多、常舉辦大型活動，都是吸引人潮的原因。</p>
              <p>這些「改造」，同樣出現在在臺北市政府對東區商圈的振興計畫中。包括徒步區規劃、多元招商、舉辦大型活動，市長柯文哲甚至承諾將在東區「無預算上限」地改善鄰里交通改善。</p>
              <p>面對東區存亡轉型關頭，店主們對於如何生存也有獨特的作法。</p>
            </div>
          </div>
        </section>
        <section class="section-image">
          <lazy-component
            :class="{ active: current === 8 }"
            class="image-fixed image-5 image-mobile"
          />
          <div class="content content-spec">
            <div>
              <h2>東區店主的求生之道</h2>
              <p>「老實說，這個時候沒有人敢進來開店，但我們評估過不會虧。」今年 5 月，賴冠宇位在東區延吉街的咖啡館開幕，他在懸掛完店外的促銷橫幅後，進到新裝潢好的店裡接受採訪。</p>
              <p>「景氣再好都會有人虧錢，景氣再差都有人賺到錢，只是看你有沒有把客戶的需求滿足而已。」賴冠宇說。在餐飲業打滾近十年，這是他開的第一家店。</p>
              <p>他觀察過東區，除了賣鬆餅甜點的咖啡廳外，還沒有以精品咖啡為主打的咖啡館。而在這條巷子裡，雖然有酒吧，但他引進了這條街上還沒有人賣的啤酒品牌。他賣的氣泡飲、手搖飲料也和主路上的連鎖手搖飲料店做出區隔。</p>
              <p>大約 8 坪的咖啡店位於髮廊的角落，一個月租金大約 7 萬。髮廊業者想利用原本放髮品的展示空間經營服務業，就以 8 折的租金找來賴冠宇開店。賴冠宇也樂於利用這間專做藝人、網紅的髮廊帶來的明星效應，讓髮廊客人在網路上幫他宣傳。</p>
              <p>戴政源在兩年前接手主導鹹酥雞店後，改良攤位的外觀和生產模式，「全都是比照餐廳的規格，給客人乾淨、明亮的第一印象。」</p>
              <p>經營服飾業的 C 女士則堅持做出自己的特色，與顧客成為 Facebook 好友，用一對一的互動留住死忠客人，「要是我不夠認識你，也不知道怎麼推薦適合你的衣服。」</p>
              <p>C 女士也提到，當她聽到「東區沒落」的說法，其實覺得很心痛。她說：「我們希望好好做生意，不希望這邊被外界講得這麼慘。我不會怪這條路上怎麼倒了這麼多店，反而希望大家都能撐得住，不會因為別人撐不住，就覺得好高興，別人終於倒了。」</p>
            </div>
          </div>
        </section>
      </div>
      <section class="section">
        <div class="content">
          <div>
            <h2>冬天來了，春天還會遠嗎？</h2>
            <p>屋比的葉國華以 20 多年房仲經驗認定，東區應該很難在短期內復興，「在舊有的模式行不通、新的特色尚未建立起來的狀況下，應該會沉寂個五到十年。」但里長韓修和卻抱持樂觀態度，預測東區若積極轉型，一年就可以開始復甦。</p>
            <p>「現在東區已經到谷底，不會更慘了。」韓修和表示，他們對新的東區商圈定位是「人文品味商圈」，在東區不同區段主打精緻餐飲、異國料理、服飾精品、並邀請新創公司進駐辦公。他認為東區的精神是「巷弄文化」，因此目前暫不考慮引進新的大型百貨公司與信義區百貨強碰。客群鎖定中產階級，要與年輕人的西門町、高端精品的信義區做出區隔。</p>
            <p>東區能否借鏡西門町「重生」的案例，在沒落寒冬中尋找到通往春天的路？還有賴政府、在地的商家與房東共同努力。</p>
          </div>
        </div>
      </section>
      <section class="section credit">
        <p class="small">2019. 06 READr</p>
        <p class="small"><span>文字／劉子維</span><span>攝影／李昭妟</span></p>
        <p class="small">資料整理／劉子維、簡信昌</p>
        <p class="small"><span>設計／Weiwei Hsu</span><span>工程／HY Tan</span></p>
      </section>
    </article>
  </div>
</template>
<script>
import EasternDistrictLanding from './EasternDistrictLanding.vue'
import { throttle } from 'lodash'

export default {
  name: 'EasternDistrict',
  components: {
    EasternDistrictLanding
  },
  metaInfo() {
    return {
      title: '東區沒落：不只是租金問題',
      description: '近年來，東區的光鮮亮麗逐漸被「名店出走」、「老店歇業」的新聞取代。READr 從數據發現，東區的沒落除了高額租金，還有這些問題……',
      metaUrl: 'eastern-district-of-taipei',
      metaImage: 'eastern-district/og.jpg',
    }
  },
  data () {
    return {
      current: 0
    }
  },
  mounted () {
    this.detectCurrent()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.detectCurrent)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.detectCurrent)
  },
  methods: {
    detectCurrent () {
      const sections = [ ...document.querySelectorAll('section') ]
      sections.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        if (rect.top <= viewportHeight && rect.bottom >= viewportHeight) {
          return this.current = index
        }
      })
    },
    handleScroll: throttle(function () {
      this.detectCurrent()
    }, 300)
  }
}
</script>
<style lang="stylus" scoped>
.eastern-district
  color #fff
  font-size 1rem
  // background-color #000
  div
    & + p
      margin-top 1.5em
  h2, h3, p
    margin 0
  h2
    font-size 1.875rem
    line-height normal
    & + p
      margin-top 1.5em
  h3
    font-size 1.5rem
    & + picture, & + table
      margin-top 1.5rem
  p
    text-align justify
    line-height 2
    & + p
      margin-top 1.5em
    & + div
      margin-top 1.5em
    &.small
      color #9b9b9b
      font-size .875rem
      line-height 1.7
  a
    color #8dbade
  picture
    display block
  .content
    padding 1.5em 0
    background-color #000
    > *
      width 90%
      margin-left auto
      margin-right auto
      padding 0
  .chart
    img
      width 100%
    p
      & + p, & + .annotation
        margin-top .5em
  .image-box
    display none
  .credit
    padding 100px 0
    background-color #000
    p
      color #fff
      text-align center
      & + p
        margin-top .5em
    span
      & + span
        margin-left 1em
  .image
    &-fixed
      position relative
      width 100%
      height 100vh
      &::before
        content ''
        position fixed
        top 0
        left 0
        z-index -1
        width 100%
        height 100%
        background-position center right
        background-size cover
        background-repeat no-repeat
        visibility hidden
      &.active
        &::before
          visibility visible
      &.image-1
        &::before
          background-image url(/proj-assets/eastern-district/img-01.jpg)
      &.image-2
        &::before
          background-image url(/proj-assets/eastern-district/img-02.jpg)
      &.image-3
        &::before
          background-image url(/proj-assets/eastern-district/img-03.jpg)
      &.image-4
        &::before
          background-image url(/proj-assets/eastern-district/img-04.jpg)
      &.image-5
        &::before
          background-image url(/proj-assets/eastern-district/img-05.jpg)

  table
    width 100%
    color #e6e6e6
    font-size .875rem
    border-collapse collapse
    tr:first-child
      color #ccc
      line-height 1.3
    tr:not(:first-child)
      height 70px
    tr:nth-child(2)
      td:not(:first-child)
        color #fdd31f
        font-weight bold
        background-color #171717
    tr:nth-child(2), tr:nth-child(3)
      td:first-child
        color #ccc
    td
      padding .5em .2em
      text-align center
    td[rowspan]
      width 30px
      padding .5em
      color #ccc
      background-color #252e33

@media (min-width: 375px)
  .eastern-district
    table
      tr:nth-child(2)
        td:nth-child(3), td:nth-child(4), td:nth-child(5)
          font-size 1rem
      tr:nth-child(3), tr:nth-child(4)
        td:nth-child(2), td:nth-child(3), td:nth-child(4)
          font-size 1rem

@media (min-width: 768px)
  .eastern-district
    .content
      padding 3em 0
      > *
        width 60%

@media (min-width: 1200px)
  .eastern-district
    article
      section
        position relative
        z-index 10
        & + section
          margin-top 0
    &__landing
      position relative
      z-index 11
    &__box
      padding-top 100vh
    .section
      z-index 11
      background-color #000
      &-image
        background-color transparent
        .content
          position relative
          top 0
          left 0
          z-index 1
          width auto
          padding 0
          background-color transparent
          > div
            width 67%
            max-width none
            margin 0
            padding 70px 5% 70px 15%
            background-color rgba(26, 26, 26, 0.9)
            > *
              max-width 600px
              margin-left auto
              margin-right auto
          &-spec
            padding-top 0
    .content
      width 67%
      margin 0
      padding 70px 5% 70px 15%
      background-color #000
      > *
        width auto
      > div
        max-width 600px
        margin-left auto
        margin-right auto
    .chart
      position relative
    .annotation
      position: absolute;
      left calc(100% + 5vw)
      bottom 0
      width 260px
      p.small
        color #fff
    .image-box
      position fixed
      top 0
      left 0
      width 100%
      height 100vh
      overflow hidden
      &.active
        display block
      &.middle
        .image-box-container
          transform translateX(-33.33%)
      &.right
        .image-box-container
          transform translateX(-66.66%)
      &-container
        display flex
        width 300%
        height 100%
        transform translateX(0)
        transition transform 1s ease-in
        .image
          flex 1
          position static
          width auto
          height auto
          background-position center center
          background-size cover
          background-repeat no-repeat
          &.image-3
            background-image url(/proj-assets/eastern-district/img-03.jpg)
          &.image-4
            background-image url(/proj-assets/eastern-district/img-04.jpg)
          &.image-5
            background-image url(/proj-assets/eastern-district/img-05.jpg)
    .image-mobile
      display none
    .br-mobile
      display none
</style>
