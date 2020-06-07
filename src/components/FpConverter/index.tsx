import React, { useState, ChangeEvent } from "react";
import { default as bemCssModules } from "bem-css-modules";
import { default as ContentStyles } from "./style.module.scss";
import { decToBinary, binaryToDec, decDecimalPartToBin, binDecimalToDec } from "../../utils/convertNumberSystem";

const style = bemCssModules(ContentStyles);

type IEEE754representation = {
  sign?: string;
  exponent?: {
    bin: string;
    dec: number;
    powerTo: number;
  };
  mantissa?: {
    bin?: string;
    dec?: number;
  };
};

const FpConverter: React.FC = () => {
  const [decValue, setDecValue] = useState("");
  const [binValue, setBinValue] = useState("");
  const [IEEE754representationToBin, setIEEE754ToBin] = useState<IEEE754representation>({
    sign: undefined,
    exponent: undefined,
    mantissa: undefined,
  });
  const [IEEE754representationToDec, setIEEE754ToDec] = useState<IEEE754representation>({
    sign: undefined,
    exponent: undefined,
    mantissa: undefined,
  });

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "0";
    const only0and1 = new RegExp(/^[01]+$/g);
    const maxLength32 = new RegExp(/^.{0,32}$/);

    if (e.target.id === "dec") {
      setDecValue(value);
    } else if (e.target.id === "bin") {
      if (only0and1.test(value) && maxLength32.test(value)) {
        setBinValue(value);
      }
    }
  };

  // floating-point method
  const decToBinaryFP = (entryDecValue: string) => {
    const IEEE754 = []; //result, 32length
    // if number is positive, first bit of IEEE is 0, otherwise 1 for negative
    const sign = parseFloat(entryDecValue) >= 0 ? "0" : "1";
    IEEE754.push(sign);

    const [wholePortion, decimalPortion] = entryDecValue.split(".");

    const wholeNumberBIN = decToBinary(wholePortion);
    const decimalNumberBIN = decDecimalPartToBin(decimalPortion || "0");
    const decNumberBIN = `${wholeNumberBIN}.${decimalNumberBIN}`;

    const powerTo = decNumberBIN.indexOf(".") - 1;
    const withoutDot = decNumberBIN.replace(".", "");
    const decNumberBinMovedDot = `${withoutDot.substr(0, 1)}.${withoutDot.substr(1)}`;

    // 127 because of it's single precision algorithm, for double precision 64bit i will be 1023
    const exponentDEC = 127 + powerTo;
    const exponentBIN = decToBinary(exponentDEC);

    exponentBIN.split("").forEach((bin) => IEEE754.push(bin));

    const [, mantissa] = decNumberBinMovedDot.split(".");

    mantissa.split("").forEach((bin) => IEEE754.push(bin));

    if (IEEE754.length < 32) {
      for (let i = 0; i < 32; i++) {
        if (typeof IEEE754[i] !== "string") IEEE754[i] = "0";
      }
    } else if (IEEE754.length > 32) {
      IEEE754.length = 32;
      IEEE754[31] = "1"; //cause of repeated mantissa
    }

    const result = IEEE754.join("");
    setBinValue(result);
    setIEEE754ToBin({
      sign,
      exponent: {
        bin: exponentBIN,
        dec: exponentDEC,
        powerTo,
      },
      mantissa: {
        bin: decNumberBinMovedDot.slice(0, 16),
      },
    });
  };

  const binaryToDecFP = (entryValueStr: string) => {
    const entryValueArr = entryValueStr.split("");

    if (entryValueArr.length < 32) {
      for (let i = 0; i < 32; i++) {
        if (typeof entryValueArr[i] !== "string") entryValueArr[i] = "0";
      }
    }
    setBinValue(entryValueArr.join(""));

    const sign = parseInt(entryValueArr[0]) ? "-" : "";
    const exponent = entryValueArr.join("").slice(1, 9);
    const exponentDEC = binaryToDec(exponent);
    const precision = parseInt(exponentDEC) - 127;
    const mantissa = entryValueArr.join("").slice(-23);
    const mantissaDec = binDecimalToDec(`1.${mantissa}`);

    const result = `${sign}${Math.pow(2, precision) * mantissaDec}`;
    setDecValue(result);

    setIEEE754ToDec({
      sign: parseInt(entryValueArr[0]).toString(),
      exponent: {
        bin: exponent,
        dec: parseInt(exponentDEC),
        powerTo: precision,
      },
      mantissa: {
        dec: mantissaDec,
        bin: `1.${mantissa}`,
      },
    });
  };

  return (
    <div className={style()}>
      {/* single precision because javascript floats cannot hold more bits */}
      <h1>IEEE-754 single precision (32bits)</h1>
      <div className={style("container")}>
        <div className={style("labeled-input")}>
          <label htmlFor="dec">Decimal number</label>
          {/* TODO: zablkowac ze tylko 16 miejc po przecinku */}
          <input id="dec" type="number" min="0" value={decValue} onChange={inputOnChange} />
        </div>

        <div className={style("buttons-container")}>
          <button onClick={() => decToBinaryFP(decValue)}>to BINARY &rarr;</button>
          <button onClick={() => binaryToDecFP(binValue)}>&larr; to DEC</button>
        </div>
        <div className={style("labeled-input")}>
          <label htmlFor="bin">Binary number</label>
          <input id="bin" type="number" value={binValue} onChange={inputOnChange} />
        </div>
      </div>
      <div className={style("iee754-representation")}>
        <div className={"results to-bin"}>
          <p>
            Sign: <span>{IEEE754representationToBin.sign || "---"}</span>
          </p>
          <div>
            Exponent:
            <span>
              {IEEE754representationToBin.exponent ? (
                <div className={"exponent"}>
                  <p>
                    2<sup>{IEEE754representationToBin.exponent.powerTo}</sup>
                  </p>
                  <p>DEC: {IEEE754representationToBin.exponent.dec}</p>
                  <p>BIN: {IEEE754representationToBin.exponent.bin} </p>
                </div>
              ) : (
                "---"
              )}
            </span>
          </div>
          <p>
            Mantissa: <span>{IEEE754representationToBin.mantissa?.bin || "---"}</span>
          </p>
        </div>

        <div className={"results to-dec"}>
          <p>
            Sign: <span>{IEEE754representationToDec.sign || "---"}</span>
          </p>
          <div>
            Exponent:
            <span>
              {IEEE754representationToDec.exponent ? (
                <div className={"exponent"}>
                  <p>
                    2<sup>{IEEE754representationToDec.exponent.powerTo}</sup>
                  </p>
                  <p>DEC: {IEEE754representationToDec.exponent.dec}</p>
                  <p>BIN: {IEEE754representationToDec.exponent.bin} </p>
                </div>
              ) : (
                "---"
              )}
            </span>
          </div>
          <p>
            Mantissa:
            <span>
              {IEEE754representationToDec.mantissa?.bin
                ? `${IEEE754representationToDec.mantissa?.bin} (in DEC: ${IEEE754representationToDec.mantissa?.dec})`
                : "---"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FpConverter;
