'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('users', 'users.html'),
            new Route('farmers', 'farmers.html'),
            new Route('sms', 'sms.html'),
            new Route('admin', 'admin.html'),
            new Route('gap', 'gap.html'),
        ]);
    }
    init();
}());