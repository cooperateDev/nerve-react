import { useXNerveContract, useAllContracts } from "../hooks/useContract";

// import { AppState } from '../state'
// import { Erc20 } from '../../types/ethers-contracts/Erc20'
import checkAndApproveTokenForTrade from "../utils/checkAndApproveTokenForTrade";

// import { updateLastTransactionTimes } from '../state/application'
import { useActiveWeb3React } from "../hooks/useActiveWeb3React";
import { formatBNToString } from "../utils";
import { useToasts } from "react-toast-notifications";
import BscScanToastLink from "../components/BscScanToastLink";
// import { useDispatch, useSelector } from 'react-redux'
// import { useToast } from './useToast'

export function useApproveAndDepositXNerve() {
  const { addToast } = useToasts();
  const tokenContracts = useAllContracts();
  const { account } = useActiveWeb3React();
  // const { addToast, clearToasts } = useToast()

  const xNerveContract = useXNerveContract();

  return async function approveAndDepositXNerve(state) {
    console.log("approveAndDepositXNerve");
    if (!account) throw new Error("Wallet must be connected");
    if (!xNerveContract) throw new Error("XNRV contract is not loaded");

    // For each token being used, check the allowance and approve it if necessary
    const nrvContract = tokenContracts?.NRV;
    if (nrvContract == null) {
      console.log("null contract");
      return;
    }
    const { amount } = state;

    await checkAndApproveTokenForTrade(
      nrvContract,
      xNerveContract.address,
      account,
      state.amount,
      state.infiniteApproval,
      {
        onTransactionStart: () => {
          /* THESE DONT WORK */
          // console.log( "FUCK")
          // const toastContent = (
          //   <div>
          //     Minting {formatBNToString(amount, 18, 2)} xNRV
          //   </div>
          // )
          // return addToast(toastContent, {
          //   appearance: 'info',
          //   autoDismiss: true,
          // })
        },
        onTransactionSuccess: () => {
          /* THESE DONT WORK */
          // console.log("FUCK")
          // const toastContent = (
          //   <div>
          //     Successfully minted {formatBNToString(amount, 18, 2)} xNRV
          //   </div>
          // )
          // addToast(toastContent, {
          //   appearance: 'success',
          //   autoDismiss: true,
          // })
        },
        onTransactionError: () => {
          /* THESE DONT WORK */
          // console.log("FUCK")
          // const toastContent = (
          //   <div>
          //     Failed to mint xNRV. Your transaction could not be completed.
          //   </div>
          // )
          // addToast(toastContent, {
          //   appearance: 'error',
          //   autoDismiss: true,
          // })
          throw new Error("Your transaction could not be completed");
        },
      }
    );
    const xNerveEnterTx = await xNerveContract.enter(state.amount);

    const tx = await xNerveEnterTx.wait();
    const toastContent = (
      <>
        Successfully minted {formatBNToString(state.amount, 18, 2)} xNRV
        <br />
        <BscScanToastLink {...tx} />
      </>
    );

    addToast(toastContent, {
      appearance: "success",
      autoDismiss: true,
    });
  };
}
