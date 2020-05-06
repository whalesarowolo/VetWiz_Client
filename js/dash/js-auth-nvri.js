/*! auth.js | Farmaid */

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
})

function goHome() {
  document.location.replace('/livestock.html');
}

function create_admin(params) {
  swal.fire({
    title: 'Please wait',
    text: 'Preparing resources',
    icon: 'info',
    timer: 500
  }).then(() => {
    $(".create-admin-form").toggleClass("is-hidden");
    ChangeInnerHTML();
  })
}

function ChangeInnerHTML() {
  $('#create-admin').each(function() {
      if ($.trim($(this).html()) == "Create") 
          $(this).html('Creating Admin');
  });
}


function persist_user(event) {
  event.preventDefault();
  var firstname = $("#the_firstname").val();
  var lastname = $("#the_lastname").val();
  var phoneNumber = $("#the_phonenumber").val();
  var email = $("#the_email").val();
  var company = $("#the_company").val();
  var password = $("#the_password").val();
  var numbers = /^[0-9]+$/;
 // function to validate email
 function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(email)) {
    return false;
  }else{
    return true;
  }
}

// validate empty input
if(firstname == "" || lastname == "" || phoneNumber == "" || email == "" ||  password == "") {
  $("#admin-create-form").addClass('is-hidden');
  swal.fire({
    title: 'Error Creating an Admin',
    text: 'You must provide all credentials to Create Adimin',
    icon: 'warning',
    timer: 2100
  }).then(()=> {
    $("#admin-create-form").toggleClass('is-hidden');
  });
  return false;
}

if(!phoneNumber.match(numbers)) {
  $("#admin-create-form").addClass('is-hidden');
  swal.fire({
    title: 'Error Authenticating',
    text: 'Phone Number must be number',
    icon: 'warning',
    timer: 3100
  }).then(()=> {
    $("#admin-create-form").toggleClass('is-hidden');
  });
  return false;
}
if(password < 8) {
  swal.fire({
    title: 'Error Authenticating',
    text: 'Password must be greater than 8 characters',
    icon: 'warning',
    timer: 3100
  }).then(()=> {
    $("#admin-create-form").toggleClass('is-hidden');
  });
  return false;
}

if (IsEmail(email)==false) {
swal.fire({
  title: 'Error Authenticating',
  text: 'Please provide a valid email address',
  icon: 'warning',
  timer: 3100
}).then(()=> {
});
return false;
}
  swal.showLoading('Please wait...');
  const url = 'https://farm-aid-backend.herokuapp.com/api/admin'
  const token = localStorage.getItem('access_token');

  const newAdmin = {
    firstname: firstname,
    lastname: lastname,
    phoneNumber: phoneNumber,
    email: email,
    company: company,
    password: password,
  }

  // create request object
  var request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(newAdmin),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
      
    })
  });
   // pass request object to `fetch()`
   fetch(request)
   .then(async (res) => {
      //$('.modal').css({ 'display': 'none' });
   var resp = await res.json();
   if(resp !== null){
     swal.close();
   }
   }).catch((e)=> {
     swal.close();
     console.log("Bad request...");
   });
  $(".create-admin-form").addClass('is-hidden');
  return false;
  
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

// $(document).ready(function () {
//   let html = "";
//   const token = localStorage.getItem('access_token');
//     var userObj = parseJwt(localStorage.getItem('access_token'));
//     var img = document.createElement("img");
//     img.src = userObj.user.avatar;
//     var src = document.getElementById("profile-head");
//     src.appendChild(img);
//     maCompany = userObj.user.company
//     maEmail = userObj.user.email
//     html += "<h3>" + maCompany + "</h3>"
//     html += "<p>" + maEmail + "</p>"
//     document.getElementById("profile-head").innerHTML = html;
//     document.getElementById("profile_name").innerHTML = userObj.user.lastname + " " + userObj.user.firtsname;
//     document.getElementById("profile_name_h3").innerHTML = userObj.user.lastname + " " + userObj.user.firtsname;
//     document.getElementById("profile_company").innerHTML = userObj.user.company;
//     document.getElementById("profile_email").innerHTML = userObj.user.email;
//     document.getElementById("phon_num").innerHTML = userObj.user.phoneNumber;
//     document.getElementById("phon_num2").innerHTML = userObj.user.phoneNumber;
//     document.getElementById("biz_category").innerHTML = userObj.user.bizCategory;
//     document.getElementById("profile_biz_header").innerHTML = userObj.user.bizCategory;
// });



// $(document).ready(function () {
//   const token = localStorage.getItem('access_token');
//     var userObj = parseJwt(localStorage.getItem('access_token'));
//     var img = document.createElement("img");
//     img.src = userObj.user.avatar;
//     var src = document.getElementById("profile-head");
//     src.appendChild(img);
// });
// $(document).ready(function () {
//   const token = localStorage.getItem('access_token');
//     var userObj = parseJwt(localStorage.getItem('access_token'));
//     var img = document.createElement("img");
//     img.src = userObj.user.avatar;
//     var src = document.getElementById("profile-me");
//     src.appendChild(img);
// });
// $(document).ready(function () {
//   const token = localStorage.getItem('access_token');
//     var userObj = parseJwt(localStorage.getItem('access_token'));
//     var img = document.createElement("img");
//     img.src = userObj.user.avatar;
//     var src = document.getElementById("profile-trigger");
//     src.appendChild(img);
// });
