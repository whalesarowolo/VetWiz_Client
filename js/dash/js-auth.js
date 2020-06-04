/*! auth.js | Bulkit | CSS Ninja */

/*
 ==========================================================================
            Authentication and registration pages JS file 
 ========================================================================== 
*/


$(document).ready(function($){
    
    "use strict";
    
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
      history.pushState({data: window.location.href, time: Date.now()}, 'Dashboard', window.location.href);
      history.go();
    })

    // Sign up JS logic starts here


    // onClick event for sign up button
    $("#signup_new").on('click', function(e) {

      let firstname = $('#register-firstname').val().trim();
      let lastname = $('#register-lastname').val().trim();
      let phonNum = $('#register-phonNum').val();
      let email = $('#register-email').val().trim();
      let company = $('#register-company').val().trim();
      let selectId = $('#register-category').val();
      const password = $('#register-password').val().trim();
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
      if(firstname == "" || lastname == "" || email == "" || company == "" ||  selectId == "" || password == "" || phonNum == "") {
        $("#login-form").addClass('is-hidden');
        swal.fire({
          title: 'Error Authenticating',
          text: 'You must provide all credentials to Sign Up',
          icon: 'warning',
          timer: 2100
        }).then(()=> {
          $("#login-form").toggleClass('is-hidden');
        });
        return false;
      }

      if(phonNum < 11) {
        $("#login-form").addClass('is-hidden');
        swal.fire({
          title: 'Error Authenticating',
          text: 'Phone Number format is Invalid',
          icon: 'warning',
          timer: 3100
        }).then(()=> {
          $("#login-form").toggleClass('is-hidden');
        });
        return false;
      }
      if(!phonNum.match(numbers)) {
        $("#login-form").addClass('is-hidden');
        swal.fire({
          title: 'Error Authenticating',
          text: 'Phone Number must be number',
          icon: 'warning',
          timer: 3100
        }).then(()=> {
          $("#login-form").toggleClass('is-hidden');
        });
        return false;
      }
      if(password < 8) {
        $("#login-form").addClass('is-hidden');
        swal.fire({
          title: 'Error Authenticating',
          text: 'Password must be greater than 8 characters',
          icon: 'warning',
          timer: 3100
        }).then(()=> {
          $("#login-form").toggleClass('is-hidden');
        });
        return false;
      }
     
    if (IsEmail(email)==false) {
      $("#login-form").addClass('is-hidden');
      swal.fire({
        title: 'Error Authenticating',
        text: 'Please provide a valid email address',
        icon: 'warning',
        timer: 3100
      }).then(()=> {
        $("#login-form").toggleClass('is-hidden');
      });
      return false;
   }


      swal.showLoading('Please wait...');
    
        const url = 'https://farm-aid-backend.herokuapp.com/api/users';
    
        const user = {
          "firstname": firstname,
          "lastname": lastname,
          "phoneNumber": phonNum,
          "email": email,
          "company": company,
          "bizCategory": selectId,
          "password": password
        };
    
        // create request object
        var request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });

        fetch(request).then(async (res) => {
          let resp = await res.json();
            if(resp.status !== 201) {
              Swal.fire({
                title: "Signing Up",
                text:   "Either Phone Number or Email has already been used",
                icon: "info",
                timer: 3000
              })
            } else {

              Swal.fire({
                title: "Signing Up",
                text:  `${resp.user.firstname} Please check your mail to verify your Account `,
                icon: "info",
                timer: 3000
              })
            }
        })

    })

    //  Sign Up logic ends here 

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
    
        const url = 'https://farm-aid-backend.herokuapp.com/api/auth';
    
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
              if(userObj.user.company == "propcom"){
                history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/propcom.html");
                //history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/dashboard.html");
                window.location.replace("/propcom.html");
              }else if(userObj.user.isAdmin == false) {
                history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/partnerDashboard.html");
                window.location.replace("/partnerDashboard.html");
              } else {
                history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/dashboard.html");
                window.location.replace("/dashboard.html");
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

    // var parseJwt = (token) => {
    //     try {
    //       return JSON.parse(atob(token.split('.')[1]));
    //     } catch (e) {
    //       return null;
    //     }
    // };

    

})


// send SMS 
// function sendSMS(opts) {
//   fetch('http://localhost:5000/api/send', {
//     method: 'POST',
//     body: JSON.stringify(opts),
//     headers: new Headers()
//   }).then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     console.log('Sent: ', data);
//   });
// }

function goHome() {
  document.location.replace('/dashboard.html');
}

function goHomePartner() {
  document.location.replace('/partnerDashboard.html');
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

// if(phoneNumber !== "11") {
//   $("#admin-create-form").addClass('is-hidden');
//   swal.fire({
//     title: 'Error Authenticating',
//     text: 'Phone Number format is Invalid',
//     icon: 'warning',
//     timer: 3100
//   }).then(()=> {
//     $("#admin-create-form").toggleClass('is-hidden');
//   });
//   return false;
// }
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

$("#send_internal_messages").on('click', function(e) {
  $("#create_internal_message").css({'display': 'none'});
  console.log("Sending Internal message");
  
  var internal_message_content = $("#internal_message_content").val();
  var to_recipients = $("#to_recipients").val().split(',');
  var temPal = [];
  to_recipients.forEach((num) => {
    temPal.push(num.trim());
  })
  to_recipients = temPal;

  const internal_msg = {
    "msg": internal_message_content,
    "to_recipients": to_recipients,
  }

  const internal_url = 'https://farm-aid-backend.herokuapp.com/api/send_internal'
  const my_token = localStorage.getItem('access_token');
  cancelInternalMessage();
  console.log("New message: ", internal_msg);
  swal.fire({
    title: 'Sending Message',
    text: 'Please wait...',
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false
  });

  // create request object
  var internal_request = new Request(internal_url, {
    method: 'POST',
    body: JSON.stringify(internal_msg),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': my_token  
    })
  });

  // pass request object to `fetch()`
  fetch(internal_request)
    .then(async (res) => {
      //$('.modal').css({ 'display': 'none' });
      var resp = await res.json();
      if(resp !== null){
        swal.close();
        console.log("Network response from Internal: ", resp);
      }
    }).catch((e)=> {
      swal.close();
      console.log("Bad request...");
    });
  

})
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

$(document).ready(function () {
  let html = "";
  const token = localStorage.getItem('access_token');
    var userObj = parseJwt(localStorage.getItem('access_token'));
    var img = document.createElement("img");
    img.src = userObj.user.avatar;
    var src = document.getElementById("profile-head");
    src.appendChild(img);
    maCompany = userObj.user.company
    maEmail = userObj.user.email
    html += "<h3>" + maCompany + "</h3>"
    html += "<p>" + maEmail + "</p>"
    document.getElementById("profile-head").innerHTML = html;
    document.getElementById("profile_name").innerHTML = userObj.user.lastname + " " + userObj.user.firtsname;
    document.getElementById("profile_name_h3").innerHTML = userObj.user.lastname + " " + userObj.user.firtsname;
    document.getElementById("profile_company").innerHTML = userObj.user.company;
    document.getElementById("profile_email").innerHTML = userObj.user.email;
    document.getElementById("phon_num").innerHTML = userObj.user.phoneNumber;
    document.getElementById("phon_num2").innerHTML = userObj.user.phoneNumber;
    document.getElementById("biz_category").innerHTML = userObj.user.bizCategory;
    document.getElementById("profile_biz_header").innerHTML = userObj.user.bizCategory;
});



$(document).ready(function () {
  const token = localStorage.getItem('access_token');
    var userObj = parseJwt(localStorage.getItem('access_token'));
    var img = document.createElement("img");
    img.src = userObj.user.avatar;
    var src = document.getElementById("profile-head");
    src.appendChild(img);
});
$(document).ready(function () {
  const token = localStorage.getItem('access_token');
    var userObj = parseJwt(localStorage.getItem('access_token'));
    var img = document.createElement("img");
    img.src = userObj.user.avatar;
    var src = document.getElementById("profile-me");
    src.appendChild(img);
});
$(document).ready(function () {
  const token = localStorage.getItem('access_token');
    var userObj = parseJwt(localStorage.getItem('access_token'));
    var img = document.createElement("img");
    img.src = userObj.user.avatar;
    var src = document.getElementById("profile-trigger");
    src.appendChild(img);
});


$("#send_messages").on('click', function(e) {
  $("#create-note-modal").css({'display': 'none'});
  var msg_content = $("#message_content").val();
  var msg_state = $("#slct1").val();
  var msg_lga = $("#slct2").val();
  var msg_crop = $("#crop_value").val();
  var msg_gender = $("#gender_value").val();
  console.log($("#gender_value").val())
  swal.fire({
    title: 'Sending Message Details',
    text: 'Please wait...',
    timer: 4000,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: 'info'
  }).then(function() {

    const url = 'https://farm-aid-backend.herokuapp.com/api/masms'
  
    const token = localStorage.getItem('access_token');
    var userObj = parseJwt(localStorage.getItem('access_token'));
    maCompany = userObj.user.company
    maEmail = userObj.user.email
    
  swal.fire({
    title: 'Sending Message',
    text: 'Sending mesage. You will get an Email notificaton if your Message is approved or not',
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false
  });
  
  const newMessage = {
    state: msg_state,
    gender: msg_gender,
    crop: msg_crop,
    msg: msg_content,
    company: maCompany,
    email: maEmail,
  };
  // create request object
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: new Headers({
        'Content-Type': 'application/json'        
      })
    });
    // pass request object to `fetch()`
    fetch(request)
      .then(async (res) => {
         //$('.modal').css({ 'display': 'none' });
      var resp = await res.json();
      if(resp != null || resp != undefined){
        swal.close();
        console.log("Bad request...");
      }
      }).catch((e)=> {
        swal.close();
        console.log("Bad request...");
      });
  })

 })

 function addScript(filename){
  var head = document.getElementsByTagName('head')[0];
 
  var script = document.createElement('script');
  script.src = filename;
  script.type = 'text/javascript';
 
  head.append(script);
 }
 
