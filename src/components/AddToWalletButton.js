import { addTokenToWallet } from "../utils/wallet";
import METAMASK_ICON from "../assets/icons/metamask.svg";

export default function AddToWalletButton({ token, icon, className }) {
  return (
    <button
      onClick={() => addTokenToWallet(token, icon)}
      className={`px-2 group border-gray-50 hover:border-gray-200 active:border-gray-300 rounded-full focus:ring-0 active:ring-0 outline-none transform-gpu transition duration-500 ease-in-out ${className}`}
    >
      {/* <small className="text-gray-500 group-focus:text-gray-600 hidden group-hover:inline-block transition duration-500 ease-in-out">
        Add to Wallet
      </small> */}
      <img src={METAMASK_ICON} className="h-6 w-6 inline" />
    </button>
  );
}
