import $ from "jquery";

class Common {
  constructor () {
    this.$ = $
  }


  // 滚动内容模块
  _rollContent (ulEleClass, liEleClass, olLiEleClass, olLiSpanClass, prevClass, nextClass) {
    let ulEle = $(ulEleClass);
    let liArr = $(liEleClass);
    let olLiArr = $(olLiEleClass);
    let olLiSpanArr = $(olLiSpanClass);


    let prev = $(prevClass);
    let next = $(nextClass);
    let marginLeft;

    let ulWidth = parseFloat(liArr.width()) * liArr.length;
    ulEle.css('width', ulWidth);

    let allCount = liArr.length;
    let i = 1;

    next.click(function () {
      if (i < allCount) {
        i++;
        moveUlEle();
      }
    });

    prev.click(function () {
      if (i > 1) {
        i--;
        moveUlEle();
      }
    });

    Array.from(olLiArr).forEach((item, index) => {
      $(item).attr('index', index + 1).click(function () {
        i = $(this).attr('index');
        moveUlEle();
      })
    });

    function moveUlEle() {
      olLiClass();
      ulEle.css({'marginLeft': `-${liArr.width() * (i - 1)}px`, 'transition': 'margin-left .4s ease'})
    }

    function olLiClass() {
      Array.from(olLiSpanArr).forEach((item, index) => {
        $(olLiSpanArr[index]).removeClass('module-content-active')
      });
      $(olLiSpanArr[i - 1]).addClass('module-content-active')
    }
  }

  // 滚动
  _rollContainer (ulContainer, liContainer, leftArrowContainer, rightArrowContainer, containerWidth) {
    let ulEle = $(ulContainer);
    let liArr = $(liContainer);
    let leftArrow = $(leftArrowContainer);
    let rightArrow = $(rightArrowContainer);

    let ulWidth = (parseFloat(liArr.width()) + parseFloat(liArr.css('marginRight'))) * parseFloat(liArr.length);
    ulEle.css('width', ulWidth);

    const allCount = parseInt(ulWidth / containerWidth);
    let currCount = 1;
    let ulMarginLeft;
    let ulWidthResidue = ((ulWidth - (allCount * containerWidth)) != 0);

    rightArrow.click(function () {
      ulMarginLeft = parseFloat(ulEle.css('marginLeft'));

      if (currCount < allCount) {
        currCount++;

        ulEle.css({'marginLeft': `${ulMarginLeft+(-containerWidth)}px`, 'transition': 'margin-left .6s ease'});

      } else if (ulWidthResidue && Math.abs((ulMarginLeft - (ulWidth - (allCount * containerWidth))) - containerWidth) == ulWidth) {
        ulEle.css({'marginLeft': `${ulMarginLeft - (ulWidth - (allCount * containerWidth))}px`, 'transition': 'margin-left .6s ease'});

      }
    });

    leftArrow.click(function () {
      ulMarginLeft = parseFloat(ulEle.css('marginLeft'));

      if (currCount > 1) {
        currCount--;
        ulEle.css({'marginLeft': `${ulMarginLeft+(containerWidth)}px`, 'transition': 'margin-left .6s ease'});
      } else if (ulWidthResidue && Math.abs(ulMarginLeft) == (ulWidth - (allCount * containerWidth))) {
        ulEle.css({'marginLeft': `0px`, 'transition': 'margin-left .6s ease'});
      }
    })
  }

  _showOrHideBannerListEl (el) {
    el.mouseenter(function () {
      $(this).children('.banner-list-menu').show()
    })
      .mouseleave(function () {
        $(this).children('.banner-list-menu').hide()
      });
  }

  _showOrHideHomeListEl (ele, titleEl, contentEl) {
    let el = $(ele);
    for (let i = 0; i < el.length; i++) {

      $(el[i]).mouseenter(function () {
        Array.from(el).forEach((item, index) => {
          $(`${contentEl}${index+1}`).removeClass('show')
          $(`${titleEl}${index+1}`).removeClass('active')
        });
        $(`${contentEl}${i+1}`).addClass('show')
        $(`${titleEl}${i+1}`).addClass('active')
      })

    }
  }

}

export { Common }