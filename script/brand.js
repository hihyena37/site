$(function () {
  // 서브메뉴 슬라이드
  let submenu = $(".submenu_bg, .header_i .submenu");

  $(".header_i .menu>li").on("mouseenter", function () {
    submenu.stop().slideDown(400);
  });

  $("header").on("mouseleave", function () {
    submenu.stop().slideUp(400);
  });

  // 헤더메뉴 아이콘 랭 이미지 클릭시 옵션목록열기
  // click보다 먼저 실행되는 mousedown을 사용해 첫 클릭에서 바로 옵션 목록을 열고,
  // preventDefault()로 이미지에 포커스가 먼저 이동하는 기본 동작을 막음
  $(".header_icon .lang .imgbox").on("mousedown", function (e) {
    e.preventDefault();
    $(this).siblings("select")[0].showPicker();
  });

  // 카테고리 페이지넘버 탭 클릭시 페이지 변화
  $(".page_num p").click(function () {
    $(this).addClass("active").siblings().removeClass("active");

    $(this)
      .closest("section")
      .find(".item_box")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");

    // 변경된 아이템 카드 목록의 맨 위로 부드럽게 이동한다
    $(this)
      .closest("section")
      .find(".item_pages")
      .get(0)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // 페이지 탭 오른쪽 화살표
  $(".page_next").click(function () {
    // 클릭한 오른쪽 화살표와 같은 페이지 탭 안에서
    $(this)
      .siblings(".page_num")
      // 현재 활성화된 페이지 번호를 찾고
      .find("p.active")
      // 바로 다음 페이지 번호로 이동한 뒤
      .next("p:visible")
      // 해당 번호의 클릭 이벤트를 실행한다
      .trigger("click");
  });

  // 페이지 탭 왼쪽 화살표
  $(".page_prev").click(function () {
    // 클릭한 왼쪽 화살표와 같은 페이지 탭 안에서
    $(this)
      .siblings(".page_num")
      // 현재 활성화된 페이지 번호를 찾고
      .find("p.active")
      // 바로 이전 페이지 번호로 이동한 뒤
      .prev("p:visible")
      // 해당 번호의 클릭 이벤트를 실행한다
      .trigger("click");
  });

  // 카테고리 옵션 선택
  // 처음 로딩된 전체 카드를 원래 순서대로 저장한다
  var categoryCards = $(".category_i .item_box .card");

  $(".category_tab .right").change(function () {
    // 기본값은 전체 카드
    var filteredCards = categoryCards;

    // 선택한 옵션에 맞는 카드만 골라낸다
    if ($(this).val() === "rabokki") {
      filteredCards = categoryCards.filter(":contains('라볶이')");
    }

    if ($(this).val() === "halal") {
      filteredCards = categoryCards.filter(":contains('할랄')");
    }

    if ($(this).val() === "frozen") {
      filteredCards = categoryCards.filter(":contains('냉동')");
    }

    if ($(this).val() === "tteokbokki") {
      filteredCards = categoryCards
        .not(":contains('라볶이')")
        .not(":contains('할랄')")
        .not(":contains('냉동')");
    }

    // 기존 페이지를 비우고 필터 결과를 12개씩 앞 페이지부터 다시 담는다
    $(".category_i .item_box").empty().removeClass("active");

    filteredCards.each(function (index) {
      $(".category_i .item_box")
        .eq(Math.floor(index / 12))
        .append(this);
    });

    // 결과 개수에 필요한 페이지 번호만 남긴다
    $(".category_i .page_num p").each(function (index) {
      $(this).toggle(index < Math.ceil(filteredCards.length / 12));
    });

    // 필터가 바뀌면 항상 첫 페이지부터 보여준다
    $(".category_i .item_box").eq(0).addClass("active");
    $(".category_i .page_num p")
      .removeClass("active")
      .eq(0)
      .addClass("active");
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

  // top버튼
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".topbtn").addClass("show");
    } else {
      $(".topbtn").removeClass("show");
    }
  });

  // 종료
});
