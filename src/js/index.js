import '../css/reset.css'
import '../css/index.styl'
import '../css/common.styl'
import '../font/iconfont.css'

import { Common } from "./common";

const common = new Common();
const $ = common.$;

(function () {

  let topBarCart = $('.top-bar-cart')[0];
  let topBarCartMenu = $('.top-bar-cart-menu')[0];
  let topBarCartContent = $('.top-bar-cart-content')[0];

  let headerNavMenu = $('.header-nav-menu')[0];
  let headerNavLi = $('.header-nav-li')[0];



  showOrHideTopBarCart();
  showOrHideHeaderNavMenu();
  showOrHideBannerList();
  showOrHideHeaderSearchMenu();
  showOrHideHomeToTop();
  showOrHideHomeList();
  showOrHideAiList();
  showOrHideMatchList();
  rollFlashPurchase();
  rollRecommend();
  downTime();
  rollModuleContent();
  showOrHideBanner();


  function showOrHideTopBarCart() {
    topBarCart.onmouseenter = () => {
      $(topBarCartMenu).show();
      $(topBarCartContent).addClass('active-b-c')
    };
    topBarCart.onmouseleave = () => {

      $(topBarCartMenu).hide();
      $(topBarCartContent).removeClass('active-b-c')
    }
  }

  function showOrHideHeaderNavMenu() {
    headerNavLi.onmouseenter = () => {
      $(headerNavMenu).slideDown()
    };
    headerNavMenu.onmouseleave = () => {
      $(headerNavMenu).slideUp()
    }
  }

  function showOrHideBannerList() {
    common._showOrHideBannerListEl($('.banner-list-phone'));
    common._showOrHideBannerListEl($('.banner-list-tv'));
    common._showOrHideBannerListEl($('.banner-list-computer'));
  }

  function showOrHideHeaderSearchMenu() {
    $('.search-content').focus(function () {
      $(this).css('borderColor', '#ff6700');
      $('.search-submit').css('borderColor', '#ff6700');
      $('.search-focus-list').slideDown().css('zIndex', 99)
    })
      .blur(function () {
        $(this).css('borderColor', '#e0e0e0');
        $('.search-submit').css('borderColor', '#e0e0e0');
        $('.search-focus-list').slideUp()
      })
  }

  function showOrHideHomeToTop() {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 920) {
        $('.home-bar-to-top').css('visibility', 'visible')
      } else {
        $('.home-bar-to-top').css('visibility', 'hidden')
      }
    })
  }

  // banner轮播
  function showOrHideBanner() {
    let bannerEle = $('.banner');
    let liArr = $('#banner-list-img').children('li');
    let olEle = $('.banner-list-ol');
    let olLiArr;
    let next = $('.banner-right');
    let prev = $('.banner-left');
    let timer = null;

    let allCount = liArr.length;
    let i = 0;

    for (let k = 0; k < liArr.length; k++) {
      if (k == 0) {
        $(olEle).append('<li class="banner-active"></li>')
      } else {
        $(olEle).append('<li></li>')
      }
    }

    olLiArr = $(olEle).children('li');

    Array.from(liArr).forEach((item, index) => {
      if (index == 0) {
        $(item).css({'display': 'block', 'zIndex': 2})
      } else {
        $(item).css({'display': 'none', 'zIndex': 0})
      }
    });
    next.click(nextAnimate);

    prev.click(function () {
      if (i == 0) {
        liArrAnimate(allCount - 1, i);
        i = allCount - 1;
        olLiArrMove();
        return
      }

      if (i > 0) {
        i--;
        olLiArrMove();
        liArrAnimate(i, i + 1);
      }
    });

    timer = setInterval(function () {
      nextAnimate();
    }, 2000);

    $(bannerEle).mouseleave(function () {
      clearInterval(timer);
      timer = setInterval(function () {
        nextAnimate();
      }, 2000);
    });

    $(bannerEle).mouseenter(function () {
      clearInterval(timer)
    });

    function nextAnimate() {
        if (i == (allCount - 1)) {
          liArrAnimate(0, i);
          i = 0;
          olLiArrMove();
          return
        }
        if (i < allCount - 1) {
          i++;
          olLiArrMove();
          liArrAnimate(i, i - 1);
        }
    }

    function liArrAnimate(nextIndex, prevIndex) {
      $(liArr[nextIndex]).css({'display': 'block', 'opacity': 1});
      $(liArr[prevIndex]).animate({'opacity': 0}, 300, function () {
        $(this).css({'display': 'none', 'zIndex': 0});
        $(liArr[nextIndex]).css({'zIndex': 2})
      })
    }

    function olLiArrMove() {
      Array.from(olLiArr).forEach((item, index) => {
        $(item).removeClass('banner-active').attr('index', index)
      });
      $(olLiArr[i]).addClass('banner-active')
    }

  }

  // 闪购
  function rollFlashPurchase() {
    common._rollContainer('#flash-purchase-content-list', '#flash-purchase-content-list > li', '.flash-purchase-head-left', '.flash-purchase-head-right', 992)
  }

  // 倒计时
  function downTime() {
    const hEle = $('#down-time-h');
    const mEle = $('#down-time-m');
    const sEle = $('#down-time-s');

    let test = new Date();
    let testF = test.getFullYear();
    let testM = test.getMonth() + 1;
    let testD = test.getDate() + 1;

    let endTime = new Date(`${testF}/${testM}/${testD} 10:00:00`).getTime();
    let timer = null;


    timeOut();
    function timeOut() {

      let nowTime = new Date().getTime();
      let time = (endTime - nowTime) / 1000;


      let h = parseInt(time / (60 * 60));
      let m = parseInt(time / 60 % 60);
      let s = parseInt(time % 60);

      h = h > 9 ? h : '0' + h;
      m = m > 9 ? m : '0' + m;
      s = s > 9 ? s : '0' + s;

      clearTimeout(timer);
      timer = setTimeout(function () {
        if (time > 0) {
          hEle.text(h);
          mEle.text(m);
          sEle.text(s);
          timeOut();
        } else {
          clearTimeout(timer);
          return
        }
      }, 1000)
    }

  }

  // 推荐
  function rollRecommend() {
    common._rollContainer('#recommend-list', '#recommend-list > li', '.recommend-left', '.recommend-right', 1240)
  }

  // 家电类目
  function showOrHideHomeList() {
    common._showOrHideHomeListEl('.home-el-title', '.home-el-title-', '.home-el-content-ul-')
  }

  // 智能类目
  function showOrHideAiList() {
    common._showOrHideHomeListEl('.ai-el-title', '.ai-el-title-', '.ai-el-content-ul-')
  }

  // 搭配类目
  function showOrHideMatchList() {
    common._showOrHideHomeListEl('.match-el-title', '.match-el-title-', '.match-el-content-ul-')
  }

  // 内容
  function rollModuleContent() {

    common._rollContent('.module-content-body-ul-1', '.module-content-body-ul-1 > li', '.module-content-body-ol-1 > li', '.module-content-body-ol-1 > li > span', '.module-content-control-1 > .control-prev', '.module-content-control-1 > .control-next');
    common._rollContent('.module-content-body-ul-2', '.module-content-body-ul-2 > li', '.module-content-body-ol-2 > li', '.module-content-body-ol-2 > li > span', '.module-content-control-2 > .control-prev', '.module-content-control-2 > .control-next');
    common._rollContent('.module-content-body-ul-3', '.module-content-body-ul-3 > li', '.module-content-body-ol-3 > li', '.module-content-body-ol-3 > li > span', '.module-content-control-3 > .control-prev', '.module-content-control-3 > .control-next');
    common._rollContent('.module-content-body-ul-4', '.module-content-body-ul-4 > li', '.module-content-body-ol-4 > li', '.module-content-body-ol-4 > li > span', '.module-content-control-4 > .control-prev', '.module-content-control-4 > .control-next');

  }

})();
