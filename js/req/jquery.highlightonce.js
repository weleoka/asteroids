(function($) {
    // Shell for your plugin code

    $.fn.highlightOnce = function() {
        // Plugin code
        return this.each(function() {
        // Do something to each item

            $(this)
                .data('original-color', $(this).css('background-color'))
                .css('background-color', 'rgb(255, 244, 127)')
                .one('mouseenter', function() {
                    console.log('MOUSEOVER!!!!!' + $(this).css('background-color'));
                    $(this).animate({
                        'background-color': $(this).data('original-color')
                },      'fast');
                console.log('ORIGINAL COLOR!!!!!' + $(this).data('original-color'));
            });
        });
    };

          

$.fn.fadeInOut = function(options) {
      options = $.extend({}, $.fn.fadeInOut.defaults, options);
      return this.each(function() {
        $(this).fadeOut(options.duration, function() {
          $(this).fadeIn(options.duration);

      });
      });
    };
  
  




})(jQuery);