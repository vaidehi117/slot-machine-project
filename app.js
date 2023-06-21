  /*----- constants -----*/
  const item1 = getElement('item1');
  const item2 = getElement('item2');
  const item3 = getElement('item3');

  /*----- state variables -----*/
let slot;
let cradits = 25;

  /*----- cached elements  -----*/
  const input = document.querySelector("input");
  const creditsElement = document.getElementById('credits');


  /*----- event listeners -----*/
  spinButton.addEventListener('click', init);
  


  /*----- functions -----*/
  init();
  function init() {
    slot = [
      [0, 0, 0]
    ];
    
  }

  function spin() {
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  }
  function slotSpin() {
    if (credits >= 5) {
      credits -= 5; // Deduct 5 credits for each spin
      render();
      updateCredits();
    } else {
      alert('Insufficient credits!');
    }

    if (num1 == num2 && num1 == num3) {
      showMessage();
    } else {
      hideMessage();
    }  
  }

  function render() {
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');
  
    reel1.textContent = getRandomSymbol();
    reel2.textContent = getRandomSymbol();
    reel3.textContent = getRandomSymbol();
  }

//Genatare a random number for slot spin
  function getRandomNumber() {
    return Math.floor(Math.random() * 2) + 1;
}

function getElement(id) {
  return document.getElementById(id);
}

//Updates cradits 
function updateCredits() {
  creditsElement.textContent = credits;
}
document.getElementById('spin-button').addEventListener('click', function() {
  if (credits >= 5) {
    slotSpin();
  } else {
    alert('Insufficient credits!');
  }
});

updateCredits();

// Display the message is the user wins 
function showMessage() {
  const message = document.getElementById("message");
  message.style.display = 'block';
  message.classList.add('animated', 'pulse');
}

function hideMessage() {
  const message = document.getElementById("message");
  message.style.display = "none";
}
