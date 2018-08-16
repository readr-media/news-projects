<template>
  <main class="foreign-labour">
    <Logo class="no-sprite" href="https://www.readr.tw/" top="10px" left="10px" bgImage="/proj-assets/logo_readr.png" />
    <Share :shareUrl="pageUrl" top="10px" right="10px" bgColor="#000" direction="down" />
    <section class="scene scene--full" :class="{ 'scene--active': currentScene === 0 }">
      <figure class="media media--cover">
        <img src="/proj-assets/foreign-labour/images/iv/0.jpg" alt="">
      </figure>
      <div class="heading">
        <h1>流離尋岸</h1>
        <div>
          <h2><span>從彼岸的家人身旁</span></h2>
          <h2><span>輾轉流轉到此岸的工廠</span></h2>
          <h2><span>再到病院和按摩間</span></h2>
          <h2><span>當人生是一連串的偷渡、偷跑、偷情與偷生</span></h2>
          <h2><span>她們如何上岸？</span></h2>
        </div>
      </div>
    </section>
    <section class="scene scene--full" :class="{ 'scene--active': currentScene === 1 }">
      <div class="text-border">
        <div class="text-border__text text-fix">
          <p>來台灣沒幾個月，珍珍就逃離了窄小悶熱的電子廠女工宿舍，由「外勞」身份搖身一變，成為月入十多萬的林森北路性工作者。遠在北越的老家，終於得以翻修改建。</p>
        </div>
      </div>
    </section>
    <section class="scene scene--text" :class="{ 'scene--active': currentScene === 2 }">
      <p>工作沒多久，珍珍和她的客人老孟，就從消費關係轉男女朋友。老孟說，自己在歡場打滾多年，一心告誡自己出來玩開心就好，也自認沒有「暈船」的可能；未想，這一栽竟在珍珍的溫柔懷抱裡。</p>
      <p>「其實也不知道自己能和她走到什麼地步，我是她的小三，知道她在老家已經結婚有了家庭和兩個小孩，我又因為是在那樣的狀況下認識她，沒辦法開口叫她不要做了，畢竟來台灣就是賺錢，所以也就維持……這種走一步算一步的狀態。」</p>
      <p>說這些話時，老孟和我剛在台北女子看守所前點上第二根菸。他說，其實交往沒多久，他就知道兩人最後的結局，很可能就像正在他眼前上演的情節一樣——珍珍被條子逮住然後強制遣返，兩人不了了之。</p>
      <p>「不是沒有設想過現在的情況……應該說是早就知道了。」老孟一手將菸往嘴裡送，一手提著幾袋稍後要在會面時拿給珍珍的水果和食物。那一大袋食物提起來很沉，裝的全是老孟對珍珍的愛。當時他語氣說得淡然，但正如宋冬野所唱，嘴上一句帶過，男人終究還是個複雜的動物。</p>
      <p>（註：本文所有人名皆為化名。）</p>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 3 }">
      <figure class="media lazy">
        <img src="" alt="2018 年 2 月 28 日，警方同步突襲兩家隱身於林森北路民宅的色情按摩院">
      </figure>
      <div class="scene__descr">
        <p><span>2018 年 2 月 28 日，警方同步突襲兩家隱身於林森北路民宅的色情按摩院，逮補三名越南籍女子，其中兩名為失聯移工，一名為之前在台失聯 5 年，2017 年底被遣返越南後，又再度偷渡來台的小花。</span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 4 }">
      <figure class="media lazy">
        <img src="" alt="因檢察官決定以仲介賣淫、偽證、妨礙風化等罪名起訴珍珍、小花，以及老闆娘阿寶">
      </figure>
      <div class="scene__descr">
        <p><span>因檢察官決定以仲介賣淫、偽證、妨礙風化等罪名起訴珍珍、小花，以及老闆娘阿寶，所以她們被移往台北女子看守所收押。這一押，就是兩個月。</span></p>
        <p><span>為了和珍珍長久交往，老孟很努力地自學越南文。3 月 14 日是他們闊別半個月後，第一次可以會客見面的日子，老孟準備一張小抄，謄上比較生澀的越南語，讓他可以把之後珍珍要面對的司法審查狀況解釋清楚。</span></p>
        <p><span>往後的兩個月，老孟在每個可以會客的日子，都花上幾小時去土城女監見珍珍。</span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 5 }">
      <figure class="media lazy">
        <img src="" alt="監所的會客規則，明訂探視者能帶進去的食物種類、尺寸有一定的限制">
      </figure>
      <div class="scene__descr">
        <p><span>監所的會客規則，明訂探視者能帶進去的食物種類、尺寸有一定的限制。珍珍愛吃水果，老孟不願便宜行事在監所外買現成切好的商品，不管他工作多忙累，仍會在探望的前夜花時間將水果切得細碎又乾淨，只為送進監所後，能博得愛人的歡心。</span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 6 }">
      <figure class="media lazy">
        <img src="" alt="3 月 20 日，珍珍生日，老孟依舊一早出門前往女監，想為珍珍送上蛋糕">
      </figure>
      <div class="scene__descr">
        <p><span>3 月 20 日，珍珍生日，老孟依舊一早出門前往女監，想為珍珍送上蛋糕。待在會客室時，老孟的手機傳來訊息，提醒他珍珍的生日到了。</span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 7 }">
      <figure class="media lazy">
        <img src="" alt="5 月 2 日，檢察官結束偵查階段羈押，珍珍等人終於可以交保外出">
      </figure>
      <div class="scene__descr">
        <p><span>5 月 2 日，檢察官結束偵查階段羈押，珍珍等人終於可以交保外出。那一夜，老孟開心地帶珍珍逛夜市，不顧忌天氣的炎熱，硬是要她吃碗熱騰騰的麵線去晦氣。</span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 8 }">
      <figure class="media lazy">
        <img src="" alt="老孟和珍珍到賣場採購生活用品，珍珍腳上仍踩著監所的制式拖鞋">
      </figure>
      <div class="scene__descr">
        <p><span>老孟和珍珍到賣場採購生活用品，珍珍腳上仍踩著監所的制式拖鞋。</span></p>
        <p><span>當時他們都以為，判決結束前他們能過上短暫的幸福同居生活。</span></p>
      </div>
    </section>
    <section class="scene scene--text" :class="{ 'scene--active': currentScene === 9 }">
      <p>離開監所兩個月後，珍珍為了能寄更多錢回老家給丈夫和小孩，決定每週花幾天「陪乾爹」，因為老孟能提供給她的經濟資源有限。老孟覺得自己對珍珍的一片真心付諸流水，難過地提了分手。</p>
      <p>珍珍的判決仍未宣判，但人已不知去向。沒有人知道現在的她，在台灣的哪個角落流離。</p>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 10 }">
      <figure class="media lazy">
        <img src="" alt="和珍珍同時間被捕的，還有來自河內的小花">
      </figure>
      <div class="scene__descr">
        <p><span>和珍珍同時間被捕的，還有來自河內的小花。她說，去年底時她從越南搭船偷渡來台，驚險上岸後休養個把月，盼想到林森北路的按摩店能快速還完偷渡的 6,500 美元開，沒想到一個客人都沒接，就被警察給捉了。</span></p>
      </div>
    </section>
    <section class="scene scene--full" :class="{ 'scene--active': currentScene === 11 }">
      <div class="text-border">
        <div class="text-border__text text-fix">
          <p>我很喜歡台灣……台灣人都對我很好，反而是越南人有時候會排擠自己人⋯⋯在台灣七年，我覺得值得了。</p>
        </div>
      </div>
    </section>
    <section class="scene scene--text" :class="{ 'scene--active': currentScene === 12 }">
      <p>小花第一次來台是 2011 年，最初在高雄某醫院看護老人。第一年，小花每個月薪水扣完仲介費後，實際入手的不過兩、三千元，仲介又常恐嚇她，說不好好做就送她回家，讓小花很擔心來台反而負債。</p>
      <p>在醫院待了 16 個月，小花總算還完所有仲介費，正準備進入能掙錢的階段。然而，那時她卻因為同鄉的排擠，選擇了逃跑。</p>
      <p>逃跑後，小花做過家庭看護，也待過工地、餐廳，但因為自己的逃跑身份常被檢舉，有時風頭一避就是幾個月無法工作。2017 年 11 月，她因為同鄉檢舉而遭逮，回越南一個多月，就選擇再度來台賺錢。</p>
      <p>「雖然我在台灣 6 年存的錢，可以在河內賣地蓋房子，但花完這些後就沒剩，以後還想有做生意的錢，讓小朋友讀書⋯⋯後來有人介紹可以搭船來，騙我說 3、4 天就會到，所以就答應了。後來坐了 9 天，真的是快死在海上！ 」</p>
    </section>
    <section class="scene scene--full" :class="{ 'scene--active': currentScene === 13 }">
      <div class="text-border">
        <div class="text-border__text text-fix">
          <p>我們偷渡都是付 6,500 美金，在越南先付 500 塊，進中國後付 3,000，到台灣又 3,000，而且這個有保證送到，就是說，你如果上岸被抓到送回去，在台灣那 3,000 你可以不用付，下次你可以繼續偷渡，成功把你送到了，才會收最後那 3,000 塊錢。</p>
        </div>
      </div>
    </section>
    <section class="scene scene--text scene--path" :class="{ 'scene--active': currentScene === 14 }">
      <video ref="video" class="video" muted loop playsinline>
        <source src="" type="video/mp4">
      </video>
      <div class="path">
        <div id="animation_container" class="path-container">
          <canvas id="canvas"></canvas>
        </div>
      </div>
      <div class="content">
        <p>「我們那時候從河內出發，一個晚上就到諒山市邊境。</p>
        <p>之後走路翻山一個小時，進中國後又坐了一天一夜的車，就到一個海邊。</p>
        <p>休息幾小時後，我們搭大船，大概三、四天可以開到台灣外海。</p>
        <p>之後我們在海上等了好幾天，要找到適當的時機才能進來。</p>
        <p>當時我們總共有 47 人，全部擠在一個小小的船底，每個人都在吐，你吐在我身上，我也吐在你身上，那個味道很恐怖，所以每個人也都吃不下。在船上 9 天，我大概只上過 3 次廁所。</p>
        <p>第 9 天半夜，我們 12 點半就在附近海域，一直停在那邊等人來接。3 點半有人來，我們就換小船。</p>
        <p>當時我們 47 個人，從大船直接換到一個長度大概只有 3 公尺的橡皮艇，全部人都上去，都疊在一起，我差點死掉，因為有人亂動就會掉到海裡，我可能死第一個。讓我再來一次，我一定不要，生跟死就是一分鐘的事情而已。</p>
        <p>上岸地點是高雄，那時候很冷，上岸的時候鞋子掉在海裡，我是打赤腳上岸。之後有 3 台車來接我們，帶我們到一個小旅館，讓我們在那邊洗澡換衣服。</p>
        <p>那時候我們 9 天沒洗澡，也沒吃飯，看起來就像難民，也嚴重暈船，所以不可能搭高鐵。後來我們每個人又花了 4,000 塊錢搭計程車來台北。當時我們三個人一起，等於花了 12,000。</p>
        <p>到台北後，暈船暈一個月沒去工作，都在休息。後來有朋友介紹去林森北路做按摩，沒想到還沒接到客人就被抓。警察要我承認有做一個，說我這樣比較好結案，那時候很傻被騙，就說我有接，現在很後悔。」</p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 15 }">
      <figure class="media lazy">
        <img src="" alt="自從小花被捕、羈押，到現在進入漫長的審判，已經過了半年">
      </figure>
      <div class="scene__descr">
        <p><span>自從小花被捕、羈押，到現在進入漫長的審判，已經過了半年。</span></p>
        <p><span>這半年來，小花在台灣無法工作，只能靠在台灣交到的男友接濟，還需要遠在河內的母親寄錢支援。</span></p>
        <p><span>她花了大筆鈔票，從遙遠的彼岸冒死偷渡來台，如今卻被困在此岸，回不了家。</span></p>
      </div>
    </section>
    <section class="scene scene--text" :class="{ 'scene--active': currentScene === 16 }">
      <p class="text--center">此刻，不曉得還有多少人像這群人一樣，尋不著岸。</p>
    </section>
    <section class="credit">
      <p>文字、攝影：鐘聖雄<span></span><br>網頁：HY Tan<span></span>設計：許玲瑋</p>
      <p>Mirrormedia</p>
    </section>
    <RelatedReports />
    <section v-if="pageUrl" class="comment">
      <div class="fb-comments" :data-href="pageUrl" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </section>
  </main>
