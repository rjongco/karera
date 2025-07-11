import { Grid, Typography, styled } from "@mui/material";
import {
  getDefaultDateFormat,
  getGender,
  getRole,
} from "../../../../utils/logic";
import {
  canViewProfileCommission,
  canViewProfileCreditBalance,
  canViewProfileReferralLinkAgent,
  canViewProfileReferralLinkMA,
} from "../../../../utils/permissions/userManagement";

const GridRefLinkMAStyled = styled(Grid)(() => ({
  maxWidth: "170px",
}));

const GridRefLinkAgentStyled = styled(Grid)(() => ({
  maxWidth: "170px",
}));

export const PersonalInfo = (props: any) => {
  const { values } = props;
  return (
    <Grid container direction="column">
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Name:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {values?.fullName}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Account ID:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {values?.accountId}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Role:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {getRole(values?.role)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Gender:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {getGender(values?.gender)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Birthdate:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {getDefaultDateFormat(values?.birthdate)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Date of Birth:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {values?.placeOfBirth}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Nationality:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {values?.nationalities}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          direction="row"
          spacing={{ xs: "2px", md: "5px" }}
          sx={{ pb: "5px" }}
          alignContent="center"
        >
          <Grid item sx={{ width: "120px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Nature of Work:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {values?.natureOfWork}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {canViewProfileCreditBalance(values?.role) && (
        <Grid item xs={12} sm={12} md={12}>
          <Grid
            container
            direction="row"
            spacing={{ xs: "2px", md: "5px" }}
            sx={{ pb: "5px" }}
            alignContent="center"
          >
            <Grid item sx={{ width: "120px" }}>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                Credit Balance:
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                &#8369; {values?.Wallet?.balance}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      {canViewProfileCommission(values?.role) && (
        <Grid item xs={12} sm={12} md={12}>
          <Grid
            container
            direction="row"
            spacing={{ xs: "2px", md: "5px" }}
            sx={{ pb: "5px" }}
            alignContent="center"
          >
            <Grid item sx={{ width: "120px" }}>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                Commission:
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {values?.commission}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      {canViewProfileReferralLinkMA(values?.role) && (
        <Grid item xs={12} sm={12} md={12}>
          <Grid
            container
            direction="row"
            spacing={{ xs: "2px", md: "5px" }}
            sx={{ pb: "5px", width: "100%" }}
            alignContent="center"
          >
            <Grid item sx={{ maxWidth: "120px" }}>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                Master Agent Referral Link:
              </Typography>
            </Grid>
            <GridRefLinkMAStyled item>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {values?.referralLinkForMA}
              </Typography>
            </GridRefLinkMAStyled>
          </Grid>
        </Grid>
      )}
      {canViewProfileReferralLinkAgent(values?.role) && (
        <Grid item xs={12} sm={12} md={12}>
          <Grid
            container
            direction="row"
            spacing={{ xs: "2px", md: "5px" }}
            sx={{ pb: "5px" }}
            alignContent="center"
          >
            <Grid item sx={{ width: "120px" }}>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                Agent Referral Link:
              </Typography>
            </Grid>
            <GridRefLinkAgentStyled item>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {values?.referralLinkForAgent}
              </Typography>
            </GridRefLinkAgentStyled>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
