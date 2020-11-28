'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('users', 'users.html'),
            new Route('farmers', 'farmers.html'),
            new Route('gombeFarmer', 'gombeFarmer.html'),
            new Route('sms', 'sms.html'),
            new Route('admin', 'admin.html'),
            new Route('agro_dealers', 'agro_dealers.html'),
            new Route('seed', 'seed.html'),
            new Route('extension', 'extension.html'),
            new Route('agronomist', 'agronomist.html'),
            new Route('needs', 'needs.html'),
            new Route('aggregators', 'aggregators.html'),
            new Route('paraVet', 'paraVet.html'),
            new Route('offtakers', 'offtakers.html'),
            new Route('input', 'inputcompanies.html'),
            new Route('internalsms', 'internalsms.html'),
            new Route('weather', 'weather.html'),
            new Route('tomatoes', 'tomatoes.html'),
            new Route('rice', 'rice.html'),
            new Route('groundnut', 'groundnut.html'),
            new Route('sorghum', 'sorghum.html'),
            //new Route('pricing', 'pricing.html'),
            new Route('msg_queue', 'msg_queue.html'),
            new Route('admin_nvri', 'admin_nvri.html'),
            new Route('ussdFarmer', 'ussdFarmer.html'),
            new Route('ussd_onboarded_farmers', 'ussd_onboarded_farmers.html'),
            new Route('topup', 'topup.html'),
            new Route('sms_history', 'sms_history.html'),
            new Route('vouchers', 'vouchers.html'),
            new Route('add_subscriber', 'add_subscriber.html'),
        ]);
    }
    init();
}());