/**
 * Start definition for gombe Farmers retrieval
 * @param {*} params 
 */
 function gombefarmerSwal(params) {

  addScript('https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js');

   swal.fire({
    title: 'Loading Farmers Data from Gombe',
    text: 'Please wait...',
    timer: 4000,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: 'info'
  }).then(function() {
    $("#gombetable").fadeOut("fast");
    swal.fire({
      title: "Please wait",
      text: "Loading data ....",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false
    });
    
    $("#gombe_farm_table").ready(function() {


      const url = 'https://farm-aid-backend.herokuapp.com/api/farmer/state/Gombe'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {

        // DataTable here

        if ($("#example_tase").length) {
          $("#example_tase").DataTable( {
          data: data,
            "columns": [
              { "data": " " },
              { "data": "firstname" },
              { "data": "lastname" },
              { "data": "gender" },
              { "data": "phoneNumber" },
              { "data": "state" },
              { "data": "lga" },
              { "data": "marital_status" }
          ]
          } );

          html = "<span>" + "Total Number of Farmers in Gombe: " + data.length + "</span>"
          document.getElementById("gob").innerHTML = html;
        }
        
        // End DataTable here
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    })

    Swal.close();
  })
 

}

// End of Gombe Farmers retrieval

 function farmerSwal(params) {
  if($("#main-dashboard").length){

    addScript('https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js');
    
   swal.fire({
    title: 'Loading Farmers Data from Adamawa',
    text: 'Please wait...',
    timer: 4000,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: 'info'
  }).then(function() {
    $("#mytable").fadeOut("fast");
    swal.fire({
      title: "Please wait",
      text: "Loading data ....",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false
    });

    $("#example_adam").ready(function() {
  
      const url = 'https://farm-aid-backend.herokuapp.com/api/farmer/state/Adamawa'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
       
        // DataTable here

        if ($("#example_adam").length) {
          $("#example_adam").DataTable( {
            responsive: true,
            data: data,
            "columns": [
              { "data": "firstname" },
              { "data": "lastname" },
              { "data": "gender" },
              { "data": "phoneNumber" },
              { "data": "state" },
              { "data": "lga" },
              { "data": "marital_status" }
          ]
          } );
          html = "<span>" + "Total Number of Farmers in Adamawa: " + data.length + "</span>"
          document.getElementById("ada").innerHTML = html;
        } 
        // End DataTable here
      }).catch((error) => {
        console.error('Error:', error);
      });
    })

    Swal.close();
  })
 }

}

let table = "#mytable";
$("#maxRows").on('change', function() {
  $('.pagination').html('')
  let trnum = 0
  let maxRows = parseInt($(this).val())
  let totalRows = $(table+'tbody tr').length
  $(table+' tr:gt(0)').each(function() {
    trnum++
    if(trnum > maxRows) {
      $(this).hide()
    }

    if(trnum <= maxRows) {
      $(this).show()
    }
    if(totalRows > maxRows) {
      $(this).show()
    }
  })
  if(totalRows > maxRows) {
    let pagenum = Math.ceil(totalRows/maxRows)
    for(let i=1; i<=pagenum;) {
      $('.pagination').append('<li data-page="'+i+'">\<span>'+ i++ +'<span class="sr-only">(current)</span></span>\</li>').show()
    }
  }
  $('.pagination li:first-child').addClass('active')
  $('.pagination li').on('click', function() {
    let pageNum = $(this).attr('data-page')
    let trIndex = 0;
    $('.pagination li').removeClass('active')
    $(this).addClass('active')
    $(table+'tr:gt(0)').each(function() {
      trIndex++
      if(trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)) {
        $(this).hide()
      } else {
        $(this).show()
      }
    })
  })
})

