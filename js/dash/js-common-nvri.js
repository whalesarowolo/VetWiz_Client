/*! common.js | FarmAid */

/* ==========================================================================
js pageloader file 
========================================================================== */

$(document).ready(function ($) {
  "use strict";

  //Page loader
  if ($(".pageloader").length) {
    $(".pageloader").toggleClass("is-active");
    const logged_id = localStorage.getItem("access_token");
    if (logged_id == undefined || logged_id == null) {
      if (window.location.href !== window.origin + "/admin-login.html") {
        window.location.replace("/admin-login.html");
      }
    }

    $(window).on("load", function () {
      var pageloaderTimeout = setTimeout(function () {
        $(".pageloader").toggleClass("is-active");
        $(".infraloader").toggleClass("is-active");
        clearTimeout(pageloaderTimeout);
      }, 700);
    });
  }
});
