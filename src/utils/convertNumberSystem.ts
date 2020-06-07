import math from "mathjs";

export const decToBinary = (entryDecValue: string | number) => {
  let entryValue = typeof entryDecValue === "string" ? parseFloat(entryDecValue) : entryDecValue;
  let result = "0";
  //  TODO ogarnac decToBin dla ujemnych
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

export const binaryToDec = (entryValue: string) => {
  let result = 0;

  if (entryValue) {
    let j = 0;
    for (let i = entryValue.length; i > 0; i--) {
      const n = parseInt(entryValue[i - 1]);
      result += Math.pow(2, j) * n;
      j++;
    }
  }

  return result.toString();
};

// fixed-point:
// example input: 0.125
export const decDecimalPartToBin = (entryDecimalNumber: string) => {
  // const decimalPortion = entryDecimalPortion.includes(".")
  //   ? entryDecimalPortion
  //   : `0.${entryDecimalPortion}`;
  const decimalPortion = `0.${entryDecimalNumber}`;

  let entry = parseFloat(decimalPortion);
  const resultArr = [];
  const usedDecimals = [] as string[];

  while (entry !== 0) {
    entry = entry * 2;

    if (usedDecimals.includes(entry.toString())) break;

    const [, decimal] = entry.toString().split(".");
    if (decimal) usedDecimals.push(decimal);

    if (entry >= 1) {
      entry -= 1;
      resultArr.push("1");
    } else if (entry < 1) resultArr.push("0");
  }

  const result = resultArr.join("");

  return result;
};
