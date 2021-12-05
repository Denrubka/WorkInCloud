$('document').ready(function(){
	
	// AUTH WITH APPLE

	function parseJwt (token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
	}

  AppleID.auth.init({
      clientId : 'uaRevizionAuth',
      redirectURI : 'oper_form.php',
      state : "12345",
    	scope: 'name email',
			response_mode: 'form_post',
      usePopup : true //or false defaults to false
  })

  document.addEventListener('AppleIDSignInOnSuccess', (data) => {
	  let email = parseJwt(data.detail.authorization.id_token).email
    $.ajax({
      type: 'POST',
      url: 'inc.login.php', 
      data: { email, password: 'other_service_RnAX' },
      beforeSend: () => $('#login-send-results').html('<div align="center" style="margin-top: 40px;"><img src="https://reion.rtrt/img/load.gif"></div>'),
      success: data => $('#login-send-results').html(data).fadeIn(300)
    });
	})
	
	//настройки Fancybox
	
	$(".fancybox").fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		},
		openEffect	: 'none',
		closeEffect	: 'none',
		padding: 0
	});

	$(".fancy-video").fancybox({
		 padding: 0,
		'width'				: '90%',
		'height'			: '90%',
    'autoScale'     	: false,
    'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		'type'				: 'iframe'
	});
	
	// настройки попапов
	
	$('.modal-show-btn').fancybox({
      autoSize: true,
      type: 'inline',
      closeBtn: true,
      padding: 0,
      scrolling: 'visible',
      fixed: false,
      autoCenter: false,
      beforeShow: function() {
          $('input').removeClass('error');
          $('input[type="text"]').val('');
          $('textarea').val('');
          $(".fancybox-skin").css("background-color", "transparent");

          if(this.element.hasClass('order-link')){
              $('#order-modal [name="from"]').val(this.element.data('from'));
          }
      }
    }).click(() => {});
	
	//кнопка закрытия попапов
	
	$('.modal-close-btn').click(function() {
      $.fancybox.close();
      return false;
  });
	
	//input mask

	$(() => $('input[name="phone"]').inputmask("+ 7 ( 9 99 )  9 9 9   9 9   9 9") )

	// nicescroll настройки

	// $(".infos-collumn-2").niceScroll({
	// 	cursorcolor: "#A82F28",
	// 	cursorborder: "5px solid #F3F3F4",
	// 	background: "#F3F3F4",
	// 	cursoropacitymin: 0,
	// 	cursoropacitymax: 1, 
	// 	cursorborderradius: "0",
	// 	cursorwidth: "20px",
	// 	scrollspeed: 60,
	// 	mousescrollstep: 60,
	// 	autohidemode: false,
	// 	hidecursordelay: 10000,
	// 	zindex: 1
	// });

	// настройки скрола по якорям	

	$('.go_to').click( function(){
		var scroll_el = $(this).attr('href');
		if ($(scroll_el).length != 0) {
			if (($(window).width() > 1439)) {
				$('html, body').animate({ scrollTop: $(scroll_el).offset().top - 120 }, 800);
			} else if (($(window).width() > 785)){
				$('html, body').animate({ scrollTop: $(scroll_el).offset().top - 103 }, 800);
			} else {
				$('html, body').animate({ scrollTop: $(scroll_el).offset().top - 50 }, 800);
			}
		}
    return false;
	});

	$('.header-info__phones i').click( function(){
		$('.header-info__phones').toggleClass('active');
		$('.header-info__phones ul').toggleClass('active');
	});

	$('#radio-1').click( function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$( '#slider-1' ).slider( "disable" );
			$('#service-1').val("Нет");
		} else {
			$(this).addClass('active');
			$( '#slider-1' ).slider( "enable" );
			$('#service-1').val("Да");
		}
	});

	$('#checkbox-1').click( function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#messenger-1').val("Нет");
		} else {
			$(this).addClass('active');
			$('#messenger-1').val("Да");
		}
	});

	$('#checkbox-2').click( function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#messenger-2').val("Нет");
		} else {
			$(this).addClass('active');
			$('#messenger-2').val("Да");
		}
	});

	$('#checkbox-3').click( function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#messenger-3').val("Нет");
		} else {
			$(this).addClass('active');
			$('#messenger-3').val("Да");
		}
	});

	$( function() {
	    var handle = $( "#custom-handle-1 span" );
	    $( "#slider-1" ).slider({
	    	orientation: "horizontal",
	    	range: "min",
	    	min: 1,
	    	max: 50,
	    	value: 1,
	    	create: function() {
	        	handle.text( $( this ).slider( "value" ) );
	        	$('#value-1').val( $( this ).slider( "value" ) );
	    	},
	    	slide: function( event, ui ) {
	        	handle.text( ui.value );
	        	$('#value-1').val( $( this ).slider( "value" ) );
	        	if (ui.value<2) {
	        		$('.calc-item__descr-1 i').text( '1000');
	        		$('.calc-item__descr-1 sub').text( ' грн' );
	        	} else if ( ui.value > 1 && 5 > ui.value ) {
	        		$('.calc-item__descr-1 i').text( '900');
	        		$('.calc-item__descr-1 sub').text( ' грн' );
	        	} else if ( ui.value > 4 && 10 > ui.value ) {
	        		$('.calc-item__descr-1 i').text( '720');
	        		$('.calc-item__descr-1 sub').text( ' грн' );
	        	} else if ( ui.value > 9 && 20 > ui.value ) {
	        		$('.calc-item__descr-1 i').text( '650');
	        		$('.calc-item__descr-1 sub').text( ' грн' );
	        	} else if ( ui.value > 19 && 50 > ui.value ) {
	        		$('.calc-item__descr-1 i').text( '620');
	        		$('.calc-item__descr-1 sub').text( ' грн' );
	        	} else {
	        		$('.calc-item__descr-1 i').text( ' ');
	        		$('.calc-item__descr-1 sub').text( 'індивідуально' );
	        	}
	    	}
	    });
	});

	$('#radio-2').click( function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$( '#slider-2' ).slider( "disable" );
			$('#service-2').val("Нет");
		} else {
			$(this).addClass('active');
			$( '#slider-2' ).slider( "enable" );
			$('#service-2').val("Да");
		}
	});

	$( function() {
	    var handle = $( "#custom-handle-2 span" );
	    $( "#slider-2" ).slider({
	    	orientation: "horizontal",
	    	range: "min",
	    	min: 10,
	    	max: 5000,
	    	value: 10,
	    	step: 10,
	    	create: function() {
	        	handle.text( $( this ).slider( "value" ) );
	        	$('#value-2').val( $( this ).slider( "value" ) );
	    	},
	    	slide: function( event, ui ) {
	        	handle.text( ui.value );
	        	$('#value-2').val( $( this ).slider( "value" ) );
	    	}
	    });
	});

	$('#radio-3').click( function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$( '#slider-3' ).slider( "disable" );
			$('#service-3').val("Нет");
		} else {
			$(this).addClass('active');
			$( '#slider-3' ).slider( "enable" );
			$('#service-3').val("Да");
		}
	});

	$( function() {
	    var handle = $( "#custom-handle-3 span" );
	    $( "#slider-3" ).slider({
	    	orientation: "horizontal",
	    	range: "min",
	    	min: 10,
	    	max: 5000,
	    	value: 10,
	    	step: 10,
	    	create: function() {
	        	handle.text( $( this ).slider( "value" ) );
	        	$('#value-3').val( $( this ).slider( "value" ) );
	    	},
	    	slide: function( event, ui ) {
	        	handle.text( ui.value );
	        	$('#value-3').val( $( this ).slider( "value" ) );
	    	}
	    });
	});

	$('#radio-4').click( function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#service-4').val("Нет");
		} else {
			$(this).addClass('active');
			$('#service-4').val("Да");
		}
	});

	$('#radio-5').click( function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#service-5').val("Нет");
		} else {
			$(this).addClass('active');
			$('#service-5').val("Да");
		}
	});

	//настройки слайдера

	$('.reviews-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		autoplay: false,
		dots: false,
	    prevArrow: '.arrow-prev',		
		nextArrow: '.arrow-next',
		responsive: [{
			breakpoint: 1439,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
				autoplay: false,
			}
		},
		{
			breakpoint: 785,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: false,
			}
		}]
	});

	$('.team-list').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		autoplay: false,
		dots: false,
	    prevArrow: '.arrow-prev',		
		nextArrow: '.arrow-next',
		responsive: [{
			breakpoint: 1439,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
				autoplay: false,
			}
		},
		{
			breakpoint: 785,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: false,
			}
		}]
	});


	$('.reviews-slider-next').click(function(){
		$(".reviews-slider").slick("slickNext");
	});

	$('.team-slider-next').click(function(){
		$(".team-slider").slick("slickNext");
	});

	$('.brands-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: false,
		dots: false,
		fade: true,
		cssEase: 'linear'
	});

	$(".brands-dot").on("click",function(){
		$(this).hasClass("active")||($(".brands-dot").removeClass("active"),
		$(this).addClass("active"),
		$(".brands-slider").slick("slickGoTo",$(this).index()))
	});

	// настройки мобильного меню
	
	$('.menu-toggle').click(function(){
		$('.nav').toggleClass('active');
		$('.menu-toggle').toggleClass('active');
		$('body').toggleClass('fixed');
	});
	
	if($(window).width() < 768){
		$('.go_to').click( function(){
			$('.nav').removeClass('active');
			$('.menu-toggle').removeClass('active');
		});
	};
	
	// настройки WOW	

	var wow = new WOW({
		mobile:       false,
		live:         true,
		offset: 100,
	});
	wow.init();

	
	var btn = $('.top-btn');
	var header = $('.header');
	var nav = $('.nav');  
	$(window).scroll(function() {     
		if ($(window).scrollTop() > 700) {
	       btn.addClass('show');
	       header.addClass('fixed');
	       nav.addClass('fixed');
	    } else {
	       btn.removeClass('show');
	       header.removeClass('fixed');
	       nav.removeClass('fixed');
	    }
	});

	$('.ease-dot').click(function(){
		$(".ease-dot").removeClass("active");
		$(this).addClass("active");
		$(".ease-tab").removeClass("active");
		$(".ease-tab").eq($(this).index()).addClass("active");
	});

	//счетчик

	var number = document.querySelector('.stats-item__num-1'),
		numberTop = number.getBoundingClientRect().top,
    start = +number.innerHTML, end = +number.dataset.max;

	window.addEventListener('scroll', function onScroll() {
			if(window.pageYOffset > numberTop - window.innerHeight / 2) {
	    		this.removeEventListener('scroll', onScroll);
	        var interval = setInterval(function() {
	        		number.innerHTML = ++start;
	            if(start == end) {
	            		clearInterval(interval);
	            }
	        }, 5);
	    }
	});

	var number2 = document.querySelector('.stats-item__num-2'),
		numberTop = number2.getBoundingClientRect().top,
    start2 = +number2.innerHTML, end2 = +number2.dataset.max;

	window.addEventListener('scroll', function onScroll() {
			if(window.pageYOffset > numberTop - window.innerHeight / 2) {
	    		this.removeEventListener('scroll', onScroll);
	        var interval = setInterval(function() {
	        		number2.innerHTML = ++start2;
	            if(start2 == end2) {
	            		clearInterval(interval);
	            }
	        }, 5);
	    }
	});

	var number3 = document.querySelector('.stats-item__num-3'),
		numberTop = number3.getBoundingClientRect().top,
    start3 = +number3.innerHTML, end3 = +number3.dataset.max;

	window.addEventListener('scroll', function onScroll() {
			if(window.pageYOffset > numberTop - window.innerHeight / 2) {
	    		this.removeEventListener('scroll', onScroll);
	        var interval = setInterval(function() {
	        		number3.innerHTML = ++start3;
	            if(start3 == end3) {
	            		clearInterval(interval);
	            }
	        }, 5);
	    }
	});




});
// const cookie = document.querySelector('.cookie-wrapper');
// const cookieBtn = cookie.querySelector('.cookie-btn');
const infosTabsBtns = document.querySelectorAll('.infos-tab');
const infosTabsBlocks = document.querySelectorAll('.infos-tabs-block');
const cookieOpen = () => {
	cookie.classList.add('active');
}
const cookieTrue = () => {
	cookieBtn.addEventListener('click', () => {
		sessionStorage.setItem("booleanCookie", true);
		cookie.classList.remove('active')
	})
}

const infosTabs = () => {
	infosTabsBtns.forEach((item, i)=> {
		item.addEventListener('click', () => {
			if(!item.matches('active')) {
				infosTabsBtns.forEach(item => {
					item.classList.remove('active');
				});
				infosTabsBlocks.forEach(item => {
					item.classList.remove('active')
				})
				item.classList.add('active');
				infosTabsBlocks[i].classList.add('active')
			};
		});
	});
};
infosTabs();
// cookieTrue();

document.addEventListener('DOMContentLoaded', () => {

  if(!sessionStorage.getItem("booleanCookie")) {
	setTimeout(cookieOpen, 2000);
  }
})