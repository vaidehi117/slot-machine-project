var symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
var slot1, slot2, slot3;
var credits = 100; // Initial credits

// Add event listener to the "Spin" button
document.getElementById('spinButton').addEventListener('click', spin);
// Add event listener to the "Cashout" button
document.getElementById('cashoutButton').addEventListener('click', cashout);

function spin() {
  var betAmount = parseInt(document.getElementById('betInput').value);

  // Check if the bet amount is valid
  if (betAmount < 10 || betAmount > 100) {
    renderResult('Invalid bet amount. Please enter a value between $10 and $100.', 'error', document.getElementById('result'));
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

   // Start spinning animation
   animateSpin();

   // After a delay, stop the spinning animation and update the UI
   setTimeout(function() {
     stopAnimateSpin();
     updateUI();
     checkWin();
     // Enable the button after the spinning is done
     document.getElementById('spinButton').disabled = false;
   }, 2000); // Adjust the delay (in milliseconds) to control the spinning duration
}

function animateSpin() {
  // Implement your spinning animation logic here
  // This function will be called when the spin button is clicked
  // and before updating the UI with the final symbols
}

function stopAnimateSpin() {
  // Implement your logic to stop the spinning animation here
  // This function will be called after the delay
}

function slotUpdate() {
  document.getElementById('slot1').innerHTML = symbols[slot1];
  document.getElementById('slot2').innerHTML = symbols[slot2];
  document.getElementById('slot3').innerHTML = symbols[slot3];
  document.getElementById('credits').innerHTML = credits;
}

//Checks is the user is winner 
function checkWinner() {
  var resultContainer = document.getElementById('result');
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
  credits = 100; // Reset credits to the initial value

  slotUpdate();
  // Clear the result message
  render('', '', document.getElementById('result')); 
}

function render(message, resultClass,container) {
  container.innerHTML = '<p class="' + resultClass + '">' + message + '</p>';
}