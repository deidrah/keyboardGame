const quotes = [
  "An old silent pond...A frog jumps into the pond, splash! Silence again.",
  "Autumn moonlight- a worm digs silently into the chestnut.",
  "In the twilight rain these brilliant-hued hibiscus - A lovely sunset.",
  "A summer river being crossed how pleasing with sandals in my hands!",
  "Light of the moon Moves west, flowers' shadows Creep eastward.",
  "In the moonlight, The color and scent of the wisteria Seems far away.",
  "Trusting the Buddha, good and bad, I bid farewell To the departing year.",
];

let highlightPosition;
let wordQueue;
let startTime;

const quote = document.getElementById('quote');
const message = document.getElementById('message');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');

function startGame() {
  const quoteIndex = Math.floor(Math.random() * quotes.length);  
  const quoteText = quotes[quoteIndex]; 
  
  highlightPosition = 0;  
  wordQueue = quoteText.split(' '); 
  
  quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join(''); 
  
  quote.childNodes[highlightPosition].className = 'highlight'; 
  
  input.focus();  
  input.value = ''; 
  message.innerText = ''; 
  
  startTime = new Date().getTime(); 
  document.body.className = '';
  start.className = 'started'; 
  setTimeout(() => { start.className = 'button'}, 2000); 
}

function checkInput() {
  
  const currentWord = wordQueue[0].replaceAll('.', '').replaceAll(',','').replaceAll(';','');
  const typedValue = input.value.trim();
  
  if (currentWord !== typedValue) {
    input.className = currentWord.startsWith(typedValue) ? '' : 'error'; 
    return
  }
  
  wordQueue.shift() 
  input.value = ''; 
  quote.childNodes[highlightPosition].className = ''; 
  
  if (wordQueue.length === 0) {   
    gameOver();
    return;
  }
  
  highlightPosition++; 
  quote.childNodes[highlightPosition].className = 'highlight';  
}

function gameOver() {
  const elapsedTime = new Date().getTime() - startTime; 
  document.body.className = "winner";  
  message.innerHTML = `<span class="congrats">Congratulations!</span> <br> You finished in ${elapsedTime / 1000} seconds.`   
}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);