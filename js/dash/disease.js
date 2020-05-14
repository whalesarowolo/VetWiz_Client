// Create a new list item when clicking on the "Add" button
function diseaseAnimal() {
   var li = document.createElement("li");
   var inputValue = document.getElementById("animal_myInput").value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === '') {
     alert("You must write something!");
   } else {
     document.getElementById("animal_myU").appendChild(li).classList.add('an_animal');
   }
   document.getElementById("animal_myInput").value = "";
 
   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);
 
   for (i = 0; i < close.length; i++) {
     close[i].onclick = function() {
       var div = this.parentElement;
       div.style.display = "none";
     }
   }
 }


// Create a new list item when clicking on the "Add" button
function animalPrevention() {
   var li = document.createElement("li");
   var inputValue = document.getElementById("myInpu_prevention").value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === '') {
     alert("You must write something!");
   } else {
     document.getElementById("myUL-prevention").appendChild(li).classList.add('disease_prevention');
   }
   document.getElementById("myInpu_prevention").value = "";
 
   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);
 
   for (i = 0; i < close.length; i++) {
     close[i].onclick = function() {
       var div = this.parentElement;
       div.style.display = "none";
     }
   }
 }


// Create a new list item when clicking on the "Add" button
function newKeyword() {
   var li = document.createElement("li");
   var inputValue = document.getElementById("myInput_keyword").value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === '') {
     alert("You must write something!");
   } else {
     document.getElementById("myUL-keyword").appendChild(li).classList.add('disease_words');
   }
   document.getElementById("myInput_keyword").value = "";
 
   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);
 
   for (i = 0; i < close.length; i++) {
     close[i].onclick = function() {
       var div = this.parentElement;
       div.style.display = "none";
     }
   }
 }


// Create a new list item when clicking on the "Add" button
function newElement() {
   var li = document.createElement("li");
   var inputValue = document.getElementById("myInput_symptom").value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === '') {
     alert("You must write something!");
   } else {
     document.getElementById("myUL-symptom").appendChild(li).classList.add('disease_sypmtoms');
   }
   document.getElementById("myInput_symptom").value = "";
 
   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);
 
   for (i = 0; i < close.length; i++) {
     close[i].onclick = function() {
       var div = this.parentElement;
       div.style.display = "none";
     }
   }
 }

 // Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

//Implement disease persistence logic here

function persist_new_disease() {
   //Implement logic here
   swal.fire({
      title: 'Please wait',
      text: 'Saving disease to server',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
   });


   var disease_name = $("#disease_name").val();
   var disease_name_hausa = $("#disease_name_hausa").val();
   var disease_name_fulfude = $("#disease_name_fulfude").val();

   var associated_animals_array = [];
   //Parse the assoc anim ul 
   var list_assoc_anim = document.getElementsByClassName('an_animal');
   for (const ele in list_assoc_anim) {
     if (list_assoc_anim.hasOwnProperty(ele)) {
       const element = list_assoc_anim[ele];
       associated_animals_array.push((element.textContent).slice(0,(element.textContent).length -1));
      }
   }

   console.log("Associated Animals", associated_animals_array);

   var disease_prevention_array = [];
   //Parse the disease prevention ul 
   var list_disease_prevention = document.getElementsByClassName('disease_prevention');
   for (const prev in list_disease_prevention) {
     if (list_disease_prevention.hasOwnProperty(prev)) {
       const prev_element = list_disease_prevention[prev];
       disease_prevention_array.push((prev_element.textContent).slice(0,(prev_element.textContent).length -1));
     }
   }

   console.log("Prevention; ", disease_prevention_array)

   var disease_treatment = $("#disease_treatment").val();

   var disease_symptoms_array = [];
   // Parse the disease symptom array
   var list_symptoms = document.getElementsByClassName('disease_sypmtoms');

   for (const symptom_ele in list_symptoms) {
     if (list_symptoms.hasOwnProperty(symptom_ele)) {
       const symptom = list_symptoms[symptom_ele];
       disease_symptoms_array.push((symptom.textContent).slice(0, (symptom.textContent).length -1));
     }
   }

   console.log("Symptoms", disease_symptoms_array);

   var disease_keywords_array = [];
   // Parse disease keywords
   var list_disease_keywords = document.getElementsByClassName('disease_words');

   for (const keyword_ele in list_disease_keywords) {
    if (list_disease_keywords.hasOwnProperty(keyword_ele)) {
      const keyword = list_disease_keywords[keyword_ele];
      disease_keywords_array.push((keyword.textContent).slice(0, (keyword.textContent).length -1));
    }
  }

  console.log("Keywords: ", disease_keywords_array);

  var disease_vaccine = $("#disease_vaccine").val();

  // Populate disase Object

  //Do value validations
  const disease_object = {
    disease: disease_name,
    diseaseHausa: disease_name_hausa,
    diseaseFulfude: disease_name_fulfude,
    animalAssocaited: associated_animals_array,
    symptoms: disease_symptoms_array,
    treatment: disease_treatment,
    vaccine: disease_vaccine,
    prevention: disease_prevention_array,
    keyWord: disease_keywords_array,
  }

  let disease_save_url = 'https://farm-aid-backend.herokuapp.com/api/disease';
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);
  fetch(disease_save_url, {
    method: "POST",
    headers
  }).then(async (res) => {
        swal.fire({
          title: 'Data saved',
          text: 'Disease has been saved',
          icon: 'success',
          timer: 3000,
        }).then(() => {
            swal.close()
        })
    console.log("Response ", res)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

