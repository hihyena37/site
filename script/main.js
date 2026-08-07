$(function () {
  AOS.init(); // 선언
  
  // 서브메뉴 슬라이드
  let submenu = $(".submenu_bg, .header_i .submenu");

  $(".header_i .menu>li").on("mouseenter", function () {
    submenu.stop().slideDown(400);
  });

  $("header").on("mouseleave", function () {
    submenu.stop().slideUp(400);
  });
  // 서브메뉴 슬라이드

  // click보다 먼저 실행되는 mousedown / 첫 클릭에서 바로 옵션 목록을 열고,
  // preventDefault()로 이미지에 포커스가 먼저 이동하는 기본 동작을 막음
  $(".header_icon .lang .imgbox").on("mousedown", function (e) {
    e.preventDefault();
    $(this).siblings("select").get(0).showPicker();
    // .showPicker() : select가 가진 기본 옵션 선택창 열기
  });

  // top버튼
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".topbtn").addClass("show");
    } else {
      $(".topbtn").removeClass("show");
    }
  });
  // top버튼

  // 종료
});
