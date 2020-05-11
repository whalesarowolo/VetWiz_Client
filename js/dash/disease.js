const symptomInput = document.querySelector('.symptom-input')
const symptomButton = document.querySelector('.symptom_button')
const symptomList = document.querySelector('.symptom-list')

symptomButton.addEventListener('click', addSymptom(event));
symptomList.addEventListener('click', deleteCheck);

function addSymptom(event) {
   event.preventDefault();
   
   const symptomDiv = document.createElement('div');

   symptomDiv.classList.add("symptom");

   const newSymptom = document.createElement('li');
   newSymptom.innerText = symptomInput.value;
   newSymptom.classList.add('symptom-item');
   symptomDiv.appendChild(newSymptom);

   // const completedButton = document.createElement('button');
   // completedButton.innerHTML = '<i class="fas fa-check"></i>';
   // completedButton.classList.add('complete-btn')
   // symptomDiv.appendChild(completedButton);


   const trashButton = document.createElement('button');
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add('trash-btn')
   symptomDiv.appendChild(trashButton);


   symptomList.appendChild(symptomDiv);

   symptomInput.value = "";
}

function deleteCheck(e) {
   const item = e.target;

   if(item.classList[0] === 'trash-btn'){
       const symptom = item.parentElement;
      symptom.classList.add('fall');
      symptom.addEventListener('transitionend', function(){

          symptom.remove();
      });
   }
}