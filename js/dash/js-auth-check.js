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
        Swal.fire({
            title: 'Please wait',
            text: 'Waiting for authorisation...',
            timer: 3000,
            icon: 'info'
        }).then(() => {
            if (userObj.user.role == "admin") {
                $("#support-dashboard").fadeIn('fast');
            } else {
                Swal.fire({
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

function goHome() {
  document.location.replace('/livestock.html');
}

function logout() {
    localStorage.clear();
    window.location.replace('/nvri-login.html');
}

async function getDiagnosesQueries() {
  swal.fire({
    title: 'Please wait',
    text: 'Fetching Diagnoses Queries',
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false
  })
  const diag_query_url = 'https://farm-aid-backend.herokuapp.com/api/nvir/diagnosis'
  const token = localStorage.getItem('access_token');
  // create request object
  var diag_request = new Request(diag_query_url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': token 
    })
  });

  fetch(diag_request)
  .then(async (diag_res) => {
    var diagnosis_res = diag_res.json();

    if (diagnosis_res !== null) {
      swal.close();
      swal.fire({
          title: 'Diagnoses obtained',
          text: 'Diagnoses fetched successfully',
          timer: 3000,
          icon: 'success'
      }).then(() => {
        $("#diagnoses_queries").empty().fadeOut();
        $("#resp-table-body").empty().fadeOut();
      swal.fire({
        title: 'Updating Data',
        text: 'Please wait...',
        icon: 'info',
        allowOutsideClick: false,
      })
      diagnosis_res.then((vals) => {
        var dia_count = 0
        vals.forEach(dg_query => {
          dia_count +=1;
          var html_with_div = `<div class="resp-table-row">
              <div class="table-body-cell">
                ` + dia_count +  `
                </div>
                <div class="table-body-cell">
                ` + `Animal <b>` + (dg_query.animal).charAt(0).toUpperCase() + (dg_query.animal).slice(1) + `</b> <br>Disease<b> ` + dg_query.diseasesFound[0] + `
                </b></div>
                <div class="table-body-cell">
                 <p class="control">
                             <div class="b-checkbox is-primary">
                                 <input id="checkbox" class="styled" checked type="checkbox">
                                 <label for="checkbox">
                                     complete
                                 </label>
                             </div>
                         </p>
                </div>
          </div>`;
          $("#resp-table-body").append(html_with_div);
     
      })
      swal.close();
      $("#resp-table-body").fadeIn('slow');

      })

      })
    }

  }).catch((err) => {
    swal.close();
    console.log("Request failed...");
  });

}

function getRegUsers() {
  swal.fire({
    title: 'Please wait',
    text: 'Fetching Users',
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
      $("#reg_users").empty();
      $("#reg_users_cahw").empty();
      $("#reg_users_para").empty();
      $(".columns.nvri_users").empty().append(`<div class="column is-full">
      <h2 class="button btn-dash secondary-btn is-raised">Registered Users</h2>
  </div>`).fadeOut();
      swal.fire({
        title: 'Updating Data',
        text: 'Please wait...',
        icon: 'info',
        allowOutsideClick: false,
      })
      var cahw_count = 0;
      resp.forEach(nvri_user => {
        if (nvri_user.role == "cahw") {
          cahw_count += 1;
        }
        $("#logged_person").innerHTML = "<p>Welcome " + nvri_user.lastname + " " + nvri_user.firtsname + "&nbsp;&nbsp;</p>";
        var content_html = `
        <div class="column is-3">
          <div class="flex-card team-card light-bordered light-raised">
              <div class="card-heading padding-10">
                  <span class="tag is-success">Active</span>
              </div>
              <div class="card-body">
                  <div class="avatar" style="align-content: space-around; display: table; margin: auto;">
                      <img style="border-radius: 10px;" src="` + nvri_user.avatar + `" alt="" data-demo-src="` + nvri_user.avatar + `">
                  </div>
                  <div class="user-id">
                      <div class="name"><i class="sl sl-icon-envelope-open"></i> ` + nvri_user.email +  `</div>
                      <div class="position"> ` + nvri_user.role + `</div>
                      <div class="location">
                        <i class="sl sl-icon-globe"></i>
                          Abuja
                      </div>
                  </div>
                  <div class="user-description">
                    <i class="sl sl-icon-phone"></i> ` + nvri_user.phone + `
                  </div>
                  <div class="card-action has-text-centered">
                      <button class="button btn-dash rounded secondary-btn is-6 ripple no-lh">Edit</button>
                      <button data-id="` + nvri_user.email + `" class="button btn-dash rounded secondary-btn is-6 ripple no-lh remove_user">Delete</button>
                  </div>
              </div>
          </div>
        </div>`;
        //Append to the dom and reveal slowly
        $(".columns.nvri_users").append(content_html);
      });

      swal.close();
      $(".columns.nvri_users").fadeIn('slow');
      $("#reg_users").append(`${resp.length}`);
      $("#reg_users_cahw").append(`${cahw_count} CAHW(s)`);
      $("#reg_users_para").append(`${resp.length - cahw_count - 1} Paravet(s)`);
      $(".remove_user").on('click', function(e) {
        var ele = e.target;
        remove_user($(ele).attr('data-id'));
      });
    });
    
   }
   }).catch((e)=> {
     swal.close();
     console.log("Bad request...");
   });
}

function updateProfile(params) {
    swal.fire({
      title: 'Please wait',
      text: 'Preparing resources',
      icon: 'info',
      timer: 500
    }).then(() => {
      $(".update-profile-form").toggleClass("is-hidden");
      ChangeInnerHTML1();
    })
  }

  function ChangeInnerHTML1() {
    $('#update_profile').each(function() {
        if ($.trim($(this).html()) == "Update Profile") {

          $(this).html('Updating Profile');
        } else if ($.trim($(this).html()) == "Updating Profile") {
          //  block of code to be executed if the condition1 is false and condition2 is true
          $(this).html('Update Profile');
        }
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

  function remove_user(email) {
    swal.fire({
      title: 'Updating Data',
      text: 'Updating User Database',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });
      $.ajax({
        method: "POST",
        credentials: true,
        url: "https://farm-aid-backend.herokuapp.com/api/nvir/users/" + email,
        headers: {"Authorization": localStorage.getItem('access_token')}
      })
        .done(function( msg ) {
          swal.close();
          swal.fire({
            title: 'Data updated',
            text: msg.message,
            timer: 3000,
            icon: 'success'
          }).then(() => {
            getRegUsers();
          })
        });
      }

  document.getElementById('the_state').addEventListener('change', () => {
    console.log("State changed...");
  });
  
  function persist_user(event) {
    event.preventDefault();
    var phoneNumber = $("#the_phonenumber").val();
    var email = $("#the_email").val();
    var role = $("#the_role").val();
    var password = $("#the_password").val();
    var the_state = $("#the_state").val();
    
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