<template>
  <div>
    <main>
      <CoverVideo :isLapW="isLapW" />
      <ProgressIcon :length="progressL" @[touchOrClick].native="scrollToNext" />

      <BaseArticle ref="opening">
        <p>「年輕人赴海外工作人數屢創新高」、「臺灣人才外流」、「青年低薪」等議題長期佔據媒體版面，在「出國工作」的風氣彷彿浪潮席捲年輕世代時，卻有一小群在國外有穩定工作的青年「回流」臺灣定居。對這些人來說，臺灣有什麼不可取代的吸引力？回國是為了什麼？回到臺灣的他們過得好嗎？是否後悔當初的決定？</p>
        <p>READr 透過問卷調查<StoryNotation :notation="notations.opening[0]"></StoryNotation>與個案採訪描繪「海漂青年」的輪廓，並將這群在國外從事正職工作超過三年、最後選擇回來臺灣的年輕人定義為「回流青年」<StoryNotation :notation="notations.opening[1]"></StoryNotation>，試圖理解他們選擇離開或歸鄉的原因，以及這個現象對於臺灣的影響。</p>
        <h3>愈來愈多臺灣青年出國工作</h3> 
        <p>根據行政院主計處最新公布的統計，2017 年一共有超過 70 萬名臺灣人在海外工作，比起統計起始年 2009 年增加了 7.4 萬人。這些出國工作的臺灣人，超過 6 成是年齡低於 40 歲的青年。以臺灣人口結構來看，自 2012 年起，15 到 40 歲年輕人有 5% 在海外工作，在人口逐漸減少的情況下，出國工作的比例仍持續上升。</p>
        <BaseChart :chart="charts.opening[0]" />
        <p>以工作國別來看，有一半以上的臺灣人海外工作地點在中國（包含香港、澳門），其次是美國、東南亞地區。赴中國工作的人雖然在 2014 年開始下降，在總人數中仍超過一半；美國是臺灣人選擇海外工作的第二大國，有 12% 左右的海外工作者位於美國，且近 5 年赴美人數持續上升；東南亞地區<StoryNotation :notation="notations.opening[2]"></StoryNotation>的臺灣人約有 10 萬，約佔海外工作者的 14%，人數在 2012 至 2014 年間爆炸性成長後，近年微幅下跌。</p>
        <BaseChart :chart="charts.opening[1]" />
        <p>根據問卷調查結果，只有 18.6% 的受訪者明確表示「不打算回臺灣定居」，高達 53.2% 的受訪者填答「還不知道，走一步算一步」；但在喜愛度調查中，近五成的受訪者在「對臺灣的喜愛程度」給出滿分評價，對於自己身處的異鄉只有 19.3% 的人給滿分。顯示在海外的臺灣人多數熱愛台灣，這份愛卻無法成為讓他們回鄉工作的動力。臺灣究竟要如何應付人才外流的難題？</p>
      </BaseArticle>
      
      <div ref="storyWrapper">
        <BackgroundPageAll v-if="isLapW" :persons="persons" :idx="bgPageAllIdx" ref="backgroundPageAll" :style="{ marginTop: bgPageAllMarginTop }" />

        <VideoStory v-if="isMobW" ref="videoStory" />
        <BaseStoryVideo v-if="isLapW" ref="story0" />

        <!-- 若不加 key，多次變換頁面尺寸，BaseStory 就會亂掉 -->
        <BackgroundPage v-if="isMobW" :person="persons[1]" ref="backgroundPage1" />
        <BaseStory ref="story1" key="story1">
          <template #title>
            Ellen<br>地點：美國東岸、廈門、上海、香港
          </template>
          <template #intro>
            <p>「我不確定回臺灣的決定是不是對的，我覺得應該要在香港多待一點時間，學更多一點。因為我這個產業在臺灣很穩定，但沒有什麼大的案子，比較適合退休。」30 歲出頭的 Ellen 3 年前結束小留學生和海外打工仔的漂泊生涯，回到睽違 15 年的臺灣。但從事裝修顧問業的她，至今仍不確定是否會長留臺灣。</p>
          </template>
          <template #content>
            <BaseChart :chart="charts.story1[0]" />
            <p>第一次和 Ellen 見面是 2016 年，她剛到香港工作，我們碰面的西式咖啡廳位於一條窄小的斜路上，往上走會到富人雲集的半山豪宅區，往下走則是錢潮湧動的國際金融中心（IFC）、香港交易所。咖啡廳內佈滿綠色植栽，一杯咖啡配上有機餐點，要價超過 100 港幣（約 400 元新台幣），光顧這間咖啡廳的多半是在中環上班的商務人士，對聽不懂廣東話的 Ellen 算是一個小小的舒適圈，因為在此她可以用英文暢行無阻。</p>
            <p>Ellen 是美國公民，在臺灣長大，15 歲後赴美讀書，與妹妹兩人借住在親戚家。原以為 7 年學業結束後就會回來，最後回臺定居時居然已經相隔 15 年。「太多時間不在家人身邊」成為一種遺憾，讓大學畢業工作兩年後的她，尋找在美國設點的臺資公司，希望有機會透過外派的形式回鄉工作。</p>
            <p>但入職不久，臺資公司就被中國公司收購，她被派駐廈門。在廈門一年多，對中國有進一步的認識後，她認為要在中國有好的發展，就一定要去「一線城市」北京、上海、廣州、深圳。為了去上海，她選擇轉職，進入裝修顧問業當項目經理。在上海工作了 3 年多後，因為想去心目中「好像很厲害的金融大都市」香港工作，花了一段時間準備，如願進入在香港的外商裝修公司。</p>
            <p>這份工作的強度比 Ellen 想像中大，「過去在同一個產業工作 4 年的經驗，都沒有我在這裡半年來得多，我覺得香港真的是讓人成長很大的地方。」她在這家公司接觸到已經很優秀仍不斷進修的同事，經手預算比臺灣高出十幾倍的案子，「這才是真正做案子的地方」。 </p>
            <p>半年後，Ellen 收到同行另一家公司的面試邀約，由於新公司的規模、名氣都比原公司大，加上難得有在臺灣的職缺釋出，「出國這麼久，沒有在臺灣工作過，如果真的不適合，可能考慮以後再出去，所以雖然這個機會來得有點快，但是還是後來決定回來。」</p>
            <p>回到臺灣的 Ellen 與父母、妹妹一起住在桃園，終於有機會彌補心裡想多陪伴家人的遺憾。雖然每天花兩小時往返臺北，她仍堅持回家吃晚飯。而回臺灣工作的薪水比在香港少了三分之一，但住家裡省下了房租開銷，加上臺灣的物價相對低，讓 Ellen 覺得「拿到手上的錢其實差不多」。</p>
            <p>最讓她感到不安的是職涯發展，當被問到「臺灣職場相比國外有什麼優勢？」這個問題時，Ellen 對過去待過的美國、中國、香港職場的見解侃侃而談，說到臺灣時，她卻思索良久，苦笑：「我想不到，可以說沒有嗎？」她認為以裝修顧問業來說，臺灣的市場可說是發展成熟，意即不會一直有外資、外來公司湧入臺灣，就她的業務範圍，辦公樓裝修、辦公室搬遷的需求，比上海、香港少非常多，規模也遠不能比。</p>
            <p>由於擔心自己競爭力下滑，Ellen 時不時就會瀏覽臺灣或國外的求職網站，或和人頭獵人聊聊，了解市場脈動。她感覺身邊四、五十歲的同事都過著安穩等退休的日子，「這不應該是 30 多歲的我應該有的生活狀態。」</p>
            <p>因此即使現在與家人同住很開心，但她也不排除未來「為了追求更好的職涯」再度離鄉背井，她的首選是新加坡，或是美國加州。她也希望如她父母那般，將她的下一代送出國讀書，主要目的是培養語言能力，「方便進入國際大公司，和世界接軌」。</p>
          </template>
        </BaseStory>

        <BackgroundPage v-if="isMobW" :person="persons[2]" ref="backgroundPage2" />
        <BaseStory ref="story2" key="story2">
          <template #title>
            蔡裕杰<br>地點：美國德州、美國波士頓
          </template>
          <template #intro>
            <p>「那時候的工作沒有很喜歡，覺得在國外一陣子了，很多朋友、親戚都看不到，有一些長輩身體開始有狀況，我想要趁年輕，還能夠多跟他們相處的時候多跟他們相處。」現年 29 歲的蔡裕杰在美國求學、工作 5 年，目前在臺中從事國際運動品牌的供應鏈管理。</p>
          </template>
          <template #content>
            <p>蔡裕杰大學畢業後，先去澳洲打工度假一年半， 之後申請上德州的學校，2015 年取得供應鏈管理（supply chain management）碩士學位後，在德州歷經 3 份工作，2018 年開始，他隻身飛往東岸波士頓展開新工作，每天過著「生活只有工作，下班不知道要找誰」的孤單生活，同年 11 月，他賣掉車子、辭掉工作回臺灣。</p>
            <BaseChart :chart="charts.story2[0]" />
            <p>家人支持他回臺灣，但許多在臺灣工作的朋友勸他不要回來，因為臺灣的工作環境「不太好」。當時他抽到英國的打工度假簽證，也拿到在美國紐約的工作機會，但行事以感覺為重的他回憶：「覺得在美國的工作告一段落，就想回來。不知道為什麼，就跟著感覺走。」</p>
            <p>他在臺灣花了 3 個多月時間才找到符合自己期待的工作。在求職時，臺灣老闆開出他認為過低的薪水、要求過高的工時、年假和福利都比美國少一半以上，種種原因讓蔡裕杰一度感到沮喪。</p>
            <BaseChart :chart="charts.story2[1]" />
            <p>「臺灣公司能談薪資的幅度很少，但在美國，員工能跟老闆談薪水的幅度是很大的，公司是能力導向，會根據你的能力去評估，不會怕年輕人做到比較高的位置，但臺灣比較經驗導向，認為你在職場越久你越有價值，比較不看你的實力。」蔡裕杰觀察。</p>
            <p>他覺得自己算是幸運，在美國這個供應鏈大國有過相關工作經驗，熟悉和美國人溝通的方式，以及跨文化溝通裡的「眉眉角角」，讓他找到一份位在臺灣、但氛圍「比美國還美式」的工作，負責與美國總部、臺灣廠商、臺灣廠商的東南亞供應商溝通。由於是國際部門，他工作時用的是英語，同事是外國人比例也頗高，因此沒有「無法適應臺灣職場」的問題。</p>
            <p>雖然工作堪稱順利，重回臺灣的生活仍需要磨合。在美國的生活像戴上眼鏡看新事物，漸漸習慣了以後，回臺灣反而不適應。讓他感到困擾的主要是人際互動，「美國人表達比較直接，我為了融入，花了 5 年轉成美式思維，但回臺灣發現很多人對很多事都不好意思講。」加上過慣了美國的生活步調，「覺得在臺灣每天生活都很緊湊，好像每天都把很多事情塞在一天完成。」</p>
            <p>在臺中的生活漸漸上軌道後，蔡裕杰開始學習日文，希望有機會能到日本工作。由於「冒險型」是他給自己個性的定義，他不排斥未來再度出國，「不是因為臺灣不好，對我來說，是對不同文化的嚮往的拉力大於推力」。</p>
          </template>
        </BaseStory>

        <BackgroundPage v-if="isMobW" :person="persons[3]" ref="backgroundPage3" />
        <BaseStory ref="story3" key="story3">
          <template #title>
            曾鈺茜<br>地點：美國佛羅里達州
          </template>
          <template #intro>
            <p>「服務美國農業，錢可能多很多，可是我對臺灣的 bonding （連結）特別強大，會覺得我要服務，就要服務臺灣人。」炎熱的正午時分，曾鈺茜穿著雨鞋，和學生一起在嘉義大學的實驗農場割稻子，對臺灣土地與人的熱愛讓她回到闊別 8 年的故鄉。</p>
          </template>
          <template #content>
            <p>現年 30 歲的曾鈺茜從台大農藝系畢業後，赴美國佛羅里達大學（ University of Florida）攻讀博士學位，畢業後從事博士後研究。在美國待了 8 年後，她接下了嘉義大學農藝系助理教授的教職，回到家鄉嘉義，與家人、在美國認識結婚的美國籍老公一起住在離學校車程不遠的老家。</p>
            <p>曾鈺茜的手臂上有兩個刺青，一個是老家的經緯度，一句是英文 “I open at the close”，出自《哈利波特》，她說：「這一句，中文翻譯是『我在結束時開啟』，離開美國開啟臺灣的生活，或許在人生中很像是個重大轉變，但也不用想太深遠。上帝關了一扇門，會幫你開另一扇窗。」</p>
            <p>她的辦公室牆上掛著飛鏢標靶，另一面牆用各式啤酒罐裝飾。家庭文化本來就比較「美式風格」的曾鈺茜，到了美國完全沒有適應不良的問題。她不覺得美國有臺灣人刻板印象中得那麼好，「哪裡都要開車，而且農業區都很偏僻，不是很熱就是很冷。每天都要自己煮飯，而且朋友也不是天天開趴，家人不在身邊，認識老公之前的很長時間我都是一個人，雖然不是非常孤單到難以忍受，但就有點⋯⋯就都是一個人。而且那時候單純就覺得，也 8 年了，可以回家一下。」</p>
            <BaseChart :chart="charts.story3[0]" />
            <p>當年出國，曾鈺茜唯一的目標就是完成博士學位。畢業之後，她希望能在美國這個農業大國多留幾年，精進所學。由於不是依循大多數想要移民美國的人「拿工作簽證之後轉綠卡（美國永久居留證）」的途徑，她只挑自己喜歡的工作。幸運地，她在能發揮所長的實驗室擔任管理職，職務內容約等於中階主管，美國老闆也鼓勵她繼續留美，看似不錯的發展前景，讓她猶豫到最後一刻才接下嘉大的聘書。</p>
            <p>「我最後決定回來的關鍵原因是家人。我現在天天回家，晚上跟家人吃飯，週末跟家人看電影，好像又回到小時候，跟我媽跟我弟一起互動的情景。」</p>
            <BaseChart :chart="charts.story3[1]" />
            <p>只不過，回到臺灣後的職場文化讓她有些沮喪。在美國，同事間感情很好，「大家常一起喝酒聊學術、聊人生，整個系的融合度很高，但臺灣完全都不是這個樣子。而且我是系上唯一的女老師，臺灣可能就『男女性平』還是怎麼樣，我也不太懂，男同事不太敢進我辦公室。而且因為跟同事年齡差距很大，跟他們也不是很熟，就各自做各自的。」</p>
            <p>身為新手教授需要負擔許多教學任務，當被問到「覺得臺灣職場相比國外有什麼優勢？」她的回答是：「講國語！」但旋即尷尬地說：「這樣算優勢嗎？」對比在美國備課「很辛苦」，「講笑話還要先想一下」，在臺灣就可以自在地發揮。</p>
            <p>政治也是曾鈺茜回臺灣的主因之一。她在美國加入 FAPA<StoryNotation :notation="notations.story3[0]"></StoryNotation>和海外臺灣青年陣線<StoryNotation :notation="notations.story3[1]"></StoryNotation>。在 FAPA 期間，她和成員到國會遊說，希望美國議員可以支持一些臺灣的法案，她說：「因為臺灣政府有時候很難施得了力，反而民間力量會是重要的力量。」</p>
            <p>「我打死都不想當中國人。」她不諱言自己的政治立場，「我以前政治立場比較偏藍，可我出國之後，整個人調性就換了，變得滿希望臺灣是一個國家的。出國後我也更瞭解其他國家對臺灣的立場和態度——他們基本上都承認臺灣這個地方，可是完全不承認中華民國這個國家。」</p>
            <p>曾鈺茜的辦公室窗外可以望見嘉大農學院綠意盎然的校園，時不時會有學生駕著實習耕耘機開過。她望著窗外說：「我回來就是要服務臺灣的農民，所以可能跟商業的人想法不太一樣。商業可能是駐足臺灣，放眼天下，可對我來講，我其實就只是 care 臺灣，我在意我可不可以孕育出好品種？對臺灣人有沒有幫助？」</p>
            <p>她熱愛臺灣這塊土地，但仍有移民的可能。她說：「我的選擇就是 depends on（依據）臺灣人民的選擇，如果你要朝香港的路上一直毀壞下去，我會陪你們到船沈，但我會搭著小船走掉。就算 2020 年的選舉結果很可怕，我還是會再待一下，讓我看看子彈怎麼飛。」</p>
          </template>
        </BaseStory>

        <BackgroundPage v-if="isMobW" :person="persons[4]" ref="backgroundPage4" />
        <BaseStory ref="story4" key="story4">
          <template #title>
            張哲輔<br>地點：德國慕尼黑
          </template>
          <template #intro>
            <p>「要是回臺灣能為 AI 這個還在發展中的產業做點事，讓臺灣更強大一點、在世界上更有籌碼一點，更能抵抗中國的侵略，我多多少少是抱持著這種心態轉行回來寫程式的。」採訪當天，張哲輔穿著寫有「厭世」的黑色 T-shirt，走在過去他熟悉的臺大校園中。</p>
          </template>
          <template #content>
            <p>現年 32 歲的張哲輔，從小就夢想要從事和賽車有關的職業，因為臺灣沒有專門的「賽車系」，他選擇就讀臺大物理系雙修機械系，畢業後赴德國慕尼黑修讀汽車動力學相關的碩士學位。取得學位後，他主動寫信給知名德國汽車大廠，獲得了在大廠外包商的賽車部門任職的機會。</p>
            <p>他在這間公司待了 5 年多，做著夢想中的職業，福利完好，一年有 30 天有薪年假、一天固定工時 8 小時，還已經拿到德國永久居留，也喜歡德國的文化與社會氛圍，但他還是做出與大多數在德國的臺灣朋友不同的決定。「我確實是很少數過得很爽又回來的。」張哲輔直言，他大部分的朋友都選擇留在德國，只有不到 20% 的人因為「不喜歡德國」或「找不到工作」回臺定居。</p>
            <p>從留學到工作，他在德國待了超過 8 年，但從沒想過移民：「我沒有辦法想像我一輩子待在國外，不回臺灣。家人都在臺灣，臺灣畢竟是故鄉。」</p>
            <BaseChart :chart="charts.story4[0]" />
            <p>但驅使他回臺灣的最大拉力不只是家人，還有「想為臺灣貢獻」的一份心意。2014 年的太陽花學運讓他強烈感受到與臺灣命運的連結：「人到了國外之後才會開始慢慢的回頭去看臺灣，就發現臺灣對自己來說其實比想像中更重要，更希望臺灣好。尤其在學運的時候，人在國外那種無力感非常強。明明知道國家快滅亡了我還在國外做什麼！之後我就還滿確定，基本上一定會回去，只是時間早晚問題。」</p>
            <p>夢想從事賽車業的他，由於臺灣沒有相同等級的汽車產業，他幾經猶豫，決定轉行當軟體工程師。放棄夢想會覺得可惜嗎？張哲輔說，想做的事在德國都已經做到了，「沒有什麼一定要在國外得到的事了」。</p>
            <p>他希望自己「為臺灣好」的心意不只體現在選舉時飛回來投票，也希望能將國外所學的技術——特別是 AI 相關的部分——或多或少帶回臺灣，讓臺灣的科技產業走得更前，在國際上能更有話語權。張哲輔認為臺灣人不應該過度自卑，「臺灣的科技業非常強，技術和研發能力都不輸國外，服務也是一流，臺灣人的工作表現和對工時的彈性調整能力都非常強。」</p>
            <p>雖然回臺灣薪水降低，但他的薪水已經優於其他同行，而且臺灣的稅率比德國 40% 的稅率低很多，生活品質並沒有下降，「在臺灣甚至還更敢花一點，因為在臺灣吃的東西比較好吃。」張哲輔說。</p>
            <p>比較不能適應的，是臺灣職場沒有考慮員工的私人生活與工作績效之間的關係，年假、福利相比德國遠遠不足。採訪當天，他略為抱歉地說自己腳痛走不快，「我剛從挪威健行回來。我請事假去的，基本上你就是用錢去買回你的休假。」</p>
            <p>回臺灣後，張哲輔多次被問是否考慮回德國，他老實地說，2018 年公投結果出爐後，確實有想離開的念頭，但他後來想：「反正臺灣就是個天天都在面臨生存危機的地方，所以與其覺得樂觀或悲觀，不如學習跟這種『亡國感』共處，然後實際做些什麼，還更重要些。」</p>
            <p>他還是會定期入境歐洲，確保他的永居身份有效，他覺得永居身份像是「保險」，讓他「在最壞狀況還能把家人帶走」。張哲輔說：「但我真心沒有想回德國的意思，或是說，想當然是想回去，畢竟在德國過這麼爽，但我很確定我不會只是為了讓自己過得爽而回去。」</p>
          </template>
        </BaseStory>

        <BackgroundPage v-if="isMobW" :person="persons[5]" ref="backgroundPage5" />
        <BaseStory ref="story5" key="story5">
          <template #title>
            Sunny<br>地點：法國巴黎、英國倫敦、澳洲雪梨
          </template>
          <template #intro>
            <p>「分手之後其實可以不要回來，但我也沒有很喜歡雪梨。臺灣有無敵多的獨立書店，我需要那種遍地的文化活動。」就讀中文系的 Sunny，大學時當了兩次交換學生，一次去法國，一次去英國，研究所因為實習來到澳洲，一待就是兩年半。</p>
          </template>
          <template #content>
            <p>就讀中文系的 Sunny 熱愛文學與藝術，嚮往歐洲的文化氛圍。她在澳洲時，特別想念臺灣的各式文化活動，「像是有賣詩集、獨立出版品的書店，獨立小劇場的演出，我也很喜歡臺灣的民俗活動，像是東港王船祭我全程都有參加。」她原本的夢想是在國外當臺灣文學的教授，在國外發表論文，幫助臺灣文學在世界文學中嶄露頭角。</p>
            <p>她在臺灣文學研究所入學前的空檔，進入一家網路公司任職，負責寫電商的文案，這是她初次接觸數位行銷。在臺文所的第一個暑假，她到澳洲雪梨從事為期 6 個月的數位行銷實習，與一名法國人認識、交往，讓她暫時放下了夢想，和男友在雪梨住下來，開始專職從事數位行銷。</p>
            <p>待了兩年半後，她與男友分手，由於澳洲沒有特別吸引她留下來的文化活動，她離開了入職半年、負責知名品牌行銷的工作回到臺灣。</p>
            <p>福利比臺灣好、工作氣氛輕鬆、做的案子又有國際能見度，當被問到：「放棄這份工作會覺得可惜嗎？」Sunny 表示，當然會遺憾，「但比不上『覺得很無聊』，而且沒朋友、沒有歸屬感。」</p>
            <p>回到臺灣後，她一年換了 4 個工作，都是行銷、新創領域。她不能適應相比於澳洲更為制式的職場文化，幾點上班打卡、加班強度、老闆是否會要求員工「聽話」，都是她在試用期會嚴加評估是否待下來的因素。</p>
            <p>「臺灣人很比較不在意 work-life balance （工作與生活平衡），所以他可以為公司效力的時間長。像國外，我在澳洲下班還去衝浪，我們都 3 、4 點下班，10 點才上班，然後禮拜五大概從 12 點就開始喝酒。臺灣就是全部的人都太熱愛工作，生命的 80% 都投資在工作。」</p>
            <p>目前 Sunny 在一家臺灣新創公司任職，負責一項在高雄推廣共享電動機車的行銷業務，本身是高雄人的她，覺得現在做的事很有意義，「能讓自己的家鄉變得更好，比在國外幫人賺錢有意義。」</p>
            <p>但她坦言，還是想離開臺灣到國外長居。「臺灣的 work-life balance 比例太低了，而且除了上班時間之外，公司給員工的福利非常非常少。」她接著說：「臺灣薪水太低活不下去！我在臺北完全存不了錢，我要去一個存得了錢的地方。」</p>
            <p>Sunny 已經拿到法國商學院研究所入學許可，今年年底前就會出發。她希望未來能長久生活在一個工作與生活平衡、天氣好、空氣好、而且「有民主自由，可以免於中國威脅」的地方。對於移民算是心意堅定的她，心裡還是卡著一道檻，「我希望在臺灣養育我的小孩，我很喜歡臺灣的民俗文化。如果我的小孩不會講中文，養出來是跟我不同文化的人，我會覺得很悲傷。」</p>
            <BaseChart :chart="charts.story5[0]" />
            <BaseChart :chart="charts.story5[1]" />
            <p>剛滿 30 歲的她表示：「我不希望自己人生是可以一眼望到盡頭的，叫我講 3 年職涯規劃，我根本講不出來。我是那種喜歡一直變動的人，水瓶座，善變、需要自由。」</p>
          </template>
        </BaseStory>

        <BackgroundPage v-if="isMobW" :person="persons[6]" ref="backgroundPage6" />
        <BaseStory ref="story6" key="story6">
          <template #title>
            Jacy<br>地點：加拿大、香港
          </template>
          <template #intro>
            <p>「當初是有其他的工作機會在香港，當然薪資會更高，可是考量在香港就要讓小孩去念國際學校，我不喜歡那種高壓的環境。」現年 38 歲的 Jacy 因為要帶 5 歲的小孩去看醫生，匆匆結束採訪。他的獨生子就是他決定回臺灣的關鍵理由。</p>
          </template>
          <template #content>
            <p>Jacy 在臺灣出生，父親是移民加拿大的香港人，母親是臺灣人，因此他同時具有臺灣、香港、加拿大的身份。他在臺灣受教育，一年之中在香港、臺灣、加拿大的時間約各佔三分之一。</p>
            <p>研究所他赴加拿大求學，但因為要照顧生病的外婆，未完成學業就回到了臺灣，開始工作。2009 年，他的太太（當時尚未結婚）獲得在中國舉辦的服裝設計比賽獎項，因緣際會之下打開了西進中國的窗。隔年開始，他和太太相繼去香港從事設計相關工作，直到 2015 年被獵人頭找上，希望他回臺灣負責一項國際運動品牌設立創新研發中心的案子 。</p>
            <p>「女生大概 30 歲，男生差不多 35 歲，會思考要繼續留下來還是回臺灣。」Jacy 分享他的觀察，「我自己就是 35 歲左右回來的。」</p>
            <p>Jacy 在香港生活近 7 年，外界印象中喧囂、忙碌、競爭的香港，對他來說「就只是一個工作的地方，沒有什麼適應不適應的問題」。下一代的教育問題，才是他考量繼續留在香港與否的關鍵，「或許從他們的角度來說是菁英教育，但我有點排斥讓孩子從小就開始受填鴨式教育。」</p>
            <p>從香港回到臺灣工作，Jacy 的薪水少了整整一半，「我要小朋友的教育，所以我選擇砍半無所謂。」</p>
            <BaseChart :chart="charts.story6[0]" />
            <p>雖然薪資不如香港，但臺灣在 Jacy 眼中還是有其無可取代的優勢。以他熟悉的設計、研發業界而言，名片上印的是臺灣還是中國，就會有區別，「我相信你可能問 10 個日本人，大概至少有 5 個以上，看到臺灣名片去交換資料的時候，他會願意透露更多，或更願意溝通，比較不會擔心談的想法或技術外流。大家比較會提防中國人。」</p>
            <p>未來是否考慮定居在臺灣以外的地方？Jacy 仍以小孩為優先考量，如果小孩想到國外，就會回加拿大；如果不想出國，應該會留在臺灣，至少在亞洲。在他眼中，亞洲的景氣比歐美更好，「其實亞洲的工作機會比較多，市場也比較大。偏管理層或者是做開發、商業類的機會都多。」</p>
          </template>
        </BaseStory> 
      </div>

      <BaseArticle ref="final">
        <h2>面對人才跨國移動，臺灣如何從中獲利？</h2>
        <h3>人才移動很普遍，但臺灣「沒有人進來」</h3>
        <p>「人才的跨國移動是全球化之後的普遍現象。」臺灣大學社會系教授曾嬿芬指出。財團法人青平台基金會研究中心主任葉懿倫也認為，不必先入為主將「人才移動」貼上負面標籤，「多點交流可以為臺灣產業帶來好的質變。」</p>
        <p>但臺灣現在面臨的問題是「入不敷出」，青平台董事長、現任中央大學經濟學系教授邱俊榮說：「健康的全球化應該是有人出去，也有外國人進來為臺灣所用，是互動的。但臺灣沒有人進來，這就是問題。」青平台社會培力中心主任劉璐娜補充，臺灣高等教育培養出高素質的人力，但這些人力卻為國外所用，沒有在培育他們的臺灣社會貢獻己力，是很可惜的一件事。</p>
        <p>青平台研究助理陳冠霖指出，國外企業主喜歡僱用臺灣人，是因為相較於其他民族，臺灣人個性溫和，沒有排他性宗教觀和民族意識，加上工作勤奮、願意配合彈性工時。</p>
        <p>以人資的觀點來看，上海經睿人才服務有限公司總監許慈芳認為，臺灣人跨文化溝通的能力較突出，熟悉中華文化，對西洋、日本文化的掌握度也相對中國人高，加上臺灣護照在許多國家都免簽，方便隨時安排出差，讓臺灣人才在國際上、特別是在中國市場具有優勢。</p>
        <h3>年輕人更愛臺，外漂常有無奈感</h3>
        <p>近年研究臺灣年輕人赴海外工作情況的曾嬿芬提到，她的受訪者有些自稱「臺漂」，他們出國的心態不像父輩祖輩那般，因為嚮往國外生活想移民。年輕世代的海外臺灣人，大部分還是喜歡、並認同臺灣的社會文化與生活。他們「漂」在外地有種無奈感，「是不得已的漂，他們對臺灣的經濟、工作條件有所不滿，不是對社會不滿。」</p>
        <p>曾嬿芬指出，以前工業發達的國家（例如歐美），在政治、經濟方面對臺灣人都具有吸引力。現在雖然大家對臺灣的「低薪」、「高房價」、「責任制的職場文化」有所批評，但臺灣年輕人對於「臺灣是民主社會」的認同很強，以臺灣的政治發展為傲。</p>
        <p>在 READr 的問卷調查中，大多數在國外工作的年輕人非常喜愛臺灣，對自己現在工作國家的滿意度比不上對臺灣的喜愛程度，但問到有沒有回臺打算時，卻有一半以上的受訪者沒有明確的回臺時間表。曾嬿芬倒是認為這些人回臺的可能性很高，她的初步研究訪談結果呼應我們的問卷結果——許多受訪者說，如果臺灣在薪資、工作發展上有改善的話，他們會想回來，因為臺灣始終是他們有認同感、熟悉感並且具有情感連結的故鄉。</p>
        <h3>薪資凍漲、工作機會兩極化</h3>
        <p>但為什麼喜歡臺灣的年輕人仍持續出走？從各界的研究來看，臺灣實質薪資凍漲，產業結構上也面臨後工業化的轉型衝擊。</p>
        <p>如中研院經濟所助研究員楊子霆的研究顯示，臺灣實質薪資凍漲，在 2002 年之後，代表「生產品價格」的 GDP 平減指數逐年衰退，反映「消費品價格」CPI 則持續上漲，兩個物價指數走勢出現巨大反差。「以國內產出的購買力來看，臺灣的經濟早已出現停滯。」楊子霆在<a href="http://research.sinica.edu.tw/taiwan-economic-salary-yang-tzu-ting/" target="_blank">中研院的專訪中</a>小結研究成果。</p>
        <p>又例如臺灣師範大學教育學系助理教授張宜君的研究<StoryNotation :notation="notations.final[0]"></StoryNotation>指出，臺灣勞動市場結構歷經 30 多年變化，出現工作類型「兩極化」的現象——例行性、勞力密集度高的工作，被新科技取代，勞動力因此流向無法被取代、但薪資福利不佳、甚至沒有勞健保的臨時工性質的服務業。低薪不穩定的服務業工種與需要高技術、高教育水平的高薪職位需求同時增加，中階工作因而消失，能力不足以找到高技術工作的人才，因為中階工種的缺乏，被迫要「向下找」工作。</p>
        <p><a href="http://pr.ntnu.edu.tw/newspaper/index.php?mode=data&id=38486" target="_blank">張宜君在 2018 年撰文</a>指出，教育水平會很大程度影響日後人們從事的工作及收入，但隨著產業轉型，現實勞動市場上的「好工作」、「壞工作」並不會隨著高等教育擴張分佈，受高等教育者不見得能找到滿意的工作。當整體產業升級、高薪工作增加時，勞動者較易找到高薪且待遇合理的「好工作」；但如果勞動市場條件惡化，低發展性、低薪且不穩定的「壞工作」充斥時，即使有高技術高學歷的勞動者都無法找到「好工作」。</p>
        <p>而這些因素皆間接導致了臺灣人才外流問題。對此，政府已啟動一系列留才、攬才、育才政策。國發會就強調，「5+2 產業創新計畫」、「前瞻基礎建設計畫」、「投資臺灣三大方案」都是改善經濟及產業情勢，打造友善人才發展環境的政策。</p>
        <h3>問題出在產業界？</h3>
        <p>在鼓勵新創產業根留臺灣方面，國發基金「創業天使投資方案」截至 2019 年 7 月底已審議通過投資 46 家新創事業。鼓勵海外人才回流方面，則有教育部的「博士後研究獎助計畫」、科技部「海外人才歸國橋接方案」等等。</p>
        <p>青平台董事長邱俊榮認為，政府的政策是輔助性質，若要從根本解決臺灣的結構性問題，「產業面的改革」才是最重要的。邱俊榮分析，臺灣的中小企業多，資本額較小、相互競爭程度高，業界在節省成本的思維下，不願意花錢培養人才。</p>
        <h3>研究證實大型外資進駐可帶動當地薪水上漲</h3>
        <p>青平台社會培力中心主任劉璐娜認為，要改善臺灣就業環境，甚至進一步吸引臺漂回流，政府的主要職責有二。第一是「維繫現在這些公共福利系統的永續性」，例如全民健保、年金制度等等，因為這是臺灣讓人願意留下來的重要吸引力。</p>
        <p>第二是「打造國外優質企業來臺投資的環境」，大型企業進駐帶動當地薪水上漲的說法，在張宜君的研究中獲得證實。她指出：「大企業為了追求更高的生產效率，期望透過聘僱條件較好的勞動者來維持生產力，也同時為了留住人才而提供較優渥的薪資條件。」透過引進外資，提升平均薪資、創造更人性化的勞動環境，在競逐人才的壓力下敦促臺灣本土企業升級。</p>
        <p>對於民間冀望政府打造投資環境的訴求，國發會表示，政府為暢通人才回流管道，已積極推動相關措施，包括今年 6 月拍板經濟部提出的「投資臺灣三大方案」：歡迎臺商回台 2.0 行動方案、根留臺灣企業投資方案、中小企業投資方案，透過優惠貸款、提供土地水電與稅務等專屬服務窗口等專案政策，讓工商界可以更放心加碼投資，預期能創造 1 兆 1750 億新台幣的投資與超過 10 萬個臺灣勞工就業機會。</p>
        <p>留住人才的重擔不應該全落在政府身上，「政府不是發薪水的人，但如何創造友善的環境和友善的法規面？這是可以提出來討論的。」劉璐娜說。</p>
        <p>從問卷和訪談結果來看，許多想回流或已回流的人，回臺原因是家庭因素。葉懿倫進一步探討：政府可否從初階的補助投資、法規修訂，進階到改革勞動環境，讓臺灣與國外的勞動環境的差距降低？如受訪者提到的薪資減半、在臺灣市場規模小很多、職場文化難以適應等問題等，都需要更健全的環境，讓回流者能順利與臺灣職場銜接，讓他們發揮在海外的經驗，為臺灣產業升級做出貢獻。</p>
        <h3>數位經濟是臺灣的未來？</h3>
        <p>國發會主委陳美伶也呼籲「臺灣人要有信心」，對全球人才競逐的趨勢應該要樂觀看待，臺灣的半導體在全球佔有不容忽視的地位，臺灣的創新能力、設計能力，都在國際上獲得肯定。而在數位經濟的浪潮下，臺灣的產業轉型和升級將會創造許多優質的工作機會，不僅是科技相關產業，服務業也能升級成資訊服務業，「我們只要條件好，會吸引其他外國人來，也會有很多人留在這裡、會有很多人回來。」</p>
      </BaseArticle>

      <TheFooter ref="footer" /> 
    </main>
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill'
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}
import { debounce, checkMob } from './util/tool.js'

