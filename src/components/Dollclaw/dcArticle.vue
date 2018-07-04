<template>

<div>

<div class="sectionContainer">


<div class="sectionwpr parallax" :class="{ 'fixed': !isMobile && currentSection > 0 }" :style="{ position: !isMobile && finished ? 'absolute' : 'static' }">
  <div class="centerwpr">

    <p>好奇心的起源，是夾娃娃機店用著驚人的速度取代我熟悉的街景。本來以為又是一個「蛋塔風潮」，直到身邊開始出現了沉迷的朋友，我才發現這次好像有點不一樣。這個產業似乎自成了一個神秘的地下社會，每個人各有自己的角色分工，讓我決定一探究竟。</p>

    <p>作為開始，我請朋友小喵（化名）帶我去夾娃娃。看著她的眼神，我終於明白在遊戲機台玻璃背後，我們看到的是截然不同的世界。</p>

    <p>「這個可以！」小喵用目光掃射了一輪，一個箭步往其中一台機器走去。我還摸不清楚到底什麼「可以」？她就已經迅速投幣投到了第 3 次， 30 元，而目標正準備到手。</p>

    <p>小喵是我的同業，記者。覺得新聞工作沒什麼成就感，在高壓的生活底下，選擇夾娃娃來放鬆，「小時候玩都夾不到啊，覺得夾娃娃機在騙錢。前一陣子家附近開了很多，我想說去玩玩看，結果花了很少錢就夾到了，我才整個人陷進來。」</p>

    <p>我還在做筆記，一抬頭，小喵已經拎著兩隻娃娃晃到我眼前，「剛好到保夾金額，耶。」她露出勝利的笑容。</p>

    <p>所謂的「保夾」，就是機台上都會標示的保證取物價，如果投幣的金額達到保夾，爪子的力道就會變強，讓玩家把物品夾到手為止。</p>

    <p>而可以「計算」的還不只這些。</p>

    <p>比小喵還沉迷的人通常不會只甘於做個玩家。許多人玩到娃娃太多堆積如山，乾脆自己租個機台來放。這時候，投進夾娃娃機台的錢變成了「進貨」的成本，得仔細計算。</p>

    <p>「這一整台的娃娃都是我夾的，我都沒有去買。」經營「天趣」品牌，身兼機台商、含加盟共有十七家店的經營者袁大安展示他其中一台娃娃機，「我會算成本，一般中小型的娃娃 60 元以下夾得到我才會夾，外頭批發價大概 120 元一隻。」</p>

    <p>當然也有專門打東西來賣的「獵人」。由於夾娃娃機是個看技巧跟運氣的遊戲，經驗豐富的人，可能花幾十元就能夾到價值破百元的東西。而商品的價值還會因為市場波動。</p>

    <p>市場在哪裡？想經營夾娃娃機，不是只能跟廠商批貨，在臉書社團或是拍賣網站跟其他玩家收購也可以。除了最常見的娃娃，正版的公仔也能往上喊價，而最熱門的是被稱為「小海螺」、「小蠻腰」的藍牙喇叭，價格曾經從 450 漲到最高 900 元，一度是最風行的「貨幣」。</p>


  </div><!-- centerwpr -->
</div><!-- sectionwpr -->

