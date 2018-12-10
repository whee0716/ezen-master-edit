var GNB;
// lazyloading
var observer = lozad('.lozad', {
    loaded: function(el) {
        el.classList.add('lozad-fade');
    }
});

var mask = $('<div id="mask">').css({ //마스크
    'position':'absolute',
    'top' : '0px',
    'left' : '0px',
    'width' : '100%',
    'height' : '100%',
    '-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)',
    'filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)',
    'opacity' : '0.7',
    'background' : '#000',
    '-moz-opacity' : '0.7',
    'z-index' : '100',
    'display': 'none'
});

var popup = function(){
    return {
        open: function(el) {
            // 기존에 열리있는 다른 팝업레이어 제거
            $(".popup").hide();

            // 배경 마스크 생성및 보여줌


            $('body').append(mask);
            $("#mask").fadeTo(300, 0.8);

            $("html, body").css({'overflow-y':'hidden'}).bind('touchmove');

            // 팝업레이어 띄움
            $(el).fadeIn('300');


        },
        close : function(el) {
            // 배경 마스크 fadeOut 감춘뒤 삭제
            $(el).fadeOut('300');

            $("#mask").fadeOut('300',function(){
                $("#mask").remove();
                $("html, body").css({'overflow':'visible'}).unbind('touchmove');
            });


        }
    }
}();



