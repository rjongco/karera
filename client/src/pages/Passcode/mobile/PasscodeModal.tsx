import { Grid, Box, IconButton, Typography, Button, styled } from "@mui/material";
import closeIcon from "../../../assets/images/close-icon.png";
import lockIcon from "../../../assets/images/lock-icon.png";
import infoCircleIcon from "../../../assets/images/info-circle-icon.png";


import { INFO, SUCCESS } from "../../../constants";
import { PopupModal } from "../../../components/PopupModal";

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
    "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
    ":hover": {
      background:
        "linear-gradient(180deg, hsla(148, 100%, 40%, 1) 0%, hsla(142, 100%, 28%, 1) 100%)",
    },
  }));



export const PasscodeModal = (props: any) => {
    const { passcode, openModal, onCloseModal, modalType } = props
    let logo:string | null = null; let titleLogo:any = ""; let isSubmitButton = false; let isClose = false;

    if(modalType === SUCCESS){
      logo = lockIcon
      titleLogo = (
        <Typography textAlign="center" fontSize={18} fontWeight={600}>
        {`You have successfully ${passcode === null ? "created" : "changed"} your PIN!`}
        </Typography>
      )
      isSubmitButton = true
      isClose = false
    }else if(modalType === INFO){
      logo = infoCircleIcon
      titleLogo = (
        <Typography textAlign="center" fontSize={18} fontWeight={400}>
          {`Your Wallet PIN will be used for secure withdrawal transactions.`}
        </Typography>
        )
      isSubmitButton = false
      isClose = true
    }
   

    const bodyContent = (modalType:any) => {
        if (modalType === SUCCESS) {
          return (
            <Grid container direction="column" alignItems="center">
                 <Grid item>You can change your PIN in</Grid>
                 <Grid item>{`Account > Change Wallet PIN`}</Grid>
            </Grid>
          )
        }
    }

    const footerButton = (modalType:any) => {
        if(modalType === SUCCESS) {
          return (
          <Grid item xs={12} mt="10px">
            <ButtonStyled
              variant="contained"
              onClick={onCloseModal}
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
    }
  
    const renderModalContent = () => {
      return (
        <Box sx={styleBox}>
          <Grid container direction="column" justifyContent="center">
              {isClose && (
              <div style={{ position: "absolute", top: 10, right: 10, color: "red" }}>
                  <IconButton onClick={onCloseModal} >
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
                        {titleLogo}
                  </Grid>
                  <Grid item xs={12} mt="10px">
                      <Typography
                        fontFamily="Baloo"
                        fontSize={14}
                        textAlign="center"
                        fontWeight={400}
                        color="#5B5B5B"
                      >
                        {bodyContent(modalType)}
                      </Typography>
                  </Grid>
                    {isSubmitButton && footerButton(modalType)}
                  </Grid>
              </Grid>
          </Grid>
        </Box> 
    )
  }

  return (
    <PopupModal
      openModal={openModal}
      onCloseModal={onCloseModal}
    >
      {renderModalContent()}
    </PopupModal>
  )
}