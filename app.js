var symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
var slot1, slot2, slot3;
var credits = 50; // Initial credits
var spinning = false;

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

//    // After a delay, stop the spinning animation and update the slotUpdate
//    setTimeout(function() {
//      stopAnimationSpin();
//      slotUpdate();
//      checkWinner();
//      // Enable the button after the spinning is done
//      document.getElementById('spinButton').disabled = false;
//    }, 2000); // Adjust the delay (in milliseconds) to control the spinning duration
}

function animationSpin() {
  spinning = true; 
  const slotElements = doctument.getElementById('slotMachine');
  //Duration of each spinning in miliseconds
  const spinDuration = 100;
  //Number of spins before it stops
  const maxSpin = 10;

  const spinCount = 0;
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

// function setMaxBet() {
//   document.getElementById('bet-Input').value = 100;
// }

//Checks is the user is winner 
function checkWinner() {
  const resultContainer = document.getElementById('result');
  if(slot1 == slot2 && slot2 == slot3) {
    render('!!You Won!!', 'win', resultContainer);
  } else {
    render('Try Again.', 'lose', resultContainer);
  }
}

function calculateWinAmount(betAmount) {
  // Customize the win amount calculation logic as per your game rules
  // For example, you can use multipliers or fixed win amounts based on the winning symbol combination
  return betAmount * 5; // Multiplier of 5 for this example
}

// Reset the slot machine state
function cashout() {
  slot1 = null;
  slot2 = null;
  slot3 = null;
  credits = 50; // Reset credits to the initial value

  slotUpdate();
  // Clear the result message
  render('', '', document.getElementById('result')); 
}

function render(message, resultClass,container) {
  container.innerHTML = '<p class="' + resultClass + '">' + message + '</p>';
}