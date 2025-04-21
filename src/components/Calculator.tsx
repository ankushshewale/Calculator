import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks';
import { clear, evaluate, inputDigit } from '../features/calculatorSlice';


const buttons = [
    "C",
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",

];

const Calculator = () => {
    const dispatch = useDispatch();
    const { expression, result } = useAppSelector((state) => state.calculator);

    const handleClick = (value: string) => {
        if (value === "=") dispatch(evaluate());
        else if (value === "C") dispatch(clear());
        else dispatch(inputDigit(value));
    };

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
        </div>
    )
}

export default Calculator