<div class="sectionwpr parallax" :class="{ 'fixed': !isMobile && currentSection > 1 }" :style="{ position: !isMobile && finished ? 'absolute' : 'static' }"> 

  <div class="centerwpr wide">
    <!-- chart 01 -->
    <div class="chartwpr c01">
      <h3>夾娃娃機的專屬貨幣：藍芽音響！</h3>
      <p class="data-source">小海螺、小蠻腰轉手價格波動</p> 

      <div class="centerwpr c01--desc__mobile">
        <div class="descbox">
          <p>小海螺、小蠻腰是一種藍芽音響，大部分的玩家都不是夾來自用，而是賣給夾娃娃機的台主，台主也有用二手價收購較便宜的誘因，讓商品被夾出之後再次回到市場中。這類商品平時會在拍賣網站（如蝦皮）或臉書上流通，價格時有改變，若有台主搶著收購，價格就會飆高。記者自臉書社團整理從 2017 年 1 月至今的資料，發現波動幅度非常大。</p>
          <p>假設玩家用兩、三百元夾到，就能轉手賣到七、八百元，讓這類商品也有涉及「賭博」的疑慮，但目前未有確切成案的例子。受訪者提到，現在大多玩家都選擇在網路上交易，或是賣給認識的台主，避免現場夾、現場賣被當現行犯處理。</p>
        </div>
      </div>
      
      <div class="c01wpr">      

      <!-- <div class="speakerwpr">
        <div class="speaker">
          <img src="/proj-assets/dollclaw/images/pic-k88.png">
          <h3>小海螺</h3>
          <p>今日牌價：<span id="price_conch"></span> 元</p>
        </div>
        <div class="speaker">
          <img src="/proj-assets/dollclaw/images/pic-bv300.png">
          <h3>小蠻腰</h3>
          <p>今日牌價：<span id="price_waist"></span> 元</p>
        </div>
      </div> -->

      <div id="js-price-chart"></div> 

      <div class="c01--desc">
        <p>小海螺、小蠻腰是一種藍芽音響，大部分的玩家都不是夾來自用，而是賣給夾娃娃機的台主，台主也有用二手價收購較便宜的誘因，讓商品被夾出之後再次回到市場中。這類商品平時會在拍賣網站（如蝦皮）或臉書上流通，價格時有改變，若有台主搶著收購，價格就會飆高。記者自臉書社團整理從 2017 年 1 月至今的資料，發現波動幅度非常大。</p>
        <p>假設玩家用兩、三百元夾到，就能轉手賣到七、八百元，讓這類商品也有涉及「賭博」的疑慮，但目前未有確切成案的例子。受訪者提到，現在大多玩家都選擇在網路上交易，或是賣給認識的台主，避免現場夾、現場賣被當現行犯處理。</p>
      </div>
      
      </div>

    </div>
    <!-- chart 01 -->    
  </div><!-- centerwpr wide -->

  <div class="centerwpr">

    <p>「臉書社團上瞄一下大概就可以知道這個東西現在賣多少錢，然後算一下我用多少錢可以夾到。這樣玩就不會虧本。」袁大安解釋起專業玩家的玩法。</p>

    <p>機台一空，賺錢的機會就沒了，所以經營者必須要迅速、立刻找到需要的商品補進來，供需就成立了。於是，有人玩，有人收購，價格還會不時波動，運氣好、技術好的玩家就能賺取價差。玩家與機台主之間的供需織成了一個新的綿密的鏈，支撐起這個產業。</p> 

    <p>但為什麼所有人突然都能進到這個市場了？這個大街小巷都是娃娃機的熱潮，究竟是怎麼開始的？</p> 

    <p>「這真的是天時地利人和。」資深玩家 Andy（化名）下了一個簡單的註解，「一切都是從分租模式開始。」</p> 

    <p>「夾娃娃機以前是一個很封閉的市場，並非一般人可以參與的。它的營收很高，但是成本也不便宜，機台一台要兩萬八，一間店三十台，就要一百多萬。雖然看起來不多，但說少也不少，快速展店是不可能的。」 Andy 表示。</p> 

    <p>「但某一天，有人發明了把機台分租出去的模式。」Andy 解釋，租下店面跟機台的「場主」把夾娃娃機分別租給不同的「台主」，對台主來說，一個月 5000 、 6000 元的租金並不是很高的門檻。而通常場主會要求一次繳半年至一年的租金，成本馬上就回來了，就能馬上拿著回收的一百萬去開下一間，形成快速複製的關鍵。</p> 

    <p>只不過，這個「人」是誰，江湖上有很多不同的答案。有人說是北台灣最大的機台銷售商、也有人說來自台中的逢甲夜市，來源似乎已經不可考了。</p> 

    <p>就像每個傳奇故事的開頭，因為「某人」的起心動念，改變了整個產業的遊戲規則，讓夾娃娃機不再是有資本的人能夠寡占的事業。</p> 

    <p>「我一週有一半時間在台中，一半時間在板橋。某次在逢甲夜市聽到朋友請的工讀生在做生意，我很驚訝，一個大學工讀生可以做什麼生意？才得知這個娃娃機分租的模式。」Andy 對可以賺錢的事情都很好奇，他回到板橋觀察，發現那裡的店開得如火如荼，便開始研究。</p> 

    <p>「這個產業一開始真的很封閉，大部分的經營者是擺夜市的流動攤販，不太願意教別人怎麼做。」Andy 苦笑，「我就是半夜趁他們補貨的時候，請他們抽菸吃檳榔，拜託他們教我。學完之後才自己下去做。」</p> 

    <p>Andy 進場的時間是 2016 年底，正好是數據上夾娃娃機店面數量開始暴漲的時候。夾娃娃機的瘋狂展店正開始侵蝕我們熟悉的街景。</p> 

  </div><!-- centerwpr -->
</div><!-- sectionwpr -->

