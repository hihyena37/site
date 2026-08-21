$(function () {
  // 햄버거 메뉴 열기·닫기
  $(".header_ham").click(function () {
    $(".ham_menu_bg").addClass("on");
    $("body").addClass("menu_open");
  });
  $(".ham_close").click(function () {
    $(".ham_menu_bg").removeClass("on");
    $("body").removeClass("menu_open");
  });
  $(".ham_menu_bg").click(function (e) {
    if (e.target === this) {
      $(this).removeClass("on");
      $("body").removeClass("menu_open");
    }
  });
  $(".ham_menu_title").click(function () {
    $(this).toggleClass("on").next(".ham_submenu").stop().slideToggle(300);
    $(this).parent().siblings().find(".ham_menu_title").removeClass("on");
    $(this).parent().siblings().find(".ham_submenu").stop().slideUp(300);
  });

  // PC 너비가 되면 열린 햄버거 메뉴 닫기
  $(window).on("resize", function () {
    if ($(window).width() >= 1025) {
      $(".ham_menu_bg").removeClass("on");
      $("body").removeClass("menu_open");
      $(".header_ham").attr("aria-expanded", "false");
      $(".ham_menu_title").removeClass("on");
      $(".ham_submenu").stop(true, true).hide();
    }
  });

  // 헤더스크롤
  let lastScrollTop = 0;
  let header = $("header");
  let headerHeight = header.outerHeight();
  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();

    if (scrollTop <= headerHeight) {
      header.removeClass("header_hide");
      header.removeClass("header_show");
    } else if (scrollTop > lastScrollTop) {
      header.addClass("header_hide");
      header.removeClass("header_show");
    } else {
      header.addClass("header_show");
      header.removeClass("header_hide");
    }
    lastScrollTop = scrollTop;
  });

  // 서브메뉴 슬라이드
  let submenu = $(".submenu_bg, .header_i .submenu");

  $(".header_i .menu>li").on("mouseenter", function () {
    submenu.stop().slideDown(400);
  });

  $("header").on("mouseleave", function () {
    submenu.stop().slideUp(400);
  });

  // top버튼
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".topbtn").addClass("show");
    } else {
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
      $(".oreder_box .swiper-wrapper, .oreder_box .swiper-slide").removeAttr(
        "style",
      );
      orderSwiper = undefined;
    }
  }

  setOrderSwiper();
  $(window).on("resize", setOrderSwiper);

  // OEM 제품 브랜드 탭
  $(".product_tab p").click(function () {
    let brand = $(this).data("brand");

    $(this).addClass("active").siblings().removeClass("active");

    $(".item_box .card").each(function () {
      if (brand === "all" || $(this).data("brand") === brand) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // 종료
});
