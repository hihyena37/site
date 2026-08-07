$(function () {
  // 서브메뉴 슬라이드
  let submenu = $(".submenu_bg, .header_i .submenu");

  $(".header_i .menu>li").on("mouseenter", function () {
    submenu.stop().slideDown(400);
  });

  $("header").on("mouseleave", function () {
    submenu.stop().slideUp(400);
  });
  // 서브메뉴 슬라이드


  // click보다 먼저 실행되는 mousedown을 사용해 첫 클릭에서 바로 옵션 목록을 열고,
  // preventDefault()로 이미지에 포커스가 먼저 이동하는 기본 동작을 막음
  $(".header_icon .lang .imgbox").on("mousedown", function (e) {
    e.preventDefault();
    $(this).siblings("select")[0].showPicker();
  });

  // top버튼
  $(window).on("scroll", function(){
    if($(this).scrollTop() > 200){
      $(".topbtn").addClass("show");
    } else{
      $(".topbtn").removeClass("show");
    }
  });

  // OEM 진행 절차 Swiper
  let orderSwiper;

  function setOrderSwiper() {
    if ($(window).width() <= 1024 && !orderSwiper) {
      orderSwiper = new Swiper(".oreder_box", {
        slidesPerView: "auto",
        spaceBetween: 16,
        grabCursor: true,
        scrollbar: {
          el: ".oreder_box .swiper-scrollbar",
          draggable: true,
        },
        breakpoints: {
          576: {
            spaceBetween: 16,
          },
        },
      });
    } else if ($(window).width() > 1024 && orderSwiper) {
      orderSwiper.slideTo(0, 0);
      orderSwiper.destroy(true, true);
      $(".oreder_box .swiper-wrapper, .oreder_box .swiper-slide").removeAttr("style");
      orderSwiper = undefined;
    }
  }

  setOrderSwiper();
  $(window).on("resize", setOrderSwiper);
  // top버튼


  // 종료
});