$(document).ready(function () {
    observer.observe();
// Layout
    $('.menu-button').click(function(e){  //메뉴 버튼 클릭하면
        e.preventDefault();

        if($('body').hasClass('quick-form-open')) { //body .quick-form-open 있을때
            $('.quick-consultation-btn').trigger('click'); // 신청 폼 버튼 강제 클릭함  // body에 .quick-form-open 있을때 신청 폼 닫기 위해
        }

        $('body').toggleClass('cross').removeClass('quick-form-open'); //body에 cross 버튼 있을경우 side 메뉴 열려 있음, quick-form-open
        $('.float__menu--wrap').removeClass('down');

        var isClass = $('body').hasClass('cross'),
            isMain = $('.main').size();

        if(isMain) {
            if(isClass) { //body 에 cross 클래스 있을때 ( side 메뉴 열림 )
                rollingDate.autoplay.stop(); // 개강일자 슬라이드 스톱
                pf.autoplay.stop(); // 포트폴리오 슬라이드 스톱
                slider.autoplay.stop(); //메인 슬라이드 스톱
            } else { //body 에 cross 클래스 없을때  ( side 메뉴 닫힘 )
                rollingDate.autoplay.start(); // 개강일자 슬라이드 재생
                pf.autoplay.start(); // 포트폴리오 슬라이드 재생
                slider.autoplay.start(); //메인 슬라이드 재생
            }
        }

        if(isClass) { //body 에 cross 클래스 있을때 ( side 메뉴 닫힘 )
            eventBlock('body', false);
            $('#wrap').append(mask); // 본문 #wrap 에 mask 추가
            $("#mask").fadeTo(300, 0.7); // mask 서서히 나타남

        } else {
            eventBlock('body', true);
            $("#mask").remove(); // mask 삭제
        }
    });

    $('.side-menu__banner .close').click(function(){
        $('.menu-button').trigger('click');
        return false;
    });


    // qna button 전과목 빠른상담

    var quickForm = $('.quick-consultation-form'); // 폼

    $('.qna, .quick-consultation-btn').on('click touch', function(e){
        e.preventDefault();
        var ele = document.getElementById('wrap');


        if($('body').hasClass('quick-form-open')) {
            $('body').removeClass('quick-form-open');
            quickForm.attr('data-toggle','close');
            ele.removeEventListener('touchmove', t);
        } else {
            $('body').addClass('quick-form-open');
            quickForm.attr('data-toggle','open');
            ele.addEventListener('touchmove', t, {
                passive: false
            });
        }

    });

    // 온라인상담 버튼

    $('.contact').on('click touch', function(e){
        e.preventDefault();
        var ele = document.getElementById('wrap');


        if($('body').hasClass('quick-form-open') && $('body').hasClass('cross') && (quickForm.attr('data-toggle','open'))) { //왼쪽 메뉴 열려있고, 빠른신청 폼 열려있을때
            $('body').removeClass('quick-form-open');
            quickForm.attr('data-toggle','close');

            setTimeout(function() {
                $('body').addClass('quick-form-open');
                quickForm.attr('data-toggle','open');
                ele.addEventListener('touchmove', t, {
                    passive: false
                });
            }, 200);

        } else {
            $('body').addClass('quick-form-open');
            quickForm.attr('data-toggle','open');
            ele.addEventListener('touchmove', t, {
                passive: false
            });
        }

    });



    function t(e){
        e.preventDefault();
        e.stopPropagation();
    }
    // floating btn
    $('#menu-open').change(function(e) {
        e.preventDefault();

        $('.float__menu--wrap').removeClass('down up');
        $('.float__menu--wrap').toggleClass('checked');
    });

    // sidemenu depth
    $('.side-menu__menulist .items').click(function() {
        var flag = $(this).hasClass('active');

        if(flag) {
            $('.side-menu__menulist .depth2').hide();
            $('.side-menu__menulist .items').removeClass('active');
        } else {
            $('.side-menu__menulist .depth2').hide();
            $(this).next().show();
            $('.side-menu__menulist .items').removeClass('active');
            $(this).addClass('active');
        }

        return false;
    });

    (function() {
        $('.tab-trigger .item').click(function(e){
            e.preventDefault();
            var getID = $(this).attr('data-rel');

            $('.tab-trigger .item').removeClass('on');
            $(this).addClass('on');

            $('.tab-cnt').hide();
            $('#'+ getID).show();
        });


        // scroll
        var getHeader = $('#re-header').height(),
            scVal = 0,
            lastScrollTop = 0;

        $(window).scroll(function(e){
            var isClass = $('body').hasClass('cross'),
                p = $(window).scrollTop();

            if(isClass) return true;

            $('.float__menu--wrap').removeClass('down up');
            if (p > lastScrollTop){
                scVal = 0;
                $('#re-header, .float__menu--wrap').addClass('up');
            } else {
                $('#re-header, .float__menu--wrap').addClass('down');
                // 이동거리 값이 30이상일때 헤더 보임
                scVal++;
                if(scVal > 30) {
                    $('#re-header').removeAttr('class');
                    $('#re-header, .float__menu--wrap').addClass('down');
                }
            }
            lastScrollTop = p;


            if( p >= getHeader) {
                $('body').addClass('head-fixed');
            } else {
                $('body').removeClass('head-fixed');
            }
        });
    }());

    // header rolling
    var rollingDate = new Swiper('.rolling-date .swiper-container', {
        direction: 'vertical',
        autoplay: {
            delay: 5000
        }
    });

// DOC END
});

$(window).load(function(){
    if(GNB === undefined) {
        GNB = 'None'
    }
    // GNB ACTIVE
    $('#re-gnb').addClass('active'+ GNB);
});


function eventBlock(ele, flag){
    var target = document.querySelector(ele);

    if(flag) {
        target.removeEventListener('touchmove', test);
    } else {
        target.addEventListener('touchmove', test, {
            passive: false
        });

    }
}

function test(e){
    var t = $(e.target),
        getName = t.prop("tagName").toLowerCase();

    t.parents().map(function(a,b){
        //console.log(a,b);
    });

    // 터치영역이  사이드메뉴 인지 구분
    if(t.closest('#side-menu').length > 0) {
        if(getName === 'select' || getName === 'input' || getName === 'a' || getName === 'label' || getName === 'button') {

        } else {
            e.preventDefault();
            e.stopPropagation()
        }
    } else {
        e.preventDefault();
        e.stopPropagation();
    }
}


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady(num) {
    var vod_code = $("#video" + num).attr('data-code');
    //var vod_width = $("#video" + num).attr('data-video-width');
    //var vod_height = $("#video" + num).attr('data-video-height');

    player = new YT.Player("video" + num , {
        //height: vod_height,
        //width:  vod_width,
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

//# sourceMappingURL=site-debug.js.map
