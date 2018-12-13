
ie_8 = ( $.browser.msie && $.browser.version == 8 );
ie_9 = ( $.browser.msie && $.browser.version == 9 );


var seasonNotiSwiper = null;

function toggleEvent(e){
    e.preventDefault();
    try {
        var target = $(this).find('a').next();
        var isVisible = target.is(':visible');

        if(isVisible) {
            target.hide();
            target.parent().removeAttr('style');

        } else {
            $(".telBoxS").removeAttr('style');
            $(".telBoxSS").hide();
            target.parent().css({ 'z-index' : '100' });
            target.show();
        }
    } catch(e) {
        console.log(e)
    }
}


// swiper slider 랜덤
function returnIndex(slidElement){
    //console.log("random");
    var randomIndex = Math.floor(Math.random()*($(slidElement+' .swiper-slide:not(.swiper-slide-duplicate)').length));
    return parseInt(randomIndex);
}

function swiperAutoplayStop(el){

    if(ie_8 || ie_9) el.stopAutoplay();
    else el.autoplay.stop();

}

function swiperAutoplayStart(el){

    if(ie_8 || ie_9) el.startAutoplay();
    else el.autoplay.start();

}

$(document).ready(function(){


    seasonNotiSwiper = new Swiper('.previewT-wrap.swiper-container', {
        direction: 'vertical',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    if(ie_8 || ie_9){
        $( "#pop-ie-alert" ).fadeIn('fast');
        $( "#pop-ie-alert, #pop-ie-alert .bg" ).animate({
            "width":"100%",
        },600);

        $( "#pop-ie-alert .pop-layer-innner" ).animate({
            "width":"350px",
        },600);

        $(".close-btn").click(function(e){
            e.preventDefault();
            $( "#pop-ie-alert, #pop-ie-alert .bg, #pop-ie-alert .pop-layer-innner" ).animate({
                "width":"0",
            },600);

            $( "#pop-ie-alert" ).fadeOut('fast');

        });
    }


    if (!(ie_8 || ie_9)){

        //swiper slider 마우스 오버시 자동 슬라이드 멈춤
        $('[data-role="swiper-slider"]').on('mouseenter', function(e){
            //console.log('stop autoplay');

            var swiperTarget = $(this).attr('data-function');

            if( typeof swiperTarget !='undefined' && swiperTarget ) {
                eval("target = " + swiperTarget);
                swiperAutoplayStop(target);
            }

        });
        //swiper slider 마우스 오버시 자동 슬라이드 시작
        $('[data-role="swiper-slider"]').on('mouseleave', function(e){
            //console.log('start autoplay');
            var swiperTarget = $(this).attr('data-function');

            if( typeof swiperTarget !='undefined' && swiperTarget ) {
                eval("target = " + swiperTarget);
                swiperAutoplayStart(target);
            }
        });
    }

    (function () {
        var tab = $('.cm-tab'),
            tabcon = $('.tab-con');

        if(tab.length > 0) {
            tab.click(function() {
                var getID = $(this).find('a').attr('href'),
                    idx = tab.index(this);

                tabcon.hide();
                $(getID).show();
                tab.removeClass('on').eq(idx).addClass('on');

                return false;
            });
        }

        //toggleEvent
        $('.telBoxS').click(toggleEvent);
        $('.telBoxS').hover(function() {
            $(this).addClass('on');
        }, function() {
            $(this).removeClass('on');
        });

        $('.hasImg').click(function(){
            var idx = $('.hasImg').index(this);

            tab.eq(idx).trigger('click');
        });
    })();
    // 좌측메뉴 관련
    (function () {
        var timer,
            topBanner = $('#TopBanner > div'),
            side = $('#leftMenu'),
            sideBtn = $('.leftOpen'),
            floatFootBanner = $('.fixed-bottom-banner'),
            pop = $('.pop-container'),
            isResize = false;

        $(window).resize(function(){
            if(timer) {
                clearTimeout(timer);
            }

            // 스크롤 중일때 자동롤링 모두 정지
            if(!isResize &&  seasonNotiSwiper != null) {
                swiperAutoplayStop(seasonNotiSwiper);
                isResize = true;
            }

            timer = setTimeout(function () {
                if(window.innerWidth <= 1100) {
                    topBanner.addClass('close');
                    side.addClass('close');
                    sideBtn.addClass('open');
                    pop.addClass('extend');
                    floatFootBanner.addClass('close');
                    $("body").addClass('close');
                } else {
                    topBanner.removeClass('close');
                    side.removeClass('close');
                    sideBtn.removeClass('open');
                    pop.removeClass('extend');
                    floatFootBanner.removeClass('close');
                    $("body").removeClass('close');
                }
                swiperAutoplayStart(seasonNotiSwiper);
                isResize = false;
            }, 100);
        });
    })();

    (function () {
        var isScroll = false, // 스크롤 진행 유무 flag
            scrollTimer,
            header = $('#header'),
            content = $('#content'),
            lnb = $('#leftMenu'),
            quickMenu = $('.cm-quick'),
            flag = false, // 스탑지점 구간도달하면 시작되는 flag
            cmItem = quickMenu.find('.cm-item'),
            excpt = $('#page-login');

        content.wrapInner('<div id="container"></div>');
        if (quickMenu.length > 0) {
            var arr = [];
            cmItem.each(function() {
                try {
                    var target = $(this).attr('href');
                    var k = $(target).offset().top;
                    arr.push(k);
                } catch(e) {
                    console.log(e)
                }
            });


            cmItem.click(function(e) {
                e.preventDefault();

                var idx = cmItem.index($(this));
                var target = $(this).attr('href');
                var pos = $(target).offset().top;

                arr[idx] = pos;

                cmItem.parent().removeClass('on');
                cmItem.parent().eq(idx).addClass('on');

                $('html, body').stop().animate({ scrollTop: pos - 147});
            });
        }


        $(window).scroll(function(){
            var scrolltop = $(window).scrollTop();

            // 다음 페이지는 이벤트 발생 시키지 않음
            if(excpt.length > 0) {
                return true;
            }

            if(scrollTimer) {
                clearTimeout(scrollTimer);
            }

            //if (scrolltop >= content.offset().top) {
            if (scrolltop >= 105) {
                header.addClass('fixed');
                lnb.addClass('fixed');

            } else {
                header.removeClass('fixed');
            }

            // 스크롤 중일때 자동롤링 모두 정지
            if(!isScroll) {
                seasonNotiSwiper.autoplay.stop();
                isScroll = true;
            }

            // COMMON - QUICK MENU
            if (quickMenu.length > 0) {
                var quickPos = Number(quickMenu.attr('data-start-point')) || quickMenu.offset().top,
                    sub1Content2 =  (function(){
                        var k = $('.max-position'); // 스탑지점

                        if(k.length > 0) {
                            return k.offset().top
                        } else {
                            return $('#wrap').height() - $('#footer').height() + 20;
                        }
                    }()),
                    quickCalc = sub1Content2 - ($('.cm-quick').children().height() + 200);


                if (scrolltop < quickPos) {
                    quickMenu.children().removeClass('fixed').removeClass('stop');
                    flag = false;
                } else if (scrolltop >= quickPos && scrolltop < quickCalc) {
                    quickMenu.children().addClass('fixed').removeClass('stop');
                    flag = false;
                } else if(scrolltop >= quickCalc) {
                    if(!flag) {
                        quickMenu.children().addClass('stop');
                        /*quickMenu.children().css({
                            position: 'absolute',
                            top: quickCalc - ($('.cm-quick').children().height() + 300) + 'px'
                        })*/

                        flag = true;
                    }
                }
            }

            //  0.3s후 스크롤 종료 자동롤링 시작
            scrollTimer = setTimeout(function () {
                swiperAutoplayStart(seasonNotiSwiper);
                isScroll = false;
            }, 300)
        });

        // 좌측네비 scroll plugin
        lnb.mCustomScrollbar({
            alwaysShowScrollbar: 0,
            scrollInertia: 300,
            autoHideScrollbar: true,
            scrollbarPosition: 'outside'
        });

        //왼쪽 메뉴 2depth1
        var sideMenu = $('.leftNav > ul > li > a'),
            sideMenuDepth2 = $('.leftNav > ul ul');

        sideMenu.click(function(){
            var isVisible = $(this).next().is(':visible');

            sideMenu.removeClass('on');
            sideMenu.parent().removeClass('on').not($(this).parent()).find('> a').next().slideUp();

            if(!isVisible) {
                $(this).parent().addClass('on');
                $(this).next().stop().slideDown();
            } else {
                sideMenu.parent().removeClass('on');
                sideMenuDepth2.stop().slideUp();
            }

            if($(this).parent().hasClass('item')){
                return false;
            }
        });

        // 페이지 파라미터
        if(selectDepth1 >= 0) {
            sideMenu.eq(selectDepth1).addClass('on').next().show();
        }

        if( selectDepth2 >= 0) {
            sideMenu.eq(selectDepth1).addClass('on').next().find('li [index='+selectDepth2 +']').parent().addClass('on');
        }
        if( selectProcessIdx !== undefined && selectProcessIdx != "") {
            header.find('[process='+ selectProcessIdx  +']').find('> a').addClass('on');
        }
    })();

    //2depth
    (function () {
        var gnb = $('#nav');
        var count = 0;
        var is_animate = false;

        gnb.find(' > ul > li').mouseenter(function () {
            if(is_animate) return;
            is_animate = true;

            $('.sNav').hide();

            count++;

            if( count == 1 ){
                $(this).find('.sNav').stop().slideDown(300, function(){
                    is_animate= false;
                });
            } else {
                $(this).find('.sNav').show();
                is_animate= false;
            }


        });

        gnb.find('> ul').mouseleave(function(){
            $('.sNav').stop().slideUp(300);
            count = 0;
            is_animate = false;
        });


    })();

    //왼쪽 메뉴 보이기 숨기기
    (function () {
        var sideOpen = $('.leftOpen'),
            sideClose = $('.lMclose'),
            sideBar = $('#leftMenu');
        topBanner = $('#TopBanner > div'),

            sideClose.click(function () {
                sideBar.addClass('close');
                sideOpen.addClass('open');
                $('.pop-container').addClass('extend');
                topBanner.addClass('close');
                $('.fixed-bottom-banner').addClass('close');
                $("body").addClass('close');

            });

        sideOpen.click(function () {
            sideBar.removeClass('close');
            sideOpen.removeClass('open');
            $('.pop-container').removeClass('extend');
            topBanner.removeClass('close');
            $('.fixed-bottom-banner').removeClass('close');
            $("body").removeClass('close');
        });
    }());


    //셀렉트박스 선택시 텍스트 변경
    $('select.nsbox').change(function(){
        var selectName= $(this).children('option:selected').text();
        $(this).siblings('label').text(selectName);
    });

    /* photostory2 img롤링 */
    var current =0;
    var imgs = $('.imgBox >img');

    var prevButton = $('.pvBox2 .imgBox a.lefta');
    var nextButton = $('.pvBox2 .imgBox a.righta');

    prevButton.click(function(e){
        var prev = imgs.eq(current);
        e.preventDefault();
        $('.imgBox span >img').css('opacity',0);

        if(prev.css('left') != '0px') return;
        move(prev,0,'105%');


        if(current === 0) current = imgs.size();
        --current;

        $('.thumImg span').removeClass('active');
        $('.thumImg span').eq(current).addClass('active');

        var next = imgs.eq(current);
        move(next,'-105%',0);

    })

    nextButton.click(function(e){
        e.preventDefault();
        var prev = imgs.eq(current);
        $('.imgBox span >img').css('opacity',0);

        if(prev.css('left') != '0px') return;
        move(prev,0,'-105%');

        current++;
        if(current === imgs.size()) current = 0;

        $('.thumImg span').removeClass('active');
        $('.thumImg span').eq(current).addClass('active');

        var next = imgs.eq(current);
        move(next,'105%',0);

    });

    function move(tg,start,end){
        tg.css('left',start).stop().animate({left:end},{duration:1000});
    }

    var observer = lozad('.lozad', {
        loaded: function(el) {
            if( typeof el !='undefined' && el ) {
                $(el).addClass('fade');
            }
        }
    });

    observer.observe();
});


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady(num) {
    var vod_code = $("#video" + num).attr('data-code');
    var vod_width = $("#video" + num).attr('data-video-width');
    var vod_height = $("#video" + num).attr('data-video-height');

    player = new YT.Player("video" + num , {
        height: vod_height,
        width:  vod_width,
        videoId: vod_code,
        playerVars: { 'origin':'http://ezenac.co.kr/', 'autoplay': 1, 'controls': 1, 'php5': 1, 'wmode':'opaque', 'rel' : 0,'showinfo' : 0},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var playDone = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !playDone) {
        //setTimeout(stopVideo, 6000);
        playDone = true;
        //console.log("재생");
    }else {
        playDone = false;
    }
}
function stopVideo() {
    player.stopVideo();
}