<div class="sectionwpr parallax" :class="{ 'fixed': !isMobile && currentSection > 2 }" :style="{ position: !isMobile && finished ? 'absolute' : 'static' }">

  <div class="centerwpr">
    <!-- chart 02 -->
    <div class="chartwpr c02">
      <h3>夾娃娃機來了！歷年增加數量</h3>
      <p class="data-source">資料來源：財政部</p>
      <img class="desktop" src="/proj-assets/dollclaw/images/chart/chart02.png">
      <img class="mobile" src="/proj-assets/dollclaw/images/chart/chart02m.png">
    </div>
    <!-- chart 02 -->

    <hr />

    <!-- chart 03 -->
    <div class="chartwpr c03 expandableChart">
      <h3>夾娃娃機都開在哪兒？</h3>
      <p class="data-source">資料來源：財政部</p>
      <div class="barchart">
        <ul>
          <li>
            <span class="title">新北市</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">778</span>
            </div>
            
          </li>

          <li>
            <span class="title">臺中市</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">773</span>
            </div>
            
          </li>

          <li>
            <span class="title">桃園市</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">596</span>
            </div>
          </li>

          <li>
            <span class="title">高雄市</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">391</span>
            </div>
          </li>

          <li>
            <span class="title">臺南市</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">372</span>
            </div>
          </li>

          <li>
            <span class="title">臺北市</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">321</span>
            </div>
          </li>

          <li>
            <span class="title">彰化縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">270</span>
            </div>
          </li>

          <div class="expandableChart--collapse">

          <li>
            <span class="title">新竹縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">155</span>
            </div>
          </li>

          <li>
            <span class="title">南投縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">134</span>
            </div>
          </li>

          <li>
            <span class="title">新竹市</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">97</span>
            </div>
          </li>       

          <li>
            <span class="title">苗栗縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">88</span>
            </div>
          </li>          

          <li>
            <span class="title">嘉義市</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">71</span>
            </div>
          </li>

          <li>
            <span class="title">雲林縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">69</span>
            </div>
          </li>

          <li>
            <span class="title">基隆市</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">61</span>
            </div>
          </li>

          <li>
            <span class="title">屏東縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">48</span>
            </div>
          </li>

          <li>
            <span class="title">嘉義縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">47</span>
            </div>
          </li>

          <li>
            <span class="title">花蓮縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">35</span>
            </div>
          </li>

          <li>
            <span class="title">宜蘭縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">34</span>
            </div>
          </li>

          <li>
            <span class="title">臺東縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">10</span>
            </div>
          </li>

          <li>
            <span class="title">澎湖縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">4</span>
            </div>
          </li>

          <li>
            <span class="title">金門縣</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">3</span>
            </div>
          </li>

          </div>

        </ul>

        <div class="expandableChart--trigger" @click="handleToggleChart($event, 2)">
          <div class="exp">展開全部</div>
          <div class="col">收合內容</div>
          <div class="dotted">.....</div>
        </div>

      </div>
    </div>
    <!-- chart 03 -->

    <p>對於這些娃娃機快速竄出的現象，有很多不同的解讀。有人預測是無人店的商機，也有人則認為是百貨零售業的衰退。立委管碧玲也曾在質詢時提到，在房租漲價的壓力下，許多特色店家被迫消失。而新北市也針對市內夾娃娃機清查，發現夾娃娃機高度集中在學校附近，還嘗試用自治條例來管理。</p>

    <p>「我倒覺得有點倒果為因了。」 Andy 當然不否認這些趨勢的推測，但能夠瘋狂展店的最大關鍵還是分租模式，「店主很快就能拿回投入的資金，所以市面上只要有空的店面就進去了。而且做夾娃娃機很簡單，不需要太多裝潢，就算後來發現店面生意不好，賠個押金就能搬到下一間去。如果資金模式沒有改變，有再多空的店面也不會有人去租。」</p>

    <p>「目前來講，已經開到沒什麼地方可以再開了。」Andy 說。</p>

    <p>袁大安的創業夥伴阿勳印證了這個說法，「去年九月到今年過年時，是最瘋狂的時候。那時候我們正在找新店面，上 591 租屋網看，一間一間打去問，只有兩種回答。一種是很幸運還沒被問過的新物件，一種就是它不租給夾娃娃機，早就被問到煩了。」</p>

    <p>阿勳一開始對夾娃娃機沒什麼興趣，還質疑到底可不可以賺錢，因為他過去對夾娃娃機店的印象就是開在巷弄裡，沒什麼客人。但袁大安要他先看看店裡的監視錄影器，「結果半夜一、兩點還看到有人站在那裡玩了好幾個小時，真是大開眼界。」阿勳笑道。</p>

    <p>「投入的原因，是因為這個模式一聽就會賺錢。」阿勳提到，「但也因為如此，我一開始想說幹嘛分租給別人，想說好賺自己賺就好了。後來才發現場主就算自己下去直營，也很難做超過四到五台，因為你的創意有限，精力也有限。台主要補貨，又要讓自己的機台夠有創意才能吸引人來玩，真的是租給別人經營比較划算。」</p>

    <p>分租模式創造了低門檻的創業機會，不管是夾到家裡沒地方放娃娃的玩家、還是想多賺點外快的上班族，都在此時進場，「一個月就算只賺兩、三千元，就等於是老闆加薪耶！」瑄瑄說。</p>

    <p>瑄瑄過去是上班族，從玩家變成台主，後來還成為袁大安夾娃娃事業的夥伴，她苦笑，「去年初，我想要租一台機器，居然被候補到第 30 個！真的很誇張耶！」</p>

    <p>「想投入的原因，就是上班族的薪水真的太低了吧！工作壓力又大，下班就想找一點事情放鬆。」瑄瑄說，「我覺得投幣下去的哐啷聲很舒壓。我也不是喜歡裡面東西，只是想要把它夾出來，很有成就感，練一練就能變得很厲害的感覺。」</p>

  </div><!-- centerwpr --> 
</div><!-- sectionwpr -->