</template>
<script>
import Logo from '../Logo.vue'
import RelatedReports from '../RelatedReports.vue'
import Share from '../Share.vue'
import { getFBCommentsUrl } from '../../util/comm'
import { throttle } from 'lodash'

const PROJECT_NAME = 'foreign-labour-iv'

var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function initCanvas() {
	canvas = document.getElementById("canvas");
	// anim_container = document.getElementById("animation_container");
	// dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp=AdobeAn.getComposition("45E65D2607CD4173BB33E9726983077D");
	var lib=comp.getLibrary();
	handleComplete({},comp);
}
function handleComplete(evt,comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	// var preloaderDiv = document.getElementById("_preload_div_");
	// preloaderDiv.style.display = 'none';
	canvas.style.display = 'block';
	exportRoot = new lib.path();
	stage = new lib.Stage(canvas);	
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
	}	    
	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {		
		var lastW, lastH, lastS=1;		
		window.addEventListener('resize', resizeCanvas);		
		resizeCanvas();		
		function resizeCanvas() {			
			var w = lib.properties.width, h = lib.properties.height;			
			var iw = window.innerWidth, ih=window.innerHeight;			
			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
			if(isResp) {                
				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
					sRatio = lastS;                
				}				
				else if(!isScale) {					
					if(iw<w || ih<h)						
						sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==1) {					
					sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==2) {					
					sRatio = Math.max(xRatio, yRatio);				
				}			
			}			
			canvas.width = w*pRatio*sRatio;			
			canvas.height = h*pRatio*sRatio;
			// canvas.style.width = anim_container.style.width = dom_overlay_container.style.width = preloaderDiv.style.width = w*sRatio+'px';				
			// canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = preloaderDiv.style.height = h*sRatio+'px';
			stage.scaleX = pRatio*sRatio;			
			stage.scaleY = pRatio*sRatio;			
			lastW = iw; lastH = ih; lastS = sRatio;            
			stage.tickOnUpdate = false;            
			stage.update();            
			stage.tickOnUpdate = true;		
		}
	}
	makeResponsive(true,'both',false,1);	
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}

