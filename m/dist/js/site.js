var GNB,observer=lozad(".lozad",{loaded:function(e){e.classList.add("lozad-fade")}}),mask=$('<div id="mask">').css({position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%","-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",opacity:"0.7",background:"#000","-moz-opacity":"0.7","z-index":"100",display:"none"}),popup={open:function(e){$(".popup").hide(),$("body").append(mask),$("#mask").fadeTo(300,.8),$("html, body").css({"overflow-y":"hidden"}).bind("touchmove"),$(e).fadeIn("300")},close:function(e){$(e).fadeOut("300"),$("#mask").fadeOut("300",function(){$("#mask").remove(),$("html, body").css({overflow:"visible"}).unbind("touchmove")})}};function eventBlock(e,t){var o=document.querySelector(e);t?o.removeEventListener("touchmove",test):o.addEventListener("touchmove",test,{passive:!1})}function test(e){var t=$(e.target),o=t.prop("tagName").toLowerCase();t.parents().map(function(e,t){}),t.closest("#side-menu").length>0&&("select"===o||"input"===o||"a"===o||"label"===o||"button"===o)||(e.preventDefault(),e.stopPropagation())}$(document).ready(function(){observer.observe(),$(".menu-button").click(function(e){e.preventDefault(),$("body").hasClass("quick-form-open")&&$(".quick-consultation-btn").trigger("click"),$("body").toggleClass("cross").removeClass("quick-form-open"),$(".float__menu--wrap").removeClass("down");var t=$("body").hasClass("cross");$(".main").size()&&(t?(o.autoplay.stop(),pf.autoplay.stop(),slider.autoplay.stop()):(o.autoplay.start(),pf.autoplay.start(),slider.autoplay.start())),t?(eventBlock("body",!1),$("#wrap").append(mask),$("#mask").fadeTo(300,.7)):(eventBlock("body",!0),$("#mask").remove())}),$(".side-menu__banner .close").click(function(){return $(".menu-button").trigger("click"),!1});var e=$(".quick-consultation-form");function t(e){e.preventDefault(),e.stopPropagation()}$(".qna, .quick-consultation-btn").on("click touch",function(o){o.preventDefault();var a=document.getElementById("wrap");$("body").hasClass("quick-form-open")?($("body").removeClass("quick-form-open"),e.attr("data-toggle","close"),a.removeEventListener("touchmove",t)):($("body").addClass("quick-form-open"),e.attr("data-toggle","open"),a.addEventListener("touchmove",t,{passive:!1}))}),$(".contact").on("click touch",function(o){o.preventDefault();var a=document.getElementById("wrap");$("body").hasClass("quick-form-open")&&$("body").hasClass("cross")&&e.attr("data-toggle","open")?($("body").removeClass("quick-form-open"),e.attr("data-toggle","close"),setTimeout(function(){$("body").addClass("quick-form-open"),e.attr("data-toggle","open"),a.addEventListener("touchmove",t,{passive:!1})},200)):($("body").addClass("quick-form-open"),e.attr("data-toggle","open"),a.addEventListener("touchmove",t,{passive:!1}))}),$("#menu-open").change(function(e){e.preventDefault(),$(".float__menu--wrap").removeClass("down up"),$(".float__menu--wrap").toggleClass("checked")}),$(".side-menu__menulist .items").click(function(){return $(this).hasClass("active")?($(".side-menu__menulist .depth2").hide(),$(".side-menu__menulist .items").removeClass("active")):($(".side-menu__menulist .depth2").hide(),$(this).next().show(),$(".side-menu__menulist .items").removeClass("active"),$(this).addClass("active")),!1}),function(){$(".tab-trigger .item").click(function(e){e.preventDefault();var t=$(this).attr("data-rel");$(".tab-trigger .item").removeClass("on"),$(this).addClass("on"),$(".tab-cnt").hide(),$("#"+t).show()});var e=$("#re-header").height(),t=0,o=0;$(window).scroll(function(a){var s=$("body").hasClass("cross"),n=$(window).scrollTop();if(s)return!0;$(".float__menu--wrap").removeClass("down up"),n>o?(t=0,$("#re-header, .float__menu--wrap").addClass("up")):($("#re-header, .float__menu--wrap").addClass("down"),++t>30&&($("#re-header").removeAttr("class"),$("#re-header, .float__menu--wrap").addClass("down"))),o=n,n>=e?$("body").addClass("head-fixed"):$("body").removeClass("head-fixed")})}();var o=new Swiper(".rolling-date .swiper-container",{direction:"vertical",autoplay:{delay:5e3}})}),$(window).load(function(){void 0===GNB&&(GNB="None"),$("#re-gnb").addClass("active"+GNB)});
//# sourceMappingURL=site.js.map
