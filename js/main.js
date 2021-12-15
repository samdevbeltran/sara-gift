import{duckSvg,searchSvg} from './icons.js';

showMessage();
insertIcons();

var patitoButtonColor = Boolean;

// document.getElementById("pato-button").addEventListener("mousedown",function(){
// 	pressPatitoButtonColor();
	
// });
// 	document.getElementById("pato-button").addEventListener("mouseup",normalPatitoButtonColor());


function showMessage(){
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