var JQZOOM_OPTIONS = {
	zoomType: 'innerzoom',
	preloadImages: false,
	title: false
};

/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($) {
    
    $.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };
    
    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };
    
    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };
    
    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    
    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {threshold : 0});
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {threshold : 0});
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {threshold : 0});
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {threshold : 0});
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {threshold : 0});
        }
    });

    
})(jQuery);
$(document).ready(function() {

	// Clear Search Field
	$('.autobox').autobox();


	 $('#HeaderLower #PagesMenu .First').remove();
	var catHTML = $('#HeaderLower .CategoryList > .BlockContent > ul').html();
	var pageHTML = $('#HeaderLower .PagesMenu > .BlockContent > ul').html();
	$('#HeaderLower #Menu > ul li.First').after(catHTML);
	$('#HeaderLower #Menu > ul li.Last').before(pageHTML);
	$('#HeaderLower .CategoryList').remove();
	$('#HeaderLower #PagesMenu').remove();



	$('#prodAccordion .Block h2').click(function() {
		$(this).css('outline','none');
		
		if($(this).parent().hasClass('current')) {
			$(this).siblings('div').slideUp('slow',function() {
				$(this).parent().removeClass('current');
			});
		} else {
			$('#prodAccordion .Block .prodAccordionContent').slideUp('slow',function() {
				$(this).parent().removeClass('current');
			});
			$(this).siblings('div').slideToggle('slow',function() {
				$(this).parent().toggleClass('current');
				var vPort = $(this).is(":in-viewport");
				if(vPort == false) {
					topAcc = $(this).offset().top;
					$('html, body').animate({ scrollTop:  topAcc - 50}, 600);
				}

			});
		}
		
		

		return false;
	});
	
	
	// Horizontal Category List Dropdowns (non-flyout only)
	if(document.all) {
		$('#SideCategoryList li').hover(function() {
			$(this).addClass('over');
			return false;
		},
		function() {
			$(this).removeClass('over');
		});
	}
	
	
	$('#HeaderLower li').each(function() {
		if ($(this).children('ul').size() != 0) {
			$(this).children('a').addClass('hasSub');	
		}
	});
	
	

	$('#change-currency').click(function(e) {
		e.stopPropagation();
		$('#currency-chooser .currencies').toggle();
		$(window).one('click', function() { $('#currency-chooser .currencies').hide(); });
	});
	
	$('.ProductImage').each(function() {
	  	var hasHover = $(this).find('.hover').size();
	  	if (hasHover == 0) {
		  $(this).find('a').append('<div class="hover"></div>');
		}
	});
	var xphone = $('.xPhone').text();
	
	
	$("#HeaderRight .phoneIcon strong").text(xphone);
	
	
	if (xphone == '') {
		$("#HeaderRight .phoneIcon").hide();
	}
	$('.xPhone').remove();
	
	$('.CartLink').show();
	var carttext = $('.CartLink a span').text();
	if (carttext == '') {
		$(".CartLink a em").text("Empty");
	} else{
		$(".CartLink a em").text("View Cart ");
	}
	
	
	$('input[type=radio], input[type=checkbox], input[type=file], select').not('.productOptionPickListSwatch input[type=radio], .productOptionViewRectangle input[type=radio]').uniform();
	
	swapReq();
	
});



$(document).ajaxComplete(function() {
	$.uniform.restore("select.JSHidden");	
	$('select').not("div:parent[class^='uniform-']").uniform();
	$('input[type=radio], input[type=checkbox], input[type=file]').not('.productOptionPickListSwatch input, .productOptionViewRectangle input').uniform();
	 swapReq();
	
});	
$('#FormField_11, #FormField_21').live('change', function(){
	$.uniform.restore("select.JSHidden");	
	
});



$(window).load(function() {
	if ($('.WishListButton:visible').size() != 0) {
		
		$('html').click(function() {
			
			$('#SideProductAddToWishList .BlockContent:visible').slideUp(300);
		 });
		
		
		$('.WishListButton').click(function(event){
			event.stopPropagation();
			x = $('.WishlistRow').offset().left;
			y = $('.WishlistRow').offset().top;
			//$('#SideProductAddToWishList').css('top', y).css('left', x).css('position', 'absolute').show();
			$('#SideProductAddToWishList .BlockContent').slideToggle(300);
		});
		$('#SideProductAddToWishList .BlockContent').click(function(event){
			event.stopPropagation();
		});	
	}
	$('.prodAccordion > div > h2').click(function(){
		$('#SideProductAddToWishList .BlockContent').slideUp(300);
 	});		
	
	
})


function swapReq() {

/*
$(".productAttributeLabel label").each(function(){
	$($(this).find('.required')).insertAfter($(this).find('.name'));
});	

	
$(".FormFieldLabel").each(function(){
	$($(this).siblings('.Required')).insertAfter($(this));
});	
	
*/

	
}
