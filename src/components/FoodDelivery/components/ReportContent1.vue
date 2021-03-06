<template>
  <article class="report-content">
    <div class="report-content__wrapper">
      <h1>如何成為外送員</h1>
      <p>你聽過食物外送服務嗎？不管你有沒有使用過 Uber Eats、空腹熊貓（Foodpanda），多多少少應該也看過後座掛著箱子、馳騁在大街小巷的機車騎士，抑或是透過上個月的死亡車禍認識這個行業。</p>
      <p>美食外送服務正在臺灣如火如荼地發展，在台深耕 7 年的空腹熊貓日前就宣佈，現有月訂單量已超過 100 萬，成長速度快到一週的訂單量是過去 6 年的總和；在全臺灣 14 萬家餐廳中，目前有 5 % 店家跟外送合作，市場還有很大的成長空間。</p>
      <p>今年 6 月，我成為全臺灣 4 萬 5 千多個外送員的其中之一，並深度採訪十數位外送員、 3 家美食外送平台。這趟旅程讓我發現，這個新創服務就和它的老東家 Uber 一樣，雖然解決了產業的問題，卻也為社會帶來極大的麻煩，更反映出管制無力因應新興行業的困窘，以及這個世代為了生存的流動。</p>
      <h2>誰會來當外送員</h2>
      <p>「時間就是金錢」，完全是這一行的寫照。目前與三大外送平台 Uber Eats、空腹熊貓、戶戶送合作的外送員都是按件計酬，假設訂單源源不絕，能在同樣的時間內完成愈多訂單，收入就愈高。</p>
      <p>分秒之差影響的就是收入。因此外送員總在意客人有沒有準時抵達約定地點、願不願意到一樓領取餐點、甚至在馬路上演玩命關頭。</p>
      <p>加上這些平台自認它們與外送員的關係屬於承攬制<PopUpNotation :text="notations[0]" />，不受《勞基法》工時、休假限制，外送員只要願意投入高工時，自然能換得高收入。</p>
      <p>我訪談的十數位外送員，無論本身是否有正職工作，都有個共同點：都是為了「高薪」和「自由」才踏入這一行。</p>
      <FixedSlides
        :reportId="1"
        :imgCount="fixedSlidesData[0].imgCount"
        :imgSrcs="fixedSlidesData[0].imgSrcs"
        :imgAspectRatio="fixedSlidesData[0].imgAspectRatio"
        :texts="fixedSlidesData[0].texts"
        :breakPoints="fixedSlidesData[0].breakPoints"
      />
      <p>像是台南的熊貓外送員許誌宜（化名）每天跑 12 小時，沒什麼特別事情不太休假，能月入 10 萬元，她努力存錢想要開一間屬於自己的店。</p>
      <p>而台北的陳俊彥（化名）本身有一份月薪 5 萬的正職工作，想趁年輕時多賺一點錢，利用下班或休假時間跑 Uber Eats，最多曾經月收入多出 3 萬元。</p>
      <p>桃園的熊貓外送員林志成（化名）原本是水電工人，日薪 1800 元，因為生了小孩，想增加收入，看到朋友投資失敗欠的百萬債靠熊貓外送工作償還，起心動念加入後，發現真的比過去的收入好。</p>
      <p>「我只要乖乖不犯錯，努力辛苦就會獲得收入，雖然真的很累，但每個月收到薪資單的時候會覺得很值得，報酬跟努力是成正比的。」許誌宜說，「畢竟很多上班族加班還沒有錢咧。」</p>
      <p>努力與收入成正比，是這些外送員在訪談時都會提到的另一個共同點。陳俊彥就提到，「可能我們現在 20 歲到 30 歲這一代人，對實際眼前能看到的東西會比較有動力。我今天努力跑一整天，就領了2、3000元，會很有成就感。」</p>
      <p>過去是業務的陳宇（化名）也提到，業務是你努力跑了還得看客人的臉色和意願，薪資浮動很大，現在加入熊貓，「只要你肯跑，就一定有錢。」</p>
      <p>這份高薪、時間彈性的新興工作吸引了大量的人加入，我在 6 月時依照網頁上的步驟填了資料，特地跑了趟警局領取良民證，下載了駕駛用的 app，滿心期待象徵外送員工作的保溫箱寄來我家。</p>
      <p>接著是兩個禮拜音訊全無。確定我沒有做錯任何步驟後，我決定採取另一個方式開通帳號：直接去總公司。</p>
      <p>踏進總公司辦公室的時候，我終於暸解我的加入請求沒有被處理的原因。超過 30 人擠在不過 8 坪的公共空間裡排著隊，尤其為了開通帳號的隊伍最多人。如果這間公司每天光現場就有這麼多人要消化，那網路申辦的效率可想而知。</p>
      <p>由於我先在網路上填好資料，很快地排到服務人員幫我開通，並交給我一張標示著時間的「入場卷」，要我在約莫 1 小時多以後回來參加「說明會」，「我們說明會是 1 小時 1 梯次，10 分鐘後的那場已經額滿了。1 小時回來可以嗎？」工作人員這樣問我。</p>
      <p>我點點頭。並在心裡驚嘆有這麼多人想要成為外送員。</p>
      <h2>只是一個「合作夥伴」</h2>
      <p>我提早 20 分鐘回到總公司的大樓。等待的同時非常安靜，其中男性佔了大多數，只有我和另一個戴著安全帽的女孩是女性。</p>
      <p>時間一到，走道尾端的會議室打開了門，我們走進去，迅速坐滿了兩張會議桌，大約 15 個人。一名工作人員拿著一張紙站在會議室中央，教我們使用 app，並再次複誦事前做的測驗中的幾項配送規則。</p>
      <p>「如果不小心發生車禍，」由於這一點是我最好奇的，我豎起耳朵聽著：「就回報客服，我們會派另一輛車將你的餐點載走⋯⋯」然後她繼續說明其他事項。</p>
      <p>咦？就這樣？那我如果嚴重昏迷到沒辦法回報呢？報警、送醫的過程中我需要留下什麼資料給公司嗎？</p>
      <p>那個瞬間，我突然理解了外送平台稱我們為「合作夥伴」的意思：對「媒合平台」來說，它在意的只有送餐的任務是否達成，因此，車禍現場它唯一需要擔心的只有可能被耽擱的那份餐點應該要怎麼辦，而不是倒在地上的外送員。</p>
      <p>只不過，對於「媒合平台」來說，我要如何完成這份工作，卻需要遵照各種規範：包括一定要帶保溫箱，而且要背在身上，確保餐點從餐廳取餐到送給客人的途中都好好的待在保溫箱內、一定要本人送餐、除了下雨以外不能穿短褲拖鞋、若抵達後客人不在，電話要打進客人的語音信箱後，在現場倒數 10 分鐘後回報客服，才能離開⋯⋯</p>
      <p>而且我還得對公司派給我的訂單照單全收。「如果你拒絕了太多訂單，會影響到你領取獎勵的資格。」工作人員補充。</p>
      <p>「沒有問題的話，就可以領保溫箱離開了。」我瞄了一下手機，不過才 20 分鐘，「保溫箱是 1000 元買斷，我們會從你的車資裡扣掉，不跑了的話你就自己處理掉⋯⋯」</p>
      <p>這是另一個與我認知不同的地方，根據我事前做的功課，保溫箱應該是用租的，等到不跑的時候把箱子繳回，就能退還押金。</p>
      <p>後來我才知道，其他外送平台也有類似的狀況：剛開始招募外送員的時候什麼裝備都用送的；等到外送員有一定的量，就變成用租的；最後要求外送員買斷，變成一個踏入這個行業必須付出的成本。</p>
      <p>「你們現在就可以上線，請記得在兩週內一定要跑至少一趟，之後要怎麼樣都可以。」工作人員說。</p>
      <p>就這樣，我正式成為美食外送平台的外送員，雖然有蠻多細節跟我一開始認知的不太一樣，但為了拿到這份工作，我只好同意。</p>
    </div>
  </article>
