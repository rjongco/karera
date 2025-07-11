import {
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { PopupModal } from "../../../components/PopupModal";
import { DEPOSIT, DEPOSIT_SUCCESS, PIN_CODE, QR_CODE, WITHDRAW } from "../../../constants";
import closeIcon from "../../../assets/images/close-icon.png";
import { WalletModalContent } from "./WalletModalContent";
import { WalletQRCODEContent } from "./WalletQRCODEContent";
import { WithdrawPincode } from "./WithdrawPincode";

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

export const WalletModal = (props: any) => {
  const {
    walletState,
    openModalTransaction,
    handleCloseModalTransaction,
    modalTransactionType,
    setOpenModalTransaction,
    setModalTransactionType,
    formDataDeposit,
    formDataWithdraw,
    handleSubmitTrasaction,
    transactionType,
    setIsAddCard,
    onSubmitPincode
  } = props;

  const renderModalContent = () => {
    if (modalTransactionType !== DEPOSIT && modalTransactionType !== WITHDRAW && modalTransactionType !== QR_CODE && modalTransactionType !== PIN_CODE) {
      return (
      <WalletModalContent  
         modalTransactionType={modalTransactionType}
         setOpenModalTransaction={setOpenModalTransaction} 
         setModalTransactionType={setModalTransactionType} 
         setIsAddCard={setIsAddCard} 
         handleCloseModalTransaction={handleCloseModalTransaction}  
      />
      );
    }
    
    if (modalTransactionType === QR_CODE){
      return (
        <WalletQRCODEContent
          walletState={walletState}
          modalTransactionType={modalTransactionType} 
          handleCloseModalTransaction={handleCloseModalTransaction} 
          formDataDeposit={formDataDeposit}
          formDataWithdraw={formDataWithdraw}
          transactionType={transactionType}
        />
      )
    }

    if (modalTransactionType === PIN_CODE){
      return (
        <WithdrawPincode 
          walletState={walletState}
          onSubmitPincode={onSubmitPincode}
          onCloseModalTransaction={handleCloseModalTransaction}
        />
      )
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
                <Typography
                  fontFamily="Baloo"
                  fontSize={18}
                  fontWeight={500}
                  color="#000000"
                  textAlign="center"
                >
                  {modalTransactionType === DEPOSIT ? "Deposit" : "Withdraw"}
                </Typography>
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
            {modalTransactionType === DEPOSIT
              ? formDataDeposit?.depositAmount || "Amount"
              : formDataWithdraw?.withdrawAmount || "Amount"}
          </Typography>
        </Grid>

        <Grid item py={1} px={2}>
          <Divider />
        </Grid>

        <Grid item pt={1} px={2}>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography
                fontFamily="Baloo"
                fontSize={12}
                fontWeight={400}
                textAlign="left"
              >
                Payment Method
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                fontFamily="Baloo"
                fontSize={12}
                fontWeight={400}
                textAlign="right"
              >
                {formDataDeposit?.paymentType || "Select Payment Method"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item px={2}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography
                fontFamily="Baloo"
                fontSize={12}
                fontWeight={400}
                textAlign="left"
              >
                Total Amount:
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                fontFamily="Baloo"
                fontSize={18}
                fontWeight={600}
                textAlign="right"
              >
                {modalTransactionType === DEPOSIT
                  ? formDataDeposit?.depositAmount || "Amount"
                  : formDataWithdraw?.withdrawAmount || "Amount"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item mt={4} mb={6} px={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              py: 1,
              background: walletState.loading
                ? `#999999`
                : `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)`,
              borderRadius: "35px",
              boxShadow: "none",
              "&:hover": {
                background: walletState.loading
                  ? `#999999`
                  : `linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)`,
              },
            }}
            onClick={() =>
              !walletState.loading
                ? handleSubmitTrasaction(transactionType)
                : {}
            }
          >
            <Typography fontFamily="Baloo" color="#FFFFFF" fontSize={20}>
              Confirm
            </Typography>
          </Button>
        </Grid>
      </Box>
    );
  };

  return (
    <PopupModal
      openModal={openModalTransaction}
      onCloseModal={modalTransactionType !== DEPOSIT_SUCCESS && modalTransactionType !== QR_CODE && handleCloseModalTransaction}
    >
      {renderModalContent()}
    </PopupModal>
  );
};
