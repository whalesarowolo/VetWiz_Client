$(document).ready(function (e) {
    if ($("#register-form").length) {
        setTimeout(() => {
            console.log("About to");
            $(".infraloader").removeClass('is-active');
        }, 4000)
    } 


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
          $("#register-form").addClass('is-hidden');
          swal.fire({
            title: 'Error Processing',
            text: 'You must provide all credentials to register',
            icon: 'warning',
            timer: 2100
          }).then(()=> {
            $("#lregister-form").toggleClass('is-hidden');
          });
          return false;
        }
  
        if(phonNum < 11) {
          $("#register-form").addClass('is-hidden');
          swal.fire({
            title: 'Error Authenticating',
            text: 'Phone Number format is Invalid',
            icon: 'warning',
            timer: 3100
          }).then(()=> {
            $("#register-form").toggleClass('is-hidden');
          });
          return false;
        }
        if(!phonNum.match(numbers)) {
          $("#register-form").addClass('is-hidden');
          swal.fire({
            title: 'Error Authenticating',
            text: 'Phone Number must be number',
            icon: 'warning',
            timer: 3100
          }).then(()=> {
            $("#register-form").toggleClass('is-hidden');
          });
          return false;
        }
        if(password < 8) {
          $("#register-form").addClass('is-hidden');
          swal.fire({
            title: 'Error Authenticating',
            text: 'Password must be greater than 8 characters',
            icon: 'warning',
            timer: 3100
          }).then(()=> {
            $("#register-form").toggleClass('is-hidden');
          });
          return false;
        }
       
      if (IsEmail(email)==false) {
        $("#register-form").addClass('is-hidden');
        swal.fire({
          title: 'Error Authenticating',
          text: 'Please provide a valid email address',
          icon: 'warning',
          timer: 3100
        }).then(()=> {
          $("#register-form").toggleClass('is-hidden');
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
                }).then( _ => window.location.replace('/login.html'))
              }
          })
  
      })
  
      //  Sign Up logic ends here 


});