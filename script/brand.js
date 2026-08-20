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

  // 제품카테고리 메뉴
  let cateMenu = [
    { name: "떡볶이", category: "tteokbokki" },
    { name: "스낵류", category: "snack" },
    { name: "김치류", category: "kimchi" },
    { name: "떡류", category: "ricecake" },
    { name: "전류", category: "jeon" },
  ];

  // 제품카테고리 탭
  let cateTab = cateMenu.map(function (menu, index) {
    return `
    <p
     class="${index === 0 ? "active" : ""}"
     data-category="${menu.category}"
    >
   ${menu.name}
    </p>
    `;
  });
  $(".category_tab .left").html(cateTab.join(""));

  // 처음 선택된 카테고리 = 떡볶이
  let selectCate = "tteokbokki";

  $(".category_tab .left p").click(function () {
    selectCate = $(this).data("category");

    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    // 떡볶이는 5개 옵션, 나머지 카테고리는 전체만 보여준다
    if (selectCate === "tteokbokki") {
      showOptions(tteokbokkiOptions);
    } else {
      showOptions(allOptions);
    }

    // 클릭한 카테고리와 같은 상품만 가져온다
    let categoryProducts = products.filter(function (product) {
      return product.category === selectCate;
    });

    // 선택한 카테고리 상품을 저장하고 첫 페이지를 보여준다
    currentProducts = categoryProducts;
    showProductPage(1);
  });

  // 떡볶이 옵션 배열
  let tteokbokkiOptions = [
    { name: "전체", value: "all" },
    { name: "떡볶이", value: "tteokbokki" },
    { name: "라볶이", value: "rabokki" },
    { name: "냉동 떡볶이", value: "frozen" },
    { name: "할랄 떡볶이", value: "halal" },
  ];

  // 떡볶이 외 카테고리 옵션 배열
  let allOptions = [{ name: "전체", value: "all" }];

  // 옵션을 select 안에 보여주는 함수
  function showOptions(optionList) {
    let optionTag = optionList.map(function (option) {
      return `<option value="${option.value}">${option.name}</option>`;
    });

    $(".category_tab .right").html(optionTag.join(""));
  }

  // 상품 배열
  let products = [
    // 떡볶이 상품 48개
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo1.png",
      title: "요뽀끼 불고기맛 떡볶이 1인 컵",
      info: "대표적인 한식 불고기와 떡볶이의 만남",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo2.png",
      title: "요뽀끼 로제 떡볶이 1인 컵",
      info: "매콤한 떡볶이와 부드러운 크림의 만남",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo3.png",
      title: "요뽀끼 팥 떡볶이 1인 컵",
      info: "달콤한 팥과 쫀득한 떡의 만남",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo4.png",
      title: "요뽀끼 매콤달콤 1인 컵",
      info: "매운맛은 줄이고 달콤한 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo5.png",
      title: "요뽀끼 치즈 1인 컵",
      info: "치즈 풍미를 살린 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo6.png",
      title: "요뽀끼 화끈하게 매운辛 1인 컵",
      info: "중독성 있는 화끈하고 매운 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo7.png",
      title: "요뽀끼 짜장 1인 컵",
      info: "매콤 달짝지근한 짜장 소스로 맛이 두 배",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo8.png",
      title: "요뽀끼 골든어니언버터 1인 컵",
      info: "달콤하고 고소한 어니언버터 맛",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo9.png",
      title: "요뽀끼 명란마요 1인 컵",
      info: "명란젓과 마요네즈가 어우러진 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo10.png",
      title: "요뽀끼 닭갈비맛 1인 컵",
      info: "닭갈비와 떡의 환상의 콤비",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo11.png",
      title: "요뽀끼 갈릭 데리야끼 1인 컵",
      info: "단짠단짠의 정석 갈릭 데리야끼 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo12.png",
      title: "요뽀끼 까르보나라 떡볶이 1인 컵",
      info: "부드러운 크림소스와 떡볶이의 조화",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo13.png",
      title: "요뽀끼 바질 라볶이(국내 전용)",
      info: "맛있는 바질과 맛있는 라볶이의 조화",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo14.png",
      title: "요뽀끼 짜장 라볶이",
      info: "맛있는 짜장과 맛있는 떡볶이의 조화",
    },
    {
      category: "tteokbokki",
      option: "frozen",
      image: "../image/yo15.png",
      title: "냉동 요뽀끼 오리지널 떡볶이 파우치",
      info: "쫀득한 밀떡과 어묵의 매콤한 국물",
    },
    {
      category: "tteokbokki",
      option: "frozen",
      image: "../image/yo16.png",
      title: "냉동 요뽀끼 납작만두 떡볶이 파우치",
      info: "쫀득한 밀떡과 납작만두의 매콤한 국물",
    },
    {
      category: "tteokbokki",
      option: "frozen",
      image: "../image/yo17.png",
      title: "냉동 요뽀끼 막창 떡볶이 파우치",
      info: "쫀득한 밀떡과 막창의 매콤한 국물",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo18.png",
      title: "요뽀끼 EU치즈 떡볶이 1인 컵",
      info: "매콤한 떡볶이와 부드러운 치즈의 만남",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo19.png",
      title: "요뽀끼 로제 2인 파우치",
      info: "매콤달콤한 로제소스로 맛의 풍미가 두 배",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo20.png",
      title: "요뽀끼 로제 1인 파우치",
      info: "매콤달콤한 로제소스로 맛의 풍미가 두 배",
    },
    {
      category: "tteokbokki",
      option: "halal",
      image: "../image/yo21.png",
      title: "요뽀끼 할랄 로제 1인 컵",
      info: "MUI 할랄 인증을 받은 로제 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "halal",
      image: "../image/yo22.png",
      title: "요뽀끼 할랄 김치 1인 컵",
      info: "MUI 할랄 인증을 받은 김치 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo23.png",
      title: "요뽀끼 김치 라볶이",
      info: "볶은김치의 새콤달콤한 맛과 매콤한 맛",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo24.png",
      title: "요뽀끼 김치 1인 컵",
      info: "한국 전통 음식 김치와 떡볶이의 만남",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo25.png",
      title: "요뽀끼 초코 1인 컵",
      info: "초코 퐁듀처럼 쫄깃하고 달콤한 초코맛",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo26.png",
      title: "요뽀끼 화끈 라볶이",
      info: "강하게 맵지만 강하게 맛있는 맛",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo27.png",
      title: "요뽀끼 치즈 라볶이",
      info: "매콤한 떡볶이와 체다치즈맛의 만남",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo28.png",
      title: "요뽀끼 매콤달콤 라볶이",
      info: "남녀노소 모두가 즐길 수 있는 맛",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo29.png",
      title: "요뽀끼 카레 라볶이",
      info: "맛있는 카레와 떡볶이의 조화",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo30.png",
      title: "요뽀끼 매콤달콤 1인 파우치",
      info: "매운맛은 줄이인 매콤달콤 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo31.png",
      title: "요뽀끼 치즈 1인 파우치",
      info: "부드러운 치즈와 쫄깃한 떡의 만남",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo32.png",
      title: "요뽀끼 화끈하게 매운辛 1인 파우치",
      info: "중독성 있는 화끈하고 매운 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo33.png",
      title: "요뽀끼 짜장 1인 파우치",
      info: "매콤한 짜장 소스로 맛의 풍미가 두 배",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo34.png",
      title: "요뽀끼 어니언버터 1인 파우치",
      info: "달콤하고 고소한 어니언버터맛",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo35.png",
      title: "요뽀끼 토마토 라볶이 2인 파우치",
      info: "토마토 소스와 라볶이의 만남",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo36.png",
      title: "요뽀끼 치즈 라볶이 2인 파우치",
      info: "매콤한 떡볶이에 체다치즈 맛",
    },
    {
      category: "tteokbokki",
      option: "rabokki",
      image: "../image/yo37.png",
      title: "요뽀끼 매콤달콤 라볶이 2인 파우치",
      info: "남녀노소 모두가 즐길 수 있는 라볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo38.png",
      title: "요뽀끼 치즈 2인 파우치",
      info: "부드러운 치즈와 떡볶이의 만남",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo39.png",
      title: "요뽀끼 화끈하게 매운辛 2인 파우치",
      info: "중독성 있는 화끈하고 매운 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo40.png",
      title: "요뽀끼 매콤달콤 2인 파우치",
      info: "매운맛은 down, 매콤달콤 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo41.png",
      title: "요뽀끼 짜장 2인 파우치",
      info: "매콤한 짜장 소스로 맛의 풍미가 두 배",
    },
    {
      category: "tteokbokki",
      option: "tteokbokki",
      image: "../image/yo42.png",
      title: "요뽀끼 골든어니언버터 2인 파우치",
      info: "달콤하고 고소한 어니언버터 소스맛",
    },
    {
      category: "tteokbokki",
      option: "halal",
      image: "../image/yo43.png",
      title: "요뽀끼 할랄 짜장 2인 파우치",
      info: "MUI 할랄 인증을 받은 짜장 맛 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "halal",
      image: "../image/yo44.png",
      title: "요뽀끼 할랄 매운맛 2인 파우치",
      info: "MUI 할랄 인증을 받은 매운맛 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "halal",
      image: "../image/yo45.png",
      title: "요뽀끼 할랄 오리지널 2인 파우치",
      info: "MUI할랄 인증을 받은 오리지널맛 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "halal",
      image: "../image/yo46.png",
      title: "요뽀끼 할랄 오리지널 1인 컵",
      info: "MUI할랄 인증을 받은 오리지널 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "halal",
      image: "../image/yo47.png",
      title: "요뽀끼 할랄 짜장 1인 컵",
      info: "MUI 할랄 인증을 받은 짜장 맛 떡볶이",
    },
    {
      category: "tteokbokki",
      option: "halal",
      image: "../image/yo48.png",
      title: "요뽀끼 할랄 매운맛 1인 컵",
      info: "MUI 할랄 인증을 받은 매운맛 떡볶이",
    },
    // 스낵류 상품 8개
    {
      category: "snack",
      option: "all",
      image: "../image/yo1.png",
      title: "요뽀끼 땅콩버터맛 김스낵",
      info: "고소한 땅콩버터맛 김스낵",
    },
    {
      category: "snack",
      option: "all",
      image: "../image/yo2.png",
      title: "요뽀끼 와사비맛 김스낵",
      info: "와사비의 알싸함이 코를 톡 쏘는 김 스낵",
    },
    {
      category: "snack",
      option: "all",
      image: "../image/yo3.png",
      title: "요뽀끼 떡볶이맛 김스낵",
      info: "매콤달콤 떡볶이맛 김스낵",
    },
    {
      category: "snack",
      option: "all",
      image: "../image/yo4.png",
      title: "요뽀끼 피자맛 스낵",
      info: "풍부한 피자의 맛을 바삭한 과자로 느낄 수 있는 떡 모양 스낵",
    },
    {
      category: "snack",
      option: "all",
      image: "../image/yo5.png",
      title: "요뽀끼 와사비맛 스낵",
      info: "와사비의 알싸함이 코를 톡 쏘는 스낵",
    },
    {
      category: "snack",
      option: "all",
      image: "../image/yo6.png",
      title: "요뽀끼 화끈맛 스낵",
      info: "화끈함이 입안에서 바삭하게 맴도는 스낵",
    },
    {
      category: "snack",
      option: "all",
      image: "../image/yo7.png",
      title: "요뽀끼 치즈맛 스낵",
      info: "풍미로운 치즈맛을 바삭한 과자로 느낄 수 있는 스낵",
    },
    {
      category: "snack",
      option: "all",
      image: "../image/yo8.png",
      title: "요뽀끼 매콤달콤맛 스낵",
      info: "매콤하고 달콤함이 입안에서 바삭하게 느껴지는 떡모양 스낵",
    },
    // 김치류 상품 3개
    {
      category: "kimchi",
      option: "all",
      image: "../image/yo1.png",
      title: "요김치 썰은 김치",
      info: "아삭아삭한 식감의 썰은 김치",
    },
    {
      category: "kimchi",
      option: "all",
      image: "../image/yo2.png",
      title: "요김치 만능 김치",
      info: "집에서도 야외에서도 간편하게! 각종 요리에 사용 가능한 만능 김치",
    },
    {
      category: "kimchi",
      option: "all",
      image: "../image/yo3.png",
      title: "요김치 볶은 김치",
      info: "대파유의 풍미가 느껴지는 매콤달콤한 맛의 볶은 김치",
    },
    // 떡류 상품 3개
    {
      category: "ricecake",
      option: "all",
      image: "../image/yo4.png",
      title: "맛다문 떡볶이떡",
      info: "쌀로 만든 맛있는 떡볶이 떡입니다.",
    },
    {
      category: "ricecake",
      option: "all",
      image: "../image/yo5.png",
      title: "맛다문 떡국떡",
      info: "떡국에 넣어 드시면 쫄깃하고 맛있습니다.",
    },
    {
      category: "ricecake",
      option: "all",
      image: "../image/yo6.png",
      title: "맛다문 할랄 떡볶이떡",
      info: "상온에서 장기간 보관 및 유통이 가능한 특허 기술로 만든 할랄 떡볶이떡",
    },
    // 전류 상품 9개
    {
      category: "jeon",
      option: "all",
      image: "../image/yo1.png",
      title: "오븐전 김치전",
      info: "신선한 야채를 주원료로 만들어 한국의 맛을 담은 김치전",
    },
    {
      category: "jeon",
      option: "all",
      image: "../image/yo2.png",
      title: "오븐전 감자채전",
      info: "신선한 감자채를 주원료로 간편하게 조리할 수 있는 감자채전",
    },
    {
      category: "jeon",
      option: "all",
      image: "../image/yo3.png",
      title: "오븐전 야채전",
      info: "신선한 야채를 주원료로 만들어 한국의 맛을 담은 야채전",
    },
    {
      category: "jeon",
      option: "all",
      image: "../image/yo4.png",
      title: "오븐전 해물파전",
      info: "신선한 야채와 해물을 주원료로 각 재료의 풍미를 살린 해물파전",
    },
    {
      category: "jeon",
      option: "all",
      image: "../image/yo5.png",
      title: "오븐전 미니 감자전",
      info: "감자의 고소하고 담백한 맛이 살아있는 미니 감자전",
    },
    {
      category: "jeon",
      option: "all",
      image: "../image/yo6.png",
      title: "오븐전 미니 우리쌀야채전",
      info: "건강한 쌀을 주재료로 고소하고 든든한 미니 우리쌀야채전",
    },
    {
      category: "jeon",
      option: "all",
      image: "../image/yo7.png",
      title: "오븐전 미니 김치전",
      info: "맛있게 숙성시킨 김치를 주원료로 간편하게 즐기는 미니 김치전",
    },
    {
      category: "jeon",
      option: "all",
      image: "../image/yo8.png",
      title: "오븐전 미니 부추전",
      info: "신선한 부추와 야채를 주원료로 만들어 담백한 미니 부추전",
    },
    {
      category: "jeon",
      option: "all",
      image: "../image/yo9.png",
      title: "오븐전 미니 해물파전",
      info: "신선한 야채와 해물을 주원료로 각 재료의 풍미를 살린 미니 해물파전",
    },
  ];

  // 한 페이지에 보여줄 상품 개수와 현재 선택된 상품
  let productsPerPage = 12;
  let currentProducts = products.filter(function (product) {
    return product.category === selectCate;
  });
  let currentPage = 1;

  // 상품 카드를 화면에 보여주는 함수
  function showProducts(productList) {
    let productCards = productList.map(function (product) {
      return `
        <a href="#" class="card">
          <div class="imgbox">
            <img src="${product.image}" alt="${product.title}">
          </div>

          <div class="text">
            <p>${product.title}</p>
            <span>${product.info}</span>
          </div>
        </a>
      `;
    });

    $(".category_i .item_pages").html(`
      <div class="item_box active">
        ${productCards.join("")}
      </div>
    `);
  }

  // 상품을 12개씩 세어서 필요한 페이지 수를 구한다
  function countPages(productList) {
    let totalPages = 0;

    for (let i = 0; i < productList.length; i += productsPerPage) {
      totalPages++;
    }

    return totalPages;
  }

  // 현재 상품 개수에 맞춰 페이지 번호를 만든다
  function showPageNumbers() {
    let totalPages = countPages(currentProducts);
    let pageNumbers = [];

    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(`
        <p class="${page === currentPage ? "active" : ""}"
           data-page="${page}" role="button" tabindex="0">
          ${page}
        </p>
      `);
    }

    $(".category_i .page_num").html(pageNumbers.join(""));
    $(".category_i .page_prev").prop("disabled", currentPage === 1);
    $(".category_i .page_next").prop(
      "disabled",
      currentPage === totalPages
    );
  }

  // 선택한 페이지에 해당하는 상품 12개를 보여준다
  function showProductPage(page) {
    currentPage = page;

    let start = (currentPage - 1) * productsPerPage;
    let end = start + productsPerPage;
    let pageProducts = currentProducts.slice(start, end);

    showProducts(pageProducts);
    showPageNumbers();
  }

  // 페이지 번호를 클릭하면 해당 페이지를 보여준다
  $(".category_i .page_num").on("click", "p", function () {
    showProductPage($(this).data("page"));
  });

  // 이전 페이지
  $(".category_i .page_prev").click(function () {
    if (currentPage > 1) {
      showProductPage(currentPage - 1);
    }
  });

  // 다음 페이지
  $(".category_i .page_next").click(function () {
    let totalPages = countPages(currentProducts);

    if (currentPage < totalPages) {
      showProductPage(currentPage + 1);
    }
  });

  // 옵션을 바꾸면 선택한 옵션에 맞는 상품을 보여준다
  $(".category_tab .right").change(function () {
    let selectOption = $(this).val();

    let optionProducts = products.filter(function (product) {
      // 전체는 옵션을 구분하지 않고 현재 카테고리 상품을 모두 가져온다
      if (selectOption === "all") {
        return product.category === selectCate;
      }

      // 전체가 아니면 카테고리와 옵션이 모두 같은 상품만 가져온다
      return (
        product.category === selectCate && product.option === selectOption
      );
    });

    // 선택한 옵션 상품을 저장하고 첫 페이지를 보여준다
    currentProducts = optionProducts;
    showProductPage(1);
  });

  // 처음 선택된 떡볶이 상품의 첫 페이지를 보여준다
  showProductPage(1);

  // 처음 선택된 떡볶이 옵션을 화면에 보여준다
  showOptions(tteokbokkiOptions);

  // OEM HTML에 작성된 상품 카드를 복사해 둔다
  let oemCards = $(".oem_i .item_box .card").clone();
  let selectOem = "all";
  let oemCurrentPage = 1;
  let oemPerPage = getOemPerPage();

  // 화면 너비에 따라 한 페이지에 보여줄 OEM 상품 수를 정한다
  function getOemPerPage() {
    if ($(window).width() <= 575) {
      return 4;
    } else if ($(window).width() <= 1024) {
      return 3;
    } else {
      return 4;
    }
  }

  // 현재 선택한 OEM 브랜드의 상품만 가져온다
  function getOemCards() {
    return oemCards.filter(function () {
      if (selectOem === "all") {
        return true;
      }

      return $(this).data("oem-brand") === selectOem;
    });
  }

  // OEM 상품 수를 한 페이지의 상품 수만큼 세어 페이지 수를 구한다
  function countOemPages(cardList) {
    let totalPages = 0;

    for (let i = 0; i < cardList.length; i += oemPerPage) {
      totalPages++;
    }

    return totalPages;
  }

  // 선택한 페이지의 OEM 상품을 보여준다
  function showOemPage(page) {
    let filteredCards = getOemCards();
    let totalPages = countOemPages(filteredCards);

    oemCurrentPage = page;

    let start = (oemCurrentPage - 1) * oemPerPage;
    let end = start + oemPerPage;
    let pageCards = filteredCards.slice(start, end).clone();
    let itemBox = $('<div class="item_box active"></div>');

    itemBox.append(pageCards);
    $(".oem_i .item_pages").html(itemBox);
    showOemPageNumbers(totalPages);
  }

  // OEM 페이지 번호를 만든다
  function showOemPageNumbers(totalPages) {
    let pageNumbers = [];

    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(`
        <p class="${page === oemCurrentPage ? "active" : ""}"
           data-page="${page}" role="button" tabindex="0">
          ${page}
        </p>
      `);
    }

    $(".oem_i .page_num").html(pageNumbers.join(""));
    $(".oem_i .page_prev").prop("disabled", oemCurrentPage === 1);
    $(".oem_i .page_next").prop(
      "disabled",
      oemCurrentPage === totalPages
    );
  }

  // OEM 브랜드 탭을 클릭하면 해당 브랜드의 첫 페이지를 보여준다
  $(".oem_tab .left p").click(function () {
    selectOem = $(this).data("oem");

    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    showOemPage(1);
  });

  // OEM 페이지 번호를 클릭한다
  $(".oem_i .page_num").on("click", "p", function () {
    showOemPage($(this).data("page"));
  });

  // OEM 이전 페이지
  $(".oem_i .page_prev").click(function () {
    if (oemCurrentPage > 1) {
      showOemPage(oemCurrentPage - 1);
    }
  });

  // OEM 다음 페이지
  $(".oem_i .page_next").click(function () {
    let totalPages = countOemPages(getOemCards());

    if (oemCurrentPage < totalPages) {
      showOemPage(oemCurrentPage + 1);
    }
  });

  // 브라우저 너비가 바뀌어 페이지당 상품 수가 달라지면 다시 보여준다
  $(window).resize(function () {
    let newOemPerPage = getOemPerPage();

    if (oemPerPage !== newOemPerPage) {
      oemPerPage = newOemPerPage;
      showOemPage(1);
    }
  });

  // 처음에는 OEM 전체 상품의 첫 페이지를 보여준다
  showOemPage(1);

  // 종료
});