function myNumber() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myNumber");
  filter = input.value.toUpperCase();
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      txtValue = td.textContent || td.innerText;
      
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
function mySearch() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
function myLGA() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myLGA");
  filter = input.value.toUpperCase();
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[6];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
function myState() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myState");
  filter = input.value.toUpperCase();
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function inputTable(params) {
  if($("#main-dashboard").length) {
    swal.fire({
      title: 'Loading Input Dealers Table',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then( function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      $("#inputtable").ready(function() {

        const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
        const token = localStorage.getItem('access_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
      
        fetch(url, {
          method: "GET",
          headers
        }).then(async (res) => res.json()).then(data => {
          let html = "";
          let table = "#input_table";
          data.map((users) => {
            if(users.bizCategory == "input_company") {
              let firstname = users.firstname;
              let lastname = users.lastname;
              let phoNum = users.phoneNumber;
              let email = users.email;
              let company = users.company;
      
              html += "<tr>";
            html += "<td></td>"
            html += "<td>" + firstname + "</td>"
            html += "<td>" + lastname + "</td>"
            html += "<td>" + phoNum + "</td>"
            html += "<td>" + email + "</td>"
            html += "<td>" + company + "</td>"
          html += "</tr>"
      
          document.getElementById("input_table").innerHTML = html;
            } else if(users.bizCategory == null) {
              html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
              document.getElementById("nullSeed").innerHTML = html;
            }
          })
          
        })
        Swal.close();
      })
    })
  }
}

function offTaker(params) {
  if($("#main-dashboard").length) {
    swal.fire({
      title: 'Loading Off Takers Table',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then( function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      $("#offtable").ready(function() {

        const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
        const token = localStorage.getItem('access_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
      
        fetch(url, {
          method: "GET",
          headers
        }).then(async (res) => res.json()).then(data => {
          let html = "";
          let table = "#off_table";
          data.map((users) => {
            if(users.bizCategory == "off_taker") {
              let firstname = users.firstname;
              let lastname = users.lastname;
              let phoNum = users.phoneNumber;
              let email = users.email;
              let company = users.company;
      
              html += "<tr>";
            html += "<td></td>"
            html += "<td>" + firstname + "</td>"
            html += "<td>" + lastname + "</td>"
            html += "<td>" + phoNum + "</td>"
            html += "<td>" + email + "</td>"
            html += "<td>" + company + "</td>"
          html += "</tr>"
      
          document.getElementById("off_table").innerHTML = html;
            } else if(users.bizCategory == null) {
              html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
              document.getElementById("nullSeed").innerHTML = html;
            }
          })
          
        })
        Swal.close();
      })
    })
  }
}

function paraVet(params) {
  if($("#main-dashboard").length) {
    swal.fire({
      title: 'Loading ParaVet Workers Table',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then( function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      $("#paratable").ready(function() {

        const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
        const token = localStorage.getItem('access_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
      
        fetch(url, {
          method: "GET",
          headers
        }).then(async (res) => res.json()).then(data => {
          let html = "";
          let table = "#para_table";
          data.map((users) => {
            if(users.bizCategory == "paraVet") {
              let firstname = users.firstname;
              let lastname = users.lastname;
              let phoNum = users.phoneNumber;
              let email = users.email;
              let company = users.company;
      
              html += "<tr>";
            html += "<td></td>"
            html += "<td>" + firstname + "</td>"
            html += "<td>" + lastname + "</td>"
            html += "<td>" + phoNum + "</td>"
            html += "<td>" + email + "</td>"
            html += "<td>" + company + "</td>"
          html += "</tr>"
      
          document.getElementById("para_table").innerHTML = html;
            } else if(users.bizCategory == null) {
              html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
              document.getElementById("nullSeed").innerHTML = html;
            }
          })
          
        })
        Swal.close();
      })
    })
  }
}

function extTable(params) {
  if($("#main-dashboard").length) {
    swal.fire({
      title: 'Loading Extension Workers Table',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then( function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      $("#exttable").ready(function() {

        const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
        const token = localStorage.getItem('access_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
      
        fetch(url, {
          method: "GET",
          headers
        }).then(async (res) => res.json()).then(data => {
          let html = "";
          let table = "#ext_table";
          data.map((users) => {
            if(users.bizCategory == "ext_agent") {
              let firstname = users.firstname;
              let lastname = users.lastname;
              let phoNum = users.phoneNumber;
              let email = users.email;
              let company = users.company;
      
              html += "<tr>";
            html += "<td></td>"
            html += "<td>" + firstname + "</td>"
            html += "<td>" + lastname + "</td>"
            html += "<td>" + phoNum + "</td>"
            html += "<td>" + email + "</td>"
            html += "<td>" + company + "</td>"
          html += "</tr>"
      
          document.getElementById("ext_table").innerHTML = html;
            } else if(users.bizCategory == null) {
              html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
              document.getElementById("nullSeed").innerHTML = html;
            }
          })
          
        })
        Swal.close();
      })
    })
  }
}

function aggreTable(params) {
  if($("#main-dashboard").length) {
    swal.fire({
      title: 'Loading Aggregator Dealers Table',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then( function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      $("#aggretable").ready(function() {

        const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
        const token = localStorage.getItem('access_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
      
        fetch(url, {
          method: "GET",
          headers
        }).then(async (res) => res.json()).then(data => {
          let html = "";
          let table = "#aggre_table";
          data.map((users) => {
            if(users.bizCategory == "aggregator") {
              let firstname = users.firstname;
              let lastname = users.lastname;
              let phoNum = users.phoneNumber;
              let email = users.email;
              let company = users.company;
      
              html += "<tr>";
            html += "<td></td>"
            html += "<td>" + firstname + "</td>"
            html += "<td>" + lastname + "</td>"
            html += "<td>" + phoNum + "</td>"
            html += "<td>" + email + "</td>"
            html += "<td>" + company + "</td>"
          html += "</tr>"
      
          document.getElementById("aggre_table").innerHTML = html;
            } else if(users.bizCategory == null) {
              html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
              document.getElementById("nullSeed").innerHTML = html;
            }
          })
          
        })
        Swal.close();
      })
    })
  }
}

function seedTable(params) {
  if($("#main-dashboard").length) {
    swal.fire({
      title: 'Loading Seed Dealers Table',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then( function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      $("#seedtable").ready(function() {
        
        const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
        const token = localStorage.getItem('access_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
      
        fetch(url, {
          method: "GET",
          headers
        }).then(async (res) => res.json()).then(data => {
          let html = "";
          let table = "#seed_table";
          data.map((users) => {
            if(users.bizCategory == "seed_supplier") {
              let firstname = users.firstname;
              let lastname = users.lastname;
              let phoNum = users.phoneNumber;
              let email = users.email;
              let company = users.company;
      
              html += "<tr>";
            html += "<td></td>"
            html += "<td>" + firstname + "</td>"
            html += "<td>" + lastname + "</td>"
            html += "<td>" + phoNum + "</td>"
            html += "<td>" + email + "</td>"
            html += "<td>" + company + "</td>"
          html += "</tr>"
      
          document.getElementById("seed_table").innerHTML = html;
            } else if(users.bizCategory == null) {
              html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
              document.getElementById("nullSeed").innerHTML = html;
            }
          })
          
        })
        Swal.close();
      })
    })
  }
}


function agroTable(params) {
  if($("#main-dashboard").length) {
    swal.fire({
      title: 'Loading Agrodealer Table',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then( function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
          $("#agrotable").ready(function() {
          
            const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
            const token = localStorage.getItem('access_token');
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', token);
          
            fetch(url, {
              method: "GET",
              headers
            }).then(async (res) => res.json()).then(data => {
              let html = "";
              let table = "#agro_table";
              
              data.map((users) => {

                console.log(users.isAdmin)
                let usersDetails = users.bizCategory;
                let usersRole = users.isAdmin;
                if(usersDetails == "agro-dealer" && usersRole === false) {
                  console.count(users);
                  let firstname = users.firstname;
                  let lastname = users.lastname;
                  let phoNum = users.phoneNumber;
                  let email = users.email;
                  let company = users.company;
      
                  html += "<tr>";
                html += "<td></td>"
                html += "<td>" + firstname + "</td>"
                html += "<td>" + lastname + "</td>"
                html += "<td>" + phoNum + "</td>"
                html += "<td>" + email + "</td>"
                html += "<td>" + company + "</td>"
              html += "</tr>"
          
              document.getElementById("agro_table").innerHTML = html;
              // var count = $('#agro_table tr').length;
              // console.log(count);
              // document.getElementById("agroSpan").innerHTML = count;
                } else if(users.bizCategory == null) {
                  html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
                }
              })
              
            })
          
            Swal.close();
          })
    })
  }
}

$("#ext_count").ready(function() {
  
  const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    let html = "";
    
    let count_agro = 0;
    data.map((users) => {
      let usersDetails = users.bizCategory;
      let usersRole = users.isAdmin;
      
      if(usersDetails == "ext_agent" && usersRole === false) {
        count_agro += 1;

        html = "<span>" + count_agro + "</span>"
          document.getElementById("ext_count").innerHTML = html;
      } else if(count_agro === 0) {
        html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
      }
    });
   
    // DataTable here

  }).catch((error) => {
    console.error('Error:', error);
  });
})


$("#paravet_count").ready(function() {
  
  const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    let html = "";
    
    let count_agro = 0;
    data.map((users) => {
      let usersDetails = users.bizCategory;
      let usersRole = users.isAdmin;
      
      if(usersDetails == "paraVet" && usersRole === false) {
        count_agro += 1;

        html = "<span>" + count_agro + "</span>"
          document.getElementById("paravet_count").innerHTML = html;
      } else if(count_agro === 0) {
        html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
      }
    });
   
    // DataTable here

  }).catch((error) => {
    console.error('Error:', error);
  });
})


$("#input_counter").ready(function() {
  
  const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    let html = "";
    
    let count_agro = 0;
    data.map((users) => {
      let usersDetails = users.bizCategory;
      let usersRole = users.isAdmin;
      
      if(usersDetails == "input_company" && usersRole === false) {
        count_agro += 1;

        html = "<span>" + count_agro + "</span>"
          document.getElementById("input_counter").innerHTML = html;
      } else if(count_agro === 0) {
        html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
      }
    });
   
    // DataTable here

  }).catch((error) => {
    console.error('Error:', error);
  });
})

$("#offtaker_counter").ready(function() {
  
  const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    let html = "";
    
    let count_agro = 0;
    data.map((users) => {
      let usersDetails = users.bizCategory;
      let usersRole = users.isAdmin;
      
      if(usersDetails == "off_taker" && usersRole === false) {
        count_agro += 1;

        html = "<span>" + count_agro + "</span>"
          document.getElementById("offtaker_counter").innerHTML = html;
      } else if(users.bizCategory == null) {
        html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
      }
    });
   
    // DataTable here

  }).catch((error) => {
    console.error('Error:', error);
  });
})


$("#aggregatorCounter").ready(function() {
  
  const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    let html = "";
    
    let count_agro = 0;
    data.map((users) => {
      let usersDetails = users.bizCategory;
      let usersRole = users.isAdmin;
      
      if(usersDetails == "aggregator" && usersRole === false) {
        count_agro += 1;

        html = "<span>" + count_agro + "</span>"
          document.getElementById("aggregatorCounter").innerHTML = html;
      } else if(users.bizCategory == null) {
        html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
      }
    });
   
    // DataTable here

  }).catch((error) => {
    console.error('Error:', error);
  });
})


$("#seedCos").ready(function() {
  
  const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    let html = "";
    
    let count_agro = 0;
    data.map((users) => {
      let usersDetails = users.bizCategory;
      let usersRole = users.isAdmin;
      
      if(usersDetails == "seed_supplier" && usersRole === false) {
        count_agro += 1;

        html = "<span>" + count_agro + "</span>"
          document.getElementById("seedCos").innerHTML = html;
      } else if(users.bizCategory == null) {
        html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
      }
    });
   
    // DataTable here

  }).catch((error) => {
    console.error('Error:', error);
  });
})

$("#agroSpan").ready(function() {
  
  const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    let html = "";
    
    let count_agro = 0;
    data.map((users) => {
      let usersDetails = users.bizCategory;
      let usersRole = users.isAdmin;
      
      if(usersDetails == "agro-dealer" && usersRole === false) {
        count_agro += 1;

        html = "<span>" + count_agro + "</span>"
          document.getElementById("agroSpan").innerHTML = html;
      } else if(users.bizCategory == null) {
        html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
      }
    });
   
    // DataTable here

  }).catch((error) => {
    console.error('Error:', error);
  });
})

