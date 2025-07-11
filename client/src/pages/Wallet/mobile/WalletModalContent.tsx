import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import closeIcon from "../../../assets/images/close-icon.png";
import successCircleCheckBlack from "../../../assets/images/success-circle-check-black.png";
import notVerified from "../../../assets/images/not-verified.png";

import paymentCard from "../../../assets/images/payment-card.png";
import { styled } from "@mui/system";
import { ADD_CARD, DEPOSIT_SUCCESS, WITHDRAW_NOT_AVAILABLE, WITHDRAW_SUCCESS } from "../../../constants";
import { useNavigate } from "react-router-dom";

const styleBox = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    borderRadius: "20px",
    backgroundColor: "white",
    border: "2px solid #fff",
    boxShadow: 24,
    padding: 4,
    maxHeight: "600px",
    overflow: "auto",
};

  
const ButtonStyled = styled(Button)(() => ({
    borderRadius: "35px",
    marginTop: "10px",
    padding: "10px 50px",
    background:
      "linear-gradient(180deg, hsla(185, 80%, 51%, 1) 0%, hsla(205, 92%, 62%, 1) 100%)",
    ":hover": {
      background:
        "linear-gradient(180deg, hsla(185, 80%, 51%, 1) 0%, hsla(205, 92%, 62%, 1) 100%)",
    },
  }));

 

export const WalletModalContent = (props:any) => {
  const navigate = useNavigate()
    const { modalTransactionType, setOpenModalTransaction, setModalTransactionType, setIsAddCard, handleCloseModalTransaction } = props
    let logo:string | null = null; let titleLogo = ""; let isSubmitButton = false; let isClose = false;

    const bodyContent = (modalTransactionType:any) => {
      if(modalTransactionType === ADD_CARD) return "You’ve successfully added a GCash Account."
      else if (modalTransactionType === DEPOSIT_SUCCESS) return "You will receive your deposit amount in 1-3 minutes. For issues, please contact our customer support."
      else if (modalTransactionType === WITHDRAW_SUCCESS) return "Please wait for 10-30 minutes for the approval and disbursement. For issues, please contact our customer support."
      else if (modalTransactionType === WITHDRAW_NOT_AVAILABLE) {
        return (
          <>
          In order to withdraw, your account must be{" "} <span style={{ color: "#2196F3" }}>fully verified.</span>
          </>
        )
      }

      

    }
  
    const footerButton = (modalTransactionType:any, setIsAddCard: (p:boolean) => void, handleCloseModalTransaction: () => void) => {
      if(modalTransactionType === ADD_CARD) {
        return (
        <Grid item xs={12} mt="10px">
          <ButtonStyled
            variant="contained"
            onClick={() => {
              setIsAddCard(false);
              handleCloseModalTransaction();
            }}
          >
            <Typography
              fontFamily="Baloo"
              textAlign="center"
              color="#FFFFFF"
              fontSize={16}
            >
              Okay
            </Typography>
          </ButtonStyled>
        </Grid>
        )
      }
      else if (modalTransactionType === DEPOSIT_SUCCESS) return;
      else if (modalTransactionType === WITHDRAW_NOT_AVAILABLE) return (
        <Grid item xs={12} mt="10px">
          <ButtonStyled
          fullWidth
            variant="contained"
            onClick={() => navigate("/game/kyc")}
          >
            <Typography
              fontFamily="Baloo"
              color="#FFFFFF"
              fontSize={14}
              textAlign="center"
            >
              Verify My Account
            </Typography>
          </ButtonStyled>
        </Grid>
      )
      
    }

    if(modalTransactionType === ADD_CARD){
      logo = paymentCard
      titleLogo = "Success!"
      isSubmitButton = true
      isClose = true
    }else if(modalTransactionType === DEPOSIT_SUCCESS){
      logo = successCircleCheckBlack
      titleLogo = "Deposit Request Submitted!"
      isSubmitButton = false
      isClose = false

    }else if(modalTransactionType === WITHDRAW_SUCCESS){
        logo = successCircleCheckBlack
        titleLogo = "Withdrawal Request Submitted!"
        isSubmitButton = false
        isClose = false
    }else if(modalTransactionType === WITHDRAW_NOT_AVAILABLE){
      logo = notVerified
      titleLogo = "Oops!";
      isSubmitButton = true
      isClose = true
    }

    return (
      <Box sx={styleBox}>
        <Grid container direction="column" justifyContent="center">
          {isClose && (
          <div
            style={{ position: "absolute", top: 10, right: 10, color: "red" }}
          >
            <IconButton
              onClick={() => {
                setOpenModalTransaction(false);
                setModalTransactionType("");
              }}
            >
              <Box component="img" width={15} src={closeIcon} />
            </IconButton>
          </div>
          )}
          <Grid item xs={12}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
            {logo && (
                <Grid item mt={1}>
                  <Box component="img" width={75} src={logo} />
                </Grid>
              )}
              <Grid item xs={12} mt="10px">
                <Typography textAlign="center" fontSize={18} fontWeight={600}>
                  {titleLogo}
                </Typography>
              </Grid>
              <Grid item xs={12} mt="10px">
                <Typography
                  fontFamily="Baloo"
                  fontSize={14}
                  textAlign="center"
                  fontWeight={400}
                  color="#5B5B5B"
                >
                  {bodyContent(modalTransactionType)}
                </Typography>
              </Grid>
              {isSubmitButton && footerButton(modalTransactionType, setIsAddCard, handleCloseModalTransaction)}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
}