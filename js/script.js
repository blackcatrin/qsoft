"use strict";

// more text
$(function() {
	
	if (document.all && document.querySelector && !document.addEventListener) {
		$('body').addClass('ie8');
	}

});
$(function() {
	var $eventList = $('.more_txt a');
	if (!$eventList.length) return;
    $(document).on('click', '.more_txt a', function(e) {
    	var _self = $(this);

		if ($(window).width() < 960) {
			_self.parents('.detail_discr').find('.detail_long_txt').slideToggle(400);
		}else if ($(window).width() > 960){			
			_self.parents('.detail_discr').find('.hide_b').slideToggle(400);
		}
	
		e.preventDefault();
	});
});

// menu
$(function() {
	if ($(window).width() <= 725) {
		$('.menu').addClass('js_click_link');
	}else if ($(window).width() > 725){
		$('.menu').removeClass('js_click_link');
			$('.menu .sub_menu').attr('style', '');
	}
	$(window).resize(function(event) {
		if ($(window).width() <= 725) {
			$('.menu').addClass('js_click_link');
		}else if ($(window).width() > 725){
			$('.menu').removeClass('js_click_link');
			$('.menu .sub_menu').attr('style', '');
		}
	});
});
// drop_down menu
$(function() {
	var $dropDownList = $('.menu__item-arr .menu__link');
	if (!$dropDownList.length) return;
    $dropDownList.on('click', function(e) {
    	console.log($(this).parents('.menu'));
    	if ($(this).parents('.menu').hasClass('js_click_link')) {    		
			$(this).parent().find('.sub_menu').slideToggle(400);
			$(this).parent().toggleClass('item-hover');
    	}

		e.preventDefault();
	});
});
// header__menu
$(function() {
	var $btn_menu_link = $('.btn_menu');
	if (!$btn_menu_link.length) return;
    $btn_menu_link.on('click', function(e) {
		$('.header__menu').animate({
			left: 0
		}, 400);

		e.preventDefault();
	});
    $('.close_menu').on('click', function(e) {
		$('.header__menu').stop(true, true).animate({
			left: '-100%'
		}, 400);

		e.preventDefault();
	});
});


//подключаем слайдер для цены в фильтре
$(function() {
	if (!$("#slider-range").length) return;
	var slider =  $( "#slider-range" ).slider({
			range: true,
			step: 1,
			min: 0,
			max: 10000000,
			create: function(event, ui) {
				$('.ui-slider').find('.ui-slider-range').next('.ui-slider-handle').addClass('first');
			},
			values: [0,  10000000],
			slide: function( event, ui ) {
			$( "#amount" ).val(ui.values[ 0 ]);
			$( "#amount1" ).val(ui.values[ 1 ] );
			}
		});   	      
		$( "#amount" ).change(function() {
			var valS = $('#amount').val();
			$( "#slider-range" ).slider( "values", 0 , valS );
		});      
		$( "#amount1" ).change(function() {
			var valS1 = $('#amount1').val();
			$( "#slider-range" ).slider( "values", 1 , valS1 );
		});	
});


