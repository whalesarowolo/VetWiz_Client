// onClick event for sign up button
$("#ussdFarmer_submit").on('click', function(e) {

    let firstname = $('#ussd_firstname').val().trim();
    let lastname = $('#ussd_lastname').val().trim();
    let phonNum = $('#ussd_phoneNumber').val();
    let state = $('#ussd_state').val().trim();
    let lga = $('#ussd_lga').val().trim();
    let crop = $('#ussd_crop').val();
    const gender = $('#ussd_gender').val().trim();
    const farm_size = $('#ussd_farmSize').val().trim();
    var numbers = /^[0-9]+$/;

console.log(firstname, lastname, phonNum, state, lga, crop, gender, farm_size);

    // validate empty input
    if(firstname == "" || lastname == "" || phonNum == "" || state == "" ||  lga == "" || crop == "" || gender == "" || farm_size =="") {
      $("#login-form").addClass('is-hidden');
      swal.fire({
        title: 'Error Authenticating',
        text: 'You must provide all credentials',
        icon: 'warning',
        timer: 2100
      }).then(()=> {
        $("#login-form").toggleClass('is-hidden');
      });
      return false;
    }

    if(phonNum < 10) {
      $("#login-form").addClass('is-hidden');
      swal.fire({
        title: 'Error Authenticating',
        text: 'Phone Number must not be less than 10 digit',
        icon: 'warning',
        timer: 3100
      }).then(()=> {
        $("#login-form").toggleClass('is-hidden');
      });
      return false;
    }
    // if(phonNum > 10) {
    //   $("#login-form").addClass('is-hidden');
    //   swal.fire({
    //     title: 'Error Authenticating',
    //     text: 'Phone Number must not be greater than 10 digit',
    //     icon: 'warning',
    //     timer: 3100
    //   }).then(()=> {
    //     $("#login-form").toggleClass('is-hidden');
    //   });
    //   return false;
    // }
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


    swal.showLoading('Please wait...');
  
      const url = 'https://farm-aid-backend.herokuapp.com/api/onboard';
  
      const user = {
        "firstname": firstname,
        "lastname":lastname,
        "phoneNumber":phonNum,
        "state":state,
        "lga":lga,
        "educational_level": "none",
        "crops":crop,
        "gender":gender,
       "farm_size":farm_size
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
              title: "Farmer Already Exist",
              text:   "Farmers Phone Number already exist in the database",
              icon: "info",
              timer: 3000
            })
          } else {

            Swal.fire({
              title: "Farmer On-Boarded",
              text:  "Farmer has been on_borded",
              icon: "info",
              timer: 3000
            })
          }
      })

  });

function ussdFarmer(params) {
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
        const url = 'https://farmed-php.herokuapp.com/ussd_farmers.php'
        const token = localStorage.getItem('access_token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
        fetch(url, {
          method: "GET",
          headers
        }).then(async (res) => res.json()).then(data => {
         
          console.log(data)
          Swal.close();
        }).catch((error) => {
          console.error('Error:', error);
        });
      });
   

    });
        // const url = 'https://farmed-php.herokuapp.com/ussd_farmers.php';
  
        // let response = await fetch(url);

        // if (response) { // if HTTP-status is 200-299
        // // get the response body (the method explained below)
        // swal.close();
        //     let json = await response.json();
        //     console.log(json);
        // } else {
        //     alert("HTTP-Error: " + response.status);
        //     swal.close();
        // }

  }