document.addEventListener("DOMContentLoaded", () => {
  // スムーズスクロール処理
  const normalizePath = (path) => {
    return path.replace(/^\.\//, "").split("/").pop() || "";
  };

  // デバイスタイプを判定する関数
  const isMobile = () => {
    return window.innerWidth <= 768; // モバイルの判定基準を768px以下に設定
  };

  // スムーズスクロール処理
  const handleSmoothScroll = (e) => {
    const target = e.target.closest('a[href*="#"]');
    if (!target) return;

    const href = target.getAttribute("href");
    if (!href) return;

    const currentPath = normalizePath(window.location.pathname);
    const targetPath = normalizePath(href.split("#")[0] || "");
    const targetHash = "#" + href.split("#")[1];

    if (
      !targetPath ||
      targetPath === currentPath ||
      targetPath === "index.html"
    ) {
      // モバイルとデスクトップで適切なセクションを取得
      const mobile = isMobile();
      const targetSelector = `${targetHash}${mobile ? ".mobile" : ".desktop"}`;
      const targetElement =
        document.querySelector(targetSelector) ||
        document.querySelector(targetHash);

      if (!targetElement) return;

      e.preventDefault();

      // ヘッダーの高さを取得
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : mobile ? 60 : 80; // モバイルとデスクトップでデフォルト値を変更

      // 現在のビューポートでの要素の位置を取得
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      // スムーズスクロールを実行
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // イベント委譲を使用してすべてのスクロールリンクを処理
  document.addEventListener("click", handleSmoothScroll);

  // モバイルメニューのトグル処理
  const toggleMobileMenu = () => {
    const mobileMenu = document.querySelector(".mobile-menu");
    if (mobileMenu) {
      mobileMenu.classList.toggle("open");
    }
  };

  // モバイルメニューボタンのイベントリスナー
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu);
  }

  // モバイルメニューリンクをクリックした時の処理
  const mobileMenuLinks = document.querySelectorAll(
    '.mobile-menu a[href*="#"]'
  );
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      handleSmoothScroll(e);
      toggleMobileMenu();
    });
  });

  // ウィンドウリサイズ時の処理
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // リサイズ後にスクロール位置を調整する必要がある場合の処理をここに追加
    }, 100);
  });
});