///////////////////////////////////////////////////////////////////////////////////////////////////
 $(window).load(function(){
	$('.product_slider').multiCarousel('sliderAutoHeight', {visible: 1});
	$('.main_slider').multiCarousel('sliderAutoHeight', {visible: 1});
}); 
(function( $ ){

	var defOptionses, animated = false;

	var methods = {
		sliderAutoHeight : function(options) {

			return this.each(function(index, el){
			    var defOptions = $.extend({
			    	$el: this,
			    	dottedMenu: $('.slider__dots', this),
			    	dottedLink: $('.slider__dot', this),
			    	sliderMenu: $('.slider__arrows', this),
					sliderBtn: 	$('.scroll_btn', this),
			    	ul:   		$('.slider__items:first', this),
					li:   		$('.slider__items:first .slider__item', this),
					delay: 	    4000,
					visible: 	4,
					step: 		1,
					duration: 	600
			    }, options);

			    if (defOptions.li.length <= defOptions.visible) {
			    	defOptions.sliderMenu.hide();
			    	return false;
			    };
				if ($(window).width() < 960 ) {
	  				defOptions.li.width($(window).width());
	  			}
  				var widthDotVisible = defOptions.dottedMenu.width();
  				var visibleLi = widthDotVisible/defOptions.dottedLink.outerWidth(true);
				var liWIdth = defOptions.li.outerWidth(true),
					status = 0,
					stepPrev = defOptions.li.length - visibleLi,
					stepNext = 0;

				defOptions.ul.css({'width': liWIdth * defOptions.li.length});
				$('.slider__prev', defOptions.sliderMenu).addClass('noactive');

	  			
				$(window).resize(function(event) {
					widthDotVisible = defOptions.dottedMenu.width();
  					visibleLi = widthDotVisible/defOptions.dottedLink.outerWidth(true);
					liWIdth = defOptions.li.outerWidth(true),
					status = 0,
					stepPrev = defOptions.li.length - visibleLi,
					stepNext = 0;
					$(defOptions.dottedLink).first().click();
	  				$('.slider__dots__list').animate({
		  				left: 0
		  			}, defOptions.duration);
		  			
		  			if ($(window).width() < 960 ) {
		  				defOptions.li.width($(window).width());
		  			}else {
		  				defOptions.li.attr('style', '');
		  			}
					liWIdth = defOptions.li.outerWidth(true);
					defOptions.ul.css({'width': liWIdth * defOptions.li.length});
				});

			  	$('.slider__arrow', defOptions.sliderMenu).on('click', function() {
			  		if(defOptions.ul.is(':animated') ||  $(this).hasClass('noactive')){return false;}
			  		var go = false;

			  		if ( $(this).hasClass('slider__prev') ) {
			  			var symbol = '+=';				  			  	
			  			if (stepNext != 0) {
							stepPrev = ++stepPrev;
							stepNext = --stepNext;
							go = true;	
						}
			  			--status;
			  			$('.item_active', defOptions.ul).prev().addClass('item_active').siblings().removeClass('item_active');
		  				$('.slider__next', defOptions.sliderMenu).removeClass('noactive');
			  		} else if ( $(this).hasClass('slider__next') ) {
			  			var symbol = '-=';
			  			++status;
			  			if (stepPrev != 0) {			  				
							stepNext = ++stepNext;
							stepPrev = --stepPrev;
							go = true;	
			  			}
			  			$('.item_active', defOptions.ul).next().addClass('item_active').siblings().removeClass('item_active');
		  				$('.slider__prev', defOptions.sliderMenu).removeClass('noactive');
			  		}

	  				if (status == defOptions.li.length - defOptions.visible) {
	  					$('.slider__next', defOptions.sliderMenu).addClass('noactive');
	  				} else if(status == 0) {
	  					$('.slider__prev', defOptions.sliderMenu).addClass('noactive');
	  				}
					defOptions.ul.animate({
		  				left: symbol + liWIdth
		  			}, defOptions.duration);

	  				defOptions.dottedLink.eq(status).addClass('dot-active').siblings().removeClass('dot-active');

		  			if (go) {	
		  				$('.slider__dots__list').animate({
			  				left: symbol + defOptions.dottedLink.outerWidth(true)
			  			}, defOptions.duration);
		  			} 

			  		return false;
			  	});

				defOptions.dottedLink.on('click',  function(event) {
					var $this = $(this),
						indexDot = $this.index();

					status = indexDot;

	  				var widthDotVisible = defOptions.dottedMenu.width() + status*defOptions.dottedLink.outerWidth(true);
		  			
		  			$this.addClass('dot-active').siblings().removeClass('dot-active');

					if (indexDot == 0) {
  						$('.slider__next', defOptions.sliderMenu).removeClass('noactive');
	  					$('.slider__prev', defOptions.sliderMenu).addClass('noactive');
	  				} else if(indexDot == defOptions.dottedLink.length - 1) {
  						$('.slider__prev', defOptions.sliderMenu).removeClass('noactive');
	  					$('.slider__next', defOptions.sliderMenu).addClass('noactive');
  					} else {
  						$('.slider__arrow', defOptions.sliderMenu).removeClass('noactive');
  					}


		  			defOptions.ul.animate({
		  				left: -(indexDot * liWIdth)
		  			}, defOptions.duration);

					event.preventDefault();
				});
			});
		}
	}
	jQuery.fn.multiCarousel = function(method, options) {
	  	if ( methods[method] ) {
	   		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
     	} else if ( typeof method === 'object' || ! method ) {
	   		return methods.init.apply( this, arguments );
     	} else {
	   		$.error( 'Метод с именем ' +  method + ' не существует для jQuery.multiCarousel' );
     	} 
   };

})(jQuery);

