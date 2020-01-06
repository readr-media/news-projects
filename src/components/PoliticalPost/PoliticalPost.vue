<template>
  <div class="political-post">
    <div class="background">
      <div class="container">
        <div class="project-header">
          <div class="corner top left" />
          <div class="corner top right" />
          <div class="wrapper">
            <div class="people" />
            <h2>Facebook <span style="display:inline-block;">政治廣告收集者</span></h2>
            <h3>政治廣告客戶如何鎖定你</h3>
            <div class="people mobile" />
            <p>Facebook 因應臺灣總統選舉，要求所有「政治性廣告」揭露廣告對象及金額，<br>來看看哪些人的廣告鎖定的是你！</p>
          </div>
          <div class="focus" />
          <div class="corner bottom left" />
          <div class="corner bottom right" />
        </div>
      </div>
      <div class="container inner">
        <div class="criteria">
          <div class="title">
            <h2>我會看到什麼廣告？</h2>
          </div>
          <div class="filter">
            <div class="line">
              住在
              <span class="select-wrapper select-area">
                <select
                  v-model="filter.area"
                  name="area"
                >
                  <option
                    v-for="(item, index) in areaList"
                    :key="`area-${index}`"
                    :value="index"
                  >{{ item['name'] }}</option>
                </select>
                <span class="holder">{{ areaList[filter.area].name }}</span>
              </span>
              ，
            </div>
            <div class="line">
              <input
                v-model="filter.age"
                type="number"
                name="age"
                value="36"
              >
              歲的
              <span class="select-wrapper select-gender">
                <select
                  v-model="filter.gender"
                  name="gender"
                >
                  <option
                    v-for="(item, index) in genderList"
                    :key="`gender-${index}`"
                    :value="index"
                  >{{ item['name'] }}</option>
                </select>
                <span class="holder">{{ genderList[filter.gender].name }}</span>
              </span>
              。
            </div>
          </div>
          <div
            class="no-result"
            :class="{active: isEmpty}"
          >
            沒有以你的條件為觸及目標的政治廣告
          </div>
        </div>

        <div class="candidate">
          <div class="title">
            <h2>你也可以看看：</h2>
          </div>
          <div class="people">
            <div
              class="person"
              @click="setFilter('Taichung', 37, 'male')"
            >
              <div class="wrapper">
                <div class="avatar a" />
                <div class="desc">
                  <span>臺中市</span>  37 歲男性
                </div>
              </div>
            </div>
            <div
              class="person"
              @click="setFilter('Yunlin', 20, 'male')"
            >
              <div class="wrapper">
                <div class="avatar b" />
                <div class="desc">
                  <span>雲林縣</span>  20 歲男性
                </div>
              </div>
            </div>
            <div
              class="person"
              @click="setFilter('Hsinchu City', 52, 'female')"
            >
              <div class="wrapper">
                <div class="avatar c" />
                <div class="desc">
                  <span>新竹市</span>  52 歲女性
                </div>
              </div>
            </div>
            <div
              class="person"
              @click="setFilter('Taipei', 28, 'female')"
            >
              <div class="wrapper">
                <div class="avatar d" />
                <div class="desc">
                  <span>臺北市</span>  28 歲女性
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="background-shadow"
      :class="{hide: filteredData.length === 0}"
    >
      <div class="container inner">
        <div class="navigation">
          <div
            class="prev"
            :class="[((paging.page - 1) < 1) && 'disable']"
            @click="goPrev"
          />
          <div class="paging">
            <div
              v-for="(item, index) in pages"
              :key="`pages-${index}`"
              class="page"
              :class="{active: paging.page === item}"
              @click="setPage(item)"
            >
              {{ item }}
            </div>
          </div>
          <div
            class="next"
            :class="[hideNext && 'disable']"
            @click="goNext"
          />
        </div>

        <NoSSR>
          <masonry
            class="content"
            :cols="{default: 3, 960: 1}"
            :gutter="10"
          >
            <div
              v-for="(item, index) in paginatedData"
              :key="index"
              class="item"
            >
              <div class="title">
                {{ item['參選人'] }}
              </div>
              <div class="category">
                廣告
              </div>
              <div class="inner-text">
                <ReadMore
                  :text="item['廣告內容']"
                  @toggled="toggledReadmore"
                />
              </div>
              <div class="image">
                <img :src="item['圖片']">
              </div>
            </div>
          </masonry>
        </NoSSR>
        <div class="navigation">
          <div
            class="prev"
            :class="[((paging.page - 1) < 1) && 'disable']"
            @click="goPrev"
          />
          <div class="paging">
            <div
              v-for="(item, index) in pages"
              :key="`pages-${index}`"
              class="page"
              :class="{active: paging.page === item}"
              @click="setPage(item)"
            >
              {{ item }}
            </div>
          </div>
          <div
            class="next"
            :class="[hideNext && 'disable']"
            @click="goNext"
          />
        </div>
      </div>
    </div>
    <div class="background">
      <div class="article">
        <p>Facebook 於去年 8 月在台灣開放了<a href="https://www.facebook.com/ads/library/?active_status=all&amp;ad_type=all&amp;country=TW&amp;impression_search_field=has_impressions_lifetime">廣告檔案庫</a>功能，收錄並公開所有使用者在臉書上的廣告，之後更主動要求「政治性廣告」揭露廣告投放對象和金額。READr 與 g0v 零時政府社群參與者王向榮合作，取得去年 10 月開始的 <a href="https://github.com/ronnywang/fb-ad-lib">Facebook 廣告檔案庫資料</a>（註），並進一步分析 2020 年立委候選人官方粉絲頁的投放對象，從 4197 筆資料中，發現「中年」、「男性」是這次大選的主要投放對象。</p>
        <p>而花最多錢在臉書廣告的是民主進步黨，無論政黨、候選人粉絲專頁都奪冠；中國國民黨則只有候選人有下廣告，專家推測應該跟支持者的年齡層有關。</p>
        <h2>廣告受眾以中年人為主、男多於女</h2>
        <p>根據廣告的「曝光次數」（註）、「廣告顯示對象的年齡與性別」、「廣告的刊登地點」等資料，我們發現，有投放政治廣告的臺灣立委參選人是以 35 歲到 65 歲為主要投放年齡層。若再加上性別因素，對象設定都是男性多於女性，尤其是 35 歲到 44 歲、45 歲到 54 歲兩個年齡組，投放男性的比例比女性高出 11%。</p>
        <p>根據 Facebook 的「<a href="https://www.facebook.com/ads/audience-insights">廣告受眾洞察報告</a>」可以發現，中年男性使用者對政治議題高度關注，或許正是被候選人們鎖定的原因。20 歲以上有投票權的臺灣活躍用戶中，男性佔 49%，女性佔 51%。以 35 歲到 65 歲男性為檢視條件，每月活躍人數前 10 名的粉絲專頁，有 7 個是政治人物；反觀 35 歲到 65 歲女性，活躍人數前 10 名的粉絲專頁，是料理、親子、健康、團購網購⋯⋯等等，完全沒有政治人物粉絲專頁，擴大到前 20 名，也只有最近成為親民黨發言人的名節目主持人于美人。</p>
        <h2>誰「主攻女性市場」？</h2>
        <p>雖然從 Facebook 的廣告受眾報告中看來，女性普遍對政治沒興趣，卻也有候選人掌握自己的「女性優勢」。如外型引人注目的臺北市第三選區民進黨候選人吳怡農，他的女性支持者甚至以「農婦」自稱，在網路上具有一定的聲量。而吳怡農的確是唯二位廣告顯示比例女大於男的候選人（多出 9%），但他不是「主攻女性市場」的第一名。</p>
        <p>第一名是力拚連任的新北市第八選區民進黨立委江永昌，廣告投放女性的比例比男性高出 50%。江永昌現年 50 歲，形象清新，在當地頗受好評，廣告內容為很常見的政見、政績宣傳，比較直接貼近女性選民的是公共幼兒園政策，以及宣傳選區內的親子活動。READr 嘗試聯絡江永昌團隊，想知道為何廣告主打女性，但至截稿前未獲回應。</p>
        <h2>也有人以「選區外」的人為廣告受眾</h2>
        <p>以投放地區來看，大多數的候選人都將廣告顯示對象設定為自己選區的選民，但還是有候選人將投放對象「擴散」到選區之外，最常見的是鄰近通勤縣市（例如彰化的候選人在臺中、雲林也會投放），或是六都、新竹等都會區。</p>
        <iframe
          src="https://public.flourish.studio/visualisation/1187690/embed"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a
            class="flourish-credit"
            href="https://public.flourish.studio/visualisation/1187690/?utm_source=embed&utm_campaign=visualisation/1187690"
            target="_top"
            style="text-decoration:none!important"
          ><img
            alt="Made with Flourish"
            src="https://public.flourish.studio/resources/made_with_flourish.svg"
            style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"
          > </a>
        </div>
        <p>但也有一些特例，從 2004 年連任至今的臺北市國民黨籍立委賴士葆，投放地點除了投六都之外，可說是遍佈全臺。分析他的廣告內容，賴士葆批評蔡英文施政的內容較其他主打自己政績、政見的候選人來得多。</p>
        <p>挑戰藍營鐵票區馬祖（連江縣選舉區）的民進黨候選人李問，現年 30 歲，透過活潑的影片，在網路上累積不少粉絲，他的臉書廣告投放地點以臺北、桃園、新北為主，連江縣的數據少到幾乎為 0。推測可能是連江縣使用網路的人口少，且地方小，跑基層的成本較低，加上馬祖人口外流，李問的廣告可能想觸及外漂的馬祖人，或累積全國知名度，不僅限於這次立委選舉。</p>
        <h2>沒看過政治廣告的我，難道是邊緣人？</h2>
        <p>「可是我從來沒在 Facebook 上看過政治廣告！」根據資料顯示，只有 36% 的立委候選人在 Facebook 上投放政治廣告，投放的區域以北部、都會區較多。內華達大學拉斯維加斯分校政治系助理教授王宏恩認為，36% 並不算高，臺灣 2012 年就有超過七成的候選人使用 Facebook，現在應該超過九成。</p>
        <p>還有 64% 的候選人沒有加入 Facebook 上的政治廣告戰場，包括：在新北市爭取連任的民進黨籍立委前歌手余天；網路聲量可觀，對手為知名前立委顏清標之子顏寬恒的臺灣基進發言人陳柏惟；2018 年代表國民黨參選桃園市長的陳學聖；南下參選臺南市立委、有超過 40 萬人追蹤的「柱柱姐」洪秀柱；深耕地方多年欲爭取連任的民進黨立委王定宇（25 萬多人追蹤）等等，都沒有政治廣告投放紀錄。</p>
        <p>這些沒有在 Facebook 投放廣告的候選人，是因為對選情有信心嗎？其實不然。</p>
        <p>地方知情人士透露，曾任嘉義縣長的陳明文，「這次選得比之前都認真」，陳明文長期掌握地方派系，甚至在嘉義有「明進黨」、「明文規定」的説法。這次選舉，他遇上退黨的民進黨前立委林國慶挑戰，林國慶高喊「打破明文規定」的選舉口號，讓陳明文不敢掉以輕心。陳明文勤走基層，在各村莊開座談會，再小的村莊也會去拜訪。林國慶和陳明文激烈交鋒，兩人的 Facebook 廣告資料庫卻無聲無息。</p>
        <h2>他們真的沒有在臉書下廣告嗎？</h2>
        <p>這些「廣告檔案庫沒有紀錄」的候選人其實也很認真經營粉絲專頁，貼文內容多半是宣傳政績、介紹政策、回應政治時事，和那些申報為政治廣告的廣告內容大同小異。不同之處只在於，他們沒有花錢下廣告，因此只有追蹤的粉絲看得到這些貼文，不會像廣告一樣對目標客群強制曝光。</p>
        <p>「廣告檔案庫沒有紀錄」還有一種可能：廣告沒有被辨識成政治廣告，但其實內容就是政治廣告。</p>
        <p>目前已知 Facebook 判定「政治廣告」有三種機制：一是刊登者主動申報，二是被 Facebook 判定為政治廣告，這兩種情況下，廣告都會顯示「刊登時間」、「曝光次數」、「花費金額」、「廣告顯示對象的年齡與性別」、「廣告的刊登地點」以及「由誰出資」，還有一種是使用者可以檢舉看起來像卻未申報的政治廣告。</p>
        <p>例如國民黨高雄立委候選人黃昭順有一則宣傳推動長照政績的廣告未申報，但被 Facebook 判定為政治廣告，因此在廣告檔案庫裡留有金額紀錄。她另一則宣傳楠梓地區建設政績的廣告有申報，兩則貼文性質與內容都很相似（如下圖）。</p>
        <p>
          <img
            src="https://paper-attachments.dropbox.com/s_F41E0F7F5DC64D0035C005FAAF753024F45BADC9FAB7C5F1980FAD77E46B00AE_1578280703760_photoad.jpg"
            alt=""
          >
        </p>
        <h2>民進黨花最多錢，國民黨沒在臉書下廣告</h2>
        <p>以「政黨粉絲頁」為單位，可以發現民進黨是花最多錢在臉書投放政治廣告的政黨，花費金額約在 35.5 萬至 41.9 萬元之間；其次是綠黨，花費約在 18.1 萬到 22.4 萬元之間；而國民黨沒有在臉書下廣告的紀錄。</p>
        <iframe
          src="https://public.flourish.studio/visualisation/1189351/embed"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a
            class="flourish-credit"
            href="https://public.flourish.studio/visualisation/1189351/?utm_source=embed&utm_campaign=visualisation/1189351"
            target="_top"
            style="text-decoration:none!important"
          ><img
            alt="Made with Flourish"
            src="https://public.flourish.studio/resources/made_with_flourish.svg"
            style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"
          > </a>
        </div>
        <p>國民黨文傳會代理主委程美華表示「因為我們沒錢」，國民黨中央直屬的 Facebook 專頁只有「中國國民黨 KMT」和「吳敦義 Wu, Den-Yih」，兩個都沒有下廣告。</p>
        <p>但若以區域立委候選人所屬政黨為單位，民進黨籍候選人仍然居冠，第二名就是國民黨籍候選人。</p>
        <iframe
          src="https://public.flourish.studio/visualisation/1189540/embed"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a
            class="flourish-credit"
            href="https://public.flourish.studio/visualisation/1189540/?utm_source=embed&utm_campaign=visualisation/1189540"
            target="_top"
            style="text-decoration:none!important"
          ><img
            alt="Made with Flourish"
            src="https://public.flourish.studio/resources/made_with_flourish.svg"
            style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"
          > </a>
        </div>
        <p>程美華表示，國民黨區域立委下廣告的資金，多是向選民募款而來，國民黨中央沒有足夠經營網路社群的資金，也沒有民進黨那般充沛的人力。</p>
        <p>「我想，這跟有沒有錢比較沒有絕對的正相關。」有超過 20 年網路產業經驗，擅長網路行銷的網路觀察家林柏蒼分析，「選民結構」是重要的因素之一，國民黨的支持者年齡偏高，這些族群在 Facebook 上的活動不如 LINE 上活躍。單單分析 Facebook的政治廣告，無法得知政黨在「線上選戰」中活動的全貌。</p>
        <h2>哪些人刊最多？花最多？</h2>
        <p>資料顯示，刊登最多筆廣告的，是欲在雲林縣第二選區爭取連任的民進黨現任立委劉建國，超過 400 筆廣告，大幅超越第二名的民進黨新竹縣第二選區參選人周江杰。</p>
        <iframe
          src="https://public.flourish.studio/visualisation/1189607/embed"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a
            class="flourish-credit"
            href="https://public.flourish.studio/visualisation/1189607/?utm_source=embed&utm_campaign=visualisation/1189607"
            target="_top"
            style="text-decoration:none!important"
          ><img
            alt="Made with Flourish"
            src="https://public.flourish.studio/resources/made_with_flourish.svg"
            style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"
          > </a>
        </div>
        <p>劉建國刊登次數雖多，但設定的金額都是小額，因此花費金額（介於 3.1 萬至 7.1 萬元）比周江杰（22.3 萬至 27.9 萬元）少，比起累計金額最多的，民進黨新竹市選區的鄭宏輝（45 萬至 66.5 萬元，刊登 70 筆）更是小得多。劉建國競選團隊的工作人員回應，「刊登很多廣告，是想讓地方鄉親更認識劉委員」。</p>
        <iframe
          src="https://public.flourish.studio/visualisation/1189567/embed"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a
            class="flourish-credit"
            href="https://public.flourish.studio/visualisation/1189567/?utm_source=embed&utm_campaign=visualisation/1189567"
            target="_top"
            style="text-decoration:none!important"
          ><img
            alt="Made with Flourish"
            src="https://public.flourish.studio/resources/made_with_flourish.svg"
            style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"
          > </a>
        </div>
        <p>以刊登筆數和花費金額前十名排序，前三名皆為民進黨籍的候選人。國民黨花最多錢下廣告的，是初次參選，挑戰新北市第一選區的洪孟楷，花費的金額約在 17.2 萬到 21.9 萬之間。</p>
        <p>洪孟楷是老牌立委郭素春之子，算是國民黨的「新生代」。接受訪問時，對自己是國民黨籍立委中花最多錢下廣告的結果「有點驚訝」，他不便透露線上廣告佔選舉經費的多少比例，僅說資金來自於選民小額捐款。</p>
        <p>洪孟楷認為自己這次在實體宣傳和線上廣告的預算，在國民黨或民進黨可能都只排後段，「但可能是因為我比較有在注意到社群經營的重要性，社群經營可以精準地花小錢來接觸到我們想接觸到的民眾。」比起可能 30 秒就花幾十萬的電視廣告，Facebook 政治廣告「可以讓我在最後這兩個月好好衝刺，並且接觸到很多這個地區真實選民，我覺得相對來講是『小兵立大功』的作戰方式」。</p>
        <p>雖然沒有政黨和候選人明確回應 Facebook 政治廣告的支出佔總競選支出的比例，但從過往資料可以推估，Facebook 廣告佔比並不大。以此次花費金額第二名的臺中民進黨現任立委何欣純為例，Facebook 政治廣告花費在 24.4 萬到 45.3 萬元之間，對比她 <a href="https://vote.ly.g0v.tw/candidate/%E8%87%BA%E4%B8%AD%E5%B8%82%E7%AC%AC%E4%B8%83%E9%81%B8%E8%88%89%E5%8D%80/%E4%BD%95%E6%AC%A3%E7%B4%94">2016 立委選舉政治獻金專戶</a>，申報的宣傳經費約為 971 萬元。</p>
        <h2>除了候選人，還有誰在下政治廣告？</h2>
        <p>除了此次參選的候選人以外，我們發現倡議型非營利組織「國際特赦組織 台灣分會」、「Greenpeace 綠色和平 （台灣網站）」投放的人權、環境議題等廣告，也屬於「社會議題、選舉或政治相關廣告」的範疇。前 10 名的還有網路媒體「BuzzOrange 報橘」、「品觀點」等。</p>
        <iframe
          src="https://public.flourish.studio/visualisation/1189652/embed"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a
            class="flourish-credit"
            href="https://public.flourish.studio/visualisation/1189652/?utm_source=embed&utm_campaign=visualisation/1189652"
            target="_top"
            style="text-decoration:none!important"
          ><img
            alt="Made with Flourish"
            src="https://public.flourish.studio/resources/made_with_flourish.svg"
            style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"
          > </a>
        </div>
        <p>但佔最多的是來自於同一個出資者「Sway Strategy 」的廣告。這是一家名叫「思為策略」的顧問公司，專門進行政治行為數據的分析。思為策略以「政治大廚房」和「地方政誌」兩個粉絲專頁投放合計 2752 筆政治廣告，內容都是號召網友填答 2020 大選相關線上民調的問卷連結。林柏蒼分析，這兩個粉絲團可以視為思為策略的官方粉絲專頁，只是用不同切面經營而已，「應該跟這一次選舉的行銷需求有關。」</p>
        <p>READr <a href="https://docs.google.com/spreadsheets/d/1Gvp51o4tXh2cIiOkyQ5UvuYQzXIxt4iVd-PzKM30OW0/edit?usp=sharing">另外收集了</a> 百個總統候選人韓國瑜、蔡英文支持者粉絲專頁（註），也發現了支持者自掏腰包幫候選人下廣告的狀況。</p>
        <iframe
          src="https://public.flourish.studio/visualisation/1189681/embed"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a
            class="flourish-credit"
            href="https://public.flourish.studio/visualisation/1189681/?utm_source=embed&utm_campaign=visualisation/1189681"
            target="_top"
            style="text-decoration:none!important"
          ><img
            alt="Made with Flourish"
            src="https://public.flourish.studio/resources/made_with_flourish.svg"
            style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"
          > </a>
        </div>
        <p>從次數來看， 「辣台派」、「我們顧面桶」都是少錢多次的小額廣告。「辣台派」的廣告內容以正面宣傳蔡英文政見為主題；「我們顧面桶」的廣告內容是嘲諷韓國瑜，例如說他是「烙跑市長」、「苦民所苦、睡到中午」。這兩個刊登次數多的粉絲頁，原先刊登廣告使用的都是美金，因為被認定「此廣告有關政治和重大國家議題」，但使用幣別與投遞區域的幣別不符合，已被 Facebook 下架。</p>
        <p>從金額來看，花最多錢下廣告的是「不禮貌鄉民團」，廣告大意為「蔡英文譴責中共軍機機繞臺、賣芭樂到美國，韓國瑜不對軍機繞臺發表意見，還讓高雄芭樂價格崩盤。」，花費金額在 2 萬至 2.5 萬元之間。自 2020 年一月初，已無法查看該粉絲團的內容。</p>
        <p>陸子鈞提醒，這份粉絲頁資料有其限制，雖然設定查找方式時排除了政黨直營粉絲頁，但很難得知「看起來是素人」的粉絲頁是否為政黨的側翼，以他在行銷圈多年的經驗，知道政黨和網紅、人氣粉絲頁之間可能「有些關係」。 </p>
        <h2 id="facebook">
          Facebook「下重手」有效嗎？
        </h2>
        <p>隨著使用者習慣的轉變，網路的影響力逐漸取代電視，擁有龐大使用者的 Facebook，儼然成為選舉競爭的重要戰場。</p>
        <p>去年 10 月，Facebook 在臺灣舉行「Election Day 公正選舉行動日」活動，表示他們在「維護選舉公正」投入很多努力，其中最重要的措施之一，是力推「政治廣告透明工具」，任何廣告主在 Facebook 上刊登選舉或政治廣告前，都必須完成身份和所在地的驗證，這功能是為確保只有臺灣人申請的帳號、使用新臺幣，才可以刊登政治相關廣告。</p>
        <p>且自 11 月起，強制揭露刊登政治廣告出資者的資訊，Facebook 透過新聞稿表示：「相信透過提升透明度，有助於提高廣告主的責任並對所刊登的廣告負起完全的責任，進一步預防不法份子企圖干預選舉。」</p>
        <p>Facebook 於 2017 年 9 月公布一批資料，指出自 2015 年 6 月至 2017 年 5 月，有 400 多個有俄羅斯網軍背景的帳號，花費十萬美元對美國選民下廣告，企圖影響美國 2016 年總統大選。從 2018 年 3 月開始，Facebook 就成立廣告檔案庫，加強對廣告的管理，2019 年 6 月開始，逐步在全球推出「廣告資訊透明度工具」，廣告出資者及其顯示曝光對象、投放金額的資訊（如下圖）將會在廣告檔案庫中留存 7 年，12 月更公佈了廣告檔案庫報告。</p>
        <p>
          <img
            src="https://paper-attachments.dropbox.com/s_AABA985E7B5A381D286ED11D0ABC7B1579114FA321473800B6D963CAFBFD72F7_1578076805441_+2020-01-04+2.37.31.png"
            alt=""
          >
        </p>
        <p>在行銷人眼裡，Facebook 對廣告的規範從預告到執行並不突然。專長數位行銷的詮識數位執行長陸子鈞表示，在 Facebook 下廣告時「明顯感覺到政策緊縮是在 8 月底」，愈來愈多的廣告帳號被封鎖，行銷圈內其他業者也有一樣的情況。</p>
        <p>為了理解政治獻金實務操作方式才選擇參選新北市板橋區立委的王向榮，在 8 月 11 日出資 100 元刊登了自己的「佛系參選聲明」，是台灣第一則政治廣告的登錄者；但第二筆登錄資料直至 10 月 12 日才出現，為民進黨新北市立委參選人蘇巧慧。</p>
        <p>從數量上來看，直到 11 月 7 日 Facebook 強制啟動申報機制，政治廣告數量才開始穩定變多。</p>
        <iframe
          src="https://public.flourish.studio/visualisation/1187758/embed"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a
            class="flourish-credit"
            href="https://public.flourish.studio/visualisation/1187758/?utm_source=embed&utm_campaign=visualisation/1187758"
            target="_top"
            style="text-decoration:none!important"
          ><img
            alt="Made with Flourish"
            src="https://public.flourish.studio/resources/made_with_flourish.svg"
            style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"
          > </a>
        </div>
        <p>Facebook 出手，政治廣告確實變得比規範前透明，但也對行銷造成影響。陸子鈞舉例，他有一個客戶花了 17 天，準備許多身份證明材料，才通過「出資者」身份驗證，能繼續刊登和社會議題相關但其實不是為特定候選人助選的「社會議題、選舉或政治相關廣告」。陸子鈞也提到，一些使用「選舉梗」做行銷的商業廣告，在最近也都遇到刊登困難。</p>
        <h2>政治行銷、網路聲量與選舉結果是否匹配？</h2>
        <p>候選人和政黨在 Facebook 上除了發貼文，更花錢讓貼文變成能設定顯示對象的政治廣告，目的是為了提升網路能見度、累積網路聲量，最終達到勝選的目標。</p>
        <p>王宏恩則表示，評估政治廣告是否「有效」，要看它實際能動員多少人出來投票，這是政治廣告唯一重要的指標。但從過去選舉數據可以看出，網路聲量並不一定等於實際選票。根據<a href="https://www.twreporter.org/i/2018-election-report-sharevoice-gcs">《報導者》對 2018 年縣市長選舉的分析報導</a>，可以看出選前一個月，新北市民進黨候選人蘇貞昌以 63.3% 的網路聲量大勝國民黨候選人侯友宜的 36.7%，選舉結果出爐，侯友宜卻是以 57.2% 的得票率，擊敗得票率 42.9%的蘇貞昌。</p>
        <p>因此，該如何組合網路「空戰」、與選民面對面的「陸戰」，加上國際情勢、兩岸關係等大環境因素作用，候選人「勝選方程式」還在找尋最佳解。</p>
        <p>註：資料來源與相關算法</p>
        <ul>
          <li><p>廣告模擬器使用資料：來自 g0v 社群參與者王向榮針對臉書廣告檔案庫蒐集共 1.6 萬多筆資料（<a href="https://github.com/ronnywang/fb-ad-lib">完整資料請見</a>），篩選出「政治廣告」及「有登記參選 2020 立委選舉」，資料區間為去年 10 月至 12 月中旬，共有 4197 筆廣告，若「區域」、「年齡」、「性別」3 個條件皆滿足，且廣告投放比例大於 10% 就會顯示。</p></li>
          <li><p>曝光率：曝光區間的下限乘以性別或年齡百分比，由於曝光的最小區間為 0 到 999，以下限來計算，設定最小區間的該則廣告會被算為 0 ，這裡採取下限的保守算法，得出的結果為「最少有多少人看到」。</p></li>
          <li><p>總統大選支持者粉絲專頁：共 108 個，查找標準為：非政黨官方直營、非政治人物、非媒體，且粉絲數大於 5000 人，其中韓 54 個，蔡 53 個。</p></li>
        </ul>
      </div>
      <TheFooter />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Papa from 'papaparse';