<div class="sectionwpr parallax" :class="{ 'fixed': !isMobile && currentSection > 3 }" :style="{ position: !isMobile && finished ? 'absolute' : 'static' }">
  <div class="centerwpr">

    <!-- chart 04 -->
    <div class="chartwpr c04 expandableChart">
      <h3>夾娃娃機的出現讓哪些店家被取代？</h3>
      <p class="data-source">資料來源：財政部</p>

      <div class="descbox">
        <p>我們與 g0v 參與者 RonnyWang 合作，取得自 2016 年 4 月開始的財政部稅籍登記變動資料約 210 筆，嘗試拼湊出這個問題的面貌。（資料限制：由於是「稅籍登記」，若規模較小的店可能就不會有。據受訪者指出，有些連鎖夾娃娃機店也只會登記在一家公司名下）</p>
      </div>

      <ul>
        <li>
          <span class="type">玩具娛樂用品相關</span>
          <span class="number">80</span>
        </li>
        <li>
          <span class="type">文具、書籍相關</span>
          <span class="number">36</span>
        </li>

        <li>
          <span class="type">其他綜合商品</span>
          <span class="number">24</span>
        </li>

        <li>
          <span class="type">家庭用品、服務相關</span>
          <span class="number">23</span>
        </li>

        <li>
          <span class="type">電腦及資訊服務</span>
          <span class="number">19</span>
        </li>

        <li>
          <span class="type">樂器相關</span>
          <span class="number">16</span>
        </li>

        <li>
          <span class="type">食品、飲料、煙草製品</span>
          <span class="number">16</span>
        </li>

        <li>
          <span class="type">自動販賣機、無人店</span>
          <span class="number">12</span>
        </li>

        <li>
          <span class="type">服飾相關</span>
          <span class="number">9</span>
        </li>

        <li>
          <span class="type">麵店、小吃店、餐館</span>
          <span class="number">7</span>
        </li>

        <li>
          <span class="type">遊戲場</span>
          <span class="number">7</span>
        </li>

        <div class="expandableChart--collapse">

        <li>
          <span class="type">網路購物</span>
          <span class="number">5</span>
        </li>

        <li>
          <span class="type">運動用品</span>
          <span class="number">5</span>
        </li>

        <li>
          <span class="type">視聽設備相關</span>
          <span class="number">2</span>
        </li>

        <li>
          <span class="type">彩卷銷售</span>
          <span class="number">2</span>
        </li>

        <li>
          <span class="type">動物用品</span>
          <span class="number">2</span>
        </li>

        <li>
          <span class="type">布料販售相關</span>
          <span class="number">2</span>
        </li>

        <li>
          <span class="type">機械商品</span>
          <span class="number">1</span>
        </li>

        <li>
          <span class="type">鐘錶相關</span>
          <span class="number">1</span>
        </li>

        <li>
          <span class="type">眼鏡相關</span>
          <span class="number">1</span>
        </li>

        <li>
          <span class="type">照相用品相關</span>
          <span class="number">1</span>
        </li>

        <li>
          <span class="type">汽車用品相關</span>
          <span class="number">1</span>
        </li>

        <li>
          <span class="type">不動產相關</span>
          <span class="number">1</span>
        </li>

        <li>
          <span class="type">釣蝦場</span>
          <span class="number">1</span>
        </li>

        </div>
      </ul>

      <div class="expandableChart--trigger" @click="handleToggleChart($event, 3)">
        <div class="exp">展開全部</div>
        <div class="col">收合內容</div>
        <div class="dotted">.....</div>
      </div>

    </div>
    <!-- chart 04 -->    

    <p>抱著類似原因進場的還有小芊（化名）。一天深夜，我跟著小芊來到她家附近的夾娃娃機店，由於盡量不要打擾客人玩遊戲，小芊都會在晚上十一、十二點的時候進行台主的維護工作。她掏出一大把鑰匙，分別打開機台的玻璃門跟後台，「有時候都要找不到自己家的鑰匙了！」她大笑。</p>

    <p>從事服飾業的她，最初在網路上看到夾娃娃機的影片覺得有趣，玩上了癮，為了讓自己不要花太多錢，就租了三台機台，一台在上班地點附近，兩台在家附近。</p>

    <p>平常，她就帶著一個裝著娃娃的大袋子搭公車上班。上班前巡台補貨一次，下班回家時再去巡台補貨一次，最好的時候，一個月可以有四萬元的進帳，差的時候也有一、兩萬。</p>

    <p>跟著她巡完家附近的兩台機器，小芊還展示了一下夾娃娃的技巧，全部的工作結束，瞄了一下手錶，不過才 15 分鐘。她跟我告別，說要回店裡再玩一下，我問她是會跟客人交流的那種台主嗎？她說不會，「不然被客人坳或是嫌為什麼那麼難夾，很討厭啊！」</p>

    <p>不同於一般的服務業需要時時在店裡面對客人，無人商店給了小資族一個能夠用零碎時間賺取外快的機會。但這一行也不是那麼好做。</p>

    <p>「一家店要做得好，真的是大家（台主們）要團結才比較有可能，但這就很難。」袁大安提到，他都會留個幾台自營的機台，降低難度，才不會讓玩家覺得這家店的機台都很難玩，就不來了。</p>

    <p>Andy 也提到，由於同一家店有很多不同的台主，彼此都是競爭關係，難免會相互模仿，也常常吵架，「像我們常常在洞口擺好夾的娃娃吸引客人來，那隔壁台的台主看到你擺好了，就跑去把它全部夾走。你會不會生氣？如果場主又沒有出來維護秩序，就會出事，最激烈就是跑去跟警察檢舉。」</p>

    <p>更有甚者，競爭還激烈到連同業都在檢舉。阿勳就提到，自己的夾娃娃機店被檢舉不符合土地使用分區，說是工業用地不能開店，「連房東都不知道耶，我租下來之前，這裡開三媽臭臭鍋，我的店對面是清心跟麥當勞，結果我不能在這裡開夾娃娃機店？」</p>

    <p>不過，如果沒什麼問題，為什麼要害怕被檢舉？</p>

    <p>「這個產業政府如果要嚴抓，應該很快就熄掉了，因為有太多不合法的空間。」阿勳說，「正確來說，我連自己是不是在做合法的事情都不知道。」</p>


  </div><!-- centerwpr -->
</div><!-- sectionwpr -->

