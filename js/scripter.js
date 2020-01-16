$(document).ready(function () {

  $(".delete").click(function(){
    $('.modal').css({'display': 'none'});
  });

  $("#getOut").on('click', function() {
    localStorage.clear();
    swal.fire({
        title: 'Loging Out',
        text: 'Please wait....',
        type: 'info',
        icon: 'info',
        timer: 1500
    }).then(() => {
        window.location.replace("/index.html");
    });
  });
  //Fresh start
  $("#getIn").click(function (e) {
    console.log("Signing in...");
    $('.modal').css({ 'display': 'block' });
  });

  $("#sign_in").on('submit', function (e) {
    var useremail = $('#email').val();
    var userpassword = $('#password').val();
    e.preventDefault();
    console.log('Details... ' + useremail + ' ' + userpassword);

    const url = 'http://localhost:5000/api/auth';

    const user = {
      "firstname": "Mat",
      "lastname": "Jules",
      "phoneNumber": "98999888889",
      "email": useremail,
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
        $('.modal').css({ 'display': 'none' });
        var resp = await res.json();
        if (resp.token != null || resp.token != undefined) {
          console.log(resp.token);
          localStorage.setItem('access_token', resp.token);
          history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/dash.html");
          window.location.replace("/dash.html");
          var userObj = parseJwt(resp.token);
          console.log(userObj.user.id);
          localStorage.setItem('user', userObj.user.id);
        } else {
          $('.modal').css({ 'display': 'none' });
          Swal.fire({
            title: 'Invalid Credentials',
            text: 'The username/password is invalid',
            timer: 2000
          }).then(()=>{
            $('.modal').css({ 'display': 'block' });
          }  
          );
        }
      });

  });

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  // function parseJwt(token) {
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  //   console.log(JSON.parse(jsonPayload));
  //   return JSON.parse(jsonPayload);
  // };
});