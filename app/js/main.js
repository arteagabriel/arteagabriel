$(document).ready(function() {
    // var sites = ['urbane', 'gomez', 'joie', 'slotog'];
    // var count = sites.length;

    // if ($(window).width() > 767) {
    //     $('.work-container').each(function() {
    //         $(this).hover(function() {
    //             for (var ndx = 0; ndx < sites.length; ndx++) {
    //                 if ($(this).hasClass(sites[ndx])) {
    //                     expandPreview(sites[ndx]);
    //                 }
    //             }
    //         });
    //     });
    // }

    // function expandPreview(site) {
    //     $('.work-expand.' + site).toggle();
    // }

    $(document).on('click', 'nav a', function(event){
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
    });
});
