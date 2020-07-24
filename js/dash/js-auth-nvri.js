/*! js-auth-nvri.js | Farmaid */

/*
 =================================================================
        NVRI Authentication and registration pages JS file   |
 =================================================================
*/

$(document).ready(function($){
    
    "use strict";
    
    $("#support-dashboard").length ? $("#support-dashboard").fadeOut('fast') : console.log("Loading awesomeness...");

    //Login and Signup V1 (startup kit & landing kit 4)
    $('#contacted').on('click', function () {
        $(this).addClass('is-hidden');
        $('#signup-form, #signup-intro').addClass('is-hidden');
        $('#back-to-signup, #contacted-form, #contacted-intro').removeClass('is-hidden');
    })
    //Back to signup form
    $('#back-to-signup').on('click', function () {
        $(this).addClass('is-hidden');
        $('#contacted-form, #contacted-intro').addClass('is-hidden');
        $('#contacted, #signup-form, #signup-intro').removeClass('is-hidden');
    })

    //Show register form
    $('#register').on('click', function () {
      $(this).addClass('is-hidden');
      $('#login-form').addClass('is-hidden');
      $('#back-to-login, #register-form, #back-to-login-ii').removeClass('is-hidden');
  })
    //Show recover form
    $('#recover').on('click', function () {
        $(this).addClass('is-hidden');
        $('#signin-form').addClass('is-hidden');
        $('#back-to-login, #recover-form').removeClass('is-hidden');
    })
    //back to login on click
    $('#back-to-login, #back-to-login-ii').on('click', function () {
        $(this).toggleClass('is-hidden');
        console.log("About to login...");
        $('#recover-form, #register-form').addClass('is-hidden');
        $('#login-form, #register').removeClass('is-hidden');
    })
    
    //Login and Signup V2 (landing kit 1,2,3)
    $('.forgot, .return').on('click', function () {
        $('#login-form, #recover-form').toggleClass('is-hidden');
    })
    //Recover toggle
    $('.forgot-material, .return-material').on('click', function () {
        $('#material-login-form, #material-recover-form').toggleClass('is-hidden');
    })

    //Clean login 
    $('#show-login, #show-recover').on('click', function () {
        $('#login-card, #recover-card').toggleClass('is-hidden');
    })

    $('#biz-cat').on('click', function () {
      $(this).toggleClass('is-active');
    })
    
    //Dashboard login style switcher
    $('.switcher-block').on('click', function () {
        $('.switcher-block, #classic, #material').toggleClass('is-hidden');
    })

    $("#logout").on('click', function(e) {
      localStorage.clear();
      window.location.replace('/nvri-login.html');
    })

    if ($("#logged_person").length) {
      $("#logged_person").innerHTML = "<p>Welcome " + userObj.user.lastname + " " + userObj.user.firtsname + "&nbsp;&nbsp;</p>";
   }

    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    };

    $("#enta").on('click', function(e) {
        var useremail = $('#email').val();
        var userpassword = $('#password').val();
        if (useremail == "" || userpassword == "") {
          $("#login-form").addClass('is-hidden');
          swal.fire({
            title: 'Error Authenticating',
            text: 'You must provide all credentials to login',
            icon: 'warning',
            timer: 1500
          }).then(()=> {
            $("#login-form").toggleClass('is-hidden');
          });
          return false;
        }

        swal.showLoading('Please wait...');
        //e.preventDefault();
    
        const url = 'https://farm-aid-backend.herokuapp.com/api/nvir/auth';
    
        const user = {
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
            //$('.modal').css({ 'display': 'none' });
            var resp = await res.json();
            if (resp.token != null || resp.token != undefined) {
              console.log(resp.token);
              swal.close();
              localStorage.setItem('access_token', resp.token);
              var userObj = parseJwt(localStorage.getItem('access_token'));
              console.log("User: ", userObj);
              //For propcom dashboard
              if(userObj.user.role == "admin"){
                history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/livestock.html");
                window.location.replace("/livestock.html");
                
              } else {
                window.location.replace("/nvri-login.html");
              }             
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
})

function goHome() {
  document.location.replace('/livestock.html');
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};