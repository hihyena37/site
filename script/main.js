$(function () {
  // 태블릿·모바일 햄버거 메뉴 열기
  $(".header_ham").on("click", function () {
    $(".ham_menu_bg").addClass("on");
    $("body").addClass("menu_open");
    $(this).attr("aria-expanded", "true");
  });

  // 닫기 버튼을 누르면 햄버거 메뉴 닫기
  $(".ham_close").on("click", function () {
    $(".ham_menu_bg").removeClass("on");
    $("body").removeClass("menu_open");
    $(".header_ham").attr("aria-expanded", "false");
  });

  // 메뉴 바깥의 어두운 배경을 눌러도 닫기
  $(".ham_menu_bg").on("click", function (e) {
    if (e.target === this) {
      $(this).removeClass("on");
      $("body").removeClass("menu_open");
      $(".header_ham").attr("aria-expanded", "false");
    }
  });

  // 메인 메뉴를 누르면 해당 서브메뉴만 열기
  $(".ham_menu_title").on("click", function () {
    let currentTitle = $(this);
    let currentSubmenu = currentTitle.next(".ham_submenu");

    $(".ham_menu_title").not(currentTitle).removeClass("on");
    $(".ham_submenu").not(currentSubmenu).stop().slideUp(300);

    currentTitle.toggleClass("on");
    currentSubmenu.stop().slideToggle(300);
  });

  AOS.init(); // aos선언

  // 헤더 스크롤
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
  let oemSwiper;

  function setOemSwiper() {
    if ($(window).width() <= 1024 && !oemSwiper) {
      oemSwiper = new Swiper(".oem_order", {
        slidesPerView: "auto",
        spaceBetween: 16,
        grabCursor: true,
        scrollbar: {
          el: ".oem_order .swiper-scrollbar",
          draggable: true,
        },
        breakpoints: {
          576: {
            spaceBetween: 24,
          },
        },
      });
    } else if ($(window).width() > 1024 && oemSwiper) {
      oemSwiper.destroy(true, true);
      oemSwiper = undefined;
    }
  }

  setOemSwiper();
  $(window).on("resize", setOemSwiper);

  // 글로벌 숫자 카운트
  let countStarted = false;
  let countUp;
  let exportCountUp;

  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();
    let globalTop = $(".global").offset().top;
    let globalBottom = globalTop + $(".global").outerHeight();
    let windowHeight = $(window).height();
    let scrollBottom = scrollTop + windowHeight;
    let globalVisible = scrollBottom > globalTop && scrollTop < globalBottom;

    if (globalVisible && !countStarted) {
      countStarted = true;

      let count = 1;
      countUp = setInterval(function () {
        $(".country_count").text(count);
        count++;

        if (count > 100) {
          clearInterval(countUp);
        }
      }, 20);

      let exportCount = 1;
      exportCountUp = setInterval(function () {
        $(".export_count").text(exportCount);
        exportCount++;

        if (exportCount > 27) {
          clearInterval(exportCountUp);
        }
      }, 74);
    } else if (!globalVisible) {
      countStarted = false;
      clearInterval(countUp);
      clearInterval(exportCountUp);
      $(".country_count").text(100);
      $(".export_count").text(27);
    }
  });

  // 종료
});
