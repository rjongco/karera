import { Grid, Paper, Typography, Button } from "@mui/material";
import { ROLES } from "../../../constants";
import { ReferralTab } from "./ReferralTab";

export const UserProfileReferral = (props: any) => {
  const { authInfo, copyReferralLink, generateCode } = props;
  console.log(authInfo);
  const renderReferralTab = () => {
 
    if (authInfo?.role === ROLES.SUPERAGENT.name) {
      return (
        <ReferralTab
          authInfo={authInfo}
          referralCodeForSA={authInfo?.referralCodeForSA}
          referralCodeForMA={null} // Super Agent Cannot Create Agent
          referralCodeForAgent={authInfo?.referralCodeForAgent}
          copyReferralLink={copyReferralLink}
          generateCode={generateCode}
        />
      );
    } else if (authInfo?.role === ROLES.MASTERAGENT.name) {
      return (
        <ReferralTab
          authInfo={authInfo}
          referralCodeForSA={null} // Master Agent Cannot Super Agent
          referralCodeForMA={authInfo?.referralCodeForMA}
          referralCodeForAgent={authInfo?.referralCodeForAgent}
          copyReferralLink={copyReferralLink}
          generateCode={generateCode}
        />
      );
    } else if (authInfo?.role === ROLES.AGENT.name) {
      return (
        <ReferralTab
          authInfo={authInfo}
          referralCodeForSA={null} // Agent Cannot Super Agent
          referralCodeForMA={null} // Agent Cannot Master Agent
          referralCodeForAgent={authInfo?.referralCodeForAgent}
          copyReferralLink={copyReferralLink}
          generateCode={generateCode}
        />
      );
    }
  };

  return (
    <Grid item xs={12} md={12} lg={12} xl={12}>
      <Paper
        sx={{
          mx: 1,
          border: "1px solid #c5c5c5",
          pb: 3,
          mb: 2,
        }}
      >
        <Grid container direction="column" sx={{ mt: 2 }}>
          <Grid item sx={{ mb: 0 }}>
            {renderReferralTab()}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
