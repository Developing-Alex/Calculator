let firstNum = '';
let secondNum = '';
let operator = '';
let result = 0;
let clickCount = 0;
let decimalClick = 0;

const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const display = document.querySelector('#display');
const operatorBtn = document.querySelectorAll('.operator');
const numberBtn = document.querySelectorAll('.number');
const equalsBtn = document.querySelector('#equals');
const decimalBtn = document.querySelector('#decimal');

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

function operate(numA, operator, numB) {
  if (operator === '+') {
    result = add(numA, numB);
    console.log(add(numA, numB));
  } else if (operator === '-') {
    result = subtract(numA, numB);
    console.log(subtract(numA, numB));
  } else if (operator === '*' || operator === 'x') {
    result = multiply(numA, numB);
    console.log(multiply(numA, numB));
  } else {
    result = divide(numA, numB);
    console.log(divide(numA, numB));
    if (numB === 0) {
      return "Can't divide by 0";
    }
  };
  return result;
}

//clears display upon clicking the clear button
function clearDisplay() {
  clearBtn.addEventListener('click', () => {
    display.value = display.ariaPlaceholder;
    firstNum = '';
    secondNum = '';
    operator = '';
    result = 0;
    clickCount = 0;
    decimalClick = 0;
    decimalBtn.disabled = false;
    console.clear();
  })
}

//deletes the last entered digit or operator from the display
function deleteDigit() {
  deleteBtn.addEventListener('click', () => {
    display.value = display.value.toString().slice(0, -1);
    if (operator === '') { // Read first number if no operator set yet
      firstNum = firstNum.slice(0, -1);
      console.log(firstNum)
    } else if (operator === true && secondNum === false) {
      operator = operator.slice(0, -1);
    } else { // Read second number
      secondNum = secondNum.slice(0, -1);
      console.log(secondNum)
    }
  })
}

//renders numbers to the display when corresponding numbered button is clicked and saves them to variables when an operator button is clicked
function displayNums() {
  numberBtn.forEach(number => {
    number.addEventListener("click", e => {
      operatorBtn.forEach(btn => btn.disabled = false);
      display.value += e.target.value;
      if (operator === '') {
        firstNum += e.target.value;
        console.log(firstNum)
      } else {
        secondNum += e.target.value;
        console.log(secondNum)
        if (decimalClick >= 1 && secondNum) {
          operate(parseFloat(firstNum), operator, parseFloat(secondNum));
        } else {
          operate(parseInt(firstNum), operator, parseInt(secondNum));
        }
      }
    });
  });
}

//renders operators to the display when corresponding operator is clicked
function displayOperators() {
  operatorBtn.forEach(op => {
    op.addEventListener("click", e => {
      clickCount++;
      display.value += e.target.value;
      operator = e.target.value;
      secondNum = '';
      decimalBtn.disabled = false;
      console.log(operator)
      if (clickCount >= 1) {
        operatorBtn.forEach(btn => btn.disabled = true)
      }
      if (clickCount >= 2) {
        firstNum = result;
      }
    });
  });
}

//renders decimal button on display element and add decimal point to either firstNum or secondNum depending on when decimalBtn is clicked
function displayDecimal() {
  decimalBtn.addEventListener('click', e => {
    display.value += e.target.value;
    decimalClick++;
    if (decimalClick === 1) {
      firstNum += e.target.value;
      decimalBtn.disabled = true;
    } else {
      secondNum += e.target.value;
      decimalBtn.disabled = true;
    }
  });
}

//renders result to the display element by using the clicking of the equals button to call operate() which then calls the subsequent math functions to calculate the result
function calculate() {
  equalsBtn.addEventListener('click', () => {
    display.value = result;
    decimalBtn.disabled = true;
    if (decimalClick < 1 && secondNum) {
      display.value = result;
    } else if (decimalClick >= 1) {
      display.value = result.toFixed(2);
    }
  });

}


//The function that runs the app
function calculator() {
  displayNums();
  displayOperators();
  displayDecimal();
  clearDisplay();
  deleteDigit();
  calculate();
};

calculator();
