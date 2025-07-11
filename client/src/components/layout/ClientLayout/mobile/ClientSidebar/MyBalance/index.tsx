import { Box, Grid, Typography, styled, Button } from "@mui/material";
import SidebarBalanceRefresh from "../../../../../../assets/images/sidebar-balance-refresh.png";
import SidebarBalancePlus from "../../../../../../assets/images/sidebar-balance-plus.png";
import SidebarBalanceMinus from "../../../../../../assets/images/sidebar-balance-minus.png";

const DepositButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(55, 100%, 50%, 1) 0%, hsla(47, 100%, 50%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
  border: "2px solid #FFFFFF",
}));

const WithdrawButton = styled(Button)(() => ({
  background:
    "linear-gradient(180deg, hsla(185, 80%, 51%, 1) 0%, hsla(205, 92%, 62%, 1) 100%)",
  boxShadow: "none",
  borderRadius: "35px",
  border: "2px solid #FFFFFF",
}));

export const MyBalance = (props: any) => {
  const { authInfo } = props;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        px: 2,
        py: 2,
        backgroundColor: "#00A24A",
        borderRadius: "15px",
      }}
    >
      <Grid item>
        <Typography fontSize={12} fontWeight={500} color="#FFFFFF">
          My Balance
        </Typography>
      </Grid>
      <Grid item mt={1}>
        <Grid
          container
          direction="row"
          justifyContent="Center"
          alignItems="center"
        >
          <Grid item>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "11rem",
              }}
            >
              <Typography
                fontSize={22}
                fontWeight={400}
                color="#FFFFFF"
                noWrap
                textAlign="right"
              >
                {`₱ ${authInfo?.wallet?.balance || "0.00"}`}
              </Typography>
            </div>
          </Grid>
          <Grid item ml={1}>
            <Box
              component="img"
              //  @ts-ignore
              alt="Sidebar Balance Refresh"
              src={SidebarBalanceRefresh}
              height={15}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item mt={1}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <DepositButton
              variant="contained"
              fullWidth
              sx={{ py: "5px", pl: "5px", pr: "10px" }}
              onClick={() => {}}
            >
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <Box
                      component="img"
                      //  @ts-ignore
                      alt="Sidebar Balance Refresh"
                      src={SidebarBalancePlus}
                      height={12}
                    />
                  </Grid>
                </Grid>

                <Grid item ml={"5px"}>
                  <Typography fontSize={12} fontWeight={400}>
                    Deposit
                  </Typography>
                </Grid>
              </Grid>
            </DepositButton>
          </Grid>
          <Grid item ml={1}>
            <WithdrawButton
              variant="contained"
              fullWidth
              sx={{ py: "5px", pl: "5px", pr: "10px" }}
              onClick={() => {}}
            >
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <Box
                      component="img"
                      //  @ts-ignore
                      alt="Sidebar Balance Refresh"
                      src={SidebarBalanceMinus}
                      height={15}
                    />
                  </Grid>
                </Grid>

                <Grid item ml={"5px"}>
                  <Typography fontSize={12} fontWeight={400}>
                    Withdraw
                  </Typography>
                </Grid>
              </Grid>
            </WithdrawButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
