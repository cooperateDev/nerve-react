import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";

import { NetworkContextName } from "../constants/networks";

export function useActiveWeb3React() {
  const context = useWeb3ReactCore();
  const contextNetwork = useWeb3ReactCore(NetworkContextName);
  // console.log( {context,contextNetwork})
  return context.active ? context : contextNetwork;
}
