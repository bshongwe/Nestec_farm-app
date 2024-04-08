#!/usr/bin/node

// jQuery code capsule for proper scoping
(function($) {
  'use strict';

  /* Excutes when DOM is ready
   * inits iCheck plugin for min-blue style,
   * increases clickable area by 20%
   */
  $(function() {
    $('.icheck input').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal',
      increaseArea: '20%'
    });

    /* Excutes when DOM is ready
     * inits iCheck plugin for flat-blue style,
     * increases clickable area by 20%
     */
    $('.icheck-square input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square',
      increaseArea: '20%'
    });

    /* Excutes when DOM is ready
     * inits iCheck plugin for flat-blue style,
     * increases clickable area by 20%
     */
    $('.icheck-flat input').iCheck({
      checkboxClass: 'icheckbox_flat-blue',
      radioClass: 'iradio_flat',
      increaseArea: '20%'
    });

    /* Inits iCheck plugin for line-blue style
     * inserts custom HTML
     */
    var icheckLineArray = $('.icheck-line input');
    for (var i = 0; i < icheckLineArray.length; i++) {
      var self = $(icheckLineArray[i]);
      var label = self.next();
      var label_text = label.text();

      label.remove();
      self.iCheck({
        checkboxClass: 'icheckbox_line-blue',
        radioClass: 'iradio_line',
        insert: '<div class="icheck_line-icon"></div>' + label_text
      });
    }

    /* Inits iCheck plugin for polaris style
     * increases clickable area by 20%
     */
    $('.icheck-polaris input').iCheck({
      checkboxClass: 'icheckbox_polaris',
      radioClass: 'iradio_polaris',
      increaseArea: '20%'
    });

    /* Inits iCheck plugin for futurico style
     * increases clickable area by 20%
     */
    $('.icheck-futurico input').iCheck({
      checkboxClass: 'icheckbox_futurico',
      radioClass: 'iradio_futurico',
      increaseArea: '20%'
    });
  });
})(jQuery);