import NoSSR from 'vue-no-ssr';
import ReadMore from './components/ReadMore.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  name: 'PoliticalPost',
  metaInfo() {
    return {
      title: 'Facebook 政治廣告收集者',
      description: 'Facebook 因應臺灣總統選舉，要求所有「政治性廣告」揭露廣告對象及金額，來看看哪些人的廣告鎖定的是你！',
      metaUrl: 'political-post',
      metaImage: 'political-post/img/og.png',
    };
  },
  components: {
    NoSSR,
    ReadMore,
    TheFooter,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      THRESHOLD: 10,
      filter: {
        age: 35,
        area: 0,
        gender: 0,
      },
      paging: {
        page: 0,
        max: 0,
        perPage: 9,
        width: 2,
      },
      genderList: [
        { identifier: 'male', name: '男性' },
        { identifier: 'female', name: '女性' },
        // {identifier: 'Unknown', name: '未知'},
      ],
      areaList: [
        { identifier: 'Taipei', name: '台北市' },
        { identifier: 'New Taipei City', name: '新北市' },
        { identifier: 'Keelung City', name: '基隆市' },
        { identifier: 'Taoyuan City', name: '桃園市' },
        { identifier: 'Hsinchu City', name: '新竹市' },
        { identifier: 'Hsinchu', name: '新竹縣' },
        { identifier: 'Miaoli', name: '苗栗縣' },
        { identifier: 'Taichung', name: '台中市' },
        { identifier: 'Changhua', name: '彰化市' },
        { identifier: 'Nantou', name: '南投縣' },
        { identifier: 'Yunlin', name: '雲林縣' },
        { identifier: 'Chiayi', name: '嘉義市' },
        { identifier: 'Chiayi', name: '嘉義縣' },
        { identifier: 'Tainan', name: '台南市' },
        { identifier: 'Kaohsiung', name: '高雄市' },
        { identifier: 'Pingtung', name: '屏東縣' },
        { identifier: 'Yilan', name: '宜蘭縣' },
        { identifier: 'Hualien', name: '花蓮縣' },
        { identifier: 'Taitung', name: '台東市' },
        { identifier: 'Kinmen', name: '金門縣' },
        { identifier: 'Lienchiang', name: '連江縣' },
        { identifier: 'Penghu', name: '澎湖縣' },
        // {identifier: 'Fujian', name: '福建省'},
        // {identifier: 'Taiwan', name: '台灣省'},
        // {identifier: 'Unknown', name: '未知'},
      ],
      filteredData: [],
      parsedResults: [],
      isEmpty: false,
    };
  },
  computed: {
    paginatedData() {
      const from = (this.paging.page - 1) * this.paging.perPage;
      const end = this.paging.page * this.paging.perPage;
      return _.slice(this.filteredData, from, end);
    },
    pages() {
      let start = this.paging.page - this.paging.width;
      let end = this.paging.page + this.paging.width;
      if (this.paging.page <= this.paging.width) {
        start = 1;
        end = 1 + (2 * this.paging.width);
      } if (this.paging.page + this.paging.width >= this.paging.max) {
        start = this.paging.max - 2 * (this.paging.width);
        end = this.paging.max;
      }

      if (start <= 0) start = 1;
      if (end > this.paging.max) end = this.paging.max;
      return _.range(start, end + 1);
    },
    hideNext() {
      return (this.paging.page + 1) > this.paging.max;
    },
  },
  watch: {
    filter: {
      handler() {
        this.doFilter();
      },
      deep: true,
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    Papa.parse('/proj-assets/political-post/data.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        this.parsedResults = results.data;
      },
    });
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    setFilter(area, age, gender) {
      this.filter.area = _.findIndex(this.areaList, (o) => o.identifier === area);
      this.filter.age = age;
      this.filter.gender = _.findIndex(this.genderList, (g) => g.identifier === gender);
      this.doFilter();
    },
    doFilter(
      area = this.areaList[this.filter.area].identifier,
      age = this.filter.age,
      gender = this.genderList[this.filter.gender].identifier,
    ) {
      let range = '';
      if (age < 13) { range = '<13'; }
      if (age >= 13 && age <= 17) { range = '13-17'; }
      if (age >= 18 && age <= 24) { range = '18-24'; }
      if (age >= 25 && age <= 34) { range = '25-34'; }
      if (age >= 35 && age <= 44) { range = '35-44'; }
      if (age >= 45 && age <= 54) { range = '45-54'; }
      if (age >= 55 && age <= 64) { range = '55-64'; }
      if (age >= 65) { range = '65+'; }

      this.filteredData = _.orderBy(_.filter(this.parsedResults, (item) => item[area] > this.THRESHOLD && (item[`${range} ${gender}`] > this.THRESHOLD)), ['area', `${range} ${gender}`]);

      // eslint-disable-next-line no-console
      console.log('area:', area);
      // eslint-disable-next-line no-console
      console.log('range:', range);
      // eslint-disable-next-line no-console
      console.log('gender:', gender);
      // eslint-disable-next-line no-console
      console.log(`filtered: ${this.filteredData.length}`);

      this.filteredData = _.slice(this.filteredData, 0, 100);
      this.paging.page = 1;
      this.paging.max = Math.ceil(this.filteredData.length / this.paging.perPage);
      // eslint-disable-next-line no-console
      console.log(`max: ${this.paging.max}`);

      this.isEmpty = this.filteredData.length === 0;
    },
    goPrev() {
      if (this.paging.page > 1) {
        this.paging.page -= 1;
      }
    },
    goNext() {
      if (this.paging.page < this.paging.max) {
        this.paging.page += 1;
      }
    },
    setPage(page) {
      if (page > 0 && page <= this.paging.max) {
        this.paging.page = page;
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      if (window.innerWidth >= 960) {
        this.paging.perPage = 9;
        this.paging.width = 2;
      } else {
        this.paging.perPage = 5;
        this.paging.width = 1;
      }
    },
  },
};
</script>

<style src="./index.css"></style>
