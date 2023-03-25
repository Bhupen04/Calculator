// Get references to the HTML elements that will be used in the calculator
const display = document.getElementById("display");
const output = document.getElementById("output");
const buttons = document.querySelectorAll("button");

// Initialize variables to store the state of the calculator.
// Variables will be updated as the user interacts with the caluculator.
let previousNumber = null;
let currentNumber = null;
let operator = null;
let result = null;

// Helper functions that will perform basic arithmetic operations
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
  return a / b;
}

// Callback function that is called when the user clicks on a button.
function handleClick(event) {
  const button = event.target;
  const value = button.textContent;

if (!isNaN(value)) {
  if (currentNumber === null) {
    currentNumber = value;
  } else {
    currentNumber += value;
  }
  display.value = currentNumber;
}

// This block of code is executed when the user clicks on an operator
if (value === "+" || value === "-" || value === "*" || value === "/") {
  if (previousNumber === null) {
    previousNumber = currentNumber;
    currentNumber = null;
  } else if (currentNumber !== null) {
    result = operate(previousNumber, currentNumber, operator);
    previousNumber = result;
    currentNumber = null;
    display.value = result;
  }
  operator = value;
}

// This block of code is executed when the user clicks on the equal button
if (value === "=") {
  if (previousNumber !== null && currentNumber !== null) {
    result = operate(previousNumber, currentNumber, operator);
    previousNumber = null;
    currentNumber = result;
    operator = null;
    display.value = result;
  }
}

// This block of code is executed when the user clicks on the "C" button
if (value === "C") {
  previousNumber = null;
  currentNumber = null;
  operator = null;
  result = null;
  display.value = "";
}
}

// This block of code performs arithmetic operations bsed on the operator passed to it
function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "Infinity";
      } else {
        return divide(a, b);
      }
  }
}

// Attach event listeners to all the buttons
buttons.forEach(button => {
  button.addEventListener("click", handleClick);
});