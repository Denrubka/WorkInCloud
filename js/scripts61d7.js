$(document).ready(function(){

	//ico-officiant-menu 
	
	$('.off-menu-glob').hide();

	$('.ico-officiant-menu').click( function() {
		$('.off-menu-glob').fadeIn(1000);
	});
	
	// agree_gdpr
	
	$('.agree_gdpr').click( function() {
		
		$('.gdpr').fadeOut('1500');
		$.cookie("siteGDPR", 1);

	});
	
	// send_tg
	
	$.sendTG = function() {
		$('.send_tg').click( function() {
			if(!confirm('Ви впевненi?')) return
			 
			var review_id = $(this).attr("id");
			var chat_id = $(this).attr("rel");
			let btn = this

			if(chat_id == '')  {
				$(this).html('Не вказано ID чату!');
			} else {
				var dataString = 'review_id='+review_id+'&chat_id='+chat_id;
				$.ajax({
					type: 'POST',
					url: 'inc.sendReviewViaTG.php',
					data: dataString,

					cache: false,
					success: function(data){
						$(btn).hide();
						$(btn).html(data).fadeIn("1500");
					}
				})
			}
		});
	}
	$.sendTG()
	
	// saveNotes
	
	$.saveNotes = () => {
		$('.saveNotes').click( function() {
			var review_id = $(this).attr("id");
      var poster = $(this).attr("rel");
			var field = $(this).attr("data-field");
			var cab = $(this).attr("data-cab");

			var $then = $(this)
			var divField = $(this).next();

			var dataField = '[name="reviewNotes"]' 
			var dataField2 = '[name="reviewNotes_2"]' 
			var dataField3 = '[name="reviewNotes_3"]'
			var dataField4 = '[name="reviewNotes_4"]' 

			var text = $(this).closest('.notesWrap').find(dataField).val();
			var text2 = $(this).closest('.notesWrap').find(dataField2).val();
			var text3 = $(this).closest('.notesWrap').find(dataField3).val();
			var text4 = $(this).closest('.notesWrap').find(dataField4).val();


			var dataString = 'review_id='+review_id+'&text='+text+'&text_2='+text2+'&text_3='+text3+'&text_4='+text4+'&poster='+poster + '&field=' + field + '&cab=' + cab;

			$then.attr('disabled', true)
			$.ajax({
				type: 'POST',
				url: 'inc.saveUserNotes.php',
				data: dataString,
				cache: false,
				success: data => { 
					$then.removeAttr('disabled')
					$(divField).show()
					setTimeout(() => $(divField).hide(), 1000)
					console.log('sql_log',JSON.parse(data))
				}
			})
		})
	}

	$.saveNotes()
	
	// sendNewOrder

	$('.sendNewOrder').click( function() {

		var orderName = $("#orderName").val();
		var orderPhone = $("#orderPhone").val();
		var orderQR = $("#orderQR").val();
		var orderCAT = $("#orderCAT").val();
		
		if(orderName != '' && orderPhone !='')  {
			$('.orderSendResults').fadeOut(500);
			$(this).fadeOut(500);
			$('#orderName').fadeOut(500);
			$('#orderPhone').fadeOut(500);

			var dataString = 'type=4&getUrl='+orderQR+'&catPers='+orderCAT+'&orderName='+orderName+'&orderPhone='+orderPhone;
			
			$.ajax({
			type: 'POST',
			url: 'inc.setBtnCommand.php', 
			data: dataString,
					
				cache: false,
				success: function(data){
					//alert(data);
				}
			});

			$('.makeNewOrder').html('Запит відправлено');	
		} else {
			$('.orderSendResults').html('<div style="color: #ff0000; font-weight: bold; margin-top: 9px;">Не заповнено поля!</div>');
		}

	});
	
	// cliningCall

	$('.cliningCall').click( function() {

		var getUrl = $(this).attr("rel");
		var catPers = $(this).attr("id");

		$(this).hide();
		$(this).fadeIn(1500);
		$(this).attr('id','');

		var dataString = 'type=3&getUrl=' + getUrl  + '&catPers=' + catPers;

		$(this).html('Запит відправлено');

		$.ajax({
			type: 'POST',
			url: 'inc.setBtnCommand.php', 
			data: dataString,
					
			cache: false,
			success: function(data){
				//alert(data);
			}
		});

	});

	// step-nav-bill

	$('.step-nav-bill-check').click( function() {

		var getUrl = $(this).attr("rel");
		var catPers = $(this).attr("id");

		$(this).hide();
		$(this).fadeIn(1500);
		$(this).attr('id','');

		var dataString = 'type=1&getUrl=' + getUrl  + '&catPers=' + catPers;

		$(this).html('Запит відправлено');

		$.ajax({
			type: 'POST',
			url: 'inc.setBtnCommand.php', 
			data: dataString,
					
			cache: false,
			success: function(data){
				//alert(data); 
			}
		});

	});

	// ico-officiant-check

		$('.ico-officiant-check').click( function() {

		var getUrl = $(this).attr("rel");
		var catPers = $(this).attr("id");

		$(this).hide();
		$(this).fadeIn(1500);
		$(this).attr('rel','');

		var dataString = 'type=2&getUrl=' + getUrl  + '&catPers=' + catPers;

		$(this).html('Запит відправлено');

		$.ajax({
			type: 'POST',
			url: 'inc.setBtnCommand.php', 
			data: dataString,
					
			cache: false,
			success: function(data){
				//alert(data);
			}
		});

	});

	///

	$('.postText').hide();

	$('#checkbox-agree').change(function () {
		if(this.checked){
			$(".toSend").attr("disabled", false);
			$('.postText').hide();
		}else{
			$(".toSend").attr("disabled", true);
			$('.postText').show();
		}
	 });

	///

	$('.Qfield').hide();

	$('.q-type').click( function() { 
		$('.Qfield').fadeIn();

	});
	
	///

	$('.changeLang').click( function() {

		var setLang = $(this).attr("id");
		var setUrl = $(this).attr("rel");
		var dataString = 'setLang='+ setLang + '&setUrl=' + setUrl;

		$.ajax({
			type: 'POST',
			url: 'inc.setNewLang.php', 
			data: dataString,
					
			cache: false,
			success: function(data){
				$('.setNewLang').html(data);
			}
		});

	});

	///

	$('.addLike').click( function() {
		var likes = $(this).attr('id');
		var type = 'up';
		var likesCount = Number($(this).find('.uplikes').text());

		var dataString = 'likes='+ likes + '&likesCount=' + likesCount + '&type=' + type;

		$.ajax({
			type: "POST",
			url: "inc.likesRate.php",
			data: dataString,
			success: function(data) {
				$('#resRate').html(data);
			}
		  });
		 return false;		

	});

	//

	$('.addDislike').click( function() {
		var likes = $(this).attr('id');
		var type = 'down';
		var likesCount = Number($(this).find('.downlikes').text());

		var dataString = 'likes='+ likes + '&likesCount=' + likesCount + '&type=' + type;

		$.ajax({
			type: "POST",
			url: "inc.likesRate.php",
			data: dataString,
			success: function(data) {
				$('#resRate').html(data);
			}
		  });
		 return false;	

	});

	///

	function iosInputBug(){

		var iOS = parseFloat(
			('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
			.replace('undefined', '3_2').replace('_', '.').replace('_', '')
		) || false;

		if(iOS >= 11){
			$(document).on('focus', '.mfp-content input', function (){
				$('body').css({'position':'fixed', 'width':'100%'});
			});
			$(document).on('blur', '.mfp-content input', function(){
				$('body').css({'position':'', 'width':''});
			});
		}

	}
	iosInputBug();

	//partners full
	$('.p-partners-list > li > a').click(function(e){
		e.preventDefault();
		var cordLeft = $(this).position().left;
		var cordTop = $(this).position().top;
		var width = $(this).innerWidth();
		var widthTriangle = $('.partners-triangle').innerWidth();
		var result = (cordLeft + width/2) - 20;
		$('.partners-triangle').css({'left':result});
		$('.p-partners-list > li > a').not(this).parent().find('.p-partners-text').slideUp();
		$('.p-partners-list > li > a').not(this).parent().animate({'margin-bottom' : 0});

		var thisElement = $(this).parent().find('.p-partners-text');//сохраняем текущий объект
		

		if(thisElement.css('display') == 'none'){
			var heightTextBlock = $(this).parent().find('.p-partners-text').css({'visibility':'hidden', 'display':'block'}).innerHeight();//получаем высоту скрытого контента
			thisElement.css({'visibility':'', 'display':'none'});
		}else{
			heightTextBlock = 0;
		}
		thisElement.slideToggle();
		$(this).parent().animate({'margin-bottom' : heightTextBlock});
	});

	// p24

	$('#amount').keyup(function(){
		var curr_summ = $("input[name='amount']").val();
		var cPrefix = $("input[name='clientPrefix']").val();
		
		$.ajax({
			type: 'POST',
			url: 'inc.makeString.p24.php',
			data: "curr_summ="+curr_summ+"&cPrefix="+cPrefix,

			cache: false,
				success: function(data){
				$('.resultP24string').html(data);
				
			}
		});

	});

	// loadMoreReviews

	$('.loadMoreReviews').show();
	$('.loadMoreReviewsPersonal').show();

	$('.loadMoreReviews').click( function() {
		var curr_rev = $("input[name='curr_rev']").val();
		var curr_u = $("input[name='curr_u']").val();
		var filter_object = $("input[name='filter_object']").val();
		var filter_type = $("input[name='filter_type']").val();
		var totals = $("input[name='totals']").val();
		var commentz = $("input[name='commentz']").val();

		$.ajax({
			type: 'POST',
			url: 'inc.loadMoreReviews.php',
			data: "curr_rev="+curr_rev+"&curr_u="+curr_u+"&filter_object="+filter_object+"&filter_type="+filter_type+"&totals="+totals+"&commentz="+commentz,

				beforeSend: function(){
					$('.preload').show();
				},

			cache: false,
				success: function(data){
				$('.preload').hide();
				$('.loadMoreReviewsDiv').append(data);
				
			}
		});

	});

	//

	$('.loadMoreReviewsPersonal').click( function() {
		var curr_rev = $("input[name='curr_rev']").val();
		var curr_u = $("input[name='curr_u']").val();
		var filter_object = $("input[name='filter_object']").val();
		var filter_type = $("input[name='filter_type']").val();
		var totals = $("input[name='totals']").val();

		$.ajax({
			type: 'POST',
			url: 'inc.loadMoreReviewsPersonal.php',
			data: "curr_rev="+curr_rev+"&curr_u="+curr_u+"&filter_object="+filter_object+"&filter_type="+filter_type+"&totals="+totals,

				beforeSend: function(){
					$('.preload').show();
				},

			cache: false,
				success: function(data){
				$('.preload').hide();
				$('.loadMoreReviewsPersonalDiv').append(data);
				
			}
		});

	});

	//

	$('.reviews-aside__arrow').append('<div class="menu-Left"></div>');

	$(".step3Result").hide();

	// ico-q-types

	$('.idea-ico').css("opacity","0.25");
	$('.warning-ico').css("opacity","0.25");

	$('.idea-ico').click( function() {
		$('.question-ico').css("opacity","0.25");
		$('.warning-ico').css("opacity","0.25");
		$('.idea-ico').css("opacity","1");
		$('#type').val('2');
	});

	$('.warning-ico').click( function() {
		$('.question-ico').css("opacity","0.25");
		$('.idea-ico').css("opacity","0.25");
		$('.warning-ico').css("opacity","1");
		$('#type').val('3');
	});

	$('.question-ico').click( function() {
		$('.idea-ico').css("opacity","0.25");
		$('.warning-ico').css("opacity","0.25");
		$('.question-ico').css("opacity","1");
		$('#type').val('1');
	});
	
	$('.msgEmailRequired').show();

	$('#umail').keyup(function(){
	  var Value = $('#umail').val();

	  if(Value =="") {
		$('.msgEmailRequired').fadeIn();
	  } else {
		$('.msgEmailRequired').fadeOut();
	  }
	});

	// loadImage

	$('.show-photo').hide();

	$('.loadImage').click( function() {
		$('.show-photo').fadeIn();
		var IMAGEtoShow = $(this).attr('id');
		var FullImg = '<div align="center"><img src='+ IMAGEtoShow + '></div>';
		$('.show-photo-img').html(FullImg);
	});

	// hide-photo

	$('.hide-photo').click( function() {
		$('.show-photo').fadeOut();
	});

	// offline obJects 

	$('.hide-newObjectAdd').click( function() {
		$('.newObjectAdd').hide();
	});
	
	$('#newCodeAddForm').hide();
	$('.newObjectAdd').hide();

	$('.newObjectAction').click( function() {
		$('.newObjectAdd').show();
	});

	$('.newCodeAdd').click( function() {
		$('#newCodeAddForm').show();
	});

	$('.newCodeAddHide').click( function() {
		$('#newCodeAddForm').hide();
	});


	//height with width
	function setHeightItem(elem, size, param){

		var element = elem;
		element.each(function(){
			var width = $(this).innerWidth();
			$(this).css(param, width/size);
		});

	};

	//tabs
	function tabs(){

		var button = $('.tabs-control__btn');
		var element = $('.tabs-element');

		button.on('click', function(){

			var self = $(this);

			if( !self.hasClass('tabs-control__btn_current') ){

				button.removeClass('tabs-control__btn_current');
				self.addClass('tabs-control__btn_current');
				var dataValue = self.attr('data-tabs');
				element.removeClass('tabs-element_active').css({'display':'none'});

				var currentElement = $.grep(element, function(n){
					return $(n).attr('data-tabs') == dataValue;
				});

				$(currentElement).fadeIn();

			}else{
				return;
			}
			
		});

	}
	tabs();

	//register form popup
	$('.popup-open').magnificPopup({
		type: 'inline',
		preloader: false,
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	//ie polyfill object-fit
	objectFitImages();

	//sticky header
	function setStickyHeader(){

		var header = $('.header');
		var windowScroll = $(window).scrollTop();

		if( windowScroll > 100 ){
			header.addClass('header_sticky');
		}else{
			header.removeClass('header_sticky');
		}

	}
	setStickyHeader();
	$(window).on('scroll', setStickyHeader);

	//mobile menu
	function mobileMenu(){

		var touch 	= $('.hamburger');
		var menu = $('.mobile-menu');

		//mobile menu link position
		function mobileMenuPosition(){
			var buttonCord = $('.m-menu-wrap .header-top__header-btn_transparent')
			if( !buttonCord.length ) return
				
			buttonCord.offset().left;
			$('.m-menu-wrap a').not('.header-top__header-btn_transparent').css({'margin-left':buttonCord});
		}

		touch.on('click', function(e){

			e.preventDefault();
			$(this).stop().toggleClass('is-active');
			if($(this).hasClass('is-active')){
				$('body').css({'overflow':'hidden', 'padding-right':calcScrollBarWidth()});
				$(this).closest('header').find(menu).slideDown();
				mobileMenuPosition();
			}else{
				$('body').css({ 'padding-right':'0','overflow':'',});
				$(this).closest('header').find(menu).slideUp();
			}

		});

		$('.mobile-menu a').click(function(){
			$('body').css({'overflow':''});
			$('.mobile-menu').slideUp();
			touch.each(function(){
				$(this).removeClass("is-active");
			});
		});

		$(window).resize(function(){
			var w = $(window).innerWidth();
			if(w > 767 - calcScrollBarWidth()) {
				menu.removeAttr('style');
				$('.hamburger'). removeClass("is-active");
			}
			if(menu.css('display')!='none'){
				//mobile menu link position
				mobileMenuPosition();
			}
		});

		function calcScrollBarWidth(){
			var inbar = $('body').innerWidth();
			$('body').css({'overflow':'hidden'});
			var outbar = $('body').innerWidth();
			var scrollBarWidth = outbar - inbar;
			$('body').css({'overflow':''});
			return scrollBarWidth;
		};

	}
	mobileMenu();

	//mobile email mogile
	function mobileEmail(desktop, parent, mobile){

		var desktop = $(desktop);
		desktop.each(function(){
			var desktopVal = $(this).text();
			var shortText = desktopVal.substr(0, 4) + '...';
			$(this).closest(parent).find(mobile).text(shortText);
		});

	}
	mobileEmail('.queue-table__mail-desktop', '.queue-table__mail', '.queue-table__mail-mobile');

	$.datepicker.setDefaults( $.datepicker.regional[ "uk" ] );

function beforeShow(input) {

	var dateFormat = "dd/mm/yy";
	var element = $(input);

	if(element.hasClass('filter-datepicker_from')){
		var elementTo = element.closest('.datepicker-group').find('.filter-datepicker_to');
		element.on('change', function(){
			var minDate = element.val();
			elementTo.datepicker( "option", "minDate", $.datepicker.parseDate( dateFormat, minDate ) );
		});
		
	}

	return;
}

$('.filter-datepicker').datepicker({
	beforeShow: beforeShow,
	dateFormat: "dd/mm/yy"
});


function setDateInLoad(){
	
	var dateInput = $( ".filter-datepicker" );
	var inputCount = 0;

	dateInput.each(function(){

		var self = $(this);
		var elementVal = self.val();

		if( elementVal.length != 0 && typeof(elementVal) !== undefined){
			self.datepicker( "setDate", elementVal );
		}else{
			self.datepicker( "setDate", new Date() );
		}

		inputCount++;
		console.log(inputCount);
		if(inputCount == dateInput.length){
			setTo();
		}

	});

	function setTo(){

		var dateInputTo = $( ".filter-datepicker_to" );
		dateInputTo.each(function(){

			var self = $(this);
			var dateInputFrom = self.closest('.datepicker-group').find('.filter-datepicker_from').val();
			self.datepicker( "option", "minDate", dateInputFrom );

		});

	}

}

setDateInLoad();

$('.filter-datepicker_from, .filter-dashboard_from').on('click', function(){
	let data = $(this).val();
	let input_to = $(this).parent().next().find('input').val();

	input_to = '01'+input_to.substr(2, input_to.length - 2);
	// console.log(input_to);
	// var date = new Date();
	// let m = date.getMonth();
	// let y = date.getFullYear();
	// m++;
	// if(m < 9) m = '0'+m;
	$(this).val(input_to);
		dateInput = $( ".filter-datepicker" );
		var self = $(dateInput[0]);
		var elementVal = self.val();

		if( elementVal.length != 0 && typeof(elementVal) !== undefined){
			self.datepicker( "setDate", elementVal );
		}else{
			self.datepicker( "setDate", new Date() );
		}

});

	//reviews item check bg color
	function checkReviews(){

		var check = $('.reviews-check__single');
		var checkAll = $('.check-all-reviews');
		
		check.on('change', function(){
			var self = $(this);

			if( self.prop("checked") ){
				self.closest('.reviews-item__bg').addClass('reviews-item__bg_checked');
			}else{
				self.closest('.reviews-item__bg').removeClass('reviews-item__bg_checked');
			}

			//.check-all-reviews reset
			var checkLength = $.grep(check, function(n){
				if($(n).prop('checked') == true){
					return true;
				}
			})
			if(!checkLength.length > 0){
				checkAll.prop('checked', false);
			};
		});

		checkAll.on('change', function(){
			var self = $(this);
			var allInput = $('.reviews-check__single');
			if(self.prop("checked")){
				allInput.prop('checked',true);
				allInput.each(function(){
					$(this).closest('.reviews-item__bg').addClass('reviews-item__bg_checked');
				});
			}else{
				allInput.prop('checked',false);
				allInput.each(function(){
					$(this).closest('.reviews-item__bg').removeClass('reviews-item__bg_checked');
				});
			}
		});

	}
	checkReviews();
	
	//look more in reviews page
	function toggleReviews(){
	
		var button = $('.reviews-more__btn');
		
		button.on('click', function(e){
			e.preventDefault();
			var self = $(this);
			self.toggleClass('reviews-more__btn_active');
			if(self.hasClass('reviews-more__btn_active')){
				self.closest('.reviews-wrap').find('.dot').css({'display':'none'});
				self.closest('.reviews-wrap').find('.reviews-wrap__text_hide').css({'display':'inline'});
			}else{
				self.closest('.reviews-wrap').find('.dot').css({'display':''});
				self.closest('.reviews-wrap').find('.reviews-wrap__text_hide').css({'display':''});
			}
		});

	}
	toggleReviews();

	//cut text reviews
	function cutText(){

		var text = $('.reviews-wrap__text_show');
		text.each(function(){
			var self = $(this);
			var textLength = self.attr('data-length-text');
			var fullText = $(this).text();
			var showText;
			var hideText;
			if(fullText.length>textLength){
				showText = fullText.substring(0, textLength);
				hideText = fullText.substring(textLength);
				self.text(showText);
				self.closest('.reviews-wrap__text').find('.reviews-wrap__text_hide').text(hideText);
				
			}else if(fullText.length<=textLength){
				self.closest('.reviews-wrap__text').find('.dot').css({'display':'none'});
				self.closest('.reviews-wrap').find('.reviews-more__btn').css({'display':'none'});
			}
		});

	}
	cutText();

	//show prop button in reviews page
	function showPropButton(){

		var textField = $('.reviews-item');
		textField.on('mouseenter', function(){
			var self = $(this);
			var propButton = self.find('.reviews-item__main-wrap');
			propButton.stop().slideDown(function(){
				$(this).css({'height':''});
			});
			textField.on('mouseleave', function(e){
				propButton.stop().slideUp(function(){
					$(this).css({'height':''});
				});
			});
		});

	}
	showPropButton();
	
	//look more prop change
	$.changeMoreProp = () => {

		var buttonContest = $('.look-more__contest');
		var buttonContestGlobal = $('.reviews-action__btn-contest');
		var buttonAnswer = $('.look-more__answer');

		function removeActive(element){
			element.closest('.look-more').find('.look-more__prop button').removeClass('look-more__btn_active');
		};

		buttonContest.on('click', function(e){

			e.preventDefault();
			var self = $(this);
			var lookMore = self.closest('.look-more');
			if( !self.hasClass('look-more__btn_active') ){
				removeActive(self);
				self.addClass('look-more__btn_active');
				lookMore.find('.contest-toggle').stop().slideDown();
				lookMore.find('.look-more__textarea').stop().slideDown();
				lookMore.find('.more-answer-hide').stop().slideDown();
				lookMore.find('.more-answer__toggle').css({'display':'none'});
				//lookMore.find('.answer-button__submit').text('відправити');
				lookMore.find('#answerArea').hide();
			}else{
				removeActive(self);
				//lookMore.find('.contest-answerArea').stop().slideDown();
				lookMore.find('.contest-toggle').stop().slideUp();
				lookMore.find('.look-more__textarea').stop().slideUp();
				lookMore.find('.more-answer-hide').stop().slideUp();
				lookMore.find('#answerArea').hide();
			}

		});

		buttonAnswer.on('click', function(e){

			e.preventDefault();
			var self = $(this);
			var lookMore = self.closest('.look-more');
			if( !self.hasClass('look-more__btn_active') ){
				removeActive(self);
				self.addClass('look-more__btn_active');
				lookMore.find('.contest-toggle').stop().slideUp();
				lookMore.find('.more-answer__toggle').stop().slideDown();
				lookMore.find('.look-more__textarea').stop().slideDown();
				lookMore.find('.more-answer-hide').stop().slideDown();
				lookMore.find('.more-answer__toggle').css({'display':'block'});
				//lookMore.find('.answer-button__submit').text('відповісти');
				lookMore.find('#answerArea').show();
			}else{
				removeActive(self);
				lookMore.find('.more-answer__toggle').stop().slideUp();
				lookMore.find('.look-more__textarea').stop().slideUp();
				lookMore.find('.more-answer-hide').stop().slideUp();
				lookMore.find('#answerArea').hide();
			}

		});

		buttonContestGlobal.on('click', function(e){
			e.preventDefault();
			var self = $(this);
			if( !self.hasClass('look-more__btn_active') ){
				self.addClass('look-more__btn_active');
				self.closest('.reviews-action').find('.reviews-action__contest').stop().slideDown();
			}else if( self.hasClass('look-more__btn_active') ){
				self.removeClass('look-more__btn_active');
				self.closest('.reviews-action').find('.reviews-action__contest').stop().slideUp();
			}
		});

	}
	$.changeMoreProp();

	//sidebar toggle
	function sidebarToggle(){

		var button = $('.reviews-aside__arrow');
		var sidebar = $('.reviews-aside');

		$('body').on('click', '.reviews-aside__arrow, .aside-overaly', function(){

			sidebar.stop(true, true).toggle( "slide", "linear", 400 ).toggleClass('reviews-aside_active');

			if($('.reviews-aside').hasClass('reviews-aside_active')){
				$('.reviews-aside__arrow').stop().animate({'left':300}, 400).addClass('reviews-aside__arrow_active');
				var overlay = $('<div class="aside-overaly"></div>');
				$('body').append(overlay).css({'overflow':'hidden'});
				$('.aside-overaly').fadeIn();
			}else{
				$('.reviews-aside__arrow').stop().animate({'left':0}, 400).removeClass('reviews-aside__arrow_active');
				$('.aside-overaly').remove();
				$('body').css({'overflow':''});
			}
		});

	}
	sidebarToggle();

	//question tooltip
	var tip = tippy('.tooltip-right', {
		position: 'right',
		animation: 'shift',
		duration: 1000,
		theme: 'honeybee',
		size: 'big'
	});

	// input type file
	function changeFile(){
		var input = $('.input-file_hide');
		input.on('change', function(){
			var self = $(this);
			var fileName = self.val().split('\\').pop();
			var parent= self.closest('.input-file');
			// parent.find('.input-file__placeholder').text(fileName);
            // self.next('.input-file__custom').children('.biglabel').children('.selfie-icon').addClass('selfie-icon-active');
			// console.log(self.next('.input-file__custom').children('.biglabel'));

				// это на анимацию
        self.next('.input-file__custom').children('.biglabel').addClass('input-file__custom-active');
        self.next('.vs_file_close').show();

		});
	}
	changeFile();

	$(".widget-code__text").on('click', function() {
		var sel, range;
		var el = $(this)[0];
		if (window.getSelection && document.createRange) { //Browser compatibility
		  sel = window.getSelection();
		  if(sel.toString() == ''){ //no text selection
			 window.setTimeout(function(){
				range = document.createRange(); //range object
				range.selectNodeContents(el); //sets Range
				sel.removeAllRanges(); //remove all ranges from selection
				sel.addRange(range);//add Range to a Selection.
			},1);
		  }
		}else if (document.selection) { //older ie
			sel = document.selection.createRange();
			if(sel.text == ''){ //no text selection
				range = document.body.createTextRange();//Creates TextRange object
				range.moveToElementText(el);//sets Range
				range.select(); //make selection.
			}
		}
	});

	//update jquery object
	(function ( $ ) {
	$.fn.update = function(){
		var newElements = $(this.selector),i;    
		for(i=0;i<newElements.length;i++){
		this[i] = newElements[i];
		}
		for(;i<this.length;i++){
		this[i] = undefined;
		}
		this.length = newElements.length;
		return this;
	};
	})(jQuery);

	//add and remove setings
	function addSetings(elementWrap,maxField,addButtonSelector,input,newClass,delButton){

		var container = $('.'+elementWrap);
		var maxFieldLength = +container.attr(maxField);
		var addButton = $('#'+addButtonSelector);
		var mailInput = $('.'+input);
		var newFieldClass = container.find('.'+newClass);
		var i = 0;

		if(newFieldClass.length >= maxFieldLength){
			addButton.css({'display':'none'});
		}

		addButton.on('click', function(e){

			e.preventDefault();

			if(newFieldClass.length >= maxFieldLength){
				addButton.css({'display':'none'});
				return;
			}else{
				
				var newInput = mailInput.clone().addClass(newClass);
				newInput.removeClass('del-btn-hide').find('input:text').not('.filter-datepicker').val('').removeAttr('disabled');

				// new name
				var newInputItem = newInput.find('input:text');
				var elementCount = ( $('.'+newClass).length ) + 1;
				var inputName = newInputItem.attr('name');
				var nameIndex = inputName.indexOf('_');
				if( typeof inputName !== typeof undefined && inputName !== false ){
					if( nameIndex != -1 ){
						var newName = ( inputName.substring(0, nameIndex) + '_' + elementCount );
						newInputItem.attr( 'name', newName );
					}else{
						newInputItem.attr( 'name', (inputName + '_' + elementCount) );
					}
				}

				//checkbox id in stranica-otzivov.html
				if(newInput.has('.reviews-check')){
					i++;
					var hideInput = newInput.find('.check-hide');
					var attrId = newInput.find('.check-hide').attr('id');
					hideInput.attr('id', attrId+i);
					newInput.find('.check-all__custom').attr('for', hideInput.attr('id'));
				}

				//datepicker field
				if(newInput.has('.filter-datepicker')){
					var inputElement = newInput.find('.filter-datepicker');
					inputElement.removeAttr('id');
					inputElement.removeClass('hasDatepicker');
					inputElement.datepicker({
						beforeShow: beforeShow,
						dateFormat: "dd/mm/yy"
					});
					inputElement.datepicker( "setDate", new Date() );
					// newInput.find('.filter-datepicker').dateDropper();
				}

				//tooltip update
				if(newInput.has('.tooltip-right')){

					var tipSet = newInput.find('.tooltip-right');
					tipSet.each(function(){
						$(this).removeAttr('data-tooltipped').removeAttr('aria-describedby');
						var title =	$(this).attr('data-original-title');
						$(this).removeAttr('data-original-title').attr('title', title);
					});

					tip.destroyAll();
					
				}

				container.append(newInput);
				newFieldClass.update();
				if(newFieldClass.length >= maxFieldLength){
					addButton.css({'display':'none'});
				}

				//tooltip update
				tip = tippy('.tooltip-right', {
					position: 'right',
					animation: 'shift',
					duration: 1000,
					theme: 'honeybee',
					size: 'big'
				});

			}

		});
		
		$('body').on('click', '.'+delButton, function(e){
			e.preventDefault();
			$(this).closest(newFieldClass).remove();
			newFieldClass.update();
			if(newFieldClass.length < maxFieldLength){
				addButton.css({'display':'inline-block'});
			}
		});

	}

	//add and remove mail in obchie.html
	addSetings('common-setings__mail-wrap','data-mail-length','mail-more','common-setings-input__mail:first','js-email','del-mail');

	//add and remove rating in obchie.html
	addSetings('common-setings__ratting-wrap','data-rating-length','rating-more','common-setings-input__rating:first','js-rating','del-rating');

	//add and remove delivery in stranica-otzivov.html
	addSetings('comment-page__delivery','data-delivery-length','delivery-more','comment-page__check-wrap-more:first','js-delivery','del-delivery');

	//add and remove delivery in zpit.html
	addSetings('client__wrap','data-client-length','client-more', 'client__item:first','js-client','client__del');

	//check bg color table row in offline page
	function setRowColor(){

		var check = $('.check-color');

		check.on('change', function(){
			var self = $(this);
			if( self.prop("checked") ){
				self.closest('tr').addClass('row-color');
			}else{
				self.closest('tr').removeClass('row-color');
			}
		});

	}
	setRowColor();

	var UserColor = $('#des_color').val();

	//design color field
	$('.color-change').spectrum({
		color: UserColor,
		showButtons: false,
		preferredFormat: "hex",
		showInput: true,
	});

	//EqualHeight platezhi.html
	$('.tariff__title-wrap').responsiveEqualHeightGrid();

	//EqualHeight index.html capabilities-item__name
	$('.capabilities-item__name').responsiveEqualHeightGrid();


	//phone input mask
    var detectAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
    if(!detectAndroid){
        $('.popup-register__input-phone').inputmask("+38 (999) 999 99 99", {
            clearMaskOnLostFocus: false,
        });

        $('.checkphone').inputmask("+38-999-9999999", {
            clearMaskOnLostFocus: false,
        });
    }

	// tarif plan add in form

	$('.tariff__btn').click( function() {
		var planName = $(this).attr("id");
		$("#pre_order_tarif").val(planName);
	});

	// addNewPersonalReview

	$('.toSendReviewPersonal').click( function() {

		var userfio = $('#userfio').val()
		var usermail = $('#usermail').val()
		var userphone = $('#phone2').val() == $('#phone2').attr("data-code") ? "" : $('#phone2').val()
		var newrevid = $('#newrevid').val()
		var offlineid = $('#offlineid').val()
		var anonim = $('#anonim').is(':checked')

		$.ajax({
			type: 'POST',
			url: 'inc.addNewReviewPersonal.php',
			data: "userfio="+userfio+"&usermail="+usermail+"&userphone="+userphone+"&newrevid="+newrevid+"&offlineid="+offlineid+"&anonim="+anonim,

				beforeSend: function(){
					$('.preload').show();
				},

			cache: false,
				success: function(data){
				$('.preload').hide();
				$('.vote-results').html(data);
				
			}
		});
		
	});

	// addNewEventReview

	if($('*').is('#posting-offline3')){

    //custom validation method
    jQuery.validator.addMethod("phoneMask", function(value, element) {
        var cleanedValue = value.replace(/\D+/g, '');
        return cleanedValue.length > 11 || cleanedValue.length == 0;
    }, phoneRequired);

    var phoneValidate = !detectAndroid ? { phoneMask:true} : {number:true};

    $('#posting-offline3').validate({
        rules:{
            "userphone": {phoneMask: true},
            'usermail':{email: true}
        },
        //Текст предупреждений
        messages:{
            'usermail':{ required: emailRequired, email: emailIncorrect },
            'userphone':{ required: phoneRequired}
        }
    });

   $('.toSendReviewEvent').click( function() {

	    if($('#posting-offline3').valid()){

			var userfio = $('#userfio').val()
			var usermail = $('#usermail').val()
			var userphone = $('#phone2').val() == $('#phone2').attr("data-code") ? "" : $('#phone2').val()
			var newrevid = $('#newrevid').val()
			var offlineid = $('#offlineid').val()

			$.ajax({
				type: 'POST',
				url: 'inc.addNewReviewEvent.php',
				data: "userfio="+userfio+"&usermail="+usermail+"&userphone="+userphone+"&newrevid="+newrevid+"&offlineid="+offlineid,

					beforeSend: function(){
						$('.preload').show();
					},

				cache: false,
					success: function(data){
					$('.preload').hide();
					$('.vote-results').html(data);
					
				}
			});

		};
		
	});

}

	// addNewOfflineReview

	if($('*').is('#posting-offline')){

    //custom validation method
    jQuery.validator.addMethod("phoneMask", function(value, element) {
        var cleanedValue = value.replace(/\D+/g, '');
        return cleanedValue.length > 11 || cleanedValue.length == 0;
    }, phoneRequired);

    var phoneValidate = !detectAndroid ? { phoneMask:true} : {number:true};

    $('#posting-offline').validate({
        rules:{
            // "phone": {phoneMask: true},
            'usermail':{email: true}
        },
        //Текст предупреждений
        messages:{
            "userfio":{ required: nameRequired },
            'usermail':{ required: emailRequired, email: emailIncorrect },
            'phone':{ required: phoneRequired}
        }
    });

    $('.toSend').click(function(){
    
        if($('#posting-offline').valid()){

   			let checkboxes = '';
			$('.checkboxes:checkbox:checked').each((index, el) => checkboxes += $(el).val()+',' )
			checkboxes = checkboxes.substring(0, checkboxes.length - 1)

            var userfio = $('#userfio').val()
            var usermail = $('#usermail').val()
            var userphone = $('#phone2').val() == $('#phone2').attr("data-code") ? "" : $('#phone2').val()
            var newrevid = $('#newrevid').val()
            var offlineid = $('#offlineid').val()
            var mail_req = $('#mail_req').val()
			var radio_req = $('#radio_req').val()
            var phone_req = $('#phone_req').val()
            var add_field1 = $('#add_field1').val()
            var born_date = $('#born_date').val()

			//var radiovalue = $("input[name='radiovalue']").val()
			var radiovalue = $('input[name="radiovalue"]:checked').val();
        		
	          var chatBot = $('#input-chat-bot')
	      		var link_chatBot = ''
	          if(chatBot.length) {
	          	chatBot = chatBot.val()
		      		if(chatBot != '' && chatBot == 'tg') 
		      			link_chatBot = 'https://t.me/revizion_bot?start='+newrevid
		      		
		      		if(chatBot != '' && chatBot == 'vb') 
		      			link_chatBot = 'viber://pa?chatURI=revizionua&context='+newrevid
	          }
            //var addfield1title = $('#add_field1_title').val()
			
						//var addfield1title = $("input[name='addfield1title']").val()
						
						var addfield1title = $('input[name="addfield1title"]:checked').val();

						var addfield2title = $('#add_field2_title').val()
            var anonim = $('#anonim').is(':checked')
            var city = $('input[name=city]:checked').val()
            
            $.ajax({
                type: 'POST',
                url: 'inc.addNewOfflineReview.php',
                data: "userfio="+userfio+"&usermail="+usermail+"&userphone="+userphone+"&newrevid="+newrevid+"&offlineid="+offlineid+"&mail_req="+mail_req+"&phone_req="+phone_req+"&addfield1title="+addfield1title+"&anonim="+anonim+"&add_field1="+add_field1+"&born_date="+born_date+"&city="+city+"&addfield2title="+addfield2title+"&checkboxes="+checkboxes+"&radiovalue="+radiovalue+"&radio_req="+radio_req,
            
                beforeSend: function(){
                    $('.preload').show();
                },
            
                cache: false,
                success: function(data){
                    $('.preload').hide();
                    $('.vote-results').html(data);

                    if(link_chatBot !== '')	window.location.href = link_chatBot
                }
            });
        };

    });

}

	// remindPassDMana

	$('.remindPassDMana').click( function() {

		var formID = $('form.popup-login-dmanagera').attr('id');
		var formNm = $('#' + formID);

		$.ajax({
				type: 'POST',
				url: 'inc.reminderdMana.php', 
				data: formNm.serialize(),
					beforeSend: function(){
					$('#login-dmanagera-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
				},
				success: function (data) {
					$('#login-dmanagera-results').html(data).fadeIn(300);
				}
		});
		return false;
		
	});

	// remindPassDMan

	$('.remindPassDMan').click( function() {

		var formID = $('form.popup-login-dmanager').attr('id');
		var formNm = $('#' + formID);

		$.ajax({
				type: 'POST',
				url: 'inc.reminderdMan.php', 
				data: formNm.serialize(),
					beforeSend: function(){
					$('#login-dmanager-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
				},
				success: function (data) {
					$('#login-dmanager-results').html(data).fadeIn(300);
				}
		});
		return false;
		
	});

	// remindPassMan

	$('.remindPassMan').click( function() {

		var formID = $('form.popup-login-manager').attr('id');
		var formNm = $('#' + formID);

		$.ajax({
				type: 'POST',
				url: 'inc.reminderMan.php', 
				data: formNm.serialize(),
					beforeSend: function(){
					$('#login-manager-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
				},
				success: function (data) {
					$('#login-manager-results').html(data).fadeIn(300);
				}
		});
		return false;
		
	});

	// remindPass

	$('.remindPass').click( function() {

		var formID = $('form.popup-login').attr('id');
		var formNm = $('#' + formID);

		$.ajax({
				type: 'POST',
				url: 'inc.reminder.php', 
				data: formNm.serialize(),
					beforeSend: function(){
					$('#login-send-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
				},
				success: function (data) {
					$('#login-send-results').html(data).fadeIn(300);
				}
		});
		return false;
		
	});

	//.popup-login-comp
	if($('*').is('.popup-login-comp')){


		//submit form
		$('.popup-login-comp').each(function() {

			$(this).validate({	
					//Правила
					rules:{
						'email':{required:true, email: true}
					},
					//Текст предупреждений
					messages:{
						'email':{ required: emailRequired, email: emailIncorrect },
						'password':{ required: passRequired}
					},
					//Обработчик и отправка данных
					submitHandler: function(form){

							var formID = $('form.popup-login-comp').attr('id');
							var formNm = $('#' + formID);

							$.ajax({
								type: 'POST',
								url: 'inc.loginComp.php', 
								data: formNm.serialize(),
									beforeSend: function(){
									$('#login-comp-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
								},
								success: function (data) {
									$('#login-comp-results').html(data).fadeIn(300);
								}
							});
							return false;
						
					}
			});
		});
	}

	//.popup-login-dmanagera
	if($('*').is('.popup-login-dmanagera')){


		//submit form
		$('.popup-login-dmanagera').each(function() {

			$(this).validate({	
					//Правила
					rules:{
						'email':{required:true, email: true}
					},
					//Текст предупреждений
					messages:{
						'email':{ required: emailRequired, email: emailIncorrect },
						'password':{ required: passRequired}
					},
					//Обработчик и отправка данных
					submitHandler: function(form){

							var formID = $('form.popup-login-dmanagera').attr('id');
							var formNm = $('#' + formID);

							$.ajax({
								type: 'POST',
								url: 'inc.logindMana.php', 
								data: formNm.serialize(),
									beforeSend: function(){
									$('#login-dmanagera-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
								},
								success: function (data) {
									$('#login-dmanagera-results').html(data).fadeIn(300);
								}
							});
							return false;
						
					}
			});
		});
	}
	
	//.popup-login-dmanager ALL ACCESS
	if($('*').is('.allaccess')){


		//submit form
		$('.allaccess').each(function() {

			$(this).validate({	
					//Правила
					rules:{
						'email':{required:true, email: true}
					},
					//Текст предупреждений
					messages:{
						'email':{ required: emailRequired, email: emailIncorrect },
						'password':{ required: passRequired}
					},
					//Обработчик и отправка данных
					submitHandler: function(form){

							var formID = $('form.allaccess').attr('id');
							var formNm = $('#' + formID);

							$.ajax({
								type: 'POST',
								url: 'inc.loginDistAll.php', 
								data: formNm.serialize(),
									beforeSend: function(){
									$('#login-allaccess-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
								},
								success: function (data) {
									$('#login-allaccess-results').html(data).fadeIn(300);
								}
							});
							return false;
						
					}
			});
		});
	}

	//.popup-login-dmanager
	if($('*').is('.popup-login-dmanager')){


		//submit form
		$('.popup-login-dmanager').each(function() {

			$(this).validate({	
					//Правила
					rules:{
						'email':{required:true, email: true}
					},
					//Текст предупреждений
					messages:{
						'email':{ required: emailRequired, email: emailIncorrect },
						'password':{ required: passRequired}
					},
					//Обработчик и отправка данных
					submitHandler: function(form){

							var formID = $('form.popup-login-dmanager').attr('id');
							var formNm = $('#' + formID);

							$.ajax({
								type: 'POST',
								url: 'inc.logindMan.php', 
								data: formNm.serialize(),
									beforeSend: function(){
									$('#login-dmanager-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
								},
								success: function (data) {
									$('#login-dmanager-results').html(data).fadeIn(300);
								}
							});
							return false;
						
					}
			});
		});
	}

	//.popup-login-manager
	if($('*').is('.popup-login-manager')){


		//submit form
		$('.popup-login-manager').each(function() {

			$(this).validate({	
					//Правила
					rules:{
						'email':{required:true, email: true}
					},
					//Текст предупреждений
					messages:{
						'email':{ required: emailRequired, email: emailIncorrect },
						'password':{ required: passRequired}
					},
					//Обработчик и отправка данных
					submitHandler: function(form){

							var formID = $('form.popup-login-manager').attr('id');
							var formNm = $('#' + formID);

							$.ajax({
								type: 'POST',
								url: 'inc.loginMan.php', 
								data: formNm.serialize(),
									beforeSend: function(){
									$('#login-manager-results').html('...');
								},
								success: function (data) {
									$('#login-manager-results').html(data).fadeIn(300);
								}
							});
							return false;
						
					}
			});
		});
	}

	//.popup-login form
	if($('*').is('.popup-login')){


		//submit form
		$('.popup-login').each(function() {

			$(this).validate({	
					//Правила
					rules:{
						'email':{required:true, email: true}
					},
					//Текст предупреждений
					messages:{
						'email':{ required: emailRequired, email: emailIncorrect },
						'password':{ required: passRequired}
					},
					//Обработчик и отправка данных
					submitHandler: function(form){

							var formID = $('form.popup-login').attr('id');
							var formNm = $('#' + formID);

							$.ajax({
								type: 'POST',
								url: 'inc.login.php', 
								data: formNm.serialize(),
									beforeSend: function(){
									$('#login-send-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
								},
								success: function (data) {
									$('#login-send-results').html(data).fadeIn(300);
								}
							});
							return false;
						
					}
			});
		});
	}

	//.popup-register form
	if($('*').is('.popup-register')){

		//custom validation method
		jQuery.validator.addMethod("phoneMask", function(value, element) {
			return $('.popup-register__input-phone').inputmask('isComplete');
		}, phoneRequired);

		//submit form
		$('.popup-register').each(function() {
			var phoneValidate = !detectAndroid ? { phoneMask:true} : { required:true, number:true};
			$(this).validate({	
					//Правила
					rules:{
						"name":{ required:true },
						"phone": {phoneMask: true},
						'email':{required:true, email: true}
					},
					//Текст предупреждений
					messages:{
						"name":{ required: nameRequired },
						'email':{ required: emailRequired, email: emailIncorrect },
						'phone':{ required: phoneRequired}
					},
					//Обработчик и отправка данных
					submitHandler: function(form){

							var formID = $('form.popup-register').attr('id');
							var formNm = $('#' + formID);

							$.ajax({
								type: 'POST',
								url: 'inc.preorder.php', 
								data: formNm.serialize(),
									beforeSend: function(){
									$('#preorder-send-results').html('<div align="center" style="margin-top: 40px;"><img src="https://revizion.ua/img/load.gif"></div>');
								},
								success: function (data) {
									$('#preorder-send-results').html(data).fadeIn(300);
								}
							});
							return false;
						
					}
			});
		});
	}

	//rating-hidden show
	$.showHowerRating = () => {

		var element = $('.ratting-show');
		element.on('mouseenter', function(){
			$(this).find('.rating-hidden').stop().fadeIn();
			$(this).on('mouseleave', function(){
				$(this).find('.rating-hidden').stop().fadeOut();
			});
		});

	}
	$.showHowerRating();

	//custom select all 
	$('.filter-select__item').dropkick();
	//custom select in checkbox
	$('.filter-select__check').dropkick();

	//pay input show
	function showPayInput(){
		var btn = $('.account-val__add');
		var input = $('.account-pay__wrap');
		btn.on('click', function(){
			input.slideToggle();
		});
	}
	showPayInput();

	//filter show
	function filterShow(){

		var button = $('.filter-block-show');
		var filterBlock = $('.filter-block-hide');
		button.on('click', function(e){
			e.preventDefault();
			button.toggleClass('filter-block-show_active');
			if(button.hasClass('filter-block-show_active')){
				filterBlock.each(function(){
					$(this).slideDown();
				});
			}else{
				$('.filter-block-hide').slideUp();
			}
		});

		$(window).on('resize', function(){
			if($(window).innerWidth() > 575){
				button.removeClass('filter-block-show_active');
				filterBlock.css({'display':''});
			}
		});

	}
	filterShow();
	
	//onload
	$(window).load(function(){

		//home main screen slider height
		function setHeightSlider(){
			var height = $('.main-screen__text').innerHeight();
			var sliderItems = $('.main-slider__item');
			sliderItems.css({'height':height});
		}
		$('.main-slider').on('init', function(event, slick, direction){
			setHeightSlider();
		});

		//home main screen slider
		$('.main-slider').slick({
			arrows: false,
			autoplay: true,
			speed: 1000,
		});

		//body padding
		function setBodyPadding(){

			var header = $('.header');
			var headerBottom = $('.header-bottom');
			var body = $('body');
			var logo = $('.header-bottom__logo img');

			if( $('*').is('.header') ){

				if( header.hasClass('header_sticky') ){

					logo.css({'transition':'none'});
					headerBottom.css({'transition':'none'});
					header.removeClass('header_sticky');

					var headerHeight = header.innerHeight();

					logo.css({'transition':''});
					headerBottom.css({'transition':''});
					header.addClass('header_sticky');
					
				}else{
					var headerHeight = header.innerHeight();
				}

				body.css({'padding-top':headerHeight});

			}

		}
		setBodyPadding();
	
		//height with width uniqueness-list
		setHeightItem($('.uniqueness-list__img'), 1.34, 'height');

		//height with width client slider info img
		setHeightItem($('.client-desc__img'), 1.08, 'height');

		//CLIENT SLIDER START 
		//client slder triangle cord
		function cordElement(element, container, triangle){

			var cordElement = ( element.offset().left );
			var widthElement = element.innerWidth() / 2;
			var cordClientInfo = ( container.offset().left );
			var cordResult = (cordElement - cordClientInfo) + widthElement;

			triangle.css({'left':cordResult});

		}

		//home client slider. Hidden client-info on change
		$('.client-slider').on('beforeChange', function(){
			$('.client-wrap').stop().fadeOut(400);
			$('.client-slider__img img').removeClass('client-info_active');
		});

		//home client slider. Hidden client-info on breakpoint
		$('.client-slider').on('breakpoint', function(){
			$('.client-wrap').stop().fadeOut(400);
			$('.client-slider__img img').removeClass('client-info_active');
		});

		//home client slider first element info active in load
		$('.client-slider').on('init', function(){
			var self = $('.client-slider').find('.slick-active').first();
			self.find('.client-slider__img img').addClass('client-info_active');
			var html = self.find('.client-desc').html();
			$('.client-info').children().not('.client-info__triangle').remove();
			$('.client-info').append(html);
			$('.client-wrap').css({'display':'flex'});
			cordElement(self.find('.client-slider__img img'), $('.client-info'), $('.client-info__triangle'));
			//height with width client slider info img
			setHeightItem($('.client-wrap').find('.client-desc__img'), 1.08, 'height');
		});

		//home client slider
		$('.client-slider').slick({
			slidesToShow: 6,
			slidesToScroll: 6,
			arrows: false,
			dots: true,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 450,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}
			]
		});

		//client slider info
		function showClientInfoShow(){

			var container = $('.client-info');
			var clientLogo = $('.client-slider__img img');
			var triangle = $('.client-info__triangle');
			var clientInfoWrap = $('.client-wrap');

			clientLogo.on('click', function(){

				var self = $(this);

				if ( !self.hasClass('client-info_active') ){

					clientLogo.removeClass('client-info_active');
					self.toggleClass('client-info_active');
					clientInfoWrap.css({'display':'none'});
					var html = self.closest('.client-slider__item').find('.client-desc').html();
					container.children().not('.client-info__triangle').remove();
					container.append(html);
					clientInfoWrap.stop().fadeIn(400).css({'display':'flex'});

					//height with width client slider info img
					setHeightItem(clientInfoWrap.find('.client-desc__img'), 1.08, 'height');

					cordElement(self, container, triangle);

					$(window).on('resize', function(){
						cordElement(self);
					});

				}else{
					clientInfoWrap.stop().fadeOut(400);
					self.removeClass('client-info_active');
				}
				
				
			});

		}
		showClientInfoShow();
		//CLIENT SLIDER END

		//widget selected
		function selectedWidget(){
	
			var select = $('#widget-select');
			var exapmle = $('.widget-example-item');
			var all = $('.widget-code__all');
			var product = $('.widget-code__product');
			var widget = $('.widget-code__widget');
	
			function selectedWidgetRun(){
	
				var allItem = [exapmle, all, product, widget];
				$(allItem).each(function(){
					$(this).css({'display':'none'});
				});
	
				var current = select.find('option:selected').attr('data-widget');
				var exampleItem = [];
				$.grep(allItem, function(n){
					$(n).each(function(){
						$.grep($(this), function(n){
							if($(n).attr('data-widget') == current){
								exampleItem.push($(n));
							}
						})
						
					});
				});
				$(exampleItem).each(function(){
					$(this).fadeIn();
				});

				if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				  //niceScroll
				$('.widget-code__text, .widget-example__wrap').niceScroll({cursorcolor:"#c10831"}).resize();
				}
				
	
			}
			selectedWidgetRun();		
	
			select.on('change', selectedWidgetRun);
	
		}
		selectedWidget();

		//animation
		window.sr = ScrollReveal({reset: false, mobile: false});
		sr.reveal('.a-top', { duration: 1500, delay: 500, opacity: 0, origin: 'top', distance: '40px', scale: 0,});
		sr.reveal('.a-bottom', { duration: 1500, delay: 1500, opacity: 0, origin: 'bottom', scale: 1, distance: "30px"}, 50);
		sr.reveal('.a-question', {duration: 1600, origin: 'top', distance: "30px", scale: 1, viewFactor: 0.7}, 150);
		sr.reveal('.a-question-s', {duration: 1600, origin: 'bottom', distance: "0", scale: 1, viewFactor: 0.7}, 150);
		sr.reveal('.a-advantages2', {duration: 1500, origin: 'top', distance: "20px", delay: 200, scale: 1.3, easing: 'cubic-bezier(0.5, 0.885, 0.32, 1.5)', viewFactor: 1});
		sr.reveal('.a-product', {duration: 2000, origin: 'left', distance: "100px", delay: 200, scale: 1, easing: 'cubic-bezier(0.5, 0.885, 0.32, 1.5)', viewFactor: 1});

		//preload
		$('.preload').fadeOut(500);

		//onresize
		$(window).on('resize', function(){

			//body padding
			setBodyPadding();

			//home main screen slider height
			setHeightSlider();

			//height with width uniqueness-list
			setHeightItem($('.uniqueness-list__img'), 1.34, 'height');

			//height with width client slider info img
			setHeightItem($('.client-desc__img'), 1.08, 'height');
			
			
		});

	});

});
