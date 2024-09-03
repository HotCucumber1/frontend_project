function calc(expression: string): number
{
    let stack: number[] = [];
    let expressionElements: string[] = expression.split(/\s+/).reverse();
    console.log(expressionElements);

    expressionElements.forEach(element => {
        if (!isNaN(Number(element)))
        {
            stack.push(Number(element));
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

    });
    return stack.pop();
}

const EXPRESSION = "+ 7 -2";
let result = calc(EXPRESSION);
if (!isNaN(result))
{
    console.log(result);
}
