"use strict";

/* =========================
   BUTTON HOVER EFFECT
========================= */
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.target.style.setProperty('--x', x + 'px');
    e.target.style.setProperty('--y', y + 'px');
  });
});


/* =========================
   VIDEO LOOP
========================= */
const video = document.getElementById("myVideo");

if (video) {
  video.addEventListener("ended", () => {
    video.play();
  });
}


/* =========================
   MODAL VIDEO (Bootstrap 5)
========================= */
let videoSrc = "";

document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    videoSrc = btn.getAttribute("data-src");
  });
});

const modal = document.getElementById('myModal');

if (modal) {
  modal.addEventListener('shown.bs.modal', () => {
    const iframe = document.getElementById("video");
    if (iframe && videoSrc) {
      iframe.src = videoSrc + "?autoplay=1&modestbranding=1&showinfo=0";
    }
  });

  modal.addEventListener('hide.bs.modal', () => {
    const iframe = document.getElementById("video");
    if (iframe) {
      iframe.src = videoSrc;
    }
  });
}


/* =========================
   SWIPER (já é vanilla)
========================= */
window.addEventListener("DOMContentLoaded", () => {

  const thumbSlider = document.querySelector(".product-thumbnail-slider");
  const largeSlider = document.querySelector(".product-large-slider");

  if (thumbSlider && largeSlider && typeof Swiper !== "undefined") {

    const thumb = new Swiper(".product-thumbnail-slider", {
      autoplay: true,
      loop: true,
      spaceBetween: 8,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper(".product-large-slider", {
      autoplay: true,
      loop: true,
      spaceBetween: 10,
      effect: 'fade',
      thumbs: {
        swiper: thumb,
      },
    });

  }
});


/* =========================
   ISOTOPE (SEM JQUERY)
========================= */
window.addEventListener("load", () => {

  if (typeof Isotope === "undefined") return;

  const grid = document.querySelector('.isotope-container');

  if (!grid) return;

  const iso = new Isotope(grid, {
    itemSelector: '.item',
    layoutMode: 'masonry'
  });

  // filtros
  document.querySelectorAll('.filter-button').forEach(btn => {

    btn.addEventListener('click', () => {

      document.querySelectorAll('.filter-button')
        .forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      iso.arrange({
        filter: filterValue === '*' ? '*' : filterValue
      });

    });

  });

});


/* =========================
   OFFCANVAS MENU SMOOTH SCROLL
========================= */
document.querySelectorAll('#bdNavbar .nav-link').forEach(link => {

  link.addEventListener('click', function (e) {

    const target = this.getAttribute('href');

    if (target.startsWith('#')) {
      e.preventDefault();

      const offcanvasElement = document.getElementById('bdNavbar');
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);

      if (offcanvas) offcanvas.hide();

      setTimeout(() => {
        const section = document.querySelector(target);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 350);
    }

  });

});


/* =========================
   HEADER SCROLL HIDE
========================= */
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {

  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll <= 50) {
    header.classList.remove('hide-header');
    lastScrollTop = currentScroll;
    return;
  }

  if (currentScroll > lastScrollTop) {
    header.classList.add('hide-header');
  } else {
    header.classList.remove('hide-header');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});