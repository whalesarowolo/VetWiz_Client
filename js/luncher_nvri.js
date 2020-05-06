'use strict';

(function () {
    function init() {
        var router = new Router([            
            new Route('admin_nvri', 'admin_nvri.html'),
            new Route('nvri_users', 'nvri_users.html'),
        ]);
    }
    init();
}());