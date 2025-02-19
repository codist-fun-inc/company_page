tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        noto: ['"Noto Sans JP"', "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      colors: {
        primary: "#F14E34",
        secondary: "#6D5291",
        tertiary: "#3D8582",
        teal: "#3D8582",
        purple: "#6D5291",
        coral: "#F14E34",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-delay-1": "fadeIn 0.8s ease-out 0.2s forwards",
        "fade-in-delay-2": "fadeIn 0.8s ease-out 0.4s forwards",
        "fade-in-delay-3": "fadeIn 0.8s ease-out 0.6s forwards",
        "spin-slow": "spin 8s linear infinite",
        float: "float 3s ease-in-out infinite",
        "float-delay-1": "float 3s ease-in-out 1s infinite",
        "float-delay-2": "float 3s ease-in-out 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  document.querySelectorAll(".scroll-fade").forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
});
