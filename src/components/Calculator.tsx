import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks';
import { clear, evaluate, inputDigit, backspace } from '../features/calculatorSlice';
import React from 'react';


const buttons = [
  "C", "/", "*", "⌫",
  "7", "8", "9", "-",
  "4", "5", "6", "=",
  "1", "2", "3", "+",
  "00", "0", ".",
];

const ariaLabelMap: {
  [key in "C" | "/" | "*" | "⌫" | "-" | "=" | "+" | "." | "00"]: string;
} = {
  "C": "Clear",
  "/": "Divide",
  "*": "Multiply",
  "⌫": "Backspace",
  "-": "Subtract",
  "=": "Equals",
  "+": "Add",
  ".": "Decimal",
  "00": "Double Zero",
};

const Calculator = () => {
  const dispatch = useDispatch();
  const { expression, result } = useAppSelector((state) => state.calculator);

  const handleClick = (value: string) => {
    console.log("User Clicked");
    if (value === "=") dispatch(evaluate());
    else if (value === "C") dispatch(clear());
    else if (value === "⌫") dispatch(backspace());
    else dispatch(inputDigit(value));
  };

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        dispatch(evaluate());
      } else if (e.key === "Backspace") {
        dispatch(clear());
      } else if (e.key === "Escape") {
        dispatch(clear());
      } else {
        const validKeys = "0123456789/*-+.C="; // Valid keys (you can extend as needed)
        if (validKeys.includes(e.key)) {
          dispatch(inputDigit(e.key));
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);


  return (
    <section className="calculator">
      <div className="display-result" >
        <div className='sr-only' aria-live="polite">Result is {result}</div>
        {result === "0" ? expression || "0" : result}</div>
      <div className="buttons-grid">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)} className="calc-button"  >
            <span aria-label={(ariaLabelMap as any)[btn] || btn} className="sr-only"></span>
            <span aria-hidden="true">{btn}</span>
          </button>
        ))}
      </div>
      <kbd className='credits'>
        Press Esc - All clear, Enter - to evaluate
        <br />Created by <a href="https://github.com/ankushshewale" target='_blank' title='Github - Ankush Shewale'>Ankush</a></kbd>
    </section>
  )
}

export default Calculator