var symptomInput = document.querySelector('.symptom-input')
var symptomButton = document.querySelector('.symptom_button')
var symptomList = document.querySelector('.symptom-list')

// var element = document.querySelector('.symptom_form');
// element.addEventListener('submit', event => {
//   event.preventDefault();
//   // actual logic, e.g. validate the form
//   console.log('Form submission cancelled.');
// });

symptomButton.addEventListener('click', addSymptom);
symptomList.addEventListener('click', deleteCheck);

function addSymptom(event) {
   event.preventDefault();
   
   var symptomDiv = document.createElement('div');

   symptomDiv.classList.add("symptom");

   var newSymptom = document.createElement('li');
   newSymptom.innerText = symptomInput.value;
   if(symptomInput.value == null || symptomInput.value == ''){
      
   }
   newSymptom.classList.add('symptom-item');
   symptomDiv.appendChild(newSymptom);

   // var completedButton = document.createElement('button');
   // completedButton.innerHTML = '<i class="fas fa-check"></i>';
   // completedButton.classList.add('complete-btn')
   // symptomDiv.appendChild(completedButton);


   var trashButton = document.createElement('button');
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add('trash-btn')
   symptomDiv.appendChild(trashButton);


   symptomList.appendChild(symptomDiv);

   symptomInput.value = "";
}

function deleteCheck(e) {
   var item = e.target;

   if(item.classList[0] === 'trash-btn'){
       var symptom = item.parentElement;
      symptom.classList.add('fall');
      symptom.addEventListener('transitionend', function(){

          symptom.remove();
      });
   }
}