function riceGapSwal(params) {
  
    swal.fire({
      title: 'Loading Tomatoes Data',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then(function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      var random_id = function  () 
      {
        var id_num = Math.random().toString(9).substr(2,3);
        var id_str = Math.random().toString(36).substr(2);
        
        return id_num + id_str;
      } 

    $("#rice_pro_details").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65ef8d2292e400173b6daa'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let landSelection = data.production[0].landSelection
      let landPreparation = data.production[0].landPreparation
      let plantingTechnique = data.production[0].plantingTechnique
      let harvesting = data.production[0].harvesting
      let mechanization = data.production[0].mechanization
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "land Selection" + "</td>"
      html += "<td>" + landSelection + "</td>"
      html += "<td>" + "Zabi fili mai albarka da ke rike ruwa. kasa mai danshi da yunbu yafi kyau" + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "land Preparation" + "</td>"
      html += "<td>" + landPreparation + "</td>"
      html += "<td>" +  "A yi haro so daya bayan an jika kasar noma da ruwa a gonan tudu. A yi haro so biyu a gonan kwari bayan shigowan ruwan sama." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "planting Technique" + "</td>"
      html += "<td>" + plantingTechnique + "</td>"
      html += "<td>" + "Yi shukan da ba zai bayyana iri ga cuta ba : Yafawa: yafin iri a saman kasa mara tsari.  Dasawa:yin rainon iri a kwami sai a dasa a gona. Kaptu: Tona wuri a kasa sai a shuka iri 5-8 a zurfin 2-3 cm. Tonan rami: Tsaga rami ye kai zurfin 2-3cm a kasa kan layi, a shuka iri sai a rufe da kasa.   	Non adoptability of suitable planting technique predisposes the seeds to harsh climatic conditions, birds, rodents and other pest attack, thereby limiting seed germination." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "harvesting" + "</td>"
      html += "<td>" + harvesting + "</td>"
      html += "<td>" + "A yi girbin shikafa a lokacin da sun nuna. Wan nan na faruwa sakanin kwana 30-45 bayan sun fara yin iya iya ko bayan wata daya, da rabin shinkafan sun fara yin iya iya . A kwai yawan hanyan da za'a iya bi ayi girbin shinkafa ko da babba inji, ya dan gan ta da karfin manoma." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "mechanization" + "</td>"
      html += "<td>" + mechanization + "</td>"
      html += "<td>" +  "  Kananan manoma shinkafa na bukatan hanyan smun injinan noma: Sharan Gona: Tarakto, Plough, Injin Kaptu, Haro  Shuka: mashinan shuki, dashe da sauransu.  Girbi: baban Tarakton girbi. Da sauransu. Ayukan bayan girbi: Injin bugun shinkafa, injin shanya. Aiwatarwa: injin Mai Dafawa, injin nika, injin Maikara haske, injin chire datti." + "</td>"
      html += "</tr>"
       
      document.getElementById("rice_pro_details").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#rice_wc_details").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65ef8d2292e400173b6daa'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let temperature = data.weather_climate[0].temperature
      let rainfall = data.weather_climate[0].rainfall
      let humility = data.weather_climate[0].humility
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "temperature" + "</td>"
      html += "<td>" + temperature + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "rainfall" + "</td>"
      html += "<td>" + rainfall + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "humility" + "</td>"
      html += "<td>" + humility + "</td>"
      html += "</tr>"
       
      document.getElementById("rice_wc_details").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#rice_aggr_details").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65ef8d2292e400173b6daa'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let labelling = data.aggrgation[0].labelling
      let pricing = data.aggrgation[0].pricing
      let market_linage = data.aggrgation[0].market_linage
      let off_taker = data.aggrgation[0].off_taker
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "labelling" + "</td>"
      html += "<td>" + labelling + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "pricing" + "</td>"
      html += "<td>" + pricing + "</td>"
      html += "<td>" + "I dan manomi sun hadda amfanin gonan su, za su samu yawan amfanin gona da karfin ciniki, zasu samu masu siya da yawa, kuma za su samu ikon sa farashi." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "Market-Lineage" + "</td>"
      html += "<td>" + market_linage + "</td>"
      html += "<td>" + "Hada kai na kanana manoma zai sa su iya kai daidain bukatan kasuwa ko abunda kasuwar zamani ke bukata. Kuma su kai ga iya suluhunta matsalolin rashin  samun damar shiga kasuwan ci domin ya basu karfin iya yin gasa seyar da kayan gona da kuma rongwamin shiga kasuwa " + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "off_taker" + "</td>"
      html += "<td>" + off_taker + "</td>"
      html += "<td>" + "Farm Aid wani dandali ne da ke hada kananan manoma da masu siyan amfanin gona su, wan da zai yi aiki kai tsaye da manoma su gina tsari yadda za su yi aiki. Masu siyan amfani gona na manoma za su tabatar ci wa amfanin manoma sun samu tsari mai kyau a kasuwa." + "</td>"
      html += "</tr>"
       
      document.getElementById("rice_aggr_details").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });



    $("#rice_cm_details").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65ef8d2292e400173b6daa'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let weedControl = data.cropManagement[0].weedControl
      let fertilizerApplication = data.cropManagement[0].fertilizerApplication
      let cpp = data.cropManagement[0].cpp
      let pest_disease_control = data.cropManagement[0].pest_disease_control
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "weedControl" + "</td>"
      html += "<td>" + weedControl + "</td>"
      html += "<td>" + "Noman Hannu: Yi noman  hannu sau biyu bayan kwana 21-40 da yin dashe. Noma da Magani Haki: Maganin Dabe- Propanil + 2.4D Amine 4L/ha Propanil + thiobencarb 4L/ha, Sati2-3 bayan shuka, Propanil + oxadiazon (Lita 5 na Ronstar 400 EC/ha), Triclopyr Butoxyethyl Ester 4L/ha, Propanil + Triclopyr  4L/ha" + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "fertilizer Application" + "</td>"
      html += "<td>" + fertilizerApplication + "</td>"
      html += "<td>" + "Noman Shinkafan Kwari, Damina, Rani da Tudu Zuba buhu hudu na (50kg) NPK 20-10-10 ko NPK 15-15-15. kafin shuka  Zuba buhu daya na (50kg) NPK 20-10-10 ko NPK 15-15-15 bayan sati 2 da yin Dashe  Zuba buhu daya na (50kg) Uria bayan sati shida da yin Dashe " + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "CPP" + "</td>"
      html += "<td>" + cpp + "</td>"
      html += "<td>" +  "Maganin Kwari= yi amfani da Isoprothiotane (Fashewar Shinkafa) 20-30gr/goyo, Lambda-cyhalothrine+Imidacloprid (domin Kwari mai cin ganye da tsotse amfani) 50-75ml/goyo ko Chlorophyriphos (domin Gara) 50-100ml/goyo Maganin Raba= Yi amfani da Dithane Z-78, Dithane M-45, Mancozeb 15gr/pompo & Carbendazim 15gr/goyo" + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "Pest-Disease Control" + "</td>"
      html += "<td>" + pest_disease_control + "</td>"
      html += "<td>" +  "• Yi amfani da iri mai jure cuta Yi amfani da iri mai kyau da lafiya  Harkokin noma kamar; yin shuka da wuri, gajeren tazara  da kuma hana haki  fitowa a gona. Duk zai hana cututuka shigowa gona. Kashe duk wani haki a cikin shinkafa A kafa gunkuna a wurare cikin gona domin koran Tsuntsaye" + "</td>"
      html += "</tr>"
       
      document.getElementById("rice_cm_details").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#rice_ph_details").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65ef8d2292e400173b6daa'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let threshing = data.postHarvest[0].threshing
      let drying = data.postHarvest[0].drying
      let packaging = data.postHarvest[0].packaging
      let storage = data.postHarvest[0].storage
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "threshing" + "</td>"
      html += "<td>" + threshing + "</td>"
      html += "<td>" + "Buge shinkafa de zaran an yanka/girbe sai a busar don a guji lalacewa. A yi bugu a kain durom, kar a yi bugu a kasa da ba taburma domin kada datti ya shiga A yi bugu a kain taburma, tampol ko cementin kankare  (i.e A yi bugu a kasa, da sanda ko a kain durum). A bugu da hankali kada a fitar da bawan shinkafa. Shi ne, raba tsaki da wanda basu kosa ba daga shinkafan da suka nuna. A cire datti daga shinkafa mai bawo don kada a samu bambanci a lokacin dafawa." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "drying" + "</td>"
      html += "<td>" + drying + "</td>"
      html += "<td>" + "A shanya shinkafa mai bawo sosai zuwa danshi 13-14% da ya dace a kain cementin kankere, taburma, ko tampol sai a din ga juyawa a lokaci lokaci.         A shanya a rana a hankali zuwa kwana 2-3 don a rege kariyan shinkafa a inji. Lokacin da rana ya fitu sosai, a baza shinkafi mai bawo a kain cementin kankere ko taburma ko tampo, shanya zuwa awa 9-10 kowai. A sa injin busarwa idan akwai." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "packaging" + "</td>"
      html += "<td>" + packaging + "</td>"
      html += "<td>" + "Bayan an shanya shinkafa mai bawo sosai, ya na da kyau a sa shi a chikin sabon buhu mai dawkan nauyin 50-100 kg domin ajiya." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "storage" + "</td>"
      html += "<td>" + storage + "</td>"
      html += "<td>" +  "Ayi ajiyan shinkafa a ma'aji mai kyau wanda pera bazasu iya shiga ba. Wan da ya kamu da cuta, a sa maganin ajiya (phostoxin) in da iska ba zai shiga ba. Yi amfani da kwayan magani guda a buhu (100 kg) ko  kwayoyi 10-15/ton. A shiriya buhu a kar kashin ruhun gida, ko a kar kshin tampol. A bar danshen  hasti a 14%." + "</td>"
      html += "</tr>"
       
      document.getElementById("rice_ph_details").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#rice_input_details").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65ef8d2292e400173b6daa'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let seedSelection = data.input[0].seedSelection
      let seedSource = data.input[0].seedSource
      let fertilizer = data.input[0].fertilizer
      let herbicides = data.input[0].herbicides
      let cropProtectionProduct = data.input[0].cropProtectionProduct
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "seed Selection" + "</td>"
      html += "<td>" + seedSelection + "</td>"
      html += "<td>" + "Iri na shinkafa da ya dace: Domin noman Tudu, shuka : FARO 55, FARO 58, FARO 59, FARO 66 and FARO 67. Domin noman Kwari shuka: FARO 63 (OFADA 2)FARO 65" + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "seed Source" + "</td>"
      html += "<td>" + seedSource + "</td>"
      html += "<td>" + "Za a iya samun ingantacen Iri na shinkafa daga: Kamfanonin Irin Noma(Agricultural Seed Companies), Rice Seed Centers, Rice Research Centers, State Agricultural Development Project (ADPs), River Basin Development Authority and Branch Office of the National Agricultural Seed Council." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "fertilizer" + "</td>"
      html += "<td>" + fertilizer + "</td>"
      html += "<td>" + "Takin gargajiya kamar kashin dabbobi na iya kara ma kasa karfin taki. Wannan taki na cikin kasa da na gargajiya na bukatan kiya ye wa domin zaman isashe ga amfanin gona." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "herbicides" + "</td>"
      html += "<td>" + herbicides + "</td>"
      html += "<td>" +  "Fesa maganin kashe haki har sauyu/didige (Glyphosate), a farkon gyara fili, sati biyu zuwa uku sai ayi haro sau daya kafin ayi shuka, donin a kashe jijiyoyin haki.  A fesa maganin kashe kwayan haki(dabe) bayan kwana 1-2 da yin shuka. Magani mai kashe haki a cikin shinkafa bayan sun fito ko ayi noman hanu ko da inji." + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "crop Protection Product" + "</td>"
      html += "<td>" + cropProtectionProduct + "</td>"
      html += "<td>" + "yin ampani da magungunan tsaro a cikin gonan, domin kashe haki da kwari, har sauran cututukan da ke damun shinkafa." + "</td>"
      html += "</tr>"
       
      document.getElementById("rice_input_details").innerHTML = html;
      Swal.close();
      }).catch((error) => {
        console.error('Error:', error);
      });
    });
  })
  Swal.close();
}

