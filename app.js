  /*----- constants -----*/
  const item1 = document.getElementById('item1');
  const item2 = document.getElementById('item2');
  const item3 = document.getElementById('item3');

  /*----- state variables -----*/
let credits = 25;
let totalBet = 0;
let betAmount = 100; //initial bet amount 

  /*----- cached elements  -----*/
  const input = document.querySelector("input");
  const creditsElement = document.getElementById('credits');


  /*----- event listeners -----*/
  document.getElementById('spin-button').addEventListener('onClick', function() {
    spin();
  });

  document.getElementById('increase-bet').addEventListener('click', function() {
    increaseBet();
  });

  document.getElementById('cash-out').addEventListener('click', function() {
    cashOut();
  });
  


  /*----- functions -----*/
  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];


  function spin() {
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  }

  function slotSpin() {

    const items = document.getElementsByClassName('item');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.innerHTML = ''; // Clear the current symbols
  
      for (let j = 0; j < 3; j++) {
        const symbol = document.createElement('span');
        symbol.classList.add('slot-symbol');
        symbol.textContent = getRandomSymbol();
        reel.appendChild(symbol);
      }
    }

    if (credits >= 5) {
      credits -= 5; // Deduct 5 credits for each spin
      render();
      updateCredits();
      updateBetAmount();
    } else {
      alert('Insufficient credits!');
    }

    if (credits >= betAmount) {
      // Deduct bet amount from credits
      credits -= betAmount; 
      //Increase the total bet amount
      totalBet += betAmount;
      render();
      updateCredits();
      updateTotalBet();
    } else {
      alert('Insufficient credits!');
    }

    //show message if winner condition 
    if (num1 == num2 && num1 == num3) {
      showMessage();
    } else {
      hideMessage();
    }  
  }

  //calculate bet amount
  function increaseBet() {
    if (betAmount < credits) {
      betAmount += 10; // Increase bet amount by 10
      updateBetAmount();
    } else {
      alert('Insufficient credits for increasing the bet!');
    }
  }

  function render() {
    item1.textContent = spin();
    item2.textContent = spin();
    item3.textContent = spin();
  }

//update totalBet 
function updateTotalBet() {
  const totalBetElement = document.getElementById('total-bet');
  totalBetElement.textContent = totalBet;
}

//Update Bet amount
function updateBetAmount() {
  const betAmountElement = document.getElementById('bet-amount');
  betAmountElement.textContent = betAmount;
}
updateBetAmount();

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

//check win 
function checkWin() {
  if (item11 === item2 && item2 === item3) {
    alert('Congratulations! You won!');
  } else {
    alert('Sorry, try again.');
  }
}

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

//Chashout 
function cashOut() {
  alert(`You cashed out ${cradits}.`)
  //Reset the cradits to zero
  credits = 0;
  totalBet = 0;
  updateTotalBet();
  updateCredits();
}

updateCredits();
updateBetAmount();
updateTotalBet();
