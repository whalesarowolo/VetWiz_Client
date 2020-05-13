// Create a new list item when clicking on the "Add" button
function diseaseAnimal() {
   var li = document.createElement("li");
   var inputValue = document.getElementById("animal_myInput").value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === '') {
     alert("You must write something!");
   } else {
     document.getElementById("animal_myU").appendChild(li);
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
     document.getElementById("myUL-prevention").appendChild(li);
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
     document.getElementById("myUL-keyword").appendChild(li);
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
     document.getElementById("myUL-symptom").appendChild(li);
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

   //Do value validations
   var disease_object = {}

   var disease_name = $("#disease_name").val();
   var disease_name_hausa = $("#disease_name_hausa").val();
   var disease_name_fulfude = $("#disease_name_fulfude").val();

   var associated_animals_array = [];
   //Parse the assoc anim ul 
   var list_assoc_anim = document.getElementById("#animal_myU");
   Array.prototype.forEach((ele) => {
      associated_animals_array.push(ele.innerHTML);
   }, list_assoc_anim);

   console.log(associated_animals_array);
   var disease_prevention_array = [];
   var disease_treatment = $("#disease_treatment").val();
   var disease_symptoms_array = $("#myUL-symptom").val();
   var disease_keywords_array = $("#myUL-keyword").val();
   var disease_vaccine = $("#disease_vaccine").val();


   setTimeout(() => {
      swal.fire({
         title: 'Data saved',
         text: 'Disease has been saved',
         icon: 'success',
         timer: 3000,
      }).then(() => {
         swal.close()
      })
   }, 6000);
}