// tomatoes GAP content
function toGapSwal(params) {
    swal.fire({
      title: 'Loading Tomatoes Data',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then(function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      var random_id = function  () 
      {
        var id_num = Math.random().toString(9).substr(2,3);
        var id_str = Math.random().toString(36).substr(2);
        
        return id_num + id_str;
      } 

    $("#to_pro").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f07e2292e400173b6dac'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let landSelection = data.production[0].landSelection
      let landPreparation = data.production[0].landPreparation
      let plantingTechnique = data.production[0].plantingTechnique
      let harvesting = data.production[0].harvesting
      let mechanization = data.production[0].mechanization
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "land Selection" + "</td>"
      html += "<td>" + landSelection + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "land Preparation" + "</td>"
      html += "<td>" + landPreparation + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "planting Technique" + "</td>"
      html += "<td>" + plantingTechnique + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "harvesting" + "</td>"
      html += "<td>" + harvesting + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "mechanization" + "</td>"
      html += "<td>" + mechanization + "</td>"
      html += "</tr>"
       
      document.getElementById("to_pro").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#to_we").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f07e2292e400173b6dac'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let temperature = data.weather_climate[0].temperature
      let rainfall = data.weather_climate[0].rainfall
      let humility = data.weather_climate[0].humility
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "temperature" + "</td>"
      html += "<td>" + temperature + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "rainfall" + "</td>"
      html += "<td>" + rainfall + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "humility" + "</td>"
      html += "<td>" + humility + "</td>"
      html += "</tr>"
       
      document.getElementById("to_we").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#to_aggr").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f07e2292e400173b6dac'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let labelling = data.aggrgation[0].labelling
      let pricing = data.aggrgation[0].pricing
      let market_linage = data.aggrgation[0].market_linage
      let off_taker = data.aggrgation[0].off_taker
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "labelling" + "</td>"
      html += "<td>" + labelling + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "pricing" + "</td>"
      html += "<td>" + pricing + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "market_linage" + "</td>"
      html += "<td>" + market_linage + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "off_taker" + "</td>"
      html += "<td>" + off_taker + "</td>"
      html += "</tr>"
       
      document.getElementById("to_aggr").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });



    $("#to_mtg").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f07e2292e400173b6dac'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let weedControl = data.cropManagement[0].weedControl
      let fertilizerApplication = data.cropManagement[0].fertilizerApplication
      let cpp = data.cropManagement[0].cpp
      let pest_disease_control = data.cropManagement[0].pest_disease_control
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "weedControl" + "</td>"
      html += "<td>" + weedControl + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "fertilizer Application" + "</td>"
      html += "<td>" + fertilizerApplication + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "CPP" + "</td>"
      html += "<td>" + cpp + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "Pest-Disease Control" + "</td>"
      html += "<td>" + pest_disease_control + "</td>"
      html += "</tr>"
       
      document.getElementById("to_mtg").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#to_harv").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f07e2292e400173b6dac'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let threshing = data.postHarvest[0].threshing
      let drying = data.postHarvest[0].drying
      let packaging = data.postHarvest[0].packaging
      let storage = data.postHarvest[0].storage
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "threshing" + "</td>"
      html += "<td>" + threshing + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "drying" + "</td>"
      html += "<td>" + drying + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "packaging" + "</td>"
      html += "<td>" + packaging + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "storage" + "</td>"
      html += "<td>" + storage + "</td>"
      html += "</tr>"
       
      document.getElementById("to_harv").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#to_input").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f07e2292e400173b6dac'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let seedSelection = data.input[0].seedSelection
      let seedSource = data.input[0].seedSource
      let fertilizer = data.input[0].fertilizer
      let herbicides = data.input[0].herbicides
      let cropProtectionProduct = data.input[0].cropProtectionProduct
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "seed Selection" + "</td>"
      html += "<td>" + seedSelection + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "seed Source" + "</td>"
      html += "<td>" + seedSource + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "fertilizer" + "</td>"
      html += "<td>" + fertilizer + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "herbicides" + "</td>"
      html += "<td>" + herbicides + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "crop Protection Product" + "</td>"
      html += "<td>" + cropProtectionProduct + "</td>"
      html += "</tr>"
       
      document.getElementById("to_input").innerHTML = html;
      Swal.close();
      }).catch((error) => {
        console.error('Error:', error);
      });
    });
  })
  Swal.close();

}



// sorghum GAP content
function sorghumGapSwal(params) {
    swal.fire({
      title: 'Loading Sorghum Data',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then(function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      var random_id = function  () 
      {
        var id_num = Math.random().toString(9).substr(2,3);
        var id_str = Math.random().toString(36).substr(2);
        
        return id_num + id_str;
      } 

    $("#sorghum_pro_table").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e66044d2ac52800173cfe52'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let landSelection = data.production[0].landSelection
      let landPreparation = data.production[0].landPreparation
      let plantingTechnique = data.production[0].plantingTechnique
      let harvesting = data.production[0].harvesting
      let mechanization = data.production[0].mechanization
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "land Selection" + "</td>"
      html += "<td>" + landSelection + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "land Preparation" + "</td>"
      html += "<td>" + landPreparation + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "planting Technique" + "</td>"
      html += "<td>" + plantingTechnique + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "harvesting" + "</td>"
      html += "<td>" + harvesting + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "mechanization" + "</td>"
      html += "<td>" + mechanization + "</td>"
      html += "</tr>"
       
      document.getElementById("sorghum_pro_table").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#sorghum_wc_table").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e66044d2ac52800173cfe52'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let temperature = data.weather_climate[0].temperature
      let rainfall = data.weather_climate[0].rainfall
      let humility = data.weather_climate[0].humility
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "temperature" + "</td>"
      html += "<td>" + temperature + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "rainfall" + "</td>"
      html += "<td>" + rainfall + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "humility" + "</td>"
      html += "<td>" + humility + "</td>"
      html += "</tr>"
       
      document.getElementById("sorghum_wc_table").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#sorghum_aggre_table").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e66044d2ac52800173cfe52'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let labelling = data.aggrgation[0].labelling
      let pricing = data.aggrgation[0].pricing
      let market_linage = data.aggrgation[0].market_linage
      let off_taker = data.aggrgation[0].off_taker
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "labelling" + "</td>"
      html += "<td>" + labelling + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "pricing" + "</td>"
      html += "<td>" + pricing + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "market_linage" + "</td>"
      html += "<td>" + market_linage + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "off_taker" + "</td>"
      html += "<td>" + off_taker + "</td>"
      html += "</tr>"
       
      document.getElementById("sorghum_aggre_table").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });



    $("#sorghum_cropMgt_table").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e66044d2ac52800173cfe52'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let weedControl = data.cropManagement[0].weedControl
      let fertilizerApplication = data.cropManagement[0].fertilizerApplication
      let cpp = data.cropManagement[0].cpp
      let pest_disease_control = data.cropManagement[0].pest_disease_control
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "weedControl" + "</td>"
      html += "<td>" + weedControl + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "fertilizer Application" + "</td>"
      html += "<td>" + fertilizerApplication + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "CPP" + "</td>"
      html += "<td>" + cpp + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "Pest-Disease Control" + "</td>"
      html += "<td>" + pest_disease_control + "</td>"
      html += "</tr>"
       
      document.getElementById("sorghum_cropMgt_table").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#sorghum_ph_table").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e66044d2ac52800173cfe52'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let threshing = data.postHarvest[0].threshing
      let drying = data.postHarvest[0].drying
      let packaging = data.postHarvest[0].packaging
      let storage = data.postHarvest[0].storage
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "threshing" + "</td>"
      html += "<td>" + threshing + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "drying" + "</td>"
      html += "<td>" + drying + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "packaging" + "</td>"
      html += "<td>" + packaging + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "storage" + "</td>"
      html += "<td>" + storage + "</td>"
      html += "</tr>"
       
      document.getElementById("sorghum_ph_table").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#sorghum_input_table").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e66044d2ac52800173cfe52'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let seedSelection = data.input[0].seedSelection
      let seedSource = data.input[0].seedSource
      let fertilizer = data.input[0].fertilizer
      let herbicides = data.input[0].herbicides
      let cropProtectionProduct = data.input[0].cropProtectionProduct
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "seed Selection" + "</td>"
      html += "<td>" + seedSelection + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "seed Source" + "</td>"
      html += "<td>" + seedSource + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "fertilizer" + "</td>"
      html += "<td>" + fertilizer + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "herbicides" + "</td>"
      html += "<td>" + herbicides + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "crop Protection Product" + "</td>"
      html += "<td>" + cropProtectionProduct + "</td>"
      html += "</tr>"
       
      document.getElementById("sorghum_input_table").innerHTML = html;
      Swal.close();
      }).catch((error) => {
        console.error('Error:', error);
      });
    });
  })
  Swal.close();

}




