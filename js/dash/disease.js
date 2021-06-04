// Create a new list item when clicking on the "Add" button
function diseaseAnimal() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("animal_myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document
      .getElementById("animal_myU")
      .appendChild(li)
      .classList.add("an_animal");
  }
  document.getElementById("animal_myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

// Create a new list item when clicking on the "Add" button
function animalPrevention() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInpu_prevention").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document
      .getElementById("myUL-prevention")
      .appendChild(li)
      .classList.add("disease_prevention");
  }
  document.getElementById("myInpu_prevention").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

// Create a new list item when clicking on the "Add" button
function newKeyword() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput_keyword").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document
      .getElementById("myUL-keyword")
      .appendChild(li)
      .classList.add("disease_words");
  }
  document.getElementById("myInput_keyword").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput_symptom").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document
      .getElementById("myUL-symptom")
      .appendChild(li)
      .classList.add("disease_sypmtoms");
  }
  document.getElementById("myInput_symptom").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

//Implement disease persistence logic here

function persist_new_disease() {
  //Implement logic here
  swal.fire({
    title: "Please wait",
    text: "Saving disease to server",
    icon: "info",
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  var disease_name = $("#disease_name").val();
  var disease_animal = $("#disease_animal").val();
  var disease_name_hausa = $("#disease_name_hausa").val();
  var disease_name_fulfude = $("#disease_name_fulfude").val();

  var associated_animals_array = [];
  //Parse the assoc anim ul
  var list_assoc_anim = document.getElementsByClassName("an_animal");
  for (const ele in list_assoc_anim) {
    if (list_assoc_anim.hasOwnProperty(ele)) {
      const element = list_assoc_anim[ele];
      associated_animals_array.push(
        element.textContent.slice(0, element.textContent.length - 1)
      );
    }
  }

  console.log("Associated Animals", associated_animals_array);

  var disease_prevention_array = [];
  //Parse the disease prevention ul
  var list_disease_prevention =
    document.getElementsByClassName("disease_prevention");
  for (const prev in list_disease_prevention) {
    if (list_disease_prevention.hasOwnProperty(prev)) {
      const prev_element = list_disease_prevention[prev];
      disease_prevention_array.push(
        prev_element.textContent.slice(0, prev_element.textContent.length - 1)
      );
    }
  }

  console.log("Prevention; ", disease_prevention_array);

  var disease_treatment = $("#disease_treatment").val();

  var disease_symptoms_array = [];
  // Parse the disease symptom array
  var list_symptoms = document.getElementsByClassName("disease_sypmtoms");

  for (const symptom_ele in list_symptoms) {
    if (list_symptoms.hasOwnProperty(symptom_ele)) {
      const symptom = list_symptoms[symptom_ele];
      disease_symptoms_array.push(
        symptom.textContent.slice(0, symptom.textContent.length - 1)
      );
    }
  }

  console.log("Symptoms", disease_symptoms_array);

  var disease_keywords_array = [];
  // Parse disease keywords
  var list_disease_keywords = document.getElementsByClassName("disease_words");

  for (const keyword_ele in list_disease_keywords) {
    if (list_disease_keywords.hasOwnProperty(keyword_ele)) {
      const keyword = list_disease_keywords[keyword_ele];
      disease_keywords_array.push(
        keyword.textContent.slice(0, keyword.textContent.length - 1)
      );
    }
  }

  console.log("Keywords: ", disease_keywords_array);

  var disease_vaccine = $("#disease_vaccine").val();

  const dis_img = document.getElementById("image_a").files[0];
  const dis_img_1 = document.getElementById("image_b").files[0];
  const dis_img_2 = document.getElementById("image_c").files[0];
  // Swal.fire({
  //   title: 'Sweet!',
  //   text: 'Modal with a custom image.',
  //   imageUrl: document.getElementById('image_a').files[0].src,
  //   imageWidth: 400,
  //   imageHeight: 200,
  //   imageAlt: 'Custom image',
  // })
  console.log(document.getElementById("image_a").files[0]);
  var formdata = new FormData();
  formdata.append("diseaseImage", dis_img);
  formdata.append("diseaseImage1", dis_img_1);
  formdata.append("diseaseImage2", dis_img_2);
  formdata.append("disease", disease_name);
  formdata.append("disease_animal", disease_animal);
  formdata.append("diseaseHausa", disease_name_hausa);
  formdata.append("diseaseFulfude", disease_name_fulfude);
  formdata.append("animalAssocaited", associated_animals_array);
  formdata.append("symptoms", disease_symptoms_array);
  formdata.append("treatment", disease_treatment);
  formdata.append("vaccine", disease_vaccine);
  formdata.append("prevention", disease_prevention_array);
  formdata.append("keyWord", disease_keywords_array);
  // Display the values
  for (var value of formdata.values()) {
    console.log(value);
  }

  // Populate disase Object

  //Do value validations
  const disease_object = {
    disease: disease_name,
    disease_animal: disease_animal,
    diseaseHausa: disease_name_hausa,
    diseaseFulfude: disease_name_fulfude,
    animalAssocaited: associated_animals_array,
    symptoms: disease_symptoms_array,
    treatment: disease_treatment,
    vaccine: disease_vaccine,
    prevention: disease_prevention_array,
    keyWord: disease_keywords_array,
  };

  let disease_save_url = "https://farm-aid-backend.herokuapp.com/api/disease";
  const token = localStorage.getItem("access_token");
  var headers = new Headers();
  //headers.append('Content-Type', 'application/json');
  headers.append("authorization", token);
  fetch(disease_save_url, {
    method: "POST",
    headers,
    mode: "cors",
    body: formdata,
  })
    .then((res) => {
      if (res) {
        swal
          .fire({
            title: "Data saved",
            text: "Disease has been saved",
            icon: "success",
            timer: 3000,
          })
          .then(() => {
            swal.close();
          });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

let disease_dataId;

function viewDisease(params) {
  let disease_dataId;
  let html = "";
  swal
    .fire({
      title: "Loading Disease Data",
      text: "Please wait...",
      timer: 3000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: "info",
    })
    .then(function () {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      $("#view_disease_table").ready(function () {
        const url = "https://farm-aid-backend.herokuapp.com/api/disease";
        const token = localStorage.getItem("access_token");
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", token);
        fetch(url, {
          method: "GET",
          headers,
        })
          .then(async (res) => res.json())
          .then((data) => {
            data.forEach((datas) => {
              let Disease = datas.disease;
              let Disease_hausa = datas.diseaseHausa;
              let Disease_fulfude = datas.diseaseFulfude;
              let animal = datas.animal;
              let Vaccine = datas.vaccine;
              let associated_animal = datas.animalAssocaited;
              let key_Word = datas.keyWord;
              disease_dataId = datas._id;
              // let associated_animal = datas._id;
              // let keyWord = datas._id;

              html += "<tr>";
              html += "<td></td>";
              html += "<td>" + Disease + "</td>";
              html += "<td>" + Disease_hausa + "</td>";
              html += "<td>" + Disease_fulfude + "</td>";
              html += "<td>" + animal + "</td>";
              // html += '<td>' + Treatment + '</td>'
              html += "<td>" + associated_animal + "</td>";
              // html += "<td>" + Vaccine + "</td>"
              html += "<td>" + key_Word + "</td>";
              html +=
                '<td><span  class="view_handler" style="color:#fff; background-color: #26d0a8; padding:5px; border-radius:8px; cursor:pointer; box-shadow: 5px 5px #888888; text-align:center;" onclick="attach(event)" data_id=' +
                `${disease_dataId}` +
                "> View" +
                "</span>";
              html += "</tr>";

              document.getElementById("view_disease_table").innerHTML = html;
            });

            swal.close();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    });
}
function attach(event) {
  var targetEl = event.target;
  const view_det_id = $(targetEl).attr("data_id");
  viewSingleDisease(view_det_id);
}

function viewSingleDisease(view_det_id) {
  swal
    .fire({
      title: "Loading Disease Data",
      text: "Please wait...",
      timer: 1000,
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: "info",
    })
    .then(function () {
      Swal.fire({
        title: "Please wait",
        text: "Loading data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      let html = "";
      $("#view_single_disease").removeClass("is-hidden").addClass("is-active");
      $("#view_single_disease > .modal-background").addClass("scaleInCircle");
      $("#view_single_disease > .modal-content").addClass("scaleIn");
      $("#view_single_disease > .modal-close").removeClass("is-hidden");

      const url = `https://farm-aid-backend.herokuapp.com/api/disease/single/${view_det_id}`;
      const token = localStorage.getItem("access_token");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      fetch(url, {
        method: "GET",
        headers,
      })
        .then(async (res) => res.json())
        .then((data) => {
          let Disease = data.disease;
          let Disease_hausa = data.diseaseHausa;
          let Disease_fulfude = data.diseaseFulfude;
          let Treatment = data.treatment;
          let Vaccine = data.vaccine;
          let associated_animal = data.animalAssocaited;
          let key_Word = data.keyWord;
          let prevention = data.prevention;
          let animal = data.animal;
          let symptoms = data.symptoms;
          let disease_dataId = data._id;

          html += "<form class='disease_box'>";
          html +=
            "<div class='columns is-mobile is-multiline is-centered dieases-container'>";

          html += "<div class='column disease-section1'>";
          html += "<div class='form-group flex'>";
          html += "<label>" + "Disease" + "</label>";
          html +=
            `<input class="form-control" id="disease_view_input" value="` +
            Disease +
            `"  disabled>`;
          html += "<div>";
          html += "</div>";
          html += "</div>";
          html += "<div class='form-group flex'>";
          html += "<label>" + "Disease(Hausa)" + "</label>";
          html +=
            `<input class="form-control" id="disease_view_input_hausa" value="` +
            Disease_hausa +
            `" disabled>`;
          html += "<div>";
          html += "</div>";
          html += "</div>";
          html += "<div class='form-group flex'>";
          html += "<label>" + "Disease(Fulfude)" + "</label>";
          html +=
            `<input class="form-control" id="disease_view_input_fulfude" value="` +
            Disease_fulfude +
            `" disabled>`;
          html += "<div>";
          html += "</div>";
          html += "</div>";
          html += "<div class='form-group flex'>";
          html += "<label>" + "Key Word" + "</label>";
          html +=
            "<textarea id='disease_view_textarea_keyword' disabled>" +
            key_Word +
            "</textarea>";
          html += "<div>";
          html += "</div>";
          html += "</div>";
          html += "<div class='form-group flex'>";
          html += "<label>" + "Associated Animal" + "</label>";
          html +=
            `<input class="form-control" id='disease_view_textarea_assocaitedAnimal' value="` +
            associated_animal +
            `" disabled>`;
          html += "<div>";
          html += "</div>";
          html += "</div>";
          html += "<div class='form-group flex'>";
          html += "<label>" + "Vaccine" + "</label>";
          html +=
            `<input class="form-control" id='disease_view_textarea_vaccine' value="` +
            Vaccine +
            `" disabled>`;
          html += "<div>";
          html += "</div>";
          html += "</div>";
          html += "</div>";

          html += "<div class='column disease-section2'>";

          html += "<div class='form-group flex'>";
          html += "<label>" + "Treatment Required" + "</label>";
          html +=
            "<textarea id='disease_view_textarea_treament' disabled>" +
            Treatment +
            "</textarea>";
          html += "<div>";
          html += "</div>";
          html += "</div>";
          html += "<div class='form-group flex'>";
          html += "<label>" + "Symptoms Shown" + "</label>";
          html +=
            "<textarea id='disease_view_textarea_symptoms' disabled>" +
            symptoms +
            "</textarea>";
          html += "<div>";
          html += "</div>";
          html += "</div>";
          html += "<div class='form-group flex'>";
          html += "<label>" + "Preventive Measure" + "</label>";
          html +=
            "<textarea id='disease_view_textarea_prevention' disabled>" +
            prevention +
            "</textarea>";
          html += "<div>";
          html += "</div>";
          html += "</div>";

          html += "</div>";

          html += "</>";
          html += "</form>";
          html += "<div class='single_disease_button_section'>";
          html +=
            '<button  onclick="cancelMessage();" class="" style="border-radius:20px; background-color: #e7e7e7;">' +
            "Cancel" +
            "</button>";
          html +=
            "<button type='edit' class='' id='edit' class='' onclick='return handleEdit()' style='background-color: #26d0a8; margin-left:5px; border-radius:20px'>" +
            "Update" +
            "</button>";
          html +=
            "<button type='edit' class='' id='del' class='' onclick='return handleDel()' style='background-color: #ff0000; margin-left:5px; border-radius:20px'>" +
            "Delete" +
            "</button>";
          html +=
            '<button  type="submit" class="" id="save" class="" hidden style="background-color: #26d0a8; margin-left:5px; border-radius:20px";  onclick="updateID(event)" data_update_id=' +
            `${disease_dataId}` +
            "> Save" +
            "</button>";
          html += "</div>";

          document.getElementById("disease_case_body").innerHTML = html;
          swal.close();
          document.getElementById("view_single_disease").scrollIntoView();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
}

function handleDel(params) {
  swal
    .fire({
      title: "About to Delete",
      text: "You are about to delete this document",
      timer: 3000,
      icon: "warning",
    })
    .then(() => {
      let the_del_id = $("#save").attr("data_update_id");
      console.log("Deleting " + the_del_id);

      //Handle deletion here
      Swal.fire({
        title: "Please wait",
        text: "Deleting data ....",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      const url = `https://farm-aid-backend.herokuapp.com/api/disease/${the_del_id}`;
      const token = localStorage.getItem("access_token");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      fetch(url, {
        method: "DELETE",
        headers,
      })
        .then(async (res) => res.json())
        .then((data) => {
          console.log("Data: ", data);
          Swal.close();
          Swal.fire({
            title: "Data deleted",
            text: "Data deleted successfully",
            icon: "success",
            allowOutsideClick: false,
            showConfirmButton: true,
            timer: 2000,
          });
          window.location.reload();
        })
        .catch((error) => {
          swal.fire({
            title: "Error occured",
            text: "There was an error " + error.message,
            icon: "warning",
          });
        });
    });
}

function updateID(event) {
  var targetEl = event.target;
  const view_det_update_id = $(targetEl).attr("data_update_id");
  updateSingleDisease(view_det_update_id);
}

function updateSingleDisease(view_det_update_id) {
  console.log("update single crop" + view_det_update_id);
  Swal.fire({
    title: "Request being processed",
    text: "Please wait...",
    timer: 1000,
    allowOutsideClick: false,
    showConfirmButton: false,
    icon: "info",
  }).then(function () {
    Swal.fire({
      title: "Please wait",
      text: "Data being updated ....",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    let disease_view_input_hausa = $("#disease_view_input_hausa").val().trim();
    let disease_view_input = $("#disease_view_input").val().trim();
    let disease_view_input_fulfude = $("#disease_view_input_fulfude")
      .val()
      .trim();
    let disease_view_textarea_keyword = $(
      "#disease_view_textarea_keyword"
    ).val();
    let disease_view_textarea_assocaitedAnimal = $(
      "#disease_view_textarea_assocaitedAnimal"
    )
      .val()
      .trim();
    let disease_view_textarea_treament = $("#disease_view_textarea_treament")
      .val()
      .trim();
    let disease_view_textarea_symptoms = $(
      "#disease_view_textarea_symptoms"
    ).val();
    let disease_view_textarea_prevention = $(
      "#disease_view_textarea_prevention"
    ).val();
    let disease_view_textarea_vaccine = $(
      "#disease_view_textarea_vaccine"
    ).val();

    const url =
      "https://farm-aid-backend.herokuapp.com/api/disease/" +
      view_det_update_id;
    const token = localStorage.getItem("access_token");

    const disease = {
      disease_input: disease_view_input,
      diseaseHausa: disease_view_input_hausa,
      diseaseFulfude: disease_view_input_fulfude,
      animalAssocaited: disease_view_textarea_assocaitedAnimal,
      symptoms: disease_view_textarea_symptoms,
      treatment: disease_view_textarea_treament,
      vaccine: disease_view_textarea_vaccine,
      prevention: disease_view_textarea_prevention,
      keyWord: disease_view_textarea_keyword,
    };

    // create request object
    var request = new Request(url, {
      method: "PUT",
      body: JSON.stringify(disease),

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    });

    fetch(request).then(async (res) => {
      let resp = await res.json();
      if (resp.status !== 201) {
        Swal.fire({
          title: "Bad Request",
          text: "Verify data being sent",
          icon: "info",
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: "Update Successsful",
          text: "Disease case has been updated successfully",
          icon: "info",
          timer: 3000,
        });
      }
    });
    handleunEdit();
    swal.close();
  });
}

function cancelMessage(params) {
  $(".modal.modal-md.icon-action-modal.modal-hero").removeClass("is-active");
  $("#create-internal-modal > .modal-background").removeClass("scaleInCircle");
  $("#create-internal-modal > .modal-content").removeClass("scaleIn");
  $("#create-internal-modal > .modal-close").addClass("is-hidden");
}

//Update the handleEdit function to allow for editing both Disease name and Vaccine field
function handleEdit() {
  document.getElementById("disease_view_input").disabled = false;
  document.getElementById("disease_view_input_hausa").disabled = false;
  document.getElementById("disease_view_input_fulfude").disabled = false;
  document.getElementById("disease_view_textarea_keyword").disabled = false;
  document.getElementById(
    "disease_view_textarea_assocaitedAnimal"
  ).disabled = false;
  document.getElementById("disease_view_textarea_treament").disabled = false;
  document.getElementById("disease_view_textarea_symptoms").disabled = false;
  document.getElementById("disease_view_textarea_prevention").disabled = false;
  document.getElementById("disease_view_textarea_vaccine").disabled = false;
  document.getElementById("edit").hidden = true;
  document.getElementById("save").hidden = false;

  return false;
}
function handleunEdit() {
  document.getElementById("disease_view_input").disabled = true;
  document.getElementById("disease_view_input_hausa").disabled = true;
  document.getElementById("disease_view_input_fulfude").disabled = true;
  document.getElementById("disease_view_textarea_keyword").disabled = true;
  document.getElementById(
    "disease_view_textarea_assocaitedAnimal"
  ).disabled = true;
  document.getElementById("disease_view_textarea_treament").disabled = true;
  document.getElementById("disease_view_textarea_symptoms").disabled = true;
  document.getElementById("disease_view_textarea_prevention").disabled = true;
  document.getElementById("disease_view_textarea_vaccine").disabled = true;
  document.getElementById("edit").hidden = false;
  document.getElementById("save").hidden = true;

  return true;
}

//function for displaying the image upload preview

function showMyImage(fileInput) {
  var files = fileInput.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    if (!file.type.match(imageType)) {
      continue;
    }
    var img = document.getElementById("thumbnail");
    img.file = file;
    var reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
  }
}

function showMyImageb(fileInput) {
  var files = fileInput.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    if (!file.type.match(imageType)) {
      continue;
    }
    var imgb = document.getElementById("thumbnailb");
    imgb.file = file;
    var reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(imgb);
    reader.readAsDataURL(file);
  }
}

function showMyImagec(fileInput) {
  var files = fileInput.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    if (!file.type.match(imageType)) {
      continue;
    }
    var imgc = document.getElementById("thumbnailc");
    imgc.file = file;
    var reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(imgc);
    reader.readAsDataURL(file);
  }
}
