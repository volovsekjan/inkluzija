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
      $('#pdfFrame').attr('src', ''); // Optionally clear the iframe src
      $('#imageFrame').attr('src', ''); // Optionally clear the image src
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

  // Carousel
  $('#carouselExperience').on('slide.bs.carousel', function (e) {
    var activeIndex = $(e.relatedTarget).index(); // Pridobi indeks naslednjega elementa
    var $indicators = $('.carousel-indicators-custom .indicator');

    $indicators.removeClass('active'); // Odstrani aktivni razred od vseh
    $indicators.eq(activeIndex).addClass('active'); // Aktiviraj naslednji indikator

    // Pospeši animacijo indikatorja (doda transition, če je potrebno)
    $indicators.css({
      transition: 'background-color 0.2s ease'
    });
  });

  $('.carousel-control-prev, .carousel-control-next').click(function() {
    $(this).blur();
  });

  // Download button logic with loading effect
  $('.btn.button-style').on('click', function() {
    var $this = $(this); // Store the button clicked
    var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Loading...'; // Loading text with spinner icon
    $this.data('original-text', $this.html()); // Save the original button text
    $this.html(loadingText); // Change the button text to loading

    // Simulate file download action
    setTimeout(function() {
      $this.html($this.data('original-text')); // Restore the original button text
    }, 2500); // Simulate a 2.5 second loading time
  });

  window.downloadFile = function(filePath) {
    var downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.download = filePath.split('/').pop();
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Swipe functionality for Carousel
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

  $(document).ready(function() {
    // Check if the device width is less than 768 pixels
    if(window.innerWidth < 768) {
      // Show the loading screen on mobile devices
      $('#loadingScreen').show();

      // Hide the loading screen after 2 seconds
      setTimeout(function() {
        $('#loadingScreen').fadeOut('slow');
      }, 2500); // 2500 milliseconds = 2.5 seconds
    }
  });
})(jQuery); 