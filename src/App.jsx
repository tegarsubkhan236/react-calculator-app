import Wrapper from "./components/Wrapper.jsx";
import Screen from "./components/Screen.jsx";
import ButtonBox from "./components/ButtonBox.jsx";
import Button from "./components/Button.jsx";
import { useState } from "react";

const btnValues = [
    ["c", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
    const [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });

    const performOperation = (a, b, sign) => {
        switch (sign) {
            case "+": return a + b;
            case "-": return a - b;
            case "X": return a * b;
            case "/": return b === 0 ? "Can't divide by 0" : a / b;
            default: return b;
        }
    };

    const handleClick = (btn) => {
        const num = removeSpaces(calc.num);
        const res = removeSpaces(calc.res);

        switch (btn) {
            case "c":
                setCalc({ sign: "", num: 0, res: 0 });
                break;
            case "+-":
                setCalc({ ...calc, num: num * -1, res: res * -1 });
                break;
            case "%":
                setCalc({ ...calc, num: num / 100, res: res / 100 });
                break;
            case "=":
                if (calc.sign && calc.num) {
                    setCalc({
                        ...calc,
                        res: toLocaleString(performOperation(Number(res), Number(num), calc.sign)),
                        sign: "",
                        num: 0,
                    });
                }
                break;
            case "/":
            case "X":
            case "-":
            case "+":
                setCalc({
                    ...calc,
                    sign: btn,
                    res: calc.num ? calc.num : calc.res,
                    num: 0,
                });
                break;
            case ".":
                setCalc({ ...calc, num: calc.num.includes(".") ? calc.num : calc.num + "." });
                break;
            default:
                setCalc({
                    ...calc,
                    num: num.length < 16 ? toLocaleString(num === "0" ? btn : num + btn) : calc.num,
                });
                break;
        }
    };

    return (
        <Wrapper>
            <Screen value={calc.num || calc.res} />
            <ButtonBox>
                {btnValues.flat().map((btn, i) => (
                    <Button
                        key={i}
                        className={btn === "=" ? "equals" : ""}
                        value={btn}
                        onClick={() => handleClick(btn)}
                    />
                ))}
            </ButtonBox>
        </Wrapper>
    );
}

export default App;