// ground GAP content
function groudnutGapSwal(params) {
    swal.fire({
      title: 'Loading Tomatoes Data',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then(function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      var random_id = function  () 
      {
        var id_num = Math.random().toString(9).substr(2,3);
        var id_str = Math.random().toString(36).substr(2);
        
        return id_num + id_str;
      } 

    $("#groundnut_pro").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f01f2292e400173b6dab'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let landSelection = data.production[0].landSelection
      let landPreparation = data.production[0].landPreparation
      let plantingTechnique = data.production[0].plantingTechnique
      let harvesting = data.production[0].harvesting
      let mechanization = data.production[0].mechanization
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "land Selection" + "</td>"
      html += "<td>" + landSelection + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "land Preparation" + "</td>"
      html += "<td>" + landPreparation + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "planting Technique" + "</td>"
      html += "<td>" + plantingTechnique + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "harvesting" + "</td>"
      html += "<td>" + harvesting + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "mechanization" + "</td>"
      html += "<td>" + mechanization + "</td>"
      html += "</tr>"
       
      document.getElementById("groundnut_pro").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#groundnut_wc").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f01f2292e400173b6dab'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let temperature = data.weather_climate[0].temperature
      let rainfall = data.weather_climate[0].rainfall
      let humility = data.weather_climate[0].humility
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "temperature" + "</td>"
      html += "<td>" + temperature + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "rainfall" + "</td>"
      html += "<td>" + rainfall + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "humility" + "</td>"
      html += "<td>" + humility + "</td>"
      html += "</tr>"
       
      document.getElementById("groundnut_wc").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#groundnut_aggre").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f01f2292e400173b6dab'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let labelling = data.aggrgation[0].labelling
      let pricing = data.aggrgation[0].pricing
      let market_linage = data.aggrgation[0].market_linage
      let off_taker = data.aggrgation[0].off_taker
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "labelling" + "</td>"
      html += "<td>" + labelling + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "pricing" + "</td>"
      html += "<td>" + pricing + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "market_linage" + "</td>"
      html += "<td>" + market_linage + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "off_taker" + "</td>"
      html += "<td>" + off_taker + "</td>"
      html += "</tr>"
       
      document.getElementById("groundnut_aggre").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });



    $("#groundnut_cmt").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f01f2292e400173b6dab'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let weedControl = data.cropManagement[0].weedControl
      let fertilizerApplication = data.cropManagement[0].fertilizerApplication
      let cpp = data.cropManagement[0].cpp
      let pest_disease_control = data.cropManagement[0].pest_disease_control
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "weedControl" + "</td>"
      html += "<td>" + weedControl + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "fertilizer Application" + "</td>"
      html += "<td>" + fertilizerApplication + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "CPP" + "</td>"
      html += "<td>" + cpp + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "Pest-Disease Control" + "</td>"
      html += "<td>" + pest_disease_control + "</td>"
      html += "</tr>"
       
      document.getElementById("groundnut_cmt").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#groundnut_ph").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f01f2292e400173b6dab'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let threshing = data.postHarvest[0].threshing
      let drying = data.postHarvest[0].drying
      let packaging = data.postHarvest[0].packaging
      let storage = data.postHarvest[0].storage
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "threshing" + "</td>"
      html += "<td>" + threshing + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "drying" + "</td>"
      html += "<td>" + drying + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "packaging" + "</td>"
      html += "<td>" + packaging + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "storage" + "</td>"
      html += "<td>" + storage + "</td>"
      html += "</tr>"
       
      document.getElementById("groundnut_ph").innerHTML = html;
        
      }).catch((error) => {
        console.error('Error:', error);
      });
    });


    $("#groundnut_input").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e65f01f2292e400173b6dab'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        var row_id = random_id();
        // console.log(data.input[0])
        //--->create data table > start
      let seedSelection = data.input[0].seedSelection
      let seedSource = data.input[0].seedSource
      let fertilizer = data.input[0].fertilizer
      let herbicides = data.input[0].herbicides
      let cropProtectionProduct = data.input[0].cropProtectionProduct
      
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "seed Selection" + "</td>"
      html += "<td>" + seedSelection + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "seed Source" + "</td>"
      html += "<td>" + seedSource + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "fertilizer" + "</td>"
      html += "<td>" + fertilizer + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "herbicides" + "</td>"
      html += "<td>" + herbicides + "</td>"
      html += "</tr>"
      html += "<tr>";
      html += "<td></td>"
      html += "<td>" + "crop Protection Product" + "</td>"
      html += "<td>" + cropProtectionProduct + "</td>"
      html += "</tr>"
       
      document.getElementById("groundnut_input").innerHTML = html;
      Swal.close();
      }).catch((error) => {
        console.error('Error:', error);
      });
    });
  })
  Swal.close();

}




