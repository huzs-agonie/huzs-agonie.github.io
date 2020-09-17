$(window).load(function(){
    
    // ieCheck
    var ie = false;
    var aniButtonDuration = 350;
    
    if($.browser.msie && $.browser.version<9)
    {
        aniButtonDuration = 0;
        ie = true;
    }
    
    var container = $('#container'),
        containerHolder = $('#container > div'),
        extra = $('.extra'),
        desPlane = $('#description');
        
    
    //resize
    var minW = parseInt($('body').css("min-width"));
    var minH = parseInt($('body').css("min-height"));
    
    var document_W = $(document).width();
    var document_H = $(document).height();
    var window_W = $(window).width();
    var window_H = $(window).height();
    
   	var mainDIV = $('.main');

    $(window).resize(function()
    {
       resizeContent(); 
    });
    
    function resizeContent(_animationSpeed){
        document_W = $(document).width();
        document_H = $(document).height();
        window_W = $(window).width();
        window_H = $(window).height();
        
        container.width(document_W + 230);
        
        inLineCount =  parseInt(container.width() / 240);
        containerHolder.css({marginLeft:'0px'});
        containerHolder.eq(inLineCount).css({marginLeft:'240px'});
        
        extra.height(Math.ceil(containerHolder.length/inLineCount)*240 + 40);
        
    }
    
    resizeContent();
    
    
   container.masonry({
        isAnimated: true
   });

    if(!ie){
        desPlane.stop().animate({scale:0}, 0);
    } else {
        desPlane.css({display:'none'});
    }

    containerHolder.find('span').stop().animate({opacity:0},0);
    containerHolder.each(function(){
        $(this).find('a').hover(function()
        {
            var leftPos = $(this).offset().left+240
            if(leftPos >= window_W){
                leftPos -= 480;
            }
            
            $(this).find('span').stop().animate({opacity:1}, aniButtonDuration,'easeOutCubic')
            
            if(!ie){
                desPlane.stop().animate({scale:1, top:$(this).offset().top, left:leftPos}, 350, 'easeOutCubic');
                desPlane.find('ul').stop().animate({top:-$(this).parent().index() * 240}, 350,  'easeOutCubic');
            } else {
                desPlane.css({display:'block', top:$(this).offset().top, left:leftPos});
                desPlane.find('ul').css({top:-$(this).parent().index() * 240});
            }					   
        }, function(){
        	$(this).find('span').stop().animate({opacity:0}, aniButtonDuration,'easeOutCubic');
            
            if(!ie){
                desPlane.stop().animate({scale:0}, 350, 'easeOutCubic');
            } else {
                desPlane.css({display:'none'});
            }						   
        })
    })
    
    desPlane.hover(function()
    {
        var leftPos = $(this).offset().left+240
        if(leftPos >= window_W){
            leftPos -= 480;
        }
        if(!ie){
            $(this).stop().animate({left:leftPos}, 350, 'easeOutCubic');
        } else {
            $(this).css({left:leftPos});
        }					   
    })

   
    $('.list1 li a').each(function(){
        $(this).find('>span').animate({opacity:0},0);
        
        $(this).hover(function()
        {
            $(this).find('>span').animate({opacity:1}, aniButtonDuration,'easeOutCubic')					   
        }, function(){
        	$(this).find('>span').animate({opacity:0}, aniButtonDuration,'easeOutCubic')						   
        })
    })
    
    
    $('#container > div > a').fancybox({
        'overlayColor'  :   '#000',
        'transitionIn'	:	'elastic',
       	'transitionOut'	:	'elastic',
    	'speedIn'		:	500, 
    	'speedOut'		:	300
     });
     $('#fancybox-overlay').css({minWidth:minW, minHeight:minH})
     
     
     $('#privacy').click(function(){
        $('html,body').animate({scrollTop: 0});
     })
   
   

    /////////////////////////////////////////////////////////////////////////// 
    //                           content switch                              //
    ///////////////////////////////////////////////////////////////////////////
    
    var content=$('#content'),
        nav=$('.menu');
    
    $('ul#menu').superfish({
      delay:       700,
      animation:   {height:'show'},
      speed:       350,
      autoArrows:  false,
      dropShadows: false
    });
     
    $('.submenu li a').each(function(){
        $(this).hover(function()
        {
            $(this).stop().animate({color:'#fff'}, 250,'easeOutSine'); 					   
        }, function(){
        	$(this).stop().animate({color:'#000'}, 250,'easeOutSine');   					   
        })
    })
    
    nav.navs({
		useHash:true,
        defHash:'#!/',
		hoverIn:function(li){
		   	$('>a ',li).stop().animate({color:'#fff'}, 250,'easeOutSine');  
		},
		hoverOut:function(li){
		  if (!li.hasClass('with_ul') || !li.hasClass('sfHover')) {
               $('>a ',li).stop().animate({color:'#000'}, 250,'easeOutSine');   
          }
		}				
    })
    
     content.tabs({
		preFu:function(_)
        {
            _.li.css({display:'none', top:'-730px'});
		}
		,actFu:function(_)
        {
            
            if(_.pren == undefined || _.pren==-1){
                aniDelay = 0;
            } else {
                aniDelay = 400;
            }
            
        	if(_.curr){
				_.curr
					.stop()
					.delay(aniDelay).css({display:'block'}).animate({top:'0px'}, 650,'easeOutQuint');
            }

			if(_.prev){
			    _.prev 
    				.stop()
    				.animate({top:'-730px'}, 350,'easeInSine', function(){
    				     $(this).css({display:'none'});
    			     });
            }
           
        }
		
	})
       
    nav.navs(function(n, _)
    {
		content.tabs(n);
	})
 
})

