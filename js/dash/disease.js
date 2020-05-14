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

function persist_new_disease(disease_object) {
   //Implement logic here
   swal.fire({
      title: 'Please wait',
      text: 'Saving disease to server',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
   });

   //Do value validations

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

let disease_dataId;
// Market Actor sms log sent for approval
function viewDisease(params) {
  let disease_dataId;
  let html = "";
    swal.fire({
      title: 'Loading Disease Data',
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

   

    $("#view_disease_table").ready(function() {
      const url = 'https://farm-aid-backend.herokuapp.com/api/disease'
      const token = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      fetch(url, {
        method: "GET",
        headers
      }).then(async (res) => res.json()).then(data => {
        data.forEach( (datas) => {
            let Disease = datas.disease;
            let Disease_hausa = datas.diseaseHausa;
            let Disease_fulfude = datas.diseaseFulfude;
            let Treatment = datas.treatment;
            let Vaccine = datas.vaccine;
            let associated_animal = datas.animalAssocaited;
            let key_Word = datas.keyWord;
             disease_dataId = datas._id;
            // let associated_animal = datas._id;
            // let keyWord = datas._id;
            
  
            html += "<tr>";
            html += "<td></td>"
            html += "<td>" + Disease + "</td>"
            html += "<td>" + Disease_hausa + "</td>"
            html += "<td>" + Disease_fulfude + "</td>"
            // html += '<td>' + Treatment + '</td>'
            html += "<td>" + associated_animal + "</td>"
            html += "<td>" + Vaccine + "</td>"
            html += "<td>" + key_Word + "</td>"
            html += '<td><span id="lanuchModal" class="view_handler" style="color:#fff; background-color: green; padding:5px; border-radius:8px; cursor:pointer; box-shadow: 5px 5px #888888; text-align:center;" onclick="attach(event)" data_id=' + `${disease_dataId}` + '> View' + '</span>' 
            html += "</tr>"

            document.getElementById("view_disease_table").innerHTML = html;

        })
        
      swal.close();
      }).catch((error) => {
        console.error('Error:', error);
      })
    });
 
  })

}
function attach(event) {
  var targetEl = event.target;
  const view_det_id = $(targetEl).attr('data_id');
  viewSingleDisease(view_det_id);

  //document.getElementById("view_disease_table").innerHTML = html;
  //var view_handlers = document.getElementsByClassName('view_handler');
  // for (const view_handle in view_handlers) {
  //   if(view_handlers.hasOwnProperty(view_handle)) {
  //     const current_view = view_handlers[view_handle];
  //     const view_det_id = $(current_view).attr('data_id');
      
  //   }
  // }
}

function viewSingleDisease(view_det_id) {
  console.log("From viewSingleDisease " + view_det_id);
  let html = "";

  const url = `https://farm-aid-backend.herokuapp.com/api/disease/single/${view_det_id}`
  const token = localStorage.getItem('access_token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);
  fetch(url, {
    method: "GET",
    headers
  }).then(async (res) => res.json()).then(data => {
    console.log(data)
    // let Disease = datas.disease;
    // let Disease_hausa = datas.diseaseHausa;
    // let Disease_fulfude = datas.diseaseFulfude;
    // let Treatment = datas.treatment;
    // let Vaccine = datas.vaccine;
    // let associated_animal = datas.animalAssocaited;
    // let key_Word = datas.keyWord;
    // let prevention = datas.prevention;
    // let symptoms = datas.symptoms;
    // let disease_dataId = datas._id;
    
  swal.close();
  }).catch((error) => {
    console.error('Error:', error);
  })

  
}
