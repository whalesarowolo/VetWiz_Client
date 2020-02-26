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
              //For propcom dashboard
              history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/propcom.html");
              //history.pushState({ "logged_in": true, "ifAdmin": false }, "Dashboard", "/dashboard.html");
              window.location.replace("/propcom.html");
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


$("#farm_table").ready(function() {

  const url = 'https://farm-aid-backend.herokuapp.com/api/farmer'
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);
  // create an element
// const createNode = (elem) => {
//   return document.createElement(elem);
// };

// // append an element to parent
// const appendNode = (parent, elem) => {
//   parent.appendChild(elem);
// }

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
  }).catch((error) => {
    console.error('Error:', error);
  });
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

})
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

})
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

})
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

})
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
      if(users.bizCategory == "agronomist") {
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
      } else if(users.bizCategory == '') {
        html += "<h1>" + "No Agro_Dealer has signup Yet" + "</h1>"
        document.getElementById("nullSeed").innerHTML = html;
      }
    })
    
  })

})
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

})
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

})
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

})

