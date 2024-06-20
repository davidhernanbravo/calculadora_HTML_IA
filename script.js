// Obtener referencia a los elementos del DOM
const display = document.getElementById ('display');
const buttons = document.querySelectorAll ('.btn');

// Variables para el cálculo
let currentInput = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let shouldResetScreen = false;

// Agregar evento de click a cada botón
buttons.forEach(button => 
    {
        button.addEventListener ('click', () => 
            {
                const value = button.dataset.value;

                // Lógica para los diferentes botones
                switch (value) {
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                        handleOperator(value);
                        break;
                    case '=':
                        calculate();
                        break;
                    case 'C':
                        resetCalculator();
                        break;
                    default:
                        inputNumber(value);
                        break;
                }
                updateDisplay();
            });
    });

// Función para manejar la entrada de números
function inputNumber(number) 
    {
        if (shouldResetScreen) 
            {
                currentInput = number;
                shouldResetScreen = false;

            } else 
                {
                    currentInput = currentInput === '0' ? number : currentInput + number;
                }
    }

// Función para manejar las operaciones
function handleOperator(operator) 
    {
        if (currentOperation !== null) calculate();
        firstOperand = currentInput;
        currentOperation = operator;
        shouldResetScreen = true;
    }

// Función para realizar el cálculo
function calculate() 
    {
        if (currentOperation === null || shouldResetScreen) return;
        secondOperand = currentInput;
        currentInput = String(operate(Number(firstOperand), Number(secondOperand), currentOperation));
        currentOperation = null;
        shouldResetScreen = true;
    }

// Función para operar los números
function operate(a, b, operator) 
    {
        switch (operator) 
            {
                case '+':
                    return a + b;
                case '-':
                    return a - b;
                case '*':
                    return a * b;
                case '/':
                    if (b === 0) return 'Error';
                    return a / b;
                default:
                    return null;
            }
    }

// Función para actualizar la pantalla
function updateDisplay() 
    {
        display.textContent = currentInput;
    }

// Función para resetear la calculadora
function resetCalculator() 
    {
        currentInput = '0';
        firstOperand = null;
        secondOperand = null;
        currentOperation = null;
        shouldResetScreen = false;
    }