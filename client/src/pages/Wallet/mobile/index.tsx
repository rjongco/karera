import { Grid, IconButton, Typography, Box, Divider } from "@mui/material";
import rightArrowIcon from "../../../assets/images/right-arrow-white.png";
import transactionIcon from "../../../assets/images/transaction-icon.png";
import refreshBalanceIcon from "../../../assets/images/sidebar-balance-refresh.png";

import { useContext, useEffect, useRef, useState } from "react";
import {
  ADD_CARD,
  DEPOSIT,
  DEPOSIT_SUCCESS,
  PIN_CODE,
  QR_CODE,
  WITHDRAW,
  WITHDRAW_NOT_AVAILABLE,
  WITHDRAW_SUCCESS,
} from "../../../constants";
import { DepositForm } from "./DepositForm";
import { WithdrawForm } from "./WithdrawForm";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalProvider";
import { getUserProfileAPI } from "../../../api/userProfileAPI";
import { useWalletContext } from "../../../context/WalletContext";
import { canViewCreditPage } from "../../../utils/permissions/credits";
import { AddCard } from "./AddCard";
import { WalletModal } from "./WalletModal";

export const MobileWallet = () => {
  const navigate = useNavigate();
  const {
    auth: authInfo,
    setAuthInfo,
  } = useContext(GlobalContext) || {};

  const [isAddCard, setIsAddCard] = useState(false);
  const [isDeposited, setIsDeposited] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isPincode, setIsPincode] = useState(false);


  const {
    walletState,
    paymentCards,
    mutatePaymentCards,
    actions: { addGameDeposit, addGameWithdraw, addPaymentCard, authPinCode },
  } = useWalletContext();

  const passKYC = canViewCreditPage(
    authInfo?.isSupervisorApproved,
    authInfo?.isVerifierApproved,
    authInfo?.actionStatus
  );

  const [formDataDeposit, setFormDataDeposit] = useState<FormDataDeposit>({
    paymentType: "",
    depositAmount: "",
    accountNumber: null,
  });

  const [formDataWithdraw, setFormDataWithdraw] = useState<FormDataWithdraw>({
    paymentType: "",
    withdrawAmount: "",
    accountNumber: null
  });

  const [formDataAddCard, setFormDataAddCard] = useState({
    paymentType: formDataDeposit?.paymentType,
    mobile: "",
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null); 

  const showQRForm = () => {
    handleCloseModalTransaction();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
      
    setIsDeposited(false)
    setModalTransactionType(QR_CODE);
    setOpenModalTransaction(true);
    setFormDataDeposit({
      paymentType: "",
      depositAmount: "",
      accountNumber: null,
    });
    setSelectedAmount({});
  }

  const showPinCode = () => {
    handleCloseModalTransaction();
    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current);
    //   timeoutRef.current = null;
    // }
    setModalTransactionType(PIN_CODE);
    setOpenModalTransaction(true);
    // setFormDataWithdraw({
    //   paymentType: "",
    //   withdrawAmount: "",
    //   accountNumber: null,
    // });
    // setSelectedAmount({});
  }

  const handleSubmitPincode = (values:any) => {
    const accountNumber = formDataWithdraw?.accountNumber?.name

    const { ...rest } = values
    const payload = {
      accountNumber,
      ...rest
    }
    authPinCode(payload)

  }

  useEffect(() => {
    const updateWallet = async () => {
      const auth = await getUserProfileAPI();
      const { Wallet } = auth?.data;
      setAuthInfo({
        ...authInfo,
        wallet: { ...Wallet },
      });
    };

    if (walletState.success) {
      if (isAddCard) {
        setOpenModalTransaction(true);
        setModalTransactionType(ADD_CARD);
        setFormDataAddCard({
          paymentType: "",
          mobile: "",
        });
        mutatePaymentCards();
      } else {
        if (transactionType === DEPOSIT) {
           if (isDeposited) {
            setOpenModalTransaction(true);
            setModalTransactionType(DEPOSIT_SUCCESS);
            timeoutRef.current = setTimeout(() => {
              showQRForm()
            }, 2000);
           }
            // handleCloseModalTransaction();
            // setModalTransactionType("");
            // setFormDataDeposit({
            //   paymentType: "",
            //   depositAmount: "",
            //   accountNumber: "",
            // });
            // setSelectedAmount({});
            // updateWallet();
            // navigate("/game/transactions");
        } else {
          handleCloseModalTransaction();
          if (isPincode) {
              setIsPincode(false)
              const accountNumber = formDataWithdraw?.accountNumber?.name
              const payload = {
                creditType: formDataWithdraw.paymentType,
                credit: formDataWithdraw.withdrawAmount,
                accountNumber: accountNumber,
                accountId: walletState.data.card.accountId 
              };
              addGameWithdraw(payload);
              setIsWithdraw(true)
       
          }

          if (isWithdraw) {
              setIsWithdraw(false)
              setOpenModalTransaction(true);
              setModalTransactionType(WITHDRAW_SUCCESS);
              
              setFormDataWithdraw({
                paymentType: "",
                withdrawAmount: "",
                accountNumber: null,
              });
              updateWallet();
          }
          // setModalTransactionType("");
          // navigate("/game/transactions");
        }
      }
    }

  }, [walletState.success]);

  const [transactionType, setTransactionType] = useState(DEPOSIT);

  const [openModalTransaction, setOpenModalTransaction] = useState(false);
  const [modalTransactionType, setModalTransactionType] = useState("");
  const [selectedAmount, setSelectedAmount] = useState({});

  const handleCloseModalTransaction = () => {
    if (modalTransactionType !== WITHDRAW_NOT_AVAILABLE) {
      setOpenModalTransaction(false);
      setModalTransactionType("");
    }
  };

  const handleSubmitDeposit = (values: any) => {
    setOpenModalTransaction(true);
    setModalTransactionType(DEPOSIT);
    setFormDataDeposit(values);
  };

  const handleSubmitWithdraw = (values: any) => {
    setOpenModalTransaction(true);
    setModalTransactionType(WITHDRAW);
    setFormDataWithdraw(values);
  };

  const handleSubmitTrasaction = async (transactionType: any) => {
    if (transactionType === DEPOSIT) {
      const accountNumber = formDataDeposit?.accountNumber?.name
      const payload = {
        creditType: formDataDeposit.paymentType,
        credit: formDataDeposit.depositAmount,
         accountNumber,
      };
      addGameDeposit(payload);
      setIsDeposited(true);
    } else {
      showPinCode()
      // const accountNumber = formDataWithdraw?.accountNumber?.name
      // const payload = {
      //   creditType: formDataWithdraw.paymentType,
      //   credit: formDataWithdraw.withdrawAmount,
      //   accountNumber: accountNumber,
      // };
      // addGameWithdraw(payload);
      setIsPincode(true)
    }
  };

  const handleOpenAddCard = () => {
    handleCloseModalTransaction();
    setModalTransactionType("");
    setIsAddCard(true);
  };

  const handlePaymentCard = (values: any) => {
    addPaymentCard(values);
  };

  const handleChangePaymentType = (value: any) => {
    setFormDataAddCard((prevState) => ({
      ...prevState,
      paymentType: value,
    }));
  };

  // if (isAddCard) {
  //   return (
  //     <AddCard
  //       values={formDataAddCard}
  //       handleSubmit={handlePaymentCard}
  //       setIsAddCard={setIsAddCard}
  //       walletState={walletState}
  //     />
  //   );
  // }

  return (
    <>
      <div style={{ display: isAddCard ? "block" : "none" }}>
        <AddCard
          values={formDataAddCard}
          handleSubmit={handlePaymentCard}
          setIsAddCard={setIsAddCard}
          walletState={walletState}
        />
      </div>
      <div style={{ display: !isAddCard ? "block" : "none" }}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          sx={{ height: "100vh" }}
        >
          <Grid item>
            <Grid
              container
              direction="column"
              sx={{ backgroundColor: "#00a24a", zIndex: 10 }}
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 1 }}
                >
                  <Grid item>
                    <IconButton onClick={() => navigate("/")}>
                      <Box
                        component="img"
                        alt="Right Arrow"
                        src={rightArrowIcon}
                        height={15}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item />
                  <Grid item pr={1}>
                    <IconButton onClick={() => navigate("/game/transactions")}>
                      <Box
                        component="img"
                        alt="KYC Top Right ID"
                        src={transactionIcon}
                        height={20}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  fontFamily="Baloo"
                  fontSize={12}
                  color="#FFFFFF"
                  textAlign="center"
                >
                  My Balance
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  pb={4}
                >
                  <Grid item ml={3}>
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "11rem",
                      }}
                    >
                      <Typography
                        fontFamily="Baloo"
                        fontSize={24}
                        color="#FFFFFF"
                        fontWeight={600}
                        textAlign="center"
                        noWrap
                      >
                        {`₱ ${authInfo?.wallet?.balance || "0.00"}`}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => {}}>
                      <Box
                        component="img"
                        alt="Refresh Balance"
                        src={refreshBalanceIcon}
                        height={10}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs sx={{ position: "relative" }}>
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  pt={2}
                  sx={{
                    borderRadius: "25px",
                    position: "absolute",
                    zIndex: 30,
                    top: -20,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Grid
                    item
                    xs={6}
                    onClick={() => {
                      setTransactionType(DEPOSIT);
                    }}
                  >
                    <Typography
                      fontFamily="Baloo"
                      fontSize={16}
                      color={
                        transactionType === DEPOSIT ? "#00A24A" : "#000000"
                      }
                      fontWeight="600"
                      textAlign="center"
                    >
                      Deposit
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    onClick={() => {
                      if (!passKYC) {
                        setOpenModalTransaction(true);
                        setModalTransactionType(WITHDRAW_NOT_AVAILABLE);
                      }

                      setTransactionType(WITHDRAW);
                    }}
                  >
                    <Typography
                      fontFamily="Baloo"
                      fontSize={16}
                      color={
                        transactionType === WITHDRAW ? "#00A24A" : "#000000"
                      }
                      fontWeight="600"
                      textAlign="center"
                    >
                      Withdraw
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mt: 4, zIndex: 30, px: 2 }}>
                <Divider />
              </Grid>
              <Grid item sx={{ mt: 1, zIndex: 30, px: 2 }}>
                {transactionType === DEPOSIT ? (
                  <DepositForm
                    values={formDataDeposit}
                    paymentCards={paymentCards}
                    handleSubmit={handleSubmitDeposit}
                    selectedAmount={selectedAmount}
                    setSelectedAmount={setSelectedAmount}
                    onAddCard={handleOpenAddCard}
                    onChangePaymentType={handleChangePaymentType}
                  />
                ) : (
                  <WithdrawForm
                    values={formDataWithdraw}
                    passKYC={passKYC}
                    paymentCards={paymentCards}
                    handleSubmit={handleSubmitWithdraw}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <WalletModal
        walletState={walletState}
        openModalTransaction={openModalTransaction}
        handleCloseModalTransaction={handleCloseModalTransaction}
        modalTransactionType={modalTransactionType}
        transactionType={transactionType}
        setOpenModalTransaction={setOpenModalTransaction}
        setModalTransactionType={setModalTransactionType}
        formDataDeposit={formDataDeposit}
        formDataWithdraw={formDataWithdraw}
        handleSubmitTrasaction={handleSubmitTrasaction}
        setIsAddCard={setIsAddCard}
        onSubmitPincode={handleSubmitPincode}
      />
    </>
  );
};
