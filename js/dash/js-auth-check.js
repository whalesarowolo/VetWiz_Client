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
    swal.showLoading('Please wait...');
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
     }
     }).catch((e)=> {
       swal.close();
       console.log("Bad request...");
     });
    $(".create-admin-form").addClass('is-hidden');
    return false;
    
  }