<div class="sectionwpr parallax" :class="{ 'fixed': !isMobile && currentSection > 4 }" :style="{ position: !isMobile && finished ? 'absolute' : 'static' }">
  <div class="centerwpr">

    <!-- chart 05 -->
    <div class="chartwpr c05">
      <h3>夾娃娃機抽查違規率百分之百！</h3>
      <p class="data-source">資料來源：行政院消保處</p>

      <div class="descbox">
        <p>2018 年 5 月 1 日，行政院消保處與經濟部聯合抽查了 26 間夾娃娃機店，違規率是百分之百。主要是商品標示、檢驗標識問題，其次是機台違規。而違禁品、消防安全、建築安全三個檢查項目這次沒有出現違規案例。</p>
      </div>

      <div class="barchart c05">
        <ul>
          <li>
            <span class="title">商品檢驗標籤</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">23</span>
            </div>
          </li>

          <li>
            <span class="title">商品標示</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">23</span>
            </div>
          </li>

          <li>
            <span class="title">商業登記</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">20</span>
            </div>
          </li>

          <li>
            <span class="title">機台</span>
            <div class="barwpr">
              <div class="bar"></div>
              <span class="number">7</span>
            </div>
          </li>

        </ul>
      </div>
    </div>    

    <p>「夾娃娃機的商品，很難都是正版的。尤其是社區型的店，商品都是盜版的居多，因為要養客人，設定好夾一點，希望你明天還會再來。量要大，就會選擇便宜的盜版商品進貨。」Andy 解釋，「而像海螺蠻腰這種藍牙喇叭要經過 NCC 無線射頻的認證，雖然台灣有代理商，但後來量大，大家都從大陸進來。」</p>

    <p>阿勳也說，雖然現在沒有任何案例因為經營夾娃娃機業被起訴，但機台被警察扣住，就算後來有還，先不說這一個禮拜的業績，客人也會覺得很奇怪，你是不是做了什麼奇怪的事？「所以台主都會盡量跟客人息事寧人，真的有人要盧就送他啦，不管怎麼樣你都是賺錢。」</p>

    <p>商品的正版盜版還是經營者自己的選擇，但關於機台的合法與否，才是許多新進到這個產業的人覺得不公平的地方。</p>

    <p>「大家應該很直覺會認為夾娃娃機是電子遊戲機吧？電子遊戲機是遊藝機台，要擺遊藝機台需要遊藝場執照，一張平均轉手價格是四百萬，根本不會有人為了開夾娃娃機店去搞一張這個。」新進的機台商 Billy （化名）提到。</p>

    <p>「所以，現在四處可見的夾娃娃機，叫做『選物販賣機』，我覺得光這就是很荒謬的事。」Billy 苦笑，「選物販賣機應該是自動販賣機那種，你投 10 元，可以拿到 10 元的飲料。但是夾娃娃機是你可能投 10 元卻得到 100 元的東西，這叫『射悻性』，是賭博機台最重要的標準。」</p>

    <p>但讓 Billy 覺得不公平的還不是定義問題，而是明明同樣玩法的機台，送到經濟部審議時，有時候被評定為「益智類電子遊戲機」，有時候卻被評定為「非屬電子遊戲機」，只有後者是不需要遊藝執照就可以到處擺的種類。</p>

    <!-- chart 06 -->
    <div class="chartwpr c06">
      <h3>2017 年底夾娃娃機送審數快速增加⋯⋯</h3>
      <p class="data-source">資料來源：經濟部電子遊戲機審議</p>
      <img class="desktop" src="/proj-assets/dollclaw/images/chart/chart06.png">
      <img class="mobile" src="/proj-assets/dollclaw/images/chart/chart06m.png">
    </div>

    <p>行政院消保處在聯合稽查後，就曾經公開表示，即使經濟部在2000年後召開多次會議，後來透過函釋定義夾娃娃機只要符合「設定保證取物價格」、「物品價值與售價相當」、「不可影響取物可能性」、「不更動操作流程或影響操作結果」四大原則，就是「選物販賣機」，屬於「非屬電子遊戲機」認證。</p>

    <p>但業者以此原則製造這類的娃娃機送審，評鑑委員會卻評鑑為「益智類之電子遊戲機」，前後評鑑標準顯然不一致。</p>

    <p>為了驗證，我讀完了經濟部 2000 年至 2018 年共 247 份<a href="https://gcis.nat.gov.tw/mainNew/subclassNAction.do?method=getFile&pk=89" target="_blank">審議紀錄</a>。手動把送審的夾娃娃機依照遊戲流程分成四種，發現就算玩法一樣，評定結果還會因為時間而有所不同。還出現了同樣內容的機種，再兩次審議（間隔一個月）結果卻完全不同的狀況。</p>

    <p>如有標示「保夾金額」的機種，2002 年曾有 2 台被評定為「非屬電子遊戲機」，之後就再也沒有通過過，全部被評定為需要遊藝執照才能擺放的「益智類電子遊戲機」，直至今年近幾個月才又有幾台挑戰成功。</p>

  </div><!-- centerwpr -->
</div><!-- sectionwpr -->