export default {
  name: 'ForeignLabourIV',
  components: {
    Logo,
    Share,
    RelatedReports
  },
  metaInfo () {
    let metaUrl = PROJECT_NAME
    let metaImage = `foreign-labour/images/iv/og.jpg`
    let ogLocale = 'zh_TW'
    
    return {
      title: '流離尋岸',
      description: '在家鄉，她們孩子的媽，一肩扛起家庭經濟重擔。在台灣，她們靠著偷渡、偷跑、偷情，在黑暗的角落苦苦求生，從工廠女工、老人看護到男人攝護腺排毒，她們一手包辦。從彼岸到此岸，她們似乎永遠無法靠岸⋯⋯',
      locale: ogLocale,
      metaUrl: metaUrl,
      metaImage: metaImage,
      customScript: `
        <script src="//code.createjs.com/createjs-2015.11.26.min.js"><\/script>
        <script src="//www.readr.tw/proj-assets/foreign-labour/scripts/animate-path-v2.js"><\/script>
      `,
    }
  },
  data () {
    return {
      captionsTop: [],
      currentScene: 0,
      gaScroll: 0,
      pageUrl: '',
      sectionsTop: [],
    }
  },
  beforeMount () {
    this.calcSectionsTop()
  },
  mounted () {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    this.pageUrl = getFBCommentsUrl();
    initCanvas()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScrollForCaption)
    window.addEventListener('resize', this.calcSectionsTop)
    this.$refs.video.children[0].src = '/proj-assets/foreign-labour/videos/iv/14.mp4'
    this.$refs.video.load()
    stage.setAutoPlay(false)
    ga('send', 'pageview')
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleScrollForCaption)
    window.removeEventListener('resize', this.calcSectionsTop)
  },
  methods: {
    calcSectionsTop () {
      this.captionsTop = []
      this.sectionsTop = []
      const scenes = [ ...document.querySelectorAll('section[class*="scene"]') ] || []
      const bodyRect = document.body.getBoundingClientRect()
      const creditRect = document.querySelector(`.credit`).getBoundingClientRect()
      const creditTop = creditRect.top - bodyRect.top
      let lastCaption
      scenes.map((scene) => {
        const sceneRect = scene.getBoundingClientRect()
        const sceneTop = sceneRect.top - bodyRect.top
        const caption = scene.querySelector(`.scene__descr`)
        if (caption) {
          lastCaption = caption
          const captionRect = caption.getBoundingClientRect()
          const captionTop = captionRect.top - bodyRect.top
          this.captionsTop.push(captionTop)
        }
        this.sectionsTop.push(sceneTop)
      })
      this.sectionsTop.push(creditTop)
      const lastCaptionRect = lastCaption.getBoundingClientRect()
      const lastCaptionTop = lastCaptionRect.top - bodyRect.top
      this.captionsTop.push(lastCaptionTop + lastCaption.clientHeight)
    },
    handleCanvas (index) {
      const canvas = document.querySelector(`section:nth-of-type(${index}) canvas`)
      if (canvas) {
        const pathRect = document.querySelector('.scene--path .path').getBoundingClientRect()
        const contents = [ ...document.querySelectorAll('.scene--path .content p') ]
        contents.map((content) => {
          const contentRect = content.getBoundingClientRect()
          if (contentRect.top + (contentRect.height / 2) + (pathRect.height / 5) < pathRect.bottom) {
            content.classList.add('content-hide')
          } else {
            content.classList.remove('content-hide')
          }
        })
        stage.setAutoPlay(true)
      }
    },
    handleGAScroll (index) {
      if (this.gaScroll < index) {
        this.gaScroll = index
        ga('send', 'event', 'projects', 'scroll', `scroll to ${index}`, { nonInteraction: false })
      }
    },
    handleScroll: throttle(function() {
      const offset = 2 / 3
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const transitionPoint = scrollTop + (this.$store.state.viewport[1] * offset)
      for (let [index, value] of this.sectionsTop.entries()) {
        if (value > transitionPoint ) {
          this.lazyloadImg(index)
          this.handleVideoPlay(index)
          this.handleCanvas(index)
          this.handleGAScroll(index - 1)
          return this.currentScene = index - 1
        }
      }
    }, 500),
    handleScrollForCaption: throttle(function() {
      const offset = 2 / 3
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const transitionPoint = scrollTop + (this.$store.state.viewport[1] * offset)
      const captions = document.querySelectorAll(`.scene__descr`)
      for (let [index, value] of this.captionsTop.entries()) {
        if (value > transitionPoint ) {
          if (captions[index - 2]) {
            captions[index - 2].classList.remove('caption-in')
          }
          if (captions[index]) {
            captions[index].classList.remove('caption-in')
          }
          if (captions[index - 1]) {
            captions[index - 1].classList.add('caption-in')
          }
          return 
        }
      }
    }, 500),
    handleVideoPlay (index) {
      const current = document.querySelector(`section:nth-of-type(${index}) video`)
      const previous = document.querySelector(`section:nth-of-type(${index - 1}) video`)
      const next = document.querySelector(`section:nth-of-type(${index + 1}) video`)
      if (current) {
        current.play()
      }
      if (previous) {
        previous.pause()
      }
      if (next) {
        next.pause()
      }
    },
    lazyloadImg (index) {
      const previous = document.querySelector(`section:nth-of-type(${index - 1}) .media.lazy img`)
      const next = document.querySelector(`section:nth-of-type(${index + 1}) .media.lazy img`)
      if (previous) {
        previous.src = `/proj-assets/foreign-labour/images/iv/${index - 2}.jpg`
        previous.classList.remove('lazy')
      }
      if (next) {
        next.src = `/proj-assets/foreign-labour/images/iv/${index}.jpg`
        next.classList.remove('lazy')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = hsl(354.3,58%,64.5%)

.foreign-labour
  color #fff
  font-size 16px
  font-style normal
  font-family "source-han-sans-traditional", sans-serif
  background-color #000
  h1, h2
    margin 0 auto
    font-family "source-han-serif-tc", serif
    text-shadow 1.4px 1.4px 9.4px rgba(0, 0, 0, 0.3)
  h1
    font-size 3.375rem
    line-height 1.3
    white-space nowrap
  h2
    font-size .875rem
    text-align justify
  p, figure
    margin 0
  .scene
    position relative
    padding 80px 0
    font-size 1.125rem
    font-weight 300
    line-height 1.67
    > p
      position relative
      z-index 10
      width calc(100% - 40px)
      margin 0 auto
      text-align justify
      & + p
        margin-top 1em
    &.scene--active
      .media, .video, .path
        opacity 1
        visibility visible
        transition opacity 2.5s, visibility 1s 0s
    &.scene--text
      padding 50vh 0
    &__descr
      position relative
      z-index 10
      width calc(100% - 40px)
      margin 0 auto
      text-align justify
      opacity 0
      visibility hidden
      transition opacity 1s, visibility 1s 1s
      &.caption-in
        opacity 1
        visibility visible
        transition opacity 1s, visibility 1s 0s
      p + p
        margin-top 1em
      span
        background-color rgba(0, 0, 0, .8)
        border-radius 5px
        box-shadow 5px 0 0 rgba(0,0,0,.8), -5px 0 0 rgba(0,0,0,.8)
    &--full
      min-height 100vh
      max-height 100vh
    &--photo
      padding 100vh 0 50vh
  .heading
    position absolute
    left 50%
    bottom 8%
    transform translateX(-50%)
    width 85%
    h2
      margin-left 5px
      &:first-of-type, &:nth-of-type(4)
        margin-top 1em
      span
        padding .1em 0 .2em
        line-height 2
        background-color rgba(0, 0, 0, .7)
        border-radius 5px
        box-shadow 5px 0 0 rgba(0,0,0,.7), -5px 0 0 rgba(0,0,0,.7)
  .media
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    opacity 0
    visibility hidden
    transition opacity 2.5s, visibility 1s 2.5s
    &.media--cover
      img
        object-fit cover
        object-position 50% 50%
    img
      width 100%
      height 100%
      object-fit contain
      object-position center
  .video
    position fixed
    top 0
    left 0
    width 100%
    height 100vh
    object-fit cover
    object-position center center
    opacity 0
    visibility hidden
    transition opacity 2.5s, visibility 1s 2.5s
  .scene--path
    .path
      position fixed
      top 0
      left 0
      z-index 500
      width 100%
      height 65vh
      opacity 0
      visibility hidden
      transition opacity 2.5s, visibility 1s 2.5s
      overflow hidden
      .path-container
        position absolute
        left 0
        bottom 0
        width 100%
        padding-top 131%
        canvas
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          width 100%
          height 100%
          object-fit cover
          object-position 50% 55%
    .content
      position relative
      width calc(100% - 40px)
      margin 0 auto
      text-align justify
      > p
        position relative
        z-index 510
      > p + p
        margin-top 1em
      
  .text-border
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 75%
    color theme-color
    font-size 1.375rem
    line-height 1.45
    text-align justify
    &:before
      content ''
      position absolute
      top 0
      left 0
      width 20px
      height 20px
      border-top 2px solid theme-color
      border-left 2px solid theme-color
    &:after
      content ''
      position absolute
      top 0
      right 0
      width 20px
      height 20px
      border-top 2px solid theme-color
      border-right 2px solid theme-color
    span
      position absolute
      right 0
      bottom calc(-1em - 25px)
      color #898989
      font-size .875rem

    &__text
      position relative
      padding 20px
      &:before
        content ''
        position absolute
        bottom 0
        left 0
        width 20px
        height 20px
        border-left 2px solid theme-color
        border-bottom 2px solid theme-color
      &:after
        content ''
        position absolute
        bottom 0
        right 0
        width 20px
        height 20px
        border-right 2px solid theme-color
        border-bottom 2px solid theme-color
      p
        position relative
        max-width 100%
        margin 0
      p + p
        margin-top 1em
  .text--center
    text-align center !important
  .credit
    padding 25vh 0
    text-align center
    p
      margin 0
      font-size .875rem
      line-height 1.7
    span
      margin-right 10px
  .comment
    padding 5vh 10px

@media (min-width: 768px)
  .foreign-labour
    .heading
      top auto
      left 5%
      right auto
      bottom 15%
      width 40%
      transform none
    .scene
      > p
        max-width 50%
        min-width 550px
      &__descr
        max-width 50%
        min-width 550px
    .scene--path
      .path
        height 75vh
        .path-container
          right 0
          bottom 0
          height 100%
          padding 0
      .content
        max-width 50%
        min-width 550px
    .text-border
      max-width 50%
      line-height 1.67

@media (max-width: 899px)
  .foreign-labour
    .scene--path
      .content
        > p
          opacity 1
          visibility visible
          transition opacity 1s, visibility 1s 0s
        > p.content-hide
          opacity 0
          visibility hidden
          transition opacity .5s, visibility 1s .5s
@media (min-width: 900px)
  .foreign-labour
    .heading
      display flex
      align-items flex-start
      left 45%
      bottom auto
      top 50%
      transform translate(-50%, -50%)
      width auto
      > div
        margin 1em 0 0 100px
      h1
        font-size 5.125rem
      h2
        width 90%
        font-size 1.125rem
        white-space nowrap
        &:first-of-type
          margin-top 0
    .scene
      &__descr
        max-width 40%
        transform translateX(30%)
    .scene--path
      .path
        top 50%
        left 0
        right auto
        transform translateY(-50%)
        width 50%
        height 100%
        background-color transparent
        .path-container
          top 50%
          transform translateY(-50%)
          canvas
            object-position 0% 50%
            object-fit contain
      .content
        width 50%
        min-width 0
        margin 0 0 0 auto
        padding 0 60px
    .text-border
      span
        font-size 1.125rem
    .credit
      font-size 1rem
      br
        display none
    .comment
      padding 5vh 20%
</style>
