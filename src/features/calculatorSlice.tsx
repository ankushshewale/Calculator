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
            state.expression += action.payload;
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
        }
    }
});
export const { inputDigit, clear, evaluate } = calculatorSlice.actions;
export default calculatorSlice.reducer;