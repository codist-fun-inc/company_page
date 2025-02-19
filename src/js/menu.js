const menuButton = document.getElementById("menu-button");
const closeButton = document.getElementById("close-button");
const mobileMenu = document.querySelector(".mobile-menu");
const header = document.getElementById("header");
const body = document.body;

function openMenu() {
  mobileMenu.classList.add("active");
  body.classList.add("overflow-hidden");
  header.style.transform = "translateY(-100%)";
}

function closeMenu() {
  mobileMenu.classList.remove("active");
  body.classList.remove("overflow-hidden");
  header.style.transform = "translateY(0)";
}

menuButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);

// メニューリンクをクリックしたらメニューを閉じる
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});
