document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("footer");
  const footerServiceDesktop = document.getElementById(
    "footer-service-desktop"
  );
  const footerServiceMobile = document.getElementById("footer-service-mobile");

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
});
