(function ($) {

  "use strict";

  /* Button hover effect */
  document.querySelectorAll('.button').forEach(button => {
    button.onmousemove = function (e) {
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      e.target.style.setProperty('--x', x + 'px');
      e.target.style.setProperty('--y', y + 'px');
    };
  });

  /* Banner Video */
  var video = document.getElementById("myVideo");
  video.onended = function () {
    video.play();
  };

  $(document).ready(function () {

    /* pop up Video */
    var $videoSrc;
    $('.play-btn').click(function () {
      $videoSrc = $(this).data("src");
    });

    $('#myModal').on('shown.bs.modal', function (e) {

      $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })

    $('#myModal').on('hide.bs.modal', function (e) {
      $("#video").attr('src', $videoSrc);
    })

    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      autoplay: true,
      loop: true,
      spaceBetween: 8,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    var large_slider = new Swiper(".product-large-slider", {
      autoplay: true,
      loop: true,
      spaceBetween: 10,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });

    window.addEventListener("load", (event) => {
      //isotope
      $('.isotope-container').isotope({
        // options
        itemSelector: '.item',
        layoutMode: 'masonry',
      });



      // Initialize Isotope
      var $container = $('.isotope-container').isotope({
        // options
        itemSelector: '.item',
        layoutMode: 'masonry',
      });

      $(document).ready(function () {
        //active button
        $('.filter-button').click(function () {
          $('.filter-button').removeClass('active');
          $(this).addClass('active');
        });
      });

      // Filter items on button click
      $('.filter-button').click(function () {
        var filterValue = $(this).attr('data-filter');
        if (filterValue === '*') {
          // Show all items
          $container.isotope({ filter: '*' });
        } else {
          // Show filtered items
          $container.isotope({ filter: filterValue });
        }
      });

    });

  }); // End of a document

})(jQuery);


document.querySelectorAll('#bdNavbar .nav-link').forEach(link => {
  link.addEventListener('click', () => {

    const target = link.getAttribute('href');

    // Fecha o menu
    const offcanvasElement = document.getElementById('bdNavbar');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);

    if (offcanvas) {
      offcanvas.hide();
    }

    // Faz o scroll após fechar
    if (target.startsWith('#')) {
      setTimeout(() => {
        const section = document.querySelector(target);

        if (section) {
          section.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 300);
    }

  });
});