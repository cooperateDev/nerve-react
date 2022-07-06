import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { Zero } from "@ethersproject/constants";

import { SWAPABLE_TOKENS_MAP } from "../constants";

/**
 * Parses a user input string into a BigNumber.
 * Uses the native precision of the token if a tokenSymbol is provided
 * Defaults to a value of 0 if string cannot be parsed
 *
 * @param {string} valueRaw
 * @param {number} precision
 * @param {BigNumber} fallback
 * @return {Object} result
 * @return {BigNumber} result.value
 * @return {boolean} result.isFallback
 * }
 */
export default function parseStringToBigNumber(valueRaw, precision, fallback) {
  let valueSafe;
  let isFallback;
  try {
    // attempt to parse string. Use fallback value if library error is thrown
    valueSafe = parseUnits(valueRaw, precision);
    isFallback = false;
  } catch {
    valueSafe = fallback ?? Zero;
    isFallback = true;
  }
  return { value: valueSafe, isFallback };
}

/**
 * Parses a user input string into a BigNumber.
 * Uses the native precision of the token if a tokenSymbol is provided
 * Defaults to a value of 0 if string cannot be parsed
 * @param {string} value
 * @param {string} tokenSymbol
 * @return {Object} result
 * @return {BigNumber} result.value
 * @return {boolean} result.isFallback */
export function parseStringAndTokenToBigNumber(value, tokenSymbol) {
  return parseStringToBigNumber(
    value,
    tokenSymbol ? SWAPABLE_TOKENS_MAP[tokenSymbol]?.decimals : 18,
    Zero
  );
}
