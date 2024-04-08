#!/usr/bin/node

// jQuery capsule for proper scoping
(function($) {
  'use strict';

  /* initializing inputmask for
   * all elements on page
   */
  $(":input").inputmask();

})(jQuery);