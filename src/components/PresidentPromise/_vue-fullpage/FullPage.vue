<!--
 * vue-fullpage.js - fullPage.vue
 * https://github.com/alvarotrigo/vue-fullpage.js
 * @license https://github.com/alvarotrigo/vue-fullpage.js#license
 *
 * Copyright (C) 2018 alvarotrigo.com - A project by Alvaro Trigo
-->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import * as constants from './constants';
  import {
    camelToKebab,
  } from './helpers';

  export default {
    props: {
      options: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },

    data() {
      return {
        events: constants.EVENTS.reduce((eventsHandlers, event) => {
          return {
            ...eventsHandlers,

            [event]: (...args) => {
              this.emitEvent(event, args);
            }
          };
        }, {}),
      }
    },

    watch: {
      options: {
        deep: true,
        handler() {
          let activeSectionIndex = $('.fp-section.active').index();
          let activeSlideIndex = $('.fp-section.active').find('.slide.active').index();

          this.destroy('all');

          $('.section').eq(activeSectionIndex).addClass('active');

          if(activeSlideIndex > -1){
            $('.section.active').find('.slide').eq(activeSlideIndex).addClass('active');
          }

          this.init();
        },
      },
    },

    mounted() {
      window.$ = require('jquery');
      window.jQuery = require('jquery');
      // window.IScroll = require('./IScroll.js');
      // require('./scrolloverflow.js');
      require('./jquery.fullpage.min.js')
      require('./fullpage.min.css')
      // require('fullpage.js/dist/jquery.fullpage.min.js');
      // require('fullpage.js/dist/jquery.fullpage.min.css');
      this.init();
    },

    methods: {
      init() {
        $(this.$el).fullpage({
          ...this.options,
          ...this.events,
        });
      },

      destroy() {
        $.fn.fullpage.destroy('all');
      },

      emitEvent(name, args) {
        // Emit event on Vue way
        this.$emit.apply(this, [camelToKebab(name), ...args]);

        // Run event's handler with non Vue way
        if (this.options.hasOwnProperty(name)) {
          this.options[name].apply(this, args);
        }
      },
    },
  };
</script>