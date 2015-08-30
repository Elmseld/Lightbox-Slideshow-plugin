/**
 * Place your JS-code here.
 */
$(document).ready(function() { 
  'use strict';

  /**
   * Related to all examples. This expands the box to full width.
   */
  $('.gift').click(function() {
    $(this).parent().addClass('fullwidth');
    $(this).parent().find('*').show('slow');
    $(this).parent().children('.gift').hide();
    console.log("Clicked to open a box, displaying it in full width.");
  });
  

  /**
   * Related to all examples. This minimizes the box.
   */
  $('.minimize').click(function(event) {
    $(this).parent().find('*').hide();
    $(this).parent().removeClass().addClass('box').show();
    $(this).parent().children('.gift').show();
    console.log("Minimizing the box.");
  });

  
  /**
   * Use this code for fade the image in and out.
   */
   (function($) {
   
   $.fn.fadeInOut = function(options) {
   	   options = $.extend({}, $.fn.fadeInOut.defaults, options);
   	   return this.each(function() {
   	   	$(this).fadeOut(options.duration, function() {
   	   			$(this).fadeIn(options.duration)});
   	   });
   	};
   	
   $.fn.fadeInOut.defaults = {
   	   'duration': 'slow',
   }
   
  }) (jQuery);
  
  $('#box img.example').hover(function() {
  	$(this).fadeInOut({'duration':4000});
  });
   
   
  /**
   * Use this code for the fontshifting.
   */
   (function($) {
   		$.fn.shiftFont = function(options) {
   			options = $.extend({}, $.fn.shiftFont.defaults, options);
   			$.fn.shiftFont.current = ($.fn.shiftFont.current + 1) % options.fontFamily.length;
   		return this.each(function() {
   			$(this).css('font-family', options.fontFamily[$.fn.shiftFont.current]);
   		});
   	};
   	
   	$.fn.shiftFont.defaults = {
   		'fontFamily': ['sans-serif', 'serif']
   	}
   	
   	$.fn.shiftFont.current = 0;
   	console.log('Add function shiftFont() to jQuery object as plugin.');
   }) (jQuery);
   
   $('#box h1, #box p').click(function() {
   	$('#box h1, #box p').shiftFont({
   		'fontFamily' : ['monospace', 'cursive', 'fantasy', 'sans-serif']
   	});
   });
   
  
	/**
   * Use this code for the lightbox.
   */
   (function($) {
   
   $.fn.lightbox = function() {
   	   return this.each(function() {
   	   	var windowHeigth = window.innerHeight || $(window).height(),
  			windowWidth  = window.innerWidth  || $(window).width();
   	   	
   	   //Display the overlay
   	   $('<div id="overlay"></div>')
   	   .css('opacity', '0')
   	   .animate({'opacity' : '0.5'}, 'slow')
   	   .appendTo('body');
   	   
   	   //Create the lightbox container
   	   $('<div id="lightbox"></div>')
   	   	.hide()
   	   	.appendTo('body');
   	   	
   	   	//Display the image on load
   	   	$('<img>')
   	   		.attr('src', $(this).attr('src'))
   	   		.css({
   	   			'max-height': windowHeigth, 
   	   			'max-width': windowWidth
   	   		})
   	   		.load(function() {
   	   			$('#lightbox')
   	   				.css({
   	   					'top':  (windowHeigth - $('#lightbox').height()) / 2,
   	   					'left': (windowWidth - $('#lightbox').width()) / 2
   	   				})
   	   				.fadeIn();
   	   	})
   	   	.appendTo('#lightbox');
   	   	
   	   	  // Remove it all on click
   	   	  $('#overlay, #lightbox').click(function() {
   	   	  	$('#overlay, #lightbox').remove();
   	   	  });
   	   	
   	   });
   	};
   	
   
  }) (jQuery);
  
  $('.lightbox').click(function() {
  	$(this).lightbox();
  });
   
   
   
  console.log('Everything is ready.');
});

	/**
   * Use this code för slideshow
   */
  var slideshowInit = function() {
    var numberImages =  $('.slideshow img').length,
      currentImage = numberImages - 1,

      // Get current z-index for the slideshow and stack all images above this z-index
      zIndex = parseInt($('.slideshow').css('z-index')),
      currentZIndex = zIndex,
      
      // To play/pause the slideshow intervall
      intervallId = null;
      
    // Function to rotate images
    var rotateImages = function() {
      // Fade out current image and reorder z-index
      $('.slideshow img')
        .eq(currentImage)
        .fadeOut('slow', function() {
          $(this)
            .css('z-index', zIndex)
            .fadeIn(0)
            .siblings().each(function() {
              $(this).css('z-index', ((parseInt($(this).css('z-index')) - zIndex + 1) % numberImages + zIndex));
          });
        });
      currentImage = (numberImages + currentImage - 1) % numberImages;
      console.log('Rotating pictures in slideshow.' + currentImage);
    };
    
    // Fore each image, set it up.
    $('.slideshow img')
      .each(function() { 
        // Get the crop attribute from the img element, if defined and use to crop the image
        var crop = $(this).attr('crop');
        crop = crop ? 'crop=' + crop + '&' : null;
        
        // Use i to set the z-index of the image, stack them on top of each other
        $(this)
          .attr('src', $(this).attr('src1') + '?' + crop + 'w=' + $(this).width() + '&h=' + $(this).height() + '&crop-to-fit')
          .css('z-index', currentZIndex++);
      })
      .click(function() {rotateImages();});

    $('#box2 .gift').click(function() {
      intervallId = setInterval(function() {rotateImages();}, 4000);
      console.log("Clicked to open slideshow.");
    });
    
    $('#box2 .minimize').click(function(event) {
      clearInterval(intervallId);
      console.log("Clicked to close slideshow.");
    });
   
    console.log("Slideshow was initiated.");
  };
  slideshowInit();