import CoverVideo from './components/CoverVideo.vue'
import ProgressIcon from './components/ProgressIcon.vue'
import VideoStory from './components/VideoStory.vue'
import BaseStoryVideo from './components/BaseStoryVideo.vue'
import YouTube from './components/YouTube.vue'
import BaseStory from './components/BaseStory.vue'
import BaseChart from './components/BaseChart.vue'
import StoryNotation from './components/StoryNotation.vue'
import BaseArticle from './components/BaseArticle.vue'
import TheFooter from './components/TheFooter.vue'

// FT = fine tune = 微調
const FT_OFFSET_TOP = 8

export default {
  name: 'OverseasTaiwanese',
  components: {
    CoverVideo,
    ProgressIcon,
    VideoStory,
    BaseStoryVideo,
    YouTube,
    BackgroundPage: () => import('./components/BackgroundPage.vue'),
    BackgroundPageAll: () => import('./components/BackgroundPageAll.vue'),
    BaseStory,
    BaseChart,
    StoryNotation,
    BaseArticle,
    TheFooter
  },
  metaInfo () {
    return {
      title: '海海人生：「回流青年」的告白',
      description: '根據行政院主計處最新公布的統計，2017 年一共有超過 70 萬名臺灣人在海外工作，超過 6 成是年齡低於 40 歲的青年。READr 透過問卷調查與個案採訪描繪「海漂青年」的輪廓，並專訪 7 位在國外工作後決定回到臺灣的「回流青年」，試圖理解他們選擇離開或歸鄉的原因，以及這個現象對於臺灣的影響。',
      metaUrl: 'overseastaiwanese',
      metaImage: 'overseastaiwanese/img/og.jpg',
      customScript: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" integrity="sha256-gvEnj2axkqIj4wbYhPjbWV7zttgpzBVEgHub9AAZQD4=" crossorigin="anonymous" />'
    }
  },
  beforeMount () {
    this.wEl = window
    // this.htmlEl = document.documentElement
    this.ww = this.wEl.innerWidth
    // this.wh = this.htmlEl.clientHeight
    this.wh = this.wEl.innerHeight
    // this.ww = this.htmlEl.clientWidth
    this.beforeWw = this.ww
  },
  mounted () {
    this.lazyers = document.querySelectorAll('.lazyer')
    this.isMounted = true
    this.wEl.addEventListener('scroll', debounce(this.lazyLoad, 50))
    this.wEl.addEventListener('resize', debounce(this.lazyLoad, 50))
    this.wEl.addEventListener('orientationChange', debounce(this.lazyLoad, 50))

    this.wEl.addEventListener('scroll', this.doProgresses)
    this.wEl.addEventListener('resize', debounce(this.alterWindowWidth, 300))
    this.wEl.addEventListener('orientationChange', debounce(this.alterWindowWidth, 300))
    if (this.isLapW) {
      this.wEl.addEventListener('scroll', this.controlBackgroundPageAll)
    } else {
      this.wEl.addEventListener('scroll', this.fixedBackgroundPages)
    }
  },
  data () {
    return {
      ww: 0,
      wh: 0,
      beforeWw: 0,
      wEl: null,
      // htmlEl: null,
      isMounted: false,
      bgPageAllIdx: 0,
      bgPageAllMarginTop: 0,
      progressL: 0,
      clickFreq: 0,
      isStopProgress: false,
      isStopFixedBgPage: false,
      checkMob: checkMob(),
      lazyers: [],
      persons: [
        {
          id: 0,
          name: '',
          bgColor: 'black',
          title: ''
        },
        {
          id: 1,
          name: 'Ellen',
          bgColor: 'pink',
          title: '睽違 15 年回臺，北桃通勤仍堅持天天在家吃晚飯'
        },
        {
          id: 2,
          name: '蔡裕杰',
          bgColor: 'green',
          title: '善用海外經驗，回臺找到風格「比美國更美式」的職場'
        },
        {
          id: 3,
          name: '曾鈺茜',
          bgColor: 'pink',
          title: '在美國始終是「幫別人賺錢」，踩在臺灣的土地上才開心'
        },
        {
          id: 4,
          name: '張哲輔',
          bgColor: 'green',
          title: '在德國完成兒時夢想，想回臺讓科技業更強大'
        },
        {
          id: 5,
          name: 'Sunny',
          bgColor: 'pink',
          title: '在國外生活與工作時間平衡，但臺灣「遍地文化活動」不停呼喚'
        },
        {
          id: 6,
          name: 'Jacy',
          bgColor: 'green',
          title: '為了孩子的教育回臺定居，「薪水砍半」無所謂'
        }
      ],
      charts: {
        opening: [
          {
            id: 'opening1',
            caption: '資料來源：行政院主計總處',
            isLazy: false,
            aspectRatio: 604 / 800
          },
          {
            id: 'opening2',
            caption: '資料來源：行政院主計總處<br>註：東南亞包括汶萊、緬甸、柬埔寨、印尼、寮國、馬來西亞、菲律賓、新加坡、泰國、越南。',
            isLazy: true,
            aspectRatio: 764 / 800
          }
        ],
        story1: [
          {
            id: 'story1-1',
            caption: '高達一半以上的受訪者對於「回臺」沒有明確時間表。完全不打算回臺者僅佔 18.6% ，顯示大部分的人對於回臺與否仍有討論空間。原始問題為：計畫從現在開始的幾年之後回臺灣定居？選項為「 1 年以內」、「1-3 年間」等時間區段，以及「不打算回台定居」、「還不知道」、「走一步算一步」共 9 個選項。原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            isLazy: true,
            aspectRatio: 435 / 800
          }
        ],
        story2: [
          {
            id: 'story2-1',
            caption: '在國外工作，有海外高等教育學歷是必要的嗎？從問卷結果來看，在亞洲工作比較不需要。且從行業別來看，特別在設計／藝術相關、教育／學術研究、金融領域有超過 6 成有海外學歷。原始問題為：您是否有海外高等教育學歷？選項為「無」、「有海外碩士學位」、「有海外學士學位」等 4 個選項，並依照填答者的所在位置進行統計。原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            isLazy: true,
            aspectRatio: 735 / 800
          },
          {
            id: 'story2-2',
            caption: '以推拉理論而言，臺灣職場的推力與國外就業的拉力是一體兩面的。原始問題為：為什麼想離開臺灣到海外工作？此為多選題，填答者可在「覺得在臺灣工作發展有限」、「薪水太低」、「工時、福利不佳」等 6 個選項中選 2 項；以及：吸引您到海外就業的原因？同樣為多選題，填答者可在「薪資條件好」、「工時、福利比臺灣好」、「想成為國際化人才」等 13 個選項中選 4 項。原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            isLazy: true,
            aspectRatio: 646 / 800
          }
        ],
        story3: [
          {
            id: 'story3-1',
            caption: '在問卷列出的 8 個選項中，「想念臺灣親友」是多數海外臺灣人難以克服的關卡，對於在非母語國家討生活的臺灣人來說，「語言隔閡」是無可避免的難題。而在幾乎沒有語言隔閡的中國，「職場行事風格差異」則為最大障礙。問卷原始問題為：您在海外生活時，覺得最難克服的障礙？此為多選題，填答者在想念臺灣親友、語言隔閡、職場行事風格差異等 10 個選項，最多可選 3 項。統計時依照受訪者填答的工作區域進行分類。原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            isLazy: true,
            aspectRatio: 615 / 800
          },
          {
            id: 'story3-2',
            caption: '在 16 個選項至多選 5 項的多選題中，「想陪伴家人」和「臺灣有更好的工作機會」是讓人想回臺的兩大原因，遠遠高出第三名選項「自身健康出問題」。原始問題為：在什麼情況下會考慮回臺灣定居？此為多選題，填答者在想多陪伴在臺灣的家人朋友、臺灣有更好的工作機會、自身健康出問題等 17 個選項中可選 5 項。原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            isLazy: true,
            aspectRatio: 642 / 800
          },
        ],
        story4: [
          {
            id: 'story4-1',
            caption: '在不同地區工作的臺灣人，停留在當地的時間長短也有所不同。在亞洲地區工作者， 69% 在 5 年之內會離開該國或地區，停留 5 年以上者佔 31%。在大洋洲、北美洲、歐洲工作的臺灣人，留在當地 5 年以上的比例則佔 47.8% 。原始問題為：包含求學和工作，至今累計在海外生活多久了？選項是「未滿 1 年」、「1 - 3 年」等 6 個時間區段。原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            isLazy: true,
            aspectRatio: 315 / 800
          }
        ],
        story5: [
          {
            id: 'story5-1',
            caption: '70% 以上的受訪者有從臺灣移民到他國的意願。原始問題為：有考慮過移民海外嗎？原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            isLazy: true,
            aspectRatio: 697 / 800
          },
          {
            id: 'story5-2',
            caption: '598 名問卷受訪者表示有移民意願，當中「追求更好的生活品質」是這些人想移民的主因。「擔心臺灣政治情勢發展」則位居想移民原因的第三位。原始問題為：考慮過移民的原因？此為多選題，填答者在追求更好的生活品質、想讓下一代在比臺灣更好的環境中成長、擔心臺灣政治情勢發展等 5 個選項中選 2 項。原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            isLazy: true,
            aspectRatio: 783 / 800
          }
        ],
        story6: [
          {
            id: 'story6-1',
            caption: '從問卷結果顯示，回答「海外年薪變多」的受訪者約佔 7 成，其中從事科技業、設計／藝術相關行業的受訪者，薪水漲幅最明顯。原始問題為：您從事的行業為？選項參考人力銀行共 10 個行業類別（包含其他），再根據填答者的答案進行統整。原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            isLazy: true,
            aspectRatio: 511 / 800
          }
        ]
      },
      notations: {
        opening: [
          {
            txt: '共收到 985 份問卷，其中有效樣本 806 份，有效樣本標準為「年齡在 20 至 40 歲」，在海外從事「正職」工作的臺灣人。統計時間：2019 年 6 月 27 日至 7 月 12 日，共兩週時間。抽樣方式：滾雪球式抽樣，意即先透過少量樣本調查，透過他們的關係接觸到更多的樣本。我們在網路上發放問卷，主要管道是 Facebook 海外臺灣人的社團。樣本所在國分佈：歐洲 34.2%，北美洲 21% ，中國 13.3%，東北亞 12.5%，東南亞 6.1%，港澳地區 4.6%，新加坡 3.6%，大洋洲 3%，其他地區 1.7%。原始問卷及填答結果請見<a href="https://docs.google.com/spreadsheets/d/15JW6MXzGGU-EzLAS6OQg490QAVyb7Buqf1pjovRxIVw/edit" target="_blank">連結</a>。',
            color: 'green'
          },
          {
            txt: '對「青年」的定義依不同國家、不同國際組織或不同目的而有所區別。經濟合作暨發展組織（OECD）定義的青年是 15 歲到 24 歲，中國國家統計局定義的年齡區間是 15 歲到 34 歲。臺灣經濟部「青年創業及啟動金」貸款，能申請的年齡段是 20 至 45 歲，教育部青年發展署提供申請計畫的年齡區間則是 18 至 35 歲。我們選擇根據臺灣與香港「十大傑出青年評選標準」，將「青年」的問卷和受訪者年齡定義在 20 至 40 歲。',
            color: 'green'
          },
          {
            txt: '汶萊、緬甸、柬埔寨、印尼、寮國、馬來西亞、菲律賓、新加坡、泰國、越南。',
            color: 'green'
          }
        ],
        story3: [
          {
            txt: '臺灣人公共事務會 Formosan Association for Public Affairs，簡稱 FAPA，是一個成立於美國的臺灣相關議題游說團體。該組織於 1982 年在美國加州洛杉磯成立，已故民進黨立法委員蔡同榮是第一任會長。',
            color: 'pink'
          },
          {
            txt: 'Overseas Taiwanese for Democracy，簡稱海台青 OTD，成立於 2014 年，起源於各地聲援太陽花學運的組織串連，希望在海外增加臺灣議題的能見度，捍衛臺灣的自由、民主，抵抗中共統一臺灣的企圖。',
            color: 'pink'
          }
        ],
        final: [
          {
            txt: '<a href="https://www.tsatw.org.tw/page.php?menu_id=82&new_id=1173" target="_blank">〈臺灣產業轉型下的工作機會分布變遷：1978-2012〉</a>。',
            color: 'green'
          },
        ]
      }
    }
  },
  computed: {
    isMobW () {
      return this.isMounted && this.ww <= 767.98
    },
    isLapW () {
      return this.isMounted && this.ww >= 768
    },
    headerH () {
      return this.ww <= 768 ? 40 : 50
    },
    touchOrClick () {
      return this.checkMob ? 'touchstart' : 'click'
    }
  },
  methods: {
    alterWindowWidth () {
      this.ww = this.wEl.innerWidth
      this.wh = this.wEl.innerHeight
      // this.wh = this.htmlEl.clientHeight
      this.checkMob = checkMob()
      // this.ww = this.htmlEl.clientWidth
      if (this.isLapW && this.beforeWw <= 767.98) {
        this.wEl.addEventListener('scroll', this.controlBackgroundPageAll)
        this.wEl.removeEventListener('scroll', this.fixedBackgroundPages)
      } else if (!this.isLapW && this.beforeWw >= 768) {
        this.wEl.addEventListener('scroll', this.fixedBackgroundPages)
        this.wEl.removeEventListener('scroll', this.controlBackgroundPageAll)
      }
      this.beforeWw = this.ww
    },
    fixedBackgroundPages () {
      this.isStopFixedBgPage = false
      this.fixedBackgroundPage('videoStory', 'story1', 'backgroundPage1')
      for (let i = 1; i <= 5; i++) {
        this.fixedBackgroundPage(`story${i}`, `story${i + 1}`, `backgroundPage${i + 1}`)
      }
    },
    // todo this.isStopFixedBgPage
    fixedBackgroundPage (before, after, fixed) {
      if (!this.$refs[before] || !this.$refs[fixed] || this.isStopFixedBgPage) return

      const beforeEl = this.$refs[before].$el
      const afterElT = this.$refs[after].$el.offsetTop
      const backgroundPage = this.$refs[fixed].$el
      const scrollH = this.wEl.pageYOffset
      const beforeElB = beforeEl.offsetTop + beforeEl.offsetHeight

      if ((scrollH >= (beforeElB - FT_OFFSET_TOP)) && scrollH < afterElT) {
        backgroundPage.classList.add('fixed')
        this.isStopFixedBgPage = true
      // } else if (backgroundPage.classList.contains('fixed')) {
      } else {
        backgroundPage.classList.remove('fixed')
      }
    },
    controlBackgroundPageAll () {
      this.fixedBackgroundPageAll()
      for (let i = 0; i <= 5; i++) {
        this.switchBackgroundPageAll(`story${i}`, `story${i + 1}`, i)
      }
      this.switchBackgroundPageAll('story6', '', 6)
    },
    // todo this.isStopFixedBgPageAll
    // todo 停在中間重整後，若不滑動，圖片不會出現
    fixedBackgroundPageAll () {
      if (!this.$refs.backgroundPageAll) return

      const opening = this.$refs.opening.$el
      const finalT = this.$refs.final.$el.offsetTop
      const backgroundPageAll = this.$refs.backgroundPageAll.$el
      const scrollH = this.wEl.pageYOffset
      const openingB = opening.offsetTop + opening.offsetHeight

      if (scrollH >= openingB && scrollH < (finalT - this.wh)) {
        backgroundPageAll.classList.add('fixed')
        this.bgPageAllMarginTop = 0
      } else if (scrollH >= (finalT - this.wh)) {
        backgroundPageAll.classList.remove('fixed')
        const totalStoryH = this.$refs.storyWrapper.offsetHeight
        this.bgPageAllMarginTop = `${totalStoryH - this.wh}px`
      } else {
        backgroundPageAll.classList.remove('fixed')
      }
    },
    switchBackgroundPageAll (before, after, idx) {
      const scrollH = this.wEl.pageYOffset
      const beforeEl = this.$refs[before].$el
      const beforeElT = beforeEl.offsetTop

      if (after) {
        const afterEl = this.$refs[after].$el
        const afterElT = afterEl.offsetTop
        if ((scrollH >= (beforeElT - this.headerH)) && (scrollH < (afterElT - this.headerH))) {
          this.bgPageAllIdx = idx
        }
      } else {
        if (scrollH >= (beforeElT - this.headerH)) {
          this.bgPageAllIdx = idx
        }
      }
    },
    doProgresses () {
      this.isStopProgress = false
      this.doProgress0()
      if (this.isMobW) {
        this.doProgress('videoStory', 'story1', 1)
      } else {
        this.doProgress('story0', 'story1', 1)
      }
      this.doProgress('story1', 'story2', 2)
      this.doProgress('story2', 'story3', 3)
      this.doProgress('story3', 'story4', 4)
      this.doProgress('story4', 'story5', 5)
      this.doProgress('story5', 'story6', 6)
      this.doProgress('story6', 'final', 7)
      this.doProgress('final', 'footer', 8)
      this.doProgress9()
    },
    doProgress (before, after, part) {
      if (this.isStopProgress) return
      // 258.87 / 9 = 28.76
      const scrollH = this.wEl.pageYOffset
      const beforeElT = this.$refs[before].$el.offsetTop
      const afterElT = this.$refs[after].$el.offsetTop

      const beforeMinus = (this.isLapW || part === 1 || part === 8) ? 0 : this.wh * 2
      const afterMinus = (this.isLapW || part === 7 || part === 8) ? 0 : this.wh * 2

      if ((scrollH >= (beforeElT - beforeMinus - FT_OFFSET_TOP)) && (scrollH < (afterElT - afterMinus - FT_OFFSET_TOP - (part === 8 ? this.wh : 0)))) {
        this.progressL = 28.76 * part
        this.clickFreq = part
        this.isStopProgress = true
      }
    },
    doProgress0 () {
      if (this.isStopProgress) return

      const scrollH = this.wEl.pageYOffset
      const afterElT = this.$refs[this.isMobW ? 'videoStory' : 'story0'].$el.offsetTop

      if (scrollH < (afterElT - FT_OFFSET_TOP)) {
        this.progressL = 0
        this.clickFreq = 0
        this.isStopProgress = true
      }
    },
    doProgress9 () {
      if (this.isStopProgress) return

      const scrollH = this.wEl.pageYOffset
      const beforeElT = this.$refs.footer.$el.offsetTop

      if (scrollH >= (beforeElT - this.wh)) {
        this.progressL = 258.87
        this.clickFreq = 9
        this.isStopProgress = true
      }
    },
    scrollToNext () {
      this.clickFreq += 1
      const order = this.clickFreq % 10
      
      switch (order) {
        case 1:
          this.$refs[this.isMobW ? 'videoStory' : 'story0'].$el.scrollIntoView({ behavior: 'smooth' })
          break
        case 2:
          this.$refs[this.isMobW ? 'backgroundPage1' : 'story1'].$el.scrollIntoView({ behavior: 'smooth' })
          break
        case 3:
          this.$refs[this.isMobW ? 'backgroundPage2' : 'story2'].$el.scrollIntoView({ behavior: 'smooth' })
          break
        case 4:
          this.$refs[this.isMobW ? 'backgroundPage3' : 'story3'].$el.scrollIntoView({ behavior: 'smooth' })
          break
        case 5:
          this.$refs[this.isMobW ? 'backgroundPage4' : 'story4'].$el.scrollIntoView({ behavior: 'smooth' })
          break
        case 6:
          this.$refs[this.isMobW ? 'backgroundPage5' : 'story5'].$el.scrollIntoView({ behavior: 'smooth' })
          break
        case 7:
          this.$refs[this.isMobW ? 'backgroundPage6' : 'story6'].$el.scrollIntoView({ behavior: 'smooth' })
          break
        case 8:
          this.$refs.final.$el.scrollIntoView({ behavior: 'smooth' })
          break
        case 9:
          this.$refs.footer.$el.scrollIntoView({ behavior: 'smooth' })
          break
        default:
          window.scroll({ top: 0, left: 0, behavior: 'smooth' })
          break
      }
    },
    lazyLoad () {
      if (this.lazyers.length === 0) return
      const scrollH = this.wEl.pageYOffset
      Array.prototype.forEach.call(this.lazyers, (lazyer, idx) => {
        if (lazyer.offsetTop < (scrollH + this.wh * 1.5)) {
          const img = lazyer.firstElementChild
          img.src = img.dataset.src
          lazyer.classList.remove('lazyer')
          if (idx === (this.lazyers.length - 1)) {
            this.lazyers = []
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus">
@import './util/background-page.styl'
@import './util/base-story.styl'

html
  font-size 10px
body
  background-color #dcd7ce
.fixed
  position fixed
  top 0
.full-img
  background-size cover
  background-position center
  background-repeat no-repeat
img
  height auto
.total-center
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
</style>
