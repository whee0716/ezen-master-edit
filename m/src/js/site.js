var GNB;
// lazyloading
var observer = lozad('.lozad', {
    loaded: function(el) {
        el.classList.add('lozad-fade');
    }
});



$(document).ready(function () {
    observer.observe();
// Layout
    $('.menu-button').click(function(e){
        e.preventDefault();

        if($('body').hasClass('quick-btn-open')) {
            $('.quick-btn').trigger('click');
        }


        $('body').toggleClass('cross').removeClass('quick-btn-open');
        $('.float__menu--wrap').removeClass('down');

        var isClass = $('body').hasClass('cross'),
            isMain = $('.main').size();

        if(isMain) {
            if(isClass) {
                rollingDate.autoplay.stop();
                pf.autoplay.stop();
            } else {
                rollingDate.autoplay.start();
                pf.autoplay.start();
            }
        }

        if(isClass) {
            eventBlock('body', false);
        } else {
            eventBlock('body', true);
        }
    });
    $('.side-menu__banner .close').click(function(){
        $('.menu-button').trigger('click');
        return false;
    });
// quick-btn
    $('.quick-btn').on('click touch', function(e){
        e.preventDefault();
        var ele = document.getElementById('wrap');

        if($('body').hasClass('quick-btn-open')) {
            $('body').removeClass('quick-btn-open');
            ele.removeEventListener('touchmove', t);
        } else {
            $('body').addClass('quick-btn-open');
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