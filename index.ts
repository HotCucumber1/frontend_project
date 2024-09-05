function parseExpression(expression: string): string[]
{
    const DIGITS: string = "0123456789"
    let expressionElements: string[] = [];
    let currentNumber: string = "";
    for (let i = 0; i < expression.length; i++)
    {
        if (DIGITS.indexOf(expression[i]) > 0)
        {
            currentNumber += expression[i];
        }
        else
        {
            if (currentNumber !== "")
            {
                expressionElements.push(currentNumber);
                currentNumber = "";
            }
            if (expression[i] !== " ")
            {
                expressionElements.push(expression[i]);
            }
        }
    }
    if (currentNumber !== "")
    {
        expressionElements.push(currentNumber);
    }
    return expressionElements;
}


function calc(expression: string): number
{
    let brackets: number = 0;
    let stack: number[] = [];
    let expressionElements: string[] = parseExpression(expression).reverse();

    let element: string;
    for (let i = 0; i < expressionElements.length; i++)
    {
        element = expressionElements[i];
        if (brackets < 0)
        {
            console.log("Неверное расположение скобок");
            return NaN;
        }
        if (!isNaN(Number(element)))
        {
            stack.push(Number(element));
        }
        else if (element === '(')
        {
            brackets--;
        }
        else if (element === ')')
        {
            brackets++;
        }
        else
        {
            let first: number = stack.pop();
            let second: number = stack.pop();
            switch (element)
            {
                case '+':
                    stack.push(first + second);
                    break;
                case '-':
                    stack.push(first - second);
                    break;
                case '*':
                    stack.push(first * second);
                    break;
                case '/':
                    stack.push(first / second);
                    break;
                default:
                    console.log(`Символ ${element} не число и не действие`);
                    return NaN;
            }
        }
    }
    if (brackets !== 0)
    {
        console.log("Количество открывающих и закрывающих скобок не совпадает");
        return NaN;
    }
    if (stack.length !== 1)
    {
        return NaN;
    }
    return stack.pop();
}

const EXPRESSION_1 = "*(/(+2 2)(- 6 4)) 7";
const EXPRESSION_2 = "- * / 15 - 7 + 1 1 3 + 2 + 1 1";
let result = calc(EXPRESSION_1);
if (!isNaN(result))
{
    console.log(result);
}
else
{
    console.log("Количество чисел и действий не совпадает");
}