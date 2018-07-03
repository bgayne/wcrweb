($(document).ready(function() {
    $(".price-item-link").on("click", function(e) {
        e.preventDefault();
        console.log("Hello?");
        $(this).find("#dropdown-arrow").toggleClass("point-downwards");
        $(this).children("#diagnostic-more-info").toggleClass("pricing-item-hidden");
        console.log($("#diagnostic-more-info"));
        console.log(this);
    })

    //Shamlessly taken from https://www.taniarascia.com/smooth-scroll-to-id-with-jquery/
    //Thanks
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });

    $(".hamburger-menu").on("click", function(e) {
        $("#ham-top").toggleClass("ham-top-rotate");
        $("#ham-bottom").toggleClass("ham-bottom-rotate");
        $("#ham-mid").toggleClass("hidden");
        console.log("Test");
        $(".mobile-nav").toggleClass("mobile-nav-expanded");
        $("#mobile-nav-menu").toggleClass("hidden");
    })

});