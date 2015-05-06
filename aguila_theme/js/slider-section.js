/*global jQuery2 */
(function ($) {

    /*Youtube api videos - build players*/

    var XT = XT || {};
    
    XT.statusPlayer = '';    
    
    XT.videoYT = $('.front .banner-principal .views-row .videoYT');
    
    XT.videoList = new Array();
    
    XT.countPlayers = function(){
       for (i = 0; i < XT.videoYT.length; i++) {
            if(XT.videoYT[i].getAttribute('id') != ''){
                XT.videoList[i] = XT.videoYT[i].getAttribute('id');
            }
       };
    }  
    
    XT.players = new Array(); 
    
    XT.createPlayer =  function(playerInfo) {
        return new YT.Player(playerInfo, {            
            videoId: playerInfo,
            playerVars: { 'controls': 0, 'enablejsapi': 1,'rel':0,'showinfo':0, 'iv_load_policy':3, 'allowScriptAccess': "always", 'wmode' : 'transparent', 'modestbranding':1 },                
            events: {
                onStateChange: XT.yt.onPlayerStateChange,
                onError: XT.yt.onPlayerError
            }
        });
    }    

    window.onYouTubeIframeAPIReady = function(){
        setTimeout(XT.yt.onYouTubeIframeAPIReady,500);
    }   

    XT.yt = {       

        /* load the YouTube API first */
        loadApi: function () {

                var j = document.createElement("script"),
                    f = document.getElementsByTagName("script")[0];
                j.src = "//www.youtube.com/iframe_api";
                j.async = true;
                f.parentNode.insertBefore(j, f);
                //console.log('API Loaded');
        },

        /*default youtube api listener*/
        onYouTubeIframeAPIReady: function () {
            //console.log('API Ready?');
            XT.countPlayers(); 
            window.YT = window.YT || {};
            if (typeof window.YT.Player === 'function') {
                for (i = 0; i < XT.videoList.length; i++) {
                    var curplayer = XT.createPlayer(XT.videoList[i]);
                    XT.players[i] = curplayer;
                    
                };               
            }
        },
        
        onPlayerStateChange: function (e) {            

            XT.statusPlayer = (e.data === YT.PlayerState.PLAYING) ? 'play' : '';
            
            var slider = $('.view-banner-principal .view-content');
            
            //console.log('status', e.data);            

            if(e.data === 1){
                slider.slickPause();
                XT.statusPlayer = 'play';                
            }else{           
                slider.slickPlay();
                XT.statusPlayer = ''; 
            }

            //console.log('statusPlayer', XT.statusPlayer);
        },

        onPlayerError: function (e) {
            console.log( "youtube: " + e.target.src + " - " + e.data);
        },

        init: function () {
            this.loadApi();
        }
    }    


    $(document).ready(function(){

        XT.yt.init();

        //console.log(XT.players);

        var slider = $('.view-banner-principal .view-content'),
            sliderNode = $('.view-banner-principal'),
            borderClass,
            imagePath,
            win,
            scrollBtn,
            scrollBtnVisible = true;

        //Set slider images as css background images
        slider.find(".views-row").each(function(index, el) {
            borderClass = $.trim($(this).find('.slider-border').text());
            imagePath = $.trim($(this).find('.slider-background img').attr('src'));
            $(this).css({'background-image': 'url('+imagePath+')'});
            $(this).addClass(borderClass);
        });
        //Initialize Slick slider
        slider.slick({
            dots: true,
            autoplay: true,
            pauseOnHover: false,
            autoplaySpeed: 7000,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            onSetPosition: function (slickSlider) {
                var slideContent = slider.find('.slide-content');

                if (slideContent.length) {
                    //Set size for slide-content.
                    slider.find('.slide-content').width(slickSlider.$slider.width());
                }
            },
            onBeforeChange: function(slider,index){
                //window.console && console.log(index);
                hide_alternative_content();               
                 
            },
            onAfterChange: function(slider,index){
                //window.console && console.log(index);
            },
        });

        //dots slider controller video
        $(document).on('click touch', '.slick-dots li button', function() {                 
            if(XT.statusPlayer == 'play' ){
                XT.statusPlayer = '';
                $(XT.players).each(function (i) {                        
                    this.pauseVideo();                        
                });
            }
        });

        //Slider hover function
        $(document).on('mouseenter', '.view-banner-principal .view-content .views-row', function() {                 
            slider.slickPause();
        });
        $(document).on('mouseleave', '.view-banner-principal .view-content .views-row', function() {
            if(XT.statusPlayer == 'play' ){                 
                slider.slickPause();
            }else{                
                slider.slickPlay();
            }
        });
        

        //Add down arrow below the banner
        if(sliderNode.length) {
            scrollBtn = $('<div class="btn to-scroll btn-md btn-sky-blue btn-radius-none btn-text-no btn-symbol btn-symbol-down animation-to-bottom hidden"></div>');
            sliderNode.append(scrollBtn);
            scrollBtn.bind("click touch", function(event ) {
                jQuery("body").scrollTo("#content-inner",800);
                event.preventDefault();
            });
            win = $(window);
            win.on('scroll', function () {
                var position = win.scrollTop();
                if (position <= 150 && !scrollBtnVisible) {
                    scrollBtn.animate({ opacity: 1 });
                    scrollBtnVisible = true;
                } else if (position > 150 && scrollBtnVisible) {
                    scrollBtn.animate({ opacity: 0 });
                    scrollBtnVisible = false;
                }
            });
        }

        $("a[href='#pauseVideo']").click(function(e){ e.preventDefault(); pauseCurrentVideo(); });
        toggleContentOnVideo();

        if ($("body").hasClass("chicas-aguila")) {
            setTimeout( function() {
                if (jQuery2('#age_checker_verification_popup').is(':visible')) {
                    jQuery2(document).on("closeAgeGate", function() {
                        //if (!jQuery2('#age_checker_verification_popup').is(':visible'))
                        play_alternative_content("chicas");
                    })
                }else{
                    play_alternative_content("chicas");
                }
            },1000);

        }


    });
}(jQuery2));

