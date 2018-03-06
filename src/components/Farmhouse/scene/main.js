export function setScene() {

    const ScrollMagic = require('scrollmagic');
    const { TweenMax, TimelineMax } = require('gsap');
    require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
    require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');

    const common = require('../util/common.js');

    //scrollmagic controller       
    const controller = new ScrollMagic.Controller();

    //所有章節
    let chapter = document.querySelectorAll(".chapter");

    //Nav
    let navList = document.querySelectorAll(".navList");

    //進度條
    let progressbar = document.querySelectorAll(".progress"); 
    //進度條顏色
    let progress = document.querySelectorAll(".progress--percentage");    

    let openingMediaContainer = document.getElementById("openingPinContainer");

    let chapterSceneCollection = [];

    for (let i = 0; i < chapter.length; i++) {

        //各章節加上 id
        chapter[i].id = "chapter" + i;

        //相對應的 nav
        let navTarget = navList[i];

        //相對應的進度條 (to set class toggle)
        let progressTarget = progressbar[i];
        progressTarget.classList.add("pr" + i);

        //sibling
        // let navPrev = navTarget.previousElementSibling;
        // let navNext = navTarget.nextElementSibling;

        let chapterScene = new Object();

        //根據章節設定 nav 的 class toggle    
        chapterScene.scene = new ScrollMagic.Scene({
            triggerElement: chapter[i]
        }).setClassToggle(navTarget, "current");

        //如果 navTarget 存在 prev sibling
        // if (navPrev) {
        //     chapterScene.scenePrev = new ScrollMagic.Scene({
        //         triggerElement: chapter[i]
        //     }).setClassToggle(navPrev, "sibling");
        // }

        //如果 navTarget 存在 naxt sibling
        // if (navNext) {
        //     chapterScene.sceneNext = new ScrollMagic.Scene({
        //         triggerElement: chapter[i]
        //     }).setClassToggle(navNext, "sibling");
        // }

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

        // if (i > 0) {
        //     //第一篇沒有 prev
        //     chapterSceneCollection[i].scenePrev.addTo(controller);
        // }

        // if (i < chapter.length - 1) {
        //     //最後一篇沒有 next
        //     chapterSceneCollection[i].sceneNext.addTo(controller);
        // }

        // 將進度條加進 scrollmagic controller
        chapterSceneCollection[i].progressbar.addTo(controller);
        chapterSceneCollection[i].progress.addTo(controller);

    }

    // triggerHook            
    // "onEnter" => 1
    // "onCenter" => 0.5
    // "onLeave" => 0

    //開場 parallax
    /*
    let sceneParallaxOpening = new ScrollMagic.Scene({
        triggerElement: "#chapter1",
        triggerHook: "onEnter",
        duration: "100%"
    }).setTween(TweenMax.to("#chapter0", 1, {
        y: '20%',
        ease: Linear.easeNone
    }))
    .addIndicators({name: "openingPara", colorStart: "red"});
    */

    /* --- Pin Section --- */
    
    let pinSceneCollection = [];   

    //開場 pin
    const scenePinOpening = new ScrollMagic.Scene({
        triggerElement: "#openingPinContainer",
        triggerHook: "onLeave",
        duration: "100%"
    }).setPin("#openingPinContainer", {
        pushFollowers: false
    })
    // .addIndicators({name: "opening", colorStart: "red"});

    //data crisis 往上蓋住 sowhat       
    const scenePinSo = new ScrollMagic.Scene({
        triggerElement: '.dataCrisis',
        triggerHook: "onEnter"
        //不設定 duration，將 setPin 設定在子內容區塊，nav 捲動定位才會正確
    }).setPin("#soPinContainer", {
        pushFollowers: false
    });    
    // .addIndicators({name: "blueprint"});

    //helpless 往上蓋住 tradeData    
    const scenePinTrade = new ScrollMagic.Scene({
        triggerElement: '.helpless',
        triggerHook: "onEnter"
        //不設定 duration，將 setPin 設定在子內容區塊，nav 捲動定位才會正確
    }).setPin("#mapPinContainer", {
        pushFollowers: false
    })
    // .addIndicators({name: "opinion"});

    //conclusion 往上蓋住 violation    
    const scenePinVio = new ScrollMagic.Scene({
        triggerElement: '.conclusion',
        triggerHook: "onEnter"
        //不設定 duration，將 setPin 設定在子內容區塊，nav 捲動定位才會正確
    }).setPin(".violation", {
        pushFollowers: false
    });
    // .addIndicators({name: "opinion"});
    

    // check device
    let currOS = this.$store.state.os;
    let device =  this.currDevice(currOS);
    // console.log("main.js: " + device);

    if(device == "mobile"){
        //mobile scene
        console.log("mobile scene");
        pinSceneCollection.push(
            // scenePinOpening,
            scenePinSo,
            scenePinTrade,
            scenePinVio
        );

    } else {
        // normal scene
        console.log("normal scene");
        //push pin scene to array
        pinSceneCollection.push(
            scenePinOpening,
            scenePinSo,
            scenePinTrade,
            scenePinVio
        );
    }    

    //add pin scene to controller
    for(let i = 0; i < pinSceneCollection.length; i++){
        pinSceneCollection[i].addTo(controller);
    }

    
    let openingEl = document.getElementById("openingPinContainer");

    function openingHeightFix(height){
        //fix ios 100vh height issue        
        openingEl.style.minHeight = height + 'px';
    }
    
    //第一個畫面不顯示 progress bar
    let progressHideScene = new ScrollMagic.Scene({
        triggerElement: chapter[0]
    })
    .setClassToggle("#progresswpr", "hide")
    .addTo(controller);


    window.addEventListener('resize', function (event) {
        
        for (let i = 0; i < chapter.length; i++) {
            //set scene duration & update scene

            //以各章節的內容高度作為 scene duration
            let chapterHeight = chapter[i].offsetHeight;
            chapterSceneCollection[i].scene.duration(chapterHeight)
            .refresh();

            chapterSceneCollection[i].progressbar.duration(chapterHeight)
            .refresh();

            chapterSceneCollection[i].progress.duration(chapterHeight)
            .refresh();

            // if(i == 0){
            //     progressHideScene.duration(chapterHeight)
            //     .refresh();
            // }

            // if (i > 0) {
            //     //第一篇沒有 prev
            //     chapterSceneCollection[i].scenePrev.duration(chapterHeight)
            //     .refresh();
            // }

            // if (i < chapter.length - 1) {
            //     //最後一篇沒有 next
            //     chapterSceneCollection[i].sceneNext.duration(chapterHeight)
            //     .refresh();
            // }
        }

        let openingHeight = openingMediaContainer.offsetHeight;
        progressHideScene.duration(openingHeight).refresh();

        //get window height
        var wheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        //fix ios 100vh height issue
        openingHeightFix(wheight);

        
        /*
        //get window width
        var wwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if(wwidth > 800){
            controller.addScene(scenePinOpening);
            // console.log("set Pin!");
        } else {
            controller.removeScene(scenePinOpening);
            // console.log("remove Pin!");
        }
        */

        //是否需要手動 update??
        // scenePinOpening.update(true);
        // scenePinMap.update(true);
        // scenePinConc.update(true);

    });

    let resizeEvent = new Event('resize');

    //trigger window resize once
    window.dispatchEvent(resizeEvent);



} //end