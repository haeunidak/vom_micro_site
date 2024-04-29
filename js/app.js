/**
 * 컴포넌트화 한 HTML 로드
 */

window.addEventListener('load', function () {
  const includeTarget = document.querySelectorAll('.includeJs');

  Array.prototype.forEach.call(includeTarget, function (el) {
    const targetFile = el.dataset.includeFile;

    if (targetFile) {
      let http = new XMLHttpRequest();

      http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          el.outerHTML = this.responseText;

          // intro.html 에서 RANGE ROVER 문구 1초 뒤에 적용
          if (targetFile.includes('intro.html')) {
            const carTextOverlay = document.querySelector('.car_text_overlay');

            setTimeout(() => {
              carTextOverlay.style.animation = 'flyInLeftIntro 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            }, 1000);
          }
        }
      };

      http.open('GET', targetFile, true);
      http.send();
    }
  })
});


/**
 * 햄버거 메뉴 클릭 이벤트
 */
function hamburgerMenuClick() {
  const text = document.querySelector('.logo_text');
  const menuIcon = document.querySelector('.menu_icon');
  const menu = document.querySelector('.menu');

  if (menu.classList.contains('on')) { // 메뉴 닫는 경우
    menu.classList.remove('on');
  } else { // 메뉴 여는 경우
    menu.classList.add('on');

  }

  // 이미지와 글씨 애니메이션 추가
  text.style.opacity = '0';
  menuIcon.style.opacity = '0';

  setTimeout(() => {
    text.textContent = menu.classList.contains('on') ? 'CLICK TO EXPLORE' : 'SCROLL TO EXPLORE';
    text.style.opacity = '1';

    menuIcon.src = menu.classList.contains('on') ? '../img/header/close.png' : '../img/header/hamburger_menu.png';
    menuIcon.style.opacity = '1';
  }, 300);
}

/**
 * 메뉴에 마우스 호버 했을 경우
 */

function menuMouseEnter(element) {
  const menus = document.querySelectorAll('.menu_wrapper');

  menus.forEach(menu => {
    const menuSpan = element.children;

    Array.prototype.forEach.call(menuSpan, function (el) {

      if (el.tagName !== 'DIV') { // 글자 색 초록색으로 변경
        el.classList.add('menu_hover');

      } else { // 아래 줄 추가
        if (el.parentElement.classList.contains('front')) { // 번호가 앞에 있을 경우 초록 줄을 뒤에 추가
          el.classList.add('menu_hover_back_under_line');

          // px 단위를 %단위와 계산 하기 위한 로직
          let pxValue = el.parentElement.offsetWidth;
          let percentValue = (pxValue / el.parentElement.parentElement.offsetWidth) * 100;
          let modifiedPxValue = (percentValue - 5) * el.parentElement.parentElement.offsetWidth / 100;

          el.style.marginLeft = modifiedPxValue + 'px';

        } else if (el.parentElement.classList.contains('back')) { // 번호가 뒤에 있을 경우 초록 줄을 앞에 추가
          el.classList.add('menu_hover_front_under_line');
        }
      }
    });
  });
}

/**
 * 메뉴에 마우스 호버 뗐을 경우
 */

function menuMouseLeave(element) {
  const menus = document.querySelectorAll('.menu_wrapper');

  menus.forEach(menu => {
    const menuSpan = element.children;

    Array.prototype.forEach.call(menuSpan, function (el) {

      if (el.tagName !== 'DIV') { // 글자 색 초록색으로 변경
        el.classList.remove('menu_hover');

      } else { // 아래 줄 삭제
        if (el.parentElement.classList.contains('front')) { // 번호가 앞에 있을 경우 초록 줄을 뒤에 삭제
          el.classList.remove('menu_hover_back_under_line');

        } else if (el.parentElement.classList.contains('back')) { // 번호가 뒤에 있을 경우 초록 줄을 앞에 삭제
          el.classList.remove('menu_hover_front_under_line');
        }
      }
    });
  });
}

window.addEventListener('scroll', function () {
  storyContainerViewCheck();
});

/**
 * 스토리 컨테이너가 현재영역에 포함되는지 확인
 */
function storyContainerViewCheck() {
  const storyContainer = document.querySelector('.story_container');
  const storyContainerRect = storyContainer.getBoundingClientRect();

  const isInStoryView = (
    storyContainerRect.top >= 0 &&
    storyContainerRect.bottom * (2 / 3) <= (window.innerHeight || document.documentElement.clientHeight)
  );

  // 스토리 컨테이너가 화면에 들어왔는지 여부를 확인
  if (isInStoryView) {
    const since = document.querySelector('.since');
    const year = document.querySelector('.year');

    if (since && !since.classList.contains('on')) {
      since.classList.add('on');
    }

    if (year && !year.classList.contains('on')) {
      year.classList.add('on');
    }

  } else {
    const since = document.querySelector('.since');
    const year = document.querySelector('.year');

    if (since && since.classList.contains('on')) {
      since.classList.remove('on');
    }

    if (year && year.classList.contains('on')) {
      year.classList.remove('on');
    }
  }
}

