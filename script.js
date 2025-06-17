class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const previousOperandTextElement = document.querySelector('.previous-operation');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 150);
    });
});

operationButtons.forEach(button => {
    if (button.id !== 'equals' && button.id !== 'clear' && button.id !== 'delete') {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 150);
        });
    }
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
    equalsButton.classList.add('active');
    setTimeout(() => equalsButton.classList.remove('active'), 150);
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
    clearButton.classList.add('active');
    setTimeout(() => clearButton.classList.remove('active'), 150);
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
    deleteButton.classList.add('active');
    setTimeout(() => deleteButton.classList.remove('active'), 150);
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') calculator.appendNumber(e.key);
    else if (e.key === '.') calculator.appendNumber('.');
    else if (e.key === '+') calculator.chooseOperation('+');
    else if (e.key === '-') calculator.chooseOperation('-');
    else if (e.key === '*') calculator.chooseOperation('×');
    else if (e.key === '/') {
        e.preventDefault();
        calculator.chooseOperation('÷');
    }
    else if (e.key === 'Enter' || e.key === '=') calculator.compute();
    else if (e.key === 'Backspace') calculator.delete();
    else if (e.key === 'Escape') calculator.clear();
    
    calculator.updateDisplay();
});