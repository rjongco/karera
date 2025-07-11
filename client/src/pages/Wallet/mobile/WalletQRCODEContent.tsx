import { Box, Divider, Grid, IconButton, Typography, Button } from "@mui/material";
import { DEPOSIT } from "../../../constants";
import closeIcon from "../../../assets/images/close-icon.png";
import depositIcon from "../../../assets/images/deposit-icon.png";
import QRCode from 'qrcode.react';
import { useState } from "react";

const style = {
    position: "absolute" as "absolute",
    bottom: "0",
    left: "50%",
    transform: "translate(-50%, 0)",
    width: "100vw",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "0",
};
  

export const WalletQRCODEContent = (props:any) => {
    const { modalTransactionType, handleCloseModalTransaction, formDataDeposit, formDataWithdraw, transactionType, walletState } = props

    const { data } = walletState
    const [isCopyExpressSend, setIsCopyExpressSend] = useState(false);
    const [isCopyReferrenceCode, setIsCopyReferrenceCode] = useState(false);

    const downloadQRCode = () => {
        const qrCodeUrl = data?.receiver?.accountQR;
        if (!qrCodeUrl) return;

        const newTab = window.open(qrCodeUrl, '_blank');
        if (newTab) {
          newTab.focus();
        } else {
          // Handle popup blocker
          alert('Please allow popups for this site to open the QR code in a new tab.');
        }
    };

    
    const copyExpressSend = (accountNumber:string) => {
        navigator.clipboard.writeText(accountNumber).catch((error) => {
            console.error("Error copying text:", error);
          });
 
    }

    const copyReferrenceCode = (referrenceCode:string) => {
       navigator.clipboard.writeText(referrenceCode).catch((error) => {
            console.error("Error copying text:", error);
          });
    }
    
    

    return (
        <Box sx={style}>
          <Grid container direction="column">
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                sx={{ pt: 3, pb: 1, px: 2 }}
              >
                <Grid item />
                <Grid item ml={4}>
                <Grid
                container
                gap={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>   
                    <Box
                      component="img"
                      alt="Deposit Icon"
                      src={depositIcon}
                      height={25}
                    />
                </Grid>
                <Grid item>
                <Typography
                    fontFamily="Baloo"
                    fontSize={20}
                    fontWeight={500}
                    color="#000000"
                    textAlign="center"
                  >
                    {transactionType === DEPOSIT ? "Deposit" : "Withdraw"}
                  </Typography>
                </Grid>
            </Grid>
                  
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={handleCloseModalTransaction}
                    sx={{ marginTop: "-16px" }}
                  >
                    <Box
                      component="img"
                      alt="Close Icon"
                      src={closeIcon}
                      height={15}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              fontFamily="Baloo"
              fontSize={36}
              fontWeight={600}
              textAlign="center"
            >
              {data?.amount || "Amount"}
            </Typography>
          </Grid>
  
          <Grid item py={1} px={2}>
            <Divider sx={{borderStyle:'dashed'}} />
          </Grid>
  
          <Grid item pt={1} px={2}>
            <Grid container direction="row" alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography
                  fontFamily="Baloo"
                  fontSize={14}
                  fontWeight={600}
                  textAlign="left"
                >
                  Bank
                </Typography>
              </Grid>
              <Grid item>
                    <Box
                        width={60}
                        height={30}
                        sx={{
                            background: `url('../assets/images/gcash-box-bg.png')`,
                            backgroundSize: "100% 100%",
                            borderRadius: "10px",
                            backgroundPosition: "center center", // Position the background image at the center horizontally and at the bottom vertically
                            backgroundRepeat: "no-repeat", // Prevent the background image from repeating
                        }}
                    />
              </Grid>
            </Grid>
          </Grid>

          <Grid item py={1} px={2}>
            <Divider sx={{borderStyle:'dashed'}} />
          </Grid>

          <Grid item py={1} px={2}>
                <Typography
                  fontFamily="Baloo"
                  fontSize={14}
                  fontWeight={600}
                  textAlign="left"
                >
                    OPTION 1: Pay via QR Code
                </Typography>
          </Grid>

            {data?.receiver && (
                <Grid item py={1} px={2}>
                    <Grid
                    container
                    direction="column"
                    alignItems="center"
                    >
                        <Grid item>
                            <QRCode value={data?.receiver?.accountQR} />
                        </Grid>
                        <Grid item>
                            <Typography
                                fontFamily="Baloo"
                                fontSize={12}
                                fontWeight={400}
                                textAlign="left"
                            >
                                Scan or <Button variant="text"  onClick={downloadQRCode} sx={{padding:0}}>Download</Button> QR Code
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )}

            <Grid item pt={1} px={2}>
                <Typography
                    fontFamily="Baloo"
                    fontSize={14}
                    fontWeight={600}
                    textAlign="left"
                >
                    OPTION 2: Pay via Express Send
                </Typography>
            </Grid>

            <Grid item py={1} px={2}>
                <Grid container direction="row" alignItems="center" justifyContent="space-between">
                    <Grid item xs>
                        <Box
                            sx={{
                                borderRadius:"5px",
                                border:"1px solid #C4C4C4",
                                px:1,
                                py:1,
                            }}
                        >
                            {data?.receiver?.accountNumber}
                        </Box>
                    </Grid>
                    <Grid item>
                    <Button
                     onClick={() => {
                        setIsCopyExpressSend(true)
                        copyExpressSend(data?.receiver?.accountNumber)
                    }}
                        variant="contained"
                        sx={{
                            borderRadius:"5px",
                            backgroundColor:isCopyExpressSend ? "#00A24A" : "#2196F3",
                            borderRight:"none",
                            px:2,
                            py:1,
                        }}
                        >
                            <Typography
                                fontFamily="Baloo"
                                fontSize={12}
                                fontWeight={400}
                                color="#FFFFFF"
                                textAlign="center"
                            >
                                {isCopyExpressSend ? "Copied" : "Copy"}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item pt={1} px={2}>
                <Typography
                    fontFamily="Baloo"
                    fontSize={14}
                    fontWeight={600}
                    textAlign="left"
                >
                    Reference Code
                </Typography>
            </Grid>

            <Grid item py={1} px={2}>
                <Grid container direction="row" alignItems="center" justifyContent="space-between">
                    <Grid item xs>
                        <Box
                            sx={{
                                borderRadius:"5px",
                                border:"1px solid #C4C4C4",
                                px:1,
                                py:1,
                            }}
                        >
                               {data?.receiver?.referenceCode}
                        </Box>
                    </Grid>
                    <Grid item>
                    <Button
                        onClick={() => {
                            setIsCopyReferrenceCode(true) 
                            copyReferrenceCode(data?.receiver?.referenceCode)
                        }}
                        variant="contained"
                        sx={{
                            borderRadius:"5px",
                            backgroundColor:isCopyReferrenceCode ? "#00A24A" : "#2196F3",
                            borderRight:"none",
                            px:2,
                            py:1,
                        }}
                        >
                            <Typography
                                fontFamily="Baloo"
                                fontSize={12}
                                fontWeight={400}
                                color="#FFFFFF"
                                textAlign="center"
                            >
                                {isCopyReferrenceCode ? "Copied" : "Copy"}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item pt={1} pb={3} px={2}>
            <Typography
                    fontFamily="Baloo"
                    fontSize={12}
                    fontWeight={400}
                    textAlign="left"
                >
                <b>Important Note:</b> Please Pay Immediately and ensure to send the exact deposit 
                amount along with the correct Reference Code in "Message" section in GCash when sending your payment.
                </Typography>
            </Grid>
        </Box>
      );
}