var currentVideoPlaying;

function play_alternative_content(id) {
    $=jQuery;
    switch(id) {
        case "chicas":
            $(".slick-active .slide-content-alternative.hidden").removeClass("hidden");
            $(".slick-active .slide-content").addClass("hidden");
            currentVideoPlaying = video = $(".slick-active .slide-content-alternative video")[0];
            if(($(video).data("initialized")!="true")) {
                //window.console && console.log("initialize video");
                $(video).data("initialized","true");
                video.addEventListener('loadedmetadata', function() {
                  this.currentTime = 0.1;
                }, false);
                video.addEventListener('ended', function(e) {
                    //window.console && console.log("ended");
                    video.pause();
                    hide_alternative_content();
                }, false);
            }
            if (video.paused) {
                video.play();
                toggleContentOnVideo();
            } else {
                video.pause();
                toggleContentOnVideo();
            }
        break;
        default:
            $(".slide-content-alternative.hidden").removeClass("hidden");
        break;

    }
    return void(false);
}


function hide_alternative_content() {
    $=jQuery;
    //window.console && console.log("hide");
    $(".slide-content-alternative").addClass("hidden").each(function(i,el){
        if(jQuery(el).find("video").length>0) jQuery(el).find("video")[0].pause();
    });
    toggleContentOnVideo();
}

function toggleContentOnVideo() {
    $=jQuery;
    if(currentVideoPlaying && !currentVideoPlaying.paused) {
        $(".slick-active .slide-content").addClass("hidden");
        $(".slick-active .slide-content-alternative").removeClass("hidden");
    }else{
        $(".slick-active .slide-content-alternative").addClass("hidden");
        $(".slick-active .slide-content").removeClass("hidden");
    }
}

function pauseCurrentVideo() {
    if(currentVideoPlaying) {
        currentVideoPlaying.pause();
        toggleContentOnVideo();
    }
}


