const currentDisplay = document.querySelector('.current');
const historyDisplay = document.querySelector('.history');
const numeralButtons = document.querySelectorAll('.numerals');
const operatorButtons = document.querySelectorAll('.operators');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const float = document.querySelector('#dot');

clearBtn.addEventListener('click', reset);
deleteBtn.addEventListener('click', deleteLast);

float.addEventListener('click', appendDot);

Array.from(numeralButtons).forEach(button => {
  button.addEventListener('click', appendNumeral);
});

Array.from(operatorButtons).forEach(button => {
  button.addEventListener('click', selectOperator);
});


// Operation
let operandStack = [];
let operatorStack = [];

let error = false;

// Append to display
function selectOperator() {
  if (error) {
    error = false;
    reset();
  }

  operandStack.push(+currentDisplay.textContent);

  if (this.textContent === '=') {
    let result = calculate(operandStack, operatorStack[operatorStack.length - 1]);

    if (result === 'Error!') {
      error = true;
    }

    operandStack = [];
    operatorStack = [];
    currentDisplay.textContent = result;
    return;
  }

  // operatorStack = [];
  operatorStack.push(this.textContent);
  
  clearCurrentDisplay();
  
  if (operandStack.length > 1) {
    let result = calculate(operandStack, operatorStack[0]);
    operandStack = [];
    operandStack.push(result);
    operatorStack.shift();
  }

  historyDisplay.textContent = operandStack[0] + ' ' + operatorStack;
}

function appendNumeral() {
  if (currentDisplay.textContent.length < 14) {
    currentDisplay.textContent += this.textContent.trim();
  }
}

function appendDot() {
  if (currentDisplay.textContent.includes('.')) {
    return;
  }

  currentDisplay.textContent += '.';
}

// Reset
function reset() {
  operandStack = [];
  operatorStack = [];
  clearHistory();
  clearCurrentDisplay();
}

// Clear history
function clearHistory() {
  historyDisplay.textContent = '';
}

// Clear displays
function clearDisplay() {
  currentDisplay.textContent = '';
  historyDisplay.textContent = '';
}

function clearCurrentDisplay() {
  currentDisplay.textContent = '';
}

function deleteLast() {
  currentDisplay.textContent = currentDisplay.textContent.slice(0,-1);
}

// Format output
function formatResult(result) {
  if (result > 999999999999) {
    return result.toExponential(4);
  }
  return Math.round(result * 100) / 100;
}

// Math
function calculate(operandStack, operator) {
  return operandStack.reduce((prev, current) => {
    console.log(prev, current, operator);

    if (operator === '÷') {
      if (prev === 0 || current === 0) {
        return 'Error!';
      }
    }

    let result = operate(prev, current, operator);
    return formatResult(result);
  });
}

function operate(x, y, operator) {
  switch (operator) {
    case '+':
      return add(x, y);
    case '-':
      return subtract(x, y);
    case '×':
      return multiply(x, y);
    case '÷':
      return divide(x, y);
    default:
      return null;
  }
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
