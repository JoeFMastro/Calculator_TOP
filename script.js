
//math operations on the calculator
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: división por 0";
  }
  return a / b;
}

function operate(op, num1, num2) {
  if (op === "+") return add(num1, num2);
  if (op === "-") return subtract(num1, num2);
  if (op === "*") return multiply(num1, num2);
  if (op === "/") return divide(num1, num2);
}


let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayReset = false;

const display = document.getElementById("display");
const expression = document.getElementById("expression");

function updateDisplay(val) {
  display.textContent = val;
}

function updateExpression(val) {
  expression.textContent = val;
}


function addNumber(num) {
  if (displayReset) {
    firstNumber = "";
    displayReset = false;
  }
  if (operator === '') {
    // adding first number
    firstNumber += num;
    updateDisplay(firstNumber);
  } else {
    // adding second number
    secondNumber += digit;
    updateDisplay(secondNumber);
  }
}

function setOperator(op) {
  // If we have both numbers and an operator, evaluate first
  if (firstNumber !== '' && secondNumber !== '' && operator !== '') {
    calculate();
    if (display.textContent?.startsWith("Don't"))
      return; // error state
  }
  // If there's no first number, do nothing
  if (firstNumber === '')
    return;
  // Update operator (allow changing operator without evaluating)
  operator = op;
  secondNumber = '';
  shouldResetDisplay = false;
  updateExpression(`${firstNumber} ${operator}`);
}

function calculate() {
  if (firstNumber === '' || secondNumber === '' || operator === '')
    return;
  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);
  const result = operate(operator, a, b);
  if (typeof result === 'string') {
    updateDisplay(result);
    updateExpression('');
    clearState();
    return;
  }
  const resultStr = roundResult(result);
  updateExpression(`${firstNumber} ${operator} ${secondNumber} =`);
  updateDisplay(resultStr);
  firstNumber = resultStr;
  secondNumber = '';
  operator = '';
  shouldResetDisplay = true;
}