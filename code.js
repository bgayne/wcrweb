function isMobile() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    if(h > w) return true;
    else return false;
}

$(document).ready(function() {
   
    if(isMobile()) {

        setTimeout(() => {
            var captchaContainerWidth = document.getElementById("captcha").offsetWidth;
            var captchaWidth = document.getElementById("captcha").firstChild.offsetWidth;
            var ratio = captchaContainerWidth / captchaWidth;
            console.log(captchaWidth, captchaContainerWidth);
            console.log(ratio);
            document.getElementById("captcha").firstChild.style.transform = "scale(" + ratio + ")";
        }, 1000); //Should work 90% of the time... right?
    }

    $(".price-item-link").on("click", function(e) {
        e.preventDefault();
        $(this).find("#dropdown-arrow").toggleClass("point-downwards");
        $(this).children("#diagnostic-more-info").toggleClass("pricing-item-hidden");
    })

    //Shamlessly taken from https://www.taniarascia.com/smooth-scroll-to-id-with-jquery/
    //Thanks
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 35
        }, 500, 'linear');
        if($(".mobile-nav-horiz").hasClass("mobile-nav-horiz-expanded")) {
            $(".mobile-nav-horiz").toggleClass("mobile-nav-horiz-expanded");
            $(".hamburger-menu").toggleClass("is-active");
        }
    });

    $(".hamburger-menu").on("click", function(e) {
       if($(".contact-modal-desktop").hasClass("visible")) {
           $(".contact-modal-desktop").toggleClass("visible");
           $(".hamburger-menu").toggleClass("is-active");
       }
       else {
            $(".mobile-nav-horiz").toggleClass("mobile-nav-horiz-expanded");
            $(".hamburger-menu").toggleClass("is-active");
       }
    });

    $(".mobile-nav-dropdown").on("click", function(e) {
        $("#mobile-nav-page-menu").toggleClass("hidden");
        console.log("Hello");
    })

    $("#more-info-button").on("click", function(e) {
        e.preventDefault();
        $(".contact-modal-desktop").toggleClass("visible");
        $(".hamburger-menu").toggleClass("is-active");
    })

    $(".contact-modal-desktop-exit").click(function(e) {
        $(".contact-modal-desktop").toggleClass("visible");
    })

    $("#contact-form").submit(function(e) {
       
        e.preventDefault();
       
        $this = $(this);

        var outbound = {};
        var toJson = $this.serializeArray();
        for(var i = 0; i < toJson.length; i++) {
            outbound[toJson[i]['name']] = toJson[i]['value']
        }

        $.ajax({
            url:"/contact",
            type: "POST",
            data: JSON.stringify(outbound),
            dataType:"json",
            contentType:"application/json; charset=utf-8"
        }).done(function(response) {
            if(response["valid"] === "true") {
                $(".contact-modal-desktop").toggleClass("visible");
            }
        })
    })
    

    

});