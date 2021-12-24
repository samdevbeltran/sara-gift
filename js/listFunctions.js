var phrasesVar;
fetch('./json/words.json').then(response =>{
		if(response.ok){
			return response.json();
		}
	}).then(result => {

		phrasesVar = result;
	});

function showSlectedPhrase(id){
	let result;
	result = phrasesVar.filter(item => item["id"] == id);	
	sessionStorage.setItem("presentPhrase", JSON.stringify(result));
	window.location.href = "https://sarapp-patito.herokuapp.com/index.html#message-section";
	//window.location.href = "http://localhost/giftProyect/index.html#message-section";
}


function findByType(type,value){
	value = String(value)
	value = value.toLowerCase();
	let result = [];	

	phrasesVar.forEach(item => {
		if(item[type].toLowerCase().indexOf(value) > -1){
			result.push(item)  
		}
	});

	return result;
}

function checkIfIdExists(array,list){
	let numbersTrack = [];
	if(array.length == 0){
		return false;
	}
	if(array.length > 0){	
		array.forEach(item => {
			numbersTrack.push(item["id"])
		})

		if(!numbersTrack.includes(list["id"])){
			array.push(list);
		}
	}
}

function reloadPage(){
	location.reload();
}