<div class="sectionwpr parallax" :class="{ 'fixed': !isMobile && currentSection > 5 }" :style="{ position: !isMobile && finished ? 'absolute' : 'static' }">

  <div class="centerwpr wide"> 
  <!-- chart 07 -->
  <div class="chartwpr">
    <h3>同樣的玩法，評鑑結果卻有不同命運</h3>
    <p class="data-source">資料來源：經濟部</p>

    <div class="centerwpr">
      <div class="descbox">
        <p>記者依照夾娃娃機的送審內容將之分為四種玩法。玩法一，未夾中就要重新投幣。玩法二，保夾機種（未夾中就要重新投幣，但投到商品金額時則不限次數到夾中為止）。玩法三，投入商品對等價格才能開始遊戲。玩法四，投 10 元獲得商品，夾娃娃為附屬遊戲。可以見到同樣的玩法，評定的結果卻大有不同。</p>
      </div>

      <div class="c07-legend">
        <div>評定結果：</div>
        <div class="entry fail">
          <div class="icon"></div>
          <div class="text">電子遊戲機</div>
        </div>
        <div class="entry pass">
          <div class="icon"></div>
          <div class="text">非屬電子遊戲機</div>
        </div>
      </div>

    </div>    

    <div class="c07">

        <!-- <div class="row r0">
          <div class="t1">評鑑次數</div>
          <div class="cell" v-for="item in chart07data" :key="item.id">{{item.times}}</div>
        </div> -->

        <div class="row r1">
          <div class="t1">玩法一</div>
          <div class="cell" v-for="item in chart07data" :key="item.id">
            <div v-if="item.condition1.pass > 0" class="mark pass">{{item.condition1.pass}}</div>
            <div v-else-if="item.condition1.pass <= 0" class="mark empty">&nbsp;</div>

            <div v-if="item.condition1.fail > 0"  class="mark fail">{{item.condition1.fail}}</div>
            <div v-else-if="item.condition1.fail <= 0" class="mark empty">&nbsp;</div>
          </div>
        </div>

        <div class="row r2">
          <div class="t1">玩法二</div>
          <div class="cell" v-for="item in chart07data" :key="item.id">
            <div v-if="item.condition2.pass > 0" class="mark pass">{{item.condition2.pass}}</div>
            <div v-else-if="item.condition2.pass <= 0" class="mark empty">&nbsp;</div>

            <div v-if="item.condition2.fail > 0"  class="mark fail">{{item.condition2.fail}}</div>
            <div v-else-if="item.condition2.fail <= 0" class="mark empty">&nbsp;</div>
          </div>
        </div>

        <div class="row r3">
          <div class="t1">玩法三</div>
          <div class="cell" v-for="item in chart07data" :key="item.id">
            <div v-if="item.condition3.pass > 0" class="mark pass">{{item.condition3.pass}}</div>
            <div v-else-if="item.condition3.pass <= 0" class="mark empty">&nbsp;</div>

            <div v-if="item.condition3.fail > 0"  class="mark fail">{{item.condition3.fail}}</div>
            <div v-else-if="item.condition3.fail <= 0" class="mark empty">&nbsp;</div>
          </div>
        </div>

        <div class="row r4">
          <div class="t1">玩法四</div>
          <div class="cell" v-for="item in chart07data" :key="item.id">
            <div v-if="item.condition4.pass > 0" class="mark pass">{{item.condition4.pass}}</div>
            <div v-else-if="item.condition4.pass <= 0" class="mark empty">&nbsp;</div>

            <div v-if="item.condition4.fail > 0"  class="mark fail">{{item.condition4.fail}}</div>
            <div v-else-if="item.condition4.fail <= 0" class="mark empty">&nbsp;</div>
          </div>
        </div>

        <div class="row r0">
          <div class="t1">評鑑次數</div>
          <div class="cell" v-for="item in chart07data" :key="item.id">{{item.times}}</div>
        </div>
 
    </div>
  </div>

  </div><!-- centerwpr -->

  <div class="centerwpr">  

  <p>若依照字面解釋「選物販賣機」，則玩法三「投入商品對等價格才能開始遊戲」最符合，近期也看到非常多夾娃娃機想用此方式通過審查，但就連這類的機器，也不是通通都能被評定為非屬電子遊戲機，Billy 也提到「而且實際擺放在店裡面讓大家玩的根本不可能是這種玩法。」</p>

  <p>在行政院消保處的聯合稽查結果中，就有一台玩法是投入 10 元就能啟動的娃娃機，被發現當時送審通過評鑑的玩法是需投足物品金額才可啟動，顯然是掛羊頭賣狗肉。</p>

  <p>歷年來，也有用「投10元獲得（如彈力球、鉛筆等）商品，夾娃娃為附屬遊戲」這種機型，先用低價商品創造對價關係，讓夾娃娃成為附屬遊戲。這類機器原本被評定為非屬電子遊戲機，但之後就算遊戲說明書內容長得一樣，還是被評定為益智類。</p>

  <p>經濟部並未針對我詢問的評鑑結果做太多解釋，只強調在 6 月 13 日後已經協調出<a href="https://drive.google.com/file/d/1qY1qOo_vTB1hPcCILtmzPXG6fhLkgie4/view?usp=sharing" target="_blank">十大規則</a>，並寄給相關產業人士。而之所以會有不同的評定結果，「通常是沒有標註清楚」，經濟部並不承認內容完全相同。</p>

  <p>而 Billy 告訴我，業界都知道，能否通過機台認定的潛規則，就是加入（自動販賣商業同業）公會，「我並沒有介意加不加入公會，只是覺得評鑑方法太奇怪。我們就是按照公會通過審議的選物販賣機二代機台的設計標準去做機台，但送審就是不會過。這樣根本不合理。」而公會理事長以公事繁忙婉拒了採訪。</p>

  <p>「但是呢，這個產業還是一如往常的瘋狂。」Billy 苦笑，「明明知道審核通過的機率很小，而且一但沒過（被列為益智類），就等同於被列入一定要遊藝執照才能營業的黑名單，還是有很多勇者把自己的機台送去經濟部審核。」</p>

  <p>儘管規則模糊，還是有人願意在這個充滿潛規則的市場嘗試畫出自己的地盤，就像袁大安跟阿勳選擇了機台業當作進入點。</p>

  <p>「開了店，我就想什麼東西都自己來比較方便。例如兌幣機會被蓄意破壞啊，光換一個元件就要九千元；娃娃機的玻璃門被砸，兩千元就飛了。這都是無人店的風險。但自己做就差很多。」有電工背景的袁大安直接把夾娃娃機搬到家裡開始研究，跟阿勳合作，從中國進口零組件，生產自己的機台。</p>

  <p>必須要從中國進口，是因為台灣的製造商不太願意把關鍵的零件放出來。你要買機器，就得整台買走。阿勳選擇直接去中國珠三角工業區的去生產聚落跑一趟，談好零組件生產的訂單，帶回台灣組裝。</p>

  <p>阿勳也提到，台灣以前是做賭博機台起家的，但老一輩的都跑去中國了，「他們都說夾娃娃機以前是最不賺錢的，沒想到現在異軍突起。光是其中一個產業聚落，最熱的時候一個月出貨就出到一千多台。」</p>

  <p>「不過現在大概只剩兩、三百台了。」阿勳說，從數字就能看出衰退的跡象，但他們並不擔心，自己做的好處，就不用跟風，在產業衰退之時還能運用箇中原理創造出新的商機。</p>

  <p>「但現在不知道政府會怎麼動，是最大的風險。」阿勳雖期盼政府能有明確的管理規則，但也怕受傷害，畢竟管得太嚴，就「不好玩了」。從近期的結果看來，政府對於管理和取締有愈來愈多的共識形成，潛規則能不能被打破、確立下正式的規則、最後又是誰能夠留在遊戲場上，大家都還想要賭一把。</p>

  <p>Andy 手上也已經沒有店了。他提到以前一台夾娃娃機一個月可以賺到一萬元以上，現在只剩五千，還有一半沒賺錢，「要見好就收啊！」</p>

  <p>「我覺得最後賺到的只有兩種人，一個是賣貨的業者，一個是賣機台的人。其他的人，大概就是不同程度的小確幸吧，賺到小錢，跟小小的成就感。」Andy 下了這樣的結論。</p>

  <p>想起跟小喵一起去夾娃娃的那天，我坐在她的機車後座，等紅燈時，看到一群人停在路邊盯著手機看，看起來是在抓「寶可夢」，小喵還猶豫了一下要不要加入，後來還是繼續我們的採訪行程。</p>

  <p>我看著在夜色裡被手機螢幕照亮的一張張臉，跟站在夾娃娃機台玻璃前盯著爪子看的臉孔其實很類似。旁人看來空虛，他們卻擁有現實以外的另一個世界。</p>


  </div><!-- centerwpr -->  
