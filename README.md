# React + Redux + TypeScript Calculator App [(Live Demo)](https://calculatorbyankush.netlify.app)

## App Flow Overview

This document outlines the architecture and flow of our React calculator application built with Redux for state management and TypeScript for enhanced type safety.

### `index.tsx` — Entry Point

* Located at the root of the `src` directory.
* Serves as the application's starting point.
* Sets up the React application environment.
* Wraps the main `<App>` component with the Redux `<Provider>`. This crucial step makes the Redux store accessible to all components within the application.

### `App.tsx` — Root Component

* Acts as the top-level container for the application's UI.
* Its primary responsibility is to render the `<Calculator>` component, which houses the calculator's interface and logic.
* May contain basic layout or theming elements for the entire application.

### `components/Calculator.tsx` — UI + Event Handling

* This component is the heart of the calculator's user interface.
* **Displays:**
    * **Expression:** Shows the currently entered mathematical expression (e.g., `3 + 5`).
    * **Result:** Displays the computed result of the expression (e.g., `8`).
* **Renders:**
    * A comprehensive set of calculator buttons, including digits (0-9), arithmetic operators (+, -, \*, /), the equals button (=), and the clear button (C).
* **Handles User Interactions (Button Clicks):**
    * **Equals Button (=):** When clicked, it dispatches the `evaluate()` action. This triggers the calculation of the current expression stored in the Redux state.
    * **Clear Button (C):** Clicking this button dispatches the `clear()` action, which resets the calculator's state (expression and result) to its initial values.
    * **Digit and Operator Buttons:** When a digit or operator button is pressed, it dispatches the `inputDigit(value)` action. This action appends the clicked value to the currently building mathematical expression in the Redux state.

### `redux/` — Redux State Management

This directory houses all the Redux-related logic for the application.

#### `redux/store.ts` — Redux Store Configuration

* Responsible for creating and exporting the Redux store instance.
* Integrates the `calculatorReducer` (defined in `calculatorSlice.ts`) into the store, allowing it to manage the application's state related to the calculator.
* May include configuration for middleware if the application requires asynchronous actions or other store enhancements.

#### `hooks/index.ts` — Typed Redux Hooks

* Provides custom, type-safe hooks for interacting with the Redux store.
* **`useAppDispatch`:** A strongly typed version of the `useDispatch` hook from `react-redux`. It ensures that dispatched actions are correctly typed according to our Redux setup.
* **`useAppSelector`:** A strongly typed version of the `useSelector` hook from `react-redux`. It allows components to easily access specific parts of the Redux state with proper type inference.

#### `features/calculator/calculatorSlice.ts` — Redux Slice for Calculator

* Defines a "slice" of the Redux store specifically for the calculator feature.
* **State:**
    * `expression: string`: Stores the mathematical expression being built by the user (e.g., `"2 + 3"`).
    * `result: string`: Holds the evaluated result of the expression (e.g., `"5"`).
* **Reducers:**
    * `inputDigit(state, action: PayloadAction<string>)`: Updates the `expression` state by appending the provided digit or operator.
    * `clear(state)`: Resets both the `expression` and `result` states to their initial empty or zero values.
    * `evaluate(state)`:
        * Calls the `evaluateExpression` function (from `utils/calculate.ts`) with the current `expression`.
        * Updates the `result` state with the returned value. If `evaluateExpression` encounters an error, the `result` state will be set to `"Error"`.

### `utils/calculate.ts` — Expression Evaluation Logic

* Contains the core logic for evaluating mathematical expressions.
* **`evaluateExpression(expression: string): string`:**
    * **Sanitizes Expression:** Performs initial cleanup of the input expression, such as removing leading zeros to prevent issues with `eval()`.
    * **Validates Ending:** Checks if the expression ends with a valid operand (a number) and not an operator. This helps prevent common evaluation errors.
    * **Computes Result:** Utilizes JavaScript's built-in `eval()` function to dynamically execute the sanitized mathematical expression string.
    * **Error Handling:** Includes a `try...catch` block to gracefully handle potential errors during the evaluation process (e.g., syntax errors, division by zero). If an error occurs, it returns the string `"Error"`.

### `types/calculatorTypes.ts` — Type Definitions

* Contains TypeScript type definitions and interfaces specific to the calculator feature.
* This helps ensure type safety throughout the codebase, particularly when dealing with Redux actions and state.

### `index.css` — Global Styles

* Provides general styling for the entire application.
* May include settings for background color, default font styles, and basic layout configurations (e.g., centering the calculator on the screen).

### `app.css` — Calculator Component Styles

* Contains CSS rules specifically for styling the `<Calculator>` component and its child elements (display area, buttons).
* Employs plain CSS for styling, indicating a decision not to use CSS-in-JS or utility-first CSS frameworks like Tailwind CSS for this particular component.

## ✅ UX Behavior

The application is designed with a straightforward and intuitive user experience:

1.  **Expression Building:** As the user clicks on digit and operator buttons, the corresponding values are appended to the **expression** displayed on the screen.
2.  **Evaluation:** When the user clicks the **=** button:
    * The application takes the current **expression**.
    * The `evaluateExpression` function processes the expression.
    * The calculated **result** is then displayed above the **expression**.
3.  **Clearing:** Clicking the **C** button resets the calculator:
    * The **expression** and **result** display is cleared.
