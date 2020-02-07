function populate(s1,s2){
	var s1 = document.getElementById(s1);
	var s2 = document.getElementById(s2);
	s2.innerHTML = "";
	if(s1.value == "adamawa"){
		var optionArray = ["|","lamurde|Lamurde","guyuk|Guyuk","mayo_belwa|Mayo_Belwa", "fufore|Fufore"];
		document.getElementById("lga").classList.remove('is-hidden');
	} else if(s1.value == "gombe"){
		var optionArray = ["|","yamaltu_deba|Yamaltu_Deba","balanga|Balanga","biliri|Biliri", "kauami|Kauami"];
	} else if(s1.value == " ") {
		{
			document.getElementById("lga").classList.add('is-hidden');;
		 }
	}
	for(var option in optionArray){
		var pair = optionArray[option].split("|");
		var newOption = document.createElement("option");
		newOption.value = pair[0];
		newOption.innerHTML = pair[1];
		s2.options.add(newOption);
	}
}