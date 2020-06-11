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

    // validate empty input
    if(firstname == "" || lastname == "" || phonNum == "" || state == "" ||  lga == "" || selectedCropItems == "" || gender == "" || farm_size =="" || farm_income == "" || education == "" || marital == " " || selectedInfoItems == " " || birthday == " " || selectedAnimalItems == " " || village == " " || disability == " ") {
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


    swal.showLoading('Please wait...');
  
      const url = 'https://farm-aid-backend.herokuapp.com/api/onboard';
  
      const ussdFarmer = {
        "firstname": firstname,
        "lastname":lastname,
        "phoneNumber":phonNum,
        "birthday":birthday,
        "gender":gender,
        "state":state,
        "lga":lga,
        "village":village,
        "disability": disability,
        "marital": marital,
        "education": education,
        "crops":selectedCropItems,
        "animals":selectedAnimalItems,
       "farm_size":farm_size,
       "farm_income":farm_income,
       "source_info":selectedInfoItems,
      };
      console.log(ussdFarmer)
  
      // create request object
      var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(ussdFarmer),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });

      fetch(request).then(async (res) => {
        let resp = await res.json();
        console.log(resp)
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
            $('#ussd_firstname').val('');
            $('#ussd_lastname').val('');
            $('#ussd_phoneNumber').val('');
            $('#ussd_state').val('');
            $('#ussd_lga').val('');
            $('#ussd_village').val('');
            $('#ussd_state').val('');
            $('#ussd_state').val('');
            $('#birthday').val('');
            document.getElementById('ussd_phoneNumber').disabled = false;
            document.getElementById('ussd_lga').disabled = false;
            document.getElementById('ussd_state').disabled = false;

          }
      })

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
          if(parsed.length > 0){
            parsed.forEach((td) => {
              var donb = ""
              if (td.hasOwnProperty('date_onb')) {
                donb = td.date_onb; 
              }else{
                donb = 'N/A'
              }
              var state = (td.farmer_state != null)? td.farmer_state: 'N/A';
              var lga = (td.farmer_lga != null)? td.farmer_lga: 'N/A';
              var crops = (td.farmer_crops != null)? td.farmer_crops: 'N/A';
              var date = (donb != '')? donb : 'April/May';
              record_html_body += "<tr>";
              record_html_body +=  "<td> </td>";
              record_html_body +=  "<td class='ussd_phone_number_onboarding props'>" + td.phone_number +  "</td>";
              record_html_body +=  "<td class='ussd_state props'>" + state + "</td>";
              record_html_body +=  "<td class='ussd_lga props'>" + lga +  "</td>";
              record_html_body +=  "<td class='ussd_crops props'>" + crops +  "</td>";
              record_html_body +=  "<td class='ussd_crops props'>" + date +  "</td>";
              record_html_body +=  '<td><button onclick="populate_form(event);" class="btn btn-primary">Onboard</button></td>';
              record_html_body +=  "</tr>";
            })
            $("#ussd_details_log").empty().append(record_html_body);

          }
          
          swal.close()
            

        }});
        
        

      });

  }

  function populate_form(event){
    //
    var row_children = $(event.target.parentElement).parent()
    var childrenz = $(row_children[0]).children()
    var usable_childs = [];
    for (const key in childrenz) {
      if (childrenz.hasOwnProperty(key)) {
        const el = childrenz[key];
        usable_childs.push(el)
      }
    }
    var ussd_phone_val = usable_childs[1].innerHTML
    var ussd_state_val = usable_childs[2].innerHTML
    var ussd_lga_val = usable_childs[3].innerHTML
    var ussd_crops_val = usable_childs[4].innerHTML
    document.getElementById("ussd_phoneNumber").setAttribute("value", ussd_phone_val);
    document.getElementById("ussd_state").setAttribute("value", ussd_state_val);
    document.getElementById('ussd_phoneNumber').disabled = true;
    
    if(ussd_lga_val === null || ussd_lga_val === undefined || ussd_lga_val === "N/A" || ussd_lga_val === "others"){
      document.getElementById('ussd_lga').disabled = false;
    }else{
      document.getElementById('ussd_lga').disabled = true;
      document.getElementById("ussd_lga").setAttribute("value", ussd_lga_val);

    }

    if(ussd_crops_val === "N/A" || ussd_crops_val === null || ussd_crops_val === undefined){

      $("input[value='" + ussd_crops_val + "']").prop('checked', false);
    } else{

      $("input[value='" + ussd_crops_val + "']").prop('checked', true);
    }

    if(ussd_state_val === "N/A" || ussd_state_val === undefined || ussd_state_val === null){
      document.getElementById('ussd_state').disabled = false;
    } else{

      let element = document.getElementById('ussd_state');
      element.value = ussd_state_val;
      document.getElementById('ussd_state').disabled = true;
      document.getElementById('ussd_firstname').scrollIntoView()
    }



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

function ussdOnboarded(params) {

  addScript('https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js');
    
   swal.fire({
    title: 'Loading Farmers On-boarded via USSD',
    text: 'Please wait...',
    timer: 4000,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: 'info'
  }).then(function() {
    $("#mytable_ussd").empty();
    swal.fire({
      title: "Please wait",
      text: "Loading data ....",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false
    });

    $("#ussd_example_adam").ready(function() {
  
      const url = 'https://farm-aid-backend.herokuapp.com/api/ussd_farmers'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
    
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        console.log(data);

    if ($("#mytable_ussd").length) {
      $("#mytable_ussd_info").remove();
      $("#mytable_ussd_paginate").remove();
      $("#mytable_ussd_length").remove();
      $("#mytable_ussd_filter").remove();
      $("#mytable_ussd").DataTable( {
        responsive: true,
        data: data,
        "columns": [
          { "data": "firstname" },
          { "data": "lastname" },
          { "data": "gender" },
          { "data": "phoneNumber" },
          { "data": "state" },
          { "data": "lga" },
          { "data": "marital" }
      ]
      } );
      html = "<span>" + "Total Number of Farmers on-boarded via USSD: " + data.length + "</span>"
      document.getElementById("ussd_ada").innerHTML = html;
    } 
// End DataTable here
      }).catch((error) => {
        console.error('Error:', error);
      });
    })

    Swal.close();
  })

}
