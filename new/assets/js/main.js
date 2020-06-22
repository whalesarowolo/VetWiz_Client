/*! main.js | Bulkit | CSS Ninja */

/* ==========================================================================
Main js file
========================================================================== */
"use strict";

initPageLoader();
$(document).ready(function ($) {
  //
  changeDemoImages();
  feather.replace();
  initNavbar();
  initMobileMenu();
  initSidebar();
  initCarousel();
  initCounters();
  initScrollReveal();
  initAnchorScroll();
  initBackToTop();
});