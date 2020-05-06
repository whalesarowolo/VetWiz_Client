function check_auth() {
    if (localStorage.getItem('access_token') != null || localStorage.getItem('access_token') != undefined) {
        var userObj = parseJwt(localStorage.getItem('access_token'));
        swal.fire({
            title: 'Please wait',
            text: 'Waiting for authorisation...',
            timer: 3000,
            icon: 'info'
        }).then(() => {
            if (userObj.user.role == "admin") {
                $("#support-dashboard").fadeIn('fast');
            } else {
                swal.fire({
                    title: 'You are not authorized',
                    text: 'You have to login to continue',
                    timer: '3000',
                    icon: 'info'
                }).then(() => {
                    window.location.replace('/nvri-login.html');
                })
            }
        })
    } 
}

check_auth();

function logout() {
    localStorage.clear();
    window.location.replace('/nvri-login.html');
}