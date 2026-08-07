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

  // 레드쿡 설명 박스
  $(".redcook_more").on({
    mouseenter: function () {
      $(this).addClass("active");
      $(this).find(".redcook_desc").stop().slideDown(300);
    },
    mouseleave: function () {
      $(this).removeClass("active");
      $(this).find(".redcook_desc").stop().slideUp(300);
    },
  });
  // 레드쿡 설명 박스

  // 종료
});
