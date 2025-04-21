export function evaluateExpression(expression: string): string {
    try {
        // Remove leading zeros before evaluation
        const sanitized = expression.replace(/\b0+(?=\d)/g, "");
        // Edge case: if expression ends with a dot or operator, return error
        if (/([+\-*/.]$)/.test(sanitized)) {
            return "Error";
        }
        // eslint-disable-next-line no-eval
        return eval(sanitized).toString();
    } 
    catch {
        return "Error";
    }
}