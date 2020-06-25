function updatePasword(event) {
    event.preventDefault();
    

    let update_email = document.getElementById("exampleInputEmail1").value
    let update_password = document.getElementById("InputPassword1").value
    let update_password_confirm = document.getElementById("InputPasswordConfrim").value
    console.log(update_email, update_password.length, update_password_confirm)

    if(update_email == "" || update_password == ""){
        swal({
            title: 'Error Authenticating',
            text: 'Please provide the required credentials',
            icon: 'warning',
            timer: 2100
          })
          return false;
    }

    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)) {
          return false;
        }else{
          return true;
        }
      }

      if (IsEmail(update_email)==false) {
        swal({
          title: 'Error Authenticating',
          text: 'Please provide a valid email address',
          icon: 'warning',
          timer: 3100
        })
        return false;
        }

        if(update_password_confirm !== update_password ){
            swal({
                title: 'Error Authenticating',
                text: 'Password must Match',
                icon: 'warning',
                timer: 3100
              })
              return false;
        }

        if(update_password.length < "6"){
            swal({
                title: 'Error Authenticating',
                text: 'Password must be more than 6 characters',
                icon: 'warning',
                timer: 3100
              })
              return false;
        }

        swal('Please wait...');

        const url = 'https://farm-aid-backend.herokuapp.com/api/users/updatePassword'

        let updatePasswordObj = {
            "email": update_email,
            "password":update_password
        }
        var request = new Request(url, {
            method: 'PATCH',
            body: JSON.stringify(updatePasswordObj),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          });

          fetch(request)
            .then(async (res) => {
            var resp = await res.json();
            console.log(resp)
            if(resp.status == 200){
            swal({
                title: "Password Updated Successfully",
                text:  `You can login now`,
                icon: "info",
                timer: 3500
            })

            window.location.href = "https://www.farmaid.net/login.html";
            }
            }).catch((e)=> {
            swal.close();
            console.log("Bad request...");
            });
            document.getElementById('exampleInputEmail1').value = "";
            document.getElementById('InputPassword1').value = "";
            document.getElementById('InputPasswordConfrim').value = "";
}