// onClick event for sign up button
$("#ussdFarmer_submit").on('click', function(e) {

    let firstname = $('#ussd_firstname').val().trim();
    let lastname = $('#ussd_lastname').val().trim();
    let phonNum = $('#ussd_phoneNumber').val();
    let state = $('#ussd_state').val().trim();
    let lga = $('#ussd_lga').val().trim();
    let village = $('#ussd_village').val().trim();
    let disability = $('#ussd_disability').val().trim();
    let gender = $('#ussd_gender').val().trim();
    let marital = $('#ussd_marital').val().trim();
    let education = $('#ussd_education').val().trim();
    let farm_size = $('#ussd_farm_size').val();
    let farm_income = $('#ussd_farm_income').val();
    let birthday = $('#birthday').val();
    // var checkedValue = document.querySelector('.crops_input_value').val();
    var numbers = /^[0-9]+$/;

    var checkedCropValue=document.getElementsByName('acs');
				var selectedCropItems="";
				for(var i=0; i<checkedCropValue.length; i++){
					if(checkedCropValue[i].type=='checkbox' && checkedCropValue[i].checked==true)
          selectedCropItems+=checkedCropValue[i].value+", ";
        }
        
    var checkedAnimalValue=document.getElementsByName('animal_selection');
				var selectedAnimalItems="";
				for(var i=0; i<checkedAnimalValue.length; i++){
					if(checkedAnimalValue[i].type=='checkbox' && checkedAnimalValue[i].checked==true)
          selectedAnimalItems+=checkedAnimalValue[i].value+", ";
        }
        
    var checkedInfoValue=document.getElementsByName('info_selection');
				var selectedInfoItems="";
				for(var i=0; i<checkedInfoValue.length; i++){
					if(checkedInfoValue[i].type=='checkbox' && checkedInfoValue[i].checked==true)
          selectedInfoItems+=checkedInfoValue[i].value+", ";
				}
    

console.log(firstname, lastname, phonNum, state, lga, gender, farm_size, village, disability, selectedCropItems, selectedAnimalItems, birthday, selectedInfoItems, marital, education, farm_income);

    // validate empty input
    // if(firstname == "" || lastname == "" || phonNum == "" || state == "" ||  lga == "" || crop == "" || gender == "" || farm_size =="") {
    //   $("#login-form").addClass('is-hidden');
    //   swal.fire({
    //     title: 'Error Authenticating',
    //     text: 'You must provide all credentials',
    //     icon: 'warning',
    //     timer: 2100
    //   }).then(()=> {
    //     $("#login-form").toggleClass('is-hidden');
    //   });
    //   return false;
    // }

    // if(phonNum < 10) {
    //   $("#login-form").addClass('is-hidden');
    //   swal.fire({
    //     title: 'Error Authenticating',
    //     text: 'Phone Number must not be less than 10 digit',
    //     icon: 'warning',
    //     timer: 3100
    //   }).then(()=> {
    //     $("#login-form").toggleClass('is-hidden');
    //   });
    //   return false;
    // }
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
    // if(!phonNum.match(numbers)) {
    //   $("#login-form").addClass('is-hidden');
    //   swal.fire({
    //     title: 'Error Authenticating',
    //     text: 'Phone Number must be number',
    //     icon: 'warning',
    //     timer: 3100
    //   }).then(()=> {
    //     $("#login-form").toggleClass('is-hidden');
    //   });
    //   return false;
    // }


    // swal.showLoading('Please wait...');
  
      // const url = 'https://farm-aid-backend.herokuapp.com/api/onboard';
  
      // const user = {
      //   "firstname": firstname,
      //   "lastname":lastname,
      //   "phoneNumber":phonNum,
      //   "state":state,
      //   "lga":lga,
      //   "educational_level": "none",
      //   "crops":crop,
      //   "gender":gender,
      //  "farm_size":farm_size
      // };
  
      // create request object
      // var request = new Request(url, {
      //   method: 'POST',
      //   body: JSON.stringify(user),
      //   headers: new Headers({
      //     'Content-Type': 'application/json'
      //   })
      // });

      // fetch(request).then(async (res) => {
      //   let resp = await res.json();
      //     if(resp.status !== 201) {
      //       Swal.fire({
      //         title: "Farmer Already Exist",
      //         text:   "Farmers Phone Number already exist in the database",
      //         icon: "info",
      //         timer: 3000
      //       })
      //     } else {

      //       Swal.fire({
      //         title: "Farmer On-Boarded",
      //         text:  "Farmer has been on_borded",
      //         icon: "info",
      //         timer: 3000
      //       })
      //     }
      // })

  });

function ussdFarmer(params) {
    let html = "";
    swal.fire({
      title: 'Loading USSD farmers Records',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info'
    });


      $("#ussd_details_log").ready(function() {
        let record_html_body = ""
        const url = 'https://farmed-php.herokuapp.com/ussd_farmers.php';
        $.ajax({url: url, success: function(result){
          parsed = JSON.parse(result)
          console.log(parsed.length);
          if(parsed.length > 0){

            parsed.forEach((td) => {
              var state = (td.farmer_state != null)? td.farmer_state: 'N/A';
              var lga = (td.farmer_lga != null)? td.farmer_lga: 'N/A';
              var crops = (td.farmer_crops != null)? td.farmer_crops: 'N/A';
              record_html_body += "<tr>";
              record_html_body +=  "<td> </td>";
              record_html_body +=  "<td>" + td.phone_number +  "</td>";
              record_html_body +=  "<td>" + state + "</td>";
              record_html_body +=  "<td>" + lga +  "</td>";
              record_html_body +=  "<td>" + crops +  "</td>";
              record_html_body +=  '<td><button onclick="populate_form()" class="btn btn-primary">Onboard</button></td>';
              record_html_body +=  "</tr>";
            })
            $("#ussd_details_log").empty().append(record_html_body);

          }
          
          swal.close()
            

        }});
        
        

      });

  }

  function populate_form(){
    //
  }

  var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("Cropcheckboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}


function showAnimalCheckboxes() {
  var checkboxes = document.getElementById("Animalcheckboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function sourceOfInforCheckboxes() {
  var checkboxes = document.getElementById("sourceOfInfocheckboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}
