// scrolloverflow module
(function (window, document, $) {
  $.fn.fp_scrolloverflow = (function() {

      // keeping central set of classnames and selectors
      var SCROLLABLE =            'fp-scrollable';
      var SCROLLABLE_SEL =        '.' + SCROLLABLE;

      var ACTIVE =                'active';
      var ACTIVE_SEL =            '.' + ACTIVE;

      var SECTION =               'fp-section';
      var SECTION_SEL =           '.' + SECTION;
      var SECTION_ACTIVE_SEL =    SECTION_SEL + ACTIVE_SEL;

      var SLIDE =                 'fp-slide';
      var SLIDE_SEL =             '.' + SLIDE;
      var SLIDE_ACTIVE_SEL =      SLIDE_SEL + ACTIVE_SEL;

      var SLIDES_WRAPPER =        'fp-slides';
      var SLIDES_WRAPPER_SEL =    '.' + SLIDES_WRAPPER;

      var TABLE_CELL =            'fp-tableCell';
      var TABLE_CELL_SEL =        '.' + TABLE_CELL;

      var RESPONSIVE =            'fp-responsive';
      var AUTO_HEIGHT_RESPONSIVE= 'fp-auto-height-responsive';

      /*
      * Turns iScroll `mousewheel` option off dynamically
      * https://github.com/cubiq/iscroll/issues/1036
      */
      IScroll.prototype.wheelOn = function () {
          this.wrapper.addEventListener('wheel', this);
          this.wrapper.addEventListener('mousewheel', this);
          this.wrapper.addEventListener('DOMMouseScroll', this);
      };

      /*
      * Turns iScroll `mousewheel` option on dynamically
      * https://github.com/cubiq/iscroll/issues/1036
      */
      IScroll.prototype.wheelOff = function () {
          this.wrapper.removeEventListener('wheel', this);
          this.wrapper.removeEventListener('mousewheel', this);
          this.wrapper.removeEventListener('DOMMouseScroll', this);
      };

      /**
      * Returns an integer representing the padding dimensions in px.
      */
      function getPaddings(element){
          var section = element.closest(SECTION_SEL);
          if(section.length){
              return parseInt(section.css('padding-bottom')) + parseInt(section.css('padding-top'));
          }
          return 0;
      }

      function scrollBarHandler(){
          var self = this;
          self.options = null;

          self.init = function(options, iscrollOptions){
              self.options = options;
              self.iscrollOptions = iscrollOptions;

              if(document.readyState === 'complete'){
                  createScrollBarForAll();
                  $.fn.fullpage.shared.afterRenderActions();
              }
              //after DOM and images are loaded
              $(window).on('load', function(){
                  createScrollBarForAll();
                  $.fn.fullpage.shared.afterRenderActions();
              });

              return self;
          };

          /**
          * Creates the scrollbar for the sections and slides in the site
          */
          function createScrollBarForAll(){
              if($('body').hasClass(RESPONSIVE)){
                  removeResponsiveScrollOverflows();
              }
              else{
                  forEachSectionAndSlide(createScrollBar);
              }
          }

          /**
          * Checks if the element needs scrollbar and if the user wants to apply it.
          * If so it creates it.
          *
          * @param {Object} element   jQuery object of the section or slide
          */
          function createScrollBar(element){
              //User doesn't want scrollbar here? Sayonara baby!
              if(element.hasClass('fp-noscroll')) return;

              //necessary to make `scrollHeight` work under Opera 12
              element.css('overflow', 'hidden');

              var scrollOverflowHandler = self.options.scrollOverflowHandler;
              var wrap = scrollOverflowHandler.wrapContent();
              var section = element.closest(SECTION_SEL); //in case element is a slide
              var scrollable = scrollOverflowHandler.scrollable(element);
              var contentHeight;
              var paddings = getPaddings(section);

              //if there was scroll, the contentHeight will be the one in the scrollable section
              if(scrollable.length){
                  contentHeight = scrollOverflowHandler.scrollHeight(element);
              }
              else{
                  contentHeight = element.get(0).scrollHeight - paddings;
                  if(self.options.verticalCentered){
                      contentHeight = element.find(TABLE_CELL_SEL).get(0).scrollHeight - paddings;
                  }
              }

              var scrollHeight = $(window).height() - paddings;

              //needs scroll?
              if ( contentHeight > scrollHeight) {
                  //did we already have an scrollbar ? Updating it
                  if(scrollable.length){
                      scrollOverflowHandler.update(element, scrollHeight);
                  }
                  //creating the scrolling
                  else{
                      if(self.options.verticalCentered){
                          element.find(TABLE_CELL_SEL).wrapInner(wrap);
                      }else{
                          element.wrapInner(wrap);
                      }
                      scrollOverflowHandler.create(element, scrollHeight, self.iscrollOptions);
                  }
              }
              //removing the scrolling when it is not necessary anymore
              else{
                  scrollOverflowHandler.remove(element);
              }

              //undo
              element.css('overflow', '');
          }

          /**
          * Applies a callback function to each section in the site
          * or the slides within them
          */
          function forEachSectionAndSlide(callback){
              $(SECTION_SEL).each(function(){
                  var slides = $(this).find(SLIDE_SEL);

                  if(slides.length){
                      slides.each(function(){
                          callback($(this));
                      });
                  }else{
                      callback($(this));
                  }
              });
          }

          /**
          * Removes scrollOverflow for sections using the class `fp-auto-height-responsive`
          */
          function removeResponsiveScrollOverflows(){
              var scrollOverflowHandler = self.options.scrollOverflowHandler;
              forEachSectionAndSlide(function(element){
                  if(element.closest(SECTION_SEL).hasClass(AUTO_HEIGHT_RESPONSIVE)){
                      scrollOverflowHandler.remove(element);
                  }
              });
          }

          //public functions
          self.createScrollBarForAll = createScrollBarForAll;
      }

      /**
       * An object to handle overflow scrolling.
       * This uses jquery.slimScroll to accomplish overflow scrolling.
       * It is possible to pass in an alternate scrollOverflowHandler
       * to the fullpage.js option that implements the same functions
       * as this handler.
       *
       * @type {Object}
       */
      var iscrollHandler = {
          refreshId: null,
          iScrollInstances: [],

          // Default options for iScroll.js used when using scrollOverflow
          iscrollOptions: {
              scrollbars: true,
              mouseWheel: true,
              hideScrollbars: false,
              fadeScrollbars: false,
              disableMouse: true,
              interactiveScrollbars: true
          },

          init: function(options){
              var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));

              //fixing bug in iScroll with links: https://github.com/cubiq/iscroll/issues/783
              iscrollHandler.iscrollOptions.click = isTouch; // see #2035

              //extending iScroll options with the user custom ones
              iscrollHandler.iscrollOptions = $.extend(iscrollHandler.iscrollOptions, options.scrollOverflowOptions);

              return new scrollBarHandler().init(options, iscrollHandler.iscrollOptions);
          },

          // Enables or disables the mouse wheel for the active section or all slides in it
          toggleWheel: function(value){
              var scrollable = $(SECTION_ACTIVE_SEL).find(SCROLLABLE_SEL);
              scrollable.each(function(){
                  var iScrollInstance = $(this).data('iscrollInstance');
                  if(typeof iScrollInstance !== 'undefined' && iScrollInstance){
                      if(value){
                          iScrollInstance.wheelOn();
                      }
                      else{
                          iScrollInstance.wheelOff();
                      }
                  }
              });
          },

          /**
          * Turns off iScroll for the destination section.
          * When scrolling very fast on some trackpads (and Apple laptops) the inertial scrolling would
          * scroll the destination section/slide before the sections animations ends.
          */
          onLeave: function(){
              iscrollHandler.toggleWheel(false);
          },

          // Turns off iScroll for the leaving section
          beforeLeave: function(){
              iscrollHandler.onLeave()
          },

          // Turns on iScroll on section load
          afterLoad: function(){
              iscrollHandler.toggleWheel(true);
          },

          /**
           * Called when overflow scrolling is needed for a section.
           *
           * @param  {Object} element      jQuery object containing current section
           * @param  {Number} scrollHeight Current window height in pixels
           */
          create: function(element, scrollHeight, iscrollOptions) {
              var scrollable = element.find(SCROLLABLE_SEL);

              scrollable.height(scrollHeight);
              scrollable.each(function() {
                  var $this = $(this);
                  var iScrollInstance = $this.data('iscrollInstance');
                  if (iScrollInstance) {
                      $.each(iscrollHandler.iScrollInstances, function(){
                          $(this).destroy();
                      });
                  }

                  iScrollInstance = new IScroll($this.get(0), iscrollOptions);
                  iscrollHandler.iScrollInstances.push(iScrollInstance);

                  if(!element.closest(SECTION_SEL).hasClass(ACTIVE)){
                      //off by default until the section gets active
                      iScrollInstance.wheelOff();
                  }

                  $this.data('iscrollInstance', iScrollInstance);
              });
          },

          /**
           * Return a boolean depending on whether the scrollable element is a
           * the end or at the start of the scrolling depending on the given type.
           *
           * @param  {String}  type       Either 'top' or 'bottom'
           * @param  {Object}  scrollable jQuery object for the scrollable element
           * @return {Boolean}
           */
          isScrolled: function(type, scrollable) {
              var scroller = scrollable.data('iscrollInstance');

              //no scroller?
              if (!scroller) {
                  return true;
              }

              if (type === 'top') {
                  return scroller.y >= 0 && !scrollable.scrollTop();
              } else if (type === 'bottom') {
                  return (0 - scroller.y) + scrollable.scrollTop() + 1 + scrollable.innerHeight() >= scrollable[0].scrollHeight;
              }
          },

          /**
           * Returns the scrollable element for the given section.
           * If there are landscape slides, will only return a scrollable element
           * if it is in the active slide.
           *
           * @param  {Object}  activeSection jQuery object containing current section
           * @return {Boolean}
           */
          scrollable: function(activeSection){
              // if there are landscape slides, we check if the scrolling bar is in the current one or not
              if (activeSection.find(SLIDES_WRAPPER_SEL).length) {
                  return activeSection.find(SLIDE_ACTIVE_SEL).find(SCROLLABLE_SEL);
              }
              return activeSection.find(SCROLLABLE_SEL);
          },

          /**
           * Returns the scroll height of the wrapped content.
           * If this is larger than the window height minus section padding,
           * overflow scrolling is needed.
           *
           * @param  {Object} element jQuery object containing current section
           * @return {Number}
           */
          scrollHeight: function(element) {
              return element.find(SCROLLABLE_SEL).children().first().get(0).scrollHeight;
          },

          /**
           * Called when overflow scrolling is no longer needed for a section.
           *
           * @param  {Object} element      jQuery object containing current section
           */
          remove: function(element) {
              var scrollable = element.find(SCROLLABLE_SEL);
              if (scrollable.length) {
                  var iScrollInstance = scrollable.data('iscrollInstance');
                  if(iScrollInstance){
                      iScrollInstance.destroy();
                  }

                  scrollable.data('iscrollInstance', null);
              }
              element.find(SCROLLABLE_SEL).children().first().children().first().unwrap().unwrap();
          },

          /**
           * Called when overflow scrolling has already been setup but the
           * window height has potentially changed.
           *
           * @param  {Object} element      jQuery object containing current section
           * @param  {Number} scrollHeight Current window height in pixels
           */
          update: function(element, scrollHeight) {
              //using a timeout in order to execute the refresh function only once when `update` is called multiple times in a
              //short period of time.
              //it also comes on handy because iScroll requires the use of timeout when using `refresh`.
              clearTimeout(iscrollHandler.refreshId);
              iscrollHandler.refreshId = setTimeout(function(){
                  $.each(iscrollHandler.iScrollInstances, function(){
                      $(this).get(0).refresh();

                      //ugly hack that we are forced to use due to the timeout delay
                      //otherwise done on the fullpage.js reBuild function
                      $.fn.fullpage.silentMoveTo($(SECTION_ACTIVE_SEL).index() + 1);
                  });
              }, 150);

              //updating the wrappers height
              element.find(SCROLLABLE_SEL)
                  .css('height', scrollHeight + 'px')
                  .parent().css('height', scrollHeight + getPaddings(element) + 'px');
          },

          /**
           * Called to get any additional elements needed to wrap the section
           * content in order to facilitate overflow scrolling.
           *
           * @return {String|Object} Can be a string containing HTML,
           *                         a DOM element, or jQuery object.
           */
          wrapContent: function() {
              return '<div class="' + SCROLLABLE + '"><div class="fp-scroller"></div></div>';
          }
      };

      return {
          iscrollHandler: iscrollHandler
      };
  })();
})(window, document, jQuery);