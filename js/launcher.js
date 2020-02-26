'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('users', 'users.html'),
            new Route('farmers', 'farmers.html'),
            new Route('sms', 'sms.html'),
            new Route('admin', 'admin.html'),
            new Route('gap', 'gap.html'),
            new Route('agro_dealers', 'agro_dealers.html'),
            new Route('seed', 'seed.html'),
            new Route('extension', 'extension.html'),
            new Route('agronomist', 'agronomist.html'),
            new Route('needs', 'needs.html'),
            new Route('aggregators', 'aggregators.html'),
            new Route('paraVet', 'paraVet.html'),
            new Route('offtakers', 'offtakers.html'),
            new Route('input', 'inputcompanies.html'),
        ]);
    }
    init();
}());