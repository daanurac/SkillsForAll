// if (true) {
//     document.getElementById("progressBar").innerHTML = "8%"
//     document.getElementById("progressBar").classList.add("w-1/12")
// }
let score = 0;
let words = ['mama', 'papa', 'mapa', 'pato', 'topo', 'pita']
function randomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min;
}
function toNormalForm(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
var randomInt = randomInteger(0, words.length-1);
var word = document.querySelector('#word');
word.textContent = words[randomInt]
var message = document.querySelector("#message");  
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;  
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;  
var grammar = "#JSGF V1.0;";  
var recognition = new SpeechRecognition();  
var speechRecognitionList = new SpeechGrammarList();  
speechRecognitionList.addFromString(grammar, 1);  
recognition.grammars = speechRecognitionList;  
recognition.lang = "es-US";  
recognition.interimResults = false;  
recognition.onresult = function (event) {  
  var last = event.results.length - 1;  
  var command = toNormalForm(event.results[last][0].transcript);  
  message.textContent = "" + command;  
  // let box = document.querySelector(".box");  
  // var top = parseInt(window.getComputedStyle(box).getPropertyValue("top"));  
  // var left = parseInt(window.getComputedStyle(box).getPropertyValue("left"));  
  console.log(command.toLowerCase())
  console.log(score)
  if (command.toLowerCase() === words[randomInt] + ".") {
    score++;
//     document.getElementById("progressBar").innerHTML = document.getElementById("progressBar").innerHTML.parseInt() + "8"
    document.getElementById("progressBar").classList.remove("w-" + (score-1) + "/12")
    document.getElementById("progressBar").classList.add("w-" + score + "/12")
    document.getElementById("progressBar").classList.remove("bg-blue-600")
    document.getElementById("progressBar").classList.remove("bg-red-600")
    document.getElementById("progressBar").classList.add("bg-green-600")
  } else {
    document.getElementById("progressBar").classList.remove("bg-blue-600")
    document.getElementById("progressBar").classList.remove("bg-green-600")
    document.getElementById("progressBar").classList.add("bg-red-600")
  }
//   if (command.toLowerCase() === "sube.") {  
//    box.style.top = top - 40 + "px";  
//    console.log("sube")
//   } else if (command.toLowerCase() === "baja") {  
//    box.style.top = top + 40 + "px";  
//   } else if (command.toLowerCase() === "derecha") {  
//    box.style.left = left + 40 + "px";  
//   } else if (command.toLowerCase() === "izquierda") {  
//    box.style.left = left - 40 + "px";  
//   }  
  randomInt = randomInteger(0, words.length-1);
  word.textContent = words[randomInt]
};  
recognition.onspeechend = function () {  
  recognition.stop();  
};  
recognition.onerror = function (event) {  
  message.textContent = "Error occurred in recognition: " + event.error;  
};  
document  
  .querySelector("#command-button")  
  .addEventListener("click", function () {  
    recognition.start();  
  });  