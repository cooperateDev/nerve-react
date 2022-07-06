import PageWrapper from "../../components/layouts/PageWrapper";
import StandardPageContainer from "../../components/layouts/StandardPageContainer";

import Grid from "../../components/tailwind/Grid";
import BridgeCard from "./BridgeCard";

export default function BridgePage() {
  return (
    <PageWrapper>
      <StandardPageContainer
        title="Nerve Bridge"
        subtitle="Powered by Anyswap Network"
      >
        {/* <div className="pt-4 pb-6">
          <p className="text-white font-medium prose text-md">
            Only use personal wallets. Depositing from an exchange may cause
            loss of funds.
          </p>
        </div> */}
        <Grid className="place-items-center" cols={{ xs: 1 }}>
          <BridgeCard />
        </Grid>
      </StandardPageContainer>
    </PageWrapper>
  );
}
