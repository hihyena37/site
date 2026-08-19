$(function () {
  $(".header_ham").on("click", function () {
    $(".ham_menu_bg").addClass("on");
    $("body").addClass("menu_open");
    $(this).attr("aria-expanded", "true");
  });

  $(".ham_close").on("click", function () {
    $(".ham_menu_bg").removeClass("on");
    $("body").removeClass("menu_open");
    $(".header_ham").attr("aria-expanded", "false");
  });

  $(".ham_menu_bg").on("click", function (e) {
    if (e.target === this) $(".ham_close").trigger("click");
  });

  $(".ham_menu_title").on("click", function () {
    let currentTitle = $(this);
    let currentSubmenu = currentTitle.next(".ham_submenu");
    $(".ham_menu_title").not(currentTitle).removeClass("on");
    $(".ham_submenu").not(currentSubmenu).stop().slideUp(300);
    currentTitle.toggleClass("on");
    currentSubmenu.stop().slideToggle(300);
  });

  $(window).on("resize", function () {
    if ($(window).width() >= 1025) {
      $(".ham_menu_bg").removeClass("on");
      $("body").removeClass("menu_open");
      $(".header_ham").attr("aria-expanded", "false");
      $(".ham_menu_title").removeClass("on");
      $(".ham_submenu").stop(true, true).hide();
    }
  });

  let countStarted = false;
  let countUp;
  let exportCountUp;

  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();
    let sectionTop = $(".counter_section").offset().top;
    let sectionBottom = sectionTop + $(".counter_section").outerHeight();
    let scrollBottom = scrollTop + $(window).height();
    let visible = scrollBottom > sectionTop && scrollTop < sectionBottom;

    if (visible && !countStarted) {
      countStarted = true;
      let country = 1;
      let share = 1;

      countUp = setInterval(function () {
        $(".country_count").text(country++);
        if (country > 100) clearInterval(countUp);
      }, 20);

      exportCountUp = setInterval(function () {
        $(".export_count").text(share++);
        if (share > 27) clearInterval(exportCountUp);
      }, 74);
    } else if (!visible) {
      countStarted = false;
      clearInterval(countUp);
      clearInterval(exportCountUp);
      $(".country_count").text(100);
      $(".export_count").text(27);
    }
  });
});
