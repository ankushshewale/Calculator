import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalculatorState } from "../types/calculatorTypes";
import { evaluateExpression } from "../utils/calculate";

const initialState: CalculatorState = {
    expression: "",
    result: "0",
}

const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        inputDigit: (state, action: PayloadAction<string>) => {
            const value = action.payload;
            const lastChar = state.expression.slice(-1);
            const operators = ["+", "-", "*", "/", "."];

            // Prevent multiple operators in a row
            if (operators.includes(value) && operators.includes(lastChar)) {
                return; // Do nothing if last and current are both operators
            }

            // Prevent starting expression with an operator (except "-")
            if (state.expression === "" && operators.includes(value) && value !== "-") {
                return;
            }

            state.expression += value;
        },
        clear: (state) => {
            state.expression = "";
            state.result = "0";
        },
        evaluate: (state) => {
            try {
                state.result = evaluateExpression(state.expression);
            } catch {
                state.result = "Error";
            }
        },
        backspace: (state) => {
            state.expression = state.expression.slice(0, -1);
        }
    }
});
export const { inputDigit, clear, evaluate, backspace } = calculatorSlice.actions;
export default calculatorSlice.reducer;