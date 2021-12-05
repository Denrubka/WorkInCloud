$(document).ready(function(){
	
	$('.agree_gdpr').click( () => {
		$('.gdpr').fadeOut('1500')
		$.cookie("siteGDPR", 1)
	})

  if($('*').is('.popup-login')){

    $('.popup-login').each(function() {
      $(this).validate({  
          //Обработчик и отправка данных
          submitHandler: form => {
            var formID = $('form.popup-login').attr('id')
            var formNm = $('#' + formID)

            $.ajax({
              type: 'POST',
              url: 'inc.login.php', 
              data: formNm.serialize(),
              beforeSend: () => $('#login-send-results').html('<div align="center" style="margin-top: 40px;"><img src="https://reion.ua/img/load.gif"></div>'),
              success: data => $('#login-send-results').html(data).fadeIn(300)
            });
            return false;
          }
      });
    });

    $('.remindPass').click( () => {
      $.ajax({
          type: 'POST',
          url: 'inc.reminder.php', 
          data: $('#popup-recover').serialize(),
          beforeSend: () => $('#recover-send-results').html('<div align="center" style="margin-top: 40px;"><img src="/img/load.gif"></div>'),
          success: data => $('#recover-send-results').html(data).fadeIn(300)
      })
      return false;
    })
  }

//.popup-register form
  if($('*').is('.popup-preorder')){
    $('.popup-preorder').each(function() {
      $(this).validate({  
        submitHandler: function(form){
          var formID = $(this.currentForm).attr('id')
          var formNm = $('#' + formID)

          $.ajax({
            type: 'POST',
            url: 'inc.preorder_new.php', 
            data: formNm.serialize(),
            beforeSend: () => $('#preorder-send-results').html('<div align="center" style="margin-top: 40px;"><img src="/img/load.gif"></div>'),
            success: data => { 
              $.fancybox({
                 'autoScale': true,
                 'transitionIn': 'elastic',
                 'transitionOut': 'elastic',
                 'speedIn': 500,
                 'speedOut': 300,
                 'autoDimensions': true,
                 'centerOnScroll': true,
                 'href' : '#modal-thanks'
              })
              $('#preorder-send-results').html(data).fadeIn(300)
            }
          })
          return false;
        }
      })
    })
  }

  

});
