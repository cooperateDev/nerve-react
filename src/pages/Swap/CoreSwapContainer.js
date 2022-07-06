import { useRef } from "react";
import classNames from "classnames";
import _ from "lodash";

import { Zero } from "@ethersproject/constants";

import { Menu } from "@headlessui/react";

import { SWAPABLE_TOKENS_MAP } from "../../constants";

import { formatBNToString } from "../../utils";

import { useTokenBalance } from "../../hooks/useTokenBalances";

import { SwitchVerticalIcon, ChevronDownIcon } from "@heroicons/react/outline"; //SwitchVerticalIcon

import {
  getSwapBorderStyleForCoin,
  getInputBorderFocusStyleForCoin,
  getMenuItemBgForCoin,
  getMenuItemHoverBgForCoin,
  getSwapBorderHoverStyleForCoin,
} from "../../utils/coinStyles";

import MiniMaxButton from "./MiniMaxButton";

export default function CoreSwapContainer({
  selected,
  inputValue,
  isSwapFrom,
  onChangeAmount,
  swapFromToCoins,
  setDisplayType,
  inputRef,
}) {
  const ref = useRef(null);
  const tokenBalance =
    useTokenBalance(SWAPABLE_TOKENS_MAP[selected.symbol]) ?? Zero;
  const formattedBalance = formatBNToString(tokenBalance, selected.decimals, 4);

  function onClick() {
    ref?.current?.focus();
  }

  function onChange(e) {
    let val = e.target.value;

    if (val == "") {
      onChangeAmount("");
    }
    if (
      val.match(/[0-9.]+/) &&
      !val.match(/[a-zA-Z-\$\/]/) &&
      !val.includes("\\")
    ) {
      onChangeAmount(val.replace(/[$,]/g, ""));
    }
  }

  function onClickBalance() {
    onChangeAmount(formattedBalance);
  }

  return (
    <div
      className={classNames("text-left px-4 pt-2 pb-4 rounded-xl ", {
        [getMenuItemBgForCoin(selected)]: !isSwapFrom,
        ["mt-12"]: !isSwapFrom,
        ["bg-dark-purple"]: isSwapFrom,
      })}
    >
      <div>
        <div
          className={classNames("pb-1 inline-block", {
            "pt-3": !isSwapFrom,
          })}
        >
          {!isSwapFrom && (
            <div className="absolute">
              <div className="-mt-10">
                <SwitchButton selected={selected} onClick={swapFromToCoins} />
              </div>
            </div>
          )}
          {isSwapFrom ? "From" : "To"}
        </div>

        {isSwapFrom && (
          <a onClick={onClickBalance} className="hover:underline group">
            <small className="inline-block float-right mt-1 text-coolGray-500 group-hover:underline cursor-pointer">
              Max:{" "}
              <span className="text-coolGray-800 font-medium ">
                {formattedBalance}
              </span>{" "}
              {selected.symbol}
            </small>
          </a>
        )}
      </div>
      <div className={"h-16 flex space-x-2"}>
        <div
          className={
            "rounded-xl -ml-2 px-2 py-2 h-16 flex-grow hover:bg-purple"
          }
        >
          <div
            className="flex self-center"
            onClick={() => setDisplayType(isSwapFrom ? "from" : "to")}
          >
            <div className="mr-4 flex-shrink-0 self-center hidden sm:block">
              <img className="w-8 h-8 " src={selected.icon} />
            </div>
            <div className="text-left cursor-pointer">
              <h4 className="text-lg font-medium ">
                {selected.symbol}
                <ChevronDownIcon className="w-4 inline -mt-1 ml-2 text-coolGray-600 transform transition-all" />
              </h4>
              <p className="text-sm text-gray-500 hidden sm:block ">
                {selected.name}
              </p>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "flex-grow items-stretch  h-16  border px-3 sm:px-4 py-1 sm:py-2 rounded-xl ",
            {
              "bg-coolGray-50 border-coolGray-100 focus-within:border-coolGray-300":
                isSwapFrom,
              ["border-coolGray-100 " +
              getInputBorderFocusStyleForCoin(selected)]: !isSwapFrom,
            }
          )}
        >
          <input
            ref={inputRef}
            pattern="[0-9.]+"
            className={`
              ml-auto mr-2
              focus:outline-none
              bg-transparent
              h-full font-mono
              `}
            placeholder="0.0"
            onChange={onChange}
            value={inputValue}
          />
          {isSwapFrom && (
            <div className={"hidden sm:inline-block"}>
              <MiniMaxButton
                tokenBalance={tokenBalance}
                formattedBalance={formattedBalance}
                inputValue={inputValue}
                onClickBalance={onClickBalance}
                selected={selected}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SwitchButton({ selected, onClick }) {
  return (
    <div className={"rounded-full " + getSwapBorderStyleForCoin(selected)}>
      <div
        onClick={onClick}
        className={classNames(
          "rounded-full border-3 inline-block p-2 bg-blue",
          "transform transition-all duration-100",
          "active:rotate-180",
          getSwapBorderStyleForCoin(selected),
          getSwapBorderHoverStyleForCoin(selected)
        )}
      >
        <SwitchVerticalIcon className="w-5 h-5 text-coolGray-600 hover:text-coolGray-900" />
      </div>
    </div>
  );
}
