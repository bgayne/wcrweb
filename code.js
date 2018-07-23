$(document).ready(function() {
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
            scrollTop: $($(this).attr('href')).offset().top - 35
        }, 500, 'linear');
    });

    $(".hamburger-menu").on("click", function(e) {
        $("#ham-top").toggleClass("ham-top-rotate");
        $("#ham-bottom").toggleClass("ham-bottom-rotate");
        //$("#ham-mid").toggleClass("hidden");
        console.log("Test");
        /*
        $(".mobile-nav").toggleClass("mobile-nav-expanded");
        $("#mobile-nav-menu").toggleClass("hidden");
        */
        $(".mobile-nav-horiz").toggleClass("mobile-nav-horiz-expanded");
        $(".hamburger-menu").toggleClass("is-active");
    });

    $(".mobile-nav-dropdown").on("click", function(e) {
        $("#mobile-nav-page-menu").toggleClass("hidden");
        console.log("Hello");
    })

    $("#more-info-button").on("click", function(e) {
        e.preventDefault();
        console.log("Do I get here?");
        $.post("http://127.0.0.1:5000/");
    })

    $("#submission-button").click(function(e) {
        e.preventDefault();
        $.ajax({
            url:"http://127.0.0.1:5000/",
            type: "POST",
            data: JSON.stringify(
                {
                    name:$("#name").val(),
                    email:$("#email").val(),
                    query:$("#query").val()
                }),
            dataType:"json",
            contentType:"application/json; charset=utf-8",
            success:function() {
                console.log("It works!");
            }
        })
    })

});