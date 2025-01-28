(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing for internal page links
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  // Event listener for opening a PDF in a modal using class
  $('.openPdfBtn').on('click', function() {
    var pdfPath = $(this).data('pdf-path');
    $('#pdfFrame').attr('src', pdfPath);
    $('#pdfModal').show();
  });

  // Close the PDF modal when the close button is clicked
  $('.close').on('click', function() {
    $('#pdfModal').hide();
    $('#pdfFrame').attr('src', ''); // Optionally clear the iframe src
  });

  // Close the modals if the user clicks anywhere outside of the modal
  $(window).on('click', function(event) {
    if ($(event.target).is('.modal')) {
      $('.modal').hide();
      $('#pdfFrame').attr('src', '');
      $('#imageFrame').attr('src', '');
    }
  });

  // Event listener for opening an image in a modal using class
  $('.openImageBtn').on('click', function() {
    var imgPath = $(this).data('img-path');
    $('#imageFrame').attr('src', imgPath);
    $('#imageModal').show();
  });

  // Close the image modal when the close button is clicked
  $('.image-close').on('click', function() {
    $('#imageModal').hide();
  });

  // Hide carousel indicators on mobile devices (width < 768px)
  function toggleCarouselIndicators() {
    if ($(window).width() < 768) {
      $(".carousel-indicators").hide(); // Skrije indikatorje na mobilnih napravah
    } else {
      $(".carousel-indicators").show(); // Prikaže indikatorje na večjih zaslonih
    }
  }

  // Kliče funkcijo ob inicializaciji in pri spremembi velikosti zaslona
  $(document).ready(function() {
    toggleCarouselIndicators();
    $(window).resize(toggleCarouselIndicators);
  });

  // Clickable indicators to navigate to specific slide
  $(".carousel-indicators li").click(function() {
    var slideTo = $(this).data("slide-to");
    $("#carouselExperience").carousel(slideTo);
  });

  // Update active indicator styling on slide change
  $('#carouselExperience').on('slide.bs.carousel', function (e) {
    var activeIndex = $(e.relatedTarget).index();
    $('.carousel-indicators li').removeClass('active');
    $('.carousel-indicators li').eq(activeIndex).addClass('active');
  });

  // Swipe functionality for Carousel using Hammer.js
  $(".carousel").each(function() {
    var $carousel = $(this);
    var hammer = new Hammer(this);
    hammer.on('swipeleft', function() {
      $carousel.carousel('next');
    });
    hammer.on('swiperight', function() {
      $carousel.carousel('prev');
    });
  });

  // Loading screen logic (only for mobile devices)
  $(document).ready(function() {
    if (window.innerWidth < 768) {
      $('#loadingScreen').show();
      setTimeout(function() {
        $('#loadingScreen').fadeOut('slow');
      }, 2500);
    }
  });

})(jQuery);
