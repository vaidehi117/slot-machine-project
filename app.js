let symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
let slot1, slot2, slot3;
let credits = 100; // Initial credits
let spinning = false;

// Add event listener to the "Spin" button
document.getElementById('spinButton').addEventListener('click', spin);
// Add event listener to the "Cashout" button
document.getElementById('cashoutButton').addEventListener('click', cashout);

function spin() {
  const betAmount = parseInt(document.getElementById('bet-Input').value);

  // Check if the bet amount is valid
  if (betAmount < 10 || betAmount > 100) {
    render('Invalid bet amount. Please enter a value between $10 and $100.', 'error', document.getElementById('result'));
    return;
  }
  // Deduct bet amount from credits
  credits -= betAmount;


  // Disable the button during spinning to prevent multiple spins
  document.getElementById('spinButton').disabled = true;

  //Generate random symbols for each slot 
  slot1 = Math.floor(Math.random() * symbols.length);
  slot2 = Math.floor(Math.random() * symbols.length);
  slot3 = Math.floor(Math.random() * symbols.length);

  if (spinning) {
    return; //prevents multipule spins
  }
   // Start spinning animation
   animationSpin();

   // After a delay, stop the spinning animation and update the slotUpdate
   setTimeout(function() {
     stopAnimationSpin();
     slotUpdate();
     checkWinner();
     // Enable the button after the spinning is done
     document.getElementById('spinButton').disabled = false;
   }, 2000); // Adjust the delay (in milliseconds) to control the spinning duration
}

function animationSpin() {
  spinning = true; 
  const slotElements = document.getElementById('slotMachine');
  //Duration of each spinning in miliseconds
  const spinDuration = 50;
  //Number of spins before it stops
  const maxSpin = 10;

  let spinCount = 0;
  const interval = setInterval(function() {
    //randomly changed the slot symbols 
    for (const i = 0; i < slotElements.length; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      slotElements[i].getElementByTagName('span')[0].textContent = symbols[randomIndex];
    }
    spinCount++;
    //Stops spinning after reaching the maximum number of spin
    if(spinCount === maxSpin) {
      clearInterval(interval);
      stopAnimationSpin();
    }
  },spinDuration);
}

function stopAnimationSpin() {
  spinning = false;
  //Enable the spin button
  document.getElementById('spinButton').disabled = false;
  //check the winner and display the result
  checkWinner();
}

function slotUpdate() {
  document.getElementById('slot1').innerHTML = symbols[slot1];
  document.getElementById('slot2').innerHTML = symbols[slot2];
  document.getElementById('slot3').innerHTML = symbols[slot3];
  document.getElementById('credit-input').innerHTML = `Credits left: ${credits}`;
}

//Checks is the user is winner 
function checkWinner() {
  const resultContainer = document.getElementById('result');
  if(slot1 == slot2 && slot2 == slot3) {
    render('!!You Won!!', 'win', resultContainer);
  } else {
    render('Try Again.', 'lose', resultContainer);
  }
}

// Reset the slot machine state
function cashout() {
  credits = 100; // Reset credits to the initial value

  slotUpdate();
  // Clear the result message
  render('', '', document.getElementById('result')); 
}

function render(message, resultClass,container) {
  container.innerHTML = '<p class="' + resultClass + '">' + message + '</p>';
}