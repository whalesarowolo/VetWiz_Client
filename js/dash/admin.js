function reset_sides() {
  setTimeout(() => {
    if (location.hash === "#vouchers" || location.hash === "#users" || location.hash === "#needs" || location.hash === "#add_subscriber") {
      if ($(".child-menu").hasClass("is-sidebar-translated")) {
        $(".dashboard-outer").removeClass("is-pushed");
        $(".dashboard-inner").removeClass("is-pushed");
        $(".dashboard-nav").removeClass("is-pushed");
        $(".child-menu").removeClass("is-sidebar-translated");
      }   
    }
  }, 2000);
}

window.addEventListener("hashchange", reset_sides, false);