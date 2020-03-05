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
        console.log('Details... ' + useremail + ' ' + userpassword);
    
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
              var userObj = parseJwt(resp.token);
              //For propcom dashboard
              if(userObj.user.company == "propcom"){
                history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/propcom.html");
                //history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/dashboard.html");
                window.location.replace("/propcom.html");
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

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
    };

})


// send SMS 
function sendSMS(opts) {
  fetch('https://farm-aid-backend.herokuapp.com/api/send', {
    method: 'POST',
    body: JSON.stringify(opts),
    headers: new Headers()
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log('Sent: ', data);
  });
}

$("#send_messages").on('click', function(e) {
  var msg_content = $("#message_content").val();
  const msg = {
    "msg": msg_content,
  };
const url = 'https://farm-aid-backend.herokuapp.com/api/send'
  // create request object
  var request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(msg),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });

  // pass request object to `fetch()`
  fetch(request)
    .then(async (res) => {
      //$('.modal').css({ 'display': 'none' });
      var resp = await res.json();
      if(resp !== null){

        console.log(resp)
      }
    });

  // var msg_content = $("#message_content").val();
 // var msg =  "Message from FarmAid";

  // let url = 'http://localhost:5000/api/send';
 //msg = JSON.stringify(msg);

// sendSMS(msg);

//   $.ajax({
//     type: "POST",
//     url: url,
//     dataType: "json",
//     success: function (msg) {
//         if (msg) {
//             location.reload(true);
//         } else {
//             alert("Did'nt succeed");
//         }
//     },

//     body: msg
// });
  // create request object
  // var request = new Request(url, {
  //   method: 'POST',
  //   body: JSON.stringify(msg),
  //   headers: new Headers({
  //     'Content-Type': 'application/json'
  //   })
  // });

  // fetch(request).then()

  // fetch(request)
  //         .then(async (res) => {
  //           //$('.modal').css({ 'display': 'none' });
  //           var resp = await res.json();
  //           console.log("Returned response: ", resp);
  //         });
  // const url = 'https://farm-aid-backend.herokuapp.com/api/smap';
  // let to ;

  // fetch(url).then(async (res) => {
  //   //$('.modal').css({ 'display': 'none' });
  //   // implement logic to store in Database
  //   var resp = await res.json();
  //     to = resp.map(({ phone_number}) => `${phone_number}`)
  //     // console.log(resp.map(({ phone_number}) => `${phone_number}`));
  //     console.log(to)
     
  //  })
  //  .catch(function(error){
  //      console.log(error)
  //  })
  //
 })

 function farmerSwal(params) {
  if($("#main-dashboard").length){
     
  
   swal.fire({
    title: 'Loading Farmers Data',
    text: 'Please wait...',
    timer: 6000,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: 'info'
  }).then(function() {
    $("#mytable").fadeOut("fast");
    Swal.fire({
      title: "Please wait",
      text: "Loading data ....",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    $("#farm_table").ready(function() {
  
      const url = 'https://farm-aid-backend.herokuapp.com/api/farmer'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        let html = "";
        let table = "#mytable";
       data.map((farmer) => {
         let firstname = farmer.firstname;
         let lastname = farmer.lastname;
         let gender = farmer.gender;
         let phoNum = farmer.phoneNumber;
         let state = farmer.state;
         let lga = farmer.lga;
         let ms = farmer.marital_status;
         html += "<tr>";
         html += "<td></td>"
         html += "<td>" + firstname + "</td>"
         html += "<td>" + lastname + "</td>"
         html += "<td>" + gender + "</td>"
         html += "<td>" + phoNum + "</td>"
         html += "<td>" + state + "</td>"
         html += "<td>" + lga + "</td>"
         html += "<td>" + ms + "</td>"
         html += "</tr>"
        })
        document.getElementById("farm_table").innerHTML = html;
        $("#mytable").fadeIn("fast");
        var count = $('#farm_table tr').length;
        
        console.log(Math.round(count/2))
      }).catch((error) => {
        console.error('Error:', error);
      });
    })


    $("#total").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/farmer'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      let html = "";
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        console.log("gombe:" + data.length)
        html += "<span >" + "Total Number of Farmers: " + data.length  + "</span>"
      document.getElementById("total").innerHTML = html;
      // document.getElementById("total").style.color = "red";
      })
    })

    $("#gob").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/farmer/state/Gombe'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      let html = "";
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        console.log("gombe:" + data.length)
        html += "<span>" + "Total Number of Farmers in Gombe: " + data.length + "</span>"
      document.getElementById("gob").innerHTML = html;
      })
    })

    $("#ada").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/farmer/state/Adamawa'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      let html = "";
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        html += "<span>" + "Total Number of Farmers in Adamawa: " + data.length + "</span>"
      document.getElementById("ada").innerHTML = html;
      })
    })

    Swal.close();
  })
 }

}

$("#ada").ready(function() {
  const url = 'https://farm-aid-backend.herokuapp.com/api/farmer/state/Adamawa'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);
  let html = "";

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    html += "<span>" + "Total Number of Farmers in Adamawa: " + data.length + "</span>"
  document.getElementById("ada").innerHTML = html;
  })
})
$("#gob").ready(function() {
  const url = 'https://farm-aid-backend.herokuapp.com/api/farmer/state/Gombe'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);
  let html = "";

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    console.log("gombe:" + data.length)
    html += "<span>" + "Total Number of Farmers in Gombe: " + data.length + "</span>"
  document.getElementById("gob").innerHTML = html;
  })
})

$("#total").ready(function() {
  const url = 'https://farm-aid-backend.herokuapp.com/api/farmer'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);
  let html = "";

  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    console.log("gombe:" + data.length)
    html += "<span >" + "Total Number of Farmers: " + data.length  + "</span>"
  document.getElementById("total").innerHTML = html;
  // document.getElementById("total").style.color = "red";
  })
})

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
            } else if(users.bizCategory == '') {
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
            } else if(users.bizCategory == '') {
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
            } else if(users.bizCategory == '') {
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
            } else if(users.bizCategory == '') {
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
            } else if(users.bizCategory == '') {
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
            } else if(users.bizCategory == '') {
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
                if(users.bizCategory == "agro-dealer") {
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
                } else if(users.bizCategory == 'null') {
                  html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
                }
              })
              
            })
          
            Swal.close();
          })
    })
  }
}

function toGapSwal(params) {
  if($("#main-dashboard").length){
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
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e2afc0c5add721b548632c8'
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
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e2afc0c5add721b548632c8'
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
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e2afc0c5add721b548632c8'
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
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e2afc0c5add721b548632c8'
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
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e2afc0c5add721b548632c8'
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
      const url = 'https://farm-aid-backend.herokuapp.com/api/crop/5e2afc0c5add721b548632c8'
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
}


