'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('users', 'users.html'),
            new Route('farmers', 'farmers.html'),
        ]);
    }
    init();
}());