</div><!-- sectionwpr -->


</div><!-- sectionContainer -->

<div class="sectionwpr footer">  

  <dc-footer></dc-footer>

</div><!-- sectionwpr -->

</div>
    


</template>

<script>
import { currentYPosition, elmYPosition } from 'kc-scroll'
import Highcharts from 'highcharts'
import moment from 'moment'
import superagent from 'superagent'

function fetchData(url) {
  return new Promise((resolve, reject) => {
    superagent
    .get(url)
    .end((err, res) => {
      if (!err && res) {
        return resolve(JSON.parse(res.text))
      } else {
        return reject(err)
      }
    })
  })
}

// chart 07 data
import chart07data from './js/chart07.json';

// footer
import dcFooter from './dcFooter.vue';

export default {

  components: {
    'dc-footer': dcFooter
  },

  data: function(){
    return {

      conchFormatted: [],
      waistFormatted: [],
      chart07data,
      
      currentSection: 0,
      finished: false,
      sectionContainerHeight: 0,
      sectionsHeight: [],
      sectionsTop: [],
      sectionsBottom: [],

      gaScroll: 0,
    }
  },

  computed: {
    isMobile () {
      return this.$store.state.useragent.isMobile
    }
  },

  methods: {

    // chart 03 bar chart
    setBarWidth: function(element,max){
      const number = element.querySelector('.number').textContent;
      const barWidth = number / max * 100 + '%';
      element.querySelector('.bar').style.width = barWidth;    
    }, //setBarWidth

    drawPriceChart () {
      Highcharts.setOptions({ global: { useUTC: false } })
      Highcharts.chart('js-price-chart', {
        chart: { 
          type: 'line', 
          backgroundColor: 'transparent',
          spacing: [10,10,0,10],
          style: {
              fontFamily: '"source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif'
          }
        },    
    
        title: { text: '' },

        legend: {
            itemStyle: {
                color: '#62485b',
                fontSize: '16px',
                fontWeight: 'normal'
            }
        },

        xAxis: {
          type: 'datetime',
          labels: {
            formatter: function () {
              return moment(this.value).format('YYYY/MM')
            },
            style: {
                color: '#62485b',
                fontSize: '12px'
            }  
          },
          lineColor: 'transparent',
          tickColor: '#62485b',
          tickWidth: 2,
          tickLength: 8
        },

        yAxis: {
          labels: {
            style: {
                color: '#62485b',
                fontSize: '14px'
            }
          }, 
          title: {
              margin: 4,
              text: '金額 (元)',
              style: {       
                  color: '#62485b',           
                  fontSize: '16px'
              }  
          },
          gridLineDashStyle: 'Dot',
          gridLineColor: '#cec4c7',
          gridLineWidth: '2'
   
        },

        series: [
          { 
            name: '小海螺', 
            data: this.conchFormatted,
            color: '#489bba'  
          },
          { 
            name: '小蠻腰', 
            data: this.waistFormatted,
            color: '#e794af' 
          }
        ],
        credits: { enabled: false }
      })
    }, //drawPriceChart

    calcParallaxSetting () {
      const sections = document.querySelectorAll('.sectionContainer .sectionwpr') || []
      let sectionContainerHeight = 0
      this.sectionsHeight = []
      this.sectionsTop = []
      this.sectionsBottom = []
      for (let i = 0; i < sections.length; i++) {
        const bottom = elmYPosition(`div[class*="parallax"]:nth-of-type(${i + 1})`) + sections[i].offsetHeight
        sectionContainerHeight += sections[i].offsetHeight
        this.sectionsHeight.push(sections[i].offsetHeight)
        this.sectionsTop.push(sectionContainerHeight)
        this.sectionsBottom.push(bottom)
      }
      if (sectionContainerHeight > 0) {
        this.sectionContainerHeight = sectionContainerHeight
        document.querySelector('.sectionContainer').style.height = `${sectionContainerHeight}px`
      }
      this.updateStyleTop()
    },

    initParallaxSetting () {
      this.finished = false
      this.calcParallaxSetting()
      this.finished = true
    },

    handleScrollForParallax () {
      for (let [index, value] of this.sectionsBottom.entries()) {
        if (value > currentYPosition() + this.$store.state.viewport[1]) {
          if (index > this.gaScroll) {
            this.gaScroll = index
            ga('send', 'event', 'projects', 'scroll', `scroll to ${index}`, { nonInteraction: false })
          }
          return this.currentSection = index
        }
      }
    },

    handleToggleChart (e, index) {
      const target = e.target.classList.contains('expandableChart--trigger') ? e.target : e.target.parentNode
      const collapsePart = target.parentNode.querySelector('.expandableChart--collapse')
      if (target.classList.contains('expand')) {
        target.classList.remove('expand')
        target.parentNode.querySelector('.expandableChart--collapse').style.height = '0px'
        if (!this.$store.state.useragent.isMobile) {
          this.updateParallaxSetting(index, collapsePart.scrollHeight, 'remove')
        }
      } else {
        target.classList.add('expand')
        collapsePart.style.height = collapsePart.scrollHeight + 'px';
        if (!this.$store.state.useragent.isMobile) {
          this.updateParallaxSetting(index, collapsePart.scrollHeight, 'add')
        }
        ga('send', 'event', 'projects', 'click', `expand ${index}`, { nonInteraction: false })
      }
    },

    updateParallaxSetting (index, value, action) {
      if (action === 'add') {
        this.sectionsHeight[index] += value
        this.sectionContainerHeight += value
        document.querySelector('.sectionContainer').style.height = `${this.sectionContainerHeight}px`
        for (let i = index; i < this.sectionsTop.length; i++) {
          this.sectionsTop[i] += value
          this.sectionsBottom[i] += value
        }
        this.updateStyleTop()
      } else {
        this.sectionsHeight[index] -= value
        this.sectionContainerHeight -= value
        document.querySelector('.sectionContainer').style.height = `${this.sectionContainerHeight}px`
        for (let i = index; i < this.sectionsTop.length; i++) {
          this.sectionsTop[i] -= value
          this.sectionsBottom[i] -= value
        }
        this.updateStyleTop()
      }
    },

    updateStyleTop () {
      const sections = document.querySelectorAll('.sectionContainer .sectionwpr') || []
      for (let i = 1; i < sections.length; i++) {
        sections[i].style.top = `${this.sectionsTop[i - 1]}px`
      }
    }

  },
  beforeMount () {
    fetchData('/proj-assets/dollclaw/data/price.json')
    .then((data) => {
      const conch = data.conch || []
      const waist = data.waist || []
      this.conchFormatted = conch.map(c => [ moment(c.date, 'YYYY-M-D').valueOf(), c.price ])
      this.waistFormatted = waist.map(w => [ moment(w.date, 'YYYY-M-D').valueOf(), w.price ])
      this.drawPriceChart()
    })
  },
  mounted: function(){
    
    if (!this.$store.state.useragent.isMobile) {
      this.initParallaxSetting()
      window.addEventListener('resize', this.calcParallaxSetting)
      window.addEventListener('scroll', this.handleScrollForParallax)
    }
    
    // chart 03
    document.querySelectorAll('.c03 li').forEach((element) => {
      this.setBarWidth(element,800);
    });

    // chart 05
    document.querySelectorAll('.c05 li').forEach((element) => {
      this.setBarWidth(element,25);
    });
  },
  beforeDestroy () {
    if (!this.$store.state.useragent.isMobile) {
      window.removeEventListener('resize', this.calcParallaxSetting)
      window.removeEventListener('scroll', this.handleScrollForParallax)
    }
  }
}
</script>

<style src="./style/article.css"></style>

<style lang="stylus" scoped>

.sectionwpr
  &.parallax
  // position absolute
    left 0
    right 0
    &:nth-child(1)
      top 0
  &.fixed
    position fixed !important
    top auto !important
    left 0
    right 0
    bottom 0
</style>

