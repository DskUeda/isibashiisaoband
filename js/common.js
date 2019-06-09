$(function () {
    
    var moveTgt = $('.moveTgt');
    var fadeInTxt = $('.fadeInTxt');
    var overLay = $('.overLay');
    var moveImg = $('.moveImg');
    var onTime = 1000;
    var leaveTime = 1000;
    
    moveTgt.on('click', function() {
        var tgtImg = $(this).attr('href');
        if(!moveTgt.hasClass('active')) {
            $(this).addClass('active');
            $(tgtImg).animate({
                'left': '50px'
            },onTime)
            .css({'z-index': '5000'})
            .find(fadeInTxt).fadeIn(onTime);
            overLay.fadeIn(onTime);
        }else {
            moveTgt.removeClass('active');
            $(tgtImg).animate({'left': '0'},1000)
            .css({
                'z-index': '0'
            })
            .find(fadeInTxt).fadeOut(0);
            overLay.fadeOut(1000);
        }
        return false;
    });
    moveImg.on('click', function() {
        var tgtImg = $('.active').attr('href');
        var tgtTxt = $(tgtImg).find(fadeInTxt);
        tgtTxt.fadeOut(0);
        overLay.fadeOut(1000);
        $(tgtImg).animate({'left': '0'},1000).css({'z-index': '0'});
        moveTgt.removeClass('active');
    });

    var navBtn = $(".navBtn");
    var onTime = 500;
    var leaveTime = 0;
    var onColor = "#252702";

    navBtn.hover(function () {
        $(this).animate({
            backgroundColor: onColor
        }, onTime);
    }, function () {
        $(this).animate({
            backgroundColor: "transparent"
        }, leaveTime);
    });

    var topBtn = $('#pageTop');
    topBtn.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 800) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    function fixNav() {
        var fixNav = $(".navFix");
        var headHeight = $(".headHeight").height();
        $(window).scroll(function () {
            if ($(this).scrollTop() > (headHeight)) {
                fixNav.css('position', 'fixed');
                fixNav.css('display', 'table');
            } else {
                fixNav.css('display', 'none');
            }
        });
    }

    var timer = null;
    $(window).on('scroll', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fixNav();
        }, 500);
    });

    $('a[href^="#"]').on('click', function () {
        var tgtLink = $(this).attr('href');
        var scrollY = $(tgtLink).offset().top;
        var navFixHeight = $(".navFix").height();
        $('html,body').animate({
            scrollTop: scrollY - navFixHeight + 10
        }, 500, 'swing');
        fixNav();
        return false;
    });

    var menu = $('#gnav');
    var body = $(document.body);
    var menuWidth = menu.outerWidth();
    $('#gnav-menu, .close').on('click', function () {
        body.toggleClass('open');
        if (body.hasClass('open')) {
            menu.slideDown(500);
        } else {
            menu.slideUp(500);
        }
    });

    $( "#tabs" ).tabs({
        heightStyle: "auto"
    });
});
