const currentDisplay = document.querySelector('.current');
const historyDisplay = document.querySelector('.history');
const numeralButtons = document.querySelectorAll('.numeral');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLast);

Array.from(numeralButtons).forEach(button => {
  button.addEventListener('click', appendToDisplay);
});

function deleteLast() {
  currentDisplay.textContent = currentDisplay.textContent.slice(
    0,
    currentDisplay.textContent.length - 1
  );
}

function clearDisplay() {
  currentDisplay.textContent = '';
  historyDisplay.textContent = '';
}

function appendToDisplay() {
  currentDisplay.textContent += Number.parseInt(this.textContent);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(x, y, operator) {
  let result = null;
  switch (operator) {
    case '+':
      result = add(x, y);
      break;
    case '-':
      result = subtract(x, y);
      break;
    case '*':
      result = multiply(x, y);
      break;
    case '/':
      result = divide(x, y);
      break;
  }
  return result;
}
