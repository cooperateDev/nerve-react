import { useActiveWeb3React } from "../hooks/useActiveWeb3React";

import { useAirdropContract } from "../hooks/useContract";
import BscScanToastLink from "../components/BscScanToastLink";

import { useToasts } from "react-toast-notifications";

export function useClaimAirdrop() {
  const { account, chainId } = useActiveWeb3React();
  const nrvAirdropContract = useAirdropContract();
  const { addToast } = useToasts();

  return async function claimAirdrop() {
    if (!account) throw new Error("Wallet must be connected");

    const airdropTransaction = await nrvAirdropContract.claim(account);
    const tx = await airdropTransaction.wait();

    if (tx?.status == 1) {
      addToast("Claimed", {
        appearance: "success",
        autoDismiss: true,
      });
    }

    return Promise.resolve();
  };
}
