const loginModal = document.querySelector(".login__modal");
const loginModalBackdrop = document.querySelector(".login__modal__backdrop");
const stylesheet = document.querySelector(".style");
const stylesheetRules = [...stylesheet.sheet.rules];

document.addEventListener("keypress", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "\f") {
    stylesheetRules.forEach((e) => {
      if (e.selectorText === ".login__modal") {
        e.style.visibility = "visible";
        body.style.overflow = "hidden";
      }
    });
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    stylesheetRules.forEach((e) => {
      if (e.selectorText === ".login__modal") {
        e.style.visibility = "hidden";
        body.style.overflow = "visible";
      }
    });
  }
});

loginModalBackdrop.addEventListener("click", (e) => {
  stylesheetRules.forEach((e) => {
    if (e.selectorText === ".login__modal") {
      e.style.visibility = "hidden";
      body.style.overflow = "visible";
    }
  });
});

/////////////////////////////////////////////////////////////////////////////
// Navbar
const mediaQuery = window.matchMedia("(max-width:48em)");
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu__btn");
const menuOverlay = document.querySelector(".menu__overlay");
const navbar = document.querySelector(".navbar");
const body = document.body;

menu.addEventListener("click", () => {
  menuBtn.classList.toggle("active");

  if (menuBtn.classList[1] === "active" && mediaQuery.matches) {
    body.style.overflow = "hidden";
    menuOverlay.style.width = "100%";
    navbar.style.visibility = "visible";
    navbar.style.opacity = "1";
  }
  if (menuBtn.classList[1] !== "active" && mediaQuery.matches) {
    body.style.overflow = "visible";
    menuOverlay.style.width = "0%";
    navbar.style.visibility = "hidden";
    navbar.style.opacity = "0";
  }
});
/////////////////////////////////////////////////////////////////////////////
// Intersection observer
const section = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
        document.querySelector(".nav-active").classList.remove("nav-active");
        const id = entry.target.getAttribute("id");
        const newLink = document
          .querySelector(`[href="#${id}"]`)
          .classList.add("nav-active");
      }
    });
  },
  { threshold: 0.55 }
);

section.forEach((section) => {
  observer.observe(section);
});
/////////////////////////////////////////////////////////////////////////////
// Swiper
const swiper = new Swiper(".nowadays__swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    600: {
      slidesPerView: 3,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
const Projectswiper = new Swiper(".project__swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    600: {
      slidesPerView: 3,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
/////////////////////////////////////////////////////////////////////////////
// copyright
const date = document.querySelector(".date");
const year = new Date();
date.textContent = year.getFullYear();
/////////////////////////////////////////////////////////////////////////////
