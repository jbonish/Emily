$(document).ready(function(){
	var isMobile=false;
	$('#contact').click(function() { this.select(); });
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){isMobile=true;};
		if(!isMobile|| $(window).width() >600) {
		$('#black').css("height", $('#black').height()-20);
		$('#album').css("margin-left", $(window).width()*0.5-150);
		$('#single').css("margin-left", $(window).width()*0.5-175);
		$('iframe').css("margin-left", $(window).width()*0.5-150);
		$('#social').css("margin-left", $(window).width()*0.5-150);
		$(window).resize(function() {
			if(!isMobile || window.orientation == -90 || window.orientation == 90) {
			$('#black').css("height", $(window).height()-20);
			$('#album').css("margin-left", $(window).width()*0.5-150);
			$('#single').css("margin-left", $(window).width()*0.5-175);
			$('iframe').css("margin-left", $(window).width()*0.5-150);
			$('#social').css("margin-left", $(window).width()*0.5-150);
		}
			if(!isMobile && window.orientation == 0 || 180) {
				$('#black').css("height", $(window).height()-20);
			}
		
		});

		$('#album').mouseenter(function() {
			$(this).animate({opacity: 0.85}, 175);
		});
		$('#album').mouseleave(function() {
			$(this).animate({opacity: 1}, 175)
		});
		$('#album').mousedown(function() {
			$(this).attr('src', 'assets/connor.png');
		})
		$('#album').mouseup(function() {
			$(this).attr('src', 'assets/album.jpg');
		});
		$('#social img').mouseenter(function() {
			$(this).animate({opacity: 0.85}, 175)
		});
		$('#social img').mouseleave(function() {
			$(this).animate({opacity: 1}, 175)
		});
		 var widget = SC.Widget(document.getElementById('myPlayerId'));
	     widget.bind(SC.Widget.Events.READY, function() {
	     	void(0);
	     });
	     $('#album').click(function() {
	       widget.toggle();
	     });
 	}
 	else {
 		if (window.orientation == 90 || window.orientation == -90) {
  				$('#black').css('width', $(window).width());
  				$('#black').css('height', $(window).height()*0.94);
  				$('#black').css('margin-top', '10px');
  				$('body').css('height', $(window).height());
  				$('html').css('height', $(window).height());

  				$('#album').css('display', 'none');
  				$('#single').css('display', 'none');
  				$('#contact').css('display', 'none');
  				$('iframe').css('display', 'none');
  				$('#social').css('display', 'none');
  				$('#landscape_player').css('display', 'block');
  				$('#landscape_player').css('height', '166px');
  				$('#landscape_player').css('position', 'absolute');
  				$('#landscape_player').css('margin-top', '60px');
  				$('#landscape_player').css('width', $(window).width());
  		}
 		$(window).on("orientationchange",function(event){
  			if (window.orientation == 90 || window.orientation == -90) {
  				location.href = location.href;
  				/*$('#html').css('width', $(window).width() * 0.90);
  				$('#body').css('height', $(window).height() * 0.97);
  				$('#black').css('width', $(window).width());
  				$('#black').css('height', $(window).height()*0.94);
  				$('#black').css('margin-top', '10px');
  				$('#album').css('display', 'none');
  				$('#single').css('display', 'none');
  				$('#contact').css('display', 'none');
  				$('iframe').css('display', 'none');
  				$('#social').css('display', 'none');
  				$('#landscape_player').css('display', 'block');
  				$('#landscape_player').css('height', '166px');
  				$('#landscape_player').css('position', 'absolute');
  				$('#landscape_player').css('margin-top', '60px');
  				$('#landscape_player').css('margin-left', '0');
  				$('#landscape_player').css('width', $(window).width());*/
  			}
  			if (window.orientation == 0 || window.orientation == 180) {
  				location.href = location.href;
  				/*$('#landscape_player').css('width', 0);
  				$('#html').css('width', $(window).width() * 0.97);
  				$('#body').css('height', $(window).height() * 0.90);
  				$('#black').css('width', $(window).width());
  				$('#black').css('height', $(window).height()*0.96);
  				$('#black').css('margin-top', '10px');
  				$('#album').css('display', 'block');
  				$('#album').css('width', $(window).width()*0.5);
  				$('#album').css('height', $(window).width()*0.5);
  				$('#album').css('margin-left', $(window).width()*0.25);
  				$('#single').css('margin-left', $(window).width()*0.05);
  				$('#single').css('display', 'block');
  				$('#single').css('width', $(window).width()*0.9);
  				$('#contact').css('display', 'block');
  				$('#contact').css('margin-left', $(window).width()*0.06);
  				$('iframe').css('display', 'block');
  				$('iframe').css('margin-left', $(window).width()*0.18);
  				$('#social').css('display', 'block');*/
  				

  			}
  		});
  	}
});