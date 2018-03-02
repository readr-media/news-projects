<template>
  <section class="chapter opening">
    <div id="openingPinContainer">
      <div id="mediaContainer"></div>
      <div class="centerwpr">
        <div class="opening--container">
          <h1 class="opening--title">不許動！通通拿去種農舍！</h1>
          <p>2000 年，政府為了因應台灣加入世界貿易組織（ＷＴＯ）可能帶來的衝擊，打出「富麗農村」口號修正了新版《農業發展條例》，開放農地自由買放，同時特許農民在農地上興建農舍。17 年過去後，農地價格漲了，我們的農業卻持續積弱、耕種面積減少，而我們農村，除了「種」出越來越多鐵皮工廠和壯麗的農舍外，卻沒有因此變得富麗⋯⋯</p>
          <p>2006 年，雪山隧道通車後，鄰近台北卻仍保有好山好水的宜蘭縣，從農業大縣搖身一變，成了「農舍大縣」。這一切，到底怎麼了？</p>
        </div>
      </div>    
    </div>

    <section id="openingIntro">
      <div class="centerwpr">
        <p>根據《農業發展條例》第 18 條相關規定，所謂農舍，就是「擁有農地的農民」受政府特許興建的「住宅」，形式可以是獨棟或集合住宅，容積率、建蔽率等限制卻和一般住宅不同<a class="noteTrigger" v-on:click="noteToggleContent">註</a>。<span class="noteBlock">農舍興建的建蔽率皆為 10%，樓高 10.5公尺，容積率最大約 150 坪，基地面積最大約 100坪。</span>重點在於，<strong>興建農舍必須以「不影響農業生產環境及農村發展」為前提，且興建農舍後的剩餘農地也必須維持農用。</strong></p>
        <p>問題來了。農舍只有農民能蓋，但政府可沒有限制「買農舍」的人必須是農民，導致近年來大量農民在興建農舍後，把這樣另類的「農產品」賣給一般人。一般人並不具備農業專業，加上過去政府對「農地農用」的把關並不嚴格，相輔相成下，就造成「農舍住宅化、農地建地化」的局面。</p>
        <p>呂柏凱語重心長指出，理論上影響農地價格的重要因素，應該要是水質與土壤，畢竟這才是影響農作物的關鍵。然而，當農地被作為建地看待後，卻是農地面寬、地段、農地興建資格在影響價格——也就是關係到農舍好不好蓋、或能不能賣的關鍵。在他看來，這是農舍所造成的農地建地化，已經造成農村走樣。</p>
        <p>宜蘭農民陳章楠也感嘆，<strong>從台北跑到宜蘭購買、興建農舍的人們，「十有八九」沒有保持農地農用，還將「台北的生活標準」帶進農村，要求農民不准噴灑農藥、不要太早發動農機，加上農舍會遮蔽農田必要的日照，還將生活廢水排進農業區中，早已對農村與農業造成實質影響。</strong></p>
        <p>不只對農舍抱存疑慮的人們有此感嘆，事實上，即便是支持農民興建、買賣農舍的老農，也對農地沒有農用的狀況有所抱怨。</p>
        <p>自幼從農，如今已邁入花甲之年的宜蘭老農葉慶文就指出，《農發條例》的精神是要「富麗農村」，所以才開放農地買賣與農舍興建，這是為了將農民從艱辛的生活中解放出來，也是法律賦予農民的權利，外界不應該因為許多農舍「蓋得漂亮」就指責農民，真的那麼想守護農地的話，他建議大家都去買塊田來當農民。</p>
        <p>然而，葉慶文也強調：<strong>「重點是沒有農地農用。所以政府執行力一定要拿出來，一切照法令落實管理，就不會有現在這些問題。所以問題出在政府瀆職，不是農舍怎麼蓋。」</strong></p>
      </div>
    </section>

  </section>
</template>

<script>

export default {

  props: {
    // credit: Array
  },
  methods: {
    noteToggleContent: function(event){
            //定義事件名稱 noteToggle
            this.$emit('noteToggle',event);

            // let trigger = event.currentTarget;
        // let content = target.nextElementSibling;
        // trigger.classList.toggle("expand");
        }
  },
  mounted (){

    // console.log("get props: " + this.credit);

  }

}

</script>

<style>
/* #openingPinContainer {top:0 !important;} */
</style>

<style scoped>
.opening {padding:0;}

#openingPinContainer {width:100%; height:100vh; position:relative;
display:flex; justify-content:center; align-items:center;
}

#mediaContainer {width:100%; height:100%; position:absolute; left:0; top:0;
background-image:url("/proj-assets/farmhouse/images/opening.jpg");
background-size:cover; background-position:center center;
background-repeat:no-repeat;
}

#openingPinContainer .centerwpr {
max-width:1100px;
}
.opening--container {
line-height:1.2; color:#fff; text-align:center;
text-shadow:0 1px 4px rgba(0,0,0,0.4);  
}

.opening--title {margin:0 0 40px 0;
font-size:66px; letter-spacing:1px;
}

#openingIntro {position:relative; padding:0;
background-color:#fff;
}
#openingIntro p:first-child {margin-top:0;}

/* .opening--credit {padding-left:6px; margin-top:50px; margin-bottom:0;
list-style:none;   
}
.opening--credit li {margin-bottom:6px;
font-size:16px;
} */

@media screen and (max-width: 800px) {

  #openingPinContainer {height:auto;}
  .opening .centerwpr {
    height:auto; 
    padding:50px 30px;
  }
  .opening--container {margin-top:0;}

}

@media screen and (max-width: 500px) {

  .opening--title {font-size:50px;}

}


</style>