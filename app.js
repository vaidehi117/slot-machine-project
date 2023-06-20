  /*----- constants -----*/
  const item1 = getElement('item1');
  const item2 = getElement('item2');
  const item3 = getElement('item3');

  /*----- state variables -----*/
let slot;


  /*----- cached elements  -----*/


  /*----- event listeners -----*/
  playAgainBtn.addEventListener('click', init);

  /*----- functions -----*/
  init();
  function init() {
    slot = [];
    
  }

  function spin() {
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const num3 = getRandomNumber();

    item1.innerHTML = `${num1}`;
    item2.innerHTML = `${num2}`;
    item3.innerHTML = `${num3}`;

    if (num1 == num2 && num1 == num3) {
      showMessage();
    } else {
      hideMessage();
    }
    
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 2) + 1;
}

function getElement(id) {
  return document.getElementById(id);
}

function showMessage() {
  const message = document.getElementById("message");
  message.style.display = 'block';
  message.classList.add('animated', 'pulse');
}

function hideMessage() {
  const message = document.getElementById("message");
  message.style.display = "none";
}
function getWinner() {

}