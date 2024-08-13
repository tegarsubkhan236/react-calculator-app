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
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });

    const handleClick = (btn) => {
        switch (btn) {
            case "c":
                resetClickHandler();
                break;
            case "+-":
                invertClickHandler();
                break;
            case "%":
                percentClickHandler();
                break;
            case "=":
                equalsClickHandler();
                break;
            case "/":
            case "X":
            case "-":
            case "+":
                signClickHandler(btn);
                break;
            case ".":
                commaClickHandler();
                break;
            default:
                numClickHandler(btn);
                break;
        }
    };

    const numClickHandler = (value) => {
        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(calc.num) % 1 === 0
                            ? toLocaleString(Number(removeSpaces(calc.num + value)))
                            : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    };

    const commaClickHandler = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + "." : calc.num,
        });
    };

    const signClickHandler = (value) => {
        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });
    };

    const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            const math = (a, b, sign) =>
                sign === "+"
                    ? a + b
                    : sign === "-"
                        ? a - b
                        : sign === "X"
                            ? a * b
                            : a / b;

            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "/"
                        ? "Can't divide with 0"
                        : toLocaleString(
                            math(
                                Number(removeSpaces(calc.res)),
                                Number(removeSpaces(calc.num)),
                                calc.sign
                            )
                        ),
                sign: "",
                num: 0,
            });
        }
    };

    const invertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        });
    };

    const percentClickHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        });
    };

    const resetClickHandler = () => {
        setCalc({
            sign: "",
            num: 0,
            res: 0,
        });
    };

    return (
        <Wrapper>
            <Screen value={calc.num ? calc.num : calc.res} />
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