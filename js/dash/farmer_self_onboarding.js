$('select').selectpicker();

function farmerSelfOnboardingbtn(event) {
    event.preventDefault();

    let firstname = $('#examplefirstname').val().trim();
    let lastname = $('#exampleLastname').val().trim();
    let phonNum = $('#exampleInputPhoneNumber').val();
    let state = $('#exampleFormControlState').val().trim();
    let lga = $('#exampleInputLg').val().trim();
    let village = $('#exampleInputVillage').val().trim();
    let disability = $('#exampleFormControlDisability').val().trim();
    let gender = $('#exampleFormControlGender').val().trim();
    let marital = $('#exampleFormControlMaritalStatus').val().trim();
    let education = $('#exampleFormControlEducationalLevel').val().trim();
    let farm_size = $('#exampleFormControlFarmSize').val();
    let farm_income = $('#exampleFormControlIncome').val();
    let birthday = $('#exampleInputBirthday').val();
    let cropProduced = $('#cropProducedByFarmer').val();
    let animalProduced = $('#animalProducedByFarmer').val();
    let sourceInfo = $('#sourceInfo').val();

    if(firstname == "" || lastname == "" || phonNum == "" || state == "" || lga == "" || village == "" || disability == "" || gender == "" || marital == "" || education == "" || farm_size == "" || farm_size == "" || farm_income == "" || birthday == "" || cropProduced == "" || animalProduced == "" || sourceInfo == ""){
        swal({
            title: 'Error Authenticating',
            text: 'Please provide all the required credentials',
            icon: 'warning',
            timer: 2100
          })
          return false;
    }

    swal('Please wait...');

    const url = 'https://farm-aid-backend.herokuapp.com/api/onboard'

    const selfOnboardedFarmer = {
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
        "crops":cropProduced,
        "animals":animalProduced,
       "farm_size":farm_size,
       "farm_income":farm_income,
       "source_info":sourceInfo,
      };

       // create request object
       var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(selfOnboardedFarmer),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });

      fetch(request).then(async (res) => {
        let resp = await res.json()
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
            $('#examplefirstname').val('');
            $('#exampleLastname').val('');
            $('#exampleInputPhoneNumber').val('');
            $('#exampleFormControlState').val('');
            $('#exampleInputLg').val('');
            $('#exampleInputVillage').val('');
            $('#ussd_state').val('');
            $('#exampleInputBirthday').val('');

          }
      })


}