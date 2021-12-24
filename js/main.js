import{duckSvg,searchSvg} from './icons.js';


var patitoButtonColor = Boolean;

const storageSessionItem = sessionStorage.getItem("presentPhrase");

if(window.location.href.includes("index.html")){
	insertIcons();	
	
	if(storageSessionItem != "" && storageSessionItem != null){
		let frase = JSON.parse(storageSessionItem)
		renderPhrase(frase[0]);
		sessionStorage.clear();
	}
	
}

if(window.location.href.includes("list.html")){
	showPhraseList();	
}
// document.getElementById("pato-button").addEventListener("mousedown",function(){
// 	pressPatitoButtonColor();
	
// });
// 	document.getElementById("pato-button").addEventListener("mouseup",normalPatitoButtonColor());
if(document.getElementById("pato-button") != null){
	document.getElementById("pato-button").addEventListener("click",function(){
	
		fetch('./json/words.json').then(response =>{
			if(response.ok){
				return response.json();
			}
		}).then(result => {

			renderPhrase(getRandomPhrase(result));
		});

	});	
}



function getRandomPhrase(data){
	
	let randomNumber = Math.floor(Math.random() * (data.length +1));
	return data[randomNumber];
	
}

function renderPhrase(frase){
	let fraseContainer = document.querySelector(".msg-container p");
	fraseContainer.innerHTML = '"'+ frase["description"] +"<br>"+ frase["author"] +'"';
}

function normalPatitoButtonColor(){
	console.log("color")
	document.getElementById("pato-button").style.cssText = 
	"color: white;"+	
		"background-color: #ff6700;";
	    
}

function pressPatitoButtonColor(){
	console.log("transparente")
	document.getElementById("pato-button").style.cssText = 
	"color: #65655e;"+	
	"border: 2px solid #ff6700;";
	    
	
}
function normalPatitoButtonColor2(){
	document.getElementById("pato-button").addEventListener("mouseup",function(event) {
	    event.preventDefault();
	});
}

function insertIcons(){
	document.getElementById("pato-button").innerHTML = duckSvg;	
	document.getElementById("buscar-button").innerHTML = searchSvg;
}

function showPhraseList(){
	fetch('./json/words.json').then(response =>{
		if(response.ok){
			return response.json();
		}
	}).then(result => {

		renderPhrasesList(result);
	});
}

function renderPhrasesList(list){
	convertToShortPhrase(list).forEach(result =>{		
		document.querySelector("#list-container > ul").innerHTML += '<li>'+(result["id"]+1)+'-<a onclick="showSlectedPhrase('+result["id"]+')">'+result["description"]+" "+ "..."+'</a></li><hr class="rounded-line">';
		
	});
}

function convertToShortPhrase(list){
	let convertList = [];
	list.map(result => {
		convertList.push({
			"description" : result["description"].substring(0,25),
			"id" : result["id"]
		})
	})

	return convertList;	
}

if(document.getElementById("buscar-button2") != null){
	let searchInput = document.getElementById("search-input");
	document.getElementById("buscar-button2").addEventListener("click",function(){
		let union = [];
		
		if(searchInput.value != ""){
			
			let byDescription = findByType("description",searchInput.value);
			let byAuthor = findByType("author",searchInput.value);
			if(byDescription.length > 0 && union == 0){
				byDescription.forEach(item => {
					union.push(item);
				});
				if(byAuthor.length > 0){
					byAuthor.forEach(item =>{
						checkIfIdExists(union,item);	
					})
					
				}
			}else if(byAuthor.length > 0 && union == 0){
				byAuthor.forEach(item => {
					union.push(item);
				});
				if(byDescription.length > 0){
				 	byDescription.forEach(item=> {
						checkIfIdExists(union,item);
				 	});	
				}
			}

			renderSearchedWord(union);
		}

	});

	searchInput.addEventListener("keyup",(val)=>{
		if(val.key == "Backspace"){
			if(searchInput.value == ""){
				document.querySelector("#list-container > ul").innerHTML = "";
				showPhraseList();
			}
		}
		
	});
}

function renderSearchedWord(array){
	let container = document.querySelector("#list-container > ul");
	container.innerHTML = "";
	if(array.length > 0){
		renderPhrasesList(array);
	}else{
		container.innerHTML += '<li><a onclick="reloadPage()"><p style="text-align:center">No se encontraron coincidencias</p></a></li>';
	}
	
}