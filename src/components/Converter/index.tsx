import React, { useState, ChangeEvent } from "react";
import { default as bemCssModules } from "bem-css-modules";
import { default as ContentStyles } from "./style.module.scss";

const style = bemCssModules(ContentStyles);

const Converter: React.FC = () => {
  const [decValue, setDecValue] = useState("");
  const [binValue, setBinValue] = useState("");

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "0";
    const only0and1 = new RegExp(/^[01]+$/g);

    if (e.target.id === "dec") {
      setDecValue(value);
      setBinValue(decToBinary(value));
    } else if (e.target.id === "bin") {
      if (only0and1.test(value)) {
        setBinValue(value);
        setDecValue(binaryToDec(value));
      }
    }
  };

  const decToBinary = (entryDecValue: string) => {
    let entryValue = parseFloat(entryDecValue);
    let result = "0";

    if (entryValue) {
      const binaryNumber = [];

      for (let i = 0; entryValue > 0; i++) {
        binaryNumber.push(entryValue % 2);
        entryValue = Math.floor(entryValue / 2);
      }

      result = binaryNumber.reverse().join("");
    }

    return result;
  };

  const binaryToDec = (entryValueStr: string) => {
    let result = 0;

    if (binValue) {
      let j = 0;
      for (let i = entryValueStr.length; i > 0; i--) {
        const n = parseInt(entryValueStr[i - 1]);
        result += Math.pow(2, j) * n;
        j++;
      }
    }

    return result.toString();
  };

  return (
    <div className={style()}>
      <div className={style("container")}>
        <div className={style("labeled-input")}>
          <label htmlFor="dec">Decimal number</label>
          <input
            id="dec"
            type="number"
            min="0"
            value={decValue}
            onChange={inputOnChange}
          />
        </div>

        <div className={style("buttons-container")}>
          {/* <button onClick={decToBinary}>to BINARY &rarr;</button>
          <button onClick={binaryToDec}>&larr; to DEC</button> */}
        </div>
        <div className={style("labeled-input")}>
          <label htmlFor="bin">Binary number</label>
          <input
            id="bin"
            type="number"
            value={binValue}
            onChange={inputOnChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Converter;
