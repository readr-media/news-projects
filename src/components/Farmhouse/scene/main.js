import { currDevice } from 'src/util/comm';
const debug = require('debug')('CLIENT:farmhouse:scene:main');

export function setScene(isMobile) {
    debug('isMobile:', isMobile)

    const ScrollMagic = require('scrollmagic');
    const { TweenMax, TimelineMax } = require('gsap');
    require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
    // require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');

    //所有章節
    let chapter = document.querySelectorAll(".chapter");
    const chapterLen = chapter.length;

    //Nav
    let navList = document.querySelectorAll(".navList");

    //進度條
    let progressbar = document.querySelectorAll(".progress"); 

    //進度條顏色
    let progress = document.querySelectorAll(".progress--percentage");    
    let openingMediaContainer = document.getElementById("openingPinContainer");
    let openingEl = document.getElementById("openingPinContainer");

    function openingHeightFix(height){
      //fix ios 100vh height issue        
      openingEl.style.minHeight = height + 'px';
    }

    let chapterSceneCollection = [];
    let progressHideScene;
    if (!isMobile) {
      //scrollmagic controller       
      const controller = new ScrollMagic.Controller();

      for (let i = 0; i < chapterLen; i++) {

          //各章節加上 id
          chapter[i].id = "chapter" + i;

          //相對應的 nav
          let navTarget = navList[i];

          //相對應的進度條 (to set class toggle)
          let progressTarget = progressbar[i];
          progressTarget.classList.add("pr" + i);

          let chapterScene = new Object();

          //根據章節設定 nav 的 class toggle    
          chapterScene.scene = new ScrollMagic.Scene({
              triggerElement: chapter[i]
          }).setClassToggle(navTarget, "current");

          //進度條，顯示目前章節名稱
          chapterScene.progressbar = new ScrollMagic.Scene({
              triggerElement: chapter[i]
          }).setClassToggle(progressTarget, "current");

          //progress
          chapterScene.progress = new ScrollMagic.Scene({
              triggerElement: chapter[i],
              triggerHook: 0.98
          }).setTween(TweenMax.fromTo(
              progress[i], 1, {height:0}, {height:"100%"}
          ))

          //progress bar title, vertical align center
          let progressTitle = progressbar[i].querySelector(".progress--title");
          let ptMarginTop = progressTitle.offsetHeight / 2 * -1;
          // console.log(ptMarginTop);
          progressTitle.style.marginTop = ptMarginTop + "px";

          //將物件推入陣列 chapterSceneCollection
          //scene handler: chapterSceneCollection[i].scene
          chapterSceneCollection.push(chapterScene);

          //將 scene 加進 scrollmagic controller
          chapterSceneCollection[i].scene.addTo(controller);

          // 將進度條加進 scrollmagic controller
          chapterSceneCollection[i].progressbar.addTo(controller);
          chapterSceneCollection[i].progress.addTo(controller);
      }

      //第一個畫面不顯示 progress bar
      progressHideScene = new ScrollMagic.Scene({
          triggerElement: chapter[0]
      })
      .setClassToggle("#progresswpr", "hide")
      .addTo(controller);
    } else {
      for (let i = 0; i < chapterLen; i = i + 1) {
        const navTarget = navList[i];
        let progressTarget = progressbar[i];
        let progressTitle = progressbar[i].querySelector(".progress--title");
        let ptMarginTop = progressTitle.offsetHeight / 2 * -1;        
        chapter[i].id = "chapter" + i;
        progressTarget.classList.add("pr" + i);
        progressTitle.style.marginTop = ptMarginTop + "px";
      }
    }
    
    const resizeHandler = (event) => {
      if (!isMobile) {
        for (let i = 0; i < chapterLen; i = i + 1) {
          //set scene duration & update scene
  
          //以各章節的內容高度作為 scene duration
          let chapterHeight = chapter[i].offsetHeight;
          chapterSceneCollection[i].scene.duration(chapterHeight)
          .refresh();
  
          chapterSceneCollection[i].progressbar.duration(chapterHeight)
          .refresh();
  
          chapterSceneCollection[i].progress.duration(chapterHeight)
          .refresh();
        }
        let openingHeight = openingMediaContainer.offsetHeight;
        progressHideScene.duration(openingHeight).refresh();
      }

      //get window height
      var wheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      //fix ios 100vh height issue
      openingHeightFix(wheight);
    }

    window.addEventListener('resize', resizeHandler);
    resizeHandler();
} //end