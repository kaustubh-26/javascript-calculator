import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { RootState } from './app/store'
import { useEffect } from 'react'
import { clearAnswer, clearExpression, setAnswer, setExpression} from './features/calc/calcSlice'


function App() {

  const keys = useSelector((state: RootState) => state.keys)
  const answer = useSelector((state: RootState) => state.answer)
  const expression = useSelector((state: RootState) => state.expression)
  const dispatch = useDispatch();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  }

  const calculate = () => {
    const et = expression.trim();
    if(isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];

    for(let i = parts.length-1; i >= 0; i--) {
      if(["*","/","+"].includes(parts[i]) && isOperator(parts[i-1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i-1;
        while(isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if(isOperator(newExpression.charAt(0))) {
      const result = eval(answer + newExpression) as string;
      dispatch(setAnswer(result))
    } else {
      const result = eval(newExpression) as string;
      dispatch(setAnswer(result))
    }
    dispatch(setExpression(""))
  }

  const buttonPress = (symbol: string) => {
    const et = expression.trim();
    if(symbol === 'clear') {
      dispatch(clearAnswer())
      dispatch(clearExpression())
      return;
    } else if(symbol === 'negative') {
      if(answer === "") return;
      dispatch(setAnswer(
        answer.toString().charAt(0) === '-' ? answer.slice(1) : '-' + answer
      ))
    } else if(symbol === "percentage") {
      if(answer === "") return;
      dispatch(setAnswer(
        ((parseFloat(answer)) / 100).toString()
      ));
    } else if(isOperator(symbol)) {
      dispatch(setExpression(et + " " + symbol + " "))
    } else if(symbol === "=") {
      calculate();
    } else if(symbol === "0") {
      if(expression.charAt(0) !== "0") {
        dispatch(setExpression(expression + symbol));
      }
    } else if(symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if(lastNumber?.includes(".")) return;
      dispatch(setExpression(expression + symbol));
    } else {
      if(expression.charAt(0) === "0") {
        dispatch(setExpression(expression.slice(1) + symbol));
      } else {
        dispatch(setExpression(expression + symbol));
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (/[0-9]/.test(key)) {
      if (key === 'F9') {
        buttonPress("negative");
      } else {
        buttonPress(key);
      }
    } else if (key === '.') {
      buttonPress(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      buttonPress(key);
    } else if (key === 'Enter') {
      if(expression === "") return;
      buttonPress('=');
    } else if (key === 'Backspace') {
      buttonPress('clear');
    } else if (key === 'Escape') {
      buttonPress('clear');
    } else if (key === 'Delete') {
      buttonPress('clear');
    } 
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expression, answer]);

  return (
    <>
      <div id='app-container'>
        <h1 id='app-title'>Calculator App</h1>
        <div id='calculator'>
            <div id="display">
              <div id="answer">{answer}</div>
              <div id="expression">{expression}</div>
            </div>
            {
              keys.map((key, index) => (
                (key.id === 'zero') ? 
                <button id={key.id} key={index} onClick={() => {buttonPress(key.function)}} className={`calc-button btn-zero ${key.color}`}>{key.text}</button> :
                <button id={key.id} key={index} onClick={() => {buttonPress(key.function)}} className={`calc-button ${key.color}`}>{key.text}</button>
              ))
            }
          </div>
      </div>
    </>
  )
}

export default App
