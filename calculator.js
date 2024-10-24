document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                if (shouldResetDisplay) {
                    currentInput = '';
                    shouldResetDisplay = false;
                }
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
                display.textContent = currentInput;
            } else if (value === 'C') {
                currentInput = '';
                operator = '';
                firstOperand = null;
                display.textContent = '0';
            } else if (value === '=') {
                if (operator && firstOperand !== null) {
                    const secondOperand = parseFloat(currentInput);
                    let result;
                    switch (operator) {
                        case '+':
                            result = firstOperand + secondOperand;
                            break;
                        case '-':
                            result = firstOperand - secondOperand;
                            break;
                        case '*':
                            result = firstOperand * secondOperand;
                            break;
                        case '/':
                            if (secondOperand === 0) {
                                display.textContent = 'Error';
                                return;
                            }
                            result = firstOperand / secondOperand;
                            break;
                    }
                    display.textContent = result;
                    currentInput = result.toString();
                    firstOperand = null;
                    operator = '';
                    shouldResetDisplay = true;
                }
            } else {
                if (currentInput) {
                    if (firstOperand === null) {
                        firstOperand = parseFloat(currentInput);
                    } else if (operator) {
                        const secondOperand = parseFloat(currentInput);
                        switch (operator) {
                            case '+':
                                firstOperand += secondOperand;
                                break;
                            case '-':
                                firstOperand -= secondOperand;
                                break;
                            case '*':
                                firstOperand *= secondOperand;
                                break;
                            case '/':
                                if (secondOperand === 0) {
                                    display.textContent = 'Error';
                                    return;
                                }
                                firstOperand /= secondOperand;
                                break;
                        }
                    }
                    operator = value;
                    currentInput = '';
                }
            }
        });
    });
});