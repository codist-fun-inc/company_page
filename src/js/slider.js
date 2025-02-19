// デバイスタイプの判定
const isMobile = window.innerWidth < 768;

let currentSlide = 0;
const slides = isMobile
  ? document.querySelectorAll(".work-slide.mobile")
  : document.querySelectorAll(".work-slide.desktop");
const indicators = document.querySelectorAll(".flex.justify-center button");

function updateSlides() {
  if (isMobile) {
    // モバイル用のスライド処理
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "next", "prev");
      if (index === currentSlide) {
        slide.classList.add("active");
      } else if (index > currentSlide) {
        slide.classList.add("next");
      } else {
        slide.classList.add("prev");
      }
    });
  } else {
    // デスクトップ用のスライド処理
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "next", "prev");
      if (index === currentSlide) {
        slide.classList.add("active");
        slide.style.transform = "translateX(0)";
      } else if (index > currentSlide) {
        slide.classList.add("next");
        slide.style.transform = "translateX(100%)";
      } else {
        slide.classList.add("prev");
        slide.style.transform = "translateX(-100%)";
      }
    });
  }

  // インジケーターの更新
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("bg-white", index === currentSlide);
    indicator.classList.toggle("bg-white/30", index !== currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlides();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlides();
}

// ウィンドウリサイズ時の処理
window.addEventListener("resize", () => {
  const newIsMobile = window.innerWidth < 768;
  if (newIsMobile !== isMobile) {
    location.reload(); // デバイスタイプが変更された場合はページをリロード
  }
});

// 初期表示
updateSlides();
