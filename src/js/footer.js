document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("footer");
  const footerServiceDesktop = document.getElementById(
    "footer-service-desktop"
  );
  const footerServiceMobile = document.getElementById("footer-service-mobile");
  let timeoutId = null;
  let isVisible = false;

  const observer = new IntersectionObserver(
    (entries) => {
      console.log(entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footerServiceDesktop?.classList.add("fade-out");
          footerServiceMobile?.classList.add("fade-out");
        } else {
          footerServiceDesktop?.classList.remove("fade-out");
          footerServiceMobile?.classList.remove("fade-out");
        }
      });
    },
    {
      threshold: 0.1, // フッターの10%が見えたら発火
    }
  );

  if (footer) {
    console.log(observer);
    observer.observe(footer);
  }

  // フッターを非表示にする初期設定
  if (footerServiceDesktop) {
    footerServiceDesktop.style.opacity = '0';
    footerServiceDesktop.style.visibility = 'hidden';
  }
  if (footerServiceMobile) {
    footerServiceMobile.style.opacity = '0';
    footerServiceMobile.style.visibility = 'hidden';
  }

  // スクロールイベントのハンドラー
  function handleScroll() {
    // スクロールがあったらフッターを表示
    showFooter();

    // 既存のタイマーをクリア
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 5秒後に非表示にするタイマーを設定
    timeoutId = setTimeout(() => {
      hideFooter();
    }, 5000);
  }

  // フッターを表示する関数
  function showFooter() {
    if (!isVisible) {
      if (footerServiceDesktop) {
        footerServiceDesktop.style.opacity = '1';
        footerServiceDesktop.style.visibility = 'visible';
      }
      if (footerServiceMobile) {
        footerServiceMobile.style.opacity = '1';
        footerServiceMobile.style.visibility = 'visible';
      }
      isVisible = true;
    }
  }

  // フッターを非表示にする関数
  function hideFooter() {
    if (isVisible) {
      if (footerServiceDesktop) {
        footerServiceDesktop.style.opacity = '0';
        footerServiceDesktop.style.visibility = 'hidden';
      }
      if (footerServiceMobile) {
        footerServiceMobile.style.opacity = '0';
        footerServiceMobile.style.visibility = 'hidden';
      }
      isVisible = false;
    }
  }

  // スクロールイベントリスナーを追加
  window.addEventListener('scroll', handleScroll);
});
