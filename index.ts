function calc(expression: string): number
{
    let brackets: number = 0;
    let stack: number[] = [];
    let expressionElements: string[] = expression.split(/\s+/).reverse()
    // решить вопрос со скобками

    expressionElements.forEach(element => {
        if (brackets < 0)
        {
            console.log('Неверное расположение скобок');
            return NaN;
        }
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
                case '(':
                    brackets++;
                    break;
                case ')':
                    brackets--;
                    break;
                default:
                    console.log(`Символ ${element} не число и не действие`);
                    return NaN;
            }
        }

    });
    if (brackets !== 0)
    {
        return stack.pop();
    }
    console.log(`Неверное расположение скобок`);
    return NaN;
}

const EXPRESSION = "* ( − 5 6 ) 7";
let result = calc(EXPRESSION);
if (!isNaN(result))
{
    console.log(result);
}
