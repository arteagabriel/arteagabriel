$(document).ready(function() {
  $('.navigation-item').on('click', function() {
    $('.navigation-item.active-item').removeClass('active-item');
    $(this).addClass('active-item');
  });

  $('a[href*="#"]')
  // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        // if (target.length && this.hash !== '#carouselIndicators') {
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          const page = $('html, body');

          page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            page.stop();
          });

          page.animate({
            scrollTop: target.offset().top,
          }, 400, function() {
            page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");

            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          });
        }
      }
    });
});