</template>

<script>
import FixedSlides from './FixedSlides.vue'
import PopUpNotation from './PopUpNotation.vue'

export default {
  name: 'ReportContent1',
  components: {
    FixedSlides,
    PopUpNotation
  },
  data () {
    return {
      fixedSlidesData: [
        {
          imgCount: 3,
          imgSrcs: [
            [
              '/proj-assets/food-delivery/img/report/step/report1-1-mobile-v2',
              '/proj-assets/food-delivery/img/report/step/report1-1-desktop'
            ],
            [
              '/proj-assets/food-delivery/img/report/step/report1-2-mobile-v2',
              '/proj-assets/food-delivery/img/report/step/report1-2-desktop-v1'
            ],
            [
              '/proj-assets/food-delivery/img/report/step/report1-3-mobile-v2',
              '/proj-assets/food-delivery/img/report/step/report1-3-desktop'
            ]
          ],
          texts: [
            {
              id: 1,
              content: 'READr 透過自製問卷，收到 139 位外送員的回覆，發現 22 至 40 歲是外送員年齡的大宗，但也有不少是學生兼職。根據業者提供的資料，空腹熊貓的外送員以 25 歲至 35 歲占最大比例，戶戶送則有八成外送員都是 26 歲至 45 歲。'
            },
            {
              id: 2,
              content: '問卷也顯示，兼職的外送員有 6 成收入都在 1 萬元以下；全職的收入則集中在 2 萬元至 6 萬元之間。'
            },
            {
              id: 3,
              content: '而「彈性的工作時間」是外送員們當初想從事這份工作最主要原因。根據業者的資料顯示，Uber Eats 有超過 50% 以上的外送員一週上線不到 10 小時。'
            }
          ],
          imgAspectRatio: [ 0.612, 1.586 ],
          breakPoints: [ 460 ]
        }
      ],
      notations: [
        '勞動部在 10 月底抽查，依照平台跟外送員的從屬關係，僅認定戶戶送為承攬制，其餘都為僱傭關係。'
      ]
    }
  }
}
</script>

<style lang="stylus">
</style>
