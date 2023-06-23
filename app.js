let symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
let slot1, slot2, slot3;
let credits = 0; // Initial credits
let spinning = false;

const doors = document.querySelectorAll('.door');
// Add event listener to the "Spin" button
document.getElementById('spinButton').addEventListener('click', spin);
// Add event listener to the "Cashout" button
document.getElementById('cashoutButton').addEventListener('click', cashout);

function spin() {
  // Check if the bet amount is valid
  if (credits < 10 || credits > 100) {
    render('Invalid bet amount. Please enter a value between $10 and $100.', 'error', document.getElementById('result'));
    return;
  } else {
    // Deduct bet amount
    credits = credits - 5;
  }
  
  // Disable the button during spinning to prevent multiple spins
  document.getElementById('spinButton').disabled = true;

  //Generate random symbols for each slot 
  slot1 = Math.floor(Math.random() * symbols.length);
  slot2 = Math.floor(Math.random() * symbols.length);
  slot3 = Math.floor(Math.random() * symbols.length);

  if (spinning) {
    return; //prevents multipule spins
  }
     slotUpdate(slot1, slot2, slot3);
     checkWinner();
     // Enable the button after the spinning is done
     document.getElementById('spinButton').disabled = false;
}

function slotUpdate(slot1, slot2, slot3) {
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

// Reset the slot machine 
function cashout() {
  credits = 100; // Reset credits to the initial value
  document.getElementById('bet-Input').value = null;
  slotUpdate(0, 0, 0);
  // Clear the result message
  render('', '', document.getElementById('result')); 
}

function render(message, resultClass,container) {
  container.innerHTML = '<p class="' + resultClass + '">' + message + '</p>';
}

// onchange event of id="credit-input" label
function inputBoxVal() {
  console.log("credits before: ", credits);
  const newBet = parseInt(document.getElementById('bet-Input').value);
  credits = credits + newBet;
  console.log("credits: ", credits);
  document.getElementById('credit-input').innerHTML = `Credits left: ${credits}`;
}

// Load windows on every refersh
window.onload = slotUpdate(0, 0, 0);;