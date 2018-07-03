/* --------------- set canvas size --------------- */
export function setCanvasSize() {
  let w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let wheight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  // 扣掉捲軸的寬度
  let wwidth = w - (w - document.getElementById('mainWrapper').offsetWidth);

  // Landscape (1744x1116 -> 1:0.64)
  if (wheight / wwidth > 0.75) {
    this.openingwprL.style.width = wwidth * 0.9 + 'px';
    this.openingwprL.style.height = wwidth * 0.9 * 0.64 + 'px';
  } else {
    this.openingwprL.style.width = (wheight * 0.9) / 0.64 + 'px';
    this.openingwprL.style.height = wheight * 0.9 + 'px';
  }

  // Portrait (1020x1534 -> 1:0.665)
  this.openingwprP.style.width = wwidth * 0.95 + 'px';
  this.openingwprP.style.height = (wwidth * 0.95) / 0.665 + 'px';
}

/* --------------- draw Opening (Landscape) --------------- */
export function drawOpeningLandscape(that,typekitFont,data) {

  if (that.openingLandscape.getContext) {
    let ctx = that.openingLandscape.getContext('2d'); 

    typekitFont.load().then(
      function() {
        console.log('typekit is available');
        addTextL();
      },
      function() {
        console.log('typekit is not available after waiting 3 seconds');
        addTextL();
      }
    );

    function addTextL() {

      ctx.save();

      // 今日牌價
      ctx.font =
        '700 56px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.fillText(data.price_conch, 580, 572);

      ctx.rotate((1 * Math.PI) / 180);
      ctx.fillText(data.price_waist, 582, 718);

      ctx.restore();

      ctx.save();

      // 縣市排行
      ctx.font =
        '700 50px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.rotate((6 * Math.PI) / 180); 
      ctx.fillText(data.popular_city[0], 1398, 424);

      ctx.fillText(data.popular_city[1], 1394, 544);

      ctx.rotate((2 * Math.PI) / 180);
      ctx.fillText(data.popular_city[2], 1407, 615);

      ctx.restore();

      ctx.save();

      // 機台總數
      ctx.font =
        '700 31px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.rotate(((5.5 * Math.PI) / 180) * -1);
      ctx.fillText(data.date, 810, 560);

      const totalLength = data.total.toString().length;
      const localeString = data.total.toLocaleString('en');   

      // const totalLength = 4;
      // const localeString = '6,478'; 

      switch(totalLength){   

        case 5:
          ctx.font =
          '700 74px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
          ctx.rotate((0.1 * Math.PI) / 180);
          ctx.fillText(localeString, 810, 650);
          break;
          
        case 6:
          ctx.font =
          '700 66px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
          ctx.rotate((0.1 * Math.PI) / 180);
          ctx.fillText(localeString, 805, 650);
          break;  

        default:  
          ctx.font =
          '700 76px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
          ctx.rotate((0.1 * Math.PI) / 180);
          ctx.fillText(localeString, 835, 650);
      }          

      ctx.restore();
    }
  } else {
    console.log('瀏覽器不支援 canvas');
  }
}

/* --------------- draw Opening (Portrait) --------------- */
export function drawOpeningPortrait(that,typekitFont,data) {
  if (that.openingPortrait.getContext) {
    let ctx = that.openingPortrait.getContext('2d');

    addTextP();

    function addTextP() {
      ctx.save();

      // 今日牌價
      ctx.font =
        '700 56px "微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.fillText(data.price_conch, 295, 625);

      ctx.rotate((1 * Math.PI) / 180);
      ctx.fillText(data.price_waist, 298, 774);

      ctx.restore();

      ctx.save();

      // 縣市排行
      ctx.font =
        '700 50px "微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.rotate((6 * Math.PI) / 180);
      ctx.fillText(data.popular_city[0], 558, 946);

      ctx.fillText(data.popular_city[1], 554, 1065);

      ctx.rotate((2 * Math.PI) / 180);
      ctx.fillText(data.popular_city[2], 580, 1165);

      ctx.restore();

      ctx.save();

      // 機台總數
      ctx.font =
        '700 31px "微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.rotate(((5.5 * Math.PI) / 180) * -1);
      ctx.fillText(data.date, 495, 600);

      const totalLength = data.total.toString().length;
      const localeString = data.total.toLocaleString('en');   

      // const totalLength = 6;
      // const localeString = '536,478'; 

      switch(totalLength){   

        case 5:
          ctx.font =
          '700 74px "微軟正黑體", "Microsoft JhengHei", sans-serif';
          ctx.rotate((0.1 * Math.PI) / 180);
          ctx.fillText(localeString, 500, 695);
          break;
          
        case 6:
          ctx.font =
          '700 66px "微軟正黑體", "Microsoft JhengHei", sans-serif';
          ctx.rotate((0.1 * Math.PI) / 180);
          ctx.fillText(localeString, 490, 695);
          break;  

        default:  
          ctx.font =
          '700 76px "微軟正黑體", "Microsoft JhengHei", sans-serif';
          ctx.rotate((0.1 * Math.PI) / 180);
          ctx.fillText(localeString, 520, 695);
      }    

      ctx.restore();
    }
  } else {
    console.log('瀏覽器不支援 canvas');
  }
}