function lat_lon_weather(params) {


  let lat_value = document.getElementById('latitude_input_field').value;
  let long_value = document.getElementById('longitude_input_field').value;
  let regExp = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
  const matches = lat_value.match(regExp);
  console.log(matches)
  if(lat_value == '' || long_value == ''){
    swal.fire({
      title: 'Each field must not be empty',
      text: 'Please fill both input fields',
      timer: 4000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    })
  }
  swal.fire({
    title: 'Loading Weather Data',
    text: 'Please wait...',
    timer: 3000,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: 'info'
  }).then(function() {
    Swal.fire({
      title: "Please wait",
      text: "Loading data ....",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    fetch('https://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat_value + '&lon=' + long_value + '&cnt=10&appid=e447d989b428a1c47bc5e499d121de84')
    .then( response => response.json())
    .then(data => {
      console.log(data);
      var allDays= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var d = new Date(data.list[0].dt * 1000); // to get the DateTime. 
      var day2 = new Date(data.list[1].dt * 1000); // to get the DateTime. 
      var day3 = new Date(data.list[2].dt * 1000); // to get the DateTime. 
      var day4 = new Date(data.list[3].dt * 1000); // to get the DateTime. 
      var day5 = new Date(data.list[4].dt * 1000); // to get the DateTime. 
      var day6 = new Date(data.list[5].dt * 1000); // to get the DateTime. 
      var day7 = new Date(data.list[6].dt * 1000); // to get the DateTime. 
      var day8 = new Date(data.list[7].dt * 1000); // to get the DateTime. 
      var day9 = new Date(data.list[8].dt * 1000); // to get the DateTime. 
      var day10 = new Date(data.list[9].dt * 1000); // to get the DateTime. 
      var dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName2 = allDays[day2.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName3 = allDays[day3.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName4 = allDays[day4.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName5 = allDays[day5.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName6 = allDays[day6.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName7 = allDays[day7.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName8 = allDays[day8.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName9 = allDays[day9.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName10 = allDays[day10.getDay()]; // It will give day index, and based on index we can get day name from the array. 


      let temp = data.list[0].temp.max - 275;
      currentTemp = temp.toFixed(1)
      let humid = data.list[0].humidity;
      let city_name = data.city.name;
      descrip = data.list[0].weather[0].main;
      main = data.list[0].weather[0].description;
      icon = data.list[0].weather[0].icon;
      time = data.list[0].dt;
      rain = data.list[0].rain ? data.list[0].rain: 'not available';
      console.log(city_name)
    

      let temp1 = data.list[1].temp.max - 275;
      currentTemp1 = temp1.toFixed(1)
      let humid1 = data.list[1].humidity;
      let city_name1 = data.city.name;
      time1 = data.list[1].dt;
      rain1 = data.list[1].rain ? data.list[1].rain: 'not available';
      descrip1 = data.list[1].weather[0].description
      main1 = data.list[1].weather[0].description;
      icon1 = data.list[1].weather[0].icon;


      let temp2 = data.list[2].temp.max - 275;
      currentTemp2 = temp2.toFixed(1)
      let humid2 = data.list[2].humidity;
      time2 = data.list[2].dt;
      rain2 = data.list[2].rain ? data.list[2].rain: 'not available';
      descrip2 = data.list[2].weather[0].description
      main2 = data.list[2].weather[0].description;
      icon2 = data.list[2].weather[0].icon;


      let temp3 = data.list[3].temp.max - 275;
      currentTemp3 = temp3.toFixed(1)
      let humid3 = data.list[3].humidity;
      time3 = data.list[3].dt;
      rain3 = data.list[3].rain ? data.list[3].rain: 'not available';
      descrip3 = data.list[3].weather[0].description
      main3 = data.list[3].weather[0].description;
      icon3 = data.list[3].weather[0].icon;


      let temp4 = data.list[4].temp.max - 275;
      currentTemp4 = temp4.toFixed(1)
      let humid4 = data.list[4].humidity;
      time4 = data.list[4].dt;
      rain4 = data.list[4].rain ? data.list[4].rain: 'not available';
      descrip4 = data.list[4].weather[0].description
      main4 = data.list[4].weather[0].description;
      icon4 = data.list[4].weather[0].icon;


      let temp5 = data.list[5].temp.max - 275;
      currentTemp5 = temp5.toFixed(1)
      let humid5 = data.list[5].humidity;
      time5 = data.list[5].dt;
      rain5 = data.list[5].rain ? data.list[5].rain: 'not available';
      descrip5 = data.list[5].weather[0].description
      main5 = data.list[5].weather[0].description;
      icon5 = data.list[5].weather[0].icon;


      let temp6 = data.list[6].temp.max - 275;
      currentTemp6 = temp6.toFixed(1)
      let humid6 = data.list[6].humidity;
      time6 = data.list[6].dt;
      rain6 = data.list[6].rain ? data.list[6].rain: 'not available';
      descrip6 = data.list[6].weather[0].description
      main6 = data.list[6].weather[0].description;
      icon6 = data.list[6].weather[0].icon;


      let temp7 = data.list[7].temp.max - 275;
      currentTemp7 = temp7.toFixed(1)
      let humid7 = data.list[7].humidity;
      time7 = data.list[7].dt;
      rain7 = data.list[7].rain ? data.list[7].rain: 'not available';
      descrip7 = data.list[7].weather[0].description
      main7 = data.list[7].weather[0].description;
      icon7 = data.list[7].weather[0].icon;


      let temp8 = data.list[8].temp.max - 275;
      currentTemp8 = temp8.toFixed(1)
      let humid8 = data.list[8].humidity;
      time8 = data.list[8].dt;
      rain8 = data.list[8].rain ? data.list[8].rain: 'not available';
      descrip8 = data.list[8].weather[0].description
      main8 = data.list[8].weather[0].description;
      icon8 = data.list[8].weather[0].icon;


      let temp9 = data.list[9].temp.max - 275;
      currentTemp9 = temp9.toFixed(1)
      let humid9 = data.list[9].humidity;
      time9 = data.list[9].dt;
      rain9 = data.list[9].rain ? data.list[9].rain: 'not available';
      descrip9 = data.list[9].weather[0].description
      main9 = data.list[9].weather[0].description;
      icon9 = data.list[9].weather[0].icon;

     
    
    var info = "<p class='weather_cotainer'> " + "<img src='https://openweathermap.org/img/w/" + icon + ".png'>" +  " <br>" + "Temp: " + currentTemp + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid + " <br>" +   " Rains: " + rain + " <br>" + "Weather: " + (descrip).toUpperCase() +  " <br>" + "Day: "+ dayName + "</p>";

    var info1 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon1 + ".png'>" +  " <br>" +  " Temp: " + currentTemp1 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid1 + " <br>" +  " Rains: " + rain1 + " <br>" + "Weather: " + (descrip1).toUpperCase() + " <br>" + "Day: "+ dayName2 + "</p>";

    var info2 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon2 + ".png'>" +  " <br>" +  "Temp: " + currentTemp2 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid2 + " <br>" + " Rains: " + rain2 + " <br>" + "Weather: " + (descrip2).toUpperCase() + " <br>" + "Day: "+ dayName3 + "</p>";

    var info3 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon3 + ".png'>" +  " <br>" +  "Temp: " + currentTemp3 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid3 + " <br>" + " Rains: " + rain3 + "<br>" + "Weather: " + (descrip3).toUpperCase() + " <br>" + "Day: "+ dayName4 + "</p>";


    var info4 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon4 + ".png'>" +  " <br>" +  "Temp: " + currentTemp4 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid4 + " <br>" + " Rains: " + rain4 + "<br>" + "Weather: " + (descrip4).toUpperCase() + " <br>" + "Day: "+ dayName5 + "</p>";


    var info5 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon5 + ".png'>" +  " <br>" +  "Temp: " + currentTemp5 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid5 + " <br>" + " Rains: " + rain5 + "<br>" + "Weather: " + (descrip5).toUpperCase() + " <br>" + "Day: "+ dayName6 + "</p>";


    var info6 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon6 + ".png'>" +  " <br>" +  "Temp: " + currentTemp6 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid6 + " <br>" + " Rains: " + rain6 + "<br>" + "Weather: " + (descrip6).toUpperCase() + " <br>" + "Day: "+ dayName7 + "</p>";


    var info7 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon7 + ".png'>" +  " <br>" +  "Temp: " + currentTemp7 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid7 + " <br>" + " Rains: " + rain7 + "<br>" + "Weather: " + (descrip7).toUpperCase() + " <br>" + "Day: "+ dayName8 + "</p>";


    var info8 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon8 + ".png'>" +  " <br>" +  "Temp: " + currentTemp8 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid8 + " <br>" + " Rains: " + rain8 + "<br>" + "Weather: " + (descrip8).toUpperCase() + " <br>" + "Day: "+ dayName9 + "</p>";

    var info9 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon9 + ".png'>" +  " <br>" +  "Temp: " + currentTemp9 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid9 + " <br>" + " Rains: " + rain9 + "<br>" + "Weather: " + (descrip9).toUpperCase() + " <br>" + "Day: "+ dayName10 + "</p>";



    $("#first_log_lat_weather_section").html(info);
    $("#second_log_lat_weather_section").html(info1);
    $("#third_log_lat_weather_section").html(info2);
    $("#fourth_log_lat_weather_section").html(info3);
    $("#fifth_log_lat_weather_section").html(info4);
    $("#sixth_log_lat_weather_section").html(info5);
    $("#seventh_log_lat_weather_section").html(info6);
    $("#eigth_log_lat_weather_section").html(info7);
    $("#nineth_log_lat_weather_section").html(info8);
    $("#tenth_log_lat_weather_section").html(info9);
   
    })

    Swal.close();
  });
};

// weather content
function weather(params) {
    swal.fire({
      title: 'Loading Weather Data',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then(function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      states = ['abuja', 'adamawa', 'gombe', 'nasarawa'];
  
     states.forEach((state) => {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + state + '&appid=e447d989b428a1c47bc5e499d121de84')
      .then(response => response.json())
      .then(data => {
      let temp = data['main']['temp'] - 275;
      currentTemp = temp.toFixed(1)
      icon = data.weather[0].icon;
      var d = new Date(data.dt * 1000); // to get the DateTime.
      var myDate = new Date(d);
      var local_date = myDate.toGMTString()
      var info = "<p>" + "<img src='https://openweathermap.org/img/w/" + icon + ".png'>"  +  " <br>" +"Temp: " + currentTemp + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + data['main']['humidity'] + " <br>" + "Weather: " + (data.weather[0].description).toUpperCase() +   " <br>" +  " Humidity: " + data['main']['humidity'] + " <br>" + local_date +"</p>";
      switch(state) {
        case 'abuja':
          // code block
          $("#abuja_info").html(info);
          break;
        case 'adamawa':
          // code block
          $("#adamawa_info").html(info);
          break;
        case 'gombe':
          // code block
          $("#gombe_info").html(info);
          break;
        case 'nasarawa':
          // code block
          $("#nasa_info").html(info);
          break;
        default:
          // code block
          swal({
            title: 'No Data',
            text: 'No information available',
            icon: 'info',
            timer: 500
          })
      }
     
     })

    })
    
      
    
    Swal.close();
  })

}

// weather forcast
function weatherForcast(params) {
  swal.fire({
    title: 'Loading Weather Data',
    text: 'Please wait...',
    timer: 3000,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: 'info'
  }).then(function() {
    Swal.fire({
      title: "Please wait",
      text: "Loading data ....",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    let stateForcast = $('#weather_forcaste').val();
    fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q='+stateForcast+'&appid=e447d989b428a1c47bc5e499d121de84&cnt=10')
    .then(response => response.json())
    .then(data => {
      var allDays= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var d = new Date(data.list[0].dt * 1000); // to get the DateTime. 
      var day2 = new Date(data.list[1].dt * 1000); // to get the DateTime. 
      var day3 = new Date(data.list[2].dt * 1000); // to get the DateTime. 
      var day4 = new Date(data.list[3].dt * 1000); // to get the DateTime. 
      var day5 = new Date(data.list[4].dt * 1000); // to get the DateTime. 
      var day6 = new Date(data.list[5].dt * 1000); // to get the DateTime. 
      var day7 = new Date(data.list[6].dt * 1000); // to get the DateTime. 
      var day8 = new Date(data.list[7].dt * 1000); // to get the DateTime. 
      var day9 = new Date(data.list[8].dt * 1000); // to get the DateTime. 
      var day10 = new Date(data.list[9].dt * 1000); // to get the DateTime. 
      var dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName2 = allDays[day2.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName3 = allDays[day3.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName4 = allDays[day4.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName5 = allDays[day5.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName6 = allDays[day6.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName7 = allDays[day7.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName8 = allDays[day8.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName9 = allDays[day9.getDay()]; // It will give day index, and based on index we can get day name from the array. 
      var dayName10 = allDays[day10.getDay()]; // It will give day index, and based on index we can get day name from the array. 


      let temp = data.list[0].temp.max - 275;
      currentTemp = temp.toFixed(1)
      let humid = data.list[0].humidity;
      let city_name = data.city.name;
      descrip = data.list[0].weather[0].main;
      main = data.list[0].weather[0].description;
      icon = data.list[0].weather[0].icon;
      time = data.list[0].dt;
      rain = data.list[0].rain ? data.list[0].rain: 'not available';
    

      let temp1 = data.list[1].temp.max - 275;
      currentTemp1 = temp1.toFixed(1)
      let humid1 = data.list[1].humidity;
      let city_name1 = data.city.name;
      time1 = data.list[1].dt;
      rain1 = data.list[1].rain ? data.list[1].rain: 'not available';
      descrip1 = data.list[1].weather[0].description
      main1 = data.list[1].weather[0].description;
      icon1 = data.list[1].weather[0].icon;


      let temp2 = data.list[2].temp.max - 275;
      currentTemp2 = temp2.toFixed(1)
      let humid2 = data.list[2].humidity;
      time2 = data.list[2].dt;
      rain2 = data.list[2].rain ? data.list[2].rain: 'not available';
      descrip2 = data.list[2].weather[0].description
      main2 = data.list[2].weather[0].description;
      icon2 = data.list[2].weather[0].icon;


      let temp3 = data.list[3].temp.max - 275;
      currentTemp3 = temp3.toFixed(1)
      let humid3 = data.list[3].humidity;
      time3 = data.list[3].dt;
      rain3 = data.list[3].rain ? data.list[3].rain: 'not available';
      descrip3 = data.list[3].weather[0].description
      main3 = data.list[3].weather[0].description;
      icon3 = data.list[3].weather[0].icon;


      let temp4 = data.list[4].temp.max - 275;
      currentTemp4 = temp4.toFixed(1)
      let humid4 = data.list[4].humidity;
      time4 = data.list[4].dt;
      rain4 = data.list[4].rain ? data.list[4].rain: 'not available';
      descrip4 = data.list[4].weather[0].description
      main4 = data.list[4].weather[0].description;
      icon4 = data.list[4].weather[0].icon;


      let temp5 = data.list[5].temp.max - 275;
      currentTemp5 = temp5.toFixed(1)
      let humid5 = data.list[5].humidity;
      time5 = data.list[5].dt;
      rain5 = data.list[5].rain ? data.list[5].rain: 'not available';
      descrip5 = data.list[5].weather[0].description
      main5 = data.list[5].weather[0].description;
      icon5 = data.list[5].weather[0].icon;


      let temp6 = data.list[6].temp.max - 275;
      currentTemp6 = temp6.toFixed(1)
      let humid6 = data.list[6].humidity;
      time6 = data.list[6].dt;
      rain6 = data.list[6].rain ? data.list[6].rain: 'not available';
      descrip6 = data.list[6].weather[0].description
      main6 = data.list[6].weather[0].description;
      icon6 = data.list[6].weather[0].icon;


      let temp7 = data.list[7].temp.max - 275;
      currentTemp7 = temp7.toFixed(1)
      let humid7 = data.list[7].humidity;
      time7 = data.list[7].dt;
      rain7 = data.list[7].rain ? data.list[7].rain: 'not available';
      descrip7 = data.list[7].weather[0].description
      main7 = data.list[7].weather[0].description;
      icon7 = data.list[7].weather[0].icon;


      let temp8 = data.list[8].temp.max - 275;
      currentTemp8 = temp8.toFixed(1)
      let humid8 = data.list[8].humidity;
      time8 = data.list[8].dt;
      rain8 = data.list[8].rain ? data.list[8].rain: 'not available';
      descrip8 = data.list[8].weather[0].description
      main8 = data.list[8].weather[0].description;
      icon8 = data.list[8].weather[0].icon;


      let temp9 = data.list[9].temp.max - 275;
      currentTemp9 = temp9.toFixed(1)
      let humid9 = data.list[9].humidity;
      time9 = data.list[9].dt;
      rain9 = data.list[9].rain ? data.list[9].rain: 'not available';
      descrip9 = data.list[9].weather[0].description
      main9 = data.list[9].weather[0].description;
      icon9 = data.list[9].weather[0].icon;

     
    
    var info = "<p class='weather_cotainer'> " + "<img src='https://openweathermap.org/img/w/" + icon + ".png'>" +  " <br>" + "Temp: " + currentTemp + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid + " <br>" +   " Rains: " + rain + " <br>" + "Weather: " + (descrip).toUpperCase() +  " <br>" + "Day: "+ dayName + "</p>";

    var info1 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon1 + ".png'>" +  " <br>" +  " Temp: " + currentTemp1 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid1 + " <br>" +  " Rains: " + rain1 + " <br>" + "Weather: " + (descrip1).toUpperCase() + " <br>" + "Day: "+ dayName2 + "</p>";

    var info2 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon2 + ".png'>" +  " <br>" +  "Temp: " + currentTemp2 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid2 + " <br>" + " Rains: " + rain2 + " <br>" + "Weather: " + (descrip2).toUpperCase() + " <br>" + "Day: "+ dayName3 + "</p>";

    var info3 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon3 + ".png'>" +  " <br>" +  "Temp: " + currentTemp3 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid3 + " <br>" + " Rains: " + rain3 + "<br>" + "Weather: " + (descrip3).toUpperCase() + " <br>" + "Day: "+ dayName4 + "</p>";


    var info4 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon4 + ".png'>" +  " <br>" +  "Temp: " + currentTemp4 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid4 + " <br>" + " Rains: " + rain4 + "<br>" + "Weather: " + (descrip4).toUpperCase() + " <br>" + "Day: "+ dayName5 + "</p>";


    var info5 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon5 + ".png'>" +  " <br>" +  "Temp: " + currentTemp5 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid5 + " <br>" + " Rains: " + rain5 + "<br>" + "Weather: " + (descrip5).toUpperCase() + " <br>" + "Day: "+ dayName6 + "</p>";


    var info6 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon6 + ".png'>" +  " <br>" +  "Temp: " + currentTemp6 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid6 + " <br>" + " Rains: " + rain6 + "<br>" + "Weather: " + (descrip6).toUpperCase() + " <br>" + "Day: "+ dayName7 + "</p>";


    var info7 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon7 + ".png'>" +  " <br>" +  "Temp: " + currentTemp7 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid7 + " <br>" + " Rains: " + rain7 + "<br>" + "Weather: " + (descrip7).toUpperCase() + " <br>" + "Day: "+ dayName8 + "</p>";


    var info8 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon8 + ".png'>" +  " <br>" +  "Temp: " + currentTemp8 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid8 + " <br>" + " Rains: " + rain8 + "<br>" + "Weather: " + (descrip8).toUpperCase() + " <br>" + "Day: "+ dayName9 + "</p>";

    var info9 = "<p> " + "<img src='https://openweathermap.org/img/w/" + icon9 + ".png'>" +  " <br>" +  "Temp: " + currentTemp9 + "<span>" + " &#8451; " +"</span> " +  " <br>" +  " Humidity: " + humid9 + " <br>" + " Rains: " + rain9 + "<br>" + "Weather: " + (descrip9).toUpperCase() + " <br>" + "Day: "+ dayName10 + "</p>";



    $("#first_weather_section").html(info);
    $("#second_weather_section").html(info1);
    $("#third_weather_section").html(info2);
    $("#fourth_weather_section").html(info3);
    $("#fifth_weather_section").html(info4);
    $("#sixth_weather_section").html(info5);
    $("#seventh_weather_section").html(info6);
    $("#eigth_weather_section").html(info7);
    $("#nineth_weather_section").html(info8);
    $("#tenth_weather_section").html(info9);
   
   })
  
    
  
  Swal.close();
})

}

//MA msg dispatch
function load_ma_dispatch() {
  //Implement stub here
  let html = "";
    swal.fire({
      title: 'Loading Market Actors Approved Messages',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then(function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 2000
      }).then(_ => document.getElementById('ma_sms_dispatch').innerHTML = "<h2>Yes...</h2>");
      
    });
  
}

function create_msg_queue() {
  //
  console.log("Lots")
}

// Market Actor sms log sent for approval
function maSMS(params) {
  let html = "";
    swal.fire({
      title: 'Loading Market Actors Messages',
      text: 'Please wait...',
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    }).then(function() {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

   

    $("#ma_sms_log").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/masms'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        data.forEach( (datas) => {
          if(datas.status == "Pending") {
            let state = datas.state;
            let company = datas.company;
            let email = datas.email;
            let message = datas.msg;
            let dataId = datas._id;
            let date =  new Date(datas.date)
            newDate = date.getMonth() + 1 + "/"  +  date.getDate() + "/" + date.getFullYear() + " "
            console.log(dataId)
  
            html += "<tr>";
            html += "<td></td>"
            html += "<td>" + company + "</td>"
            html += "<td>" + email + "</td>"
            html += "<td>" + state + "</td>"
            html += '<td>' + message + '</td>'
            html += "<td>" + newDate + "</td>"
            html += '<td><span style="color:#fff; background-color: green; padding:5px; border-radius:8px; cursor:pointer; box-shadow: 5px 5px #888888;" onclick="ma_approve(event);" data_id=' + `${dataId}` + '> Approve' + '</span> <hr>' 
            html += '<span style="color:#fff; background-color: red; padding:5px; border-radius:8px; cursor:pointer; box-shadow: 5px 5px #888888;" class="is-button" onclick="ma_reject(event);" data_id=' + `${dataId}` + '>' +  ' Reject' + '</span></td>'
            html += "</tr>"
           
            document.getElementById("ma_sms_log").innerHTML = html;
          
          }
        })
        
        Swal.close();
      }).catch((error) => {
        console.error('Error:', error);
      });
    });
 
  })

}

// on clikc of approval button 

function ma_approve(e) {
 let keen = $(e.target).attr('data_id')
  swal.fire({
    title: 'You Approved this message',
    text: 'Please wait...',
    timer: 3000,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: 'info'
  }).then((_) => {
      swal.fire({
        title: "Approved Message is been sent",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      Swal.close();
  })

 }

//   on click to reject button

function ma_reject(e) {
  let keen = $(e.target).attr('data_id')
   swal.fire({
     title: 'You Rejected this message',
     text: 'Please wait...',
     timer: 3000,
     allowOutsideClick: false,
     showConfirmButton: false,
     icon: 'info'
   }).then(function() {
     swal.fire({
       title: "Market Actor would br notified Message was Rejected",
       text: "Loading data ....",
       icon: "info",
       allowOutsideClick: false,
       showConfirmButton: false,
     });
 
 
     Swal.close();
   })
 
  }