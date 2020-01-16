$(document).ready(function () {

    //Fresh start
    $("#getIn").click(function(e) {
        console.log("Signing in...");
        $('.modal').css({'display': 'block'});
    });

    $("#sign_in").on('submit', function(e) {
        var useremail = $('#email').val();
        var  userpassword = $('#password').val();
        e.preventDefault();
        console.log('Details... ' + useremail + ' ' + userpassword);
    
        const url = 'http://localhost:5000/api/auth';
    
        const user = {
            "firstname": "Mat",
            "lastname" : "Jules",
            "phoneNumber": "98999888889",
            "email"		: useremail,
            "password": userpassword
        };
    
        // create request object
        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    
        // pass request object to `fetch()`
        fetch(request)
            .then(async (res) => {
                $('.modal').css({'display': 'none'});
              var resp = await res.json();
              if(resp.token) {
                console.log(resp.token);
                localStorage.setItem('access_token', resp.token);
                history.pushState({"logged_in": true, "ifAdmin": false}, "Dashboard", "/dashboard");
                document.location.href('/dashboard');
              } else {
                $('.modal').css({'display': 'none'});
                  Swal.fire({
                    title: 'Invalid Credentials',
                    text: 'The username/password is invalid'
                  });
              }
            });
        
      });
});