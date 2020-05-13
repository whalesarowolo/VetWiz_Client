// var symptomInput = document.querySelector('.symptom-input')
// var symptomButton = document.querySelector('.symptom_button')
// var symptomList = document.querySelector('.symptom-list')

// // var element = document.querySelector('.symptom_form');
// // element.addEventListener('submit', event => {
// //   event.preventDefault();
// //   // actual logic, e.g. validate the form
// //   console.log('Form submission cancelled.');
// // });

// symptomButton.addEventListener('click', addSymptom);
// symptomList.addEventListener('click', deleteCheck);

// function addSymptom(event) {
//    event.preventDefault();
   
//    var symptomDiv = document.createElement('div');

//    symptomDiv.classList.add("symptom");

//    var newSymptom = document.createElement('li');
//    newSymptom.innerText = symptomInput.value;
//    if(symptomInput.value == null || symptomInput.value == ''){
      
//    }
//    newSymptom.classList.add('symptom-item');
//    symptomDiv.appendChild(newSymptom);

//    // var completedButton = document.createElement('button');
//    // completedButton.innerHTML = '<i class="fas fa-check"></i>';
//    // completedButton.classList.add('complete-btn')
//    // symptomDiv.appendChild(completedButton);


//    var trashButton = document.createElement('button');
//    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
//    trashButton.classList.add('trash-btn')
//    symptomDiv.appendChild(trashButton);


//    symptomList.appendChild(symptomDiv);

//    symptomInput.value = "";
// }

// function deleteCheck(e) {
//    var item = e.target;

//    if(item.classList[0] === 'trash-btn'){
//        var symptom = item.parentElement;
//       symptom.classList.add('fall');
//       symptom.addEventListener('transitionend', function(){

//           symptom.remove();
//       });
//    }
// }

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