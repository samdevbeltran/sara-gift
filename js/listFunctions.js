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
	window.location.href = "http://localhost/giftProyect/index.html";
}