"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Init pageloader
function initPageLoader() {
  $('.pageloader').toggleClass('is-active');
  $(window).on('load', function () {
    var pageloaderTimeout = setTimeout(function () {
      $('.pageloader').toggleClass('is-active');
      $('.infraloader').toggleClass('is-active');
      clearTimeout(pageloaderTimeout);
    }, 700);
  });
} //Disable sidebar links in development


// //Change demo images


function changeDemoImages() {
  $('*[data-demo-src]').each(function () {
    var newSrc = $(this).attr('data-demo-src');

    if (newSrc !== undefined) {
      $(this).attr('src', newSrc);
    }
  });
  $('*[data-demo-background]').each(function () {
    var newBg = $(this).attr('data-demo-background');

    if (newBg !== undefined) {
      $(this).attr('data-background', newBg);
    }
  });
} //Init navbar


function initNavbar() {
  $(window).on('scroll', function () {
    var height = $(window).scrollTop();

    if (height > 65) {
      $(".navbar").removeClass('is-faded');
      $('.navbar').removeClass('is-mobile');
    } else {
      $(".navbar").addClass('is-faded');

      if ($('.navbar-menu').hasClass('is-active')) {
        $('.navbar').addClass('is-mobile');
      }
    }
  });
} //Mobile menu


function initMobileMenu() {
  $('.navbar-burger').on("click", function () {
    var testHeight = $(window).scrollTop();
    $(this).toggleClass('is-active');

    if (testHeight < 65) {
      if ($('.navbar-menu').hasClass('is-active')) {
        $('.navbar-brand img').toggleClass('is-hidden');
        $('.navbar-menu').slideToggle().removeClass('is-active');
        setTimeout(function () {
          $('.navbar').removeClass('is-mobile');
        }, 400);
      } else {
        $('.navbar-menu').slideToggle().addClass('is-active');
        $('.navbar').addClass('is-mobile');
        $('.navbar-brand img').toggleClass('is-hidden');
      }
    } else {
      if ($('.navbar-menu').hasClass('is-active')) {
        $('.navbar-menu').slideToggle().removeClass('is-active');
      } else {
        $('.navbar-menu').slideToggle().addClass('is-active');
      }
    }
  });
} //Sidebar


function initSidebar() {
  //Website sidebar
  $(".navigation-menu > li.has-children a.parent-link").on("click", function (i) {
    i.preventDefault();

    if (!$(this).parent().hasClass("active")) {
      $(".navigation-menu li ul").slideUp();
      $(this).next().slideToggle();
      $(".navigation-menu li").removeClass("active");
      $(this).parent().addClass("active");
    } else {
      $(this).next().slideToggle();
      $(".navigation-menu li").removeClass("active");
    }
  }); //sidebar category toggle

  $('.category-link').on("click", function () {
    $('.category-link.is-active').removeClass('is-active');
    $(this).addClass('is-active');
  }); //Sidebar close button

  $('.hamburger-btn').on("click", function () {
    $('#navigation-trigger .menu-toggle .icon-box-toggle, .navigation-close .menu-toggle .icon-box-toggle, .navigation-trigger .menu-toggle .icon-box-toggle, .navigation-close .menu-toggle .icon-box-toggle').toggleClass('active');
  }); //Menu buttons sync

  $('#navigation-trigger, .navigation-trigger, .navigation-close').on("click", function () {
    $('.side-navigation-menu').toggleClass('is-active');
  }); //Data navigation menu setup

  $('.category-link').on("click", function () {
    var category_id = $(this).attr('data-navigation-menu');
    $('.navigation-menu-wrapper').addClass('is-hidden');
    $("#" + category_id).removeClass('is-hidden');
  }); //Manage close links visibility to display only one at a time

  $('.side-navigation-menu').on("mouseenter", function () {
    $('#navigation-trigger').css('opacity', '0');
    $('.navigation-close').css('opacity', '1');
  });
  $('.side-navigation-menu').on("mouseleave", function () {
    $('#navigation-trigger').css('opacity', '1');
    $('.navigation-close').css('opacity', '0');
  });
} //Carousel


function initCarousel() {
  var _$$slick;

  $('.carousel').slick((_$$slick = {
    centerMode: true,
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true
  }, _defineProperty(_$$slick, "dots", true), _defineProperty(_$$slick, "autoplaySpeed", 5000), _defineProperty(_$$slick, "centerPadding", '60px'), _defineProperty(_$$slick, "prevArrow", "<div class='slick-contacts-btn is-prev'><i class='fa fa-chevron-left'></i></div>"), _defineProperty(_$$slick, "nextArrow", "<div class='slick-contacts-btn is-next'><i class='fa fa-chevron-right'></i></div>"), _defineProperty(_$$slick, "slidesToShow", 1), _defineProperty(_$$slick, "responsive", [{
    breakpoint: 768,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '10px',
      slidesToShow: 1
    }
  }, {
    breakpoint: 480,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '10px',
      slidesToShow: 1
    }
  }]), _$$slick));
} //Counters


function initCounters() {
  if ($('.counter').length) {
    $('.counter').counterUp({
      delay: 10,
      time: 2000
    });
  }
} //Scroll Reveal


function initScrollReveal() {
  window.sr = ScrollReveal(); // Simple reveal

  sr.reveal('.is-single-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 300,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.2
  }); // Revealing multiple icons

  sr.reveal('.is-box-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: true,
    useDelay: 'always',
    viewFactor: 0.2
  }, 100); // Revealing multiple icons

  sr.reveal('.is-icon-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: true,
    useDelay: 'always',
    viewFactor: 0.2
  }, 100);
} //Back to top button


function initBackToTop() {
  var pxShow = 600;
  var scrollSpeed = 500;
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= pxShow) {
      $("#backtotop").addClass('visible');
    } else {
      $("#backtotop").removeClass('visible');
    }
  });
  $('#backtotop a').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, scrollSpeed);
    return false;
  });
} //Anchor scroll


function initAnchorScroll() {
  function scroll_if_anchor(href) {
    href = typeof href == "string" ? href : $(this).attr("href"); // You could easily calculate this dynamically if you prefer

    var fromTop = 50; // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
    // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174

    if (href.indexOf("#") == 0) {
      var $target = $(href); // Older browser without pushState might flicker here, as they momentarily
      // jump to the wrong position (IE < 10)

      if ($target.length) {
        $('html, body').animate({
          scrollTop: $target.offset().top - fromTop
        });

        if (history && "pushState" in history) {
          history.pushState({}, document.title, window.location.pathname + href);
          return false;
        }
      }
    }
  } // When our page loads, check to see if it contains and anchor


  scroll_if_anchor(window.location.hash); // Intercept all anchor clicks

  $("body").on("click", "a", scroll_if_anchor);
}