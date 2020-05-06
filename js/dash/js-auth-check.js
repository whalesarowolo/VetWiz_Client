function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

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

function getRegUsers() {
  swal.fire({
    title: 'Please wait',
    text: 'Creating User',
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false
  })
  const url = 'https://farm-aid-backend.herokuapp.com/api/nvir/users'
  const token = localStorage.getItem('access_token');
  // create request object
  var request = new Request(url, {
    method: 'GET',
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
     swal.fire({
      title: 'User details obtained',
      text: 'Users fetched successfully',
      timer: 3000,
      icon: 'success'
    }).then(() => {

      //Clear and hide the users
      $(".columns.nvri_users").empty().append(`<div class="column is-full">
      <h2 class="button btn-dash secondary-btn is-raised">Registered Users</h2>
  </div>`).fadeOut();
      swal.fire({
        title: 'Updating Data',
        text: 'Please wait...',
        icon: 'info',
        allowOutsideClick: false,
      })
      resp.forEach(nvri_user => {
        
        var content_html = `
        <div class="column is-4">
          <div class="flex-card team-card light-bordered light-raised">
              <div class="card-heading padding-10">
                  <span class="tag is-success">Active</span>
              </div>
              <div class="card-body">
                  <div class="avatar">
                      <img src="` + nvri_user.avatar + `" alt="" data-demo-src="` + nvri_user.avatar + `">
                  </div>
                  <div class="user-id">
                      <div class="name">` + nvri_user.email +  `</div>
                      <div class="position">` + nvri_user.role + `</div>
                      <div class="location"><i class="sl sl-icon-globe"></i>
                          Abuja</div>
                  </div>
                  <div class="user-description">
                  ` + nvri_user.phone + `
                  </div>
                  <div class="card-action has-text-centered">
                      <button class="button btn-dash rounded secondary-btn is-fullwidth ripple no-lh">Profile</button>
                  </div>
              </div>
          </div>
        </div>`;
        //Append to the dom and reveal slowly
        $(".columns.nvri_users").append(content_html);
      });

      swal.close();
      $(".columns.nvri_users").fadeIn('slow');
      
    });
    
   }
   }).catch((e)=> {
     swal.close();
     console.log("Bad request...");
   });
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
    var phoneNumber = $("#the_phonenumber").val();
    var email = $("#the_email").val();
    var role = $("#the_role").val();
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
  if(role == "" || phoneNumber == "" || email == "" ||  password == "") {
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
    swal.fire({
        title: 'Please wait',
        text: 'Creating User',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false
    })
    const url = 'https://farm-aid-backend.herokuapp.com/api/nvir/users'
    const token = localStorage.getItem('access_token');
  
    const newUser = {
      phone: phoneNumber,
      email: email,
      role: role,
      password: password,
    }
  
    // create request object
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(newUser),
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
       swal.fire({
        title: 'User details saved',
        text: 'User created successfully',
        timer: 3000,
        icon: 'success'
    });
     }
     }).catch((e)=> {
       swal.close();
       console.log("Bad request...");
     });
    $(".create-admin-form").addClass('is-hidden');
    return false;
    
  }