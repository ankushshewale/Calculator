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

const Calculator = () => {
    const dispatch = useDispatch();
    const { expression, result } = useAppSelector((state) => state.calculator);

    const handleClick = (value: string) => {
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
        <div className="calculator">
            <div className="display-result">{result === "0" ? expression || "0" : result}</div>
            <div className="buttons-grid">
                {buttons.map((btn) => (
                    <button key={btn} onClick={() => handleClick(btn)} className="calc-button">
                        {btn}
                    </button>
                ))}
            </div>
            <kbd className='credits'>
                Press Esc - All clear, Enter - to evaluate
                <br />Created by <a href="https://github.com/ankushshewale" target='_blank' title='Github - Ankush Shewale'>Ankush</a></kbd>
        </div>
    )
}

export default Calculator