//VARIABLES
let arg1 = "";
let arg2 = "";
let operator = "";
let answer = "";

//QUERYSELECTOR
const numberButtons = document.querySelectorAll(".number-button");
const calculationDisplay = document.getElementById("calculation-display");
const answerDisplay = document.getElementById("answer-display");
const operatorButtons = document.querySelectorAll(".operator-button");
const decimalButton = document.getElementById("decimal-button");
const clearButton = document.getElementById("clear-button");
const enterButton = document.getElementById("enter-button");

const precisionRound = (number, precision) => {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
};



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

function operate(value, a, b) {

    switch (value) {
        case "add":
            return precisionRound(add(a, b), 10);
        case "subtract":
            return precisionRound(subtract(a, b), 10);
        case "multiply":
            return precisionRound(multiply(a, b), 10);
        case "divide":
            return precisionRound(divide(a, b), 10);
        default:
            return null;
    }

}

decimalButton.addEventListener("click", displayDecimal)

function displayDecimal(e) {
    if (!decimalButton.disabled) {
        displayNumber(e);
        decimalButton.disabled = true;
    }
}

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", displayNumber)
});

function displayNumber(e) {
    if (calculationDisplay.innerHTML.length < 20) {
        const number = e?.target?.value || e.key;
        calculationDisplay.innerHTML += number;

        if (!operator) {
            arg1 += number;
        } else {
            arg2 += number;
        }
    }
}

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", setOperator)
});

function setOperator(e) {
    if (calculationDisplay.innerHTML.length < 19) {
        if (operator) {
            calculate();
        }

        if (!operator) {
            console.log(e);
            operator = e?.target?.value || convertOperator(e.key);
            const operatorSign = e.key || e.target.innerHTML;
            calculationDisplay.innerHTML += operatorSign;
            decimalButton.disabled = false;
        }
    }
}

enterButton.addEventListener("click", calculate);

function calculate(e) {
    if (operator && arg1 && arg2) {
        answer = operate(operator, parseFloat(arg1), parseFloat(arg2));
        answerDisplay.innerHTML = answer;
        arg1 = answer;
        arg2 = ""
        operator = ""
    }
}

clearButton.addEventListener("click", clear);

function clear(e) {
    calculationDisplay.innerHTML = "";
    answerDisplay.innerHTML = "";
    arg1 = "";
    arg2 = "";
    decimalButton.disabled = false;
}

window.addEventListener('keydown', handleKeyboardInput)

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) displayNumber(e)
    if (e.key === '.') displayDecimal(e)
    if (e.key === '=' || e.key === 'Enter') calculate()
    if (e.key === 'Backspace') clear()
    //if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperator(e)
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return 'divide'
    if (keyboardOperator === '*') return 'multiply'
    if (keyboardOperator === '-') return 'subtract'
    if (keyboardOperator === '+') return 'add'
}
